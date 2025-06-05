import React from 'react';
import { useRouter } from 'expo-router';
import { createTriagem, saveMentalHealthSymptoms } from '../lib/supabaseUtils';
import colors from '../styles/colors';
import { supabase } from '../lib/supabase';

type MentalHealthHandlerProps = {
  comoEstaSentindo: string;
  frequenciaSentimento: string;
  dificuldadeFrequente: string;
  impactoRotina: string;
  buscouAjuda: string;
  objetivoAlivio: string;
  onSuccess?: (triagemId: string) => void;
  onError?: (error: any) => void;
};

export const handleMentalHealthSubmission = async ({
  comoEstaSentindo,
  frequenciaSentimento,
  dificuldadeFrequente,
  impactoRotina,
  buscouAjuda,
  objetivoAlivio,
  onSuccess,
  onError
}: MentalHealthHandlerProps) => {
  try {
    // First create a triagem record
    // Get current user ID from Supabase auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const { data: triagemData, error: triagemError } = await createTriagem(user.id, 'mental');
    
    if (triagemError || !triagemData) {
      console.error('Error creating triagem:', triagemError);
      onError && onError(triagemError);
      return { success: false, error: triagemError };
    }
    
    // Then save the mental health symptoms
    const { data: symptomsData, error: symptomsError } = await saveMentalHealthSymptoms(
      triagemData.id,
      {
        como_esta_sentindo: comoEstaSentindo,
        frequencia_sentimento: frequenciaSentimento,
        dificuldade_frequente: dificuldadeFrequente,
        impacto_rotina: impactoRotina,
        buscou_ajuda: buscouAjuda,
        objetivo_alivio: objetivoAlivio
      }
    );
    
    if (symptomsError) {
      console.error('Error saving mental health symptoms:', symptomsError);
      onError && onError(symptomsError);
      return { success: false, error: symptomsError };
    }
    
    // Call success callback with triagem ID
    onSuccess && onSuccess(triagemData.id);
    
    return { 
      success: true, 
      triagemId: triagemData.id,
      symptomsData
    };
  } catch (error) {
    console.error('Error in mental health submission:', error);
    onError && onError(error);
    return { success: false, error };
  }
};

// This component can be used to wrap the mental health form
const MentalHealthHandler: React.FC<{
  children: (props: {
    handleSubmit: (data: Omit<MentalHealthHandlerProps, 'onSuccess' | 'onError'>) => Promise<void>;
    isSubmitting: boolean;
  }) => React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = async (data: Omit<MentalHealthHandlerProps, 'onSuccess' | 'onError'>) => {
    setIsSubmitting(true);
    
    try {
      const result = await handleMentalHealthSubmission({
        ...data,
        onSuccess: (triagemId) => {
          // Navigate to results page with triagem ID
          router.push({
            pathname: "/(tabs)/(triagem)/diagnostic-ideal",
            params: {
              type: 'mental',
              triagemId,
              ...data
            }
          });
        },
        onError: (error) => {
          console.error('Error submitting mental health data:', error);
          // Could show an error toast or alert here
        }
      });
      
      console.log('Mental health submission result:', result);
    } catch (error) {
      console.error('Error in mental health submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return <>{children({ handleSubmit, isSubmitting })}</>;
};

export default MentalHealthHandler;
