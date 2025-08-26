import { supabase } from './supabase';

export interface UserUpdateData {
  name?: string;
  email?: string;
  age?: string; // Date string format: "YYYY-MM-DD"
  work_sector?: string;
  gender?: string;
  empresa?: string;
  branch_of_empresa?: string;
  cpf?: string;
  is_first_access?: boolean;
}

export const updateUserProfile = async (userId: string, updates: UserUpdateData) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select();

  if (error) throw error;
  return data?.[0];
};

// Helper function to format date to YYYY-MM-DD
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};
