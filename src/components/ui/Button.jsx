import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from '../icons';

/**
 * Accessible Button Component
 * Follows AGENTS.md requirements:
 * - Touch targets ≥24px desktop, ≥44px mobile
 * - Loading state shows spinner + keeps label
 * - Focus-visible styles
 * - Proper ARIA attributes
 */

const buttonVariants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
  secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus-visible:ring-secondary-500',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500',
  ghost: 'text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-500',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[var(--touch-target-desktop)] md:min-h-[var(--touch-target-desktop)]',
  md: 'px-4 py-2 text-base min-h-[var(--touch-target-min)] md:min-h-[var(--touch-target-desktop)]',
  lg: 'px-6 py-3 text-lg min-h-[var(--touch-target-min)]',
};

const Button = forwardRef(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      type = 'button',
      'aria-label': ariaLabel,
      onClick,
      ...props
    },
    ref
  ) => {
    // MUST: Keep submit enabled until request starts per AGENTS.md
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-lg',
          'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out)]',
          // Focus styles - MUST be visible per AGENTS.md
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Touch action - MUST per AGENTS.md
          'touch-action-manipulation',
          // Disabled state
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variants
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-busy={loading}
        aria-disabled={isDisabled}
        onClick={onClick}
        {...props}
      >
        {/* MUST: Loading button shows spinner + keeps label per AGENTS.md */}
        {loading && (
          <Loader2 
            className="h-4 w-4 animate-spin" 
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;