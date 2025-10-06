# 🏡 Real State - Web App Moderna

> Nueva web para Real State - Promotora de Viviendas con más de 25 años de experiencia

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%202.1%20AA-green)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎯 Sobre el Proyecto

Rediseño completo y modernización de la web de Real State, empresa líder en promoción inmobiliaria con:
- ✅ Más de **25 años** de experiencia
- ✅ Más de **1.300 viviendas** construidas
- ✅ Presencia consolidada en Madrid y alrededores

### Objetivos del Proyecto:
- 🚀 **Modernizar** la tecnología (de HTML4/Tablas a React moderno)
- ♿ **Accesibilidad WCAG 2.1 AA** completa
- 📱 **Mobile-first** y totalmente responsive
- ⚡ **Performance** optimizado (Core Web Vitals)
- 🔍 **SEO** mejorado
- 🎨 **UX excepcional**

---

## 🛠️ Stack Tecnológico

### Core:
- **React 19.2** - UI Library (latest)
- **Vite 7.1** - Build tool ultrarrápido
- **pnpm** - Gestor de paquetes eficiente

### Styling:
- **Tailwind CSS 4.1** - Utility-first CSS
- **PostCSS** - Transformaciones CSS
- **Framer Motion** - Animaciones accesibles

### Routing & State:
- **React Router DOM** - Navegación
- **nuqs** - State en URL (filters, pagination)
- **Zustand** - Estado global ligero

### Forms & Validation:
- **React Hook Form** - Forms performantes
- **Zod** - Validación de schemas

### Data & API:
- **TanStack Query (React Query)** - Data fetching, cache
- **Axios** - HTTP client

### UI Components:
- **Headless UI** - Componentes accesibles base
- **Lucide React** - Iconos SVG modernos

### Developer Experience:
- **ESLint** + **jsx-a11y** - Linting con reglas de accesibilidad
- **Vite Plugins** - Compression, image optimization
- **React Helmet Async** - Meta tags dinámicos (SEO)

---

## 🚀 Quick Start

### Prerequisitos:
```bash
node >= 18
pnpm >= 8
```

### Instalación:
```bash
# Clonar repositorio (cuando aplique)
git clone [url]
cd alisi

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Scripts disponibles:
```bash
pnpm dev      # Servidor de desarrollo (http://localhost:5173)
pnpm build    # Build para producción
pnpm preview  # Preview del build
pnpm lint     # Linting del código
```

---

## 📁 Estructura del Proyecto

```
real-state/
├── public/              # Assets estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   ├── ui/         # Button, Input, Card, etc.
│   │   ├── layout/     # Header, Footer, Layout
│   │   ├── property/   # Componentes de propiedades
│   │   └── forms/      # Formularios
│   ├── pages/          # Páginas/Rutas
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utilidades (cn, constants, helpers)
│   ├── services/       # API calls
│   ├── data/           # Mock data / JSON
│   └── styles/         # Estilos globales
├── AGENTS.md           # 📖 Guía de desarrollo (IMPORTANTE)
├── PLAN_DESARROLLO.md  # Roadmap completo
├── ACCESSIBILITY_CHECKLIST.md  # Checklist A11y
└── ANALISIS_WEB_ACTUAL.md      # Análisis web antigua
```

---

## ♿ Accesibilidad (AGENTS.md Compliance)

Este proyecto sigue estrictamente las directrices de **AGENTS.md** para garantizar una experiencia accesible para todos:

### ✅ Implementado:
- Touch targets ≥44px mobile, ≥24px desktop
- Font-size ≥16px en inputs mobile (previene zoom iOS)
- Never disable browser zoom
- Full keyboard navigation support
- Focus-visible styles en todos los interactivos
- prefers-reduced-motion respetado
- Semantic HTML (landmarks, headings)
- ARIA attributes apropiados
- Skip to content link
- Scroll restoration
- Inline form errors
- Never block paste

### 🧪 Testing A11y:
```bash
# Lighthouse audit
npm run lighthouse  # (por configurar)

# axe-core testing
# (integrado en componentes de desarrollo)
```

---

## 🎨 Sistema de Diseño

### Colores Corporativos:
```css
/* Primary - Azul Real State */
--color-primary-500: #475590
--color-primary-600: #3B4A7A  /* Principal interactivo */

/* Secondary - Verde modernizado */
--color-secondary-500: #A8B43A

