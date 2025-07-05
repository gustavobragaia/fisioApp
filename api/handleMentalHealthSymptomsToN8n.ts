import { generateMentalHealthExerciseRecommendations } from '../lib/recommendationUtils';
import { supabase } from '../lib/supabase';
import { User } from '../types/supabase';

const API_URL = 'https://fisioapplesgo.app.n8n.cloud';

const handleMentalHealthSymptomsToN8n = async(
  comoEstaSentindo: string,
  frequenciaSentimento: string,
  dificuldadeFrequente: string,
  impactoRotina: string,
  buscouAjuda: string,
  objetivoAlivio: string,
  user?: User
) => {
  try{
      console.log(comoEstaSentindo)
      console.log(frequenciaSentimento)
      console.log(dificuldadeFrequente)
      console.log(impactoRotina)
      console.log(buscouAjuda)
      console.log(objetivoAlivio)

      if (user?.id) {
        try {
          const { data: existingTriagem, error: checkError } = await supabase
            .from('mental_health_symptoms')
            .select('triagem_id, triagens(*)')
            .eq('como_esta_sentindo', comoEstaSentindo)
            .eq('frequencia_sentimento', frequenciaSentimento)
            .eq('dificuldade_frequente', dificuldadeFrequente)
            .eq('impacto_rotina', impactoRotina)
            .eq('buscou_ajuda', buscouAjuda)
            .eq('objetivo_alivio', objetivoAlivio)
            .eq('triagens.user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (checkError) throw checkError;

          let triagemData;

          if (existingTriagem && existingTriagem.length > 0) {
            triagemData = existingTriagem[0].triagens;
            console.log('Using existing triagem:', triagemData);
          } else {
            const { data: newTriagem, error: triagemError } = await supabase
              .from('triagens')
              .insert({
                user_id: user.id,
                type: 'mental',
                status: 'completed'
              })
              .select()
              .single();

            if (triagemError) throw triagemError;

            const { error: symptomsError } = await supabase
              .from('mental_health_symptoms')
              .insert({
                triagem_id: newTriagem.id,
                como_esta_sentindo: comoEstaSentindo,
                frequencia_sentimento: frequenciaSentimento,
                dificuldade_frequente: dificuldadeFrequente,
                impacto_rotina: impactoRotina,
                buscou_ajuda: buscouAjuda,
                objetivo_alivio: objetivoAlivio
              });

            if (symptomsError) throw symptomsError;

            triagemData = newTriagem;
            console.log('Mental health symptoms data persisted successfully');
          }

          try {
            const recommendedExercises = await generateMentalHealthExerciseRecommendations(
              triagemData.id,
              user.id,
              comoEstaSentindo,
              impactoRotina
            );

            console.log(`Generated ${recommendedExercises.length} exercise recommendations`);
          } catch (recError) {
            console.error('Error generating exercise recommendations:', recError);
          }
        } catch (dbError) {
          console.error('Error persisting mental health symptoms data:', dbError);
        }
      }

      const userData = user ? {
        "ID do usuário": user.id,
        "Nome": user.name,
        "Email": user.email,
        "CPF": user.cpf || 'Não informado',
        "Empresa": user.empresa || 'Não informado',
        "Data de cadastro": new Date(user.created_at).toLocaleDateString('pt-BR')
      } : {
        "ID do usuário": "Não autenticado",
        "Nome": "Usuário não autenticado",
        "Email": "Não informado"
      };

      const apiResponse = await fetch(`${API_URL}/webhook-test/send-symtoms`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "Tipo da triagem": "saude-mental",
              "Como você está se sentindo hoje?": String(comoEstaSentindo),
              "Com que frequência você sente isso?": String(frequenciaSentimento),
              "Qual destas dificuldades você enfrenta com mais frequência?": String(dificuldadeFrequente),
              "Como isso impacta sua rotina diária?": String(impactoRotina),
              "Você já buscou ajuda anteriormente?": String(buscouAjuda),
              "O que você gostaria de alcançar com o Alívio.com?": String(objetivoAlivio),
              ...userData
          }),
      });

      if (!apiResponse.ok) {
          throw new Error('Erro na resposta do n8n');
      }

      const data = await apiResponse.json();

      if (data) {
          return JSON.stringify(data);
      } else {
          return 'Resposta inválida do n8n';
      }
  }
  catch(error){
      console.log(error);
      return 'Erro ao enviar dados';
  }
}

export default handleMentalHealthSymptomsToN8n;
