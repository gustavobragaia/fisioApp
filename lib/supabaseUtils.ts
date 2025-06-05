import { supabase } from './supabase';
import { User, Triagem, PainSymptoms, Exercise, UserExercise } from '../types/supabase';

// Authentication functions
export const signUp = async (email: string, password: string, name: string, cpf?: string, empresa?: string) => {
  try {
    // 1. Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    
    if (!authData.user) throw new Error('No user returned from sign up');

    // 2. Insert user profile data
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        name,
        cpf,
        empresa,
      });

    if (profileError) throw profileError;

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { user: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { session: data.session, user: data.user, error: null };
  } catch (error) {
    console.error('Error signing in:', error);
    return { session: null, user: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!user) return { user: null, profile: null, error: null };

    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;

    return { user, profile, error: null };
  } catch (error) {
    console.error('Error getting current user:', error);
    return { user: null, profile: null, error };
  }
};

// User profile functions
export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { data: null, error };
  }
};

// Triagem functions
export const createTriagem = async (userId: string, type: 'pain' | 'mental', location?: string) => {
  try {
    const { data, error } = await supabase
      .from('triagens')
      .insert({
        user_id: userId,
        type,
        status: 'in_progress',
        location,
        progress: { completed: 0, total: 0 }
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error creating triagem:', error);
    return { data: null, error };
  }
};

export const updateTriagemStatus = async (triagemId: string, status: 'in_progress' | 'completed', progress?: { completed: number, total: number }) => {
  try {
    const updates: Partial<Triagem> = { status };
    if (progress) updates.progress = progress;

    const { data, error } = await supabase
      .from('triagens')
      .update(updates)
      .eq('id', triagemId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error updating triagem status:', error);
    return { data: null, error };
  }
};

export const getUserTriagens = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('triagens')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error getting user triagens:', error);
    return { data: null, error };
  }
};

// Pain symptoms functions
export const savePainSymptoms = async (
  triagemId: string,
  symptoms: {
    dor_com_mais_freq: string;
    dor_aparece_em_qual_situacao: string;
    tipo_de_dor: string;
    quando_dor_comecou: string;
    nivel_de_dor: string;
    como_afeta_minha_vida: string;
    o_que_gostaria_de_alcancar_com_alivio: string;
  }
) => {
  try {
    const { data, error } = await supabase
      .from('pain_symptoms')
      .insert({
        triagem_id: triagemId,
        ...symptoms
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error saving pain symptoms:', error);
    return { data: null, error };
  }
};

// Mental health symptoms functions
export const saveMentalHealthSymptoms = async (
  triagemId: string,
  symptoms: {
    como_esta_sentindo: string;
    frequencia_sentimento: string;
    dificuldade_frequente: string;
    impacto_rotina: string;
    buscou_ajuda: string;
    objetivo_alivio: string;
  }
) => {
  try {
    const { data, error } = await supabase
      .from('mental_health_symptoms')
      .insert({
        triagem_id: triagemId,
        ...symptoms
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error saving mental health symptoms:', error);
    return { data: null, error };
  }
};

// Exercise functions
export const getExercisesByGroup = async (groupId: string) => {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('group_id', groupId);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error getting exercises by group:', error);
    return { data: null, error };
  }
};

export const trackExerciseCompletion = async (userId: string, exerciseId: string, triagemId?: string, feedback?: string) => {
  try {
    const { data, error } = await supabase
      .from('user_exercises')
      .insert({
        user_id: userId,
        exercise_id: exerciseId,
        triagem_id: triagemId,
        completed: true,
        feedback,
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error tracking exercise completion:', error);
    return { data: null, error };
  }
};

export const getUserExerciseStats = async (userId: string) => {
  try {
    // Get total completed exercises
    const { count: exercisesDone, error: countError } = await supabase
      .from('user_exercises')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('completed', true);

    if (countError) throw countError;

    // Get total triagens
    const { count: triagemCount, error: triagemError } = await supabase
      .from('triagens')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (triagemError) throw triagemError;

    // Get latest triagem date
    const { data: latestTriagem, error: latestError } = await supabase
      .from('triagens')
      .select('created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (latestError && latestError.code !== 'PGRST116') throw latestError;

    // Calculate consecutive days (simplified version)
    // In a real app, you'd need a more sophisticated algorithm
    const consecutiveDays = 0; // Placeholder

    return { 
      data: {
        exercisesDone: exercisesDone || 0,
        triagemCount: triagemCount || 0,
        consecutiveDays,
        lastTriagem: latestTriagem?.created_at
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error getting user exercise stats:', error);
    return { data: null, error };
  }
};
