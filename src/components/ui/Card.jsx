import { cn } from '../../utils/cn';

/**
 * Card Component
 * Follows AGENTS.md requirements:
 * - Layered shadows (ambient + direct)
 * - Nested radii (child ≤ parent)
 * - Hover states with increased contrast
 */

export default function Card({ 
  children, 
  className, 
  hoverable = false,
  as = 'div',
  ...props 
}) {
  const Component = as;
  
  return (
    <Component
      className={cn(
        // Base styles
        'bg-white rounded-xl',
        // Layered shadows - SHOULD per AGENTS.md
        'shadow-md',
        // Border with semi-transparent color for crisp edges
        'border border-gray-200',
        // Hover effect if hoverable
        hoverable && 'transition-shadow duration-[var(--duration-normal)] hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }) {
  return (
    <div
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-gray-100 bg-gray-50',
        // Nested radii - SHOULD per AGENTS.md: child ≤ parent
        'rounded-b-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}