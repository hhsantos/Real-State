import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Modal/Dialog Component with Focus Trap
 * Follows AGENTS.md requirements:
 * - MUST: Focus trap when open (Headless UI handles this)
 * - MUST: Escape to close
 * - MUST: Focus returns to trigger on close
 * - MUST: overscroll-behavior: contain
 * - MUST: First focusable element receives focus
 */

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showCloseButton = true,
}) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-7xl',
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-[var(--duration-normal)]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-[var(--duration-fast)]"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        {/* Modal container - MUST: overscroll-behavior per AGENTS.md */}
        <div className="fixed inset-0 overflow-y-auto overscroll-contain">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-[var(--duration-normal)]"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-[var(--duration-fast)]"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'w-full transform overflow-hidden rounded-2xl',
                  'bg-white shadow-xl transition-all',
                  'text-left align-middle',
                  sizes[size]
                )}
              >
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-4 border-b border-gray-200">
                  <div className="flex-1">
                    {title && (
                      <Dialog.Title
                        as="h2"
                        className="text-xl font-semibold text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    {description && (
                      <Dialog.Description className="mt-1 text-sm text-gray-500">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>

                  {/* Close button - MUST: Escape also works per AGENTS.md */}
                  {showCloseButton && (
                    <button
                      type="button"
                      className={cn(
                        'ml-4 rounded-lg p-1.5',
                        'text-gray-400 hover:text-gray-500 hover:bg-gray-100',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                        'transition-colors duration-[var(--duration-fast)]',
                        // MUST: Touch target ≥44px mobile per AGENTS.md
                        'min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)]',
                        'md:min-h-[var(--touch-target-desktop)] md:min-w-[var(--touch-target-desktop)]'
                      )}
                      onClick={onClose}
                      aria-label="Cerrar modal"
                    >
                      <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="px-6 py-4">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// Modal Footer Component
export function ModalFooter({ children, className }) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3',
        'px-6 py-4 border-t border-gray-100 bg-gray-50',
        // Nested radii - SHOULD per AGENTS.md
        'rounded-b-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}