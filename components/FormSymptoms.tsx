import React from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function FormSymptoms() {

    const [dorNasCostas, setDorNasCostas] = React.useState('');
    const [dorNasPernas, setDorNasPernas] = React.useState('');
    const [response, setResponse] = React.useState('');

    const handleSendSymptomsToN8n = async() => {
        try{
            const apiResponse = await fetch('https://e267-2804-4ec-1102-5249-7963-c43a-6961-27aa.ngrok-free.app/webhook-test/send-symtoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "Sintoma 1": String(dorNasCostas),  // Garantir que é uma string
                    "Sintoma 2": String(dorNasPernas),  // Garantir que é uma string
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

            } else {
                setResponse('Resposta inválida do n8n');
            }
        }
        catch(error){
            console.log(error);
            setResponse('Erro ao enviar dados');
        }
    }

    return (
        <ScrollView>
            <View style={{ padding: 20 }}>
                <Text>Qual o seu nível de dor nas costas?</Text>
                <RadioButton.Group onValueChange={setDorNasCostas} value={dorNasCostas}>
                    <RadioButton.Item label="Nenhuma dor" value="nenhumaDor" />
                    <RadioButton.Item label="Dor Leve" value="dorLeve" />
                    <RadioButton.Item label="Dor Moderada" value="dorModerada" />
                </RadioButton.Group>

                <Text>Qual o seu nível de dor nas pernas?</Text>
                <RadioButton.Group onValueChange={setDorNasPernas} value={dorNasPernas}>
                    <RadioButton.Item label="Nenhuma dor" value="nenhumaDor" />
                    <RadioButton.Item label="Dor Leve" value="dorLeve" />
                    <RadioButton.Item label="Dor Moderada" value="dorModerada" />
                </RadioButton.Group>

                <Button title="Enviar" onPress={handleSendSymptomsToN8n} />

                <View>
                    <Text>Resposta do N8n: {response}</Text>
                </View>
            </View>
        </ScrollView>
    );
}
