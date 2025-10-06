# 🚀 Deploy Automático ALISI - React SPA

Sistema de deploy automático específico para ALISI, una aplicación React SPA construida con Vite. Utiliza Git hooks post-receive para deployment sin fricción.

## 📋 Características del Sistema

- ✅ **Deploy con un comando:** `git push production production:main`
- ✅ **Cero downtime:** PM2 gestiona reinicios sin interrupciones
- ✅ **SPA optimizada:** Configuración específica para React Router
- ✅ **Build automático:** Vite build + optimizaciones de performance
- ✅ **SSL automático:** Certificados Let's Encrypt
- ✅ **Compresión avanzada:** Gzip + Brotli automático
- ✅ **Cache inteligente:** Headers optimizados para assets estáticos
- ✅ **Validación automática:** Lint + Build check antes del deploy
- ✅ **Rollback fácil:** Volver a versiones anteriores con Git

---

## 🏗️ Arquitectura del Sistema

```
[Máquina Local] → [Git Push] → [Servidor Producción] → [Hook Post-Receive] → [Aplicación Live]
```

**Componentes:**
- **Local:** Desarrollo con Git
- **Servidor:** VPS/EC2 con Node.js, PM2, Git
- **Conexión:** SSH con claves
- **Automatización:** Git hooks

---

## 🛠️ Configuración Inicial

### 1. Preparar Servidor de Producción

#### Instalar Software Necesario
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y  # Ubuntu/Debian
# o
sudo dnf update -y                       # RHEL/Amazon Linux

# Instalar Node.js (método recomendado: NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm
npm install -g pnpm

# Instalar PM2 globalmente
npm install -g pm2

# Instalar Git
sudo apt install git -y
```

#### Crear Estructura de Directorios para ALISI
```bash
# Usuario de aplicación (recomendado para seguridad)
sudo adduser alisi

# Cambiar a usuario de aplicación
sudo su - alisi

# Crear directorios
mkdir -p /var/repo/alisi.git          # Repositorio Git bare
mkdir -p /var/www/alisi               # Aplicación React SPA
mkdir -p /var/www/ssl                 # Certificados SSL
mkdir -p /var/log/alisi               # Logs específicos

# Inicializar repositorio bare
cd /var/repo/alisi.git
git init --bare

# Permisos correctos
sudo chown -R alisi:alisi /var/repo/alisi.git
sudo chown -R alisi:alisi /var/www/alisi
sudo chown -R alisi:alisi /var/log/alisi
```

### 2. Configurar SSH en Máquina Local

#### Generar Claves SSH para ALISI
```bash
ssh-keygen -t ed25519 -f ~/.ssh/alisi_deploy -C "alisi-deploy-key"
```

#### Configurar SSH Config para ALISI
```bash
# Archivo: ~/.ssh/config
Host alisi-server
    HostName [TU_SERVIDOR_IP]
    User alisi
    IdentityFile ~/.ssh/alisi_deploy
    StrictHostKeyChecking no
    ServerAliveInterval 60
```

#### Copiar Clave Pública al Servidor
```bash
ssh-copy-id -i ~/.ssh/alisi_deploy.pub alisi@[TU_SERVIDOR_IP]

# Verificar conexión
ssh alisi-server "echo 'Conexión SSH exitosa para ALISI'"
```

### 3. Configurar Git en Proyecto ALISI

```bash
# Añadir remote de producción para ALISI
git remote add production alisi-server:/var/repo/alisi.git

# Crear rama de producción
git checkout -b production
git push -u production production

# Verificar remotes
git remote -v
# origin    https://github.com/tu-usuario/alisi.git (fetch)
# origin    https://github.com/tu-usuario/alisi.git (push)
# production alisi-server:/var/repo/alisi.git (fetch)
# production alisi-server:/var/repo/alisi.git (push)
```

---

## 🔧 Archivos de Configuración

### 1. Server.mjs para ALISI React SPA

```javascript
// server.mjs - Servidor optimizado para ALISI React SPA
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

