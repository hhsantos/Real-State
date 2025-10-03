/**
 * Helper utility functions
 * Following AGENTS.md best practices
 */

/**
 * Format price in EUR
 * MUST: Locale-aware per AGENTS.md
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Format number with locale
 * MUST: Locale-aware per AGENTS.md
 */
export function formatNumber(number) {
  return new Intl.NumberFormat('es-ES').format(number);
}

/**
 * Format date in Spanish locale
 * MUST: Locale-aware dates per AGENTS.md
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('es-ES', {
    ...defaultOptions,
    ...options,
  }).format(new Date(date));
}

/**
 * Truncate text with ellipsis character
 * MUST: Use … character per AGENTS.md
 */
export function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Debounce function for performance
 * Useful for search inputs, resize handlers, etc.
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if user prefers reduced motion
 * MUST: Honor prefers-reduced-motion per AGENTS.md
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get responsive image srcset
 * For performance optimization
 */
export function getImageSrcSet(baseUrl, widths = [320, 640, 768, 1024, 1280]) {
  return widths
    .map((width) => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Scroll to element with options
 * MUST: Respect prefers-reduced-motion per AGENTS.md
 */
export function scrollToElement(elementId, options = {}) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  
  element.scrollIntoView({
    behavior,
    block: 'start',
    ...options,
  });
}

/**
 * Get breakpoint value
 */
export function getBreakpoint() {
  const width = window.innerWidth;
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  if (width < 2560) return '2xl';
  return 'ultra';
}

/**
 * Check if is mobile device
 */
export function isMobile() {
  return window.innerWidth < 768;
}

/**
 * Generate unique ID
 */
export function generateId() {
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Non-breaking space helper
 * MUST: Use nbsp to glue terms per AGENTS.md
 * Usage: nbsp('10 MB') => '10 MB'
 */
export function nbsp(text) {
  return text.replace(/ /g, '\u00A0');
}
