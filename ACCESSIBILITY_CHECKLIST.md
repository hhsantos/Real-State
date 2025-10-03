# ♿ ACCESSIBILITY CHECKLIST - ALISI WEB APP

**Basado en:** AGENTS.md + WCAG 2.1 AA + WAI-ARIA APG  
**Objetivo:** 100% accesible, usable por todos

---

## ⌨️ KEYBOARD NAVIGATION

### **Global:**
- [ ] Tab order es lógico y predecible
- [ ] Focus-visible visible en todos los elementos interactivos
- [ ] Shift+Tab navega hacia atrás
- [ ] No hay keyboard traps (excepto modales intencionales)
- [ ] Skip to content link al inicio (Tab primero)

### **Navigation:**
- [ ] Tab navega por menú
- [ ] Enter/Space activa links y botones
- [ ] Escape cierra submenús/dropdowns
- [ ] Arrow keys en menús horizontales/verticales (APG)

### **Forms:**
- [ ] Tab navega entre campos
- [ ] Enter envía formulario desde text inputs
- [ ] Ctrl/Cmd+Enter envía desde textareas
- [ ] Space toggle checkboxes/radios
- [ ] Arrow keys en grupos de radios

### **Modals/Dialogs:**
- [ ] Focus trap activo (no puede salir con Tab)
- [ ] Escape cierra modal
- [ ] Focus retorna al trigger al cerrar
- [ ] Primer elemento focusable recibe focus al abrir

### **Carousels/Sliders:**
- [ ] Arrow left/right para navegación
- [ ] Tab accede a controles
- [ ] Space/Enter en botones prev/next

---

## 🎯 TOUCH TARGETS & INPUTS

### **Touch Targets:**
- [ ] Desktop: todos ≥24px × 24px
- [ ] Mobile: todos ≥44px × 44px
- [ ] Si visual <24px, expandir hit area con padding/pseudo-elements
- [ ] Spacing entre targets ≥8px para evitar errores

### **Inputs (Mobile):**
- [ ] font-size ≥16px para evitar zoom automático iOS
- [ ] O viewport meta: `maximum-scale=1, viewport-fit=cover`
- [ ] touch-action: manipulation (prevenir double-tap zoom)
- [ ] -webkit-tap-highlight-color definido

### **General:**
- [ ] NEVER disable browser zoom
- [ ] Generous click areas (no finicky interactions)
- [ ] No dead zones en checkboxes/radios

---

## 📝 FORMS & INPUTS

### **Structure:**
- [ ] Cada input tiene `<label>` asociado (for/id)
- [ ] O aria-label / aria-labelledby si no hay label visual
- [ ] Fieldsets con legend para grupos relacionados
- [ ] Inputs tienen name significativo
- [ ] Autocomplete attributes apropiados

### **Behavior:**
- [ ] Hydration-safe (no pierde focus/value)
- [ ] NEVER bloquear paste (seguridad falsa)
- [ ] Enter envía form desde text input
- [ ] Ctrl/Cmd+Enter envía desde textarea
- [ ] Submit enabled hasta request inicia
- [ ] No bloquear typing (validate after, not during)
- [ ] Permitir submit incompleto (surfacear validación)

### **Validation:**
- [ ] Errors inline next to fields
- [ ] aria-describedby conecta error con input
- [ ] aria-invalid="true" en campos con error
- [ ] Focus first error on submit
- [ ] Mensajes claros y accionables

### **Input Types:**
- [ ] type correcto (email, tel, number, etc)
- [ ] inputmode apropiado (numeric, decimal, etc)
- [ ] spellcheck="false" en emails/usernames/codes
- [ ] Placeholders con ellipsis y ejemplo: "+34 612 345 678…"

### **Password Managers:**
- [ ] Compatible con gestores de contraseñas
- [ ] Allow paste one-time codes (2FA)
- [ ] autocomplete="current-password" / "new-password"

