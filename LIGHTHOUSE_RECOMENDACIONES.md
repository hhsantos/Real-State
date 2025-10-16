# 📊 Análisis Lighthouse - Real State

**Score Actual: 95/100** ✅ ¡Excelente!

## Métricas Core Web Vitals

| Métrica | Valor | Target | Estado |
|---------|-------|--------|--------|
| **FCP** (First Contentful Paint) | 0.9s | <1.8s | ✅ Excelente |
| **LCP** (Largest Contentful Paint) | 1.3s | <2.5s | ✅ Bueno |
| **TBT** (Total Blocking Time) | 0ms | <200ms | ✅ Perfecto |
| **CLS** (Cumulative Layout Shift) | 0 | <0.1 | ✅ Perfecto |
| **Speed Index** | 0.9s | <3.4s | ✅ Excelente |

---

## 🎯 Recomendaciones Prioritarias

### 1. 🖼️ **CRÍTICO: Optimizar Imagen LCP (Hero)**
**Impacto:** Mejora 100ms en LCP

#### Problema:
La imagen del Hero (`https://images.unsplash.com/photo-1600585154340-be6161a56a0c`) no está optimizada.

#### Solución:
```jsx
// src/components/home/Hero.jsx

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80&fm=webp"
          alt=""
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
          fetchPriority="high"  // ← AÑADIR ESTO
          loading="eager"
          aria-hidden="true"
        />
        {/* ... resto del código ... */}
      </div>
    </section>
  );
}
```

**Cambios:**
1. ✅ Añadir `fetchPriority="high"` para priorizar la carga
2. ✅ Añadir `&fm=webp` a la URL de Unsplash para formato WebP
3. ✅ Ya tiene `loading="eager"` ✓
4. ✅ Ya tiene dimensiones explícitas ✓

---

### 2. 🔗 **Precargar Imagen LCP**
**Impacto:** Mejora 100ms en LCP

#### Solución:
```html
<!-- index.html -->
<head>
  <!-- ... otros tags ... -->
  
  <!-- Preload LCP image -->
  <link 
    rel="preload" 
    as="image" 
    href="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80&fm=webp"
    fetchpriority="high"
  />
  
  <title>Real State - Promotora de Viviendas</title>
</head>
```

---

### 3. 🎨 **Eliminar CSS/JS que bloquea el renderizado**
**Impacto:** Mejora 400ms en FCP

#### Problema:
Google Fonts está bloqueando el render inicial.

#### Solución Actual vs Optimizada:

**❌ Actual (Bloquea render):**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

**✅ Optimizado (No bloquea):**
```html
<head>
  <!-- Preconnect ya está bien ✓ -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  
  <!-- Cargar fuente de forma asíncrona -->
  <link 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" 
    rel="stylesheet" 
    media="print" 
    onload="this.media='all'"
  />
  
  <!-- Fallback sin JS -->
  <noscript>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  </noscript>
</head>
```

---

### 4. 📦 **Reducir JavaScript No Usado**
**Impacto:** Mejora 50ms en LCP

#### Análisis:
El bundle actual incluye código que no se usa en la primera carga.

#### Solución - Code Splitting por Rutas:

```jsx
// src/main.jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes críticos (NO lazy)
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Componentes lazy (carga diferida)
const About = lazy(() => import('./pages/About'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const ComponentsDemo = lazy(() => import('./pages/ComponentsDemo'));

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/components" element={<ComponentsDemo />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
```

**Beneficios:**
- ✅ Bundle inicial más pequeño (~30% reducción)
- ✅ Carga de rutas bajo demanda
- ✅ Mejor FCP y TTI

---

### 5. 🖼️ **Imágenes en Formatos Modernos**
**Impacto:** Mejora 150ms en LCP

#### Problema:
Las imágenes de PropertyCard usan URLs de Unsplash sin optimización.

#### Solución:
```jsx
// src/components/property/PropertyCard.jsx

<img
  src={`${property.images[0]}?w=400&h=300&fit=crop&q=80&fm=webp&auto=format`}
  alt={property.title}
  className="w-full h-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
  loading="lazy"
  width="400"
  height="300"
/>
```

