const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase Cloud
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NzI1MSwiZXhwIjoyMDcyMTIzMjUxfQ.nv4uJQfZIIc60vaH2ERCmh449kSVJwyM-ryI5VtE6Jc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function completeSeed() {
  console.log('🔧 Finalisation de l\'insertion des données...');

  try {
    // 1. Récupérer les utilisateurs créés
    console.log('👥 Récupération des utilisateurs...');
    
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.log('❌ Erreur récupération utilisateurs:', authError.message);
      return;
    }

    console.log(`✅ ${authUsers.users.length} utilisateurs trouvés`);

    // 2. Créer les profils utilisateurs
    console.log('👤 Création des profils utilisateurs...');
    
    const userProfiles = authUsers.users.map(user => ({
      id: user.id,
      name: user.user_metadata?.name || user.email?.split('@')[0] || 'Utilisateur',
      email: user.email,
      role: user.email === 'admin@babna.ma' ? 'admin' : 
            user.email === 'proprietaire@babna.ma' ? 'owner' : 'client'
    }));

    const { data: profiles, error: profilesError } = await supabase
      .from('users')
      .insert(userProfiles)
      .select();

    if (profilesError) {
      console.log('⚠️ Erreur insertion profils:', profilesError.message);
    } else {
      console.log('✅ Profils créés:', profiles?.length || 0);
    }

    // 3. Trouver l'ID du propriétaire
    const ownerUser = authUsers.users.find(u => u.email === 'proprietaire@babna.ma');
    if (!ownerUser) {
      console.log('❌ Utilisateur propriétaire non trouvé');
      return;
    }

    console.log(`🏠 Propriétaire trouvé: ${ownerUser.id}`);

    // 4. Insérer les propriétés
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
          owner_id: ownerUser.id,
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
          owner_id: ownerUser.id,
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
          owner_id: ownerUser.id,
          is_available: true
        }
      ])
      .select();

    if (propertiesError) {
      console.log('⚠️ Erreur insertion propriétés:', propertiesError.message);
    } else {
      console.log('✅ Propriétés insérées:', properties?.length || 0);
    }

    // 5. Vérifier les données existantes
    console.log('📊 Vérification des données...');
    
    const { data: existingFaqs } = await supabase.from('faqs').select('count');
    const { data: existingTestimonials } = await supabase.from('testimonials').select('count');
    const { data: existingProperties } = await supabase.from('properties').select('count');
    const { data: existingUsers } = await supabase.from('users').select('count');

    console.log('📈 Résumé des données:');
    console.log(`- FAQ: ${existingFaqs?.length || 0}`);
    console.log(`- Témoignages: ${existingTestimonials?.length || 0}`);
    console.log(`- Propriétés: ${existingProperties?.length || 0}`);
    console.log(`- Utilisateurs: ${existingUsers?.length || 0}`);

    console.log('\n🎉 Finalisation terminée !');
    console.log('\n📋 Informations de connexion:');
    console.log('👑 Admin: admin@babna.ma / admin123456');
    console.log('🏠 Propriétaire: proprietaire@babna.ma / proprietaire123');
    console.log('✈️ Voyageur: voyageur@babna.ma / voyageur123');

  } catch (error) {
    console.error('❌ Erreur lors de la finalisation:', error);
  }
}

// Exécuter le script
completeSeed();
