import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FrenchRedirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = location.pathname;
    
    // Cas 1: Redirection de la page d'accueil / vers /fr
    if (pathname === '/') {
      console.log('🔄 Redirection page d\'accueil: / → /fr');
      navigate('/fr', { replace: true });
      return;
    }
    
    // Cas 2: Vérifier si l'URL commence par /fr
    if (pathname.startsWith('/fr')) {
      // Extraire le chemin sans /fr
      const newPath = pathname.replace(/^\/fr/, '');
      
      // Redirection permanente (301) vers la nouvelle URL
      console.log(`🔄 Redirection permanente: ${pathname} → ${newPath}`);
      
      // Rediriger vers la nouvelle URL
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, navigate]);

  return null; // Ce composant ne rend rien
};

export default FrenchRedirect;