// Headers de seguridad para ALISI
app.use((req, res, next) => {
  // HTTPS redirect in production
  if (process.env.NODE_ENV === 'production' && req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(301, `https://${req.get('host')}${req.url}`);
  }
  
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
    service: 'ALISI',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
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
  console.log(`🚀 ALISI HTTP Server running on port ${PORT_HTTP}`);
  console.log(`📱 Local: http://localhost:${PORT_HTTP}`);
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
      console.log(`🔒 ALISI HTTPS Server running on port ${PORT_HTTPS}`);
      console.log(`🌐 Production: https://your-domain.com`);
    });
  } catch (error) {
    console.error('❌ Error starting HTTPS server:', error.message);
  }
} else {
  console.log('⚠️ SSL certificates not found, running HTTP only');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 ALISI server shutting down gracefully...');
  httpServer.close(() => {
    console.log('✅ HTTP server closed.');
  });
});
```

### 2. Configuración PM2 para ALISI

```javascript
// ecosystem.config.cjs
module.exports = {
  apps: [{
    name: "alisi-app",
    script: "./server.mjs",
    instances: 1,
    exec_mode: "fork",
    cwd: "/var/www/alisi",
    
    // Variables de entorno
    env: {
      NODE_ENV: "production",
      HOST: "0.0.0.0",
      PORT: 3000,
      HTTPS_PORT: 3443
    },
    
    env_production: {
      NODE_ENV: "production",
      PORT: 3000,
      HTTPS_PORT: 3443
    },
    
    // Logging específico para ALISI
    log_file: "/var/log/alisi/combined.log",
    out_file: "/var/log/alisi/out.log",
    error_file: "/var/log/alisi/error.log",
    
    // Configuración de reinicio automático
    watch: false,
    ignore_watch: ["node_modules", "dist", "*.log"],
    
    // Configuración de performance
    max_memory_restart: "500M",
    node_args: "--max-old-space-size=512",
    
    // Health check
    health_check_grace_period: 10000,
    
    // Reinicio automático en caso de crash
    autorestart: true,
    max_restarts: 3,
    min_uptime: "10s"
  }]
}
```

#### Dependencias del servidor (package.json adicional)
```json
{
  "name": "alisi-server",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "compression": "^1.7.4"
  }
}
```

### 3. Hook Post-Receive para ALISI

```bash
#!/bin/bash
# Archivo: /var/repo/alisi.git/hooks/post-receive
# Hook optimizado para deploy de ALISI React SPA

WORK_TREE=/var/www/alisi
GIT_DIR=/var/repo/alisi.git
BRANCH=main
LOG_FILE=/var/log/alisi/deploy.log
START_TIME=$(date '+%Y-%m-%d %H:%M:%S')

# Función de logging
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Función de error
error_exit() {
    log "❌ ERROR: $1"
    exit 1
}

