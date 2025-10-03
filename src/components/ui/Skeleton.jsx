import { cn } from '../../utils/cn';

/**
 * Skeleton Loader Component
 * Follows AGENTS.md requirements:
 * - MUST: Mirror final content to avoid layout shift
 * - Respects prefers-reduced-motion
 * - Accessible (aria-busy, aria-label)
 */

export default function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  lines = 1,
  circle = false,
  'aria-label': ariaLabel = 'Cargando contenido...',
}) {
  // Base animation class - respects prefers-reduced-motion
  const animationClass = 'animate-pulse';

  if (variant === 'text') {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        className="space-y-2"
      >
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-4 bg-gray-200 rounded',
              animationClass,
              // Last line slightly shorter for more realistic look
              i === lines - 1 && lines > 1 && 'w-4/5',
              className
            )}
            style={{ width: width }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar' || circle) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        className={cn(
          'rounded-full bg-gray-200',
          animationClass,
          className
        )}
        style={{
          width: width || height || '40px',
          height: height || width || '40px',
        }}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        className={cn(
          'bg-white rounded-xl border border-gray-200 p-6',
          className
        )}
      >
        <div className="space-y-4">
          {/* Image placeholder */}
          <div className={cn('h-48 bg-gray-200 rounded-lg', animationClass)} />
          
          {/* Title placeholder */}
          <div className={cn('h-6 bg-gray-200 rounded w-3/4', animationClass)} />
          
          {/* Text placeholders */}
          <div className="space-y-2">
            <div className={cn('h-4 bg-gray-200 rounded', animationClass)} />
            <div className={cn('h-4 bg-gray-200 rounded w-5/6', animationClass)} />
          </div>
        </div>
      </div>
    );
  }

  // Default rectangle
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={ariaLabel}
      className={cn(
        'bg-gray-200 rounded',
        animationClass,
        className
      )}
      style={{
        width: width,
        height: height || '1rem',
      }}
    />
  );
}

// Skeleton variants for common use cases
export function SkeletonText({ lines = 3, className }) {
  return <Skeleton variant="text" lines={lines} className={className} />;
}

export function SkeletonAvatar({ size = 40, className }) {
  return (
    <Skeleton
      variant="avatar"
      width={size}
      height={size}
      className={className}
    />
  );
}

export function SkeletonCard({ className }) {
  return <Skeleton variant="card" className={className} />;
}

// Property Card Skeleton - mirrors PropertyCard component
export function SkeletonPropertyCard({ className }) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Cargando propiedad..."
      className={cn(
        'bg-white rounded-xl border border-gray-200 overflow-hidden',
        className
      )}
    >
      {/* Image */}
      <div className="h-48 bg-gray-200 animate-pulse" />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        
        {/* Location */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        
        {/* Price */}
        <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3" />
        
        {/* Features */}
        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
        </div>
      </div>
    </div>
  );
}