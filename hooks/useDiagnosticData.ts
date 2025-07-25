import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';

export const useDiagnosticData = (type: 'pain' | 'mental', triagemId?: string) => {
  const { user } = useAuth();

  const userQuery = useQuery({
    queryKey: ['user', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      return data.user;
    },
    enabled: !!user?.id,
  });

  const triagemQuery = useQuery({
    queryKey: ['triagem', user?.id, type, triagemId],
    queryFn: async () => {
      if (!user?.id) throw new Error('Usuário não autenticado');

      if (triagemId) return triagemId;

      const { data: triagens, error } = await supabase
        .from('triagens')
        .select('id')
        .eq('user_id', user.id)
        .eq('type', type)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!triagens || triagens.length === 0) {
        throw new Error('Nenhuma triagem encontrada');
      }

      return triagens[0].id;
    },
    enabled: !!user?.id,
  });

  const exercisesQuery = useQuery({
    queryKey: ['user-exercises', user?.id, triagemQuery.data],
    queryFn: async () => {
      if (!user?.id || !triagemQuery.data) {
        throw new Error('Dados insuficientes para buscar exercícios');
      }

      const { data: userExercises, error: userExercisesError } = await supabase
        .from('user_exercises')
        .select('exercise_id')
        .eq('user_id', user.id)
        .eq('triagem_id', triagemQuery.data);

      if (userExercisesError) throw userExercisesError;
      if (!userExercises || userExercises.length === 0) {
        return [];
      }

      const exerciseIds = userExercises.map((ue) => ue.exercise_id);
      const { data: exercises, error: exercisesError } = await supabase
        .from('exercises')
        .select('*')
        .in('id', exerciseIds);

      if (exercisesError) throw exercisesError;

      return exercises || [];
    },
    enabled: !!user?.id && !!triagemQuery.data,
  });

  return {
    user: userQuery.data,
    triagemId: triagemQuery.data,
    exercises: exercisesQuery.data || [],
    isLoading: userQuery.isLoading || triagemQuery.isLoading || exercisesQuery.isLoading,
    isError: userQuery.isError || triagemQuery.isError || exercisesQuery.isError,
    error: userQuery.error || triagemQuery.error || exercisesQuery.error,
  };
};
