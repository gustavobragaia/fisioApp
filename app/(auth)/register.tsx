import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../_layout';
import colors from '../../styles/colors';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  // Import the auth context
  const { login } = useAuth();

  const handleRegister = () => {
    // TODO: Implement actual registration logic
    console.log('Register with:', name, email, cpf, empresa, password);
    
    // Use the auth context to log in after registration
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
        <View className="items-center mb-6">
          <View className="w-16 h-16 rounded-full bg-white items-center justify-center mb-2 shadow-lg">
            <Text className="text-3xl font-bold text-deepBlue">F</Text>
          </View>
          <Text className="text-2xl font-bold text-white mt-2">Criar Conta</Text>
          <Text className="text-base text-white/80 mt-1">Preencha seus dados para começar</Text>
        </View>

        <View className="space-y-3 w-full bg-white p-6 rounded-2xl shadow-md">
          <View>
            <Text className="text-sm font-medium text-deepBlue mb-1">Nome completo</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Seu nome completo"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#9CA3AF"
            />
          </View>

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
            <Text className="text-sm font-medium text-deepBlue mb-1">CPF</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Seu CPF"
              value={cpf}
              onChangeText={setCpf}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-deepBlue mb-1">Empresa</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Nome da empresa"
              value={empresa}
              onChangeText={setEmpresa}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-deepBlue mb-1">Senha</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Crie uma senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-deepBlue mb-1">Confirmar senha</Text>
            <TextInput
              className="w-full h-12 px-4 border border-lightBlue rounded-lg bg-white text-textPrimary"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity 
            className="w-full h-12 bg-deepBlue rounded-lg items-center justify-center mt-6 shadow-sm"
            onPress={handleRegister}
          >
            <Text className="text-white font-semibold text-base">Cadastrar</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-4">
            <Text className="text-gray-600">Já tem uma conta? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text className="text-deepBlue font-semibold">Entrar</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}