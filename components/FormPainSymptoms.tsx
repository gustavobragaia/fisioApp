import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import handlePainSendSymptomsToN8n from '../api/handlePainSendSymptomsToN8n';
import RadioButtonCustom from './ui/RadioButtonCustom';


// Define the ref type for external access to form methods
export type FormPainSymptomsRefType = {
    resetForm: () => void;
};

const FormPainSymptoms = forwardRef<FormPainSymptomsRefType>((props, ref) => {
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
    
    // Expose the resetForm function via ref
    useImperativeHandle(ref, () => ({
        resetForm: () => {
            // Reset all form state
            setDorComMaisFreq('');
            setDorApareceEmQualSituacao('');
            setTipoDeDor('');
            setQuandoDorComecou('');
            setNivelDeDor('');
            setComoAfetaMinhaVida('');
            setOQueGostariaDeAlcançarComAlivio('');
            setResponse('');
            setCurrentScreen(0);
            setIsLoading(false);
        }
    }));
    
    // Questions data
    const questions = [
        {
            question: 'Onde você sente dor com mais frequência?',
            state: dorComMaisFreq,
            setState: setDorComMaisFreq,
            options: [
                { label: 'Pescoço', value: 'pescoco', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3081/3081383.png' } },
                { label: 'Ombros', value: 'ombros', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2151/2151795.png' } },
                { label: 'Coluna torácica', value: 'colunaToracica', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2966/2966327.png' } },
                { label: 'Lombar', value: 'lombar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4856/4856522.png' } },
                { label: 'Quadril', value: 'quadril', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/6267/6267463.png' } },
                { label: 'Joelhos', value: 'joelhos', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2151/2151783.png' } },
                { label: 'Tornozelos / Pés', value: 'tornozelos', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2151/2151799.png' } },
                { label: 'Cotovelos', value: 'cotovelos', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2151/2151791.png' } },
                { label: 'Punhos / Mãos', value: 'punhos', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2151/2151797.png' } },
            ]
        },
        {
            question: 'A dor aparece mais em qual situação?',
            state: dorApareceEmQualSituacao,
            setState: setDorApareceEmQualSituacao,
            options: [
                { label: 'Quando fico sentado(a)', value: 'quandoSentado', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2961/2961957.png' } },
                { label: 'Ao caminhar', value: 'aoCaminhar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2548/2548437.png' } },
                { label: 'Ao subir escadas', value: 'aoSubirEscadas', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/6543/6543766.png' } },
                { label: 'Ao carregar peso', value: 'aoCarregarPeso', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2936/2936886.png' } },
                { label: 'Durante o trabalho', value: 'duranteTrabalho', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3281/3281289.png' } },
                { label: 'Durante o sono', value: 'duranteSono', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Após exercício físico', value: 'aposExercicioFisico', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2548/2548531.png' } },
                { label: 'Dor constante', value: 'dorConstante', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3997/3997872.png' } },
            ]
        },
        {
            question: 'Qual é o tipo da sua dor?',
            state: tipoDeDor,
            setState: setTipoDeDor,
            options: [
                { label: 'Dor aguda, pontada forte', value: 'dorAguda', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/5976/5976060.png' } },
                { label: 'Triagem para Dor', value: 'triagemDor', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3209/3209074.png' } },
                { label: 'Dor contínua e incômoda', value: 'dorContinua', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3997/3997872.png' } },
                { label: 'Dor queimação/formigamento', value: 'dorQueimacao', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/785/785116.png' } },
                { label: 'Dor que irradia', value: 'dorIrradia', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/1682/1682443.png' } },
                { label: 'Dor que piora com movimento', value: 'dorPioraComMovimento', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2936/2936886.png' } },
                { label: 'Não sei descrever', value: 'naoSeiDescrever', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/471/471664.png' } },
            ]
        },
        {
            question: 'Quando essa dor começou?',
            state: quandoDorComecou,
            setState: setQuandoDorComecou,
            options: [
                { label: 'Hoje', value: 'hoje', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693507.png' } },
                { label: 'Há alguns dias', value: 'algunsDias', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693642.png' } },
                { label: 'Há semanas', value: 'semanas', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693646.png' } },
                { label: 'Há meses', value: 'meses', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693636.png' } },
                { label: 'Mais de 6 meses', value: 'maisDe6Meses', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693637.png' } },
                
            ]
        },
        {
            question: 'Como você classificaria sua dor hoje? (0 a 10)',
            state: nivelDeDor,
            setState: setNivelDeDor,
            options: [
                { label: '0-2', value: 'nivel0a2', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/9841/9841608.png' } },
                { label: '3-5', value: 'nivel3a5', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/9841/9841611.png' } },
                { label: '6-8', value: 'nivel6a8', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/9841/9841614.png' } },
                { label: '9-10', value: 'nivel9a10', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/9841/9841616.png' } }
            ]
        },
        {
            question: 'Como essa dor afeta sua vida?',
            state: comoAfetaMinhaVida,
            setState: setComoAfetaMinhaVida,
            options: [
                { label: 'Dificulta trabalhar', value: 'dificultaTrabalhar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3281/3281289.png' } },
                { label: 'Dificulta dormir bem', value: 'dificultaDormirBem', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Me impede de me exercitar', value: 'meImpedeDeMeExercitar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2548/2548531.png' } },
                { label: 'Me deixa irritado(a)', value: 'meDeixaIrritado', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2877/2877300.png' } },
                { label: 'Me afasta da rotina', value: 'meAfastaDaRotina', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4543/4543344.png' } },
                { label: 'Me preocupa com algo mais sério', value: 'mePreocupaComAlgoMaisSeri', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3997/3997872.png' } },
                { label: 'Não afeta tanto, só quero prevenir', value: 'naoAfetaTanto', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/1682/1682443.png' } },
            ]
        },
        {
            question: 'O que você gostaria de alcançar com o Alívio.com?',
            state: oQueGostariaDeAlcançarComAlivio,
            setState: setOQueGostariaDeAlcançarComAlivio,
            options: [
                { label: 'Aliviar a dor', value: 'aliviarDor', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4320/4320337.png' } },
                { label: 'Melhorar minha postura', value: 'melhorarPostura', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2966/2966327.png' } },
                { label: 'Voltar a me exercitar', value: 'voltarExercitar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2548/2548531.png' } },
                { label: 'Dormir melhor', value: 'dormirMelhor', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Voltar à rotina normal', value: 'voltarRotina', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4543/4543344.png' } },
                { label: 'Prevenir problemas futuros', value: 'prevenirProblemas', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2942/2942499.png' } },
                { label: 'Entender melhor minha dor', value: 'entenderDor', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2645/2645233.png' } },
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
});

export default FormPainSymptoms;


