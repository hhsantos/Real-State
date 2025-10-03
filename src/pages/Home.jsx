import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '../utils/constants';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Building2, Users, Phone } from 'lucide-react';

/**
 * Home Page
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Proper headings hierarchy
 * - Accessible images
 * - No dead ends
 */

export default function Home() {
  return (
    <>
      {/* SEO - MUST: Title matches context per AGENTS.md */}
      <Helmet>
        <title>{SEO_DEFAULTS.TITLE}</title>
        <meta name="description" content={SEO_DEFAULTS.DESCRIPTION} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container-custom py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tu hogar, nuestra pasión
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Más de 25 años construyendo viviendas de calidad en Madrid. 
              Descubre nuestras promociones disponibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                to="/propiedades"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Ver Promociones
              </Button>
              <Button
                as={Link}
                to="/contacto"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Contactar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿Por qué elegir ALISI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Building2 className="h-8 w-8" aria-hidden="true" />}
              title="Más de 1.300 viviendas"
              description="Una trayectoria sólida construyendo hogares de calidad para familias como la tuya."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8" aria-hidden="true" />}
              title="25+ años de experiencia"
              description="Un cuarto de siglo dedicados al sector inmobiliario con la máxima profesionalidad."
            />
            <FeatureCard
              icon={<HomeIcon className="h-8 w-8" aria-hidden="true" />}
              title="Calidad garantizada"
              description="Altos estándares de calidad en todos los procesos constructivos y acabados."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para encontrar tu hogar ideal?
          </h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Nuestro equipo está preparado para ayudarte en cada paso del proceso. 
            Contáctanos hoy mismo.
          </p>
          <Button
            as={Link}
            to="/contacto"
            size="lg"
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            Contactar ahora
          </Button>
        </div>
      </section>
    </>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-[var(--duration-normal)]">
      <div className="flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}