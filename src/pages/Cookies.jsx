import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../components/ui';

/**
 * Cookies Page - Política de Cookies
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Proper heading hierarchy
 * - Accessible content
 */

export default function Cookies() {
  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Política de Cookies' }
  ];

  return (
    <>
      <Helmet>
        <title>Política de Cookies - ALISI</title>
        <meta
          name="description"
          content="Política de cookies de ALISI Promotora de viviendas"
        />
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="bg-primary-600 text-white py-12">
          <div className="container-custom">
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
            <h1 className="text-4xl font-bold mt-4">Política de Cookies</h1>
          </div>
        </div>

        <div className="container-custom py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Qué son las cookies?
              </h2>
              <p className="text-gray-700 mb-4">
                Una cookie es un fichero que se descarga en su ordenador al acceder a 
                determinadas páginas web. Las cookies permiten a una página web, entre otras 
                cosas, almacenar y recuperar información sobre los hábitos de navegación de un 
                usuario o de su equipo y, dependiendo de la información que contengan y de la 
                forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Tipos de Cookies
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                Según su finalidad
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mb-4">
                <li>
                  <strong>Cookies técnicas:</strong> Permiten la navegación y uso de las 
                  diferentes opciones o servicios del sitio web
                </li>
                <li>
                  <strong>Cookies de personalización:</strong> Permiten acceder al servicio 
                  con características predefinidas
                </li>
                <li>
                  <strong>Cookies de análisis:</strong> Permiten el seguimiento y análisis del 
                  comportamiento de los usuarios
                </li>
                <li>
                  <strong>Cookies publicitarias:</strong> Permiten la gestión de espacios 
                  publicitarios en la web
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                Según su duración
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Cookies de sesión:</strong> Se eliminan cuando el usuario cierra el 
                  navegador
                </li>
                <li>
                  <strong>Cookies persistentes:</strong> Permanecen en el terminal por un 
                  tiempo determinado
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Cookies Utilizadas en este Sitio Web
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cookie
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Finalidad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duración
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">session_id</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Técnica</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Mantener sesión del usuario</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Sesión</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">_ga</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Analítica</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Google Analytics - Distinguir usuarios</td>
                      <td className="px-6 py-4 text-sm text-gray-700">2 años</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-900">_gid</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Analítica</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Google Analytics - Distinguir usuarios</td>
                      <td className="px-6 py-4 text-sm text-gray-700">24 horas</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Gestión de Cookies
              </h2>
              <p className="text-gray-700 mb-4">
                El Usuario puede configurar su navegador para aceptar o rechazar por defecto 
                todas las cookies o para recibir un aviso en pantalla de la recepción de cada 
                cookie y decidir sobre su instalación o no en su disco duro.
              </p>
              <p className="text-gray-700">
                Para más información sobre cómo configurar las cookies en los navegadores más 
                comunes, puede consultar los siguientes enlaces:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4 mt-3">
                <li>
                  <a 
                    href="https://support.google.com/chrome/answer/95647" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Safari
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Actualizaciones
              </h2>
              <p className="text-gray-700">
                Esta política de cookies puede ser modificada cuando así lo exija la legislación 
                vigente en cada momento o cuando hubiera alguna variación en el tipo de cookies 
                utilizadas en el sitio web. Por ello, le recomendamos revisar esta política cada 
                vez que acceda a nuestro sitio web.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
