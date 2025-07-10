import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import "./global.css";

import { Loading } from "@/components/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  fade: true,
});

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    SplashScreen.hide();
    setInitializing(false);
  }, []);

  if (initializing) {
    return (
      <Loading />
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
