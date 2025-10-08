# 🚀 Quick Reference - Deploy Real State

## Desplegar a Producción

```bash
# 1. Commit cambios locales
git add .
git commit -m "feat: descripción de cambios"

# 2. Push a GitHub (opcional pero recomendado)
git push origin master

# 3. Deploy a producción (IMPORTANTE: usar este comando)
GIT_SSH_COMMAND='ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem' git push production master
```

## Información del Servidor

| Parámetro | Valor |
|-----------|-------|
| **IP** | 18.184.20.26 |
| **Usuario** | ec2-user |
| **SSH Key** | /home/desarrollo/.ssh/Entourage_keypar.pem |
| **Dominio** | https://realstate.dev.dreamsite.es |
| **Puerto PM2** | 3003 (HTTP interno) |
| **Puerto Nginx** | 443 (HTTPS público) |
| **Repo Bare** | /var/repo/realstate.git |
| **App Dir** | /var/www/realstate |

## Git Remotes

```bash
# Ver remotes configurados
git remote -v

# Resultado esperado:
# origin      https://github.com/hhsantos/Real-State.git (fetch/push)
# production  ec2-user@18.184.20.26:/var/repo/realstate.git (fetch/push)
```

## Comandos SSH Útiles

```bash
# Conectar al servidor
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26

# Ver logs PM2
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "pm2 logs realstate-app --lines 50"

# Ver estado PM2
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "pm2 status"

# Reiniciar manualmente (solo si es necesario)
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "pm2 restart realstate-app"

# Health check
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "curl -I http://localhost:3003/health"
```

## Proceso de Deploy Automático

El hook post-receive ejecuta automáticamente:

1. ✅ Extrae archivos a /var/www/realstate
2. ✅ Instala dependencias (pnpm install)
3. ✅ Ejecuta ESLint (warnings no bloquean)
4. ✅ Build con Vite + compresión gzip/brotli
5. ✅ Configura server.mjs y ecosystem.config.cjs
6. ✅ Health check de la app actual
7. ✅ Reinicia PM2 sin downtime
8. ✅ Verifica health check post-deploy
9. ✅ Limpia archivos temporales

## Troubleshooting

### Error: "Your local changes would be overwritten"
```bash
# El servidor tiene cambios locales
# Conectarse y revisar:
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "cd /var/www/realstate && git status"

# Hacer stash si es necesario:
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "cd /var/www/realstate && git stash"
```

### Error: "Network is unreachable"
- Verificar conectividad: `ping 18.184.20.26`
- Verificar que la clave SSH existe: `ls -la /home/desarrollo/.ssh/Entourage_keypar.pem`

### Deploy no actualiza la web
```bash
# 1. Verificar que el push fue exitoso
git log --oneline -1

# 2. Ver logs del servidor
ssh -i /home/desarrollo/.ssh/Entourage_keypar.pem ec2-user@18.184.20.26 "pm2 logs realstate-app --lines 100"

# 3. Limpiar cache del navegador (Ctrl+Shift+R)
```

## Optimizaciones Aplicadas (Fase 1)

✅ **2025-10-08 - Performance Phase 1:**
- Hero image con `fetchPriority="high"` + WebP format
- Preload de imagen LCP en index.html
- Google Fonts asíncrono (no bloquea render)
- Property images con WebP format (25 imágenes)
- **Mejoras esperadas:** LCP -100-200ms, Score 95→98

## Métricas de Performance

**Lighthouse Score Baseline (antes de optimizaciones):**
- Performance: 95/100
- FCP: 0.9s
- LCP: 1.3s
- TBT: 0ms
- CLS: 0

**Objetivo Post-Fase 1:**
- Performance: 97-98/100
- LCP: <1.0s
- Mantener FCP, TBT, CLS excelentes

## Próximas Fases

**Fase 2 - Code Splitting & Tree Shaking:**
- Lazy loading de rutas
- Dynamic imports para componentes pesados
- Bundle analysis y optimización

**Fase 3 - Assets & Caching:**
- Service Worker para cache estratégico
- Preload/Prefetch crítico
- CDN para assets estáticos
