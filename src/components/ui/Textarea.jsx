import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Textarea Component
 * Follows AGENTS.md requirements:
 * - Font-size ≥16px on mobile
 * - Never blocks paste
 * - ⌘/Ctrl+Enter submits, Enter adds newline
 * - Proper error states
 * - Associated labels
 */

const Textarea = forwardRef(
  (
    {
      className,
      label,
      error,
      helperText,
      id,
      required = false,
      disabled = false,
      rows = 4,
      maxLength,
      showCount = false,
      onSubmit, // For Ctrl/Cmd+Enter submission
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const countId = `${textareaId}-count`;

    // Handle Ctrl/Cmd+Enter for submission - MUST per AGENTS.md
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && onSubmit) {
        e.preventDefault();
        onSubmit();
      }
      
      // Call original onKeyDown if provided
      if (props.onKeyDown) {
        props.onKeyDown(e);
      }
    };

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1',
              required && "after:content-['*'] after:ml-0.5 after:text-red-500"
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
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
            // Resize handle
            'resize-y',
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
          aria-label={ariaLabel || label}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            error && errorId,
            helperText && helperId,
            showCount && maxLength && countId
          ).trim() || undefined}
          onKeyDown={handleKeyDown}
          // NEVER block paste per AGENTS.md
          {...props}
        />

        {/* Footer: Helper text, error, and character count */}
        <div className="mt-1 flex items-start justify-between gap-2">
          <div className="flex-1">
            {/* Helper text */}
            {helperText && !error && (
              <p id={helperId} className="text-sm text-gray-500">
                {helperText}
              </p>
            )}

            {/* Error message - MUST be inline per AGENTS.md */}
            {error && (
              <p
                id={errorId}
                className="text-sm text-red-600"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          {/* Character count */}
          {showCount && maxLength && (
            <p
              id={countId}
              className="text-sm text-gray-500 tabular-nums"
              aria-live="polite"
            >
              {props.value?.length || 0}/{maxLength}
            </p>
          )}
        </div>

        {/* Keyboard hint for submission */}
        {onSubmit && (
          <p className="mt-1 text-xs text-gray-400">
            Presiona{' '}
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 rounded border border-gray-300">
              ⌘/Ctrl
            </kbd>
            {' + '}
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-gray-100 rounded border border-gray-300">
              Enter
            </kbd>
            {' '}para enviar
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;