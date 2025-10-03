import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropertyCard from '../components/property/PropertyCard';
import PropertyFilters from '../components/property/PropertyFilters';
import { SkeletonPropertyCard } from '../components/ui/Skeleton';
import { properties, filterProperties } from '../data/properties';
import { Grid, List } from 'lucide-react';
import { Button } from '../components/ui';
import { cn } from '../utils/cn';

/**
 * Properties Page - Property Listings
 * Follows AGENTS.md requirements:
 * - URL reflects state (filters in URL with nuqs)
 * - Empty state design
 * - Skeleton loaders
 * - Responsive grid
 */

export default function Properties() {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleFiltersChange = (filters) => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const filtered = filterProperties(filters);
      setFilteredProperties(filtered);
      setLoading(false);
    }, 300);
  };

  return (
    <>
      <Helmet>
        <title>Promociones - ALISI</title>
        <meta
          name="description"
          content="Descubre nuestras promociones de viviendas en construcción y disponibles. Chalets, pisos, dúplex y áticos en Madrid y alrededores."
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-primary-600 text-white py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-bold mb-4">Nuestras Promociones</h1>
            <p className="text-xl text-primary-100">
              Encuentra tu hogar ideal entre nuestras {properties.length} promociones
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-4">
                <PropertyFilters onFiltersChange={handleFiltersChange} />
              </div>
            </aside>

            {/* Properties Grid */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {filteredProperties.length} {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                </p>

                {/* View Mode Toggle */}
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    aria-label="Vista en cuadrícula"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <Grid className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    aria-label="Vista en lista"
                    aria-pressed={viewMode === 'list'}
                  >
                    <List className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div
                  className={cn(
                    'grid gap-6',
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <SkeletonPropertyCard key={i} />
                  ))}
                </div>
              )}

              {/* Empty State - MUST design per AGENTS.md */}
              {!loading && filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Grid className="h-8 w-8 text-gray-400" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    No se encontraron propiedades
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Prueba ajustando los filtros para ver más resultados
                  </p>
                  {/* MUST: No dead ends per AGENTS.md */}
                  <Button
                    onClick={() => window.location.href = '/propiedades'}
                  >
                    Ver todas las propiedades
                  </Button>
                </div>
              )}

              {/* Properties Grid/List */}
              {!loading && filteredProperties.length > 0 && (
                <div
                  className={cn(
                    'grid gap-6',
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      className={viewMode === 'list' ? 'md:flex md:flex-row' : ''}
                    />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}