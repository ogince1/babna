import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { getCityBySlug, getTypeBySlug, getPlaceBySlug } from '../../data/seoData';
import { getTagById } from '../../data/tags';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { currentLanguage } = useApp();
  
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs: Array<{ name: string; path: string; isCurrent: boolean }> = [];
    
    let currentPath = '';
    
    // Ajouter la page d'accueil
    breadcrumbs.push({
      name: currentLanguage === 'ar' ? 'الرئيسية' : 'Accueil',
      path: '/',
      isCurrent: pathnames.length === 0
    });
    
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      const isLast = index === pathnames.length - 1;
      
      let displayName = name;
      
      // Traduire les noms selon le contexte
      if (name === 'appartements') {
        displayName = currentLanguage === 'ar' ? 'شقق للكراء اليومي' : 
                     currentLanguage === 'en' ? 'Properties' : 
                     currentLanguage === 'es' ? 'Propiedades' : 
                     'Appartements';
              } else if (name === 'jour') {
          displayName = currentLanguage === 'ar' ? 'كراء يومي' : 
                       currentLanguage === 'en' ? 'Daily Rental' : 
                       currentLanguage === 'es' ? 'Alquiler Diario' : 
                       'Location journalière';
              } else if (name === 'ville') {
          displayName = currentLanguage === 'ar' ? 'المدن' : 
                       currentLanguage === 'en' ? 'Cities' : 
                       currentLanguage === 'es' ? 'Ciudades' : 
                       'Villes';
              } else if (name === 'type') {
          displayName = currentLanguage === 'ar' ? 'الأنواع' : 
                       currentLanguage === 'en' ? 'Types' : 
                       currentLanguage === 'es' ? 'Tipos' : 
                       'Types';
              } else if (name === 'lieu') {
          displayName = currentLanguage === 'ar' ? 'الأماكن' : 
                       currentLanguage === 'en' ? 'Places' : 
                       currentLanguage === 'es' ? 'Lugares' : 
                       'Lieux';
              } else if (name === 'tag') {
          displayName = currentLanguage === 'ar' ? 'المعالم السياحية' : 
                       currentLanguage === 'en' ? 'Attractions' : 
                       currentLanguage === 'es' ? 'Atracciones' : 
                       'Attractions';
      } else {
        // Chercher dans les données SEO
        const cityData = getCityBySlug(name);
        const typeData = getTypeBySlug(name);
        const placeData = getPlaceBySlug(name);
        const tagData = getTagById(name);
        
        if (cityData) {
          displayName = currentLanguage === 'ar' ? cityData.name.ar : cityData.name.fr;
        } else if (typeData) {
          displayName = currentLanguage === 'ar' ? typeData.name.ar : typeData.name.fr;
        } else if (placeData) {
          displayName = currentLanguage === 'ar' ? placeData.name.ar : placeData.name.fr;
        } else if (tagData) {
          displayName = currentLanguage === 'ar' ? tagData.nameAr : tagData.name;
        }
      }
      
      breadcrumbs.push({
        name: displayName,
        path: currentPath,
        isCurrent: isLast
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) {
    return null;
  }
  
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index === 0 ? (
            <Link
              to={breadcrumb.path}
              className={`flex items-center hover:text-orange-500 transition-colors ${
                breadcrumb.isCurrent ? 'text-orange-500 font-medium' : ''
              }`}
            >
              <Home size={16} className="mr-1" />
              {breadcrumb.name}
            </Link>
          ) : (
            <>
              <ChevronRight size={16} className="text-gray-400" />
              {breadcrumb.isCurrent ? (
                <span className="text-orange-500 font-medium">{breadcrumb.name}</span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="hover:text-orange-500 transition-colors"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

