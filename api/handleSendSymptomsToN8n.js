const API_URL = 'https://6981-2804-4ec-1102-5249-716e-5224-5dc0-6c78.ngrok-free.app';

const handleSendSymptomsToN8n = async(dorComMaisFreq,dorApareceEmQualSituacao,tipoDeDor,quandoDorComecou,nivelDeDor,comoAfetaMinhaVida) => {
  try{
      //console log em todos os estados
      console.log(dorComMaisFreq)
      console.log(dorApareceEmQualSituacao)
      console.log(tipoDeDor)
      console.log(quandoDorComecou)
      console.log(nivelDeDor)
      console.log(comoAfetaMinhaVida)

      const apiResponse = await fetch(`${API_URL}/webhook-test/send-symtoms`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              // show all the questions 
              "Essa dor é mais frequente no": String(dorComMaisFreq),  // Garantir que é uma string
              "A dor aparece mais na situação": String(dorApareceEmQualSituacao),  // Garantir que é uma string
              "É uma dor do tipo": String(tipoDeDor),  // Garantir que é uma string
              "A dor começou faz": String(quandoDorComecou),  // Garantir que é uma string
              "O nível da dor é": String(nivelDeDor),  // Garantir que é uma string   
              "Como essa dor afeta sua vida?": String(comoAfetaMinhaVida),  // Garantir que é uma string

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
          setResponse(JSON.stringify(data));
          return JSON.stringify(data);

      } else {
          setResponse('Resposta inválida do n8n');
          return 'Resposta inválida do n8n';
      }
  }
  catch(error){
      console.log(error);
      setResponse('Erro ao enviar dados');
      return 'Erro ao enviar dados';
  }
}

export default handleSendSymptomsToN8n;
