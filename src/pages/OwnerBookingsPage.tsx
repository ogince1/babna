import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, DollarSign, CheckCircle, XCircle, Clock, MapPin, MessageSquare } from 'lucide-react';
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
  };
  users: {
    id: string;
    name: string;
    email: string;
  };
}

const OwnerBookingsPage: React.FC = () => {
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
              images
            ),
            users (
              id,
              name,
              email
            )
          `)
          .eq('properties.owner_id', user.id)
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

  const handleBookingAction = async (bookingId: string, action: 'confirm' | 'reject') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: action === 'confirm' ? 'confirmed' : 'rejected',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (error) {
        throw error;
      }

      // Mettre à jour la liste locale
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action === 'confirm' ? 'confirmed' : 'rejected' }
          : booking
      ));

      alert(language === 'ar' 
        ? `تم ${action === 'confirm' ? 'تأكيد' : 'رفض'} الحجز بنجاح!`
        : `Réservation ${action === 'confirm' ? 'confirmée' : 'rejetée'} avec succès !`
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert(language === 'ar' 
        ? 'حدث خطأ أثناء تحديث الحجز'
        : 'Une erreur est survenue lors de la mise à jour'
      );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            {language === 'ar' ? 'في انتظار' : 'En attente'}
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
    title: language === 'ar' ? 'إدارة الحجوزات | Babna.ma' : 'Gestion des réservations | Babna.ma',
    description: language === 'ar' ? 'إدارة طلبات الحجز للعقارات الخاصة بك' : 'Gérez les demandes de réservation pour vos propriétés',
    keywords: 'gestion réservations, propriétaire, demandes de réservation'
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
            {language === 'ar' ? 'إدارة الحجوزات' : 'Gestion des réservations'}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' ? 'عرض وإدارة طلبات الحجز للعقارات الخاصة بك' : 'Consultez et gérez les demandes de réservation pour vos propriétés'}
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
        <div className="bg-white rounded-lg shadow">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {language === 'ar' ? 'لا توجد حجوزات' : 'Aucune réservation'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' 
                  ? 'لا توجد حجوزات تطابق المعايير المحددة'
                  : 'Aucune réservation ne correspond aux critères sélectionnés'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'العقار' : 'Propriété'}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {booking.properties.images && booking.properties.images.length > 0 && (
                            <img
                              src={booking.properties.images[0]}
                              alt={booking.properties.title}
                              className="h-10 w-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.properties.title}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {booking.properties.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.users.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.users.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{new Date(booking.check_in).toLocaleDateString()}</div>
                          <div className="text-gray-500">→</div>
                          <div>{new Date(booking.check_out).toLocaleDateString()}</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {booking.guests} {language === 'ar' ? 'شخص' : booking.guests === 1 ? 'personne' : 'personnes'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                          {booking.total_price} MAD
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(booking.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {booking.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleBookingAction(booking.id, 'confirm')}
                              className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-lg transition-colors"
                            >
                              {language === 'ar' ? 'قبول' : 'Accepter'}
                            </button>
                            <button
                              onClick={() => handleBookingAction(booking.id, 'reject')}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors"
                            >
                              {language === 'ar' ? 'رفض' : 'Refuser'}
                            </button>
                          </div>
                        )}
                        {booking.message && (
                          <button
                            className="text-blue-600 hover:text-blue-900 mt-2"
                            title={booking.message}
                          >
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        )}
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

export default OwnerBookingsPage;
