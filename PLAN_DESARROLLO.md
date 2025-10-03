# 🚀 PLAN DE DESARROLLO - ALISI WEB APP

**Proyecto:** Nueva web ALISI Promotora Inmobiliaria  
**Stack:** React + Vite + pnpm  
**Fecha inicio:** Octubre 2024

---

## 🎯 OBJETIVOS DEL PROYECTO

1. ✅ **Modernizar** completamente la web obsoleta actual
2. ✅ **Accesibilidad WCAG 2.1 AA** - Cumplir AGENTS.md
3. ✅ **Performance óptimo** - Core Web Vitals en verde
4. ✅ **Responsive-first** - Mobile, tablet, desktop, ultra-wide
5. ✅ **SEO optimizado** - Posicionamiento mejorado
6. ✅ **UX excepcional** - Conversión y satisfacción

---

## 📚 ARQUITECTURA Y STACK TECNOLÓGICO

### **Core Stack:**
```
✅ React 19.2.0 (ya instalado)
✅ Vite 7.1.9 (ya configurado)
✅ pnpm (gestor de paquetes)
```

### **Librerías a instalar:**

#### **Routing & State:**
- `react-router-dom` - Navegación con URLs amigables
- `nuqs` - State en URL (filtros, paginación) - **MUST per AGENTS.md**
- `zustand` o `Context API` - Estado global ligero

#### **UI & Styling:**
- `tailwindcss` - Utility-first CSS (recomendado por rapidez)
- `@headlessui/react` - Componentes accesibles sin estilos
- `clsx` + `tailwind-merge` - Gestión de clases
- `framer-motion` - Animaciones (respetando prefers-reduced-motion)

#### **Forms:**
- `react-hook-form` - Forms performantes (uncontrolled)
- `zod` - Validación de schemas
- `@hookform/resolvers` - Integración zod + react-hook-form

#### **Data Fetching:**
- `@tanstack/react-query` - Cache, refetch, optimistic updates
- `axios` - HTTP client

#### **Maps & Location:**
- `@react-google-maps/api` - Google Maps integration
- `react-leaflet` (alternativa open source)

#### **Images:**
- `react-lazy-load-image-component` - Lazy loading
- Optimización con Vite plugins

#### **Icons:**
- `lucide-react` - Iconos SVG modernos y ligeros
- `react-icons` (alternativa)

#### **Utilities:**
- `date-fns` - Manejo de fechas locale-aware
- `react-helmet-async` - Meta tags dinámicos (SEO)
- `react-hot-toast` - Notificaciones con aria-live

#### **Accessibility:**
- `@radix-ui/react-*` - Componentes accesibles (alternativa a Headless)
- `focus-trap-react` - Gestión de focus en modales
- `react-focus-lock` - Lock focus (MUST per AGENTS.md)

#### **Dev Tools:**
- `eslint-plugin-jsx-a11y` - Linting accesibilidad
- `@axe-core/react` - Testing accesibilidad
- `vite-plugin-compression` - Compresión gzip/brotli
- `vite-plugin-imagetools` - Optimización imágenes

---

## 🏗️ ESTRUCTURA DEL PROYECTO

```
alisi/
├── public/
│   ├── images/           # Imágenes optimizadas
│   ├── fonts/            # Fuentes web
│   └── favicon.ico
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes UI base (Button, Input, etc)
│   │   ├── layout/      # Header, Footer, Layout
│   │   ├── property/    # Componentes de propiedades
│   │   └── forms/       # Formularios
│   ├── pages/           # Páginas/Rutas
│   │   ├── Home.jsx
│   │   ├── Properties.jsx
│   │   ├── PropertyDetail.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── hooks/           # Custom hooks
│   │   ├── useProperties.js
│   │   ├── useFilter.js
│   │   └── useScrollRestoration.js
│   ├── utils/           # Utilidades
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── services/        # API calls
│   │   └── api.js
│   ├── styles/          # Estilos globales
│   │   ├── index.css
│   │   └── tailwind.css
│   ├── data/            # Mock data / JSON
│   │   └── properties.json
│   ├── assets/          # Assets estáticos
│   │   └── icons/
│   ├── App.jsx
│   └── main.jsx
├── AGENTS.md            # ✅ Guía de desarrollo
├── ANALISIS_WEB_ACTUAL.md
├── PLAN_DESARROLLO.md
└── package.json
```

