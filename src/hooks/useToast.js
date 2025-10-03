import { useState, useCallback } from 'react';

/**
 * Custom hook for managing toast notifications
 * Usage:
 * const { toasts, showToast, removeToast } = useToast();
 */

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({
    title,
    message,
    type = 'info',
    duration = 5000,
    assertive = false,
  }) => {
    const id = toastId++;
    const newToast = {
      id,
      title,
      message,
      type,
      duration,
      assertive,
      show: true,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (duration !== null) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    clearAll,
  };
}

export default useToast;