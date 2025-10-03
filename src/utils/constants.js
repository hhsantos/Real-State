/**
 * Constants for the ALISI application
 * Based on AGENTS.md requirements
 */

// Touch target sizes - MUST per AGENTS.md
export const TOUCH_TARGETS = {
  MOBILE_MIN: 44, // pixels
  DESKTOP_MIN: 24, // pixels
};

// Animation durations - MUST honor prefers-reduced-motion
export const DURATIONS = {
  FAST: 150, // ms
  NORMAL: 250, // ms
  SLOW: 350, // ms
};

// Breakpoints (matching Tailwind config)
export const BREAKPOINTS = {
  XS: 475,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
  ULTRA: 2560,
};

// Company info
export const COMPANY_INFO = {
  NAME: 'ALISI S.A.',
  FULL_NAME: 'ALISI, Sociedad Anónima',
  TAGLINE: 'Promotora de Viviendas',
  EXPERIENCE_YEARS: 25,
  PROPERTIES_BUILT: 1300,
  PHONE: '+34 XXX XXX XXX', // TODO: Add real phone
  EMAIL: 'info@alisisa.com', // TODO: Verify email
  ADDRESS: 'Madrid, España', // TODO: Add real address
};

// Navigation menu items
export const NAV_ITEMS = [
  { id: 'home', label: 'Inicio', path: '/' },
  { id: 'properties', label: 'Promociones', path: '/propiedades' },
  { id: 'about', label: 'Nosotros', path: '/sobre-nosotros' },
  { id: 'contact', label: 'Contacto', path: '/contacto' },
];

// Property types
export const PROPERTY_TYPES = {
  APARTMENT: 'Piso',
  CHALET: 'Chalet',
  DUPLEX: 'Dúplex',
  STUDIO: 'Estudio',
  PENTHOUSE: 'Ático',
};

// Property statuses
export const PROPERTY_STATUS = {
  IN_PROGRESS: 'En construcción',
  AVAILABLE: 'Disponible',
  SOLD: 'Vendido',
  RESERVED: 'Reservado',
  FUTURE: 'Próximamente',
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo es obligatorio',
  EMAIL: 'Por favor, introduce un email válido',
  PHONE: 'Por favor, introduce un teléfono válido',
  MIN_LENGTH: (min) => `Debe tener al menos ${min} caracteres`,
  MAX_LENGTH: (max) => `No puede exceder ${max} caracteres`,
};

// SEO defaults
export const SEO_DEFAULTS = {
  TITLE: 'ALISI - Promotora de Viviendas',
  DESCRIPTION:
    'ALISI S.A. con más de 25 años en el sector inmobiliario. Construcción, promoción y venta de viviendas de calidad en Madrid y alrededores.',
  KEYWORDS: [
    'promotora',
    'viviendas',
    'inmobiliaria',
    'obra nueva',
    'pisos',
    'chalets',
    'Madrid',
    'construcción',
  ],
};