/* Accent - Azul cielo */
--color-accent-500: #5B8FD9
```

### Touch Targets (AGENTS.md):
- **Mobile:** ≥44px × 44px (mínimo)
- **Desktop:** ≥24px × 24px (mínimo)

### Animaciones:
- Todas respetan `prefers-reduced-motion`
- Durations: fast (150ms), normal (250ms), slow (350ms)
- Compositor-friendly: `transform` y `opacity`

---

## 📱 Responsive Design

### Breakpoints:
```javascript
xs:   475px   // Móviles pequeños
sm:   640px   // Móviles
md:   768px   // Tablets
lg:   1024px  // Laptops
xl:   1280px  // Desktops
2xl:  1536px  // Desktops grandes
ultra: 2560px // Ultra-wide (testeado)
```

**Testing:** Verificado en mobile, tablet, laptop, desktop y ultra-wide (50% zoom)

---

## 🔍 SEO

- ✅ Meta tags dinámicos (React Helmet)
- ✅ Semantic HTML
- ✅ URLs amigables
- ✅ Sitemap XML (por implementar)
- ✅ Schema.org markup (por implementar)
- ✅ Open Graph tags (por implementar)

---

## ⚡ Performance

### Optimizaciones:
- Code splitting automático (Vite)
- Lazy loading de rutas
- Image optimization (vite-imagetools)
- Compression (gzip + brotli)
- React Query para caching
- Chunks de vendor separados

### Objetivos (Lighthouse):
- Performance: ≥90
- Accessibility: 100
- Best Practices: ≥90
- SEO: ≥95

---

## 📚 Documentación

- **[AGENTS.md](./AGENTS.md)** - Guía de desarrollo y reglas MUST/SHOULD
- **[PLAN_DESARROLLO.md](./PLAN_DESARROLLO.md)** - Roadmap y arquitectura completa
- **[ACCESSIBILITY_CHECKLIST.md](./ACCESSIBILITY_CHECKLIST.md)** - Checklist detallado A11y
- **[ANALISIS_WEB_ACTUAL.md](./ANALISIS_WEB_ACTUAL.md)** - Análisis de la web antigua
- **[SETUP_COMPLETADO.md](./SETUP_COMPLETADO.md)** - Estado actual del proyecto

---

## 🗺️ Roadmap

### ✅ Fase 0: Setup (COMPLETADO)
- Inicialización del proyecto
- Configuración de Tailwind CSS
- Componentes UI base (Button, Input, Card)
- Layout (Header, Footer)
- Páginas iniciales (Home, 404)
- Sistema de diseño base

### 🚧 Fase 1: Componentes UI (En progreso)
- Modal/Dialog con focus trap
- Toast/Notifications
- Skeleton loaders
- Formularios completos
- Property cards

### 📋 Fase 2: Páginas principales
- Properties (listado con filtros)
- Property Detail
- About
- Contact

### 📋 Fase 3: Funcionalidades
- Sistema de filtros (state in URL)
- Búsqueda
- Galería de imágenes
- Integración de mapas

### 📋 Fase 4: Optimización & Testing
- Performance optimization
- Accessibility audit completo
- Cross-browser testing
- SEO optimization

### 📋 Fase 5: Deploy
- Build optimization
- Hosting setup
- Analytics
- Launch 🚀

---

## 🤝 Contribuir

### Reglas de desarrollo:
1. **Leer AGENTS.md** antes de empezar
2. **Accesibilidad primero** - Usar checklist
3. **Mobile-first** approach
4. **Semantic HTML** siempre
5. **Test keyboard navigation** en cada feature
6. **Honor prefers-reduced-motion**
7. **Lint antes de commit**

### Workflow:
```bash
# Antes de empezar
git pull origin main

# Crear rama feature
git checkout -b feature/nombre

# Desarrollo con linting
pnpm lint

# Commit
git commit -m "feat: descripción"

# Push y PR
git push origin feature/nombre
```

---

## 📄 Licencia

Código propietario © 2025 Real State

---

## 🎉 Estado Actual

✅ **Proyecto inicializado y funcionando**  
✅ **Servidor de desarrollo activo** - `http://localhost:5173`  
✅ **Linting passing** - 0 errores  
✅ **Accesibilidad base** implementada  
✅ **Sistema de diseño** configurado  
✅ **13 archivos** creados  

**¡Listo para desarrollo activo!** 🚀

---

<p align="center">
  Construido con ❤️ por Dreamsite.es siguiendo las mejores prácticas de accesibilidad y performance
</p>
