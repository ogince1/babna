import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppProvider, useApp } from './context/AppContext';
import LanguageRouter from './components/Routing/LanguageRouter';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import MultilingualRoutes from './routes/MultilingualRoutes';
import AuthModal from './components/Auth/AuthModal';
import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import TypePage from './pages/TypePage';
import PlacePage from './pages/PlacePage';
import TagPage from './pages/TagPage';
import PropertiesPage from './pages/PropertiesPage';
import AddPropertyPage from './pages/AddPropertyPage';
import EditPropertyPage from './pages/EditPropertyPage';
import BookingPage from './pages/BookingPage';
import OwnerBookingsPage from './pages/OwnerBookingsPage';
import TravelerBookingsPage from './pages/TravelerBookingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import MyBookingsPage from './pages/MyBookingsPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const RoleProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePropertySelect = (property: any) => {
    // Navigate to property details page
    navigate(`/appartements/${property.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        onLoginClick={() => setAuthModalOpen(true)}
      />
      
      <div className="flex flex-1">
        {/* Sidebar uniquement pour les utilisateurs connectés */}
        {isAuthenticated && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />
        )}
        
        <main className="flex-1">
          <Routes>
            {/* Routes avec préfixe de langue */}
            <Route path="/:lang/*" element={<LanguageRouter onPropertySelect={handlePropertySelect} />} />
            
            {/* Routes par défaut (sans préfixe de langue) */}
            <Route path="/" element={<HomePage onPropertySelect={handlePropertySelect} />} />
            <Route path="/appartements" element={<PropertiesPage onPropertySelect={handlePropertySelect} />} />
            <Route path="/appartements/ville/:citySlug" element={<CityPage />} />
            <Route path="/appartements/type/:typeSlug" element={<TypePage />} />
            <Route path="/appartements/lieu/:placeSlug" element={<PlacePage />} />
            <Route path="/appartements/tag/:tagSlug" element={<TagPage />} />
            <Route path="/appartements/:propertyId" element={<PropertyDetailPage />} />
            <Route path="/reserver/:propertyId" element={<BookingPage />} />
            
            {/* Routes protégées - Propriétaire */}
            <Route path="/proprietaire/ajouter-propriete" element={<RoleProtectedRoute allowedRoles={['owner']}><AddPropertyPage /></RoleProtectedRoute>} />
            <Route path="/proprietaire/modifier-propriete/:propertyId" element={<RoleProtectedRoute allowedRoles={['owner']}><EditPropertyPage /></RoleProtectedRoute>} />
            <Route path="/proprietaire/reservations" element={<RoleProtectedRoute allowedRoles={['owner']}><OwnerBookingsPage /></RoleProtectedRoute>} />
            <Route path="/proprietaire/dashboard" element={<RoleProtectedRoute allowedRoles={['owner']}><OwnerDashboardPage /></RoleProtectedRoute>} />
            
            {/* Routes protégées - Voyageur */}
            <Route path="/voyageur/reservations" element={<ProtectedRoute><TravelerBookingsPage /></ProtectedRoute>} />
            <Route path="/client/dashboard" element={<RoleProtectedRoute allowedRoles={['client']}><ClientDashboardPage /></RoleProtectedRoute>} />
            
            {/* Routes protégées - Général */}
            <Route path="/mes-reservations" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
            <Route path="/favoris" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="/profil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>

      <Footer />

      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
};

export default App;