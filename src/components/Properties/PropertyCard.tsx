import React from 'react';
import { Star, MapPin, Bed, Bath, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface PropertyCardProps {
  property: any;
  onSelect: (property: any) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const { language } = useApp();
  const navigate = useNavigate();

  const handleCardClick = () => {
    onSelect(property);
  };

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher le déclenchement du onClick de la carte
    navigate(`/appartements/${property.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative">
        <img
          src={property.images?.[0] || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={property.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
        </button>
        <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-lg font-bold text-gray-900 shadow-md">
          {property.price} MAD
          <span className="text-sm font-normal text-gray-600">/{language === 'ar' ? 'ليلة' : 'nuit'}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{property.rating || 4.5}</span>
            <span className="text-sm text-gray-500">({property.reviews_count || 0})</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {property.city}
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {property.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {property.max_guests}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities?.slice(0, 3).map((amenity: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {property.amenities && property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{property.amenities.length - 3}
            </span>
          )}
        </div>

        <button 
          onClick={handleBookNowClick}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {language === 'ar' ? 'احجز الآن' : 'Réserver maintenant'}
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;