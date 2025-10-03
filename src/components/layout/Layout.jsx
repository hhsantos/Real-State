import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

/**
 * Layout Component
 * Follows AGENTS.md requirements:
 * - Semantic HTML landmarks
 * - Skip to content link
 * - Scroll restoration
 * - Main content ID for skip link
 */

export default function Layout() {
  const location = useLocation();

  // MUST: Scroll restoration per AGENTS.md
  useEffect(() => {
    // Scroll to top on route change, or restore position if coming back
    const scrollPosition = sessionStorage.getItem(`scroll-${location.pathname}`);
    
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    } else {
      window.scrollTo(0, 0);
    }

    // Save scroll position before leaving
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.pathname}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main content - MUST have ID for skip link per AGENTS.md */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}