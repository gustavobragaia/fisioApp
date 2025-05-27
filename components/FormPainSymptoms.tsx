import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import handlePainSendSymptomsToN8n from '../api/handlePainSendSymptomsToN8n';
import RadioButtonCustom from './ui/RadioButtonCustom';
import { useRouter } from 'expo-router';


export default function FormPainSymptoms() {
    const router = useRouter();
    // Form state
    const [dorComMaisFreq, setDorComMaisFreq] = useState('');
    const [dorApareceEmQualSituacao, setDorApareceEmQualSituacao] = useState('');
    const [tipoDeDor, setTipoDeDor] = useState('');
    const [quandoDorComecou, setQuandoDorComecou] = useState('');
    const [nivelDeDor, setNivelDeDor] = useState('');
    const [comoAfetaMinhaVida, setComoAfetaMinhaVida] = useState('');
    const [oQueGostariaDeAlcançarComAlivio, setOQueGostariaDeAlcançarComAlivio] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Navigation state
    const [currentScreen, setCurrentScreen] = useState(0);
    
    // Questions data
    const questions = [
        {
            question: 'Onde você sente dor com mais frequência?',
            state: dorComMaisFreq,
            setState: setDorComMaisFreq,
            options: [
                // add this options Pescoço,Ombros ,Coluna torácica (meio das costas), Lombar, Quadril, Joelhos,Tornozelos / Pés, Cotovelos, Punhos / Mãos
                { label: 'Pescoço', value: 'pescoco', imageSource: require('../assets/images/favicon.png') },
                { label: 'Ombros', value: 'ombros', imageSource: require('../assets/images/favicon.png') },
                { label: 'Coluna torácica (meio das costas)', value: 'colunaToracica', imageSource: require('../assets/images/favicon.png') },
                { label: 'Lombar', value: 'lombar', imageSource: require('../assets/images/favicon.png') },
                { label: 'Quadril', value: 'quadril', imageSource: require('../assets/images/favicon.png') },
                { label: ' Joelhos', value: 'joelhos', imageSource: require('../assets/images/favicon.png') },
                { label: 'Tornozelos / Pés', value: 'tornozelos', imageSource: require('../assets/images/favicon.png') },
                { label: 'Cotovelos', value: 'cotovelos', imageSource: require('../assets/images/favicon.png') },
                { label: 'Punhos / Mãos', value: 'punhos', imageSource: require('../assets/images/favicon.png') },

            ]
        },
        {
            question: 'A dor aparece mais em qual situação?',
            state: dorApareceEmQualSituacao,
            setState: setDorApareceEmQualSituacao,
            options: [

                { label: 'Quando fico sentado(a) por muito tempo', value: 'quandoSentado', imageSource: require('../assets/images/favicon.png') },
                { label: 'Ao caminhar', value: 'aoCaminhar', imageSource: require('../assets/images/favicon.png') },
                { label: 'Ao subir escadas', value: 'aoSubirEscadas', imageSource: require('../assets/images/favicon.png') },
                { label: 'Ao carregar peso', value: 'aoCarregarPeso', imageSource: require('../assets/images/favicon.png') },
                { label: 'Durante o trabalho', value: 'duranteTrabalho', imageSource: require('../assets/images/favicon.png') },
                { label: 'Durante o sono', value: 'duranteSono', imageSource: require('../assets/images/favicon.png') },
                { label: 'Após exercício físico', value: 'aposExercicioFisico', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dor constante, sem relação com esforço', value: 'dorConstante', imageSource: require('../assets/images/favicon.png') },
            ]
        },
        {
            question: 'Qual é o tipo da sua dor?',
            state: tipoDeDor,
            setState: setTipoDeDor,
            options: [

                { label: 'Dor aguda, pontada forte', value: 'dorAguda', imageSource: require('../assets/images/favicon.png') },
                { label: 'Triagem para Dor', value: 'triagemDor', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dor contínua e incômoda', value: 'dorContinua', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dor queimação/formigamento', value: 'dorQueimacao', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dor que irradia para pernas ou braços', value: 'dorIrradia', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dor que piora com movimento', value: 'dorPioraComMovimento', imageSource: require('../assets/images/favicon.png') },
                { label: 'Não sei descrever', value: 'naoSeiDescrever', imageSource: require('../assets/images/favicon.png') },

            ]
        },
        {
            question: 'Quando essa dor começou?',
            state: quandoDorComecou,
            setState: setQuandoDorComecou,
            options: [
                { label: 'Hoje', value: 'hoje', imageSource: require('../assets/images/favicon.png') },
                { label: 'Há alguns dias', value: 'algunsDias', imageSource: require('../assets/images/favicon.png') },
                { label: 'Há semanas', value: 'semanas', imageSource: require('../assets/images/favicon.png') },
                { label: 'Há meses', value: 'meses', imageSource: require('../assets/images/favicon.png') },
                { label: 'Mais de 6 meses', value: 'maisDe6Meses', imageSource: require('../assets/images/favicon.png') },
                
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
        },
        {
            question: 'Como essa dor afeta sua vida?',
            state: comoAfetaMinhaVida,
            setState: setComoAfetaMinhaVida,
            options: [
                { label: 'Dificulta trabalhar', value: 'dificultaTrabalhar', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dificulta dormir bem', value: 'dificultaDormirBem', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me impede de me exercitar', value: 'meImpedeDeMeExercitar', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me deixa irritado(a)', value: 'meDeixaIrritado', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me afasta da rotina', value: 'meAfastaDaRotina', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me preocupa com algo mais sério', value: 'mePreocupaComAlgoMaisSeri', imageSource: require('../assets/images/favicon.png') },
                { label: 'Não afeta tanto, só quero prevenir', value: 'naoAfetaTanto', imageSource: require('../assets/images/favicon.png') },

            ]
        },
        {
            question: 'O que você gostaria de alcançar com o Alívio.com?',
            state: oQueGostariaDeAlcançarComAlivio,
            setState: setOQueGostariaDeAlcançarComAlivio,
            options: [
                { label: 'Dificulta trabalhar', value: 'dificultaTrabalhar', imageSource: require('../assets/images/favicon.png') },
                { label: 'Dificulta dormir bem', value: 'dificultaDormirBem', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me impede de me exercitar', value: 'meImpedeDeMeExercitar', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me deixa irritado(a)', value: 'meDeixaIrritado', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me afasta da rotina', value: 'meAfastaDaRotina', imageSource: require('../assets/images/favicon.png') },
                { label: 'Me preocupa com algo mais sério', value: 'mePreocupaComAlgoMaisSeri', imageSource: require('../assets/images/favicon.png') },
                { label: 'Não afeta tanto, só quero prevenir', value: 'naoAfetaTanto', imageSource: require('../assets/images/favicon.png') },

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
    const sendDataToN8n = async () => {
        try {
            setIsLoading(true);
            const response = await handlePainSendSymptomsToN8n(dorComMaisFreq,dorApareceEmQualSituacao,tipoDeDor,quandoDorComecou,nivelDeDor,comoAfetaMinhaVida,oQueGostariaDeAlcançarComAlivio);   
            setResponse(response);
            console.log(response)
            // Navigate to ResultDiagnostic with the form data and API response
            router.push({
                pathname: '/diagnostic-ideal',
                params: {
                    dorComMaisFreq,
                    dorApareceEmQualSituacao,
                    tipoDeDor,
                    quandoDorComecou,
                    nivelDeDor,
                    comoAfetaMinhaVida,
                    oQueGostariaDeAlcancarComAlivio: oQueGostariaDeAlcançarComAlivio,
                    apiResponse: response
                }
            });

        } catch (error) {
            console.error('Error sending data:', error);
        } finally {
            setIsLoading(false);
        }
    };
        

    const renderContent = () => {
        // If loading, show loader
        if (isLoading) {
            return (
                <View className="flex-1 justify-center items-center p-6">
                    <ActivityIndicator size="large" color="#0066CC" />
                    <Text className="text-lg text-center mt-4 text-textPrimary">Colhendo dados da triagem...</Text>
                </View>
            );
        }
        
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
                        <ScrollView>
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
                        </ScrollView>
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
                        onPress={async () => {
                            // Call API function
                            await sendDataToN8n();
                            
                            // Move to results screen
                            setCurrentScreen(currentScreen + 1);
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


