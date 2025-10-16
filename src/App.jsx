import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router';
import Layout from './components/layout/Layout';
import PageLoader from './components/layout/PageLoader';

// Lazy load all pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const About = lazy(() => import('./pages/About'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Contact = lazy(() => import('./pages/Contact'));
const Legal = lazy(() => import('./pages/Legal'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const ComponentsDemo = lazy(() => import('./pages/ComponentsDemo'));
const NotFound = lazy(() => import('./pages/NotFound'));

/**
 * Main App Component
 * Sets up routing, providers, and global configuration
 * Follows AGENTS.md requirements
 */

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NuqsAdapter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Layout wrapper with header/footer */}
                <Route element={<Layout />}>
                  {/* Main routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/propiedades" element={<Properties />} />
                  <Route path="/propiedades/:id" element={<PropertyDetail />} />
                  <Route path="/nosotros" element={<About />} />
                  <Route path="/sobre-nosotros" element={<AboutPage />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/components" element={<ComponentsDemo />} />
                  
                  {/* Legal pages */}
                  <Route path="/aviso-legal" element={<Legal />} />
                  <Route path="/privacidad" element={<Privacy />} />
                  <Route path="/cookies" element={<Cookies />} />
                  
                  {/* 404 - MUST: No dead ends per AGENTS.md */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </NuqsAdapter>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
