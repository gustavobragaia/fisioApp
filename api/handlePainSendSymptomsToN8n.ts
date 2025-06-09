
import { User, PainSymptoms, Triagem } from '../types/supabase';
import { supabase } from '../lib/supabase';

// verify if emulator is with wifi active
const API_URL = 'https://fisioapplesgo.app.n8n.cloud';

const handlePainSendSymptomsToN8n = async(
  dorComMaisFreq: string,
  dorApareceEmQualSituacao: string,
  tipoDeDor: string,
  quandoDorComecou: string,
  nivelDeDor: string,
  comoAfetaMinhaVida: string,
  oQueGostariaDeAlcançarComAlivio: string,
  user?: User // Add user parameter
) => {
  try{
      //console log em todos os estados
      console.log(dorComMaisFreq)
      console.log(dorApareceEmQualSituacao)
      console.log(tipoDeDor)
      console.log(quandoDorComecou)
      console.log(nivelDeDor)
      console.log(comoAfetaMinhaVida)
      console.log(oQueGostariaDeAlcançarComAlivio)
      
      // Only persist data if user is authenticated
      if (user?.id) {
        try {
          // 1. Create triagem record
          const { data: triagemData, error: triagemError } = await supabase
            .from('triagens')
            .insert({
              user_id: user.id,
              type: 'pain',
              status: 'completed'
            })
            .select()
            .single();
            
          if (triagemError) throw triagemError;
          
          // 2. Create pain symptoms record
          const { error: symptomsError } = await supabase
            .from('pain_symptoms')
            .insert({
              triagem_id: triagemData.id,
              dor_com_mais_freq: dorComMaisFreq,
              dor_aparece_em_qual_situacao: dorApareceEmQualSituacao,
              tipo_de_dor: tipoDeDor,
              quando_dor_comecou: quandoDorComecou,
              nivel_de_dor: nivelDeDor,
              como_afeta_minha_vida: comoAfetaMinhaVida,
              o_que_gostaria_de_alcancar_com_alivio: oQueGostariaDeAlcançarComAlivio
            });
            
          if (symptomsError) throw symptomsError;
          
          console.log('Pain symptoms data persisted successfully');
        } catch (dbError) {
          console.error('Error persisting pain symptoms data:', dbError);
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
              "Tipo da triagem": "dor",
              "Essa dor é mais frequente no": String(dorComMaisFreq),  // Garantir que é uma string
              "A dor aparece mais na situação": String(dorApareceEmQualSituacao),  // Garantir que é uma string
              "É uma dor do tipo": String(tipoDeDor),  // Garantir que é uma string
              "A dor começou faz": String(quandoDorComecou),  // Garantir que é uma string
              "O nível da dor é": String(nivelDeDor),  // Garantir que é uma string   
              "Como essa dor afeta sua vida?": String(comoAfetaMinhaVida),  // Garantir que é uma string
              "O que você gostaria de alcançar com o Alívio.com?": String(oQueGostariaDeAlcançarComAlivio),  // Garantir que é uma string
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

export default handlePainSendSymptomsToN8n;
