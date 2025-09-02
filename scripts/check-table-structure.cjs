const { createClient } = require('@supabase/supabase-js');

console.log('🔍 VÉRIFICATION DE LA STRUCTURE DES TABLES');
console.log('==========================================');
console.log('');

// Configuration Supabase (utilisez votre clé anon)
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTcyOTAsImV4cCI6MjA1MDg3MzI5MH0.8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c';

console.log('🔗 Connexion à Supabase...');
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTableStructures() {
  try {
    console.log('📋 Vérification de la table testimonials...');
    
    // Test testimonials
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*')
      .limit(1);
    
    if (testimonialsError) {
      console.log('❌ Erreur testimonials:', testimonialsError.message);
    } else {
      console.log('✅ Table testimonials accessible');
      if (testimonials && testimonials.length > 0) {
        console.log('   Colonnes disponibles:', Object.keys(testimonials[0]));
      }
    }
    
    console.log('');
    console.log('📋 Vérification de la table blog_posts...');
    
    // Test blog_posts
    const { data: blogPosts, error: blogPostsError } = await supabase
      .from('blog_posts')
      .select('*')
      .limit(1);
    
    if (blogPostsError) {
      console.log('❌ Erreur blog_posts:', blogPostsError.message);
    } else {
      console.log('✅ Table blog_posts accessible');
      if (blogPosts && blogPosts.length > 0) {
        console.log('   Colonnes disponibles:', Object.keys(blogPosts[0]));
      }
    }
    
    console.log('');
    console.log('📋 Vérification de la table travel_guides...');
    
    // Test travel_guides
    const { data: travelGuides, error: travelGuidesError } = await supabase
      .from('travel_guides')
      .select('*')
      .limit(1);
    
    if (travelGuidesError) {
      console.log('❌ Erreur travel_guides:', travelGuidesError.message);
    } else {
      console.log('✅ Table travel_guides accessible');
      if (travelGuides && travelGuides.length > 0) {
        console.log('   Colonnes disponibles:', Object.keys(travelGuides[0]));
      }
    }
    
    console.log('');
    console.log('📋 Vérification de la table faqs...');
    
    // Test faqs
    const { data: faqs, error: faqsError } = await supabase
      .from('faqs')
      .select('*')
      .limit(1);
    
    if (faqsError) {
      console.log('❌ Erreur faqs:', faqsError.message);
    } else {
      console.log('✅ Table faqs accessible');
      if (faqs && faqs.length > 0) {
        console.log('   Colonnes disponibles:', Object.keys(faqs[0]));
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Exécuter la vérification
checkTableStructures();
