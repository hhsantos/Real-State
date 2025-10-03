import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

/**
 * Radio Component and RadioGroup
 * Follows AGENTS.md requirements:
 * - MUST: No dead zones - label + control share generous hit target
 * - Touch targets ≥44px mobile
 * - Keyboard accessible (Arrow keys to navigate, Space to select)
 * - Proper ARIA attributes
 */

export const Radio = forwardRef(
  (
    {
      id,
      name,
      value,
      label,
      description,
      checked,
      onChange,
      disabled = false,
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${value}-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn('relative', className)}>
        {/* MUST: Label + control share one generous hit target per AGENTS.md */}
        <label
          htmlFor={radioId}
          className={cn(
            'flex items-start gap-3 cursor-pointer',
            // MUST: Touch target ≥44px mobile per AGENTS.md
            'min-h-[var(--touch-target-min)] md:min-h-[var(--touch-target-desktop)]',
            'py-2',
            // Disabled state
            disabled && 'cursor-not-allowed opacity-60'
          )}
        >
          {/* Radio Input */}
          <div className="relative flex items-center h-5 mt-0.5">
            <input
              ref={ref}
              id={radioId}
              type="radio"
              name={name}
              value={value}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
              className={cn(
                // Hide native radio
                'peer sr-only'
              )}
              aria-label={ariaLabel || label}
              {...props}
            />
            
            {/* Custom Radio */}
            <div
              className={cn(
                'h-5 w-5 flex items-center justify-center',
                'rounded-full border-2',
                'transition-colors duration-[var(--duration-fast)]',
                // Default state
                'border-gray-300 bg-white',
                // Checked state
                'peer-checked:border-primary-600',
                // Focus state
                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500 peer-focus-visible:ring-offset-2',
                // Hover state
                'peer-hover:border-primary-400',
                // Disabled state
                'peer-disabled:bg-gray-100 peer-disabled:border-gray-300'
              )}
              aria-hidden="true"
            >
              {checked && (
                <div
                  className="h-2.5 w-2.5 rounded-full bg-primary-600"
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
      </div>
    );
  }
);

Radio.displayName = 'Radio';

// RadioGroup component for managing a group of radios
export function RadioGroup({
  name,
  value,
  onChange,
  options = [],
  label,
  description,
  error,
  required = false,
  className,
  orientation = 'vertical', // 'vertical' or 'horizontal'
}) {
  const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${groupId}-error` : undefined;
  const descId = description ? `${groupId}-description` : undefined;

  return (
    <fieldset className={cn('w-full', className)}>
      {/* Legend (group label) */}
      {label && (
        <legend
          className={cn(
            'block text-sm font-medium text-gray-700 mb-2',
            required && "after:content-['*'] after:ml-0.5 after:text-red-500"
          )}
        >
          {label}
        </legend>
      )}

      {/* Description */}
      {description && (
        <p id={descId} className="text-sm text-gray-500 mb-3">
          {description}
        </p>
      )}

      {/* Radio Options */}
      <div
        role="radiogroup"
        aria-describedby={cn(descId, errorId).trim() || undefined}
        aria-invalid={error ? 'true' : 'false'}
        className={cn(
          orientation === 'horizontal' 
            ? 'flex flex-wrap gap-4'
            : 'space-y-1'
        )}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            disabled={option.disabled}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={errorId}
          className="mt-2 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
}

export default Radio;