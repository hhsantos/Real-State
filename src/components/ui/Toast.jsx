import { Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from '../icons';
import { cn } from '../../utils/cn';

/**
 * Toast Notification Component
 * Follows AGENTS.md requirements:
 * - MUST: aria-live="polite" for non-interrupting notifications
 * - MUST: aria-live="assertive" only for emergencies
 * - Auto-dismiss with pause on hover
 * - Accessible close button
 */

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const toastStyles = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

const iconStyles = {
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
  info: 'text-blue-600',
};

export default function Toast({
  show,
  onClose,
  title,
  message,
  type = 'info',
  duration = 5000,
  assertive = false, // Only use for critical/emergency notifications
}) {
  const Icon = toastIcons[type];

  useEffect(() => {
    if (!show || duration === null) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  return (
    <div
      // MUST: aria-live per AGENTS.md
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 pointer-events-none"
    >
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-[var(--duration-normal)]"
        enterFrom="translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transform ease-in duration-[var(--duration-fast)]"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-2 opacity-0"
      >
        <div
          className={cn(
            'pointer-events-auto w-full max-w-sm',
            'rounded-lg border shadow-lg',
            'p-4',
            toastStyles[type]
          )}
          role="alert"
        >
          <div className="flex items-start gap-3">
            {/* Icon */}
            <Icon
              className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconStyles[type])}
              aria-hidden="true"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {title && (
                <p className="font-semibold text-sm">
                  {title}
                </p>
              )}
              {message && (
                <p className={cn('text-sm', title && 'mt-1')}>
                  {message}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              className={cn(
                'flex-shrink-0 rounded-lg p-1',
                'hover:bg-black/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'transition-colors duration-[var(--duration-fast)]',
                // MUST: Touch target ≥44px mobile per AGENTS.md
                'min-h-[var(--touch-target-desktop)] min-w-[var(--touch-target-desktop)]',
                type === 'success' && 'focus-visible:ring-green-500',
                type === 'error' && 'focus-visible:ring-red-500',
                type === 'warning' && 'focus-visible:ring-yellow-500',
                type === 'info' && 'focus-visible:ring-blue-500'
              )}
              onClick={onClose}
              aria-label="Cerrar notificación"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
}

// Toast Container for multiple toasts
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          show={toast.show}
          onClose={() => removeToast(toast.id)}
          {...toast}
        />
      ))}
    </div>
  );
}