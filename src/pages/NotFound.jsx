import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { Home } from 'lucide-react';

/**
 * 404 Not Found Page
 * Follows AGENTS.md requirements:
 * - MUST: No dead ends, always offer next step per AGENTS.md
 * - Clear navigation options
 * - Helpful message
 */

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada - ALISI</title>
      </Helmet>

      <div className="container-custom py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-600 mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Página no encontrada
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          
          {/* MUST: Always offer next step per AGENTS.md */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              as={Link}
              to="/"
              size="lg"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Ir al inicio
            </Button>
            <Button
              as={Link}
              to="/propiedades"
              variant="outline"
              size="lg"
            >
              Ver promociones
            </Button>
          </div>

          {/* Alternative navigation */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              También puedes visitar:
            </p>
            <nav aria-label="Enlaces útiles">
              <ul className="flex flex-wrap justify-center gap-4">
                <li>
                  <Link
                    to="/nosotros"
                    className="text-primary-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contacto"
                    className="text-primary-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                  >
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}