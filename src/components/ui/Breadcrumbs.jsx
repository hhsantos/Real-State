import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Breadcrumbs Component
 * Follows AGENTS.md requirements:
 * - Semantic navigation
 * - Keyboard accessible
 * - ARIA labels
 * - Visual focus indicators
 */

export default function Breadcrumbs({ items, variant = 'light' }) {
  if (!items || items.length === 0) return null;

  const isDark = variant === 'dark';

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.path || index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight 
                  className={`h-4 w-4 ${isDark ? 'text-primary-300' : 'text-gray-400'}`}
                  aria-hidden="true" 
                />
              )}
              {isLast ? (
                <span 
                  className={`font-medium ${isDark ? 'text-white' : 'text-gray-600'}`}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className={`transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 ${
                    isDark 
                      ? 'text-primary-200 hover:text-white focus-visible:ring-white' 
                      : 'text-gray-500 hover:text-primary-600 focus-visible:ring-primary-500'
                  } rounded px-1 -mx-1`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
