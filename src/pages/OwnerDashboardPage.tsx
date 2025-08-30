import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Building2, 
  Calendar, 
  DollarSign, 
  Star, 
  Users, 
  TrendingUp,
  Edit,
  Eye
} from 'lucide-react';
import SEOManager from '../components/SEO/SEOManager';
import { useApp } from '../context/AppContext';
import { supabaseHelpers } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import OwnerPropertiesList from '../components/Dashboard/OwnerPropertiesList';

const OwnerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, language } = useApp();
  const [properties, setProperties] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalRevenue: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Récupérer les propriétés du propriétaire
        const ownerProperties = await supabaseHelpers.getPropertiesByOwner(user.id);
        setProperties(ownerProperties || []);

        // Récupérer les réservations pour les propriétés du propriétaire
        const ownerBookings = await supabaseHelpers.getBookingsByOwner(user.id);
        setBookings(ownerBookings || []);

        // Calculer les statistiques
        const totalRevenue = ownerBookings?.reduce((sum: number, booking: any) => 
          sum + (booking.total_price || 0), 0) || 0;
        
        const averageRating = ownerProperties?.reduce((sum: number, property: any) => 
          sum + (property.rating || 0), 0) / (ownerProperties?.length || 1) || 0;

        setStats({
          totalProperties: ownerProperties?.length || 0,
          totalBookings: ownerBookings?.length || 0,
          totalRevenue,
          averageRating: Math.round(averageRating * 10) / 10
        });

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  const handleAddProperty = () => {
    navigate('/proprietaire/ajouter-propriete');
  };

  const handleViewProperty = (propertyId: string) => {
    navigate(`/appartements/${propertyId}`);
  };

  const handleEditProperty = (propertyId: string) => {
    navigate(`/proprietaire/modifier-propriete/${propertyId}`);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmDelete = window.confirm(
      language === 'ar' 
        ? 'هل أنت متأكد من حذف هذا العقار؟'
        : 'Êtes-vous sûr de vouloir supprimer cette propriété ?'
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId)
        .eq('owner_id', user?.id);

      if (error) {
        throw error;
      }

      // Recharger les propriétés
      const updatedProperties = properties.filter(p => p.id !== propertyId);
      setProperties(updatedProperties);

      alert(language === 'ar' 
        ? 'تم حذف العقار بنجاح!'
        : 'Propriété supprimée avec succès !'
      );
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء حذف العقار'
        : 'Une erreur est survenue lors de la suppression'
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const seoData = {
    title: language === 'ar' ? 'لوحة تحكم المالك | Babna.ma' : 'Tableau de bord propriétaire | Babna.ma',
    description: language === 'ar' ? 'إدارة خصائصك وحجوزاتك' : 'Gérez vos propriétés et réservations',
    keywords: 'dashboard propriétaire, gestion propriétés, réservations',
    canonical: '/proprietaire/dashboard'
  };

  return (
    <>
      <SEOManager
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={seoData.canonical}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'مرحباً' : 'Bonjour'} {user?.name}!
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الخصائص' : 'Propriétés'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProperties}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الحجوزات' : 'Réservations'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'الإيرادات' : 'Revenus'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue} MAD</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'التقييم المتوسط' : 'Note moyenne'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {language === 'ar' ? 'إجراءات سريعة' : 'Actions rapides'}
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleAddProperty}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'إضافة خاصية' : 'Ajouter une propriété'}
            </button>
            <button
              onClick={() => navigate('/proprietaire/reservations')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'عرض الحجوزات' : 'Voir les réservations'}
            </button>
          </div>
        </div>

        {/* Propriétés */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'خصائصك' : 'Vos propriétés'}
            </h2>
            <button
              onClick={handleAddProperty}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'إضافة عقار' : 'Ajouter une propriété'}
            </button>
          </div>

          <OwnerPropertiesList
            properties={properties}
            onEditProperty={handleEditProperty}
            onDeleteProperty={handleDeleteProperty}
          />
        </div>

        {/* Réservations récentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'الحجوزات الأخيرة' : 'Réservations récentes'}
            </h2>
            <button
              onClick={() => navigate('/proprietaire/reservations')}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              {language === 'ar' ? 'عرض الكل' : 'Voir tout'}
            </button>
          </div>

          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {language === 'ar' ? 'لا توجد حجوزات بعد' : 'Aucune réservation pour le moment'}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الخاصية' : 'Propriété'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'العميل' : 'Client'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'التواريخ' : 'Dates'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'المبلغ' : 'Montant'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الحالة' : 'Statut'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.slice(0, 5).map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.properties?.title || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.users?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {booking.total_price} MAD
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OwnerDashboardPage;

