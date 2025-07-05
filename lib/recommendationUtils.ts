import { Exercise } from './exerciseUtils';
import { supabase } from './supabase';

/**
 * Generate exercise recommendations based on pain symptoms
 */
export const generatePainExerciseRecommendations = async (
  triagemId: string,
  userId: string,
  painLocation: string,
  painLevel: string
): Promise<string[]> => {
  try {
    // 1. Find appropriate region based on pain location
    let regionQuery = supabase
      .from('exercise_regions')
      .select('id')
      .ilike('name', `%${mapPainLocationToRegion(painLocation)}%`)
      .single();

    const { data: regionData, error: regionError } = await regionQuery;

    if (regionError) {
      console.error('Error finding region:', regionError);
      throw regionError;
    }

    // 2. Select appropriate exercises based on pain level and region
    // For higher pain levels, focus on relief exercises
    // For lower pain levels, include strengthening exercises
    const isPainHigh = isPainLevelHigh(painLevel);

    let exerciseQuery = supabase
      .from('exercises')
      .select('*')
      .eq('region_id', regionData.id)
      .eq('is_published', true);

    if (isPainHigh) {
      // For high pain, focus on immediate relief and gentle exercises
      exerciseQuery = exerciseQuery.in('group_type', ['Alívio imediato da dor', 'Alongamento'])
        .eq('difficulty', 'Iniciante');
    } else {
      // For lower pain, include more variety
      exerciseQuery = exerciseQuery.in('group_type',
        ['Alívio imediato da dor', 'Alongamento', 'Aquecimento', 'Fortalecimento muscular']);
    }

    const { data: exercises, error: exercisesError } = await exerciseQuery;

    if (exercisesError) {
      console.error('Error finding exercises:', exercisesError);
      throw exercisesError;
    }

    if (!exercises || exercises.length === 0) {
      console.warn('No exercises found for the criteria');
      return [];
    }

    // 3. Create user_exercises entries for the recommendations
    const exerciseIds = exercises.map(ex => ex.id);

    // Limit to a reasonable number of exercises (max 8)
    const selectedExerciseIds = exerciseIds.slice(0, 8);

    // Create entries in user_exercises table
    const userExercises = selectedExerciseIds.map(exerciseId => ({
      user_id: userId,
      exercise_id: exerciseId,
      triagem_id: triagemId,
      completed: false
    }));

    const { error: insertError } = await supabase
      .from('user_exercises')
      .insert(userExercises);

    if (insertError) {
      console.error('Error creating user exercises:', insertError);
      throw insertError;
    }

    return selectedExerciseIds;

  } catch (error) {
    console.error('Error generating exercise recommendations:', error);
    throw error;
  }
};

/**
 * Generate exercise recommendations based on mental health symptoms
 */
export const generateMentalHealthExerciseRecommendations = async (
  triagemId: string,
  userId: string,
  mentalState: string,
  impactLevel: string
): Promise<string[]> => {
  try {
    const { data: existingUserExercises, error: existingError } = await supabase
      .from('user_exercises')
      .select('exercise_id')
      .eq('user_id', userId)
      .eq('triagem_id', triagemId);

    if (existingError) {
      console.error('Error checking existing exercises:', existingError);
      throw existingError;
    }

    if (existingUserExercises && existingUserExercises.length > 0) {
      console.log(`Found ${existingUserExercises.length} existing exercises for triagem ${triagemId}`);
      return existingUserExercises.map(ex => ex.exercise_id);
    }

    const groupType = mapMentalStateToGroupType(mentalState);

    const isHighImpact = isHighImpactLevel(impactLevel);

    let exerciseQuery = supabase
      .from('exercises')
      .select('*')
      .eq('group_type', groupType)
      .eq('is_published', true);

    if (isHighImpact) {
      exerciseQuery = exerciseQuery.eq('difficulty', 'Iniciante');
    }

    const { data: exercises, error: exercisesError } = await exerciseQuery;

    if (exercisesError) {
      console.error('Error finding exercises:', exercisesError);
      throw exercisesError;
    }

    let selectedExercises = exercises;

    if (!exercises || exercises.length === 0) {
      console.warn('No specific exercises found for mental state, falling back to general exercises');

      const fallbackQuery = supabase
        .from('exercises')
        .select('*')
        .in('group_type', ['Alongamento', 'Aquecimento', 'Quero manter meu bem-estar'])
        .eq('is_published', true);

      if (isHighImpact) {
        fallbackQuery.eq('difficulty', 'Iniciante');
      }

      const { data: fallbackExercises, error: fallbackError } = await fallbackQuery;

      if (fallbackError) {
        console.error('Error finding fallback exercises:', fallbackError);
        throw fallbackError;
      }

      if (!fallbackExercises || fallbackExercises.length === 0) {
        console.warn('No exercises found for the criteria');
        return [];
      }

      selectedExercises = fallbackExercises;
    }

    const selectedExerciseIds = selectedExercises.map(ex => ex.id).slice(0, 5);

    const userExercises = selectedExerciseIds.map(exerciseId => ({
      user_id: userId,
      exercise_id: exerciseId,
      triagem_id: triagemId,
      completed: false
    }));

    const { error: insertError } = await supabase
      .from('user_exercises')
      .insert(userExercises);

    if (insertError) {
      console.error('Error creating user exercises:', insertError);
      throw insertError;
    }

    console.log(`Successfully created ${selectedExerciseIds.length} user exercises for triagem ${triagemId}`);
    return selectedExerciseIds;

  } catch (error) {
    console.error('Error generating exercise recommendations:', error);
    throw error;
  }
};

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

/**
 * Helper function to determine if pain level is high
 */
