import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Checkbox Component
 * Follows AGENTS.md requirements:
 * - MUST: No dead zones - label + control share generous hit target
 * - Touch targets ≥44px mobile
 * - Keyboard accessible (Space to toggle)
 * - Proper ARIA attributes
 */

const Checkbox = forwardRef(
  (
    {
      id,
      label,
      description,
      checked,
      onChange,
      disabled = false,
      error,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${checkboxId}-error` : undefined;

    return (
      <div className={cn('relative', className)}>
        {/* MUST: Label + control share one generous hit target per AGENTS.md */}
        <label
          htmlFor={checkboxId}
          className={cn(
            'flex items-start gap-3 cursor-pointer',
            // MUST: Touch target ≥44px mobile per AGENTS.md
            'min-h-[var(--touch-target-min)] md:min-h-[var(--touch-target-desktop)]',
            'py-2',
            // Disabled state
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          {/* Checkbox Input */}
          <div className="relative flex items-center h-5 mt-0.5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className={cn(
                // Hide native checkbox
                'peer sr-only'
              )}
              aria-label={ariaLabel || label}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={errorId}
              {...props}
            />
            
            {/* Custom Checkbox */}
            <div
              className={cn(
                'h-5 w-5 flex items-center justify-center',
                'rounded border-2',
                'transition-colors duration-[var(--duration-fast)]',
                // Default state
                'border-gray-300 bg-white',
                // Checked state
                'peer-checked:bg-primary-600 peer-checked:border-primary-600',
                // Focus state
                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2',
                // Hover state
                'peer-hover:border-primary-400',
                // Error state
                error && 'border-red-500 peer-checked:bg-red-600 peer-checked:border-red-600',
                // Disabled state
                'peer-disabled:bg-gray-100 peer-disabled:border-gray-300'
              )}
              aria-hidden="true"
            >
              {checked && (
                <Check
                  className="h-3.5 w-3.5 text-white"
                  strokeWidth={3}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>

          {/* Label and Description */}
          {(label || description) && (
            <div className="flex-1">
              {label && (
                <span className="block text-sm font-medium text-gray-900">
                  {label}
                </span>
              )}
              {description && (
                <span className="block text-sm text-gray-500 mt-0.5">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {/* Error message */}
        {error && (
          <p
            id={errorId}
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;