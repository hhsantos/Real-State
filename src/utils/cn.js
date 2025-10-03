import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind CSS classes with proper precedence
 * Usage: cn('px-2 py-1', 'px-3') => 'py-1 px-3'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
