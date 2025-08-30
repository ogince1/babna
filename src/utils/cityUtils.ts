import { moroccanCities } from '../data/cities';

// Fonction pour convertir un nom de ville en slug
export const cityNameToSlug = (cityName: string): string => {
  const city = moroccanCities.find(city => 
    city.name.toLowerCase() === cityName.toLowerCase() ||
    city.nameAr === cityName
  );
  
  if (city) {
    return city.id;
  }
  
  // Fallback: convertir le nom en slug
  return cityName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprimer les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplacer les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, ''); // Supprimer les tirets en début et fin
};

// Fonction pour convertir un slug en nom de ville
export const slugToCityName = (slug: string): string | null => {
  const city = moroccanCities.find(city => city.id === slug);
  return city ? city.name : null;
};

// Fonction pour obtenir toutes les villes avec leurs slugs
export const getCitiesWithSlugs = () => {
  return moroccanCities.map(city => ({
    ...city,
    slug: city.id
  }));
};

// Fonction pour vérifier si une ville existe
export const cityExists = (cityName: string): boolean => {
  return moroccanCities.some(city => 
    city.name.toLowerCase() === cityName.toLowerCase() ||
    city.nameAr === cityName
  );
};
