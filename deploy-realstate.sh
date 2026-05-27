#!/bin/bash
# deploy-realstate.sh - Script de deploy para Real State en Amazon Linux 2023

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Server config
SERVER_IP="35.158.147.36"
SERVER_USER="realstate"
APP_NAME="Real State"

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
if [ ! -f "package.json" ] || ! grep -q '"name": "realstate"' package.json; then
    error "Este script debe ejecutarse desde el directorio raíz de Real State"
fi

log "🚀 Iniciando deploy de $APP_NAME a Amazon Linux 2023..."

# Verificar que no hay cambios sin commitear
if [ -n "$(git status --porcelain)" ]; then
    warning "Hay cambios sin commitear. Añadiendo automáticamente..."
fi

# Verificar rama actual
CURRENT_BRANCH=$(git branch --show-current)
log "📍 Rama actual: $CURRENT_BRANCH"

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
echo
log "🎯 Destino: $SERVER_USER@$SERVER_IP"
log "📱 URL: http://$SERVER_IP:3003"
echo
read -p "🤔 ¿Continuar con el deploy a producción? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Deploy cancelado por el usuario"
    exit 0
fi

# Cambiar a rama production
log "🔄 Cambiando a rama production..."
git checkout production || error "No se pudo cambiar a rama production"

# Merge desde main/master
log "🔀 Merging desde $CURRENT_BRANCH..."
git merge $CURRENT_BRANCH || error "Error al hacer merge desde $CURRENT_BRANCH"

# Git operations
log "📝 Preparando commit..."
git add .

# Generar mensaje de commit
COMMIT_MESSAGE="Deploy Real State: $(date '+%Y-%m-%d %H:%M:%S') - Amazon Linux 2023"
if [ "$1" != "" ]; then
    COMMIT_MESSAGE="Deploy Real State: $1"
fi

git commit -m "$COMMIT_MESSAGE" || log "No hay cambios para commitear"

# Deploy
log "🚀 Deploying Real State to production server..."
git push production production:main || error "Error en el deploy"

success "Deploy iniciado correctamente"

# Verificar deploy
log "⏳ Esperando que el deploy se complete..."
sleep 15

log "🔍 Verificando health check..."
for i in {1..6}; do
    if curl -f -s http://$SERVER_IP:3003/health > /dev/null; then
        success "Real State está online y funcionando correctamente"
        
        # Mostrar información de la aplicación
        echo
        log "📋 Información de la aplicación:"
        curl -s http://$SERVER_IP:3003/health | jq . 2>/dev/null || curl -s http://$SERVER_IP:3003/health
        break
    fi
    if [ $i -eq 6 ]; then
        error "Health check falló. Revisa los logs del servidor."
    fi
    log "Reintentando health check... ($i/6)"
    sleep 10
done

# Volver a la rama original
git checkout $CURRENT_BRANCH

success "🎉 Deploy de Real State completado exitosamente!"
echo
log "🌐 Aplicación: http://$SERVER_IP:3003"
log "🔍 Health: http://$SERVER_IP:3003/health"  
log "📊 Monitorear: ssh $SERVER_USER@$SERVER_IP 'pm2 logs realstate-app'"
log "📈 Estado: ssh $SERVER_USER@$SERVER_IP 'pm2 status'"