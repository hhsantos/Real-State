import { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

/**
 * Tooltip Component
 * Follows AGENTS.md requirements:
 * - MUST: Delay first tooltip in group
 * - MUST: No delay for subsequent tooltips
 * - Keyboard accessible (Esc to close)
 * - SHOULD: Inline help first, tooltips last resort per AGENTS.md
 */

let tooltipTimeouts = {
  lastShown: 0,
  timeout: null,
};

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 500,
  subsequentDelay = 0,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);

  // MUST: Delay first, no delay for subsequent per AGENTS.md
  const getDelay = () => {
    const now = Date.now();
    const timeSinceLastTooltip = now - tooltipTimeouts.lastShown;
    
    // If less than 500ms since last tooltip, use subsequent delay
    if (timeSinceLastTooltip < 500) {
      return subsequentDelay;
    }
    return delay;
  };

  const showTooltip = () => {
    const currentDelay = getDelay();

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      tooltipTimeouts.lastShown = Date.now();
    }, currentDelay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  // Keyboard support - Esc to close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isVisible) {
        hideTooltip();
        triggerRef.current?.focus();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isVisible]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900',
  };

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
        aria-describedby={isVisible ? 'tooltip' : undefined}
      >
        {children}
      </button>

      {/* Tooltip */}
      {isVisible && content && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50',
            'px-3 py-2 rounded-lg',
            'bg-gray-900 text-white text-sm',
            'shadow-lg',
            'max-w-xs',
            'pointer-events-none',
            // Animation respecting prefers-reduced-motion
            'animate-in fade-in duration-[var(--duration-fast)]',
            positions[position]
          )}
        >
          {content}
          
          {/* Arrow */}
          <div
            className={cn(
              'absolute w-0 h-0',
              'border-4 border-transparent',
              arrows[position]
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}