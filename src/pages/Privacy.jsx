import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../components/ui';

/**
 * Privacy Page - Política de Privacidad
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Proper heading hierarchy
 * - Accessible content
 */

export default function Privacy() {
  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Política de Privacidad' }
  ];

  return (
    <>
      <Helmet>
        <title>Política de Privacidad - ALISI</title>
        <meta
          name="description"
          content="Política de privacidad y protección de datos de ALISI Promotora"
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-primary-600 text-white py-12">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <h1 className="text-4xl font-bold mt-4">Política de Privacidad</h1>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Responsable del Tratamiento
              </h2>
              <p className="text-gray-700 mb-4">
                ALISI Promotora S.L., con domicilio en Calle Principal 123, 28001 Madrid, 
                es el responsable del tratamiento de los datos personales del Usuario y le 
                informa de que estos datos serán tratados de conformidad con el Reglamento 
                (UE) 2016/679, de 27 de abril (GDPR), y la Ley Orgánica 3/2018, de 5 de 
                diciembre (LOPDGDD).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Finalidad del Tratamiento
              </h2>
              <p className="text-gray-700 mb-4">
                Los datos personales recogidos serán utilizados para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Gestionar las consultas realizadas a través del formulario de contacto</li>
                <li>Proporcionar información sobre nuestras promociones inmobiliarias</li>
                <li>Gestionar la relación comercial con clientes</li>
                <li>Cumplir con las obligaciones legales aplicables</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Legitimación
              </h2>
              <p className="text-gray-700 mb-4">
                La base legal para el tratamiento de sus datos es:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>El consentimiento del interesado</li>
                <li>La ejecución de un contrato</li>
                <li>El interés legítimo del responsable</li>
                <li>El cumplimiento de obligaciones legales</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Conservación de Datos
              </h2>
              <p className="text-gray-700 mb-4">
                Los datos personales proporcionados se conservarán mientras se mantenga la 
                relación comercial o durante los años necesarios para cumplir con las 
                obligaciones legales. Los datos proporcionados se conservarán mientras no se 
                solicite su supresión por el interesado.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Derechos del Usuario
              </h2>
              <p className="text-gray-700 mb-4">
                El Usuario puede ejercer los siguientes derechos:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Derecho de acceso, rectificación, portabilidad y supresión de sus datos</li>
                <li>Derecho de limitación y oposición a su tratamiento</li>
                <li>Derecho a presentar una reclamación ante la autoridad de control (AEPD)</li>
                <li>Derecho a retirar el consentimiento prestado</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Para ejercer estos derechos, puede contactar con nosotros en{' '}
                <a 
                  href="mailto:info@alisi.com" 
                  className="text-primary-600 hover:underline"
                >
                  info@alisi.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Medidas de Seguridad
              </h2>
              <p className="text-gray-700">
                ALISI tratará los datos del Usuario en todo momento de forma absolutamente 
                confidencial y guardando el preceptivo deber de secreto respecto de los mismos, 
                de conformidad con lo previsto en la normativa de aplicación, adoptando las 
                medidas técnicas y organizativas necesarias para evitar la alteración, pérdida, 
                tratamiento o acceso no autorizado.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
