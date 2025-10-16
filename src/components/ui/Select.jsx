import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from '../icons';
import { cn } from '../../utils/cn';

/**
 * Select/Dropdown Component
 * Follows AGENTS.md requirements:
 * - Keyboard accessible (Arrow keys, Enter, Esc)
 * - Touch targets ≥44px mobile
 * - Associated labels
 * - Error states inline
 * - Font-size ≥16px mobile
 */

export default function Select({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Seleccionar…',
  error,
  helperText,
  disabled = false,
  required = false,
  id,
  className,
  'aria-label': ariaLabel,
}) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className={cn(
            'block text-sm font-medium text-gray-700 mb-1',
            required && "after:content-['*'] after:ml-0.5 after:text-red-500"
          )}
        >
          {label}
        </label>
      )}

      <Listbox
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <div className="relative">
          {/* Select Button */}
          <Listbox.Button
            id={selectId}
            className={cn(
              'relative w-full cursor-default rounded-lg border',
              'py-2 pl-3 pr-10 text-left',
              // MUST: Font-size ≥16px mobile per AGENTS.md
              'text-base',
              // Focus styles
              'focus:outline-none focus:ring-2 focus:ring-offset-0',
              'transition-colors duration-[var(--duration-fast)]',
              // Touch action
              'touch-action-manipulation',
              // MUST: Touch target ≥44px mobile per AGENTS.md
              'min-h-[var(--touch-target-min)] md:min-h-[var(--touch-target-desktop)]',
              // Default state
              'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
              // Error state
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              // Disabled state
              disabled && 'bg-gray-100 cursor-not-allowed opacity-60',
              className
            )}
            aria-label={ariaLabel || label}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
          >
            <span className={cn(
              'block truncate',
              !selectedOption && 'text-gray-400'
            )}>
              {selectedOption?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          {/* Dropdown Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-[var(--duration-fast)]"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={cn(
                'absolute z-10 mt-1 w-full',
                'max-h-60 overflow-auto',
                'rounded-lg border border-gray-200 bg-white',
                'py-1 shadow-lg',
                'focus:outline-none',
                // MUST: overscroll-behavior per AGENTS.md
                'overscroll-contain'
              )}
            >
              {options.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No hay opciones disponibles
                </div>
              ) : (
                options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={({ active, selected }) =>
                      cn(
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                        // MUST: Touch target ≥44px mobile per AGENTS.md
                        'min-h-[var(--touch-target-min)] md:min-h-[var(--touch-target-desktop)]',
                        'flex items-center',
                        active && 'bg-primary-50 text-primary-600',
                        selected && 'font-medium',
                        option.disabled && 'opacity-50 cursor-not-allowed'
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={cn('block truncate')}>
                          {option.label}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>

      {/* Helper text */}
      {helperText && !error && (
        <p id={helperId} className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}

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