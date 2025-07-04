import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import "./global.css";

import { Loading } from "@/components/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";
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
  const queryClient = new QueryClient();
  const { session, isLoading } = useAuth();

  // console.log("Session:", session);
  // console.log("Is Loading:", isLoading);
  // console.log("Initial Route:", session ? "(tabs)" : "(auth)");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
        <Stack
          initialRouteName={session ? "(tabs)" : "(auth)"}
          screenOptions={{ headerShown: false }}
        >
          {!session ? (
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          )}
        </Stack>
      </QueryClientProvider>
    </ToastProvider>
  );
}
