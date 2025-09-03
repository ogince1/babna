import { supabase } from '../lib/supabase';

// Types pour les données admin
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'owner' | 'client';
  phone?: string;
  whatsapp?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
  is_active: boolean;
}

export interface AdminProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: { city: string; address: string };
  bedrooms: number;
  bathrooms: number;
  max_guests: number;
  images: string[];
  is_approved: boolean;
  is_available: boolean;
  owner_id: string;
  owner_name?: string;
  owner_email?: string;
  created_at: string;
  updated_at: string;
  rating?: number;
  reviews_count?: number;
  amenities: string[];
  property_type: string;
}

export interface AdminBooking {
  id: string;
  property_id: string;
  property_title?: string;
  user_id: string;
  user_name?: string;
  user_email?: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
  guest_count: number;
  special_requests?: string;
}

export interface AdminContent {
  id: string;
  title: string;
  content: string;
  type: 'blog' | 'faq' | 'testimonial' | 'travel_guide';
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  author_name?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  tags?: string[];
  image_url?: string;
  excerpt?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalProperties: number;
  totalBookings: number;
  totalRevenue: number;
  pendingProperties: number;
  activeUsers: number;
  pendingBookings: number;
  publishedContent: number;
  monthlyRevenue: number;
  occupancyRate: number;
  cityDistribution: { city: string; count: number; percentage: number }[];
  recentActivity: { type: string; description: string; timestamp: string }[];
}

// Service principal pour l'administration
export class AdminService {
  
  // ===== TEST DE CONNEXION =====
  
  /**
   * Tester la connexion à Supabase et vérifier les tables
   */
  static async testConnection(): Promise<{ success: boolean; message: string; tables: string[] }> {
    try {
      console.log('🧪 Test de connexion Supabase...');
      
      // Test 1: Vérifier la connexion
      const { data: testData, error: testError } = await supabase
        .from('properties')
        .select('id', { count: 'exact', head: true });
      
      if (testError) {
        console.error('❌ Erreur de connexion:', testError);
        return {
          success: false,
          message: `Erreur de connexion: ${testError.message}`,
          tables: []
        };
      }
      
      // Test 2: Compter les propriétés
      const { count: propertiesCount } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });
      
