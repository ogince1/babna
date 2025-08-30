const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase Cloud
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NzI1MSwiZXhwIjoyMDcyMTIzMjUxfQ.nv4uJQfZIIc60vaH2ERCmh449kSVJwyM-ryI5VtE6Jc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function initDatabase() {
  console.log('🚀 Initialisation de la base de données Supabase Cloud...');

  try {
    // 1. Créer les tables principales
    console.log('📋 Création des tables...');
    
    // Table properties
    const { error: propertiesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.properties (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          price_per_night DECIMAL(10,2) NOT NULL,
          city TEXT NOT NULL,
          address TEXT,
          lat DECIMAL(10,8),
          lng DECIMAL(11,8),
          bedrooms INTEGER DEFAULT 1,
          bathrooms INTEGER DEFAULT 1,
          max_guests INTEGER DEFAULT 2,
          property_type TEXT DEFAULT 'appartement',
          amenities JSONB DEFAULT '[]',
          images JSONB DEFAULT '[]',
          owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          is_available BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (propertiesError) {
      console.log('⚠️ Table properties déjà existante ou erreur:', propertiesError.message);
    } else {
      console.log('✅ Table properties créée');
    }

    // Table users
    const { error: usersError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.users (
          id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
          name TEXT,
          email TEXT,
          role TEXT DEFAULT 'client',
          phone TEXT,
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (usersError) {
      console.log('⚠️ Table users déjà existante ou erreur:', usersError.message);
    } else {
      console.log('✅ Table users créée');
    }

    // Table bookings
    const { error: bookingsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.bookings (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          check_in_date DATE NOT NULL,
          check_out_date DATE NOT NULL,
          guests INTEGER DEFAULT 1,
          total_price DECIMAL(10,2) NOT NULL,
          message TEXT,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (bookingsError) {
      console.log('⚠️ Table bookings déjà existante ou erreur:', bookingsError.message);
    } else {
      console.log('✅ Table bookings créée');
    }

    // Table content_pages
    const { error: contentPagesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.content_pages (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          type TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          title JSONB NOT NULL,
          description JSONB,
          content JSONB,
          meta_title JSONB,
          meta_description JSONB,
          keywords JSONB,
          is_published BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (contentPagesError) {
      console.log('⚠️ Table content_pages déjà existante ou erreur:', contentPagesError.message);
    } else {
      console.log('✅ Table content_pages créée');
    }

    // Table faqs
    const { error: faqsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.faqs (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          question JSONB NOT NULL,
          answer JSONB NOT NULL,
          category TEXT NOT NULL,
          related_to TEXT,
          "order" INTEGER DEFAULT 0,
          is_published BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (faqsError) {
      console.log('⚠️ Table faqs déjà existante ou erreur:', faqsError.message);
    } else {
      console.log('✅ Table faqs créée');
    }

    // Table testimonials
    const { error: testimonialsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.testimonials (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          author_name TEXT NOT NULL,
          author_avatar TEXT,
          rating INTEGER CHECK (rating >= 1 AND rating <= 5),
          content JSONB NOT NULL,
          city TEXT,
          is_verified BOOLEAN DEFAULT false,
          is_published BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (testimonialsError) {
      console.log('⚠️ Table testimonials déjà existante ou erreur:', testimonialsError.message);
    } else {
      console.log('✅ Table testimonials créée');
    }

    // Table blog_posts
    const { error: blogPostsError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.blog_posts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title JSONB NOT NULL,
          excerpt JSONB,
          content JSONB NOT NULL,
          featured_image TEXT,
          author TEXT DEFAULT 'Equipe Babna.ma',
          category TEXT DEFAULT 'general',
          meta_title JSONB,
          meta_description JSONB,
          keywords JSONB,
          is_published BOOLEAN DEFAULT false,
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (blogPostsError) {
      console.log('⚠️ Table blog_posts déjà existante ou erreur:', blogPostsError.message);
    } else {
      console.log('✅ Table blog_posts créée');
    }

    // Table travel_guides
    const { error: travelGuidesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.travel_guides (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title JSONB NOT NULL,
          description JSONB,
          content JSONB NOT NULL,
          city_slug TEXT NOT NULL,
          featured_image TEXT,
          author TEXT DEFAULT 'Equipe Babna.ma',
          sections JSONB DEFAULT '[]',
          meta_title JSONB,
          meta_description JSONB,
          keywords JSONB,
          is_published BOOLEAN DEFAULT false,
          published_at TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (travelGuidesError) {
      console.log('⚠️ Table travel_guides déjà existante ou erreur:', travelGuidesError.message);
    } else {
      console.log('✅ Table travel_guides créée');
    }

    console.log('🎉 Initialisation de la base de données terminée !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
}

// Exécuter le script
initDatabase();
