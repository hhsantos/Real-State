import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Button from '../ui/Button';
import { testimonials } from '../../data/testimonials';

/**
 * Testimonials Section
 * Customer reviews carousel
 * MUST per AGENTS.md:
 * - No autoplay (user-controlled)
 * - Keyboard navigation
 * - Clear affordances
 * - Touch-friendly controls (≥44px)
 */

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  if (testimonials.length === 0) {
    return null;
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
          </p>
        </div>

        {/* Testimonial */}
        <div 
          className="max-w-4xl mx-auto"
          role="region"
          aria-label="Testimonios de clientes"
          aria-live="polite"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6" aria-label={`${currentTestimonial.rating} de 5 estrellas`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < currentTestimonial.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-lg">
                  {currentTestimonial.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-gray-600">
                  {currentTestimonial.location}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - MUST: Touch targets ≥44px */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                onKeyDown={(e) => e.key === 'ArrowLeft' && handlePrevious()}
                aria-label="Testimonio anterior"
                className="w-12 h-12 p-0"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Button>

              {/* Dots indicator */}
              <div className="flex gap-2" role="tablist" aria-label="Seleccionar testimonio">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowLeft') handlePrevious();
                      if (e.key === 'ArrowRight') handleNext();
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-[var(--duration-fast)] ${
                      index === currentIndex
                        ? 'bg-primary-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ver testimonio ${index + 1}`}
                    aria-selected={index === currentIndex}
                    role="tab"
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                onKeyDown={(e) => e.key === 'ArrowRight' && handleNext()}
                aria-label="Siguiente testimonio"
                className="w-12 h-12 p-0"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
