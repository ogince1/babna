import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../../types';
import { moroccanCities } from '../../data/cities';
import { useApp } from '../../context/AppContext';

// Fix pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
  height?: string;
}

// Composant pour centrer la carte sur une propriété sélectionnée
const MapUpdater: React.FC<{ selectedProperty: Property | null }> = ({ selectedProperty }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedProperty && selectedProperty.lat && selectedProperty.lng) {
      map.setView(
        [selectedProperty.lat, selectedProperty.lng],
        15
      );
    }
  }, [selectedProperty, map]);
  
  return null;
};

const PropertyMap: React.FC<PropertyMapProps> = ({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  height = "500px" 
}) => {
  const { language } = useApp();
  const [mapKey, setMapKey] = useState(0);

  // Calculer le centre de la carte (centre du Maroc)
  const centerLat = 31.7917;
  const centerLng = -7.0926;

  // Créer des icônes personnalisées pour différents types de propriétés
  const createPropertyIcon = (propertyType: string | undefined) => {
    const colors = {
      apartment: '#3B82F6', // bleu
      villa: '#10B981',     // vert
      riad: '#F59E0B',      // orange
      studio: '#8B5CF6'     // violet
    };

    // Valeur par défaut si propertyType est undefined
    const type = propertyType || 'apartment';
    const firstLetter = type.charAt(0).toUpperCase();

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background-color: ${colors[type as keyof typeof colors] || '#6B7280'};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: bold;
        ">
          ${firstLetter}
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  // Grouper les propriétés par ville pour éviter les marqueurs superposés
  const groupedProperties = properties.reduce((acc, property) => {
    const city = property.city;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(property);
    return acc;
  }, {} as Record<string, Property[]>);

  return (
    <div className="w-full" style={{ height }}>
      <MapContainer
        key={mapKey}
        center={[centerLat, centerLng]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marqueurs pour les villes avec propriétés */}
        {Object.entries(groupedProperties).map(([city, cityProperties]) => {
          const firstProperty = cityProperties[0];
          const cityData = moroccanCities.find(c => c.name === city);
          
          if (!cityData || !firstProperty) return null;

          return (
            <Marker
              key={city}
              position={[cityData.lat, cityData.lng]}
              icon={createPropertyIcon(firstProperty.propertyType)}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-lg mb-2">
                    {language === 'ar' ? cityData.nameAr : cityData.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {language === 'ar' ? cityData.descriptionAr : cityData.description}
                  </p>
                  <div className="text-sm">
                    <p className="font-medium">
                      {cityProperties.length} {language === 'ar' ? 'عقار متاح' : 'propriété(s) disponible(s)'}
                    </p>
                    <div className="mt-2 space-y-1">
                      {cityProperties.slice(0, 3).map((property) => (
                        <div
                          key={property.id}
                          className="cursor-pointer hover:bg-gray-100 p-1 rounded text-xs"
                          onClick={() => onPropertySelect?.(property)}
                        >
                          <div className="font-medium">{property.title}</div>
                          <div className="text-gray-600">{property.price} MAD</div>
                        </div>
                      ))}
                      {cityProperties.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{cityProperties.length - 3} {language === 'ar' ? 'عقار آخر' : 'autres propriétés'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Marqueur pour la propriété sélectionnée */}
        {selectedProperty && selectedProperty.lat && selectedProperty.lng && (
          <Marker
            position={[selectedProperty.lat, selectedProperty.lng]}
            icon={L.divIcon({
              className: 'selected-property-marker',
              html: `
                <div style="
                  background-color: #EF4444;
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 4px 8px rgba(0,0,0,0.4);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-size: 12px;
                  font-weight: bold;
                  animation: pulse 2s infinite;
                ">
                  ★
                </div>
                <style>
                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                  }
                </style>
              `,
              iconSize: [25, 25],
              iconAnchor: [12, 12]
            })}
          >
            <Popup>
              <div className="p-3">
                <h3 className="font-semibold text-lg mb-2">{selectedProperty.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{selectedProperty.address}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">
                    {selectedProperty.price} MAD
                  </span>
                  <span className="text-sm text-gray-500">
                    {language === 'ar' ? 'ليلة' : 'par nuit'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <span>🛏️ {selectedProperty.bedrooms}</span>
                    <span>🚿 {selectedProperty.bathrooms}</span>
                    <span>👥 {selectedProperty.maxGuests}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        <MapUpdater selectedProperty={selectedProperty} />
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
