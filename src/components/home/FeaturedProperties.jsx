import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import PropertyCard from '../property/PropertyCard';
import { properties } from '../../data/properties';

/**
 * Featured Properties Section
 * Shows highlighted properties from the catalog
 * MUST per AGENTS.md:
 * - Semantic HTML
 * - Links are <Link> components
 * - No dead ends (always show next action)
 */

export default function FeaturedProperties() {
  // Get featured properties
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3);

  if (featuredProperties.length === 0) {
    return null; // Don't show section if no featured properties
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Promociones Destacadas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Descubre nuestras mejores opciones disponibles actualmente. 
              Viviendas de calidad en ubicaciones privilegiadas.
            </p>
          </div>
          <Button
            as={Link}
            to="/propiedades"
            variant="outline"
            className="shrink-0"
          >
            Ver todas
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* CTA for mobile */}
        <div className="mt-8 text-center md:hidden">
          <Button
            as={Link}
            to="/propiedades"
            variant="outline"
            className="w-full sm:w-auto"
          >
            Ver todas las promociones
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
