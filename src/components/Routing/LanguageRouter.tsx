import React, { useEffect } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import MultilingualRoutes from '../../routes/MultilingualRoutes';

interface LanguageRouterProps {
  onPropertySelect: (property: any) => void;
}

const LanguageRouter: React.FC<LanguageRouterProps> = ({ onPropertySelect }) => {
  const { language, setLanguage } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;
    
    // Détecter la langue depuis l'URL
    const pathSegments = pathname.split('/').filter(Boolean);
    const detectedLanguage = pathSegments[0];
    
    if (detectedLanguage === 'fr' || detectedLanguage === 'ar' || detectedLanguage === 'en' || detectedLanguage === 'es') {
      // Si la langue dans l'URL est différente de la langue actuelle
      if (detectedLanguage !== language) {
        setLanguage(detectedLanguage);
      }
    } else {
      // Si aucune langue n'est spécifiée dans l'URL, rediriger vers la langue par défaut
      const newPath = `/${language}${pathname}`;
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, language, setLanguage, navigate]);

  return (
    <Routes>
      {/* Routes avec préfixe de langue */}
      <Route path="/*" element={<MultilingualRoutes onPropertySelect={onPropertySelect} />} />
    </Routes>
  );
};

export default LanguageRouter;
