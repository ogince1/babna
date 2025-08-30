export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: 'apartment' | 'villa' | 'riad' | 'studio';
  ownerId: string;
  isAvailable: boolean;
  isApproved: boolean;
  rating: number;
  reviews: number;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  whatsapp?: string;
  role: 'client' | 'owner' | 'admin';
  createdAt: string;
  avatar?: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: string;
}

export interface SearchFilters {
  city: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  amenities?: string[];
}

export interface Language {
  code: 'fr' | 'ar' | 'en' | 'es';
  name: string;
  flag: string;
}