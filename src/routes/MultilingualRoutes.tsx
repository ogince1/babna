import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import HomePage from '../pages/HomePage';
import CityPage from '../pages/CityPage';
import TypePage from '../pages/TypePage';
import PlacePage from '../pages/PlacePage';
import TagPage from '../pages/TagPage';
import PropertiesPage from '../pages/PropertiesPage';
import AddPropertyPage from '../pages/AddPropertyPage';
import EditPropertyPage from '../pages/EditPropertyPage';
import BookingPage from '../pages/BookingPage';
import OwnerBookingsPage from '../pages/OwnerBookingsPage';
import TravelerBookingsPage from '../pages/TravelerBookingsPage';
import PropertyDetailPage from '../pages/PropertyDetailPage';
import OwnerDashboardPage from '../pages/OwnerDashboardPage';
import ClientDashboardPage from '../pages/ClientDashboardPage';
import MyBookingsPage from '../pages/MyBookingsPage';
import FavoritesPage from '../pages/FavoritesPage';
import ProfilePage from '../pages/ProfilePage';
import BlogPage from '../pages/BlogPage';
import BlogDetailPage from '../pages/BlogDetailPage';
import TravelGuidePage from '../pages/TravelGuidePage';

// Import des pages admin
import AdminHomePage from '../pages/Admin/AdminHomePage';
import AdminPropertiesPage from '../pages/Admin/AdminPropertiesPage';
import AdminUsersPage from '../pages/Admin/AdminUsersPage';
import AdminApprovalsPage from '../pages/Admin/AdminApprovalsPage';
import AdminProfilePage from '../pages/Admin/AdminProfilePage';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

