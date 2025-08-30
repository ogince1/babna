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

-- Données d'exemple pour les FAQ
INSERT INTO faqs (question, answer, category, "order", is_published) VALUES
(
  '{"fr": "Comment réserver un appartement ?", "ar": "كيف أحجز شقة؟", "en": "How to book an apartment?", "es": "¿Cómo reservar un apartamento?"}',
  '{"fr": "Vous pouvez réserver directement en ligne en sélectionnant vos dates et en suivant les étapes de paiement.", "ar": "يمكنك الحجز مباشرة عبر الإنترنت باختيار التواريخ واتباع خطوات الدفع.", "en": "You can book directly online by selecting your dates and following the payment steps.", "es": "Puedes reservar directamente en línea seleccionando tus fechas y siguiendo los pasos de pago."}',
  'booking',
  1,
  true
),
(
  '{"fr": "Quels sont les moyens de paiement acceptés ?", "ar": "ما هي طرق الدفع المقبولة؟", "en": "What payment methods are accepted?", "es": "¿Qué métodos de pago se aceptan?"}',
  '{"fr": "Nous acceptons les cartes de crédit, PayPal et les virements bancaires.", "ar": "نحن نقبل بطاقات الائتمان وباي بال والتحويلات البنكية.", "en": "We accept credit cards, PayPal and bank transfers.", "es": "Aceptamos tarjetas de crédito, PayPal y transferencias bancarias."}',
  'payment',
  1,
  true
),
(
  '{"fr": "Puis-je annuler ma réservation ?", "ar": "هل يمكنني إلغاء حجزي؟", "en": "Can I cancel my booking?", "es": "¿Puedo cancelar mi reserva?"}',
  '{"fr": "Oui, vous pouvez annuler jusqu\'à 24h avant votre arrivée selon les conditions de l\'appartement.", "ar": "نعم، يمكنك الإلغاء حتى 24 ساعة قبل الوصول حسب شروط الشقة.", "en": "Yes, you can cancel up to 24h before your arrival according to the apartment conditions.", "es": "Sí, puedes cancelar hasta 24h antes de tu llegada según las condiciones del apartamento."}',
  'booking',
  2,
  true
);

-- Données d'exemple pour les témoignages
INSERT INTO testimonials (author_name, rating, content, city, is_verified, is_published) VALUES
(
  'Marie Dubois',
  5,
  '{"fr": "Excellent séjour à Marrakech ! L\'appartement était parfait et l\'accueil très chaleureux.", "ar": "إقامة ممتازة في مراكش! الشقة كانت مثالية والاستقبال دافئ جداً.", "en": "Excellent stay in Marrakech! The apartment was perfect and the welcome very warm.", "es": "¡Excelente estancia en Marrakech! El apartamento era perfecto y la bienvenida muy cálida."}',
  'Marrakech',
  true,
  true
),
(
  'Ahmed Alami',
  4,
  '{"fr": "Très bon rapport qualité-prix. L\'appartement était propre et bien situé.", "ar": "نسبة سعر جيدة جداً. الشقة كانت نظيفة وموقعها جيد.", "en": "Very good value for money. The apartment was clean and well located.", "es": "Muy buena relación calidad-precio. El apartamento estaba limpio y bien ubicado."}',
  'Casablanca',
  true,
  true
);

-- Données d'exemple pour les articles de blog
INSERT INTO blog_posts (title, excerpt, content, slug, author, featured_image, category, is_published) VALUES
(
  '{"fr": "Les 10 meilleurs endroits à visiter à Marrakech", "ar": "أفضل 10 أماكن للزيارة في مراكش", "en": "Top 10 places to visit in Marrakech", "es": "Los 10 mejores lugares para visitar en Marrakech"}',
  '{"fr": "Découvrez les incontournables de la ville rouge, de la Médina aux jardins Majorelle.", "ar": "اكتشف المعالم الأساسية للمدينة الحمراء، من المدينة القديمة إلى حدائق ماجوريل.", "en": "Discover the must-sees of the red city, from the Medina to the Majorelle gardens.", "es": "Descubre los imprescindibles de la ciudad roja, desde la Medina hasta los jardines Majorelle."}',
  '{"fr": "Marrakech, la perle du sud, offre une expérience unique...", "ar": "مراكش، جوهرة الجنوب، تقدم تجربة فريدة...", "en": "Marrakech, the pearl of the south, offers a unique experience...", "es": "Marrakech, la perla del sur, ofrece una experiencia única..."}',
  'top-10-marrakech',
  'Équipe Babna.ma',
  'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
  'travel',
  true
);