const isPainLevelHigh = (painLevel: string): boolean => {
  const highPainKeywords = ['intenso', 'intensa', 'forte', 'severa', 'severo', 'insuportável', '8', '9', '10'];
  const lowerPainLevel = painLevel.toLowerCase();

  return highPainKeywords.some(keyword => lowerPainLevel.includes(keyword));
};

/**
 * Helper function to determine if mental health impact is high
 */
const isHighImpactLevel = (impactLevel: string): boolean => {
  const highImpactKeywords = ['muito', 'bastante', 'severamente', 'completamente', 'totalmente'];
  const lowerImpactLevel = impactLevel.toLowerCase();

  return highImpactKeywords.some(keyword => lowerImpactLevel.includes(keyword));
};

/**
 * Helper function to map mental state to exercise group type
 */
const mapMentalStateToGroupType = (mentalState: string): string => {
  // Direct mapping from form values to exercise group types
  const formValueToGroupType: Record<string, string> = {
    // Main feeling options from the form
    'ansioso': 'Ansioso(a)',
    'estressado': 'Estressado(a)',
    'dificuldadeDormir': 'Com dificuldade para dormir',
    'triste': 'Triste ou desanimado(a)',
    'irritado': 'Irritado(a)',
    'manterBemEstar': 'Quero manter meu bem-estar',

    // Additional form values related to objectives
    'reduzirAnsiedade': 'Ansioso(a)',
    'dormirMelhor': 'Com dificuldade para dormir',
    'controlarPensamentos': 'Ansioso(a)',
    'melhorarBemEstar': 'Quero manter meu bem-estar',
    'criarRotina': 'Quero manter meu bem-estar',

    // Difficulty values that map to mental states
    'pensamentosAcelerados': 'Ansioso(a)',
    'preocupacoesExcessivas': 'Ansioso(a)',
    'dificuldadeRelaxar': 'Estressado(a)',
    'insonia': 'Com dificuldade para dormir',
    'oscilacoesHumor': 'Triste ou desanimado(a)',
    'esgotamentoEmocional': 'Estressado(a)',

    // Impact values that map to mental states
    'dificultaConcentracao': 'Ansioso(a)',
    'semEnergia': 'Triste ou desanimado(a)',
    'afetaRelacionamentos': 'Irritado(a)',
    'prejudicaSono': 'Com dificuldade para dormir',
    'afetaSaudeFisica': 'Estressado(a)',
    'naoImpacta': 'Quero manter meu bem-estar'
  };

  // Check for direct match from form values
  if (formValueToGroupType[mentalState]) {
    return formValueToGroupType[mentalState];
  }

  // If exact match not found, check for partial matches
  const stateMap: Record<string, string> = {
    // Anxiety related terms
    'ansio': 'Ansioso(a)',
    'ansiedad': 'Ansioso(a)',
    'nervos': 'Ansioso(a)',
    'preocupa': 'Ansioso(a)',
    'tenso': 'Ansioso(a)',

    // Stress related terms
    'stress': 'Estressado(a)',
    'estress': 'Estressado(a)',
    'pressão': 'Estressado(a)',
    'pressao': 'Estressado(a)',
    'cansad': 'Estressado(a)',
    'esgotad': 'Estressado(a)',

    // Sleep related terms
    'dorm': 'Com dificuldade para dormir',
    'insônia': 'Com dificuldade para dormir',
    'insonia': 'Com dificuldade para dormir',
    'sono': 'Com dificuldade para dormir',

    // Sadness related terms
    'triste': 'Triste ou desanimado(a)',
    'desanima': 'Triste ou desanimado(a)',
    'deprimi': 'Triste ou desanimado(a)',
    'melancol': 'Triste ou desanimado(a)',
    'desanim': 'Triste ou desanimado(a)',

    // Irritability related terms
    'irritad': 'Irritado(a)',
    'raiva': 'Irritado(a)',
    'nerv': 'Irritado(a)',
    'impacien': 'Irritado(a)',

    // Well-being related terms
    'bem-estar': 'Quero manter meu bem-estar',
    'bem estar': 'Quero manter meu bem-estar',
    'relaxa': 'Quero manter meu bem-estar',
    'tranquil': 'Quero manter meu bem-estar',
    'equilibr': 'Quero manter meu bem-estar'
  };

  // Try to find a match in our map
  const lowerMentalState = mentalState.toLowerCase();
  for (const [key, value] of Object.entries(stateMap)) {
    if (lowerMentalState.includes(key)) {
      return value;
    }
  }

  // Default to a general well-being if no match found
  return 'Quero manter meu bem-estar';
};

/**
 * Fetch user's recommended exercises from a specific triagem
 */
export const fetchUserRecommendedExercises = async (
  userId: string,
  triagemId?: string
): Promise<Exercise[]> => {
  let query = supabase
    .from('user_exercises')
    .select(`
      *,
      exercise:exercises(
        *,
        region:exercise_regions(*)
      )
    `)
    .eq('user_id', userId);

  if (triagemId) {
    query = query.eq('triagem_id', triagemId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user exercises:', error);
    throw error;
  }

  // Extract the exercise data from the nested structure
  return data?.map(item => item.exercise) || [];
};

/**
 * Mark an exercise as completed
 */
export const markExerciseCompleted = async (
  userId: string,
  exerciseId: string,
  feedback?: string
): Promise<void> => {
  const { error } = await supabase
    .from('user_exercises')
    .update({
      completed: true,
      completion_date: new Date().toISOString(),
      feedback
    })
    .eq('user_id', userId)
    .eq('exercise_id', exerciseId);

  if (error) {
    console.error('Error marking exercise as completed:', error);
    throw error;
  }
};
