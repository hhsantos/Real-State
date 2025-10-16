import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { getPropertyById } from '../data/properties';
import { 
  MapPin, Bed, Bath, Maximize, Home as HomeIcon, 
  Calendar, Phone, Mail 
} from '@/components/icons';
import { Button, Card, CardBody, Skeleton, Lightbox, Breadcrumbs } from '../components/ui';
import { formatPrice, formatDate } from '../utils/helpers';

/**
 * PropertyDetail Page
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Accessible images with alt text
 * - Back navigation (no dead ends)
 * - Skeleton loaders
 */

export default function PropertyDetail() {
  const { id } = useParams();
  const property = getPropertyById(id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Loading state (simulate async fetch)
  if (!property) {
    return <PropertyDetailSkeleton />;
  }

  const availableForSale = property.status !== 'Vendido';

  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Promociones', path: '/propiedades' },
    { label: property.title }
  ];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{property.title} - Real State</title>
        <meta name="description" content={property.description} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Header with background image */}
        <div className="relative bg-primary-600 text-white py-12">
          {/* Background image */}
          {property.images && property.images.length > 0 && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${property.images[0]})` }}
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-primary-900/70" />
            </div>
          )}
          
          {/* Content */}
          <div className="container-custom relative z-10">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <h1 className="text-4xl font-bold mb-4 mt-4">{property.title}</h1>
            <p className="text-xl text-white/90 flex items-center gap-2">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              {property.location}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card>
                <CardBody>
                  <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {property.longDescription}
                  </p>
                </CardBody>
              </Card>

              {/* Features */}
              <Card>
                <CardBody>
                  <h2 className="text-2xl font-bold mb-4">Características</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                        <HomeIcon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tipo</p>
                        <p className="font-semibold">{property.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                        <Bed className="h-5 w-5 text-primary-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dormitorios</p>
                        <p className="font-semibold">{property.bedrooms}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                        <Bath className="h-5 w-5 text-primary-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Baños</p>
                        <p className="font-semibold">{property.bathrooms}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                        <Maximize className="h-5 w-5 text-primary-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Superficie</p>
                        <p className="font-semibold">{property.surface}m²</p>
                      </div>
                    </div>

                    {property.plotSize && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                          <HomeIcon className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Parcela</p>
                          <p className="font-semibold">{property.plotSize}m²</p>
                        </div>
                      </div>
                    )}

                    {property.deliveryDate && (
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100">
                          <Calendar className="h-5 w-5 text-primary-600" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Entrega</p>
                          <p className="font-semibold">{formatDate(property.deliveryDate, { month: 'short', year: 'numeric' })}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {property.features && property.features.length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="font-semibold mb-3">Equipamiento</h3>
                      <div className="flex flex-wrap gap-2">
                        {property.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Gallery */}
              {property.images && property.images.length > 0 && (
                <Card>
                  <CardBody>
                    <h2 className="text-2xl font-bold mb-4">Galería</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => openLightbox(index)}
                          className="aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-zoom-in group"
                          aria-label={`Ampliar imagen ${index + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${property.title} - Imagen ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[var(--duration-normal)]"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-4">
                <CardBody className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Precio desde</p>
                    <p className="text-3xl font-bold text-primary-600 tabular-nums">
                      {formatPrice(property.price)}
                    </p>
                  </div>

                  {property.availableUnits > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-gray-900">{property.availableUnits}</span>
                        {' '}{property.availableUnits === 1 ? 'unidad disponible' : 'unidades disponibles'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        de {property.totalUnits} totales
                      </p>
                    </div>
                  )}

                  {availableForSale ? (
                    <div className="pt-4 border-t space-y-3">
                      <Button
                        as={Link}
                        to="/contacto"
                        className="w-full"
                      >
                        <Phone className="h-4 w-4 mr-2" aria-hidden="true" />
                        Solicitar información
                      </Button>
                      <Button
                        as={Link}
                        to="/contacto"
                        variant="outline"
                        className="w-full"
                      >
                        <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                        Contactar
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <p className="text-center text-gray-600 font-medium">
                        Promoción agotada
                      </p>
                    </div>
                  )}
                </CardBody>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardBody className="space-y-3">
                  <h3 className="font-semibold">¿Necesitas ayuda?</h3>
                  <p className="text-sm text-gray-600">
                    Nuestro equipo está disponible para resolver todas tus dudas.
                  </p>
                  <Button
                    as={Link}
                    to="/contacto"
                    variant="outline"
                    className="w-full"
                  >
                    Ir a contacto
                  </Button>
                </CardBody>
              </Card>
            </aside>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {property.images && property.images.length > 0 && (
        <Lightbox
          images={property.images}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          alt={property.title}
        />
      )}
    </>
  );
}

// Skeleton for loading state
function PropertyDetailSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <Skeleton width="120px" height="40px" />
        </div>
      </div>
      
      <div className="h-96 bg-gray-200 animate-pulse" />
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardBody className="space-y-4">
                <Skeleton width="60%" height="40px" />
                <Skeleton width="40%" height="24px" />
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}