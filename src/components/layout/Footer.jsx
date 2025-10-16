import { Link } from 'react-router-dom';
import { COMPANY } from '../../utils/constants';
import { Mail, Phone, MapPin } from '../icons';

/**
 * Footer Component
 * Follows AGENTS.md requirements:
 * - Semantic HTML
 * - Accessible links
 * - Proper spacing
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {COMPANY.NAME}
            </h2>
            <p className="text-gray-400 mb-4">
              {COMPANY.TAGLINE}
            </p>
            <p className="text-sm text-gray-500">
              Más de {COMPANY.EXPERIENCE_YEARS} años construyendo hogares de calidad.
              <br />
              Más de {COMPANY.PROPERTIES_BUILT}+ viviendas realizadas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Enlaces
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/propiedades"
                  className="hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  Promociones
                </Link>
              </li>
              <li>
                <Link
                  to="/nosotros"
                  className="hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${COMPANY.PHONE}`}
                  className="hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  {COMPANY.PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${COMPANY.EMAIL}`}
                  className="hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
                >
                  {COMPANY.EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{COMPANY.ADDRESS}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} {COMPANY.NAME}. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                to="/aviso-legal"
                className="text-sm hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
              >
                Aviso Legal
              </Link>
              <Link
                to="/privacidad"
                className="text-sm hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
              >
                Privacidad
              </Link>
              <Link
                to="/cookies"
                className="text-sm hover:text-white transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}