export const ROUTES = {
  // Routes publiques
  HOME: '/',
  PROPERTIES: '/appartements',
  PROPERTY_DETAIL: '/appartements/:propertyId',
  CITY_PROPERTIES: '/appartements/ville/:citySlug',
  TYPE_PROPERTIES: '/appartements/type/:typeSlug',
  PLACE_PROPERTIES: '/appartements/lieu/:placeSlug',
  TAG_PROPERTIES: '/appartements/tag/:tagSlug',
  
  // Routes de réservation
  BOOKING: '/reserver/:propertyId',
  
  // Routes propriétaire
  OWNER_DASHBOARD: '/proprietaire/dashboard',
  OWNER_ADD_PROPERTY: '/proprietaire/ajouter-propriete',
  OWNER_EDIT_PROPERTY: '/proprietaire/modifier-propriete/:propertyId',
  OWNER_BOOKINGS: '/proprietaire/reservations',
  
  // Routes voyageur
  TRAVELER_BOOKINGS: '/voyageur/reservations',
  CLIENT_DASHBOARD: '/client/dashboard',
  
  // Routes protégées générales
  MY_BOOKINGS: '/mes-reservations',
  FAVORITES: '/favoris',
  PROFILE: '/profil',
} as const;

export const getLocalizedRoute = (route: string, language: 'fr' | 'ar' | 'en' | 'es', params?: Record<string, string>) => {
  let localizedRoute = `/${language}${route}`;
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      localizedRoute = localizedRoute.replace(`:${key}`, value);
    });
  }
  
  return localizedRoute;
};

export const getRouteWithoutLanguage = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'fr' || segments[0] === 'ar' || segments[0] === 'en' || segments[0] === 'es') {
    return '/' + segments.slice(1).join('/');
  }
  return pathname;
};
