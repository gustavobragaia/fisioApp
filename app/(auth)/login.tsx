import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../styles/colors';
import ForgotPasswordModal from '../../components/ForgotPasswordModal';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const router = useRouter();

  // Import the auth context
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Use the auth context to sign in with Supabase
      const { error } = await signIn(email, password);
      
      if (error) {
        Alert.alert('Erro de login', error.message || 'Falha na autenticação. Verifique seu email e senha.');
        return;
      }
      
      // Navigate to the main app on successful login
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Erro', 'Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-paleSand"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />
      <View className="absolute top-0 h-64 w-full bg-deepBlue rounded-b-3xl" />
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10">
        <View className="items-center mb-10">
          <View className="w-20 h-20 rounded-full bg-white items-center justify-center mb-4 shadow-lg">
            <Text className="text-4xl font-bold text-deepBlue">F</Text>
          </View>
          <Text className="text-3xl font-bold text-slate-900 mt-2">FisioApp</Text>
          <Text className="text-base text-slate-900 mt-1">Seu assistente de fisioterapia</Text>
        </View>

        <View className="space-y-4 w-full bg-white p-6 rounded-2xl shadow-md">
          <View>
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

          <View>
            <Text className="text-sm font-medium text-deepBlue mb-1">Senha</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <TouchableOpacity 
            className="self-end"
            onPress={() => setForgotPasswordVisible(true)}
          >
            <Text className="text-sm text-deepBlue font-medium">Esqueceu a senha?</Text>
          </TouchableOpacity>
          
          <ForgotPasswordModal
            visible={forgotPasswordVisible}
            onClose={() => setForgotPasswordVisible(false)}
          />

          <TouchableOpacity 
            className="w-full h-12 bg-deepBlue rounded-lg items-center justify-center mt-6 shadow-sm"
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text className="text-white font-semibold text-base">Entrar</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Não tem uma conta? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text className="text-deepBlue font-semibold">Cadastre-se</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}