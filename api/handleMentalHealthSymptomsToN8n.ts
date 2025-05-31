// verify if emulator is with wifi active
const API_URL = 'https://fisioapplesgo.app.n8n.cloud';

const handleMentalHealthSymptomsToN8n = async(
  comoEstaSentindo: string,
  frequenciaSentimento: string,
  dificuldadeFrequente: string,
  impactoRotina: string,
  buscouAjuda: string,
  objetivoAlivio: string
) => {
  try{
      // console log em todos os estados
      console.log(comoEstaSentindo)
      console.log(frequenciaSentimento)
      console.log(dificuldadeFrequente)
      console.log(impactoRotina)
      console.log(buscouAjuda)
      console.log(objetivoAlivio)

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
