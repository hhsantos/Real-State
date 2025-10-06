# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- React 19 + Vite 7 + Tailwind CSS 4 web app for ALISI S.A. with an accessibility-first approach guided by AGENTS.md.
- Package manager: pnpm. Node >= 18 recommended (see README.md Quick Start).

Common commands
- Install dependencies
  - pnpm install
- Develop (Vite dev server)
  - pnpm dev
  - Default URL: http://localhost:5173
- Build (production)
  - pnpm build
- Preview built app
  - pnpm preview
- Lint
  - pnpm lint
  - Note: ESLint is configured with jsx-a11y rules; see eslint.config.js.
- Testing
  - There is no test runner configured in package.json. PLAN_DESARROLLO.md outlines planned testing scripts, but they are not yet available.

High-level architecture
- Entrypoint and providers
  - index.html mounts the app at #root. src/main.jsx mounts <App />.
  - src/App.jsx configures top-level providers and routing:
    - HelmetProvider for SEO/meta tags
    - React Query (QueryClientProvider) for server state and caching
    - BrowserRouter for routing
    - NuqsAdapter to keep view state in the URL
    - Routes wrapped by a shared Layout (header/footer) and a catch-all 404
- Routing and pages (big picture)
  - Public routes under the Layout: “/” (Home), “/propiedades”, “/propiedades/:id”, “/sobre-nosotros” and other legal/contact pages. A ComponentsDemo page exists to showcase UI primitives.
  - Navigation items live in src/utils/constants.js (NAV_ITEMS). When adding routes that should appear in the header, update NAV_ITEMS alongside route definitions in App.jsx.
- UI system
  - Accessible, reusable primitives live in src/components/ui (Button, Input, Card, Modal with focus trap, Toast with aria-live, Tooltip, Skeletons, Breadcrumbs, Lightbox). Central exports in src/components/ui/index.js.
  - Layout components (Header, Footer, Layout) live in src/components/layout.
- Domain components and data
  - Property-related components in src/components/property and filters in PropertyFilters.
  - Mock data and helpers under src/data (e.g., properties.js, testimonials.js). Filtering logic is colocated with the data.
- State and URL
  - React Query handles async data state (default staleTime 5 minutes, no refetch on focus).
  - nuqs keeps view state (e.g., filters, tabs) reflected in the URL, enabling deep-linking and Back/Forward restoration.
- Styling and design system
  - Tailwind CSS configured in tailwind.config.js with customized colors, breakpoints (including xs and ultra), fonts, spacing, and shadows. index.css contains global styles.
  - Animations and timings align with prefers-reduced-motion (see constants/helpers and Tailwind config values); use transform/opacity-based transitions.
- Build tooling
  - Vite plugins: @vitejs/plugin-react, vite-plugin-compression (gzip + brotli), vite-imagetools. Alias @ -> ./src.
  - Manual chunking separates vendor groups (react, UI, forms, query) for better caching and performance.
- Linting
  - eslint.config.js extends @eslint/js, react-hooks, and react-refresh. jsx-a11y plugin enforces accessibility rules across JSX.

Important rules from AGENTS.md (enforced conventions)
- Keyboard and focus
  - Full keyboard support per WAI-ARIA APG; always show :focus-visible; manage focus correctly (e.g., trap/restore in modals and menus).
- Touch targets and inputs
  - Minimum hit areas: ≥44px on mobile, ≥24px on desktop; mobile input font-size ≥16px; never disable browser zoom; prefer touch-action: manipulation.
- Forms
  - Use correct input types/autocomplete; never block paste; show inline errors; on submit, focus the first error; keep submit enabled until the request starts.
- Navigation and URL state
  - Links are real links (<a>/<Link>); support Cmd/Ctrl/middle-click. URL should reflect state (filters/tabs/pagination) via nuqs. Back/Forward must restore scroll.
- Feedback
  - Confirm destructive actions or provide Undo; use polite aria-live for non-critical announcements (e.g., toasts).
- Motion and performance
  - Honor prefers-reduced-motion; animate only transform/opacity. Prevent CLS (explicit image dimensions), lazy-load images, and consider virtualizing large lists.

Notes for making changes
- Use pnpm for all package operations.
- When adding a new route:
  - Register it in src/App.jsx under the Layout route wrapper.
  - If it should appear in the header, add it to NAV_ITEMS in src/utils/constants.js.
  - Ensure the page sets a proper <title> and description via react-helmet-async.
- When adding interactive UI:
  - Prefer primitives in src/components/ui and follow AGENTS.md for keyboard/focus management, touch targets, aria semantics, and motion preferences.
- When adding filters or view state:
  - Reflect state in the URL via nuqs to preserve deep-linking and Back/Forward behavior.

References from repository docs
- README.md: Quick Start, stack overview, accessibility and performance goals, and roadmap.
- AGENTS.md: Detailed MUST/SHOULD/NEVER rules that shape UI, accessibility, motion, and performance choices. Treat these as requirements when modifying or adding components.