---

## 🎨 SISTEMA DE DISEÑO

### **Paleta de Colores (Modernizada):**
```css
/* Basada en colores corporativos actuales pero modernizados */
:root {
  /* Primary - Azul corporativo */
  --color-primary-50: #EEF2F7;
  --color-primary-100: #D6E0EC;
  --color-primary-200: #B4C7DC;
  --color-primary-300: #8AA9CA;
  --color-primary-400: #6890BB;
  --color-primary-500: #475590;  /* Original */
  --color-primary-600: #3B4A7A;
  --color-primary-700: #2F3B61;
  --color-primary-800: #232C49;
  --color-primary-900: #171F32;
  
  /* Secondary - Verde modernizado */
  --color-secondary-50: #F7F8E8;
  --color-secondary-100: #ECEFD1;
  --color-secondary-200: #D9E0A3;
  --color-secondary-300: #C5D075;
  --color-secondary-400: #B7C355;
  --color-secondary-500: #A8B43A;
  --color-secondary-600: #8B9630;
  --color-secondary-700: #6E7826;
  --color-secondary-800: #515A1C;
  --color-secondary-900: #343C13;
  
  /* Accent - Azul cielo */
  --color-accent-500: #5B8FD9;
  --color-accent-600: #4A7BC4;
  
  /* Neutrals */
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  /* Semantic */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
}
```

### **Typography:**
```css
:root {
  /* Font families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', monospace;
  
  /* Font sizes - Mobile first */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px - MUST per AGENTS.md */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  
  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### **Spacing & Sizing:**
```css
:root {
  /* Spacing scale (8px base) */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px - MUST min hit target */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  
  /* Mobile touch targets - MUST per AGENTS.md */
  --touch-target-min: 44px;      /* Mobile minimum */
  --touch-target-desktop: 24px;  /* Desktop minimum */
  
  /* Border radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;
  
  /* Shadows - Layered per AGENTS.md */
  --shadow-sm: 
    0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-xl: 
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

### **Animations:**
```css
/* MUST honor prefers-reduced-motion per AGENTS.md */
@media (prefers-reduced-motion: no-preference) {
  :root {
    --duration-fast: 150ms;
    --duration-normal: 250ms;
    --duration-slow: 350ms;
    
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-normal: 0ms;
    --duration-slow: 0ms;
  }
  
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```javascript
// tailwind.config.js
export default {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'ultra': '2560px', // MUST test per AGENTS.md
    },
  },
}
```

### **Testing Matrix:**
- ✅ Mobile: 375px - 767px (iPhone, Android)
- ✅ Tablet: 768px - 1023px (iPad)
- ✅ Laptop: 1024px - 1439px
- ✅ Desktop: 1440px - 1919px
- ✅ Ultra-wide: 1920px+ (test at 50% zoom per AGENTS.md)

---

## 🎯 COMPONENTES CORE (Fase 1)

### **1. Layout Components:**
```
✓ Header (sticky, accessible navigation)
  - Logo (right-click = brand assets per AGENTS.md)
  - Navigation menu (keyboard accessible)
  - Mobile menu (focus trap)
  - Search bar (optional)
  
✓ Footer
  - Links
  - Contact info
  - Social media
  - Legal links
  
✓ Layout wrapper
  - Skip to content link (MUST per AGENTS.md)
  - Scroll restoration (MUST per AGENTS.md)
```

### **2. UI Components (Accessible):**
```
✓ Button
  - Loading state (spinner + label per AGENTS.md)
  - Touch targets ≥24px desktop, ≥44px mobile
  - Focus-visible styles
  - aria-label for icon-only
  
✓ Input / TextField
  - font-size ≥16px mobile (MUST per AGENTS.md)
  - autocomplete attributes
  - Error states inline
  - Never block paste (MUST)
  
✓ Card
  - Property cards
  - Info cards
  - Nested radii (MUST per AGENTS.md)
  
✓ Modal / Dialog
  - Focus trap (MUST per AGENTS.md)
  - Escape to close
  - Overlay click to close
  - overscroll-behavior: contain
  
✓ Toast / Notification
  - aria-live="polite" (MUST per AGENTS.md)
  - Auto-dismiss option
  
