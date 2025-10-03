import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { getPropertyById } from '../data/properties';
import { 
  MapPin, Bed, Bath, Maximize, Home as HomeIcon, 
  Calendar, ArrowLeft, Phone, Mail 
} from 'lucide-react';
import { Button, Card, CardBody, Skeleton, Lightbox } from '../components/ui';
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
  const navigate = useNavigate();
  const property = getPropertyById(id);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Loading state (simulate async fetch)
  if (!property) {
    return <PropertyDetailSkeleton />;
  }

  const availableForSale = property.status !== 'Vendido';

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{property.title} - ALISI</title>
        <meta name="description" content={property.description} />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Back button */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/propiedades')}
              className="inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Volver al listado
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 bg-gray-200">
          {property.images && property.images[0] ? (
            <button
              onClick={() => openLightbox(0)}
              className="w-full h-full cursor-zoom-in"
              aria-label="Ampliar imagen principal"
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <HomeIcon className="h-24 w-24 text-gray-300" aria-hidden="true" />
            </div>
          )}
          
          {/* Status badge */}
          <div className="absolute top-6 right-6 px-4 py-2 bg-white rounded-lg shadow-lg">
            <span className="text-sm font-semibold">{property.status}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <Card>
                <CardBody className="space-y-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Tipo:</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                </CardBody>
              </Card>

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

              {/* Gallery - More images */}
              {property.images && property.images.length > 1 && (
                <Card>
                  <CardBody>
                    <h2 className="text-2xl font-bold mb-4">Galería</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.images.slice(1).map((image, index) => (
                        <button
                          key={index}
                          onClick={() => openLightbox(index + 1)}
                          className="aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-zoom-in group"
                          aria-label={`Ampliar imagen ${index + 2}`}
                        >
                          <img
                            src={image}
                            alt={`${property.title} - Imagen ${index + 2}`}
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