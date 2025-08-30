const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://localhost:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDatabase() {
  console.log('🔍 Test de connexion à Supabase...');
  
  try {
    // Test 1: Vérifier la connexion
    const { data: testData, error: testError } = await supabase
      .from('properties')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Erreur de connexion:', testError);
      return;
    }
    
    console.log('✅ Connexion réussie');
    
    // Test 2: Récupérer toutes les propriétés
    const { data: allProperties, error: allError } = await supabase
      .from('properties')
      .select('*');
    
    if (allError) {
      console.error('❌ Erreur lors de la récupération de toutes les propriétés:', allError);
      return;
    }
    
    console.log(`📊 Nombre total de propriétés: ${allProperties.length}`);
    
    // Test 3: Récupérer les propriétés disponibles et approuvées
    const { data: availableProperties, error: availableError } = await supabase
      .from('properties')
      .select('*')
      .eq('is_available', true)
      .eq('is_approved', true);
    
    if (availableError) {
      console.error('❌ Erreur lors de la récupération des propriétés disponibles:', availableError);
      return;
    }
    
    console.log(`✅ Nombre de propriétés disponibles et approuvées: ${availableProperties.length}`);
    
    // Afficher les détails des propriétés
    availableProperties.forEach((property, index) => {
      console.log(`${index + 1}. ${property.title} (${property.city}) - Prix: ${property.price}€`);
    });
    
    // Test 4: Vérifier les propriétés par ville
    const cities = ['Marrakech', 'Casablanca', 'Fès', 'Rabat', 'Agadir'];
    for (const city of cities) {
      const { data: cityProperties, error: cityError } = await supabase
        .from('properties')
        .select('*')
        .eq('city', city)
        .eq('is_available', true)
        .eq('is_approved', true);
      
      if (!cityError) {
        console.log(`🏙️  ${city}: ${cityProperties.length} propriétés`);
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error);
  }
}

testDatabase();
