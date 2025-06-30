import { supabase } from '../lib/supabase';

/**
 * Diagnostic script to check exercise regions and exercises in the database
 */
async function diagnoseExercises() {
  console.log('Starting exercise database diagnosis...');
  
  // 1. Check exercise regions
  console.log('\n--- EXERCISE REGIONS ---');
  const { data: regions, error: regionsError } = await supabase
    .from('exercise_regions')
    .select('*');
    
  if (regionsError) {
    console.error('Error fetching exercise regions:', regionsError);
  } else {
    console.log(`Found ${regions.length} exercise regions:`);
    regions.forEach(region => {
      console.log(`- ID: ${region.id}, Name: "${region.name}"`);
    });
  }
  
  // 2. Check exercises
  console.log('\n--- EXERCISES ---');
  const { data: exercises, error: exercisesError } = await supabase
    .from('exercises')
    .select('*');
    
  if (exercisesError) {
    console.error('Error fetching exercises:', exercisesError);
  } else {
    console.log(`Found ${exercises.length} exercises`);
    
    // Group exercises by region
    const exercisesByRegion: Record<string, any[]> = {};
    exercises.forEach(exercise => {
      if (!exercisesByRegion[exercise.region_id]) {
        exercisesByRegion[exercise.region_id] = [];
      }
      exercisesByRegion[exercise.region_id].push(exercise);
    });
    
    // Show exercise counts by region
    console.log('\n--- EXERCISES BY REGION ---');
    for (const regionId in exercisesByRegion) {
      const regionExercises = exercisesByRegion[regionId];
      const regionName = regions.find(r => r.id === regionId)?.name || 'Unknown Region';
      console.log(`Region "${regionName}" (${regionId}): ${regionExercises.length} exercises`);
      
      // Group by group_type and difficulty
      const byGroupType: Record<string, number> = {};
      const byDifficulty: Record<string, number> = {};
      
      regionExercises.forEach(ex => {
        byGroupType[ex.group_type] = (byGroupType[ex.group_type] || 0) + 1;
        byDifficulty[ex.difficulty] = (byDifficulty[ex.difficulty] || 0) + 1;
      });
      
      console.log('  Group Types:');
      Object.entries(byGroupType).forEach(([type, count]) => {
        console.log(`  - ${type}: ${count} exercises`);
      });
      
      console.log('  Difficulties:');
      Object.entries(byDifficulty).forEach(([diff, count]) => {
        console.log(`  - ${diff}: ${count} exercises`);
      });
    }
    
    // Check for orphaned exercises (no valid region)
    const orphanedExercises = exercises.filter(ex => 
      !regions.some(r => r.id === ex.region_id)
    );
    
    if (orphanedExercises.length > 0) {
      console.log('\n--- ORPHANED EXERCISES ---');
      console.log(`Found ${orphanedExercises.length} exercises with no valid region`);
      orphanedExercises.forEach(ex => {
        console.log(`- ${ex.name} (ID: ${ex.id}, Region ID: ${ex.region_id})`);
      });
    }
  }
  
  // 3. Test a specific pain location mapping
  console.log('\n--- TESTING PAIN LOCATION MAPPING ---');
  const testLocations = ['pescoco', 'ombros', 'colunaToracica', 'lombar', 'quadril', 'joelhos', 'tornozelos', 'cotovelos', 'punhos'];
  
  for (const location of testLocations) {
    const mappedRegion = mapPainLocationToRegion(location);
    console.log(`Pain location "${location}" maps to region "${mappedRegion}"`);
    
    // Check if this region exists in the database
    const regionExists = regions?.some(r => 
      r.name.toLowerCase().includes(mappedRegion.toLowerCase())
    );
    
    console.log(`Region "${mappedRegion}" exists in database: ${regionExists ? 'YES' : 'NO'}`);
    
    if (regionExists) {
      const matchingRegion = regions?.find(r => 
        r.name.toLowerCase().includes(mappedRegion.toLowerCase())
      );
      
      if (matchingRegion) {
        const regionExercises = exercises?.filter(ex => ex.region_id === matchingRegion.id) || [];
        console.log(`Found ${regionExercises.length} exercises for region "${matchingRegion.name}"`);
      }
    }
  }
}

/**
 * Helper function to map pain location to anatomical region
 */
const mapPainLocationToRegion = (painLocation: string): string => {
  // Direct mapping from UI values to database region names
  const locationMap: Record<string, string> = {
    // UI values to database region names
    'pescoco': 'Pescoço',
    'ombros': 'Ombros',
    'colunaToracica': 'Coluna Torácica',
    'lombar': 'Coluna Lombar',
    'quadril': 'Quadril',
    'joelhos': 'Joelhos',
    'tornozelos': 'Tornozelos e Pés',
    'cotovelos': 'Cotovelos',
    'punhos': 'Punhos e Mãos',
    
    // Also keep the partial matching for flexibility
    'pé': 'Tornozelos e Pés',
    'tornozelo': 'Tornozelos e Pés',
    'joelho': 'Joelhos',
    'costas baixas': 'Coluna Lombar',
    'costas': 'Coluna Torácica',
    'torácica': 'Coluna Torácica',
    'pescoço': 'Pescoço',
    'cervical': 'Pescoço',
    'ombro': 'Ombros',
    'cotovelo': 'Cotovelos',
    'punho': 'Punhos e Mãos',
    'mão': 'Punhos e Mãos'
  };
  
  // First try exact match with UI values
  if (locationMap[painLocation]) {
    return locationMap[painLocation];
  }
  
  // Then try partial matching for flexibility
  const lowerPainLocation = painLocation.toLowerCase();
  for (const [key, value] of Object.entries(locationMap)) {
    if (lowerPainLocation.includes(key)) {
      return value;
    }
  }
  
  // Default to a common region if no match found
  console.log(`No region mapping found for: ${painLocation}, defaulting to Coluna Lombar`);
  return 'Coluna Lombar';
};

// Run the diagnostic
diagnoseExercises().catch(console.error);
