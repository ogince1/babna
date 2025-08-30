import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Heart, 
  Star, 
  MapPin, 
  Clock,
  Eye,
  MessageSquare
} from 'lucide-react';
import SEOManager from '../components/SEO/SEOManager';
import { useApp } from '../context/AppContext';
import { supabaseHelpers } from '../lib/supabase';

const ClientDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, language } = useApp();
  const [bookings, setBookings] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalFavorites: 0,
    totalSpent: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        // Récupérer les réservations du client
        const userBookings = await supabaseHelpers.getBookingsByUser(user.id);
        setBookings(userBookings || []);

        // Récupérer les favoris du client
        const userFavorites = await supabaseHelpers.getFavoritesByUser(user.id);
        setFavorites(userFavorites || []);

        // Calculer les statistiques
        const totalSpent = userBookings?.reduce((sum: number, booking: any) => 
          sum + (booking.total_price || 0), 0) || 0;
        
        const averageRating = userBookings?.reduce((sum: number, booking: any) => 
          sum + (booking.properties?.rating || 0), 0) / (userBookings?.length || 1) || 0;

        setStats({
          totalBookings: userBookings?.length || 0,
          totalFavorites: userFavorites?.length || 0,
          totalSpent,
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

  const handleViewProperty = (propertyId: string) => {
    navigate(`/appartements/${propertyId}`);
  };

  const handleViewBooking = (bookingId: string) => {
    navigate(`/mes-reservations/${bookingId}`);
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
    title: language === 'ar' ? 'لوحة تحكم العميل | Babna.ma' : 'Tableau de bord client | Babna.ma',
    description: language === 'ar' ? 'إدارة حجوزاتك ومفضلاتك' : 'Gérez vos réservations et favoris',
    keywords: 'dashboard client, réservations, favoris',
    canonical: '/client/dashboard'
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
                <Calendar className="h-6 w-6 text-blue-600" />
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
              <div className="p-2 bg-red-100 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'المفضلة' : 'Favoris'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFavorites}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'إجمالي الإنفاق' : 'Total dépensé'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSpent} MAD</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'متوسط التقييم' : 'Note moyenne'}
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
              onClick={() => navigate('/appartements')}
              className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <MapPin className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'البحث عن خصائص' : 'Rechercher des propriétés'}
            </button>
            <button
              onClick={() => navigate('/mes-reservations')}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Calendar className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'عرض الحجوزات' : 'Voir mes réservations'}
            </button>
            <button
              onClick={() => navigate('/favoris')}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Heart className="h-5 w-5 mr-2" />
              {language === 'ar' ? 'عرض المفضلة' : 'Voir mes favoris'}
            </button>
          </div>
        </div>

        {/* Réservations récentes */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'حجوزاتك الأخيرة' : 'Vos réservations récentes'}
            </h2>
            <button
              onClick={() => navigate('/mes-reservations')}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{booking.properties?.title}</h3>
                    <button
                      onClick={() => handleViewBooking(booking.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title={language === 'ar' ? 'عرض التفاصيل' : 'Voir les détails'}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{booking.properties?.city}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{booking.total_price} MAD</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{booking.properties?.rating || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favoris récents */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {language === 'ar' ? 'مفضلاتك الأخيرة' : 'Vos favoris récents'}
            </h2>
            <button
              onClick={() => navigate('/favoris')}
              className="text-orange-500 hover:text-orange-600 font-medium"
            >
              {language === 'ar' ? 'عرض الكل' : 'Voir tout'}
            </button>
          </div>

          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              {language === 'ar' ? 'لا توجد مفضلات بعد' : 'Aucun favori pour le moment'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.slice(0, 3).map((favorite) => (
                <div key={favorite.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{favorite.properties?.title}</h3>
                    <button
                      onClick={() => handleViewProperty(favorite.properties?.id)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      title={language === 'ar' ? 'عرض الخاصية' : 'Voir la propriété'}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{favorite.properties?.city}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{favorite.properties?.price} MAD</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm">{favorite.properties?.rating || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClientDashboardPage;

