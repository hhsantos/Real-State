// ecosystem.config.cjs - Configuración PM2 para Real State
module.exports = {
  apps: [{
    name: "realstate-app",
    script: "./server.mjs",
    instances: 1,
    exec_mode: "fork",
    cwd: "/var/www/realstate",
    
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
    
    // Logging específico para Real State
    log_file: "/var/log/realstate/combined.log",
    out_file: "/var/log/realstate/out.log",
    error_file: "/var/log/realstate/error.log",
    
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