✓ Tooltip
  - Delay first, no delay for subsequent (MUST)
  - Keyboard accessible
  
✓ Skeleton Loader
  - Mirror final content (MUST per AGENTS.md)
```

### **3. Property Components:**
```
✓ PropertyCard
  - Image with lazy loading
  - Title, location, price
  - Features list
  - CTA button
  
✓ PropertyGrid
  - Responsive grid
  - Virtual scrolling if many items
  
✓ PropertyFilters
  - State in URL with nuqs (MUST per AGENTS.md)
  - Deep linkable
  - Reset filters option
  
✓ PropertyGallery
  - Lightbox
  - Keyboard navigation
  - Swipe gestures mobile
  
✓ PropertyMap
  - Google Maps integration
  - Markers for properties
  - Info windows
```

### **4. Form Components:**
```
✓ ContactForm
  - react-hook-form (uncontrolled per AGENTS.md)
  - Inline validation
  - Focus first error on submit (MUST)
  - Warn on unsaved changes (MUST)
  
✓ SearchForm
  - Autocomplete
  - Voice search (future)
  
✓ FilterForm
  - Checkboxes (generous hit targets)
  - Range sliders
  - Select dropdowns
```

---

## 📄 PÁGINAS PRINCIPALES

### **1. Home (/):**
```
- Hero section con CTA
- Featured properties (carousel/grid)
- About section (resumen)
- Latest news (opcional)
- Contact CTA
- Trust indicators (25+ años, 1300+ viviendas)
```

### **2. Properties (/propiedades):**
```
- Filters sidebar/top
- Property grid
- Pagination (state in URL)
- Sort options
- Map view toggle
- Empty state design (MUST per AGENTS.md)
```

### **3. Property Detail (/propiedades/:id):**
```
- Image gallery
- Title, location, price
- Features list
- Description
- Map with location
- Similar properties
- Contact form
- Share buttons
- Virtual tour (future)
```

### **4. About (/nosotros):**
```
- Company history
- Mission & values
- Team (opcional)
- Achievements (1300+ viviendas)
- Timeline
```

### **5. Contact (/contacto):**
```
- Contact form
- Map with office location
- Contact info (phone, email, address)
- Business hours
- Social media links
```

### **6. 404 Not Found:**
```
- Clear message
- Navigation options (MUST: no dead ends per AGENTS.md)
- Search
- Back to home
```

---

## ♿ ACCESIBILIDAD (AGENTS.md Compliance)

### **Checklist obligatorio:**

#### **Keyboard Navigation:**
- [ ] Tab order lógico
- [ ] Focus-visible en todos los interactivos
- [ ] Focus trap en modales
- [ ] Escape cierra modales/dropdowns
- [ ] Enter/Space activa botones
- [ ] Arrow keys en listas/menús

#### **Screen Reader:**
- [ ] Semantic HTML (`button`, `nav`, `main`, `article`)
- [ ] aria-label en icon-only buttons
- [ ] aria-live para notificaciones
- [ ] aria-hidden en decorativos
- [ ] Skip to content link
- [ ] Hierarchical headings (h1-h6)

#### **Forms:**
- [ ] Labels asociados
- [ ] Error messages inline
- [ ] autocomplete attributes
- [ ] Never block paste
- [ ] Font-size ≥16px mobile
- [ ] Warn unsaved changes

#### **Touch & Mobile:**
- [ ] Hit targets ≥44px mobile
- [ ] touch-action: manipulation
- [ ] No zoom disable
- [ ] Viewport meta correcto

#### **Visual:**
- [ ] Contrast ratios (APCA preferred)
- [ ] Color no es única cue
- [ ] Text resizable 200%
- [ ] No autoplay videos/carousels

#### **Performance:**
- [ ] Images lazy loaded
- [ ] Skeleton loaders
- [ ] No CLS (explicit dimensions)
- [ ] Virtual scrolling large lists

---

## 🚀 PLAN DE IMPLEMENTACIÓN (Fases)

### **FASE 0: Setup (1-2 días)** ✅ PARCIALMENTE COMPLETADO
- [x] Inicializar React + Vite
- [ ] Instalar dependencias core
- [ ] Configurar Tailwind CSS
- [ ] Setup ESLint + jsx-a11y
- [ ] Configurar React Router
- [ ] Setup estructura de carpetas

### **FASE 1: Sistema de Diseño (2-3 días)**
- [ ] Definir tokens de diseño (colores, typography, spacing)
- [ ] Crear componentes UI base (Button, Input, Card)
- [ ] Implementar sistema de temas
- [ ] Documentar componentes (Storybook opcional)

### **FASE 2: Layout & Navigation (2-3 días)**
- [ ] Header responsive con navegación
- [ ] Footer
- [ ] Layout wrapper
- [ ] Routing setup
- [ ] 404 page
- [ ] Skip to content

### **FASE 3: Home Page (3-4 días)**
- [ ] Hero section
- [ ] Featured properties section
- [ ] About section
- [ ] Contact CTA
- [ ] Responsive completo

### **FASE 4: Properties Catalog (4-5 días)**
- [ ] Property card component
- [ ] Property grid/list
- [ ] Filters con nuqs (state in URL)
- [ ] Sort functionality
- [ ] Pagination
- [ ] Empty states
- [ ] Loading states (skeletons)

### **FASE 5: Property Detail (3-4 días)**
- [ ] Gallery component
- [ ] Property info layout
- [ ] Map integration
- [ ] Contact form
- [ ] Similar properties
- [ ] Share functionality

### **FASE 6: Static Pages (2-3 días)**
- [ ] About page
- [ ] Contact page
- [ ] Legal pages

### **FASE 7: Forms & Interactions (2-3 días)**
- [ ] Contact form con validación
- [ ] Search functionality
- [ ] Form submissions
- [ ] Toast notifications

### **FASE 8: Optimization (2-3 días)**
- [ ] Image optimization
- [ ] Code splitting
- [ ] Lazy loading
- [ ] Performance audit
- [ ] Lighthouse 90+

### **FASE 9: Accessibility Audit (2 días)**
- [ ] Keyboard testing completo
- [ ] Screen reader testing
- [ ] Axe Core audit
- [ ] WCAG 2.1 AA compliance
- [ ] Fixes

### **FASE 10: Testing & QA (2-3 días)**
- [ ] Cross-browser testing
- [ ] Responsive testing (todos los breakpoints)
- [ ] User testing
- [ ] Bug fixes

### **FASE 11: Deploy (1 día)**
- [ ] Build optimization
- [ ] Hosting setup (Vercel/Netlify)
- [ ] Domain configuration
- [ ] Analytics setup
- [ ] Launch

---

## 📊 MÉTRICAS DE ÉXITO

### **Performance:**
- Lighthouse Performance: ≥90
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1
- Time to Interactive: <3.8s

### **Accessibility:**
- Lighthouse Accessibility: 100
- WCAG 2.1 AA: 100% compliance
- Keyboard navigation: 100% functional
- Screen reader: 100% compatible

### **SEO:**
- Lighthouse SEO: ≥95
- Meta tags: Complete
- Structured data: Implemented
- Sitemap: Generated

### **Business:**
- Mobile traffic: +60%
- Conversion rate: +25-40%
- Bounce rate: -20%
- Page views: +50%
- Time on site: +40%

---

## 🛠️ COMANDOS ÚTILES

```bash
# Desarrollo
pnpm dev              # Iniciar dev server
pnpm build            # Build producción
pnpm preview          # Preview build
pnpm lint             # Lint código
pnpm lint:fix         # Fix linting issues

# Testing (a configurar)
pnpm test             # Run tests
pnpm test:watch       # Watch mode
pnpm test:coverage    # Coverage report

# Accessibility
pnpm audit:a11y       # Audit accesibilidad
```

---

## 📚 RECURSOS Y REFERENCIAS

### **Documentación:**
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [APCA Contrast](https://apcacontrast.com/)
- [React Docs](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Tools:**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [WAVE](https://wave.webaim.org/)

---

## ✅ PRÓXIMOS PASOS INMEDIATOS

1. **Instalar dependencias core** (Tailwind, Router, etc)
2. **Configurar Tailwind con sistema de diseño**
3. **Crear componentes UI base accesibles**
4. **Implementar layout y navegación**
5. **Desarrollar Home page**

---

**Documento vivo - Actualizar según progreso**
