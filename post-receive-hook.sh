#!/bin/bash
# Hook post-receive para Real State en Amazon Linux 2023
# Archivo: /var/repo/realstate.git/hooks/post-receive

WORK_TREE=/var/www/realstate
GIT_DIR=/var/repo/realstate.git
BRANCH=main
LOG_FILE=/var/log/realstate/deploy.log
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
        log "🚀 Iniciando deploy de Real State ($START_TIME)"
        log "📝 Deploy: $oldrev -> $newrev"
        log "🖥️ Servidor: Amazon Linux 2023 - IP: 35.158.147.36"
        
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
        log "🔨 Building Real State con Vite..."
        pnpm build || error_exit "Failed to build application"
        
        # Verificar que el build se completó correctamente
        if [ ! -f "dist/index.html" ]; then
            error_exit "Build output not found - dist/index.html missing"
        fi
        
        # Verificar y configurar archivos del servidor
        log "📋 Configurando archivos del servidor..."
        [ -f "$WORK_TREE/server.mjs" ] || log "⚠️ server.mjs not found in repo"
        [ -f "$WORK_TREE/ecosystem.config.cjs" ] || log "⚠️ ecosystem.config.cjs not found in repo"
        cp $WORK_TREE/.env.production $WORK_TREE/.env 2>/dev/null || log "⚠️ .env.production not found in repo"
        
        # Instalar dependencias del servidor de producción
        log "🖥️ Instalando dependencias del servidor..."
        if [ ! -f "server-package.json" ]; then
            log "📝 Creando server-package.json..."
            cat > server-package.json << 'EOF'
{
  "name": "realstate-server",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "compression": "^1.7.4"
  }
}
EOF
        fi
        
        # Las dependencias del servidor ya están instaladas con pnpm install
        log "✅ Dependencias del servidor ya instaladas"
        
        # Verificar configuración PM2
        if [ ! -f "ecosystem.config.cjs" ]; then
            error_exit "ecosystem.config.cjs not found"
        fi
        
        # Health check antes del reinicio
        log "🏥 Realizando health check..."
        if command -v curl > /dev/null; then
            curl -f http://localhost:3003/health > /dev/null 2>&1 && log "✅ Current app is healthy"
        fi
        
        # Reiniciar aplicación con PM2
        log "🔄 Reiniciando Real State..."
        pm2 reload realstate-app --update-env 2>/dev/null || pm2 start ecosystem.config.cjs || error_exit "Failed to start/reload PM2"
        
        # Verificar que la aplicación se inició correctamente
        sleep 5
        if pm2 describe realstate-app | grep -q "online"; then
            log "✅ Real State está online"
        else
            error_exit "Application failed to start properly"
        fi
        
        # Health check post-deploy
        log "🔍 Verificando health check post-deploy..."
        for i in {1..15}; do
            if curl -f http://localhost:3003/health > /dev/null 2>&1; then
                log "✅ Health check exitoso"
                break
            fi
            if [ $i -eq 15 ]; then
                error_exit "Health check failed after deployment"
            fi
            log "⏳ Esperando que la aplicación esté lista... ($i/15)"
            sleep 3
        done
        
        # Limpiar archivos temporales
        log "🧹 Limpiando archivos temporales..."
        pnpm store prune > /dev/null 2>&1 || true
        
        END_TIME=$(date '+%Y-%m-%d %H:%M:%S')
        log "🎉 Deploy de Real State completado exitosamente ($END_TIME)"
        log "🌐 Aplicación disponible en: https://realstate.dev.dreamsite.es"
        log "🔍 Health check: https://realstate.dev.dreamsite.es/health"
        log "🖥️ IP directa: http://35.158.147.36:3003"
        log "📊 PM2 Status:"
        pm2 describe realstate-app | grep -E "(status|memory|cpu)" | tee -a $LOG_FILE
        
    else
        log "ℹ️  Push a rama $ref ignorado (solo se procesa $BRANCH)"
    fi
done