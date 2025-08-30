import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, CheckCircle, XCircle, Clock, User, MessageSquare } from 'lucide-react';
import { useApp } from '../context/AppContext';
import SEOManager from '../components/SEO/SEOManager';
import Breadcrumbs from '../components/SEO/Breadcrumbs';
import { supabase } from '../lib/supabase';

interface Booking {
  id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_price: number;
  message: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  created_at: string;
  properties: {
    id: string;
    title: string;
    city: string;
    address: string;
    images: string[];
    owner_id: string;
  };
}

const TravelerBookingsPage: React.FC = () => {
  const { user, language } = useApp();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            properties (
              id,
              title,
              city,
              address,
              images,
              owner_id
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setBookings(data || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId: string) => {
    const confirmCancel = window.confirm(
      language === 'ar' 
        ? 'هل أنت متأكد من إلغاء هذا الحجز؟'
        : 'Êtes-vous sûr de vouloir annuler cette réservation ?'
    );

    if (!confirmCancel) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      // Mettre à jour la liste locale
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' }
          : booking
      ));

      alert(language === 'ar' 
        ? 'تم إلغاء الحجز بنجاح!'
        : 'Réservation annulée avec succès !'
      );
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء إلغاء الحجز'
        : 'Une erreur est survenue lors de l\'annulation'
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'في انتظار الموافقة' : 'En attente'}
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'مؤكد' : 'Confirmé'}
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'مرفوض' : 'Rejeté'}
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <XCircle className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'ملغي' : 'Annulé'}
          </span>
        );
      default:
        return null;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    rejected: bookings.filter(b => b.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {language === 'ar' ? 'جاري تحميل الحجوزات...' : 'Chargement des réservations...'}
          </p>
        </div>
      </div>
    );
  }

  const seoData = {
    title: language === 'ar' ? 'حجوزاتي | Babna.ma' : 'Mes réservations | Babna.ma',
    description: language === 'ar' ? 'عرض وإدارة حجوزاتك' : 'Consultez et gérez vos réservations',
    keywords: 'mes réservations, voyageur, demandes de réservation'
  };

  return (
    <>
      <SEOManager
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'ar' ? 'حجوزاتي' : 'Mes réservations'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'عرض وإدارة جميع حجوزاتك' : 'Consultez et gérez toutes vos réservations'}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'إجمالي الحجوزات' : 'Total'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'في الانتظار' : 'En attente'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'مؤكد' : 'Confirmées'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'ar' ? 'مرفوض' : 'Rejetées'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'Toutes'} ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? 'في الانتظار' : 'En attente'} ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('confirmed')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'confirmed' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? 'مؤكد' : 'Confirmées'} ({stats.confirmed})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'rejected' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {language === 'ar' ? 'مرفوض' : 'Rejetées'} ({stats.rejected})
            </button>
          </div>
        </div>

        {/* Liste des réservations */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد حجوزات' : 'Aucune réservation'}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'ar' 
                  ? 'لا توجد حجوزات تطابق المعايير المحددة'
                  : 'Aucune réservation ne correspond aux critères sélectionnés'
                }
              </p>
              <button
                onClick={() => navigate('/appartements')}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
              >
                {language === 'ar' ? 'تصفح العقارات' : 'Parcourir les propriétés'}
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      {booking.properties.images && booking.properties.images.length > 0 && (
                        <img
                          src={booking.properties.images[0]}
                          alt={booking.properties.title}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.properties.title}
                          </h3>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{booking.properties.city}, {booking.properties.address}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                            <span>
                              {new Date(booking.check_in).toLocaleDateString()} - {new Date(booking.check_out).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <User className="h-4 w-4 text-gray-400 mr-2" />
                            <span>
                              {booking.guests} {language === 'ar' ? 'شخص' : booking.guests === 1 ? 'personne' : 'personnes'}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                            <span className="font-medium">{booking.total_price} MAD</span>
                          </div>
                        </div>
                        
                        {booking.message && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-1">
                              <MessageSquare className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-700">
                                {language === 'ar' ? 'رسالتك للمالك' : 'Votre message au propriétaire'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{booking.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
                    <button
                      onClick={() => navigate(`/appartements/${booking.properties.id}`)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {language === 'ar' ? 'عرض العقار' : 'Voir la propriété'}
                    </button>
                    
                    {(booking.status === 'pending' || booking.status === 'confirmed') && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        {language === 'ar' ? 'إلغاء الحجز' : 'Annuler'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TravelerBookingsPage;