// Composants de routes pour chaque langue
const ArabicRoutes: React.FC<{ onPropertySelect: (property: any) => void }> = ({ onPropertySelect }) => (
  <Routes>
    <Route path="/" element={<HomePage onPropertySelect={onPropertySelect} />} />
    <Route path="/appartements" element={<PropertiesPage onPropertySelect={onPropertySelect} />} />
    <Route path="/appartements/ville/:citySlug" element={<CityPage />} />
    <Route path="/appartements/type/:typeSlug" element={<TypePage />} />
    <Route path="/appartements/lieu/:placeSlug" element={<PlacePage />} />
    <Route path="/appartements/tag/:tagSlug" element={<TagPage />} />
    <Route path="/appartements/:propertyId" element={<PropertyDetailPage />} />
    <Route path="/reserver/:propertyId" element={<BookingPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:postId" element={<BlogDetailPage />} />
    <Route path="/guides" element={<TravelGuidePage />} />
  </Routes>
);

const EnglishRoutes: React.FC<{ onPropertySelect: (property: any) => void }> = ({ onPropertySelect }) => (
  <Routes>
    <Route path="/" element={<HomePage onPropertySelect={onPropertySelect} />} />
    <Route path="/appartements" element={<PropertiesPage onPropertySelect={onPropertySelect} />} />
    <Route path="/appartements/ville/:citySlug" element={<CityPage />} />
    <Route path="/appartements/type/:typeSlug" element={<TypePage />} />
    <Route path="/appartements/lieu/:placeSlug" element={<PlacePage />} />
    <Route path="/appartements/tag/:tagSlug" element={<TagPage />} />
    <Route path="/appartements/:propertyId" element={<PropertyDetailPage />} />
    <Route path="/reserver/:propertyId" element={<BookingPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:postId" element={<BlogDetailPage />} />
    <Route path="/guides" element={<TravelGuidePage />} />
  </Routes>
);

const SpanishRoutes: React.FC<{ onPropertySelect: (property: any) => void }> = ({ onPropertySelect }) => (
  <Routes>
    <Route path="/" element={<HomePage onPropertySelect={onPropertySelect} />} />
    <Route path="/appartements" element={<PropertiesPage onPropertySelect={onPropertySelect} />} />
    <Route path="/appartements/ville/:citySlug" element={<CityPage />} />
    <Route path="/appartements/type/:typeSlug" element={<TypePage />} />
    <Route path="/appartements/lieu/:placeSlug" element={<PlacePage />} />
    <Route path="/appartements/tag/:tagSlug" element={<TagPage />} />
    <Route path="/appartements/:propertyId" element={<PropertyDetailPage />} />
    <Route path="/reserver/:propertyId" element={<BookingPage />} />
    <Route path="/blog" element={<BlogPage />} />
    <Route path="/blog/:postId" element={<BlogDetailPage />} />
    <Route path="/guides" element={<TravelGuidePage />} />
  </Routes>
);

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

interface MultilingualRoutesProps {
  onPropertySelect: (property: any) => void;
}

const MultilingualRoutes: React.FC<MultilingualRoutesProps> = ({ onPropertySelect }) => {
  return (
    <Routes>
      {/* Routes publiques - Français (langue par défaut, pas de préfixe) */}
      <Route path="/" element={<HomePage onPropertySelect={onPropertySelect} />} />
      <Route path="/appartements" element={<PropertiesPage onPropertySelect={onPropertySelect} />} />
      <Route path="/appartements/ville/:citySlug" element={<CityPage />} />
      <Route path="/appartements/type/:typeSlug" element={<TypePage />} />
      <Route path="/appartements/lieu/:placeSlug" element={<PlacePage />} />
      <Route path="/appartements/tag/:tagSlug" element={<TagPage />} />
      <Route path="/appartements/:propertyId" element={<PropertyDetailPage />} />
      
      {/* Route pour réserver une propriété */}
      <Route path="/reserver/:propertyId" element={<BookingPage />} />
      
      {/* Routes de contenu */}
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:postId" element={<BlogDetailPage />} />
      <Route path="/guides" element={<TravelGuidePage />} />
      
      {/* Routes avec préfixe de langue pour les autres langues */}
      <Route path="/ar/*" element={<ArabicRoutes onPropertySelect={onPropertySelect} />} />
      <Route path="/en/*" element={<EnglishRoutes onPropertySelect={onPropertySelect} />} />
      <Route path="/es/*" element={<SpanishRoutes onPropertySelect={onPropertySelect} />} />
      
      {/* Routes protégées - Propriétaire */}
      <Route 
        path="/proprietaire/ajouter-propriete" 
        element={
          <RoleProtectedRoute allowedRoles={['owner']}>
            <AddPropertyPage />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/proprietaire/modifier-propriete/:propertyId" 
        element={
          <RoleProtectedRoute allowedRoles={['owner']}>
            <EditPropertyPage />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/proprietaire/reservations" 
        element={
          <RoleProtectedRoute allowedRoles={['owner']}>
            <OwnerBookingsPage />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/proprietaire/dashboard" 
        element={
          <RoleProtectedRoute allowedRoles={['owner']}>
            <OwnerDashboardPage />
          </RoleProtectedRoute>
        } 
      />
      
      {/* Routes protégées - Voyageur */}
      <Route 
        path="/voyageur/reservations" 
        element={
          <ProtectedRoute>
            <TravelerBookingsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/client/dashboard" 
        element={
          <RoleProtectedRoute allowedRoles={['client']}>
            <ClientDashboardPage />
          </RoleProtectedRoute>
        } 
      />
      
      {/* Routes protégées - Général */}
      <Route 
        path="/mes-reservations" 
        element={
          <ProtectedRoute>
            <MyBookingsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/favoris" 
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profil" 
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } 
      />
      
      {/* Routes protégées - Admin */}
      <Route 
        path="/admin" 
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/admin/proprietes" 
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/admin/utilisateurs" 
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/admin/approbations" 
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } 
      />
      <Route 
        path="/admin/profil" 
        element={
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default MultilingualRoutes;
