import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { ArrowRight, Phone } from 'lucide-react';

/**
 * Hero Section - Home page header
 * Based on alisisa.com analysis:
 * - Clean, professional design
 * - Focus on trust and experience
 * - Clear CTAs
 * 
 * MUST per AGENTS.md:
 * - Generous touch targets (≥44px)
 * - Links are <Link> components
 * - Semantic HTML
 * - Image with explicit dimensions to prevent CLS
 * - Preload above-the-fold image
 */

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
          loading="eager"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/70" />
      </div>

      <div className="container-custom relative py-24 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/90 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-white shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
            <span>Más de 25 años de experiencia en Alicante</span>
          </div>

          {/* Main headline - MUST: Only one h1 per page */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight text-white">
            Construimos tu hogar,{' '}
            <span className="text-primary-400">creamos tu futuro</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-100 max-w-2xl leading-relaxed">
            Promotora de viviendas con más de dos décadas construyendo calidad, compromiso y confianza en cada proyecto en la provincia de Alicante.
          </p>

          {/* CTAs - MUST: Touch targets ≥44px */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              as={Link}
              to="/propiedades"
              size="lg"
              className="bg-primary-600 text-white hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
            >
              Ver Promociones
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              as="a"
              href="tel:+34965000000"
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Llámanos
            </Button>
          </div>

          {/* Stats - MUST: Use tabular numbers per AGENTS.md */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/30">
            <Stat value="25+" label="Años de experiencia" />
            <Stat value="500+" label="Viviendas entregadas" />
            <Stat value="100%" label="Satisfacción cliente" />
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white" style={{
        clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0 100%)',
      }} />
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      {/* MUST: Tabular numbers per AGENTS.md for comparisons */}
      <div className="text-3xl md:text-4xl font-bold mb-1 text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
      <div className="text-sm md:text-base text-gray-300">{label}</div>
    </div>
  );
}
