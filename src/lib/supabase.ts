import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// Types for database tables
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          phone: string | null;
          whatsapp: string | null;
          role: 'client' | 'owner' | 'admin';
          avatar: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          phone?: string | null;
          whatsapp?: string | null;
          role?: 'client' | 'owner' | 'admin';
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          phone?: string | null;
          whatsapp?: string | null;
          role?: 'client' | 'owner' | 'admin';
          avatar?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      properties: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          price: number;
          city: string;
          address: string;
          lat: number | null;
          lng: number | null;
          images: string[];
          amenities: string[];
          bedrooms: number;
          bathrooms: number;
          max_guests: number;
          property_type: 'apartment' | 'villa' | 'riad' | 'studio';
          owner_id: string;
          is_available: boolean;
          is_approved: boolean;
          rating: number;
          reviews_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          price: number;
          city: string;
          address: string;
          lat?: number | null;
          lng?: number | null;
          images?: string[];
          amenities?: string[];
          bedrooms?: number;
          bathrooms?: number;
          max_guests?: number;
          property_type?: 'apartment' | 'villa' | 'riad' | 'studio';
          owner_id: string;
          is_available?: boolean;
          is_approved?: boolean;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          price?: number;
          city?: string;
          address?: string;
          lat?: number | null;
          lng?: number | null;
          images?: string[];
          amenities?: string[];
          bedrooms?: number;
          bathrooms?: number;
          max_guests?: number;
          property_type?: 'apartment' | 'villa' | 'riad' | 'studio';
          owner_id?: string;
          is_available?: boolean;
          is_approved?: boolean;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      bookings: {
        Row: {
          id: string;
          property_id: string;
          user_id: string;
          check_in: string;
          check_out: string;
          guests: number;
          total_price: number;
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          payment_status: 'pending' | 'paid' | 'refunded';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          user_id: string;
          check_in: string;
          check_out: string;
          guests?: number;
          total_price: number;
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          payment_status?: 'pending' | 'paid' | 'refunded';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          user_id?: string;
          check_in?: string;
          check_out?: string;
          guests?: number;
          total_price?: number;
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
          payment_status?: 'pending' | 'paid' | 'refunded';
          created_at?: string;
          updated_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          property_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          property_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          property_id?: string;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          property_id: string;
          user_id: string;
          booking_id: string;
          rating: number;
          comment: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id: string;
          user_id: string;
          booking_id: string;
          rating: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string;
          user_id?: string;
          booking_id?: string;
          rating?: number;
          comment?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: 'client' | 'owner' | 'admin';
      property_type: 'apartment' | 'villa' | 'riad' | 'studio';
      booking_status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
      payment_status: 'pending' | 'paid' | 'refunded';
    };
  };
}

// Helper functions for common operations
export const supabaseHelpers = {
  // Properties
  async getProperties() {
    try {
      console.log('🔄 Utilisation directe de fetch...');
      const response = await fetch('http://127.0.0.1:54321/rest/v1/properties?select=*&is_available=eq.true&is_approved=eq.true', {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Fetch direct réussi:', data.length, 'propriétés');
      return data;
    } catch (error) {
      console.error('❌ Erreur fetch direct:', error);
      console.log('🔄 Utilisation des données de test...');
      // Dernier recours: données de test
      return [
        {
          id: '1',
          title: 'Appartement moderne près de la Médina',
          description: 'Magnifique appartement de 2 chambres situé à proximité de la médina de Marrakech.',
          price: 450,
          city: 'Marrakech',
          address: 'Quartier Hivernage, Marrakech',
          lat: 31.6295,
          lng: -8.0080,
          images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'],
          amenities: ['WiFi', 'Climatisation', 'Cuisine équipée'],
          bedrooms: 2,
          bathrooms: 1,
          max_guests: 4,
          property_type: 'apartment',
          owner_id: 'test-owner',
          is_available: true,
          is_approved: true,
          rating: 4.8,
          reviews_count: 23,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
  },

  async getPropertyById(id: string) {
    try {
      console.log('🔄 Récupération de la propriété:', id);
      const response = await fetch(`http://127.0.0.1:54321/rest/v1/properties?id=eq.${id}&select=*`, {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Propriété récupérée:', data[0]?.title);
      return data[0]; // Retourner le premier élément car c'est un tableau
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de la propriété:', error);
      throw error;
    }
  },

  async getPropertiesByCity(city: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('city', city)
      .eq('is_available', true)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getPropertiesByOwner(ownerId: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getBookingsByOwner(ownerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties (
          id,
          title,
          images,
          city
        ),
        users (
          id,
          name,
          email
        )
      `)
      .eq('properties.owner_id', ownerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Users
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.log('❌ Erreur lors de la récupération du profil:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.log('❌ Profil utilisateur non trouvé dans la base de données');
      throw error;
    }
  },

  async createUser(userData: Database['public']['Tables']['users']['Insert']) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Bookings
  async getBookingsByUser(userId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        properties (
          id,
          title,
          images,
          city
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createBooking(bookingData: Database['public']['Tables']['bookings']['Insert']) {
    const { data, error } = await supabase
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Favorites
  async getFavoritesByUser(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        properties (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async addToFavorites(userId: string, propertyId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .insert({ user_id: userId, property_id: propertyId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeFromFavorites(userId: string, propertyId: string) {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId);
    
    if (error) throw error;
  },

  // Reviews
  async getReviewsByProperty(propertyId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        users (
          id,
          name,
          avatar
        )
      `)
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createReview(reviewData: Database['public']['Tables']['reviews']['Insert']) {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
