import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react-router';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetail from './pages/PropertyDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import ComponentsDemo from './pages/ComponentsDemo';
import NotFound from './pages/NotFound';

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
            <Routes>
              {/* Layout wrapper with header/footer */}
              <Route element={<Layout />}>
                {/* Main routes */}
                <Route path="/" element={<Home />} />
                <Route path="/propiedades" element={<Properties />} />
                <Route path="/propiedades/:id" element={<PropertyDetail />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/components" element={<ComponentsDemo />} />
                
                {/* 404 - MUST: No dead ends per AGENTS.md */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </NuqsAdapter>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
