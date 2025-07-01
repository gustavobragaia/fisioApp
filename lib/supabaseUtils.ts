import { Triagem, User } from '../types/supabase';
import { supabase, supabaseAdmin } from './supabase';

// Authentication functions
export const signUp = async (email: string, password: string, name: string, cpf?: string, empresa?: string) => {
  try {
    // Sign up with Supabase Auth and include user metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          cpf,
          empresa
        }
      }
    });

    if (authError) throw authError;
    
    if (!authData.user) throw new Error('No user returned from sign up');

    // The database trigger should handle creating the user profile
    // If you want to ensure the profile exists, you can check/create it here
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // If the user profile doesn't exist (trigger didn't work), create it manually
    // Use supabaseAdmin with service role to bypass RLS policies
    if (fetchError || !existingUser) {
      const { error: profileError } = await supabaseAdmin
        .from('users')
        .insert({
          id: authData.user.id,
          email,
          name,
          cpf,
          empresa,
        });

      if (profileError) throw profileError;
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Error signing up:', error);
    return { user: null, error };
  }
};

// Phone number sign up
export const signUpWithPhone = async (phone: string, password: string, name: string, empresa?: string) => {
  try {
    // Sign up with Supabase Auth using phone and include user metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      phone,
      password,
      options: {
        data: {
          name,
          empresa
        }
      }
    });

    if (authError) throw authError;
    
    if (!authData.user) throw new Error('No user returned from sign up');

    // The database trigger should handle creating the user profile
    // If you want to ensure the profile exists, you can check/create it here
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // If the user profile doesn't exist (trigger didn't work), create it manually
    // Use supabaseAdmin with service role to bypass RLS policies
    if (fetchError || !existingUser) {
      const { error: profileError } = await supabaseAdmin
        .from('users')
        .insert({
          id: authData.user.id,
          phone,
          name,
          empresa,
        });

      if (profileError) throw profileError;
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Error signing up with phone:', error);
    return { user: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data: { session, user: authUser }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authUser) throw authError || new Error('Usuário não encontrado');

    // Get user profile from our users table
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (profileError) throw profileError;

    // Log user and session data for debugging
    console.log('Auth User Data:', {
      authUserId: authUser.id,
      authUserEmail: authUser.email
    });
    console.log('Profile Data:', profile);
    console.log('Session Data:', {
      sessionAccessToken: session?.access_token,
      sessionRefreshToken: session?.refresh_token,
      sessionExpiresIn: session?.expires_in
    });

    return { 
      session,
      user: profile,
      error: null 
    };
  } catch (error) {
    console.error('Error signing in:', error);
    return { 
      session: null,
      user: null,
      error: error instanceof Error ? error : new Error('Erro desconhecido')
    };
  }
};

// Sign in with magic link (passwordless)
export const signInWithMagicLink = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error sending magic link:', error);
    return { data: null, error };
  }
};

// Sign in with SMS OTP
export const signInWithSmsOtp = async (phone: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error sending SMS OTP:', error);
    return { data: null, error };
  }
};

// Verify SMS OTP
export const verifySmsOtp = async (phone: string, token: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    });

    if (error) throw error;

    return { session: data.session, user: data.user, error: null };
  } catch (error) {
    console.error('Error verifying SMS OTP:', error);
    return { session: null, user: null, error };
  }
};

// Sign in with OAuth provider
export const signInWithOAuth = async (provider: 'google' | 'facebook' | 'github' | 'gitlab' | 'bitbucket') => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error(`Error signing in with ${provider}:`, error);
    return { data: null, error };
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error resetting password:', error);
    return { data: null, error };
  }
};

// Update user
export const updateUser = async (updates: { email?: string; password?: string; data?: object }) => {
  try {
    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) throw error;

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return { user: null, error };
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

// Admin function to invite users (requires service_role_key)
export const inviteUser = async (email: string) => {
  try {
    // Note: This requires the service_role_key and should only be used server-side
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('Error inviting user:', error);
    return { data: null, error };
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
