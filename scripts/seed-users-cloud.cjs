const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase Cloud
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NzI1MSwiZXhwIjoyMDcyMTIzMjUxfQ.nv4uJQfZIIc60vaH2ERCmh449kSVJwyM-ryI5VtE6Jc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedUsers() {
  console.log('👥 Création des utilisateurs dans Supabase Cloud...');

  try {
    // 1. Créer les utilisateurs dans auth.users
    console.log('🔐 Création des utilisateurs dans auth.users...');
    
    const users = [
      {
        id: 'e5a7a5e8-cbc6-40f2-b0dd-1a1072a34f9b',
        email: 'admin@babna.ma',
        password: 'admin123456',
        email_confirm: true
      },
      {
        id: 'f8b9c0d1-e2f3-4456-7890-abcd12345678',
        email: 'proprietaire@babna.ma',
        password: 'proprietaire123',
        email_confirm: true
      },
      {
        id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        email: 'voyageur@babna.ma',
        password: 'voyageur123',
        email_confirm: true
      }
    ];

    for (const user of users) {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: user.email_confirm,
        user_metadata: { name: user.email.split('@')[0] }
      });

      if (error) {
        console.log(`⚠️ Erreur création utilisateur ${user.email}:`, error.message);
      } else {
        console.log(`✅ Utilisateur créé: ${user.email}`);
      }
    }

    // 2. Insérer les profils dans public.users
    console.log('👤 Insertion des profils dans public.users...');
    
    const { data: profiles, error: profilesError } = await supabase
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

    if (profilesError) {
      console.log('⚠️ Erreur insertion profils:', profilesError.message);
    } else {
      console.log('✅ Profils insérés:', profiles?.length || 0);
    }

    // 3. Insérer les propriétés
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

    console.log('🎉 Création des utilisateurs et propriétés terminée !');
    console.log('\n📋 Informations de connexion:');
    console.log('👑 Admin: admin@babna.ma / admin123456');
    console.log('🏠 Propriétaire: proprietaire@babna.ma / proprietaire123');
    console.log('✈️ Voyageur: voyageur@babna.ma / voyageur123');

  } catch (error) {
    console.error('❌ Erreur lors de la création:', error);
  }
}

// Exécuter le script
seedUsers();