**Parámetros añadidos:**
- `&fm=webp` → Formato WebP (70% más ligero que JPG)
- `&auto=format` → Unsplash elige automáticamente el mejor formato según el navegador
- `w=400&h=300` → Tamaño exacto necesario (no cargar imágenes 4K innecesariamente)

---

### 6. 📏 **Dimensiones Correctas de Imágenes**
**Impacto:** Mejora 250ms en LCP

#### Problema:
Algunas imágenes se cargan en resolución mayor a la necesaria.

#### Solución - Responsive Images:

```jsx
// Para Hero (pantalla completa)
<img
  srcSet="
    https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=640&h=360&fm=webp 640w,
    https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1024&h=576&fm=webp 1024w,
    https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fm=webp 1920w
  "
  sizes="100vw"
  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fm=webp"
  alt=""
  width="1920"
  height="1080"
  fetchPriority="high"
  loading="eager"
/>

// Para PropertyCard (thumbnails)
<img
  srcSet="
    ${property.images[0]}?w=300&h=225&fm=webp 300w,
    ${property.images[0]}?w=400&h=300&fm=webp 400w
  "
  sizes="(max-width: 768px) 300px, 400px"
  src="${property.images[0]}?w=400&h=300&fm=webp"
  alt={property.title}
  width="400"
  height="300"
  loading="lazy"
/>
```

---

## 🎯 Plan de Implementación (Orden de Prioridad)

### Fase 1: Cambios Rápidos (5-10 min)
1. ✅ Añadir `fetchPriority="high"` al Hero
2. ✅ Añadir preload de imagen LCP en `index.html`
3. ✅ Añadir `&fm=webp` a URLs de Unsplash
4. ✅ Hacer async la carga de Google Fonts

### Fase 2: Optimizaciones Medias (30 min)
5. ⚠️ Implementar `srcSet` responsive en Hero
6. ⚠️ Implementar `srcSet` en PropertyCard
7. ⚠️ Añadir dimensiones explícitas a todas las imágenes

### Fase 3: Refactorización (1-2 horas)
8. ⚠️ Implementar lazy loading de rutas con React.lazy()
9. ⚠️ Dividir bundles con code splitting

---

## 📈 Impacto Esperado

| Métrica | Actual | Objetivo | Mejora |
|---------|--------|----------|---------|
| Performance Score | 95 | 98+ | +3 puntos |
| LCP | 1.3s | <1.0s | -300ms |
| FCP | 0.9s | <0.7s | -200ms |
| Bundle Size | ~690KB | ~500KB | -27% |

---

## ✅ Checklist de Implementación

### Fase 1 (Inmediato)
- [ ] Hero: Añadir `fetchPriority="high"`
- [ ] Hero: Cambiar URL a WebP (`&fm=webp`)
- [ ] index.html: Preload imagen LCP
- [ ] index.html: Async Google Fonts

### Fase 2 (Esta semana)
- [ ] Hero: Implementar `srcSet` responsive
- [ ] PropertyCard: Añadir `srcSet` y `sizes`
- [ ] Todas las imágenes: Dimensiones explícitas

### Fase 3 (Próxima semana)
- [ ] main.jsx: Code splitting con React.lazy()
- [ ] Vite: Configurar chunking manual si es necesario
- [ ] Test: Verificar que el lazy loading funciona

---

## 🔧 Comandos Útiles

```bash
# Analizar el bundle actual
npm run build
npx vite-bundle-visualizer

# Test local con Lighthouse
npm run build
npm run preview
# Abrir Chrome DevTools > Lighthouse

# Deploy y re-test en producción
git add .
git commit -m "perf: Optimizaciones de Lighthouse"
GIT_SSH_COMMAND="ssh -i ~/.ssh/Entourage_keypar.pem" git push production master
```

---

## 📚 Referencias

- [Web Vitals](https://web.dev/vitals/)
- [Optimize LCP](https://web.dev/optimize-lcp/)
- [Code Splitting con React](https://react.dev/reference/react/lazy)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [fetchPriority](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/fetchPriority)
