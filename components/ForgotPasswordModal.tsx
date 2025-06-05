import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import colors from '../styles/colors';

type ForgotPasswordModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ForgotPasswordModal({ visible, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, informe seu email');
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await resetPassword(email);

      if (error) {
        Alert.alert('Erro', error.message || 'Não foi possível enviar o email de recuperação');
        return;
      }

      Alert.alert(
        'Email enviado',
        'Enviamos um link para redefinir sua senha. Verifique sua caixa de entrada.',
        [{ text: 'OK', onPress: onClose }]
      );
    } catch (error) {
      console.error('Reset password error:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar redefinir sua senha');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="w-full bg-white p-6 rounded-2xl shadow-lg">
          <Text className="text-xl font-bold text-deepBlue mb-4">Recuperar senha</Text>
          <Text className="text-gray-600 mb-4">
            Informe seu email e enviaremos um link para redefinir sua senha.
          </Text>

          <View className="mb-4">
            <Text className="text-sm font-medium text-deepBlue mb-1">Email</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Seu email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            className="w-full h-12 bg-deepBlue rounded-lg items-center justify-center mb-3 shadow-sm"
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white font-semibold text-base">Enviar link</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full h-12 border border-deepBlue rounded-lg items-center justify-center"
            onPress={onClose}
            disabled={isLoading}
          >
            <Text className="text-deepBlue font-semibold text-base">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
