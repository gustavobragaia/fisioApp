import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import handleMentalHealthSymptomsToN8n from '../api/handleMentalHealthSymptomsToN8n';
import RadioButtonCustom from './ui/RadioButtonCustom';
import { handleMentalHealthSubmission } from './MentalHealthHandler';
import { supabase } from '../lib/supabase';
import colors from '../styles/colors';

// Define the ref type for external access to form methods
export type FormMentalHealthRefType = {
    resetForm: () => void;
};

const FormMentalHealth = forwardRef<FormMentalHealthRefType>((props, ref) => {
    const router = useRouter();
    
    // Form state
    const [comoEstaSentindo, setComoEstaSentindo] = useState('');
    const [frequenciaSentimento, setFrequenciaSentimento] = useState('');
    const [dificuldadeFrequente, setDificuldadeFrequente] = useState('');
    const [impactoRotina, setImpactoRotina] = useState('');
    const [buscouAjuda, setBuscouAjuda] = useState('');
    const [objetivoAlivio, setObjetivoAlivio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Navigation state
    const [currentScreen, setCurrentScreen] = useState(0);
    
    // Expose the resetForm function via ref
    useImperativeHandle(ref, () => ({
        resetForm: () => {
            // Reset all form state
            setComoEstaSentindo('');
            setFrequenciaSentimento('');
            setDificuldadeFrequente('');
            setImpactoRotina('');
            setBuscouAjuda('');
            setObjetivoAlivio('');
            setCurrentScreen(0);
            setIsLoading(false);
        }
    }));
    
    // Questions data
    const questions = [
        {
            question: 'Como você está se sentindo hoje?',
            state: comoEstaSentindo,
            setState: setComoEstaSentindo,
            options: [
                { label: 'Ansioso(a)', value: 'ansioso', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3081/3081383.png' } },
                { label: 'Estressado(a)', value: 'estressado', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2151/2151795.png' } },
                { label: 'Com dificuldade para dormir', value: 'dificuldadeDormir', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Triste ou desanimado(a)', value: 'triste', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2877/2877300.png' } },
                { label: 'Irritado(a)', value: 'irritado', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2877/2877300.png' } },
                { label: 'Quero manter meu bem-estar', value: 'manterBemEstar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4320/4320337.png' } },
            ]
        },
        {
            question: 'Com que frequência você sente isso?',
            state: frequenciaSentimento,
            setState: setFrequenciaSentimento,
            options: [
                { label: 'Todos os dias', value: 'todosDias', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693507.png' } },
                { label: '3 a 5 vezes por semana', value: '3a5Semana', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693642.png' } },
                { label: '1 a 2 vezes por semana', value: '1a2Semana', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693646.png' } },
                { label: 'Raramente', value: 'raramente', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2693/2693636.png' } },
            ]
        },
        {
            question: 'Qual destas dificuldades você enfrenta com mais frequência?',
            state: dificuldadeFrequente,
            setState: setDificuldadeFrequente,
            options: [
                { label: 'Pensamentos acelerados', value: 'pensamentosAcelerados', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2645/2645233.png' } },
                { label: 'Preocupações excessivas', value: 'preocupacoesExcessivas', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/471/471664.png' } },
                { label: 'Dificuldade para relaxar', value: 'dificuldadeRelaxar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2548/2548531.png' } },
                { label: 'Insônia ou sono leve', value: 'insonia', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Oscilações de humor', value: 'oscilacoesHumor', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2877/2877300.png' } },
                { label: 'Sensação de esgotamento emocional', value: 'esgotamentoEmocional', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3997/3997872.png' } },
            ]
        },
        {
            question: 'Como isso impacta sua rotina diária?',
            state: impactoRotina,
            setState: setImpactoRotina,
            options: [
                { label: 'Dificulta minha concentração', value: 'dificultaConcentracao', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2645/2645233.png' } },
                { label: 'Me sinto sem energia para trabalhar', value: 'semEnergia', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3281/3281289.png' } },
                { label: 'Afeta meus relacionamentos', value: 'afetaRelacionamentos', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4543/4543344.png' } },
                { label: 'Prejudica meu sono', value: 'prejudicaSono', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Afeta minha saúde física', value: 'afetaSaudeFisica', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2936/2936886.png' } },
                { label: 'Não impacta, mas quero melhorar', value: 'naoImpacta', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/1682/1682443.png' } },
            ]
        },
        {
            question: 'Você já buscou ajuda anteriormente?',
            state: buscouAjuda,
            setState: setBuscouAjuda,
            options: [
                { label: 'Sim, faço terapia regularmente', value: 'terapiaRegular', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4320/4320337.png' } },
                { label: 'Sim, já fiz terapia ou tomei medicação', value: 'terapiaOuMedicacao', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3209/3209074.png' } },
                { label: 'Não, nunca busquei ajuda', value: 'nuncaBuscouAjuda', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/471/471664.png' } },
            ]
        },
        {
            question: 'O que você gostaria de alcançar com o Alívio.com?',
            state: objetivoAlivio,
            setState: setObjetivoAlivio,
            options: [
                { label: 'Reduzir ansiedade ou estresse', value: 'reduzirAnsiedade', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3081/3081383.png' } },
                { label: 'Dormir melhor', value: 'dormirMelhor', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/3094/3094837.png' } },
                { label: 'Controlar meus pensamentos', value: 'controlarPensamentos', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/2645/2645233.png' } },
                { label: 'Melhorar meu bem-estar emocional', value: 'melhorarBemEstar', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4320/4320337.png' } },
                { label: 'Criar uma rotina mental saudável', value: 'criarRotina', imageSource: { uri: 'https://cdn-icons-png.flaticon.com/128/4543/4543344.png' } },
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
    const sendDataToResults = async () => {
        try {
            setIsLoading(true);
            
            // Send data to n8n API (keeping existing functionality)
            const webhookResponse = await handleMentalHealthSymptomsToN8n(
                comoEstaSentindo,
                frequenciaSentimento,
                dificuldadeFrequente,
                impactoRotina,
                buscouAjuda,
                objetivoAlivio
            );
            
            console.log('Webhook response:', webhookResponse);
            
            // Also save data to Supabase
            const supabaseResult = await handleMentalHealthSubmission({
                comoEstaSentindo,
                frequenciaSentimento,
                dificuldadeFrequente,
                impactoRotina,
                buscouAjuda,
                objetivoAlivio,
                onSuccess: (triagemId) => {
                    console.log('Mental health data saved to Supabase with triagem ID:', triagemId);
                },
                onError: (error) => {
                    console.error('Error saving to Supabase:', error);
                }
            });
            
            // Navigate to the consolidated diagnostic results page with type='mental'
            router.push({
                pathname: "/(tabs)/(triagem)/diagnostic-ideal",
                params: {
                    type: 'mental',
                    triagemId: supabaseResult.success ? supabaseResult.triagemId : undefined,
                    comoEstaSentindo,
                    frequenciaSentimento,
                    dificuldadeFrequente,
                    impactoRotina,
                    buscouAjuda,
                    objetivoAlivio,
                    apiResponse: webhookResponse
                }
            });
            
            setIsLoading(false);
        } catch (error) {
            console.error('Error processing mental health assessment:', error);
            setIsLoading(false);
        }
    };

    // Helper function to get recommended exercises based on feeling
    const getRecommendedExercises = (feeling: string) => {
        switch(feeling) {
            case 'ansioso':
                return [
                    {
                        nome: "Respiração Guiada",
                        descricao: "Exercícios de respiração para acalmar a mente e reduzir ansiedade",
                        tipo: "respiracao",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Música Ambiente",
                        descricao: "Sons relaxantes para reduzir a ansiedade",
                        tipo: "musica",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Meditação Curta",
                        descricao: "Meditação de 5 minutos para acalmar a mente",
                        tipo: "meditacao",
                        imageUrl: "https://via.placeholder.com/150"
                    }
                ];
            case 'estressado':
                return [
                    {
                        nome: "Alongamento Leve",
                        descricao: "Exercícios de alongamento para relaxar o corpo",
                        tipo: "alongamento",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Respiração 4-7-8",
                        descricao: "Técnica de respiração para reduzir o estresse",
                        tipo: "respiracao",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Sons da Natureza",
                        descricao: "Sons relaxantes da natureza para reduzir o estresse",
                        tipo: "musica",
                        imageUrl: "https://via.placeholder.com/150"
                    }
                ];
            case 'dificuldadeDormir':
                return [
                    {
                        nome: "História para Dormir",
                        descricao: "Histórias relaxantes para ajudar a dormir",
                        tipo: "historia",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Som de Chuva",
                        descricao: "Sons relaxantes de chuva para ajudar a dormir",
                        tipo: "musica",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Respiração Relaxante",
                        descricao: "Técnica de respiração para relaxar antes de dormir",
                        tipo: "respiracao",
                        imageUrl: "https://via.placeholder.com/150"
                    }
                ];
            case 'triste':
                return [
                    {
                        nome: "Áudio de Autocompaixão",
                        descricao: "Exercícios de autocompaixão para momentos de tristeza",
                        tipo: "audio",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Sons Calmos",
                        descricao: "Sons relaxantes para momentos de tristeza",
                        tipo: "musica",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Meditação 'Reconectar com o Presente'",
                        descricao: "Meditação para reconectar com o momento presente",
                        tipo: "meditacao",
                        imageUrl: "https://via.placeholder.com/150"
                    }
                ];
            case 'irritado':
                return [
                    {
                        nome: "Respiração com Contagem",
                        descricao: "Técnica de respiração para acalmar a irritação",
                        tipo: "respiracao",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Meditação para Raiva",
                        descricao: "Meditação específica para lidar com a raiva",
                        tipo: "meditacao",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Sons Relaxantes",
                        descricao: "Sons relaxantes para momentos de irritação",
                        tipo: "musica",
                        imageUrl: "https://via.placeholder.com/150"
                    }
                ];
            default:
                return [
                    {
                        nome: "Trilha de Manutenção",
                        descricao: "Exercícios para manter o bem-estar mental",
                        tipo: "trilha",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Sons Binaurais Leves",
                        descricao: "Sons binaurais para manter o bem-estar mental",
                        tipo: "musica",
                        imageUrl: "https://via.placeholder.com/150"
                    },
                    {
                        nome: "Meditação Diária",
                        descricao: "Meditação diária para manter o bem-estar mental",
                        tipo: "meditacao",
                        imageUrl: "https://via.placeholder.com/150"
                    }
                ];
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
                            await sendDataToResults();
                            
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

export default FormMentalHealth;
