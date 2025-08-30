-- Tables pour le système de contenu unique

-- Table des pages de contenu
CREATE TABLE IF NOT EXISTS content_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('city', 'tag', 'blog', 'testimonial', 'guide')),
  slug TEXT NOT NULL UNIQUE,
  title JSONB NOT NULL, -- {fr: "...", ar: "...", en: "...", es: "..."}
  description JSONB NOT NULL,
  content JSONB NOT NULL,
  meta_title JSONB,
  meta_description JSONB,
  keywords JSONB,
  featured_image TEXT,
  images TEXT[],
  author TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  seo_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question JSONB NOT NULL, -- {fr: "...", ar: "...", en: "...", es: "..."}
  answer JSONB NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('city', 'booking', 'payment', 'general')),
  related_to TEXT, -- city slug or tag slug
  "order" INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content JSONB NOT NULL, -- {fr: "...", ar: "...", en: "...", es: "..."}
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  city TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_verified BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des articles de blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title JSONB NOT NULL, -- {fr: "...", ar: "...", en: "...", es: "..."}
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  author TEXT NOT NULL,
  featured_image TEXT NOT NULL,
  images TEXT[],
  tags TEXT[],
  category TEXT NOT NULL CHECK (category IN ('travel', 'culture', 'tips', 'news')),
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  seo_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des guides de voyage
CREATE TABLE IF NOT EXISTS travel_guides (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  city_slug TEXT NOT NULL,
  title JSONB NOT NULL, -- {fr: "...", ar: "...", en: "...", es: "..."}
  description JSONB NOT NULL,
  content JSONB NOT NULL,
  sections JSONB, -- [{title: {...}, content: {...}, order: 1}, ...]
  featured_image TEXT NOT NULL,
  images TEXT[],
  author TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_published BOOLEAN DEFAULT false,
  seo_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_content_pages_type_slug ON content_pages(type, slug);
CREATE INDEX IF NOT EXISTS idx_content_pages_published ON content_pages(is_published) WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_related_to ON faqs(related_to);
CREATE INDEX IF NOT EXISTS idx_faqs_published ON faqs(is_published) WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_testimonials_city ON testimonials(city);
CREATE INDEX IF NOT EXISTS idx_testimonials_property_id ON testimonials(property_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published) WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published) WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_travel_guides_city_slug ON travel_guides(city_slug);
CREATE INDEX IF NOT EXISTS idx_travel_guides_published ON travel_guides(is_published) WHERE is_published = true;

-- RLS (Row Level Security) - Seuls les admins peuvent modifier le contenu
ALTER TABLE content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_guides ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour content_pages
CREATE POLICY "Content pages are viewable by everyone" ON content_pages
  FOR SELECT USING (is_published = true);

CREATE POLICY "Content pages are insertable by admins" ON content_pages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Content pages are updatable by admins" ON content_pages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Content pages are deletable by admins" ON content_pages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Politiques RLS pour faqs
CREATE POLICY "FAQs are viewable by everyone" ON faqs
  FOR SELECT USING (is_published = true);

CREATE POLICY "FAQs are insertable by admins" ON faqs
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "FAQs are updatable by admins" ON faqs
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "FAQs are deletable by admins" ON faqs
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Politiques RLS pour testimonials
CREATE POLICY "Testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_published = true);

CREATE POLICY "Testimonials are insertable by authenticated users" ON testimonials
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Testimonials are updatable by admins" ON testimonials
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Testimonials are deletable by admins" ON testimonials
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Politiques RLS pour blog_posts
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Blog posts are insertable by admins" ON blog_posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Blog posts are updatable by admins" ON blog_posts
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Blog posts are deletable by admins" ON blog_posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Politiques RLS pour travel_guides
CREATE POLICY "Travel guides are viewable by everyone" ON travel_guides
  FOR SELECT USING (is_published = true);

CREATE POLICY "Travel guides are insertable by admins" ON travel_guides
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Travel guides are updatable by admins" ON travel_guides
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Travel guides are deletable by admins" ON travel_guides
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Les données d'exemple sont maintenant dans supabase/seed.sql
