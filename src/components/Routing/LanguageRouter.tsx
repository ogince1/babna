import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import MultilingualRoutes from '../../routes/MultilingualRoutes';
import FrenchRedirect from './FrenchRedirect';

interface LanguageRouterProps {
  onPropertySelect: (property: any) => void;
}

const LanguageRouter: React.FC<LanguageRouterProps> = ({ onPropertySelect }) => {
  const { language, setLanguage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const pathname = location.pathname;
    
    // Détecter la langue depuis l'URL
    const pathSegments = pathname.split('/').filter(Boolean);
    const detectedLanguage = pathSegments[0];
    
    // Langues supportées (français est la langue par défaut, pas de préfixe)
    const supportedLanguages = ['ar', 'en', 'es'];
    
    if (supportedLanguages.includes(detectedLanguage)) {
      // Si la langue dans l'URL est différente de la langue actuelle
      if (detectedLanguage !== language) {
        setLanguage(detectedLanguage);
      }
      setIsInitialized(true);
    } else {
      // Si aucune langue n'est spécifiée dans l'URL, c'est le français (langue par défaut)
      if (language !== 'fr') {
        setLanguage('fr');
      }
      setIsInitialized(true);
    }
  }, [location.pathname, language, setLanguage, navigate]);

  // Afficher un loader pendant l'initialisation
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Composant de redirection pour /fr vers / */}
      <FrenchRedirect />
      
      <Routes>
        {/* Routes avec préfixe de langue */}
        <Route path="/*" element={<MultilingualRoutes onPropertySelect={onPropertySelect} />} />
      </Routes>
    </>
  );
};

export default LanguageRouter;
