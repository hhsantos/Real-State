export default function Timeline() {
  const milestones = [
    {
      year: '1995',
      title: 'Fundación de Real State',
      description: 'Inicio de actividades con nuestro primer proyecto residencial',
    },
    {
      year: '2000',
      title: 'Expansión regional',
      description: 'Apertura de nueva oficina y primeros proyectos en municipios colindantes',
    },
    {
      year: '2008',
      title: '500 viviendas entregadas',
      description: 'Alcanzamos un hito importante en nuestra trayectoria',
    },
    {
      year: '2015',
      title: 'Certificación de calidad',
      description: 'Obtención de certificaciones ISO y reconocimiento sectorial',
    },
    {
      year: '2020',
      title: 'Innovación sostenible',
      description: 'Incorporación de tecnologías verdes y eficiencia energética',
    },
    {
      year: '2024',
      title: 'Más de 2000 familias',
      description: 'Consolidación como referente en la región con 50+ proyectos completados',
    },
  ];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Línea vertical */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"
        aria-hidden="true"
      />

      <div className="space-y-12">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.year}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } flex-col`}
          >
            {/* Contenido */}
            <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center mb-4 md:mb-0`}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-900 mb-2">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>

            {/* Punto central */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg" />
            </div>

            {/* Espacio para el otro lado */}
            <div className="md:w-5/12" />
          </div>
        ))}
      </div>
    </div>
  );
}
