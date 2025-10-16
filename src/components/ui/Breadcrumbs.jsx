import { Link } from 'react-router-dom';
import { ChevronRight } from '../icons';

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

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path || index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-white/60"
                  aria-hidden="true" 
                />
              )}
              {isLast ? (
                <span 
                  className="font-medium text-white"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="!text-white !no-underline hover:!text-white hover:!underline hover:!decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-1 -mx-1 transition-none"
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
