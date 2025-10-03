import { 
  Building2, 
  Shield, 
  Users, 
  MapPin, 
  Award, 
  Clock 
} from 'lucide-react';

/**
 * Why Choose Us Section
 * Highlights company differentiators
 * MUST per AGENTS.md:
 * - Semantic HTML (section, h2, h3)
 * - Icons have aria-hidden
 * - Proper content hierarchy
 */

const reasons = [
  {
    icon: Building2,
    title: '1.300+ Viviendas',
    description: 'Más de mil trescientas viviendas construidas con los más altos estándares de calidad y diseño.',
  },
  {
    icon: Clock,
    title: '25 Años de Experiencia',
    description: 'Más de dos décadas liderando el sector inmobiliario en Madrid con profesionalidad y compromiso.',
  },
  {
    icon: Shield,
    title: 'Calidad Garantizada',
    description: 'Certificaciones de calidad en todos nuestros proyectos. Tu inversión está protegida.',
  },
  {
    icon: MapPin,
    title: 'Mejores Ubicaciones',
    description: 'Promociones en las zonas más demandadas de Madrid y su área metropolitana.',
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Equipo dedicado que te acompaña en cada paso del proceso de compra de tu vivienda.',
  },
  {
    icon: Award,
    title: 'Acabados Premium',
    description: 'Materiales de primera calidad y acabados cuidados hasta el último detalle.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir ALISI?
          </h2>
          <p className="text-lg text-gray-600">
            Somos una promotora inmobiliaria con más de 25 años de experiencia 
            en el sector. Nuestro compromiso es tu satisfacción.
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} {...reason} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ icon, title, description }) {
  const IconComponent = icon;
  
  return (
    <div className="group">
      <div className="flex flex-col h-full p-6 rounded-xl bg-gray-50 hover:bg-primary-50 transition-colors duration-[var(--duration-normal)]">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 bg-primary-100 text-primary-600 rounded-lg mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-[var(--duration-normal)]">
          <IconComponent className="h-7 w-7" aria-hidden="true" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-2">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
