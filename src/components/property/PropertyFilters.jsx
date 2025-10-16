import { useQueryState, parseAsString, parseAsInteger, parseAsArrayOf } from 'nuqs';
import { Card, CardBody, CardHeader, Button, Select, Checkbox } from '../ui';
import { PROPERTY_STATUS, PROPERTY_TYPES, PROPERTY_FEATURES } from '../../data/properties';
import { X } from '../icons';

/**
 * PropertyFilters Component
 * Filters with state in URL using nuqs
 * Follows AGENTS.md requirements:
 * - MUST: URL reflects state (deep-link filters) per AGENTS.md
 * - Using nuqs library as recommended
 */

export default function PropertyFilters({ onFiltersChange }) {
  // State in URL - MUST per AGENTS.md
  const [status, setStatus] = useQueryState(
    'status',
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [type, setType] = useQueryState(
    'type',
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [minPrice, setMinPrice] = useQueryState(
    'minPrice',
    parseAsInteger
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    'maxPrice',
    parseAsInteger
  );
  const [bedrooms, setBedrooms] = useQueryState(
    'bedrooms',
    parseAsInteger
  );
  const [features, setFeatures] = useQueryState(
    'features',
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Notify parent of filter changes
  const applyFilters = () => {
    if (onFiltersChange) {
      onFiltersChange({
        status,
        type,
        minPrice,
        maxPrice,
        bedrooms,
        features,
      });
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setStatus([]);
    setType([]);
    setMinPrice(null);
    setMaxPrice(null);
    setBedrooms(null);
    setFeatures([]);
    if (onFiltersChange) {
      onFiltersChange({});
    }
  };

  // Check if any filter is active
  const hasActiveFilters = 
    status.length > 0 ||
    type.length > 0 ||
    minPrice ||
    maxPrice ||
    bedrooms ||
    features.length > 0;

  // Toggle checkbox helper
  const toggleArrayValue = (array, value, setter) => {
    if (array.includes(value)) {
      setter(array.filter(v => v !== value));
    } else {
      setter([...array, value]);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filtros</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm"
          >
            <X className="h-4 w-4 mr-1" aria-hidden="true" />
            Limpiar
          </Button>
        )}
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Status Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Estado
          </h3>
          <div className="space-y-2">
            {Object.values(PROPERTY_STATUS).map((statusValue) => (
              <Checkbox
                key={statusValue}
                label={statusValue}
                checked={status.includes(statusValue)}
                onChange={() => toggleArrayValue(status, statusValue, setStatus)}
              />
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div className="pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Tipo de vivienda
          </h3>
          <div className="space-y-2">
            {Object.values(PROPERTY_TYPES).map((typeValue) => (
              <Checkbox
                key={typeValue}
                label={typeValue}
                checked={type.includes(typeValue)}
                onChange={() => toggleArrayValue(type, typeValue, setType)}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Precio
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Select
              label="Desde"
              value={minPrice || ''}
              onChange={(value) => setMinPrice(value ? parseInt(value) : null)}
              options={[
                { value: '', label: 'Sin mínimo' },
                { value: '100000', label: '100.000 €' },
                { value: '150000', label: '150.000 €' },
                { value: '200000', label: '200.000 €' },
                { value: '250000', label: '250.000 €' },
                { value: '300000', label: '300.000 €' },
                { value: '400000', label: '400.000 €' },
              ]}
            />
            <Select
              label="Hasta"
              value={maxPrice || ''}
              onChange={(value) => setMaxPrice(value ? parseInt(value) : null)}
              options={[
                { value: '', label: 'Sin máximo' },
                { value: '200000', label: '200.000 €' },
                { value: '250000', label: '250.000 €' },
                { value: '300000', label: '300.000 €' },
                { value: '400000', label: '400.000 €' },
                { value: '500000', label: '500.000 €' },
                { value: '600000', label: '600.000 €' },
              ]}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Dormitorios mínimos
          </h3>
          <Select
            value={bedrooms || ''}
            onChange={(value) => setBedrooms(value ? parseInt(value) : null)}
            options={[
              { value: '', label: 'Cualquiera' },
              { value: '1', label: '1+' },
              { value: '2', label: '2+' },
              { value: '3', label: '3+' },
              { value: '4', label: '4+' },
              { value: '5', label: '5+' },
            ]}
          />
        </div>

        {/* Features */}
        <div className="pt-6 border-t">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Características
          </h3>
          <div className="space-y-2">
            {Object.values(PROPERTY_FEATURES).slice(0, 6).map((feature) => (
              <Checkbox
                key={feature}
                label={feature}
                checked={features.includes(feature)}
                onChange={() => toggleArrayValue(features, feature, setFeatures)}
              />
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-6 border-t">
          <Button
            onClick={applyFilters}
            className="w-full"
          >
            Aplicar filtros
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}