const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase Cloud
const supabaseUrl = 'https://ubanmapcosqapprxkjld.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViYW5tYXBjb3NxYXBwcnhramxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjU0NzI1MSwiZXhwIjoyMDcyMTIzMjUxfQ.nv4uJQfZIIc60vaH2ERCmh449kSVJwyM-ryI5VtE6Jc';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function syncProperties() {
  console.log('🏠 Synchronisation des appartements avec Supabase Cloud...');

  try {
    // 1. Récupérer l'ID du propriétaire
    console.log('👤 Récupération du propriétaire...');
    
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
      console.log('❌ Erreur récupération utilisateurs:', authError.message);
      return;
    }

    const ownerUser = authUsers.users.find(u => u.email === 'proprietaire@babna.ma');
    if (!ownerUser) {
      console.log('❌ Utilisateur propriétaire non trouvé');
      return;
    }

    console.log(`✅ Propriétaire trouvé: ${ownerUser.id}`);

    // 2. Supprimer les propriétés existantes
    console.log('🗑️ Suppression des propriétés existantes...');
    
    const { error: deleteError } = await supabase
      .from('properties')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Supprimer toutes les propriétés

    if (deleteError) {
      console.log('⚠️ Erreur suppression propriétés:', deleteError.message);
    } else {
      console.log('✅ Propriétés existantes supprimées');
    }

    // 3. Insérer toutes les propriétés
    console.log('🏠 Insertion des nouvelles propriétés...');
    
    const properties = [
      // Marrakech
      {
        title: 'Riad traditionnel au cœur de la Médina',
        description: 'Authentique riad marocain avec patio, terrasse et vue sur les toits de Marrakech. Idéal pour une expérience culturelle authentique.',
        price_per_night: 180.00,
        city: 'Marrakech',
        address: 'Rue Riad Zitoun, Médina, Marrakech',
        lat: 31.6295,
        lng: -7.9811,
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        property_type: 'riad',
        amenities: ['wifi', 'climatisation', 'piscine', 'terrasse', 'cuisine', 'parking'],
        images: [
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },
      {
        title: 'Appartement moderne près de la Koutoubia',
        description: 'Appartement contemporain avec vue sur la mosquée Koutoubia. Proche des souks et des restaurants.',
        price_per_night: 120.00,
        city: 'Marrakech',
        address: 'Avenue Mohammed V, Marrakech',
        lat: 31.6245,
        lng: -7.9836,
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        property_type: 'appartement',
        amenities: ['wifi', 'climatisation', 'cuisine', 'balcon'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },
      {
        title: 'Villa avec piscine à Palmeraie',
        description: 'Magnifique villa avec piscine privée dans la Palmeraie de Marrakech. Calme et luxe garantis.',
        price_per_night: 350.00,
        city: 'Marrakech',
        address: 'Route de la Palmeraie, Marrakech',
        lat: 31.6500,
        lng: -7.9500,
        bedrooms: 4,
        bathrooms: 3,
        max_guests: 8,
        property_type: 'villa',
        amenities: ['wifi', 'climatisation', 'piscine', 'jardin', 'cuisine', 'parking', 'terrasse'],
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Casablanca
      {
        title: 'Appartement de luxe à la Corniche',
        description: 'Appartement moderne avec vue sur l\'océan Atlantique. Proche des plages et du centre-ville.',
        price_per_night: 200.00,
        city: 'Casablanca',
        address: 'Boulevard de la Corniche, Casablanca',
        lat: 33.5731,
        lng: -7.5898,
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        property_type: 'appartement',
        amenities: ['wifi', 'climatisation', 'balcon', 'cuisine', 'parking'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },
      {
        title: 'Studio moderne au centre-ville',
        description: 'Studio parfait pour un séjour professionnel ou romantique. Proche de la mosquée Hassan II.',
        price_per_night: 90.00,
        city: 'Casablanca',
        address: 'Quartier Habous, Casablanca',
        lat: 33.5950,
        lng: -7.6320,
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        property_type: 'studio',
        amenities: ['wifi', 'climatisation', 'cuisine'],
        images: [
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Rabat
      {
        title: 'Appartement historique dans la Kasbah',
        description: 'Appartement rénové dans la Kasbah historique de Rabat. Vue imprenable sur l\'océan.',
        price_per_night: 150.00,
        city: 'Rabat',
        address: 'Kasbah des Oudayas, Rabat',
        lat: 34.0209,
        lng: -6.8416,
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        property_type: 'appartement',
        amenities: ['wifi', 'climatisation', 'cuisine', 'terrasse'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },
      {
        title: 'Maison traditionnelle à Salé',
        description: 'Maison traditionnelle marocaine dans la ville jumelle de Rabat. Authenticité et charme.',
        price_per_night: 130.00,
        city: 'Rabat',
        address: 'Médina de Salé, Rabat',
        lat: 34.0333,
        lng: -6.8167,
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        property_type: 'maison',
        amenities: ['wifi', 'climatisation', 'cuisine', 'jardin'],
        images: [
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Fès
      {
        title: 'Riad authentique dans la Médina de Fès',
        description: 'Riad traditionnel au cœur de la plus grande médina piétonne du monde. Expérience culturelle unique.',
        price_per_night: 160.00,
        city: 'Fès',
        address: 'Médina de Fès el-Bali, Fès',
        lat: 34.0181,
        lng: -5.0078,
        bedrooms: 4,
        bathrooms: 3,
        max_guests: 8,
        property_type: 'riad',
        amenities: ['wifi', 'climatisation', 'piscine', 'terrasse', 'cuisine'],
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },
      {
        title: 'Appartement moderne à Fès Jdid',
        description: 'Appartement contemporain dans le quartier moderne de Fès. Confort et accessibilité.',
        price_per_night: 100.00,
        city: 'Fès',
        address: 'Fès Jdid, Fès',
        lat: 34.0500,
        lng: -5.0000,
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        property_type: 'appartement',
        amenities: ['wifi', 'climatisation', 'cuisine', 'balcon'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Agadir
      {
        title: 'Villa avec vue sur l\'océan',
        description: 'Villa moderne avec vue panoramique sur l\'océan Atlantique. Plage privée et piscine.',
        price_per_night: 280.00,
        city: 'Agadir',
        address: 'Corniche d\'Agadir',
        lat: 30.4278,
        lng: -9.5981,
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        property_type: 'villa',
        amenities: ['wifi', 'climatisation', 'piscine', 'plage', 'cuisine', 'parking'],
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },
      {
        title: 'Studio au centre-ville d\'Agadir',
        description: 'Studio moderne au cœur d\'Agadir. Proche des commerces et de la plage.',
        price_per_night: 80.00,
        city: 'Agadir',
        address: 'Centre-ville, Agadir',
        lat: 30.4167,
        lng: -9.5833,
        bedrooms: 1,
        bathrooms: 1,
        max_guests: 2,
        property_type: 'studio',
        amenities: ['wifi', 'climatisation', 'cuisine'],
        images: [
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Tanger
      {
        title: 'Appartement avec vue sur le détroit',
        description: 'Appartement avec vue imprenable sur le détroit de Gibraltar. Proche de la Médina.',
        price_per_night: 140.00,
        city: 'Tanger',
        address: 'Kasbah, Tanger',
        lat: 35.7767,
        lng: -5.8039,
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        property_type: 'appartement',
        amenities: ['wifi', 'climatisation', 'cuisine', 'terrasse'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Essaouira
      {
        title: 'Riad dans la Médina d\'Essaouira',
        description: 'Riad traditionnel dans la charmante médina d\'Essaouira. Proche de la plage et du port.',
        price_per_night: 170.00,
        city: 'Essaouira',
        address: 'Médina, Essaouira',
        lat: 31.5085,
        lng: -9.7595,
        bedrooms: 3,
        bathrooms: 2,
        max_guests: 6,
        property_type: 'riad',
        amenities: ['wifi', 'climatisation', 'terrasse', 'cuisine'],
        images: [
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Chefchaouen
      {
        title: 'Maison bleue dans la Médina',
        description: 'Maison traditionnelle dans la célèbre ville bleue. Vue sur les montagnes du Rif.',
        price_per_night: 110.00,
        city: 'Chefchaouen',
        address: 'Médina, Chefchaouen',
        lat: 35.1714,
        lng: -5.2696,
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        property_type: 'maison',
        amenities: ['wifi', 'climatisation', 'cuisine', 'terrasse'],
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      },

      // Meknès
      {
        title: 'Appartement près de la Médina impériale',
        description: 'Appartement moderne près de la Médina historique de Meknès. Proche des sites touristiques.',
        price_per_night: 95.00,
        city: 'Meknès',
        address: 'Médina, Meknès',
        lat: 33.8935,
        lng: -5.5473,
        bedrooms: 2,
        bathrooms: 1,
        max_guests: 4,
        property_type: 'appartement',
        amenities: ['wifi', 'climatisation', 'cuisine', 'balcon'],
        images: [
          'https://images.unsplash.com/photo-1553603229-0f1a5d2c735b?w=800',
          'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
        ],
        owner_id: ownerUser.id,
        is_available: true
      }
    ];

    const { data: insertedProperties, error: insertError } = await supabase
      .from('properties')
      .insert(properties)
      .select();

    if (insertError) {
      console.log('❌ Erreur insertion propriétés:', insertError.message);
    } else {
      console.log(`✅ ${insertedProperties.length} propriétés insérées avec succès`);
    }

    // 4. Vérifier les données par ville
    console.log('📊 Vérification des données par ville...');
    
    const cities = ['Marrakech', 'Casablanca', 'Rabat', 'Fès', 'Agadir', 'Tanger', 'Essaouira', 'Chefchaouen', 'Meknès'];
    
    for (const city of cities) {
      const { data: cityProperties } = await supabase
        .from('properties')
        .select('count')
        .eq('city', city);
      
      console.log(`- ${city}: ${cityProperties?.length || 0} propriétés`);
    }

    // 5. Statistiques globales
    const { data: allProperties } = await supabase
      .from('properties')
      .select('*');

    console.log('\n📈 Statistiques globales:');
    console.log(`- Total propriétés: ${allProperties?.length || 0}`);
    console.log(`- Prix moyen: ${(allProperties?.reduce((sum, p) => sum + p.price_per_night, 0) / (allProperties?.length || 1)).toFixed(2)} MAD/nuit`);
    console.log(`- Types: ${[...new Set(allProperties?.map(p => p.property_type) || [])].join(', ')}`);

    console.log('\n🎉 Synchronisation terminée avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
}

// Exécuter le script
syncProperties();
