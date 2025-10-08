// server.mjs - Servidor optimizado para Real State React SPA
// nginx maneja SSL, este servidor solo sirve HTTP
import express from 'express';
import { createServer as createHttpServer } from 'http';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Trust proxy - MUST para que req.secure funcione detrás de nginx
app.set('trust proxy', 1);

// Configuración de compresión - MUST per AGENTS.md performance
app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
  level: 6
}));

// Headers de seguridad para Real State
app.use((req, res, next) => {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
});

// Servir archivos estáticos del build de Vite con cache optimizado
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  maxAge: '1y', // Cache de assets por 1 año - MUST per AGENTS.md
  etag: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// Servir otros archivos estáticos
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1h' : '0',
  etag: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Real State',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    server: 'Amazon Linux 2023'
  });
});

// API endpoints (si los hay en el futuro)
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// SPA fallback - Todas las rutas devuelven index.html para React Router
// Usando middleware en lugar de route para evitar problemas con path-to-regexp en Express 5.x
app.use((req, res, next) => {
  // MUST per AGENTS.md - Support deep linking
  res.sendFile(path.join(__dirname, 'dist/index.html'), {
    headers: {
      'Cache-Control': 'no-cache' // Index.html no debe cachearse
    }
  });
});

// Configuración de puerto HTTP (nginx maneja HTTPS en puerto 443)
const PORT_HTTP = process.env.PORT || 3003;

// Servidor HTTP (nginx hace proxy desde HTTPS)
const httpServer = createHttpServer(app);
httpServer.listen(PORT_HTTP, '0.0.0.0', () => {
  console.log(`🚀 Real State Server running on port ${PORT_HTTP}`);
  console.log(`📱 Local: http://localhost:${PORT_HTTP}`);
  console.log(`🌐 Public: https://realstate.dev.dreamsite.es (via nginx)`);
  console.log(`🔒 SSL termination handled by nginx`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Real State server shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ Server closed.');
  });
});