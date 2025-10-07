#!/bin/bash
# Script para configurar SSL con Let's Encrypt para Real State
# Ejecutar como root o con sudo

DOMAIN="realstate.dev.dreamsite.es"
EMAIL="admin@dreamsite.es"  # Cambiar por tu email
SSL_DIR="/var/www/ssl"

echo "🔒 Configurando SSL para Real State"
echo "📌 Dominio: $DOMAIN"
echo "📧 Email: $EMAIL"

# Verificar que certbot esté instalado
if ! command -v certbot &> /dev/null; then
    echo "📦 Instalando certbot..."
    sudo dnf install -y certbot
fi

# Crear directorio para certificados
echo "📁 Creando directorio para certificados..."
sudo mkdir -p $SSL_DIR
sudo chown ec2-user:ec2-user $SSL_DIR

# Detener temporalmente PM2 para liberar el puerto 443
echo "⏸️  Deteniendo aplicaciones en puerto 443..."
pm2 stop all

# Generar certificados con certbot standalone
echo "🔐 Generando certificados SSL con Let's Encrypt..."
sudo certbot certonly --standalone \
    --preferred-challenges http \
    --http-01-port 80 \
    --domain $DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --keep-until-expiring

# Copiar certificados al directorio de la aplicación
echo "📋 Copiando certificados..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem $SSL_DIR/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem $SSL_DIR/
sudo chown ec2-user:ec2-user $SSL_DIR/*.pem
sudo chmod 600 $SSL_DIR/*.pem

# Reiniciar aplicación
echo "🔄 Reiniciando aplicación..."
cd /var/www/realstate
pm2 restart realstate-app

# Configurar renovación automática
echo "🔄 Configurando renovación automática..."
sudo crontab -l 2>/dev/null | grep -v certbot > /tmp/crontab-temp
echo "0 3 * * * certbot renew --quiet --post-hook 'cp /etc/letsencrypt/live/$DOMAIN/*.pem $SSL_DIR/ && chown ec2-user:ec2-user $SSL_DIR/*.pem && pm2 restart realstate-app'" >> /tmp/crontab-temp
sudo crontab /tmp/crontab-temp
rm /tmp/crontab-temp

echo "✅ SSL configurado correctamente"
echo "🌐 Tu sitio debería estar disponible en: https://$DOMAIN"
echo ""
echo "📝 Próximos pasos:"
echo "1. Verifica que el DNS apunte a la IP correcta: 18.184.20.26"
echo "2. Asegúrate de que el puerto 443 esté abierto en el firewall/security group"
echo "3. Prueba la aplicación: https://$DOMAIN"
