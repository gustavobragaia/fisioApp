import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../_layout';
import colors from '../../styles/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Import the auth context
  const { login } = useAuth();

  const handleLogin = () => {
    // TODO: Implement actual authentication logic
    console.log('Login with:', email, password);
    
    // Use the auth context to log in
    login();
    // Navigate to the main app
    router.replace('/(tabs)');
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
          
          <TouchableOpacity className="self-end">
            <Text className="text-sm text-deepBlue font-medium">Esqueceu a senha?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="w-full h-12 bg-deepBlue rounded-lg items-center justify-center mt-6 shadow-sm"
            onPress={handleLogin}
          >
            <Text className="text-white font-semibold text-base">Entrar</Text>
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