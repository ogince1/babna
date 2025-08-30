import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Eye, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import PropertyTags from '../Properties/PropertyTags';

interface OwnerPropertiesListProps {
  properties: any[];
  onEditProperty: (propertyId: string) => void;
  onDeleteProperty: (propertyId: string) => void;
}

const OwnerPropertiesList: React.FC<OwnerPropertiesListProps> = ({
  properties,
  onEditProperty,
  onDeleteProperty
}) => {
  const { language } = useApp();

  const getStatusBadge = (property: any) => {
    if (!property.is_approved) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          {language === 'ar' ? 'في انتظار الموافقة' : 'En attente'}
        </span>
      );
    }
    
    if (property.is_available) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="h-3 w-3 mr-1" />
          {language === 'ar' ? 'متاح' : 'Disponible'}
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <XCircle className="h-3 w-3 mr-1" />
        {language === 'ar' ? 'غير متاح' : 'Indisponible'}
      </span>
    );
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment':
        return '🏢';
      case 'villa':
        return '🏡';
      case 'riad':
        return '🏰';
      case 'studio':
        return '🏠';
      default:
        return '🏠';
    }
  };

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🏠</div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          {language === 'ar' ? 'لا توجد عقارات' : 'Aucune propriété'}
        </h3>
        <p className="text-gray-600 mb-6">
          {language === 'ar' 
            ? 'ابدأ بإضافة عقارك الأول'
            : 'Commencez par ajouter votre première propriété'
          }
        </p>
        <Link
          to="/proprietaire/ajouter-propriete"
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          {language === 'ar' ? 'إضافة عقار' : 'Ajouter une propriété'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{getPropertyTypeIcon(property.property_type)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {property.city} • {property.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-3">
                <span className="text-lg font-bold text-orange-600">
                  {property.price} MAD
                </span>
                <span className="text-sm text-gray-500">
                  {language === 'ar' ? 'لليلة الواحدة' : '/nuit'}
                </span>
                {getStatusBadge(property)}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <span>🛏️ {property.bedrooms} {language === 'ar' ? 'غرف' : 'chambres'}</span>
                <span>🚿 {property.bathrooms} {language === 'ar' ? 'حمامات' : 'sdb'}</span>
                <span>👥 {property.max_guests} {language === 'ar' ? 'ضيوف' : 'voyageurs'}</span>
                {property.rating > 0 && (
                  <span>⭐ {property.rating} ({property.reviews_count} {language === 'ar' ? 'تقييم' : 'avis'})</span>
                )}
              </div>
              
              {property.tags && property.tags.length > 0 && (
                <div className="mb-3">
                  <PropertyTags tagIds={property.tags} maxDisplay={3} />
                </div>
              )}
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {property.description}
              </p>
            </div>
            
            <div className="flex flex-col gap-2 ml-4">
              <Link
                to={`/appartements/${property.id}`}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title={language === 'ar' ? 'عرض العقار' : 'Voir la propriété'}
              >
                <Eye className="h-5 w-5" />
              </Link>
              
              <button
                onClick={() => onEditProperty(property.id)}
                className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                title={language === 'ar' ? 'تعديل العقار' : 'Modifier la propriété'}
              >
                <Edit className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onDeleteProperty(property.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title={language === 'ar' ? 'حذف العقار' : 'Supprimer la propriété'}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OwnerPropertiesList;
