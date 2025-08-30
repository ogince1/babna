import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getLocalizedRoute, getRouteWithoutLanguage } from '../config/routes';

export const useMultilingualRoute = () => {
  const { language } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Obtenir le chemin sans la langue
  const getPathWithoutLanguage = (path: string = location.pathname) => {
    return getRouteWithoutLanguage(path);
  };

  // Obtenir le chemin avec la langue actuelle
  const getPathWithLanguage = (path: string, routeParams?: Record<string, string>) => {
    const pathWithoutLang = getPathWithoutLanguage(path);
    return getLocalizedRoute(pathWithoutLang, language, routeParams);
  };

  // Naviguer vers une route avec la langue actuelle
  const navigateTo = (path: string, options?: any, routeParams?: Record<string, string>) => {
    const localizedPath = getPathWithLanguage(path, routeParams);
    navigate(localizedPath, options);
  };

  // Naviguer directement vers une URL localisée
  const navigateToLocalized = (localizedPath: string, options?: any) => {
    navigate(localizedPath, options);
  };

  // Obtenir l'URL actuelle sans la langue
  const currentPathWithoutLanguage = getPathWithoutLanguage();

  // Obtenir l'URL actuelle avec la langue
  const currentPathWithLanguage = getPathWithLanguage(location.pathname);

  return {
    navigateTo,
    navigateToLocalized,
    getPathWithLanguage,
    getPathWithoutLanguage,
    currentPathWithoutLanguage,
    currentPathWithLanguage,
    language,
    langParam: params.lang
  };
};
