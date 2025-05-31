import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../styles/colors";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.light.deepBlue,
      tabBarInactiveTintColor: "#888",
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="(triagem)/triagem" 
        options={{ 
          title: "Triagem", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Perfil", 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }} 
      />

      <Tabs.Screen 
        name="(triagem)/diagnostic-ideal" 
        options={{ 
          title: "Diagnóstico Ideal", 
          headerShown: false,
         // href: null // dont show the diagnostic screens in the tab bar
        }} 
      />
      <Tabs.Screen 
        name="(triagem)/(exercises)/exercise-group" 
        options={{ 
          title: "Exercícios", 
          headerShown: false,
          href: null // Hide from tab bar
        }} 
      />
      <Tabs.Screen 
        name="(triagem)/(exercises)/single-exercise" 
        options={{ 
          title: "Exercício", 
          headerShown: false,
          href: null // Hide from tab bar
        }} 
      />
    </Tabs>
  )
}