### **Loading States:**
- [ ] Button muestra spinner + mantiene label
- [ ] Disable durante request
- [ ] Use idempotency key si aplica

### **Unsaved Changes:**
- [ ] Warn antes de navigation si hay cambios
- [ ] Confirmation dialog accesible

---

## 🔗 STATE & NAVIGATION

### **URLs:**
- [ ] URL refleja state (filters, tabs, pagination, panels)
- [ ] Usar nuqs o similar para state-in-URL
- [ ] Deep linking funciona
- [ ] URLs son shareable

### **Scroll Restoration:**
- [ ] Back/Forward restaura posición scroll
- [ ] scroll-margin-top en headings para anchor links
- [ ] Smooth scroll con prefers-reduced-motion respetado

### **Links:**
- [ ] Usar `<a>` o `<Link>` para navegación (no `<div onClick>`)
- [ ] Support Cmd/Ctrl/Middle-click para abrir en nueva pestaña
- [ ] Links tienen hover/focus states distintos
- [ ] External links indican apertura externa (icon/text)

---

## 💬 FEEDBACK & NOTIFICATIONS

### **Toasts/Notifications:**
- [ ] aria-live="polite" para no interrumpir
- [ ] aria-live="assertive" solo para emergencias
- [ ] Auto-dismiss con opción de mantener abierto
- [ ] Pausar auto-dismiss on hover/focus

### **Optimistic UI:**
- [ ] Mostrar cambio inmediatamente
- [ ] Reconcile on server response
- [ ] On error: mostrar error y rollback o Undo

### **Destructive Actions:**
- [ ] Confirmation dialog
- [ ] O Undo window (ej: "Deleted. Undo")
- [ ] Clear language sobre consecuencias

### **Action Text:**
- [ ] Ellipsis (…) para opciones con follow-up ("Rename…", "Delete…")
- [ ] Clear CTAs ("Save changes", no solo "OK")

---

## 👆 TOUCH, DRAG & SCROLL

### **Touch Interactions:**
- [ ] Gestures son forgiving (no ultra-precise)
- [ ] Clear affordances (qué es draggable/swipeable)
- [ ] Feedback visual durante interacción

### **Tooltips:**
- [ ] Delay first tooltip in group
- [ ] No delay for subsequent tooltips
- [ ] Keyboard accessible (Esc to close)
- [ ] Don't rely solely on tooltips (use inline help)

### **Modals/Drawers:**
- [ ] overscroll-behavior: contain
- [ ] Prevent body scroll when open

### **Drag & Drop:**
- [ ] Durante drag: disable text selection
- [ ] Set inert on dragged element/containers
- [ ] Visual feedback (cursor, ghost, etc)
- [ ] Keyboard alternative (arrow keys + space)

### **Clickability:**
- [ ] Si parece clickable, ES clickable
- [ ] No "dead-looking" zones interactive

---

## 🎬 ANIMATIONS

### **prefers-reduced-motion:**
- [ ] MUST honor user preference
- [ ] Provide reduced variant (not just removed)
- [ ] Test with system setting enabled

### **Implementation:**
- [ ] CSS animations preferred over JS
- [ ] Use Web Animations API if needed
- [ ] Avoid JS libraries unless necessary

### **Properties:**
- [ ] Animate transform & opacity (compositor-friendly)
- [ ] AVOID top/left/width/height (cause reflows)
- [ ] Correct transform-origin

### **UX:**
- [ ] Animate only to clarify or delight
- [ ] Choose easing matching change type
- [ ] Animations are interruptible
- [ ] Avoid autoplay (input-driven)

---

## 📐 LAYOUT

### **Alignment:**
- [ ] Optical alignment (adjust ±1px if needed)
- [ ] Deliberate grid/baseline alignment
- [ ] Balance icon/text lockups

### **Responsive:**
- [ ] Test mobile (375px+)
- [ ] Test tablet (768px+)
- [ ] Test laptop (1024px+)
- [ ] Test ultra-wide (simulate at 50% zoom)

