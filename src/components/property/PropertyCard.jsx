import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Home } from '../icons';
import { Card, CardBody } from '../ui';
import { cn } from '../../utils/cn';
import { formatPrice } from '../../utils/helpers';
import { PROPERTY_STATUS } from '../../data/properties';

/**
 * PropertyCard Component
 * Displays property information in a card format
 * Follows AGENTS.md requirements
 */

export default function PropertyCard({ property, className }) {
  const isAvailable = property.status === PROPERTY_STATUS.AVAILABLE || 
                      property.status === PROPERTY_STATUS.IN_CONSTRUCTION;
  const isSoldOut = property.status === PROPERTY_STATUS.SOLD_OUT;

  return (
    <Card
      as={Link}
      to={`/propiedades/${property.id}`}
      hoverable={isAvailable}
      className={cn(
        'group overflow-hidden transition-all duration-[var(--duration-normal)]',
        !isAvailable && 'opacity-75',
        className
      )}
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {property.images && property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Home className="h-16 w-16 text-gray-300" aria-hidden="true" />
          </div>
        )}
        
        {/* Status badge */}
        <div
          className={cn(
            'absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold',
            isSoldOut && 'bg-gray-900 text-white',
            property.status === PROPERTY_STATUS.AVAILABLE && 'bg-green-500 text-white',
            property.status === PROPERTY_STATUS.IN_CONSTRUCTION && 'bg-blue-500 text-white',
            property.status === PROPERTY_STATUS.COMING_SOON && 'bg-yellow-500 text-gray-900'
          )}
        >
          {property.status}
        </div>
      </div>

      <CardBody className="space-y-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Type */}
        <div className="text-sm text-gray-500">
          {property.type}
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          {property.bedrooms && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" aria-hidden="true" />
              <span>{property.bedrooms}</span>
              <span className="sr-only">dormitorios</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" aria-hidden="true" />
              <span>{property.bathrooms}</span>
              <span className="sr-only">baños</span>
            </div>
          )}
          {property.surface && (
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" aria-hidden="true" />
              <span>{property.surface}m²</span>
              <span className="sr-only">metros cuadrados</span>
            </div>
          )}
        </div>

        {/* Description */}
        {property.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {property.description}
          </p>
        )}

        {/* Price */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-2xl font-bold text-primary-600 tabular-nums">
            {formatPrice(property.price)}
          </p>
          {property.availableUnits > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {property.availableUnits} {property.availableUnits === 1 ? 'unidad disponible' : 'unidades disponibles'}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}