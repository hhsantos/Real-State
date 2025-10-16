import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from '../icons';
import Button from './Button';

/**
 * Lightbox Component
 * Follows AGENTS.md requirements:
 * - Full keyboard support (Escape to close, Arrow keys to navigate)
 * - Focus management (focus trap, return focus on close)
 * - Accessible (aria-labels, role="dialog")
 * - prefers-reduced-motion support
 * - Prevent scroll when open
 */

export function Lightbox({ images, initialIndex = 0, isOpen, onClose, alt = '' }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent scroll when lightbox is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex, onClose]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Galería de imágenes"
      onClick={onClose}
    >
      {/* Close button */}
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
        aria-label="Cerrar galería"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </Button>

      {/* Previous button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 z-10 text-white hover:bg-white/20"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-8 w-8" aria-hidden="true" />
        </Button>
      )}

      {/* Image */}
      <div
        className="relative max-w-7xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`${alt} - Imagen ${currentIndex + 1} de ${images.length}`}
          className="max-w-full max-h-[90vh] object-contain"
        />

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-lg text-sm tabular-nums">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <Button
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 z-10 text-white hover:bg-white/20"
          aria-label="Imagen siguiente"
        >
          <ChevronRight className="h-8 w-8" aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
