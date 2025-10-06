// server.mjs - Servidor optimizado para Real State React SPA
import express from 'express';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { readFileSync, existsSync } from 'fs';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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
  // HTTPS redirect in production (deshabilitado hasta configurar SSL)
  // if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
  //   return res.redirect(301, `https://${req.get('host')}${req.url}`);
  // }
  
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
app.get('*', (req, res) => {
  // MUST per AGENTS.md - Support deep linking
  res.sendFile(path.join(__dirname, 'dist/index.html'), {
    headers: {
      'Cache-Control': 'no-cache' // Index.html no debe cachearse
    }
  });
});

// Configuración de puertos
const PORT_HTTP = process.env.PORT || 3000;
const PORT_HTTPS = process.env.HTTPS_PORT || 3443;

// Servidor HTTP
const httpServer = createHttpServer(app);
httpServer.listen(PORT_HTTP, '0.0.0.0', () => {
  console.log(`🚀 Real State HTTP Server running on port ${PORT_HTTP}`);
  console.log(`📱 Local: http://localhost:${PORT_HTTP}`);
  console.log(`🌐 External: http://18.184.20.26:${PORT_HTTP}`);
  console.log(`🌐 Domain: http://alisi.dev.dreamsite.es`);
});

// Servidor HTTPS con certificados SSL
const certPath = '/var/www/ssl/fullchain.pem';
const keyPath = '/var/www/ssl/privkey.pem';

if (existsSync(certPath) && existsSync(keyPath)) {
  try {
    const sslOptions = {
      key: readFileSync(keyPath),
      cert: readFileSync(certPath)
    };
    const httpsServer = createHttpsServer(sslOptions, app);
    httpsServer.listen(PORT_HTTPS, '0.0.0.0', () => {
      console.log(`🔒 Real State HTTPS Server running on port ${PORT_HTTPS}`);
      console.log(`🌐 Production HTTPS: https://realstate.dev.dreamsite.es`);
    });
  } catch (error) {
    console.error('❌ Error starting HTTPS server:', error.message);
  }
} else {
  console.log('⚠️ SSL certificates not found, running HTTP only');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 Real State server shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ HTTP server closed.');
  });
});