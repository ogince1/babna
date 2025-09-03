import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NDcyNTEsImV4cCI6MjA3MjEyMzI1MX0.BDrcaVdkwP54BRzCysxEfxqh29XNyF2Xlmsd8NWqyq8';

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
      console.log('🔄 Récupération des propriétés depuis Supabase Cloud...');
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur Supabase:', error);
        // Fallback: essayer sans les filtres
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (fallbackError) {
          throw fallbackError;
        }
        
        console.log('✅ Propriétés récupérées (fallback):', fallbackData?.length || 0, 'propriétés');
        return fallbackData || [];
      }
      
      console.log('✅ Propriétés récupérées:', data?.length || 0, 'propriétés');
      return data || [];
    } catch (error) {
      console.error('❌ Erreur récupération propriétés:', error);
      return [];
    }
  },

  async getPropertyById(id: string) {
    try {
      console.log('🔄 Récupération de la propriété:', id);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      console.log('✅ Propriété récupérée:', data?.title);
      return data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération de la propriété:', error);
      throw error;
    }
  },

  async getPropertiesByCity(city: string) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('city', city)
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur getPropertiesByCity:', error);
        // Fallback: essayer sans les filtres
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('properties')
          .select('*')
          .eq('city', city)
          .order('created_at', { ascending: false });
        
        if (fallbackError) throw fallbackError;
        return fallbackData || [];
      }
      
      return data || [];
    } catch (error) {
      console.error('❌ Erreur getPropertiesByCity:', error);
      return [];
    }
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
        .select('id, name, email, role, phone, avatar_url, whatsapp, created_at, updated_at')
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
    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData)
        .select('id, name, email, role, phone, avatar_url, whatsapp, created_at, updated_at')
        .single();
      
      if (error) throw error;
      return data;
    } catch (error: any) {
      console.error('❌ Erreur lors de la création de l\'utilisateur:', error);
      
      // Fallback: essayer sans la colonne whatsapp
      if (error?.message && error.message.includes('whatsapp')) {
        console.log('🔄 Tentative de création sans la colonne whatsapp...');
        const { whatsapp, ...userDataWithoutWhatsapp } = userData;
        
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('users')
          .insert(userDataWithoutWhatsapp)
          .select('id, name, email, role, phone, avatar_url, created_at, updated_at')
          .single();
        
        if (fallbackError) throw fallbackError;
        return fallbackData;
      }
      
      throw error;
    }
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
