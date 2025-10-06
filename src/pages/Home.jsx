import { Helmet } from 'react-helmet-async';
import { SEO } from '../utils/constants';
import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import CTASection from '../components/home/CTASection';

/**
 * Home Page
 * Main landing page with featured content
 * 
 * MUST per AGENTS.md:
 * - Semantic HTML (main, section)
 * - Proper headings hierarchy (h1 only once)
 * - Accessible images with alt text
 * - No dead ends (always provide next action)
 * - Links are <Link> components
 */

export default function Home() {
  return (
    <>
      {/* SEO - MUST: Title matches context per AGENTS.md */}
      <Helmet>
        <title>{SEO.TITLE}</title>
        <meta name="description" content={SEO.DESCRIPTION} />
      </Helmet>

      {/* Hero Section - First impression with main CTA */}
      <Hero />

      {/* Featured Properties - Show highlighted properties */}
      <FeaturedProperties />

      {/* Why Choose Us - Company differentiators */}
      <WhyChooseUs />

      {/* Stats - Social proof with numbers */}
      <Stats />

      {/* Testimonials - Customer reviews */}
      <Testimonials />

      {/* CTA Section - Final conversion point */}
      <CTASection />
    </>
  );
}