### **Safe Areas:**
- [ ] Respect env(safe-area-inset-*)
- [ ] Important on iOS devices with notch

### **Scrollbars:**
- [ ] Avoid unwanted scrollbars
- [ ] Fix overflows
- [ ] Custom scrollbars match design (optional)

---

## 📝 CONTENT & ACCESSIBILITY

### **Semantic HTML:**
- [ ] Use native elements (`button`, `a`, `label`, `table`)
- [ ] ARIA only when semantic HTML insufficient
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] Landmarks (header, nav, main, aside, footer)

### **Text Content:**
- [ ] Curly quotes (" ") not straight ("")
- [ ] Ellipsis character (…) not three dots (...)
- [ ] Non-breaking spaces: `10&nbsp;MB`, `⌘&nbsp;K`
- [ ] Avoid widows/orphans where possible

### **Numbers:**
- [ ] Tabular numbers para comparaciones
- [ ] font-variant-numeric: tabular-nums
- [ ] Or use mono font (Geist Mono)
- [ ] Locale-aware formatting

### **Dates/Times:**
- [ ] Locale-aware display (date-fns)
- [ ] Use `<time datetime="">` for machine-readable

### **Icons:**
- [ ] Icon-only buttons MUST have aria-label
- [ ] Decorative icons: aria-hidden="true"
- [ ] Informative icons: have text alternative

### **Images:**
- [ ] Alt text descriptive (or empty if decorative)
- [ ] Prevent CLS: explicit dimensions
- [ ] Lazy load below fold
- [ ] Preload above fold critical images

### **Colors:**
- [ ] Not sole indicator (use icons + text)
- [ ] Meet contrast ratios (APCA > WCAG 2)
- [ ] Increase contrast on :hover/:active/:focus

### **States:**
- [ ] Design empty state
- [ ] Design loading state (skeletons mirror content)
- [ ] Design error state
- [ ] Design dense/sparse content states
- [ ] Resilient to short/long user content

### **Page Title:**
- [ ] `<title>` matches current context
- [ ] Format: "Page Title | Site Name"

### **No Dead Ends:**
- [ ] Always offer next step
- [ ] Error pages have navigation
- [ ] Success messages have "What's next?"

### **Help Text:**
- [ ] Inline help first (not in tooltip)
- [ ] Tooltips as last resort
- [ ] Progressive disclosure for complexity

---

## 🚀 PERFORMANCE

### **Testing:**
- [ ] Test iOS Low Power Mode
- [ ] Test macOS Safari
- [ ] Disable extensions durante testing
- [ ] Profile with CPU/network throttling

### **React Specific:**
- [ ] Track and minimize re-renders (React DevTools)
- [ ] Use React.memo judiciously
- [ ] Prefer uncontrolled inputs (forms)
- [ ] Make controlled loops cheap (keystroke cost)

### **Lists:**
- [ ] Virtualize large lists (virtua, react-window)
- [ ] Pagination for very large datasets
- [ ] Infinite scroll con intersection observer

### **Images:**
- [ ] Lazy load below fold (loading="lazy")
- [ ] Explicit dimensions (prevent CLS)
- [ ] WebP format with fallbacks
- [ ] Responsive images (srcset/sizes)
- [ ] Optimize with imagetools

### **Code:**
- [ ] Code splitting per route
- [ ] Lazy load heavy components
- [ ] Tree shaking configured
- [ ] Bundle analysis regular

### **Mutations:**
- [ ] POST/PATCH/DELETE target <500ms
- [ ] Optimistic updates
- [ ] Loading states
- [ ] Error handling

### **Layout:**
- [ ] Batch layout reads/writes
- [ ] Avoid forced reflows/repaints
- [ ] Use transform over top/left

---

## 🎨 DESIGN TOKENS

### **Shadows:**
- [ ] Layered (ambient + direct)
- [ ] Tint hacia color de fondo
- [ ] Multiple layers for depth

