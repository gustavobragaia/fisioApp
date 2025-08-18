import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

// Get Supabase URL and keys from environment variables
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl || '';
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey || '';
const supabaseServiceKey = Constants.expoConfig?.extra?.supabaseServiceKey || '';

// Validate that we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase configuration. Please check your app.config.js file.');
}

// For service role operations (admin access), we need to validate service key
if (!supabaseServiceKey) {
  console.warn('Missing Supabase service key. Some admin operations may fail.');
}

// Regular client with anonymous key (for authenticated users)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