while read oldrev newrev ref
do
    if [[ $ref = refs/heads/$BRANCH ]]; then
        log "🚀 Iniciando deploy de ALISI ($START_TIME)"
        log "📝 Deploy: $oldrev -> $newrev"
        
        # Extraer archivos del repositorio
        log "📂 Extrayendo archivos..."
        git --work-tree=$WORK_TREE --git-dir=$GIT_DIR checkout -f $BRANCH || error_exit "Failed to checkout files"
        
        cd $WORK_TREE || error_exit "Failed to change directory"
        
        # Instalar dependencias de desarrollo (necesarias para build)
        log "📦 Instalando dependencias..."
        pnpm install || error_exit "Failed to install dependencies"
        
        # Validación de código
        log "🔍 Validando código con ESLint..."
        pnpm lint || log "⚠️  Lint warnings found, continuing deployment"
        
        # Build de la aplicación React
        log "🔨 Building aplicación ALISI con Vite..."
        pnpm build || error_exit "Failed to build application"
        
        # Verificar que el build se completó correctamente
        if [ ! -f "dist/index.html" ]; then
            error_exit "Build output not found - dist/index.html missing"
        fi
        
        # Instalar dependencias del servidor de producción
        log "🖥️ Instalando dependencias del servidor..."
        if [ ! -f "server-package.json" ]; then
            cat > server-package.json << 'EOF'
{
  "name": "alisi-server",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "compression": "^1.7.4"
  }
}
EOF
        fi
        pnpm install --prod --package-json=server-package.json || error_exit "Failed to install server dependencies"
        
        # Verificar configuración PM2
        if [ ! -f "ecosystem.config.cjs" ]; then
            error_exit "ecosystem.config.cjs not found"
        fi
        
        # Health check antes del reinicio
        log "🏥 Realizando health check..."
        if command -v curl > /dev/null; then
            curl -f http://localhost:3000/health > /dev/null 2>&1 && log "✅ Current app is healthy"
        fi
        
        # Reiniciar aplicación con PM2
        log "🔄 Reiniciando ALISI..."
        pm2 reload alisi-app --update-env 2>/dev/null || pm2 start ecosystem.config.cjs || error_exit "Failed to start/reload PM2"
        
        # Verificar que la aplicación se inició correctamente
        sleep 5
        if pm2 describe alisi-app | grep -q "online"; then
            log "✅ ALISI está online"
        else
            error_exit "Application failed to start properly"
        fi
        
        # Health check post-deploy
        log "🔍 Verificando health check post-deploy..."
        for i in {1..10}; do
            if curl -f http://localhost:3000/health > /dev/null 2>&1; then
                log "✅ Health check exitoso"
                break
            fi
            if [ $i -eq 10 ]; then
                error_exit "Health check failed after deployment"
            fi
            log "⏳ Esperando que la aplicación esté lista... ($i/10)"
            sleep 3
        done
        
        # Limpiar archivos temporales
        log "🧹 Limpiando archivos temporales..."
        pnpm cache clean > /dev/null 2>&1 || true
        
        END_TIME=$(date '+%Y-%m-%d %H:%M:%S')
        log "🎉 Deploy de ALISI completado exitosamente ($END_TIME)"
        log "🌐 Aplicación disponible en: http://localhost:3000"
        log "📊 PM2 Status:"
        pm2 describe alisi-app | grep -E "(status|memory|cpu)" | tee -a $LOG_FILE
        
    else
        log "ℹ️  Push a rama $ref ignorado (solo se procesa $BRANCH)"
    fi
done
```

```bash
# Configuración del hook
sudo su - alisi
chmod +x /var/repo/alisi.git/hooks/post-receive

# Crear archivo de log
touch /var/log/alisi/deploy.log
chmod 664 /var/log/alisi/deploy.log
```

### 4. Variables de Entorno para ALISI

```bash
# .env (en el servidor: /var/www/alisi/.env)
NODE_ENV=production
PORT=3000
HTTPS_PORT=3443

# Configuración específica de ALISI
APP_NAME=ALISI
APP_VERSION=1.0.0
LOG_LEVEL=info

# URLs y dominios
DOMAIN=tu-dominio.com
CANONICAL_URL=https://tu-dominio.com

# Configuración de seguridad
CORS_ORIGIN=https://tu-dominio.com
TRUST_PROXY=true

# Configuración de performance
COMPRESSION_LEVEL=6
STATIC_CACHE_MAX_AGE=31536000

# Configuración de SSL
SSL_CERT_PATH=/var/www/ssl/fullchain.pem
SSL_KEY_PATH=/var/www/ssl/privkey.pem

# Variables opcionales para futuras integraciones
# GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
# CONTACT_EMAIL=contacto@alisi.com
# PHONE_NUMBER=+34123456789
```

```bash
# Configurar permisos del archivo .env
chmod 600 /var/www/alisi/.env
chown alisi:alisi /var/www/alisi/.env
```

---

## 🌐 Configuración de Red (Opcional)

### Redirección de Puertos con iptables

```bash
# Redirigir puerto 80 a 3000 (HTTP)
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000