### **Borders:**
- [ ] Semi-transparent for crisp edges
- [ ] Combine with shadows
- [ ] Tint hacia color de fondo

### **Border Radius:**
- [ ] Nested radii: child ≤ parent
- [ ] Concentric radii
- [ ] Consistent scale

### **Contrast:**
- [ ] Meet APCA guidelines (preferred over WCAG 2)
- [ ] Test con simuladores daltonismo
- [ ] Color-blind friendly palettes

### **Focus Rings:**
- [ ] :focus-visible (not just :focus)
- [ ] Clear contrast con background
- [ ] 2px outline minimum
- [ ] Offset 2px para visibility

---

## 🧪 TESTING CHECKLIST

### **Keyboard Testing:**
- [ ] Tab through entire page
- [ ] All interactive elements reachable
- [ ] Focus visible always
- [ ] No keyboard traps
- [ ] Shortcuts work

### **Screen Reader Testing:**
- [ ] Test con NVDA (Windows)
- [ ] Test con JAWS (Windows)
- [ ] Test con VoiceOver (Mac/iOS)
- [ ] Test con TalkBack (Android)

### **Automated Testing:**
- [ ] axe DevTools audit (0 violations)
- [ ] Lighthouse Accessibility (100)
- [ ] WAVE tool
- [ ] Pa11y CI

### **Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### **Device Testing:**
- [ ] iPhone (varios modelos)
- [ ] Android (varios modelos)
- [ ] iPad
- [ ] Desktop (varios tamaños)
- [ ] Ultra-wide (simulate 50% zoom)

### **User Testing:**
- [ ] Users con screen readers
- [ ] Users con magnificación
- [ ] Users solo keyboard
- [ ] Users con dificultades motoras
- [ ] Users mayores

---

## 📋 ARIA ATTRIBUTES REFERENCE

### **Commonly Used:**
```html
<!-- Labels -->
aria-label="descriptive text"
aria-labelledby="id-of-label"
aria-describedby="id-of-description"

<!-- States -->
aria-expanded="true|false"  <!-- dropdowns, accordions -->
aria-selected="true|false"  <!-- tabs, options -->
aria-checked="true|false"   <!-- checkboxes -->
aria-pressed="true|false"   <!-- toggle buttons -->
aria-hidden="true|false"    <!-- decorative elements -->
aria-current="page|step|location|true"  <!-- current item -->
aria-disabled="true|false"
aria-invalid="true|false"

<!-- Properties -->
aria-haspopup="menu|dialog|listbox|tree|grid|true"
aria-controls="id-of-controlled-element"
aria-owns="id-of-owned-element"

<!-- Live Regions -->
aria-live="polite|assertive|off"
aria-atomic="true|false"
aria-relevant="additions|removals|text|all"

<!-- Roles (prefer semantic HTML) -->
role="button|link|navigation|main|banner|complementary|contentinfo"
role="dialog|alertdialog|alert"
role="tablist|tab|tabpanel"
role="menu|menuitem|menubar"
```

---

## ✅ FINAL VALIDATION

Antes de considerar una feature "completa":

- [ ] **Keyboard:** 100% navegable y usable
- [ ] **Screen Reader:** Todo anunciado correctamente
- [ ] **Visual:** Focus visible, contrast OK
- [ ] **Touch:** Targets ≥44px mobile
- [ ] **Forms:** Validación inline, errors descriptivos
- [ ] **States:** Empty, loading, error diseñados
- [ ] **Performance:** <3s TTI, <0.1 CLS
- [ ] **Animations:** prefers-reduced-motion respetado
- [ ] **Responsive:** Probado en todos los breakpoints
- [ ] **Axe:** 0 violations
- [ ] **Lighthouse:** Accessibility 100

---

**Este checklist es la guía definitiva para el proyecto ALISI.**  
**Cada feature debe cumplir estos criterios antes de merge.**

---

**Referencias:**
- AGENTS.md (proyecto)
- [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [The A11Y Project](https://www.a11yproject.com/)
