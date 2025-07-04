import { Redirect, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import "./global.css";

import colors from "@/styles/colors";
import { ToastProvider } from 'react-native-toast-notifications';
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    setInitializing(false);
  }, []);

  if (initializing) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-primary font-medium">Carregando...</Text>
        </View>
    );
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

function AppNavigator() {
  const { session, isLoading } = useAuth();

  console.log("Session:", session);
  console.log("Is Loading:", isLoading);
  console.log("Initial Route:", session ? "(tabs)" : "(auth)");

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="text-lg text-primary font-medium">Carregand8...</Text>
      </View>
    );
  }

  if(session && !isLoading) {
    console.log("User is authenticated, navigating to (tabs)");
    return <Redirect href="/(tabs)" />
  } else {
    console.log("User is not authenticated, navigating to (auth)");
  }

  return (
    <ToastProvider>
      <Stack initialRouteName={session ? "(tabs)" : "(auth)"} screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
    </ToastProvider>
  );
}
