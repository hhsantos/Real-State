/**
 * Mock data for properties
 * Based on analysis of realstate.com - La Estrella del Señorío
 */

export const PROPERTY_FEATURES = {
  GARAGE: 'Garaje',
  POOL: 'Piscina',
  GARDEN: 'Jardín',
  TERRACE: 'Terraza',
  ELEVATOR: 'Ascensor',
  STORAGE: 'Trastero',
  AIR_CONDITIONING: 'Aire acondicionado',
  HEATING: 'Calefacción',
  PADDLE: 'Pádel',
  PLAYGROUND: 'Zona infantil',
  SECURITY: 'Seguridad',
};

export const PROPERTY_STATUS = {
  AVAILABLE: 'Disponible',
  IN_CONSTRUCTION: 'En construcción',
  SOLD_OUT: 'Vendido',
  COMING_SOON: 'Próximamente',
};

export const PROPERTY_TYPES = {
  CHALET: 'Chalet',
  APARTMENT: 'Piso',
  DUPLEX: 'Dúplex',
  PENTHOUSE: 'Ático',
};

// Mock properties data
export const properties = [
  {
    id: 1,
    title: 'La Estrella del Señorío',
    type: PROPERTY_TYPES.CHALET,
    location: 'Illescas, Toledo',
    status: PROPERTY_STATUS.AVAILABLE,
    description: 'Ese sueño que siempre has tenido. Tu sueño hecho realidad... ¡YA LO TIENES! Disfruta de las mejores comodidades en un entorno natural.',
    longDescription: '46 chalets adosados de 4 dormitorios en una ubicación privilegiada. Cada vivienda cuenta con garaje individual y acceso a amplias zonas comunes con piscina, pádel y zona infantil. Entorno natural rodeado de zonas verdes y servicios.',
    price: 285000,
    bedrooms: 4,
    bathrooms: 3,
    surface: 180,
    plotSize: 200,
    features: [
      PROPERTY_FEATURES.GARAGE,
      PROPERTY_FEATURES.POOL,
      PROPERTY_FEATURES.GARDEN,
      PROPERTY_FEATURES.PADDLE,
      PROPERTY_FEATURES.PLAYGROUND,
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    ],
    coordinates: {
      lat: 40.1301,
      lng: -3.8472,
    },
    totalUnits: 46,
    availableUnits: 12,
    deliveryDate: '2025-12-01',
    featured: true,
  },
  {
    id: 2,
    title: 'Residencial Las Encinas',
    type: PROPERTY_TYPES.APARTMENT,
    location: 'Parla, Madrid',
    status: PROPERTY_STATUS.IN_CONSTRUCTION,
    description: 'Viviendas modernas con las mejores calidades en una ubicación estratégica.',
    longDescription: 'Promoción de 80 viviendas de 2 y 3 dormitorios con garaje y trastero incluido. Excelentes comunicaciones con el centro de Madrid. Acabados de primera calidad.',
    price: 195000,
    bedrooms: 3,
    bathrooms: 2,
    surface: 95,
    features: [
      PROPERTY_FEATURES.GARAGE,
      PROPERTY_FEATURES.STORAGE,
      PROPERTY_FEATURES.ELEVATOR,
      PROPERTY_FEATURES.AIR_CONDITIONING,
    ],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop',
    ],
    coordinates: {
      lat: 40.2375,
      lng: -3.7681,
    },
    totalUnits: 80,
    availableUnits: 35,
    deliveryDate: '2026-06-01',
    featured: true,
  },
  {
    id: 3,
    title: 'Residencial El Mirador',
    type: PROPERTY_TYPES.DUPLEX,
    location: 'Getafe, Madrid',
    status: PROPERTY_STATUS.AVAILABLE,
    description: 'Dúplex exclusivos con terraza y vistas panorámicas.',
    longDescription: '24 dúplex de lujo con amplias terrazas. Diseño moderno y funcional. Zona tranquila con todos los servicios a tu alcance.',
    price: 245000,
    bedrooms: 3,
    bathrooms: 2,
    surface: 120,
    features: [
      PROPERTY_FEATURES.TERRACE,
      PROPERTY_FEATURES.GARAGE,
      PROPERTY_FEATURES.STORAGE,
      PROPERTY_FEATURES.ELEVATOR,
      PROPERTY_FEATURES.HEATING,
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    ],
    coordinates: {
      lat: 40.3063,
      lng: -3.7325,
    },
    totalUnits: 24,
    availableUnits: 8,
    deliveryDate: '2025-09-01',
    featured: false,
  },
  {
    id: 4,
    title: 'Áticos Premium Centro',
    type: PROPERTY_TYPES.PENTHOUSE,
    location: 'Madrid Centro',
    status: PROPERTY_STATUS.COMING_SOON,
    description: 'Áticos de lujo en pleno centro de Madrid con vistas espectaculares.',
    longDescription: 'Promoción exclusiva de 12 áticos de alto standing. Amplias terrazas, acabados premium y ubicación privilegiada en el corazón de Madrid.',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    surface: 110,
    features: [
      PROPERTY_FEATURES.TERRACE,
      PROPERTY_FEATURES.GARAGE,
      PROPERTY_FEATURES.STORAGE,
      PROPERTY_FEATURES.ELEVATOR,
      PROPERTY_FEATURES.AIR_CONDITIONING,
      PROPERTY_FEATURES.SECURITY,
    ],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800&h=600&fit=crop',
    ],
    coordinates: {
      lat: 40.4168,
      lng: -3.7038,
    },
    totalUnits: 12,
    availableUnits: 12,
    deliveryDate: '2026-12-01',
    featured: true,
  },
  {
    id: 5,
    title: 'Villa Las Rozas',
    type: PROPERTY_TYPES.CHALET,
    location: 'Las Rozas, Madrid',
    status: PROPERTY_STATUS.SOLD_OUT,
    description: 'Chalets independientes en zona residencial exclusiva.',
    longDescription: 'Promoción de 15 chalets independientes. Parcelas de 400m² con jardín privado y piscina. Zona de máxima tranquilidad.',
    price: 520000,
    bedrooms: 5,
    bathrooms: 3,
    surface: 250,
    plotSize: 400,
    features: [
      PROPERTY_FEATURES.GARAGE,
      PROPERTY_FEATURES.POOL,
      PROPERTY_FEATURES.GARDEN,
      PROPERTY_FEATURES.AIR_CONDITIONING,
      PROPERTY_FEATURES.HEATING,
    ],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
    ],
    coordinates: {
      lat: 40.5569,
      lng: -3.8736,
    },
    totalUnits: 15,
    availableUnits: 0,
    deliveryDate: '2024-03-01',
    featured: false,
  },
  {
    id: 6,
    title: 'Residencial Nuevo Parque',
    type: PROPERTY_TYPES.APARTMENT,
    location: 'Móstoles, Madrid',
    status: PROPERTY_STATUS.IN_CONSTRUCTION,
    description: 'Pisos modernos junto al parque con excelentes comunicaciones.',
    longDescription: 'Nueva promoción de 120 viviendas de 2 y 3 dormitorios. Zonas verdes, garaje y trastero. Entrega en 2026.',
    price: 175000,
    bedrooms: 2,
    bathrooms: 1,
    surface: 75,
    features: [
      PROPERTY_FEATURES.GARAGE,
      PROPERTY_FEATURES.STORAGE,
      PROPERTY_FEATURES.ELEVATOR,
    ],
    images: [
      'https://images.unsplash.com/photo-1601760562234-9814eea6663a?w=800&h=600&fit=crop',
    ],
    coordinates: {
      lat: 40.3223,
      lng: -3.8649,
    },
    totalUnits: 120,
    availableUnits: 85,
    deliveryDate: '2026-03-01',
    featured: false,
  },
];

// Helper functions
export function getPropertyById(id) {
  return properties.find(p => p.id === parseInt(id));
}

export function getFeaturedProperties() {
  return properties.filter(p => p.featured);
}

export function getAvailableProperties() {
  return properties.filter(p => 
    p.status === PROPERTY_STATUS.AVAILABLE || 
    p.status === PROPERTY_STATUS.IN_CONSTRUCTION
  );
}

export function filterProperties(filters) {
  return properties.filter(property => {
    // Status filter
    if (filters.status && filters.status.length > 0) {
      if (!filters.status.includes(property.status)) return false;
    }
    
    // Type filter
    if (filters.type && filters.type.length > 0) {
      if (!filters.type.includes(property.type)) return false;
    }
    
    // Location filter
    if (filters.location && filters.location.length > 0) {
      const hasLocation = filters.location.some(loc => 
        property.location.toLowerCase().includes(loc.toLowerCase())
      );
      if (!hasLocation) return false;
    }
    
    // Price range
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    
    // Bedrooms
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    
    // Features
    if (filters.features && filters.features.length > 0) {
      const hasAllFeatures = filters.features.every(feature => 
        property.features.includes(feature)
      );
      if (!hasAllFeatures) return false;
    }
    
    return true;
  });
}

export default properties;