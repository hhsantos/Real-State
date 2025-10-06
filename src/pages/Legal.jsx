import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../components/ui';

/**
 * Legal Page - Aviso Legal
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Proper heading hierarchy
 * - Accessible content
 */

export default function Legal() {
  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Aviso Legal' }
  ];

  return (
    <>
      <Helmet>
        <title>Aviso Legal - Real State</title>
        <meta
          name="description"
          content="Aviso legal de Real State Promotora de viviendas"
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-primary-600 text-white py-12">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <h1 className="text-4xl font-bold mt-4">Aviso Legal</h1>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Información General
              </h2>
              <p className="text-gray-700 mb-4">
                En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
                de la Información y de Comercio Electrónico (LSSICE), Real State informa de los 
                siguientes datos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li><strong>Denominación social:</strong> Real State Promotora S.L.</li>
                <li><strong>NIF:</strong> B-12345678</li>
                <li><strong>Domicilio social:</strong> Calle Principal 123, 28001 Madrid</li>
                <li><strong>Correo electrónico:</strong> info@realstate.com</li>
                <li><strong>Teléfono:</strong> +34&nbsp;912&nbsp;345&nbsp;678</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Objeto
              </h2>
              <p className="text-gray-700 mb-4">
                El presente aviso legal regula el uso del sitio web realstate.com, del que es 
                titular Real State Promotora S.L. La navegación por el sitio web atribuye la 
                condición de usuario del mismo e implica la aceptación plena y sin reservas 
                de todas las disposiciones incluidas en este Aviso Legal.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Propiedad Intelectual e Industrial
              </h2>
              <p className="text-gray-700 mb-4">
                Todos los contenidos del sitio web, incluyendo, sin carácter limitativo, 
                textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links 
                y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y 
                códigos fuente, son propiedad intelectual de Real State o de terceros.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Responsabilidad
              </h2>
              <p className="text-gray-700 mb-4">
                ALISI no se hace responsable, en ningún caso, de los daños y perjuicios de 
                cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u 
                omisiones en los contenidos, falta de disponibilidad del portal o la transmisión 
                de virus o programas maliciosos o lesivos en los contenidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Legislación Aplicable
              </h2>
              <p className="text-gray-700">
                La relación entre ALISI y el USUARIO se regirá por la normativa española vigente. 
                Las partes se someten, a su elección, para la resolución de los conflictos y con 
                renuncia a cualquier otro fuero, a los juzgados y tribunales del domicilio del 
                USUARIO.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
