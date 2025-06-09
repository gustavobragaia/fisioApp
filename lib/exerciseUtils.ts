import { supabase } from './supabase';
import colors from '../styles/colors';

export type ExerciseRegion = {
  id: string;
  name: string;
  created_at: string;
};

export type ExerciseGroupType = 
  | 'Alívio imediato da dor'
  | 'Alongamento'
  | 'Aquecimento'
  | 'Fortalecimento muscular';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  group_id: string;
  video_url: string;
  thumbnail_url?: string;
  duration: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  steps: any[];
  region_id?: string;
  group_type?: ExerciseGroupType;
  is_published?: boolean;
  created_at: string;
};

export type ExerciseWithRegion = Exercise & {
  region: ExerciseRegion;
};

/**
 * Fetch all available exercise regions
 */
export const fetchExerciseRegions = async (): Promise<ExerciseRegion[]> => {
  const { data, error } = await supabase
    .from('exercise_regions')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching exercise regions:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Fetch exercises filtered by region and/or group type
 */
export const fetchExercises = async ({
  regionId,
  groupType,
  difficulty,
  isPublished = true
}: {
  regionId?: string;
  groupType?: ExerciseGroupType;
  difficulty?: string;
  isPublished?: boolean;
}): Promise<Exercise[]> => {
  let query = supabase
    .from('exercises')
    .select(`
      *,
      region:exercise_regions(*)
    `)
    .eq('is_published', isPublished);
  
  if (regionId) {
    query = query.eq('region_id', regionId);
  }
  
  if (groupType) {
    query = query.eq('group_type', groupType);
  }
  
  if (difficulty) {
    query = query.eq('difficulty', difficulty);
  }
  
  const { data, error } = await query.order('name');
  
  if (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
  
  return data || [];
};

/**
 * Get exercise by ID with region information
 */
export const getExerciseById = async (id: string): Promise<ExerciseWithRegion | null> => {
  const { data, error } = await supabase
    .from('exercises')
    .select(`
      *,
      region:exercise_regions(*)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching exercise:', error);
    return null;
  }
  
  return data;
};

/**
 * Get color for exercise group type
 */
export const getGroupTypeColor = (groupType?: ExerciseGroupType): string => {
  switch (groupType) {
    case 'Alívio imediato da dor':
      return colors.light.deepBlue;
    case 'Alongamento':
      return colors.light.lightBlue;
    case 'Aquecimento':
      return colors.light.seafoam;
    case 'Fortalecimento muscular':
      return colors.light.deepBlueBorder;
    default:
      return colors.textPrimary;
  }
};
