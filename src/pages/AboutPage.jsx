import Timeline from '@/components/about/Timeline';
import ValueCard from '@/components/about/ValueCard';
import TeamMember from '@/components/about/TeamMember';
import Stats from '@/components/about/Stats';
import { Breadcrumbs } from '@/components/ui';

const breadcrumbItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Nosotros', path: '/sobre-nosotros' }
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <h1 className="text-4xl font-bold mb-4 mt-4">Sobre Nosotros</h1>
          <p className="text-xl text-primary-100">
            Más de 25 años construyendo hogares y confianza con las familias de la región
          </p>
        </div>
      </div>

      {/* Historia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-lg text-gray-600">
              Desde 1995, Alisi ha sido sinónimo de calidad y compromiso en el desarrollo
              inmobiliario. Comenzamos con un sueño: construir hogares que mejoraran la calidad
              de vida de las familias.
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Misión, Visión y Valores */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Misión, Visión y Valores</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollar proyectos inmobiliarios de calidad que superen las expectativas de
                nuestros clientes, creando espacios que mejoren la calidad de vida y contribuyan
                al desarrollo sostenible de nuestras comunidades.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser la promotora inmobiliaria de referencia en la región, reconocida por la
                excelencia en el diseño, la calidad constructiva y el compromiso con nuestros
                clientes y el medio ambiente.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-8">Nuestros Valores</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon="🤝"
              title="Confianza"
              description="Construimos relaciones duraderas basadas en la transparencia y el cumplimiento"
            />
            <ValueCard
              icon="⭐"
              title="Calidad"
              description="Excelencia en cada detalle, desde el diseño hasta la entrega final"
            />
            <ValueCard
              icon="💡"
              title="Innovación"
              description="Incorporamos las últimas tendencias y tecnologías en nuestros proyectos"
            />
            <ValueCard
              icon="🎯"
              title="Compromiso"
              description="Dedicación total con nuestros clientes, equipo y comunidad"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Logros</h2>
          <Stats />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Nuestro Equipo</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Un equipo de profesionales con amplia experiencia en el sector inmobiliario,
            comprometidos con la excelencia en cada proyecto.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <TeamMember
              name="Carlos Martínez"
              position="Director General"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
              description="25 años de experiencia en desarrollo inmobiliario"
            />
            <TeamMember
              name="Ana García"
              position="Directora Técnica"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
              description="Arquitecta especializada en proyectos residenciales"
            />
            <TeamMember
              name="Miguel Rodríguez"
              position="Responsable Comercial"
              image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
              description="Experto en atención al cliente y gestión comercial"
            />
          </div>
        </div>
      </section>

      {/* Compromiso y Calidad */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Compromiso con la Calidad</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Certificaciones</h3>
              <p className="text-gray-600">
                Todos nuestros proyectos cumplen con las normativas vigentes y están certificados
                por los organismos competentes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3">Metodología</h3>
              <p className="text-gray-600">
                Aplicamos procesos rigurosos de control de calidad en cada fase del proyecto,
                desde el diseño hasta la entrega.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3">Garantías</h3>
              <p className="text-gray-600">
                Ofrecemos garantías completas en todos nuestros proyectos y un servicio
                postventa de excelencia.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
