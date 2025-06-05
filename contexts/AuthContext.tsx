import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { User } from '../types/supabase';
import { 
  signIn, 
  signUp, 
  signOut, 
  getCurrentUser, 
  signUpWithPhone,
  signInWithMagicLink,
  signInWithSmsOtp,
  verifySmsOtp,
  signInWithOAuth,
  resetPassword,
  updateUser
} from '../lib/supabaseUtils';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, cpf?: string, empresa?: string) => Promise<{ error: any }>;
  signUpWithPhone: (phone: string, password: string, name: string, empresa?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithMagicLink: (email: string) => Promise<{ error: any }>;
  signInWithSmsOtp: (phone: string) => Promise<{ error: any }>;
  verifySmsOtp: (phone: string, token: string) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'facebook' | 'github' | 'gitlab' | 'bitbucket') => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateUserAuth: (updates: { email?: string; password?: string; data?: object }) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session) {
          // Get user profile data
          const { profile } = await getCurrentUser();
          setUser(profile);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        setSession(session);
        
        if (session) {
          // Get user profile data when session changes
          const { profile } = await getCurrentUser();
          setUser(profile);
        } else {
          setUser(null);
        }
      }
    );

    // Clean up subscription
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Auth methods
  const handleSignUp = async (email: string, password: string, name: string, cpf?: string, empresa?: string) => {
    setIsLoading(true);
    const result = await signUp(email, password, name, cpf, empresa);
    setIsLoading(false);
    return result;
  };

  const handleSignUpWithPhone = async (phone: string, password: string, name: string, empresa?: string) => {
    setIsLoading(true);
    const result = await signUpWithPhone(phone, password, name, empresa);
    setIsLoading(false);
    return result;
  };

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await signIn(email, password);
    setIsLoading(false);
    return result;
  };

  const handleSignInWithMagicLink = async (email: string) => {
    setIsLoading(true);
    const result = await signInWithMagicLink(email);
    setIsLoading(false);
    return result;
  };

  const handleSignInWithSmsOtp = async (phone: string) => {
    setIsLoading(true);
    const result = await signInWithSmsOtp(phone);
    setIsLoading(false);
    return result;
  };

  const handleVerifySmsOtp = async (phone: string, token: string) => {
    setIsLoading(true);
    const result = await verifySmsOtp(phone, token);
    setIsLoading(false);
    return result;
  };

  const handleSignInWithOAuth = async (provider: 'google' | 'facebook' | 'github' | 'gitlab' | 'bitbucket') => {
    setIsLoading(true);
    const result = await signInWithOAuth(provider);
    setIsLoading(false);
    return result;
  };

  const handleResetPassword = async (email: string) => {
    setIsLoading(true);
    const result = await resetPassword(email);
    setIsLoading(false);
    return result;
  };

  const handleUpdateUser = async (updates: { email?: string; password?: string; data?: object }) => {
    setIsLoading(true);
    const result = await updateUser(updates);
    setIsLoading(false);
    return result;
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    const result = await signOut();
    setIsLoading(false);
    return result;
  };

  const value = {
    session,
    user,
    isLoading,
    signUp: handleSignUp,
    signUpWithPhone: handleSignUpWithPhone,
    signIn: handleSignIn,
    signInWithMagicLink: handleSignInWithMagicLink,
    signInWithSmsOtp: handleSignInWithSmsOtp,
    verifySmsOtp: handleVerifySmsOtp,
    signInWithOAuth: handleSignInWithOAuth,
    resetPassword: handleResetPassword,
    updateUserAuth: handleUpdateUser,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
