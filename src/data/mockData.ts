
import { Property, User, Booking } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Appartement moderne près de la Médina',
    description: 'Magnifique appartement de 2 chambres situé à proximité de la médina de Marrakech. Parfait pour découvrir la ville impériale.',
    price: 450,
    location: {
      city: 'Marrakech',
      address: 'Quartier Hivernage, Marrakech',
      lat: 31.6295,
      lng: -8.0080
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Cuisine équipée', 'Terrasse', 'Parking'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    propertyType: 'apartment',
    ownerId: 'owner1',
    isAvailable: true,
    isApproved: true,
    rating: 4.8,
    reviews: 23,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Villa avec piscine - Vue sur l\'Atlas',
    description: 'Villa luxueuse avec piscine privée et vue panoramique sur les montagnes de l\'Atlas. Idéale pour des vacances en famille.',
    price: 850,
    location: {
      city: 'Marrakech',
      address: 'Route de l\'Ourika, Marrakech',
      lat: 31.6450,
      lng: -7.9900
    },
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Barbecue', 'Parking'],
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    propertyType: 'villa',
    ownerId: 'owner2',
    isAvailable: true,
    isApproved: true,
    rating: 4.9,
    reviews: 18,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: 'Riad authentique - Médina de Fès',
    description: 'Riad traditionnel rénové dans la médina de Fès. Architecture authentique avec tout le confort moderne.',
    price: 600,
    location: {
      city: 'Fès',
      address: 'Médina de Fès, Fès',
      lat: 34.0333,
      lng: -5.0000
    },
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438833/pexels-photo-1438833.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Patio', 'Cuisine traditionnelle', 'Hammam', 'Terrasse'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: 'riad',
    ownerId: 'owner3',
    isAvailable: true,
    isApproved: true,
    rating: 4.7,
    reviews: 31,
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    title: 'Studio moderne - Centre de Casablanca',
    description: 'Studio élégant dans le centre de Casablanca, parfait pour les voyages d\'affaires ou courts séjours.',
    price: 320,
    location: {
      city: 'Casablanca',
      address: 'Quartier des Habous, Casablanca',
      lat: 33.5731,
      lng: -7.5898
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Kitchenette', 'Salle de sport'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: 'studio',
    ownerId: 'owner1',
    isAvailable: true,
    isApproved: true,
    rating: 4.5,
    reviews: 12,
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    title: 'Appartement moderne - Centre de Rabat',
    description: 'Appartement élégant dans le centre-ville de Rabat, proche des institutions gouvernementales et de la médina.',
    price: 380,
    location: {
      city: 'Rabat',
      address: 'Avenue Mohammed V, Rabat',
      lat: 34.0209,
      lng: -6.8416
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Parking'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    propertyType: 'apartment',
    ownerId: 'owner1',
    isAvailable: true,
    isApproved: true,
    rating: 4.6,
    reviews: 19,
    createdAt: '2024-01-28'
  },
  {
    id: '6',
    title: 'Villa de luxe - Plage d\'Agadir',
    description: 'Villa moderne avec vue sur l\'océan Atlantique, située sur la corniche d\'Agadir.',
    price: 1200,
    location: {
      city: 'Agadir',
      address: 'Corniche d\'Agadir, Agadir',
      lat: 30.4278,
      lng: -9.5981
    },
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Terrasse', 'Parking privé'],
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    propertyType: 'villa',
    ownerId: 'owner2',
    isAvailable: true,
    isApproved: true,
    rating: 4.9,
    reviews: 28,
    createdAt: '2024-02-01'
  },
  {
    id: '7',
    title: 'Riad traditionnel - Médina de Tanger',
    description: 'Riad authentique dans la médina de Tanger, avec vue sur le détroit de Gibraltar.',
    price: 550,
    location: {
      city: 'Tanger',
      address: 'Médina de Tanger, Tanger',
      lat: 35.7595,
      lng: -5.8340
    },
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438833/pexels-photo-1438833.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Patio', 'Cuisine traditionnelle', 'Terrasse', 'Vue mer'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: 'riad',
    ownerId: 'owner3',
    isAvailable: true,
    isApproved: true,
    rating: 4.7,
    reviews: 22,
    createdAt: '2024-02-05'
  },
  {
    id: '8',
    title: 'Appartement moderne - Meknès',
    description: 'Appartement moderne dans la ville impériale de Meknès, proche des sites historiques.',
    price: 420,
    location: {
      city: 'Meknès',
      address: 'Place El Hedim, Meknès',
      lat: 33.8935,
      lng: -5.5473
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Parking'],
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    propertyType: 'apartment',
    ownerId: 'owner1',
    isAvailable: true,
    isApproved: true,
    rating: 4.5,
    reviews: 15,
    createdAt: '2024-02-10'
  },
  {
    id: '9',
    title: 'Studio moderne - Chefchaouen',
    description: 'Studio dans la ville bleue de Chefchaouen, parfait pour découvrir cette ville unique.',
    price: 280,
    location: {
      city: 'Chefchaouen',
      address: 'Médina de Chefchaouen, Chefchaouen',
      lat: 35.1714,
      lng: -5.2696
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Kitchenette', 'Vue montagne'],
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    propertyType: 'studio',
    ownerId: 'owner2',
    isAvailable: true,
    isApproved: true,
    rating: 4.8,
    reviews: 31,
    createdAt: '2024-02-15'
  },
  {
    id: '10',
    title: 'Villa avec piscine - Essaouira',
    description: 'Villa moderne avec piscine à Essaouira, ville côtière célèbre pour ses plages et son vent.',
    price: 750,
    location: {
      city: 'Essaouira',
      address: 'Quartier des Dunes, Essaouira',
      lat: 31.5085,
      lng: -9.7595
    },
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Terrasse', 'Parking'],
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    propertyType: 'villa',
    ownerId: 'owner3',
    isAvailable: true,
    isApproved: true,
    rating: 4.6,
    reviews: 18,
    createdAt: '2024-02-20'
  }
];

export const users: User[] = [
  {
    id: 'user1',
    email: 'ahmed@example.com',
    name: 'Ahmed Bennani',
    phone: '+212612345678',
    whatsapp: '+212612345678',
    role: 'client',
    createdAt: '2024-01-01'
  },
  {
    id: 'owner1',
    email: 'fatima@example.com',
    name: 'Fatima Alaoui',
    phone: '+212623456789',
    role: 'owner',
    createdAt: '2024-01-05'
  },
  {
    id: 'owner2',
    email: 'youssef@example.com',
    name: 'Youssef Idrissi',
    phone: '+212634567890',
    role: 'owner',
    createdAt: '2024-01-08'
  },
  {
    id: 'owner3',
    email: 'khadija@example.com',
    name: 'Khadija Benali',
    phone: '+212645678901',
    role: 'owner',
    createdAt: '2024-01-12'
  },
  {
    id: 'admin1',
    email: 'admin@babna.ma',
    name: 'Admin Platform',
    phone: '+212656789012',
    role: 'admin',
    createdAt: '2024-01-01'
  }
];

export const bookings: Booking[] = [
  {
    id: 'booking1',
    propertyId: '1',
    userId: 'user1',
    checkIn: '2024-02-15',
    checkOut: '2024-02-18',
    guests: 2,
    totalPrice: 1350,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-02-01'
  },
  {
    id: 'booking2',
    propertyId: '2',
    userId: 'user1',
    checkIn: '2024-03-10',
    checkOut: '2024-03-15',
    guests: 6,
    totalPrice: 4250,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-02-20'
  }
];

export const cities = [
  'Marrakech',
  'Casablanca',
  'Fès',
  'Rabat',
  'Agadir',
  'Tanger',
  'Meknès',
  'Ouarzazate',
  'Essaouira',
  'Chefchaouen'
];