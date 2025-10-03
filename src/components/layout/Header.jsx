import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { NAV_ITEMS } from '../../utils/constants';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Header Component
 * Follows AGENTS.md requirements:
 * - Keyboard accessible navigation
 * - Focus management
 * - Touch targets ≥44px mobile
 * - Semantic HTML
 */

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* MUST: Skip to content link per AGENTS.md */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>
      
      <nav className="container-custom" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - SHOULD: Right-click surfaces brand assets per AGENTS.md */}
          <Link
            to="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
            onContextMenu={() => {
              // TODO: Implement brand assets download
              console.log('Brand assets menu');
            }}
          >
            <span className="text-2xl font-bold text-primary-600">
              ALISI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-lg',
                  'text-gray-700 hover:text-primary-600 hover:bg-primary-50',
                  'transition-colors duration-[var(--duration-fast)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  // MUST: Touch target ≥24px desktop per AGENTS.md
                  'min-h-[var(--touch-target-desktop)]',
                  'inline-flex items-center'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={cn(
              'md:hidden inline-flex items-center justify-center',
              'p-2 rounded-lg',
              'text-gray-700 hover:bg-gray-100',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
              // MUST: Touch target ≥44px mobile per AGENTS.md
              'min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)]'
            )}
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu - MUST: Focus trap when open per AGENTS.md */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    'px-4 py-3 rounded-lg',
                    'text-gray-700 hover:text-primary-600 hover:bg-primary-50',
                    'transition-colors duration-[var(--duration-fast)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    // MUST: Touch target ≥44px mobile per AGENTS.md
                    'min-h-[var(--touch-target-min)]',
                    'flex items-center'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}