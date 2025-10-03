import { Breadcrumbs } from '@/components/ui';

const breadcrumbItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Sobre Nosotros', path: '/sobre-nosotros' }
];

const timelineEvents = [
  { year: '1995', event: 'Fundación de Alisi - Inicio de operaciones con nuestro primer proyecto residencial' },
  { year: '2000', event: 'Expansión regional - Apertura de nuevas oficinas y crecimiento del equipo' },
  { year: '2010', event: 'Hito de 1000 viviendas - Consolidación como referente en la región' },
  { year: '2015', event: 'Innovación sostenible - Incorporación de certificaciones energéticas' },
  { year: '2020', event: 'Transformación digital - Implementación de nuevas tecnologías y procesos' },
  { year: '2024', event: 'Más de 2000 familias - Continuamos creciendo con proyectos de calidad' }
];

const stats = [
  { number: '29', label: 'Años de Experiencia', suffix: '+' },
  { number: '50', label: 'Proyectos Completados', suffix: '+' },
  { number: '2000', label: 'Viviendas Entregadas', suffix: '+' },
  { number: '100', label: 'Satisfacción', suffix: '%' }
];

const valores = [
  {
    title: 'Confianza',
    description: 'Construimos relaciones duraderas basadas en la transparencia y el cumplimiento de nuestros compromisos'
  },
  {
    title: 'Calidad',
    description: 'Excelencia en cada detalle, desde el diseño hasta la entrega final de cada proyecto'
  },
  {
    title: 'Innovación',
    description: 'Incorporamos las últimas tendencias y tecnologías sostenibles en nuestros desarrollos'
  },
  {
    title: 'Compromiso',
    description: 'Dedicación total con nuestros clientes, equipo, comunidad y medio ambiente'
  }
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center opacity-10"></div>
        <div className="container-custom relative">
          <Breadcrumbs items={breadcrumbItems} variant="dark" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-6">Sobre Nosotros</h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl">
            Más de 25 años construyendo hogares y confianza con las familias de la región
          </p>
        </div>
      </div>

      {/* Introducción */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Nuestra Historia</h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Desde 1995, Alisi ha sido sinónimo de calidad y compromiso en el desarrollo
              inmobiliario. Comenzamos con un sueño: construir hogares que mejoraran la calidad
              de vida de las familias. Hoy, después de casi tres décadas, seguimos fieles a esa
              misión con la misma pasión del primer día.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Nuestra Trayectoria
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {timelineEvents.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary-600 border-4 border-white shadow-md"></div>
                    {index < timelineEvents.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className="text-gray-700 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="bg-gray-50 p-8 md:p-10 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Nuestra Misión</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Desarrollar proyectos inmobiliarios de calidad que superen las expectativas de
                nuestros clientes, creando espacios que mejoren la calidad de vida y contribuyan
                al desarrollo sostenible de nuestras comunidades.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 md:p-10 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Nuestra Visión</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser la promotora inmobiliaria de referencia en la región, reconocida por la
                excelencia en el diseño, la calidad constructiva y el compromiso con nuestros
                clientes y el medio ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Nuestros Valores
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
            {valores.map((valor, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{valor.title}</h3>
                <p className="text-gray-600 leading-relaxed">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-primary-900 text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros Logros</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-primary-200 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromiso y Calidad */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Compromiso con la Calidad
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Certificaciones</h3>
              <p className="text-gray-600 leading-relaxed">
                Todos nuestros proyectos cumplen con las normativas vigentes y están certificados
                por los organismos competentes, garantizando la máxima calidad y seguridad.
              </p>
            </div>
            
            <div className="text-center p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Metodología</h3>
              <p className="text-gray-600 leading-relaxed">
                Aplicamos procesos rigurosos de control de calidad en cada fase del proyecto,
                desde el diseño hasta la entrega, asegurando la excelencia en cada detalle.
              </p>
            </div>
            
            <div className="text-center p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Garantías</h3>
              <p className="text-gray-600 leading-relaxed">
                Ofrecemos garantías completas en todos nuestros proyectos y un servicio
                postventa de excelencia para tu tranquilidad y satisfacción.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
