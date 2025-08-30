const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase Cloud
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NzI1MSwiZXhwIjoyMDcyMTIzMjUxfQ.nv4uJQfZIIc60vaH2ERCmh449kSVJwyM-ryI5VtE6Jc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('🌱 Insertion des données de test dans Supabase Cloud...');

  try {
    // 1. Insérer des utilisateurs de test
    console.log('👥 Insertion des utilisateurs...');
    
    const { data: users, error: usersError } = await supabase
      .from('users')
      .insert([
        {
          id: 'e5a7a5e8-cbc6-40f2-b0dd-1a1072a34f9b',
          name: 'Admin Babna',
          email: 'admin@babna.ma',
          role: 'admin'
        },
        {
          id: 'f8b9c0d1-e2f3-4456-7890-abcd12345678',
          name: 'Propriétaire Test',
          email: 'proprietaire@babna.ma',
          role: 'owner'
        },
        {
          id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
          name: 'Voyageur Test',
          email: 'voyageur@babna.ma',
          role: 'client'
        }
      ])
      .select();

    if (usersError) {
      console.log('⚠️ Erreur insertion utilisateurs:', usersError.message);
    } else {
      console.log('✅ Utilisateurs insérés:', users?.length || 0);
    }

    // 2. Insérer des propriétés de test
    console.log('🏠 Insertion des propriétés...');
    
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .insert([
        {
          title: 'Appartement moderne au cœur de Marrakech',
          description: 'Magnifique appartement rénové avec vue sur la Médina',
          price_per_night: 120.00,
          city: 'Marrakech',
          address: 'Rue de la Médina, Marrakech',
          lat: 31.6295,
          lng: -7.9811,
          bedrooms: 2,
          bathrooms: 1,
          max_guests: 4,
          property_type: 'appartement',
          amenities: ['wifi', 'climatisation', 'cuisine'],
          images: ['https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'],
          owner_id: 'f8b9c0d1-e2f3-4456-7890-abcd12345678',
          is_available: true
        },
        {
          title: 'Riad traditionnel à Casablanca',
          description: 'Authentique riad avec patio et terrasse',
          price_per_night: 150.00,
          city: 'Casablanca',
          address: 'Quartier Habous, Casablanca',
          lat: 33.5731,
          lng: -7.5898,
          bedrooms: 3,
          bathrooms: 2,
          max_guests: 6,
          property_type: 'riad',
          amenities: ['wifi', 'climatisation', 'piscine', 'terrasse'],
          images: ['https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'],
          owner_id: 'f8b9c0d1-e2f3-4456-7890-abcd12345678',
          is_available: true
        },
        {
          title: 'Studio moderne à Rabat',
          description: 'Studio parfait pour un séjour professionnel',
          price_per_night: 80.00,
          city: 'Rabat',
          address: 'Centre-ville, Rabat',
          lat: 34.0209,
          lng: -6.8416,
          bedrooms: 1,
          bathrooms: 1,
          max_guests: 2,
          property_type: 'studio',
          amenities: ['wifi', 'climatisation', 'cuisine'],
          images: ['https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'],
          owner_id: 'f8b9c0d1-e2f3-4456-7890-abcd12345678',
          is_available: true
        }
      ])
      .select();

    if (propertiesError) {
      console.log('⚠️ Erreur insertion propriétés:', propertiesError.message);
    } else {
      console.log('✅ Propriétés insérées:', properties?.length || 0);
    }

    // 3. Insérer des FAQ
    console.log('❓ Insertion des FAQ...');
    
    const { data: faqs, error: faqsError } = await supabase
      .from('faqs')
      .insert([
        {
          question: {
            fr: "Comment réserver un appartement ?",
            ar: "كيف أحجز شقة؟",
            en: "How to book an apartment?",
            es: "¿Cómo reservar un apartamento?"
          },
          answer: {
            fr: "Vous pouvez réserver directement en ligne en sélectionnant vos dates et en suivant les étapes de paiement.",
            ar: "يمكنك الحجز مباشرة عبر الإنترنت باختيار التواريخ واتباع خطوات الدفع.",
            en: "You can book directly online by selecting your dates and following the payment steps.",
            es: "Puedes reservar directamente en línea seleccionando tus fechas y siguiendo los pasos de pago."
          },
          category: 'booking',
          related_to: null,
          order: 1,
          is_published: true
        },
        {
          question: {
            fr: "Que faire à Marrakech ?",
            ar: "ماذا أفعل في مراكش؟",
            en: "What to do in Marrakech?",
            es: "¿Qué hacer en Marrakech?"
          },
          answer: {
            fr: "Visitez la Médina, les jardins Majorelle, la place Jemaa el-Fna et les souks traditionnels.",
            ar: "قم بزيارة المدينة القديمة وحدائق ماجوريل وساحة جامع الفنا والأسواق التقليدية.",
            en: "Visit the Medina, Majorelle Gardens, Jemaa el-Fna square and traditional souks.",
            es: "Visita la Medina, los jardines Majorelle, la plaza Jemaa el-Fna y los zocos tradicionales."
          },
          category: 'city',
          related_to: 'marrakech',
          order: 1,
          is_published: true
        }
      ])
      .select();

    if (faqsError) {
      console.log('⚠️ Erreur insertion FAQ:', faqsError.message);
    } else {
      console.log('✅ FAQ insérées:', faqs?.length || 0);
    }

    // 4. Insérer des témoignages
    console.log('⭐ Insertion des témoignages...');
    
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .insert([
        {
          author_name: 'Jean-Pierre Martin',
          rating: 5,
          content: {
            fr: "Villa magnifique à Agadir avec vue sur l'océan. Parfait pour des vacances en famille.",
            ar: "فيلا رائعة في أكادير بإطلالة على المحيط. مثالية للعطلات العائلية.",
            en: "Magnificent villa in Agadir with ocean view. Perfect for family vacations.",
            es: "Villa magnífica en Agadir con vista al océano. Perfecta para vacaciones familiares."
          },
          city: 'Agadir',
          is_verified: true,
          is_published: true
        },
        {
          author_name: 'Sarah Johnson',
          rating: 5,
          content: {
            fr: "Service impeccable et appartement de qualité à Marrakech.",
            ar: "خدمة لا تشوبها شائبة وشقة عالية الجودة في مراكش.",
            en: "Impeccable service and quality apartment in Marrakech.",
            es: "Servicio impecable y apartamento de calidad en Marrakech."
          },
          city: 'Marrakech',
          is_verified: true,
          is_published: true
        }
      ])
      .select();

    if (testimonialsError) {
      console.log('⚠️ Erreur insertion témoignages:', testimonialsError.message);
    } else {
      console.log('✅ Témoignages insérés:', testimonials?.length || 0);
    }

    console.log('🎉 Insertion des données terminée !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion:', error);
  }
}

// Exécuter le script
seedDatabase();
