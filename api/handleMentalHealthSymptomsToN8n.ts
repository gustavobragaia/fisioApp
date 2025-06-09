import { User, MentalHealthSymptoms, Triagem } from '../types/supabase';
import { supabase } from '../lib/supabase';

// verify if emulator is with wifi active
const API_URL = 'https://fisioapplesgo.app.n8n.cloud';

const handleMentalHealthSymptomsToN8n = async(
  comoEstaSentindo: string,
  frequenciaSentimento: string,
  dificuldadeFrequente: string,
  impactoRotina: string,
  buscouAjuda: string,
  objetivoAlivio: string,
  user?: User // Add user parameter
) => {
  try{
      // console log em todos os estados
      console.log(comoEstaSentindo)
      console.log(frequenciaSentimento)
      console.log(dificuldadeFrequente)
      console.log(impactoRotina)
      console.log(buscouAjuda)
      console.log(objetivoAlivio)
      
      // Only persist data if user is authenticated
      if (user?.id) {
        try {
          // 1. Create triagem record
          const { data: triagemData, error: triagemError } = await supabase
            .from('triagens')
            .insert({
              user_id: user.id,
              type: 'mental',
              status: 'completed'
            })
            .select()
            .single();
            
          if (triagemError) throw triagemError;
          
          // 2. Create mental health symptoms record
          const { error: symptomsError } = await supabase
            .from('mental_health_symptoms')
            .insert({
              triagem_id: triagemData.id,
              como_esta_sentindo: comoEstaSentindo,
              frequencia_sentimento: frequenciaSentimento,
              dificuldade_frequente: dificuldadeFrequente,
              impacto_rotina: impactoRotina,
              buscou_ajuda: buscouAjuda,
              objetivo_alivio: objetivoAlivio
            });
            
          if (symptomsError) throw symptomsError;
          
          console.log('Mental health symptoms data persisted successfully');
        } catch (dbError) {
          console.error('Error persisting mental health symptoms data:', dbError);
          // Continue with n8n integration even if database persistence fails
        }
      }

      // Prepare user data if available
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
              // show all the questions 
              "Tipo da triagem": "saude-mental",
              "Como você está se sentindo hoje?": String(comoEstaSentindo),
              "Com que frequência você sente isso?": String(frequenciaSentimento),
              "Qual destas dificuldades você enfrenta com mais frequência?": String(dificuldadeFrequente),
              "Como isso impacta sua rotina diária?": String(impactoRotina),
              "Você já buscou ajuda anteriormente?": String(buscouAjuda),
              "O que você gostaria de alcançar com o Alívio.com?": String(objetivoAlivio),
              // Include user data
              ...userData
          }),
      });

      // Verifique se a resposta foi bem-sucedida
      if (!apiResponse.ok) {
          throw new Error('Erro na resposta do n8n');
      }

      const data = await apiResponse.json();
          
      // Verifique a estrutura dos dados retornados
      if (data) {
          // Convert the response object to a string representation
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
