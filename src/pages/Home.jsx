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
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO.SITE_URL} />
        <meta property="og:title" content={SEO.TITLE} />
        <meta property="og:description" content={SEO.DESCRIPTION} />
        <meta property="og:image" content={SEO.DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO.SITE_URL} />
        <meta name="twitter:title" content={SEO.TITLE} />
        <meta name="twitter:description" content={SEO.DESCRIPTION} />
        <meta name="twitter:image" content={SEO.DEFAULT_OG_IMAGE} />
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