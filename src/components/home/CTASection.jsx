import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import Button from '../ui/Button';
import { COMPANY_INFO } from '../../utils/constants';

/**
 * CTA Section
 * Final call-to-action before footer
 * MUST per AGENTS.md:
 * - Links are <Link> components
 * - Touch targets ≥44px
 * - No dead ends (always provide next action)
 */

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            ¿Listo para encontrar tu hogar ideal?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-primary-50 leading-relaxed">
            Nuestro equipo de expertos está preparado para ayudarte en cada paso del proceso. 
            Desde la primera visita hasta la entrega de llaves, estaremos a tu lado.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              as={Link}
              to="/propiedades"
              size="lg"
              className="bg-white text-primary-700 hover:bg-gray-100 shadow-lg"
            >
              Ver Promociones
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              as={Link}
              to="/contacto"
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              Contactar
            </Button>
          </div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 border-t border-white/20">
            <a 
              href={`tel:${COMPANY_INFO.PHONE}`}
              className="flex items-center gap-2 text-primary-50 hover:text-white transition-colors duration-[var(--duration-fast)]"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">{COMPANY_INFO.PHONE}</span>
            </a>
            <div className="hidden sm:block w-px h-6 bg-white/20" aria-hidden="true" />
            <a 
              href={`mailto:${COMPANY_INFO.EMAIL}`}
              className="flex items-center gap-2 text-primary-50 hover:text-white transition-colors duration-[var(--duration-fast)]"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">{COMPANY_INFO.EMAIL}</span>
            </a>
          </div>

          {/* Additional info */}
          <p className="mt-8 text-sm text-primary-100">
            Horario de atención: {COMPANY_INFO.HOURS}
          </p>
        </div>
      </div>
    </section>
  );
}
