import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import "./global.css";
import { View, Text } from "react-native";

// Import the proper AuthProvider from contexts
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  
  // Set initializing to false after component mounts
  useEffect(() => {
    setInitializing(false);
  }, []);

  // We'll use a simple loading screen while the AuthProvider is initializing
  if (initializing) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-primary font-medium">Carregando...</Text>
      </View>
    );
  }

  // Wrap the entire app with the AuthProvider
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

// Separate component for navigation that can access the auth context
function AppNavigator() {
  const { session, isLoading } = useAuth();
  
  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-primary font-medium">Carregando...</Text>
      </View>
    );
  }
  
  // Use Expo Router's Stack for navigation
  return (
    <Stack initialRouteName={session ? "(tabs)" : "(auth)"} screenOptions={{ headerShown: false }}>
      {!session ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
