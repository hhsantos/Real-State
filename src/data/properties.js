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

import propertiesJson from '../../public/properties.json';

// Mock properties data loaded from JSON
export const properties = propertiesJson;

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