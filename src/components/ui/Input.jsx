import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Accessible Input Component
 * Follows AGENTS.md requirements:
 * - Font-size ≥16px on mobile (prevents zoom)
 * - Never blocks paste
 * - Proper autocomplete
 * - Error states with aria-invalid
 * - Associated labels
 */

const Input = forwardRef(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      id,
      required = false,
      disabled = false,
      autoComplete,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full">
        {/* Label - MUST be associated per AGENTS.md */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            // Base styles
            'w-full rounded-lg border px-3 py-2',
            // MUST: Font-size ≥16px on mobile per AGENTS.md
            'text-base', // 16px
            // Focus styles
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'transition-colors duration-[var(--duration-fast)]',
            // Touch action
            'touch-action-manipulation',
            // Default state
            'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
            // Error state
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            // Disabled state
            disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
            className
          )}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-label={ariaLabel || label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? errorId : helperText ? helperId : undefined
          }
          // NEVER block paste per AGENTS.md
          {...props}
        />

        {/* Helper text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {/* Error message - MUST be inline per AGENTS.md */}
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

Input.displayName = 'Input';

export default Input;