/**
 * Stats Section
 * Displays impressive company statistics
 * MUST per AGENTS.md:
 * - Tabular numbers for comparisons
 * - Semantic HTML
 */

const stats = [
  {
    value: '25+',
    label: 'Años de experiencia',
    description: 'Construyendo hogares de calidad',
  },
  {
    value: '1.300+',
    label: 'Viviendas entregadas',
    description: 'Familias felices en sus hogares',
  },
  {
    value: '100%',
    label: 'Calidad garantizada',
    description: 'Certificaciones y controles',
  },
  {
    value: '15+',
    label: 'Promociones activas',
    description: 'En las mejores ubicaciones',
  },
];

export default function Stats() {
  return (
    <section className="py-16 md:py-24 bg-primary-600 text-white">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Números que hablan por nosotros
          </h2>
          <p className="text-lg text-primary-100">
            Más de dos décadas de experiencia nos respaldan. 
            Somos una empresa consolidada y de confianza.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, description }) {
  return (
    <div className="text-center">
      {/* Value - MUST: Tabular numbers per AGENTS.md */}
      <div 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </div>
      
      {/* Label */}
      <div className="text-lg md:text-xl font-semibold mb-1">
        {label}
      </div>
      
      {/* Description */}
      <div className="text-sm text-primary-100">
        {description}
      </div>
    </div>
  );
}
