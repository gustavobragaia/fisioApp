import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HistoryItem from "../../components/HistoryItem";
import { useAuth } from "../../contexts/AuthContext";
import { getUserTriagens, updateUserProfile } from "../../lib/supabaseUtils";
import colors from "../../styles/colors";
import { Triagem, User } from "../../types/supabase";

// Convert Triagem to DiagnosticItem for display
interface DiagnosticItem {
  id: string;
  date: string;
  title: string;
  painLevel?: number;
  status: string;
}

// Modal component for editing user name
const EditNameModal = ({
  visible,
  onClose,
  onSave,
  initialName,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  initialName: string;
}) => {
  const [name, setName] = useState(initialName);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-5/6 bg-white p-6 rounded-xl shadow-lg">
          <Text className="text-lg font-bold text-deepBlue mb-4">
            Alterar Nome
          </Text>

          <TextInput
            className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary mb-4"
            value={name}
            onChangeText={setName}
            placeholder="Seu nome completo"
            placeholderTextColor="#9CA3AF"
          />

          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 rounded-lg border border-lightBlue"
            >
              <Text className="text-deepBlue">Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (name.trim()) {
                  onSave(name);
                  onClose();
                } else {
                  Alert.alert("Erro", "Por favor, insira um nome válido");
                }
              }}
              className="px-4 py-2 rounded-lg bg-deepBlue"
            >
              <Text className="text-white">Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function ProfileScreen() {
  const { signOut, user } = useAuth();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [diagnosticHistory, setDiagnosticHistory] = useState<DiagnosticItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("history"); // 'history' or 'settings'
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch user data and history from Supabase
    const fetchUserData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        // Set user profile from auth context
        setUserProfile(user);

        // Fetch user's diagnostic history
        const { data: triagens, error } = await getUserTriagens(user.id);

        if (error) {
          console.error("Error fetching triagens:", error);
        } else if (triagens) {
          // Convert Triagem objects to DiagnosticItem format
          const diagnostics: DiagnosticItem[] = triagens.map(
            (triagem: Triagem) => ({
              id: triagem.id,
              date: new Date(triagem.created_at).toLocaleDateString("pt-BR"),
              title: `Diagnóstico de ${
                triagem.type === "pain"
                  ? triagem.location
                    ? triagem.location.charAt(0).toUpperCase() +
                      triagem.location.slice(1)
                    : "Dor"
                  : "Saúde Mental"
              }`,
              status:
                triagem.status === "completed" ? "Concluído" : "Em andamento",
              // For pain triagens, we could fetch the pain level from pain_symptoms table if needed
            })
          );

          setDiagnosticHistory(diagnostics);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Handle name update
  const handleUpdateName = async (newName: string) => {
    if (!user || !userProfile) return;

    try {
      setIsSaving(true);

      const { data, error } = await updateUserProfile(user.id, {
        name: newName,
      });

      if (error) {
        Alert.alert(
          "Erro",
          "Não foi possível atualizar seu nome. Tente novamente."
        );
        return;
      }

      if (data) {
        setUserProfile({ ...userProfile, name: newName });
        Alert.alert("Sucesso", "Nome atualizado com sucesso!");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      Alert.alert("Erro", "Ocorreu um erro ao atualizar seu nome.");
    } finally {
      setIsSaving(false);
    }
  };

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
          <Text className="text-textPrimary text-lg">
            Nenhum diagnóstico encontrado
          </Text>
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
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center py-6">
          <ActivityIndicator size="large" color={colors.light.deepBlue} />
        </View>
      );
    }

    return (
      <View className="flex-1 mt-4">
        <TouchableOpacity
          className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm"
          activeOpacity={0.7}
          onPress={() => setEditNameModalVisible(true)}
          disabled={isSaving}
        >
          <View className="flex-1">
            <Text className="text-textPrimary text-base">Alterar Nome</Text>
            <Text className="text-gray-500 text-sm mt-1">
              {userProfile?.name || "Não definido"}
            </Text>
          </View>
          {isSaving && (
            <ActivityIndicator size="small" color={colors.light.deepBlue} />
          )}
        </TouchableOpacity>

        {userProfile?.email && (
          <View className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm">
            <View className="flex-1">
              <Text className="text-textPrimary text-base">Email</Text>
              <Text className="text-gray-500 text-sm mt-1">
                {userProfile.email}
              </Text>
            </View>
          </View>
        )}

        {userProfile?.cpf && (
          <View className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm">
            <View className="flex-1">
              <Text className="text-textPrimary text-base">CPF</Text>
              <Text className="text-gray-500 text-sm mt-1">
                {userProfile.cpf}
              </Text>
            </View>
          </View>
        )}

        {userProfile?.empresa && (
          <View className="flex-row items-center p-4 bg-white rounded-lg mb-3 shadow-sm">
            <View className="flex-1">
              <Text className="text-textPrimary text-base">Empresa</Text>
              <Text className="text-gray-500 text-sm mt-1">
                {userProfile.empresa}
              </Text>
            </View>
          </View>
        )}

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
          <Header name={userProfile?.name || "Usuário"} />
          <Text className="text-textPrimary text-xl font-bold mt-4">
            {userProfile?.name || "Usuário"}
          </Text>
        </View>

        <EditNameModal
          visible={editNameModalVisible}
          onClose={() => setEditNameModalVisible(false)}
          onSave={handleUpdateName}
          initialName={userProfile?.name || ""}
        />

        <View className="flex-row bg-white rounded-lg overflow-hidden mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${
              activeTab === "history" ? "bg-deepBlue" : "bg-white"
            }`}
            onPress={() => setActiveTab("history")}
          >
            <Text
              className={`font-medium ${
                activeTab === "history" ? "text-white" : "text-textPrimary"
              }`}
            >
              Histórico
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 items-center ${
              activeTab === "settings" ? "bg-deepBlue" : "bg-white"
            }`}
            onPress={() => setActiveTab("settings")}
          >
            <Text
              className={`font-medium ${
                activeTab === "settings" ? "text-white" : "text-textPrimary"
              }`}
            >
              Configurações
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "history" ? renderHistoryTab() : renderSettingsTab()}
      </ScrollView>
    </SafeAreaView>
  );
}
