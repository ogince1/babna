import React, { useState } from 'react';
import { Star, MapPin, Bed, Bath, Users, ArrowLeft, Calendar, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { t } from '../../utils/i18n';
import { Property } from '../../types';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
  onBookingComplete: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack, onBookingComplete }) => {
  const { language } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    paymentMethod: 'card'
  });

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return nights * property.price;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking process
    setTimeout(() => {
      onBookingComplete();
    }, 1000);
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <div className="flex items-center space-x-4 text-gray-600 mt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span>{property.rating} ({property.reviews} avis)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Images and Details */}
        <div className="lg:col-span-2">
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative mb-4">
              <img
                src={property.images[selectedImageIndex]}
                alt={property.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer transition-opacity ${
                    selectedImageIndex === index ? 'ring-2 ring-orange-500' : 'opacity-70 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Property Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Détails du logement</h2>
              <div className="text-2xl font-bold text-orange-600">
                {property.price} MAD/{t('perNight', language)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bed className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-gray-600">{t('bedrooms', language)}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Bath className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-gray-600">{t('bathrooms', language)}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="font-semibold">{property.maxGuests}</div>
                <div className="text-sm text-gray-600">{t('maxGuests', language)}</div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">{t('amenities', language)}</h3>
              <div className="grid grid-cols-2 gap-2">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{t('location', language)}</h3>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-600">Carte interactive - {property.location.address}</p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {property.price} MAD
                  <span className="text-lg font-normal text-gray-600">/{t('perNight', language)}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500 ml-1">({property.reviews} avis)</span>
                </div>
              </div>

              {!showBookingForm ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  {t('bookNow', language)}
                </button>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkIn', language)}
                    </label>
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('checkOut', language)}
                    </label>
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('guests', language)}
                    </label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {[...Array(property.maxGuests)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} personne{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('paymentMethod', language)}
                    </label>
                    <select
                      value={bookingData.paymentMethod}
                      onChange={(e) => setBookingData({ ...bookingData, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="card">Carte bancaire</option>
                      <option value="paypal">PayPal</option>
                      <option value="cmi">CMI (Maroc)</option>
                    </select>
                  </div>

                  {calculateNights() > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span>Prix par nuit</span>
                        <span>{property.price} MAD</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Nombre de nuits</span>
                        <span>{calculateNights()}</span>
                      </div>
                      <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
                        <span>{t('totalPrice', language)}</span>
                        <span>{calculateTotal()} MAD</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Confirmer la réservation
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t('cancel', language)}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;