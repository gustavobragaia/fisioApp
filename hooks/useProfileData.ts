import { useAuth } from '@/contexts/AuthContext';
import { getUserTriagens } from '@/lib/supabaseUtils';
import { DiagnosticItem } from '@/types/profile';
import { Triagem } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

export const useProfileData = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['profile-data', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');

      const { data: triagens, error } = await getUserTriagens(String(user.id));

      if (error) {
        throw new Error(`Error fetching triagens: ${String(error)}`);
      }

      const diagnostics: DiagnosticItem[] = (triagens || []).map((triagem: Triagem) => ({
        id: triagem.id,
        date: new Date(triagem.created_at).toLocaleDateString('pt-BR'),
        title: `Diagnóstico de ${triagem.type === 'pain' ?
          (triagem.location ? triagem.location.charAt(0).toUpperCase() + triagem.location.slice(1) : 'Dor') :
          'Saúde Mental'}`,
        status: triagem.status === 'completed' ? 'Concluído' : 'Em andamento',
        // painLevel: triagem.pain_level,
      }));

      return {
        userProfile: user,
        diagnosticHistory: diagnostics,
      };
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