      // Test 3: Compter les utilisateurs
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      // Test 4: Compter les réservations
      const { count: bookingsCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });
      
      console.log('✅ Connexion réussie:', {
        properties: propertiesCount || 0,
        users: usersCount || 0,
        bookings: bookingsCount || 0
      });
      
      return {
        success: true,
        message: 'Connexion réussie',
        tables: [
          `properties: ${propertiesCount || 0}`,
          `users: ${usersCount || 0}`,
          `bookings: ${bookingsCount || 0}`
        ]
      };
    } catch (error) {
      console.error('❌ Erreur lors du test de connexion:', error);
      return {
        success: false,
        message: `Erreur: ${error}`,
        tables: []
      };
    }
  }
  
  // ===== GESTION DES UTILISATEURS =====
  
  /**
   * Récupérer tous les utilisateurs avec pagination
   */
  static async getUsers(page: number = 1, limit: number = 20, search?: string): Promise<{ users: AdminUser[]; total: number }> {
    try {
      let query = supabase
        .from('users')
        .select('*', { count: 'exact' });
      
      // Recherche par nom ou email
      if (search) {
        query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
      }
      
      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data, error, count } = await query
        .range(from, to)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Enrichir avec les données d'authentification
      const enrichedUsers = await Promise.all(
        (data || []).map(async (user) => {
          const { data: authData } = await supabase.auth.admin.getUserById(user.id);
          return {
            ...user,
            is_active: authData?.user?.last_sign_in_at ? true : false,
            last_sign_in_at: authData?.user?.last_sign_in_at
          };
        })
      );
      
      return {
        users: enrichedUsers,
        total: count || 0
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  }
  
  /**
   * Activer/désactiver un utilisateur
   */
  static async toggleUserStatus(userId: string, isActive: boolean): Promise<void> {
    try {
      if (!isActive) {
        // Désactiver l'utilisateur
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { is_disabled: true }
        });
        if (error) throw error;
      } else {
        // Réactiver l'utilisateur
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { is_disabled: false }
        });
        if (error) throw error;
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut utilisateur:', error);
      throw error;
    }
  }
  
  /**
   * Supprimer un utilisateur
   */
  static async deleteUser(userId: string): Promise<void> {
    try {
      // Supprimer d'abord le profil public
      const { error: profileError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);
      
      if (profileError) throw profileError;
      
      // Puis supprimer le compte auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);
      if (authError) throw authError;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
  
  // ===== GESTION DES PROPRIÉTÉS =====
  
  /**
   * Récupérer toutes les propriétés avec pagination
   */
  static async getProperties(page: number = 1, limit: number = 20, search?: string, filterStatus?: string): Promise<{ properties: AdminProperty[]; total: number }> {
    try {
      console.log('🔄 Récupération des propriétés...');
      
      // Requête simplifiée d'abord
      let query = supabase
        .from('properties')
        .select('*', { count: 'exact' });
      
      // Recherche par titre ou ville
      if (search) {
        query = query.or(`title.ilike.%${search}%,location->>city.ilike.%${search}%`);
      }
      
      // Filtre par statut
      if (filterStatus === 'pending') {
        query = query.eq('is_approved', false);
      } else if (filterStatus === 'approved') {
        query = query.eq('is_approved', true);
      }
      
      // Pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      
      const { data, error, count } = await query
        .range(from, to)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('❌ Erreur Supabase:', error);
        throw error;
      }
      
      console.log('📊 Données reçues:', data?.length || 0, 'propriétés');
      
      // Transformer les données avec gestion d'erreur
      const properties = (data || []).map(property => {
        try {
          return {
            ...property,
            // Gestion sécurisée des champs JSON
            location: typeof property.location === 'string' ? 
              JSON.parse(property.location) : 
              property.location || { city: 'Inconnue', address: 'Non spécifiée' },
            amenities: typeof property.amenities === 'string' ? 
              JSON.parse(property.amenities) : 
              property.amenities || [],
            // Valeurs par défaut pour éviter les erreurs
            images: property.images || [],
            bedrooms: property.bedrooms || 0,
            bathrooms: property.bathrooms || 0,
            max_guests: property.max_guests || 0,
            price: property.price || 0,
            is_approved: property.is_approved || false,
            is_available: property.is_available !== false
          };
        } catch (parseError) {
          console.warn('⚠️ Erreur de parsing pour la propriété:', property.id, parseError);
          return {
            ...property,
            location: { city: 'Erreur', address: 'Erreur' },
            amenities: [],
            images: [],
            bedrooms: 0,
            bathrooms: 0,
            max_guests: 0,
            price: 0,
            is_approved: false,
            is_available: false
          };
        }
      });
      
      console.log('✅ Propriétés transformées:', properties.length);
      
      return {
        properties,
        total: count || 0
      };
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des propriétés:', error);
      // Retourner un tableau vide en cas d'erreur
      return {
        properties: [],
        total: 0
      };
    }
  }
  
  /**
   * Approuver une propriété
   */
  static async approveProperty(propertyId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ 
          is_approved: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', propertyId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la propriété:', error);
      throw error;
    }
  }
  
  /**
   * Rejeter une propriété
   */
  static async rejectProperty(propertyId: string, reason?: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ 
          is_approved: false,
          rejection_reason: reason,
          updated_at: new Date().toISOString()
        })
        .eq('id', propertyId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors du rejet de la propriété:', error);
      throw error;
    }
  }
  
  /**
   * Supprimer une propriété
   */
  static async deleteProperty(propertyId: string): Promise<void> {
    try {
      // Supprimer d'abord les réservations associées
      const { error: bookingsError } = await supabase
        .from('bookings')
        .delete()
        .eq('property_id', propertyId);
      
      if (bookingsError) throw bookingsError;
      
      // Puis supprimer la propriété
      const { error: propertyError } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyId);
      
      if (propertyError) throw propertyError;
    } catch (error) {
      console.error('Erreur lors de la suppression de la propriété:', error);
      throw error;
    }
  }
  
  // ===== GESTION DES RÉSERVATIONS =====
  
  /**
   * Récupérer toutes les réservations
   */
  static async getBookings(page: number = 1, limit: number = 20): Promise<{ bookings: AdminBooking[]; total: number }> {
    try {
      const { data, error, count } = await supabase
        .from('bookings')
        .select(`
          *,
          properties!bookings_property_id_fkey(title),
          users!bookings_user_id_fkey(name, email)
        `, { count: 'exact' })
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transformer les données
      const bookings = (data || []).map(booking => ({
        ...booking,
        property_title: booking.properties?.title,
        user_name: booking.users?.name,
        user_email: booking.users?.email
      }));
      
      return {
        bookings,
        total: count || 0
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations:', error);
      throw error;
    }
  }
  
  /**
   * Mettre à jour le statut d'une réservation
   */
  static async updateBookingStatus(bookingId: string, status: AdminBooking['status']): Promise<void> {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de réservation:', error);
      throw error;
    }
  }
  
  // ===== GESTION DU CONTENU =====
  
  /**
   * Récupérer tout le contenu
   */
  static async getContent(page: number = 1, limit: number = 20, type?: string): Promise<{ content: AdminContent[]; total: number }> {
    try {
      let query = supabase
        .from('content_pages')
        .select(`
          *,
          users!content_pages_author_id_fkey(name)
        `, { count: 'exact' });
      
      if (type) {
        query = query.eq('type', type);
      }
      
      const { data, error, count } = await query
        .range((page - 1) * limit, page * limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transformer les données
      const content = (data || []).map(item => ({
        ...item,
        author_name: item.users?.name,
        tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
      }));
      
      return {
        content,
        total: count || 0
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
      throw error;
    }
  }
  
  /**
   * Publier du contenu
   */
  static async publishContent(contentId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('content_pages')
        .update({ 
          status: 'published',
          published_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', contentId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de la publication du contenu:', error);
      throw error;
    }
  }
  
  /**
   * Archiver du contenu
   */
  static async archiveContent(contentId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('content_pages')
        .update({ 
          status: 'archived',
          updated_at: new Date().toISOString()
        })
        .eq('id', contentId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Erreur lors de l\'archivage du contenu:', error);
      throw error;
    }
  }
  
  // ===== STATISTIQUES =====
  
  /**
   * Récupérer toutes les statistiques admin
   */
  static async getAdminStats(): Promise<AdminStats> {
    try {
      // Compter les utilisateurs
      const { count: totalUsers } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      // Compter les propriétés
      const { count: totalProperties } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true });
      
      // Compter les propriétés en attente
      const { count: pendingProperties } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('is_approved', false);
      
      // Compter les réservations
      const { count: totalBookings } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });
      
      // Compter les réservations en attente
      const { count: pendingBookings } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      // Compter le contenu publié
      const { count: publishedContent } = await supabase
        .from('content_pages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');
      
      // Calculer les revenus totaux
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('total_price, status')
        .eq('status', 'completed');
      
      const totalRevenue = (bookingsData || []).reduce((sum, booking) => sum + (booking.total_price || 0), 0);
      
      // Répartition par ville
      const { data: cityData } = await supabase
        .from('properties')
        .select('location');
      
      const cityCounts: { [key: string]: number } = {};
      (cityData || []).forEach(property => {
        const city = property.location?.city || 'Inconnue';
        cityCounts[city] = (cityCounts[city] || 0) + 1;
      });
      
      const cityDistribution = Object.entries(cityCounts)
        .map(([city, count]) => ({
          city,
          count,
          percentage: Math.round((count / (totalProperties || 1)) * 100)
        }))
        .sort((a, b) => b.count - a.count);
      
      // Activité récente (simulée pour l'instant)
      const recentActivity = [
        { type: 'booking', description: 'Nouvelle réservation confirmée', timestamp: new Date().toISOString() },
        { type: 'user', description: 'Nouvel utilisateur inscrit', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { type: 'property', description: 'Bien en attente d\'approbation', timestamp: new Date(Date.now() - 7200000).toISOString() }
      ];
      
      return {
        totalUsers: totalUsers || 0,
        totalProperties: totalProperties || 0,
        totalBookings: totalBookings || 0,
        totalRevenue,
        pendingProperties: pendingProperties || 0,
        activeUsers: totalUsers || 0, // Simplifié pour l'instant
        pendingBookings: pendingBookings || 0,
        publishedContent: publishedContent || 0,
        monthlyRevenue: totalRevenue * 0.3, // Estimation
        occupancyRate: 73, // À calculer plus précisément
        cityDistribution,
        recentActivity
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  }
  
  // ===== EXPORT DES DONNÉES =====
  
  /**
   * Exporter les données en CSV
   */
  static async exportData(type: 'users' | 'properties' | 'bookings' | 'content', format: 'csv' | 'json' = 'csv'): Promise<string> {
    try {
      let data: any[] = [];
      
      switch (type) {
        case 'users':
          const { data: usersData } = await this.getUsers(1, 1000);
          data = usersData.users;
          break;
        case 'properties':
          const { data: propertiesData } = await this.getProperties(1, 1000);
          data = propertiesData.properties;
          break;
        case 'bookings':
          const { data: bookingsData } = await this.getBookings(1, 1000);
          data = bookingsData.bookings;
          break;
        case 'content':
          const { data: contentData } = await this.getContent(1, 1000);
          data = contentData.content;
          break;
      }
      
      if (format === 'csv') {
        return this.convertToCSV(data);
      } else {
        return JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error('Erreur lors de l\'export des données:', error);
      throw error;
    }
  }
  
  /**
   * Convertir les données en CSV
   */
  private static convertToCSV(data: any[]): string {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  }
}

export default AdminService;
