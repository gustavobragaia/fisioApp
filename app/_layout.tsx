import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import "./global.css";
import { View, Text } from "react-native";

// Simple auth context to manage authentication state
import { createContext, useContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking for authentication status
  useEffect(() => {
    // Here you would check for a token in AsyncStorage or similar
    const checkAuth = async () => {
      // Simulate a delay to check auth status
      setTimeout(() => {
        // For now, default to not authenticated
        setIsAuthenticated(false);
        setIsLoading(false);
      }, 1000);
    };

    checkAuth();
  }, []);

  const authContext: AuthContextType = {
    isAuthenticated,
    login: () => setIsAuthenticated(true),
    logout: () => setIsAuthenticated(false),
  };

  // Show a loading screen while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-lg text-primary font-medium">Carregando...</Text>
      </View>
    );
  }

  // Use Expo Router's redirect pattern
  return (
    <AuthContext.Provider value={authContext}>
      <Stack initialRouteName={isAuthenticated ? "(tabs)" : "(auth)"} screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
      </Stack>
    </AuthContext.Provider>
  );
}
