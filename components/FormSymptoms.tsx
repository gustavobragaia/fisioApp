import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import RadioButtonCustom from './ui/RadioButtonCustom';

export default function FormSymptoms() {
    // Form state
    const [dorComMaisFreq, setDorComMaisFreq] = useState('');
    const [dorApareceEmQualSituacao, setDorApareceEmQualSituacao] = useState('');
    const [tipoDeDor, setTipoDeDor] = useState('');
    const [quandoDorComecou, setQuandoDorComecou] = useState('');
    const [nivelDeDor, setNivelDeDor] = useState('');
    const [response, setResponse] = useState('');
    
    // Navigation state
    const [currentScreen, setCurrentScreen] = useState(0);
    
    // Questions data
    const questions = [
        {
            question: 'Onde você sente dor com mais frequência?',
            state: dorComMaisFreq,
            setState: setDorComMaisFreq,
            options: [
                { label: 'Costas', value: 'costas', imageSource: require('../assets/images/favicon.png') },
                { label: 'Pescoço', value: 'pescoco', imageSource: require('../assets/images/favicon.png') },
                { label: 'Pernas', value: 'pernas', imageSource: require('../assets/images/favicon.png') }
            ]
        },
        {
            question: 'A dor aparece mais em qual situação?',
            state: dorApareceEmQualSituacao,
            setState: setDorApareceEmQualSituacao,
            options: [
                { label: 'Quando descanso', value: 'quandoDescanso', imageSource: require('../assets/images/favicon.png') },
                { label: 'Ao me movimentar', value: 'aoMeMovimentar', imageSource: require('../assets/images/favicon.png') },
                { label: 'O tempo todo', value: 'oTempoTodo', imageSource: require('../assets/images/favicon.png') }
            ]
        },
        {
            question: 'Qual é o tipo da sua dor?',
            state: tipoDeDor,
            setState: setTipoDeDor,
            options: [
                { label: 'Aguda', value: 'dorTipoAguda', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dor Crônica', value: 'dorTipoCronica', imageSource: require('../assets/images/favicon.png') },
                { label: 'Queimação', value: 'dorTipoQueimacao', imageSource: require('../assets/images/favicon.png') },
                { label: 'Pontada', value: 'dorTipoPontada', imageSource: require('../assets/images/favicon.png') }
            ]
        },
        {
            question: 'Quando essa dor começou?',
            state: quandoDorComecou,
            setState: setQuandoDorComecou,
            options: [
                { label: '1 dia', value: 'umDia', imageSource: require('../assets/images/favicon.png') },
                { label: '1 semana', value: 'umaSemana', imageSource: require('../assets/images/favicon.png') },
                { label: '1 mês', value: 'umMes', imageSource: require('../assets/images/favicon.png') },
                { label: 'Mais de 1 mês', value: 'maisDeUmMes', imageSource: require('../assets/images/favicon.png') }
            ]
        },
        {
            question: 'Como você classificaria sua dor hoje? (0 a 10)',
            state: nivelDeDor,
            setState: setNivelDeDor,
            options: [
                { label: '0-2', value: 'nivel0a2', imageSource: require('../assets/images/favicon.png') },
                { label: '3-5', value: 'nivel3a5', imageSource: require('../assets/images/favicon.png') },
                { label: '6-8', value: 'nivel6a8', imageSource: require('../assets/images/favicon.png') },
                { label: '9-10', value: 'nivel9a10', imageSource: require('../assets/images/favicon.png') }
            ]
        }
    ];

    // Navigation functions
    const goToNextScreen = () => {
        if (currentScreen < questions.length) {
            setCurrentScreen(currentScreen + 1);
        }
    };
    
    const goToPreviousScreen = () => {
        if (currentScreen > 0) {
            setCurrentScreen(currentScreen - 1);
        }
    };
    
    // Calculate progress percentage
    const progressPercentage = ((currentScreen + 1) / questions.length) * 100;
    
    // API submission function
    const handleSendSymptomsToN8n = async() => {
        try{
            const apiResponse = await fetch('https://f76e-2801-b0-20-59-a145-b5da-6962-9765.ngrok-free.app/webhook-test/send-symtoms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "Dor com mais frequência:": String(dorComMaisFreq),
                    "Dor aparece em qual situação:": String(dorApareceEmQualSituacao),
                    "Tipo de Dor": String(tipoDeDor),
                    "Quando Começou": String(quandoDorComecou),
                    "Nível de Dor": String(nivelDeDor)

                }),
            });

            if (!apiResponse.ok) {
                throw new Error('Erro na resposta do n8n');
            }

            const data = await apiResponse.json();
            
            if (data) {
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


    // Render the current question or the results screen
    const renderContent = () => {
        // If we've completed all questions, show results
        if (currentScreen >= questions.length) {
            return (
                <View className="flex-1 justify-center items-center p-6">
                    <Text className="text-2xl font-bold mb-4 text-deepBlue">Obrigado por responder!</Text>
                    <Text className="text-lg text-center mb-6 text-textPrimary">Suas respostas foram enviadas com sucesso.</Text>
                    {response ? (
                        <Text className="text-sm mt-4 text-textPrimary">Resposta: {response}</Text>
                    ) : null}
                </View>
            );
        }

        // Otherwise, show the current question
        const currentQuestion = questions[currentScreen];
        
        return (
            <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-center mb-8 text-deepBlue">{currentQuestion.question}</Text>
                
                <View className="w-full px-4">
                    <View className="flex-row flex-wrap justify-between">
                        {currentQuestion.options.map((option) => (
                            <View key={option.value} className="w-[48%] mb-4">
                                <RadioButtonCustom
                                    label={option.label}
                                    value={option.value}
                                    selectedValue={currentQuestion.state}
                                    onPress={currentQuestion.setState}
                                    imageSource={option.imageSource}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 p-0 bg-background">
            <StatusBar style="dark" />
            
            {/* Progress bar */}
            <View className="h-2 rounded overflow-hidden mb-6 bg-paleSand">
                <View className="h-full rounded bg-deepBlue" style={{ width: `${progressPercentage}%` }} />
            </View>
            
            {/* Question content */}
            {renderContent()}
            
            {/* Navigation buttons */}
            <View className="flex-row justify-between mt-auto py-4">
                <TouchableOpacity 
                    className={`py-4 px-6 rounded-xl min-w-[120px] items-center ${currentScreen === 0 ? 'opacity-50' : ''} bg-lightBlue`}
                    onPress={goToPreviousScreen}
                    disabled={currentScreen === 0}
                >
                    <Text className="text-base font-bold text-deepBlue">Voltar</Text>
                </TouchableOpacity>
                
                {/* Show Next button if not on last screen */}
                {currentScreen < questions.length - 1 && (
                    <TouchableOpacity 
                        className={`py-4 px-6 rounded-xl min-w-[120px] items-center ${!questions[currentScreen]?.state ? 'opacity-50' : ''} bg-deepBlue`}
                        onPress={goToNextScreen}
                        disabled={!questions[currentScreen]?.state}
                    >
                        <Text className="text-base font-bold text-textDeepBlue">Próxima</Text>
                    </TouchableOpacity>
                )}
                
                {/* Show Send button only on last screen */}
                {currentScreen === questions.length - 1 && (
                    <TouchableOpacity 
                        className={`py-4 px-6 rounded-xl min-w-[120px] items-center ${!questions[currentScreen]?.state ? 'opacity-50' : ''} bg-seafoam`}
                        onPress={() => {
                            
                            // Call API function
                            handleSendSymptomsToN8n();
                            
                            // // Move to results screen
                            // setCurrentScreen(currentScreen + 1);
                        }}
                        disabled={!questions[currentScreen]?.state}
                    >
                        <Text className="text-base font-bold text-deepBlue">Enviar Dados</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}


