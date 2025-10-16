import { Helmet } from 'react-helmet-async';
import { Card, CardBody, Button } from '../components/ui';
import { COMPANY } from '../utils/constants';
import { Building2, Users, Award, Target, Heart, Shield } from '@/components/icons';
import { Link } from 'react-router-dom';

/**
 * About Page - Company information
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Accessible images
 * - No dead ends
 * - Clear CTAs
 */

export default function About() {
  return (
    <>
      <Helmet>
        <title>Nosotros - Real State</title>
        <meta
          name="description"
          content={`Conoce ${COMPANY.NAME}, promotora inmobiliaria con más de ${COMPANY.EXPERIENCE_YEARS} años de experiencia construyendo hogares de calidad.`}
        />
      </Helmet>

      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary-600 text-white py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sobre {COMPANY.NAME}
              </h1>
              <p className="text-xl md:text-2xl text-primary-100">
                Más de {COMPANY.EXPERIENCE_YEARS} años construyendo hogares, 
                creando comunidades y cumpliendo sueños.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2 tabular-nums">
                  {COMPANY.EXPERIENCE_YEARS}+
                </div>
                <p className="text-gray-600 font-medium">Años de experiencia</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2 tabular-nums">
                  {COMPANY.PROPERTIES_BUILT}+
                </div>
                <p className="text-gray-600 font-medium">Viviendas construidas</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2 tabular-nums">
                  100%
                </div>
                <p className="text-gray-600 font-medium">Compromiso con la calidad</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Nuestra Historia
              </h2>
              
              <Card>
                <CardBody className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Fundada hace más de {COMPANY.EXPERIENCE_YEARS} años, <strong>{COMPANY.NAME}</strong> nació 
                    con una visión clara: construir hogares de calidad que mejoren la vida de las familias 
                    españolas.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Desde nuestros inicios, hemos mantenido un compromiso inquebrantable con la excelencia 
                    en cada proyecto. Cada vivienda que construimos refleja nuestra dedicación a la calidad, 
                    la innovación y el servicio al cliente.
                  </p>
                  
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Con más de <strong>{COMPANY.PROPERTIES_BUILT} viviendas construidas</strong>, hemos 
                    ayudado a miles de familias a encontrar su hogar ideal. Nuestra trayectoria nos respalda 
                    y nos impulsa a seguir mejorando día a día.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Nuestros Valores
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ValueCard
                icon={<Award className="h-8 w-8" aria-hidden="true" />}
                title="Calidad"
                description="Utilizamos los mejores materiales y técnicas de construcción para garantizar viviendas duraderas y de alta calidad."
              />
              
              <ValueCard
                icon={<Heart className="h-8 w-8" aria-hidden="true" />}
                title="Compromiso"
                description="Nos comprometemos con cada cliente, acompañándole en todo el proceso desde el primer contacto hasta la entrega de llaves."
              />
              
              <ValueCard
                icon={<Shield className="h-8 w-8" aria-hidden="true" />}
                title="Confianza"
                description="Más de 25 años de experiencia nos avalan. Nuestra reputación se basa en la confianza de miles de familias satisfechas."
              />
              
              <ValueCard
                icon={<Target className="h-8 w-8" aria-hidden="true" />}
                title="Innovación"
                description="Implementamos las últimas tecnologías y tendencias en construcción para ofrecer viviendas modernas y eficientes."
              />
              
              <ValueCard
                icon={<Users className="h-8 w-8" aria-hidden="true" />}
                title="Cercanía"
                description="Tratamos a cada cliente como parte de nuestra familia, ofreciendo un trato personalizado y cercano."
              />
              
              <ValueCard
                icon={<Building2 className="h-8 w-8" aria-hidden="true" />}
                title="Experiencia"
                description="Nuestra amplia experiencia en el sector nos permite anticiparnos a las necesidades y ofrecer las mejores soluciones."
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardBody>
                  <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Construir hogares de calidad que mejoren la vida de las personas, 
                    creando espacios donde las familias puedan crecer, desarrollarse 
                    y crear recuerdos inolvidables. Nos esforzamos por superar las 
                    expectativas de nuestros clientes en cada proyecto.
                  </p>
                </CardBody>
              </Card>

              <Card>
                <CardBody>
                  <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ser la promotora inmobiliaria de referencia en la Comunidad de Madrid, 
                    reconocida por nuestra calidad, innovación y compromiso con nuestros 
                    clientes. Aspiramos a seguir creciendo y mejorando para ofrecer 
                    las mejores viviendas del mercado.
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section - MUST: No dead ends per AGENTS.md */}
        <section className="py-16 md:py-24 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para encontrar tu hogar?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Explora nuestras promociones disponibles y descubre el hogar 
              que siempre has soñado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                as={Link}
                to="/propiedades"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Ver promociones
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
        </section>
      </div>
    </>
  );
}

// Value Card Component
function ValueCard({ icon, title, description }) {
  return (
    <Card>
      <CardBody className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardBody>
    </Card>
  );
}