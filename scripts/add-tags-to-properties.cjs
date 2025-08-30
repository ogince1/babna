const { createClient } = require('@supabase/supabase-js');

// Configuration Supabase
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mapping des villes vers les tags appropriés
const cityTagMapping = {
  'Marrakech': [
    'mosquee-koutoubia',
    'medina-marrakech',
    'jardins-majorelle',
    'place-jemaa-el-fna',
    'jardin-menara',
    'jardin-secret',
    'souks-traditionnels',
    'souks-marrakech-fes',
    'musee-marrakech',
    'mont-toubkal',
    'vallee-ourika'
  ],
  'Casablanca': [
    'mosquee-hassan-ii',
    'houbous'
  ],
  'Fès': [
    'medina-fes',
    'universite-al-quaraouiyine',
    'mosquee-ben-youssef',
    'mausolee-moulay-idriss',
    'musee-dar-batha',
    'souks-marrakech-fes'
  ],
  'Rabat': [
    'mausolee-mohammed-v',
    'kasbah-oudayas',
    'ruines-chellah'
  ],
  'Agadir': [
    'plage-agadir'
  ],
  'Tanger': [
    'grottes-hercule',
    'cap-spartel'
  ],
  'Meknès': [
    'medina-meknes',
    'bab-mansour'
  ],
  'Oujda': [],
  'Kénitra': [],
  'Tétouan': [
    'plage-martil'
  ],
  'Safi': [],
  'El Jadida': [],
  'Béni Mellal': [],
  'Nador': [],
  'Taza': [],
  'Larache': [
    'ruines-lixus'
  ],
  'Khemisset': [],
  'Guelmim': [],
  'Jorf Lasfar': [],
  'Youssoufia': [],
  'Khénifra': [],
  'Berkane': [],
  'Taourirt': [
    'kasbah-taourirt'
  ],
  'Benslimane': [],
  'Al Hoceima': [],
  'Chefchaouen': [
    'ville-bleue'
  ],
  'Essaouira': [
    'medina-essaouira',
    'port-essaouira',
    'plage-sidi-kaouki',
    'marche-poissons-essaouira'
  ]
};

// Fonction pour ajouter des tags aux propriétés
async function addTagsToProperties() {
  console.log('🚀 Début de l\'ajout des tags aux propriétés...');
  
  try {
    // Récupérer toutes les propriétés
    const { data: properties, error: fetchError } = await supabase
      .from('properties')
      .select('*');
    
    if (fetchError) {
      console.error('❌ Erreur lors de la récupération des propriétés:', fetchError);
      return;
    }
    
    console.log(`📊 ${properties.length} propriétés trouvées`);
    
    // Mettre à jour chaque propriété avec ses tags
    for (const property of properties) {
      const tags = cityTagMapping[property.city] || [];
      
      if (tags.length > 0) {
        // Sélectionner aléatoirement 2-4 tags
        const selectedTags = tags
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * 3) + 2);
        
        console.log(`🏠 ${property.city}: ${selectedTags.join(', ')}`);
        
        // Mettre à jour la propriété avec les tags
        const { error: updateError } = await supabase
          .from('properties')
          .update({ tags: selectedTags })
          .eq('id', property.id);
        
        if (updateError) {
          console.error(`❌ Erreur lors de la mise à jour de ${property.city}:`, updateError);
        }
      }
    }
    
    console.log('✅ Tags ajoutés avec succès aux propriétés!');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

// Exécuter le script
addTagsToProperties();
