import { supabase } from './supabase';
import { Exercise } from './exerciseUtils';
import colors from '../styles/colors';

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
    // For mental health, we'll focus on exercises that help with relaxation and stress relief
    // These are typically in the "Alongamento" and "Aquecimento" categories
    
    // Select appropriate exercises based on mental state and impact level
    const isHighImpact = isHighImpactLevel(impactLevel);
    
    let exerciseQuery = supabase
      .from('exercises')
      .select('*')
      .in('group_type', ['Alongamento', 'Aquecimento'])
      .eq('is_published', true);
    
    if (isHighImpact) {
      // For high impact, focus on beginner-friendly exercises
      exerciseQuery = exerciseQuery.eq('difficulty', 'Iniciante');
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
    
    // Limit to a reasonable number of exercises (max 5)
    const selectedExerciseIds = exercises.map(ex => ex.id).slice(0, 5);
    
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
 * Helper function to map pain location to anatomical region
 */
const mapPainLocationToRegion = (painLocation: string): string => {
  // Map common pain locations to our anatomical regions
  const locationMap: Record<string, string> = {
    'pé': 'Tornozelos e Pés',
    'tornozelo': 'Tornozelos e Pés',
    'joelho': 'Joelhos',
    'quadril': 'Quadril',
    'lombar': 'Coluna Lombar',
    'costas baixas': 'Coluna Lombar',
    'costas': 'Coluna Torácica',
    'torácica': 'Coluna Torácica',
    'pescoço': 'Coluna Cervical',
    'cervical': 'Coluna Cervical',
    'ombro': 'Ombros',
    'cotovelo': 'Cotovelos',
    'punho': 'Punhos e Mãos',
    'mão': 'Punhos e Mãos'
  };
  
  // Try to find a match in our map
  const lowerPainLocation = painLocation.toLowerCase();
  for (const [key, value] of Object.entries(locationMap)) {
    if (lowerPainLocation.includes(key)) {
      return value;
    }
  }
  
  // Default to a common region if no match found
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