# Redirigir puerto 443 a 3001 (HTTPS)
sudo iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to-port 3001

# Guardar reglas
sudo iptables-save > /tmp/iptables.rules
sudo cp /tmp/iptables.rules /etc/iptables.rules

# Servicio para cargar al inicio (Ubuntu/Debian)
sudo tee /etc/systemd/system/iptables-restore.service > /dev/null << 'EOF'
[Unit]
Description=Restore iptables rules
After=network.target

[Service]
Type=oneshot
ExecStart=/usr/sbin/iptables-restore /etc/iptables.rules
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable iptables-restore
```

---

## 🔐 SSL/HTTPS (con Let's Encrypt)

### Instalar Certbot

```bash
# Ubuntu/Debian
sudo apt install certbot -y

# RHEL/CentOS/Amazon Linux
sudo dnf install certbot -y
```

### Obtener Certificados SSL para ALISI

```bash
# Parar aplicación ALISI temporalmente
pm2 stop alisi-app

# Obtener certificado para el dominio de ALISI
sudo certbot certonly --standalone \
  -d tu-dominio.com \
  -d www.tu-dominio.com \
  --email contacto@tu-dominio.com \
  --agree-tos \
  --non-interactive

# Copiar certificados a ubicación accesible para ALISI
sudo cp /etc/letsencrypt/live/tu-dominio.com/fullchain.pem /var/www/ssl/
sudo cp /etc/letsencrypt/live/tu-dominio.com/privkey.pem /var/www/ssl/
sudo chown alisi:alisi /var/www/ssl/*
sudo chmod 644 /var/www/ssl/fullchain.pem
sudo chmod 600 /var/www/ssl/privkey.pem

# Verificar certificados
sudo certbot certificates

# Reiniciar ALISI
pm2 start alisi-app

# Verificar HTTPS
curl -I https://tu-dominio.com/health
```

### Renovación Automática SSL para ALISI

```bash
# Script de renovación automática
sudo tee /usr/local/bin/alisi-ssl-renew.sh > /dev/null << 'EOF'
#!/bin/bash
LOG_FILE=/var/log/alisi/ssl-renew.log

echo "[$(date)] Iniciando renovación SSL para ALISI..." >> $LOG_FILE

# Renovar certificados
/usr/bin/certbot renew --quiet >> $LOG_FILE 2>&1

if [ $? -eq 0 ]; then
    echo "[$(date)] Certificados renovados exitosamente" >> $LOG_FILE
    
    # Copiar nuevos certificados
    cp /etc/letsencrypt/live/tu-dominio.com/fullchain.pem /var/www/ssl/
    cp /etc/letsencrypt/live/tu-dominio.com/privkey.pem /var/www/ssl/
    chown alisi:alisi /var/www/ssl/*
    chmod 644 /var/www/ssl/fullchain.pem
    chmod 600 /var/www/ssl/privkey.pem
    
    # Reload ALISI para usar nuevos certificados
    pm2 reload alisi-app
    
    echo "[$(date)] ALISI SSL actualizado correctamente" >> $LOG_FILE
else
    echo "[$(date)] Error en la renovación SSL" >> $LOG_FILE
fi
EOF

# Hacer ejecutable
sudo chmod +x /usr/local/bin/alisi-ssl-renew.sh

# Añadir a crontab para renovación automática (cada día a las 3 AM)
sudo crontab -e
# Añadir línea:
0 3 * * * /usr/local/bin/alisi-ssl-renew.sh
```

---

## 🚀 Proceso de Deploy para ALISI

### Desarrollo y Deploy

```bash
# 1. Desarrollar en rama main
git checkout main
# ... desarrollar características de ALISI ...

# 2. Verificar localmente antes del deploy
pnpm lint          # Verificar código
pnpm build         # Probar build local
pnpm preview       # Probar build localmente

# 3. Preparar para producción
git checkout production
git merge main

# 4. Commit y deploy automático
git add .
git commit -m "Deploy ALISI: descripción de cambios"
git push production production:main

# 5. Verificar deploy
curl https://tu-dominio.com/health
```

### Deploy de Emergencia (Rollback)

```bash
# Ver últimos commits
git log --oneline -5

# Hacer rollback a commit específico
git checkout production
git reset --hard [COMMIT_HASH]
git push production production:main --force

# Verificar que el rollback funcionó
curl https://tu-dominio.com/health
```

### Script de Deploy Rápido para ALISI

```bash
#!/bin/bash
# deploy-alisi.sh

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || ! grep -q '"name": "alisi"' package.json; then
    error "Este script debe ejecutarse desde el directorio raíz de ALISI"
fi

log "🚀 Iniciando deploy de ALISI..."

# Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    warning "Hay cambios sin commitear. Añadiendo automáticamente..."
fi

# Verificar rama actual
CURRENT_BRANCH=$(git branch --show-current)
log "� Rama actual: $CURRENT_BRANCH"

# Lint check
log "🔍 Verificando código con ESLint..."
if ! pnpm lint; then
    error "Errores de lint encontrados. Corrígelos antes del deploy."
fi

# Build local test
log "🔨 Probando build local..."
if ! pnpm build; then
    error "Error en el build local. Revisa los errores."
fi

success "Build local exitoso"

# Confirmar deploy
read -p "🤔 ¿Continuar con el deploy a producción? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Deploy cancelado por el usuario"
    exit 0
fi

# Cambiar a rama production
log "🔄 Cambiando a rama production..."
git checkout production || error "No se pudo cambiar a rama production"

# Merge desde main
log "🔀 Merging desde main..."
git merge main || error "Error al hacer merge desde main"

# Git operations
log "📝 Preparando commit..."
git add .

# Generar mensaje de commit
COMMIT_MESSAGE="Deploy ALISI: $(date '+%Y-%m-%d %H:%M:%S')"
if [ "$1" != "" ]; then
    COMMIT_MESSAGE="Deploy ALISI: $1"
fi

git commit -m "$COMMIT_MESSAGE" || log "No hay cambios para commitear"

# Deploy
log "🚀 Deploying ALISI to production..."
git push production production:main || error "Error en el deploy"

success "Deploy iniciado correctamente"

# Verificar deploy
log "⏳ Esperando que el deploy se complete..."
sleep 10

log "🔍 Verificando health check..."
for i in {1..5}; do
    if curl -f -s https://tu-dominio.com/health > /dev/null; then
        success "ALISI está online y funcionando correctamente"
        break
    fi
    if [ $i -eq 5 ]; then
        error "Health check falló. Revisa los logs del servidor."
    fi
    log "Reintentando health check... ($i/5)"
    sleep 5
done

# Volver a la rama original
git checkout $CURRENT_BRANCH

success "🎉 Deploy de ALISI completado exitosamente!"
log "🌐 Verificar en: https://tu-dominio.com"
log "📊 Monitorear logs: ssh alisi-server 'pm2 logs alisi-app'"
```

```bash
# Hacer el script ejecutable
chmod +x deploy-alisi.sh

# Uso del script
./deploy-alisi.sh "Descripción opcional del cambio"
```

---

## 🛠️ Comandos Útiles para ALISI

### Comandos Locales

```bash
# Deploy rápido de ALISI
./deploy-alisi.sh "Descripción del cambio"

# Ver diferencias antes de deploy
git diff production/main main

# Verificar conexión SSH a servidor ALISI
ssh alisi-server

# Ver logs remotos de ALISI
ssh alisi-server "pm2 logs alisi-app --lines 50"

# Estado del servidor ALISI
ssh alisi-server "pm2 status && df -h && free -h"

# Health check remoto
ssh alisi-server "curl -s http://localhost:3000/health | jq"

# Ver logs de deploy
ssh alisi-server "tail -f /var/log/alisi/deploy.log"

# Verificar SSL
curl -I https://tu-dominio.com
openssl s_client -connect tu-dominio.com:443 -servername tu-dominio.com < /dev/null
```

### Comandos en Servidor ALISI

```bash
# Gestión PM2 específica para ALISI
pm2 status alisi-app           # Estado de ALISI
pm2 logs alisi-app             # Ver logs de ALISI
pm2 logs alisi-app --err       # Solo errores
pm2 restart alisi-app          # Reiniciar ALISI
pm2 reload alisi-app           # Reload sin downtime
pm2 monit alisi-app           # Monitor en tiempo real
pm2 describe alisi-app         # Información detallada

# Logs específicos de ALISI
tail -f /var/log/alisi/combined.log    # Todos los logs
tail -f /var/log/alisi/error.log       # Solo errores
tail -f /var/log/alisi/deploy.log      # Logs de deploy

# Sistema y recursos
df -h                          # Espacio en disco
free -h                       # Memoria
netstat -tlnp | grep :3000   # Puerto HTTP de ALISI
netstat -tlnp | grep :3443   # Puerto HTTPS de ALISI
sudo journalctl -f            # Logs del sistema
top -p $(pgrep -f "alisi-app") # CPU/memoria de ALISI

# Verificaciones de salud
curl http://localhost:3000/health      # Health check local
curl -H "Host: tu-dominio.com" http://localhost:3000/  # Test routing
```

### Scripts de Mantenimiento

```bash
# Limpiar logs antiguos de ALISI
find /var/log/alisi -name "*.log" -mtime +30 -delete

# Backup de configuración
tar -czf alisi-config-$(date +%Y%m%d).tar.gz \
  /var/www/alisi/.env \
  /var/www/alisi/ecosystem.config.cjs \
  /var/repo/alisi.git/hooks/

# Verificar integridad de archivos estáticos
cd /var/www/alisi/dist && find . -type f -name "*.js" -o -name "*.css" | wc -l

# Monitor de recursos en tiempo real para ALISI
watch -n 2 'pm2 describe alisi-app | grep -E "(memory|cpu|uptime)"'
```

---

## 🚨 Troubleshooting ALISI

### Problemas Comunes

#### Deploy de ALISI Falla
```bash
# Ver logs detallados del deploy
ssh alisi-server "tail -f /var/log/alisi/deploy.log"

# Verificar espacio en disco
ssh alisi-server "df -h /var/www/alisi"

# Deploy manual paso a paso
ssh alisi-server
cd /var/www/alisi
git status                    # Verificar estado del repo
pnpm install                  # Reinstalar dependencias
pnpm build                   # Build manual
pm2 restart alisi-app        # Reiniciar aplicación

# Verificar permisos
ls -la /var/www/alisi
sudo chown -R alisi:alisi /var/www/alisi
```

#### ALISI No Responde
```bash
# Verificar estado de PM2
ssh alisi-server "pm2 status alisi-app"

# Ver logs de error específicos
ssh alisi-server "pm2 logs alisi-app --err --lines 100"

# Verificar puertos
ssh alisi-server "netstat -tlnp | grep -E ':(3000|3443)'"

# Reiniciar ALISI
ssh alisi-server "pm2 restart alisi-app"

# Si PM2 no responde, matar proceso y reiniciar
ssh alisi-server "pm2 kill && pm2 start /var/www/alisi/ecosystem.config.cjs"
```

#### Problemas de SSL en ALISI
```bash
# Verificar certificados
ssh alisi-server "ls -la /var/www/ssl/ && openssl x509 -in /var/www/ssl/fullchain.pem -text -noout | grep -A2 'Validity'"

# Verificar configuración SSL en el servidor
ssh alisi-server "curl -I https://localhost:3443/health --insecure"

# Renovar certificados manualmente
ssh alisi-server "sudo certbot renew --dry-run"
ssh alisi-server "sudo certbot renew"

# Verificar configuración de Nginx/proxy (si se usa)
ssh alisi-server "nginx -t && systemctl reload nginx"
```

#### Build de Vite Falla
```bash
# Verificar configuración de Node.js
ssh alisi-server "node --version && pnpm --version"

# Limpiar cache y reinstalar
ssh alisi-server "cd /var/www/alisi && rm -rf node_modules pnpm-lock.yaml && pnpm install"

# Verificar variables de entorno
ssh alisi-server "cd /var/www/alisi && cat .env"

# Build con más verbose
ssh alisi-server "cd /var/www/alisi && NODE_ENV=production pnpm build --verbose"
```

#### ALISI Carga Pero No Funciona (SPA Issues)
```bash
# Verificar que index.html se sirve para todas las rutas
curl -H "Host: tu-dominio.com" http://localhost:3000/about
curl -H "Host: tu-dominio.com" http://localhost:3000/properties

# Verificar archivos estáticos
ssh alisi-server "ls -la /var/www/alisi/dist/assets/"

# Verificar configuración del servidor para SPA
ssh alisi-server "cd /var/www/alisi && cat server.mjs | grep -A5 'get.*\*'"
```

#### Problemas de Performance
```bash
# Verificar compresión
curl -H "Accept-Encoding: gzip" -H "Host: tu-dominio.com" -v http://localhost:3000/

# Verificar cache headers
curl -I https://tu-dominio.com/assets/index.js

# Monitor de recursos
ssh alisi-server "pm2 monit alisi-app"

# Verificar memoria
ssh alisi-server "free -h && ps aux --sort=-%mem | head -10"
```

---

## 🔄 Rollback

### Volver a Versión Anterior

```bash
# Ver historial
git log --oneline -10

# Volver a commit específico
git checkout production
git reset --hard [COMMIT_HASH]
git push production production:main --force
```

---

## 📋 Checklist de Implementación ALISI

### Preparación del Servidor
- [ ] Instalar Node.js 18+, pnpm, PM2, Git en el servidor
- [ ] Crear usuario `alisi` dedicado
- [ ] Configurar directorios: `/var/repo/alisi.git`, `/var/www/alisi`, `/var/log/alisi`
- [ ] Crear repositorio Git bare en `/var/repo/alisi.git`
- [ ] Configurar permisos correctos para usuario `alisi`
- [ ] Instalar y configurar nginx/proxy (opcional)

### Configuración de Deploy
- [ ] Configurar SSH con clave `alisi_deploy`
- [ ] Crear y configurar `server.mjs` para React SPA
- [ ] Crear `ecosystem.config.cjs` con configuración PM2
- [ ] Crear hook `post-receive` con validaciones
- [ ] Configurar variables de entorno `.env`
- [ ] Crear `server-package.json` para dependencias del servidor

### Configuración Local
- [ ] Añadir remote `production` apuntando al servidor ALISI
- [ ] Crear rama `production` para deploys
- [ ] Crear script `deploy-alisi.sh` ejecutable
- [ ] Configurar `.ssh/config` con host `alisi-server`
- [ ] Verificar que `pnpm lint` y `pnpm build` funcionan localmente

### SSL y Dominio
- [ ] Configurar dominio apuntando al servidor
- [ ] Instalar certbot y obtener certificados SSL
- [ ] Configurar renovación automática de SSL
- [ ] Configurar redirección HTTP → HTTPS
- [ ] Verificar que HTTPS funciona correctamente

### Testing y Validación
- [ ] Probar deploy inicial con `./deploy-alisi.sh`
- [ ] Verificar health check en `/health`
- [ ] Probar rutas de React Router (deep linking)
- [ ] Verificar compresión gzip/brotli
- [ ] Verificar headers de cache para assets estáticos
- [ ] Probar rollback con `git reset --hard`

### Monitoreo y Mantenimiento
- [ ] Configurar logs rotativos para `/var/log/alisi/`
- [ ] Configurar script de backup de configuración
- [ ] Documentar procedimientos de emergencia
- [ ] Crear alertas de monitoreo (opcional)
- [ ] Configurar health checks externos (opcional)

---

## � Optimizaciones Específicas para ALISI (React + Vite)

### Configuración de Vite Optimizada
```javascript
// vite.config.js - Configuración específica para producción
export default defineConfig({
  // Configuración existente...
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@headlessui/react', 'framer-motion', 'lucide-react']
        }
      }
    }
  },
  // Precomprensión para servidor
  plugins: [
    // ... plugins existentes
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024
    }),
    compression({
      algorithm: 'brotliCompress', 
      ext: '.br',
      threshold: 1024
    })
  ]
});
```

### Headers Optimizados para Assets
```javascript
// En server.mjs - Headers específicos para React SPA
app.use('/assets', express.static('dist/assets', {
  maxAge: '1y',
  immutable: true,
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    // Habilitar compresión previa si existe
    if (existsSync(path + '.br')) {
      res.setHeader('Content-Encoding', 'br');
      res.setHeader('Vary', 'Accept-Encoding');
    } else if (existsSync(path + '.gz')) {
      res.setHeader('Content-Encoding', 'gzip');
      res.setHeader('Vary', 'Accept-Encoding');
    }
  }
}));
```

### Verificaciones Post-Deploy para React SPA
```bash
# Script adicional en hook post-receive
echo "🧪 Verificando SPA routing..."
sleep 5

# Test de rutas principales de ALISI
ROUTES=("/" "/properties" "/about" "/contact")
for route in "${ROUTES[@]}"; do
    if curl -f -s "http://localhost:3000$route" | grep -q "<title>"; then
        echo "✅ Ruta $route funcionando"
    else
        echo "❌ Error en ruta $route"
    fi
done

# Verificar que los assets se cargan
if curl -f -s "http://localhost:3000" | grep -q "assets/index.*\.js"; then
    echo "✅ Assets de Vite cargando correctamente"
else
    echo "❌ Error: Assets de Vite no encontrados"
fi
```

### Performance Monitoring para ALISI
```javascript
// Middleware adicional en server.mjs para métricas
const startTime = Date.now();
let requestCount = 0;

app.use((req, res, next) => {
  requestCount++;
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 1000) { // Log requests lentas
      console.warn(`Slow request: ${req.method} ${req.path} - ${duration}ms`);
    }
  });
  
  next();
});

// Endpoint de métricas
app.get('/metrics', (req, res) => {
  res.json({
    uptime: Date.now() - startTime,
    requests: requestCount,
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});
```

---

## 🎯 Próximos Pasos

Una vez completado el setup de deploy automático para ALISI:

1. **Configurar monitoreo**: Implementar alertas para downtime
2. **Backup automático**: Scripts de backup de base de datos (cuando se implemente)
3. **CI/CD avanzado**: GitHub Actions para testing automático
4. **CDN**: Configurar CloudFlare para mejor performance global
5. **Staging environment**: Crear entorno de pruebas separado

## 📞 Contacto y Soporte

Para problemas específicos del deploy de ALISI:
- Verificar logs en `/var/log/alisi/`
- Revisar estado de PM2: `pm2 status alisi-app`
- Health check: `curl https://tu-dominio.com/health`

---

**Proyecto:** ALISI - Promotora de Viviendas  
**Versión Deploy:** 3.0 (Específico para React SPA)  
**Actualizado:** Octubre 2025  
**Stack:** React 19 + Vite 7 + Node.js 18+ + PM2 + Express  
**Arquitectura:** SPA (Single Page Application) con servidor estático optimizado