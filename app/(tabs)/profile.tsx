import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../styles/colors';
import ProfileAvatar from '../../components/ProfileAvatar';
import HistoryItem from '../../components/HistoryItem';

// Define the diagnostic item type
interface DiagnosticItem {
  id: string;
  date: string;
  title: string;
  painLevel: number;
  status: string;
}

// Mock data for diagnostics history - will be replaced with Supabase data
const mockDiagnostics: DiagnosticItem[] = [
  {
    id: '1',
    date: '2025-05-30',
    title: 'Diagnóstico de Lombar',
    painLevel: 7,
    status: 'Concluído',
  },
  {
    id: '2',
    date: '2025-05-25',
    title: 'Diagnóstico de Ombro',
    painLevel: 5,
    status: 'Concluído',
  },
  {
    id: '3',
    date: '2025-05-20',
    title: 'Diagnóstico de Joelho',
    painLevel: 8,
    status: 'Concluído',
  },
];

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [userName, setUserName] = useState('Usuário');
  const [diagnosticHistory, setDiagnosticHistory] = useState<DiagnosticItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('history'); // 'history' or 'settings'

  useEffect(() => {
    // Simulate fetching user data and history from Supabase
    const fetchUserData = async () => {
      try {
        // This would be replaced with actual Supabase queries
        setTimeout(() => {
          setUserName('Gustavo Bragaia');
          setDiagnosticHistory(mockDiagnostics);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderHistoryTab = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center py-6">
          <ActivityIndicator size="large" color={colors.light.deepBlue} />
        </View>
      );
    }

    if (diagnosticHistory.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-textPrimary text-lg">Nenhum diagnóstico encontrado</Text>
        </View>
      );
    }

    return (
      <View className="flex-1">
        {diagnosticHistory.map((item) => (
          <HistoryItem key={item.id} diagnostic={item} />
        ))}
      </View>
    );
  };

  const renderSettingsTab = () => {
    return (
      <View className="flex-1 mt-4">
        <TouchableOpacity 
          className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
          activeOpacity={0.7}
        >
          <Text className="text-textPrimary text-base flex-1">Alterar Nome</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
          activeOpacity={0.7}
        >
          <Text className="text-textPrimary text-base flex-1">Notificações</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
          activeOpacity={0.7}
        >
          <Text className="text-textPrimary text-base flex-1">Sobre o App</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
          onPress={signOut}
          activeOpacity={0.7}
        >
          <Text className="text-red-500 text-base flex-1">Sair</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-paleSand">
      <ScrollView className="flex-1 px-4">
        <View className="items-center pt-6 pb-4">
          <ProfileAvatar name={userName} size={120} />
          <Text className="text-textPrimary text-xl font-bold mt-4">{userName}</Text>
        </View>
        
        <View className="flex-row bg-white rounded-lg overflow-hidden mb-4">
          <TouchableOpacity 
            className={`flex-1 py-3 items-center ${activeTab === 'history' ? 'bg-deepBlue' : 'bg-white'}`}
            onPress={() => setActiveTab('history')}
          >
            <Text className={`font-medium ${activeTab === 'history' ? 'text-white' : 'text-textPrimary'}`}>
              Histórico
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 py-3 items-center ${activeTab === 'settings' ? 'bg-deepBlue' : 'bg-white'}`}
            onPress={() => setActiveTab('settings')}
          >
            <Text className={`font-medium ${activeTab === 'settings' ? 'text-white' : 'text-textPrimary'}`}>
              Configurações
            </Text>
          </TouchableOpacity>
        </View>
        
        {activeTab === 'history' ? renderHistoryTab() : renderSettingsTab()}
      </ScrollView>
    </SafeAreaView>
  );
}
