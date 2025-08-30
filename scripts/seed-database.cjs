const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = 'http://localhost:54321';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Données des utilisateurs
const users = [
  {
    email: 'fatima@example.com',
    name: 'Fatima Alaoui',
    phone: '+212623456789',
    whatsapp: '+212623456789',
    role: 'owner',
    password: 'password123'
  },
  {
    email: 'youssef@example.com',
    name: 'Youssef Idrissi',
    phone: '+212634567890',
    whatsapp: '+212634567890',
    role: 'owner',
    password: 'password123'
  },
  {
    email: 'khadija@example.com',
    name: 'Khadija Benali',
    phone: '+212645678901',
    whatsapp: '+212645678901',
    role: 'owner',
    password: 'password123'
  },
  {
    email: 'ahmed@example.com',
    name: 'Ahmed Bennani',
    phone: '+212612345678',
    whatsapp: '+212612345678',
    role: 'client',
    password: 'password123'
  },
  {
    email: 'admin@babna.ma',
    name: 'Admin Platform',
    phone: '+212656789012',
    whatsapp: '+212656789012',
    role: 'admin',
    password: 'password123'
  }
];

// Données des propriétés
const properties = [
  {
    title: 'Appartement moderne près de la Médina',
    description: 'Magnifique appartement de 2 chambres situé à proximité de la médina de Marrakech. Parfait pour découvrir la ville impériale.',
    price: 450.00,
    city: 'Marrakech',
    address: 'Quartier Hivernage, Marrakech',
    lat: 31.6295,
    lng: -8.0080,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Cuisine équipée', 'Terrasse', 'Parking'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    property_type: 'apartment',
    is_available: true,
    is_approved: true,
    rating: 4.8,
    reviews_count: 23
  },
  {
    title: 'Villa avec piscine - Vue sur l\'Atlas',
    description: 'Villa luxueuse avec piscine privée et vue panoramique sur les montagnes de l\'Atlas. Idéale pour des vacances en famille.',
    price: 850.00,
    city: 'Marrakech',
    address: 'Route de l\'Ourika, Marrakech',
    lat: 31.6450,
    lng: -7.9900,
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Barbecue', 'Parking'],
    bedrooms: 4,
    bathrooms: 3,
    max_guests: 8,
    property_type: 'villa',
    is_available: true,
    is_approved: true,
    rating: 4.9,
    reviews_count: 18
  },
  {
    title: 'Riad authentique - Médina de Fès',
    description: 'Riad traditionnel rénové dans la médina de Fès. Architecture authentique avec tout le confort moderne.',
    price: 600.00,
    city: 'Fès',
    address: 'Médina de Fès, Fès',
    lat: 34.0333,
    lng: -5.0000,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438833/pexels-photo-1438833.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Patio', 'Cuisine traditionnelle', 'Hammam', 'Terrasse'],
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    property_type: 'riad',
    is_available: true,
    is_approved: true,
    rating: 4.7,
    reviews_count: 31
  },
  {
    title: 'Studio moderne - Centre de Casablanca',
    description: 'Studio élégant dans le centre de Casablanca, parfait pour les voyages d\'affaires ou courts séjours.',
    price: 320.00,
    city: 'Casablanca',
    address: 'Quartier des Habous, Casablanca',
    lat: 33.5731,
    lng: -7.5898,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Kitchenette', 'Salle de sport'],
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    property_type: 'studio',
    is_available: true,
    is_approved: true,
    rating: 4.5,
    reviews_count: 12
  },
  {
    title: 'Appartement moderne - Centre de Rabat',
    description: 'Appartement élégant dans le centre-ville de Rabat, proche des institutions gouvernementales et de la médina.',
    price: 380.00,
    city: 'Rabat',
    address: 'Avenue Mohammed V, Rabat',
    lat: 34.0209,
    lng: -6.8416,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Parking'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    property_type: 'apartment',
    is_available: true,
    is_approved: true,
    rating: 4.6,
    reviews_count: 19
  },
  {
    title: 'Villa de luxe - Plage d\'Agadir',
    description: 'Villa moderne avec vue sur l\'océan Atlantique, située sur la corniche d\'Agadir.',
    price: 1200.00,
    city: 'Agadir',
    address: 'Corniche d\'Agadir, Agadir',
    lat: 30.4278,
    lng: -9.5981,
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Terrasse', 'Parking privé'],
    bedrooms: 5,
    bathrooms: 4,
    max_guests: 10,
    property_type: 'villa',
    is_available: true,
    is_approved: true,
    rating: 4.9,
    reviews_count: 28
  },
  {
    title: 'Riad traditionnel - Médina de Tanger',
    description: 'Riad authentique dans la médina de Tanger, avec vue sur le détroit de Gibraltar.',
    price: 550.00,
    city: 'Tanger',
    address: 'Médina de Tanger, Tanger',
    lat: 35.7595,
    lng: -5.8340,
    images: [
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571447/pexels-photo-1571447.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1438833/pexels-photo-1438833.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Patio', 'Cuisine traditionnelle', 'Terrasse', 'Vue mer'],
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    property_type: 'riad',
    is_available: true,
    is_approved: true,
    rating: 4.7,
    reviews_count: 22
  },
  {
    title: 'Appartement moderne - Meknès',
    description: 'Appartement moderne dans la ville impériale de Meknès, proche des sites historiques.',
    price: 420.00,
    city: 'Meknès',
    address: 'Place El Hedim, Meknès',
    lat: 33.8935,
    lng: -5.5473,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Cuisine équipée', 'Balcon', 'Parking'],
    bedrooms: 2,
    bathrooms: 1,
    max_guests: 4,
    property_type: 'apartment',
    is_available: true,
    is_approved: true,
    rating: 4.5,
    reviews_count: 15
  },
  {
    title: 'Studio moderne - Chefchaouen',
    description: 'Studio dans la ville bleue de Chefchaouen, parfait pour découvrir cette ville unique.',
    price: 280.00,
    city: 'Chefchaouen',
    address: 'Médina de Chefchaouen, Chefchaouen',
    lat: 35.1714,
    lng: -5.2696,
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['WiFi', 'Climatisation', 'Kitchenette', 'Vue montagne'],
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    property_type: 'studio',
    is_available: true,
    is_approved: true,
    rating: 4.8,
    reviews_count: 31
  },
  {
    title: 'Villa avec piscine - Essaouira',
    description: 'Villa moderne avec piscine à Essaouira, ville côtière célèbre pour ses plages et son vent.',
    price: 750.00,
    city: 'Essaouira',
    address: 'Quartier des Dunes, Essaouira',
    lat: 31.5085,
    lng: -9.7595,
    images: [
      'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    amenities: ['Piscine', 'WiFi', 'Climatisation', 'Jardin', 'Terrasse', 'Parking'],
    bedrooms: 3,
    bathrooms: 2,
    max_guests: 6,
    property_type: 'villa',
    is_available: true,
    is_approved: true,
    rating: 4.6,
    reviews_count: 18
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Début du seeding de la base de données...');

    // 1. Créer les utilisateurs dans auth.users
    console.log('👥 Création des utilisateurs...');
    const userIds = {};
    
    for (const user of users) {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true
      });

      if (authError) {
        console.error(`❌ Erreur lors de la création de l'utilisateur ${user.email}:`, authError);
        continue;
      }

      userIds[user.email] = authData.user.id;
      console.log(`✅ Utilisateur créé: ${user.email} (ID: ${authData.user.id})`);
    }

    // 2. Insérer les utilisateurs dans public.users
    console.log('📝 Insertion des profils utilisateurs...');
    for (const user of users) {
      const userId = userIds[user.email];
      if (!userId) continue;

      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: user.email,
          name: user.name,
          phone: user.phone,
          whatsapp: user.whatsapp,
          role: user.role
        });

      if (profileError) {
        console.error(`❌ Erreur lors de l'insertion du profil ${user.email}:`, profileError);
      } else {
        console.log(`✅ Profil créé: ${user.email}`);
      }
    }

    // 3. Insérer les propriétés
    console.log('🏠 Insertion des propriétés...');
    for (let i = 0; i < properties.length; i++) {
      const property = properties[i];
      
      // Assigner un propriétaire de manière cyclique
      const ownerEmails = ['fatima@example.com', 'youssef@example.com', 'khadija@example.com'];
      const ownerEmail = ownerEmails[i % ownerEmails.length];
      const ownerId = userIds[ownerEmail];

      if (!ownerId) {
        console.error(`❌ Propriétaire non trouvé pour ${ownerEmail}`);
        continue;
      }

      const { error: propertyError } = await supabase
        .from('properties')
        .insert({
          ...property,
          owner_id: ownerId
        });

      if (propertyError) {
        console.error(`❌ Erreur lors de l'insertion de la propriété ${property.title}:`, propertyError);
      } else {
        console.log(`✅ Propriété créée: ${property.title} (${property.city})`);
      }
    }

    console.log('🎉 Seeding terminé avec succès !');
    console.log(`📊 Résumé:`);
    console.log(`   - ${Object.keys(userIds).length} utilisateurs créés`);
    console.log(`   - ${properties.length} propriétés créées`);

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  }
}

// Exécuter le script
seedDatabase();
