import { supabase } from '../lib/supabase';
import { ContentPage, FAQ, Testimonial, BlogPost, TravelGuide } from '../types/content';

export const contentService = {
  // Contenu unique par page
  async getContentPage(type: string, slug: string, language: string): Promise<ContentPage | null> {
    try {
      const { data, error } = await supabase
        .from('content_pages')
        .select('*')
        .eq('type', type)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu:', error);
      return null;
    }
  },

  // FAQ par ville/tags
  async getFAQs(category: string, relatedTo?: string, language: string = 'fr'): Promise<FAQ[]> {
    try {
      console.log('🔄 Service FAQ - Recherche catégorie:', category, 'RelatedTo:', relatedTo);
      
      let query = supabase
        .from('faqs')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
        .order('order', { ascending: true });

      if (relatedTo) {
        // Si relatedTo est spécifié, chercher les FAQ avec ce related_to
        query = query.eq('related_to', relatedTo);
      }
      // Si pas de relatedTo, on ne filtre pas par related_to (on prend toutes les FAQ de la catégorie)

      const { data, error } = await query;
      if (error) throw error;
      
      console.log('✅ Service FAQ - Résultats:', data?.length || 0, 'FAQ trouvées');
      console.log('📋 Service FAQ - Détails:', data);
      
      return data || [];
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des FAQ:', error);
      return [];
    }
  },

  // Témoignages clients
  async getTestimonials(city?: string, limit: number = 10): Promise<Testimonial[]> {
    try {
      let query = supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .eq('is_verified', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (city) {
        query = query.eq('city', city);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des témoignages:', error);
      return [];
    }
  },

  // Articles de blog
  async getBlogPosts(category?: string, limit: number = 10): Promise<BlogPost[]> {
    try {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des articles:', error);
      return [];
    }
  },

  async getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
      return null;
    }
  },

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'article:', error);
      return null;
    }
  },

  // Guides de voyage
  async getTravelGuides(citySlug?: string): Promise<TravelGuide[]> {
    try {
      let query = supabase
        .from('travel_guides')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (citySlug) {
        query = query.eq('city_slug', citySlug);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Erreur lors de la récupération des guides:', error);
      return [];
    }
  },

  async getTravelGuide(citySlug: string): Promise<TravelGuide | null> {
    try {
      const { data, error } = await supabase
        .from('travel_guides')
        .select('*')
        .eq('city_slug', citySlug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du guide:', error);
      return null;
    }
  },

  // Méthodes d'administration (pour les admins)
  async createContentPage(content: Partial<ContentPage>): Promise<ContentPage | null> {
    try {
      const { data, error } = await supabase
        .from('content_pages')
        .insert([content])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la création du contenu:', error);
      return null;
    }
  },

  async updateContentPage(id: string, updates: Partial<ContentPage>): Promise<ContentPage | null> {
    try {
      const { data, error } = await supabase
        .from('content_pages')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contenu:', error);
      return null;
    }
  },

  async deleteContentPage(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('content_pages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du contenu:', error);
      return false;
    }
  }
};
