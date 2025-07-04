import { Tabs } from "expo-router";
import { Health, Home2, Profile } from "iconsax-react-native";
import colors from "../../styles/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarShowLabel: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 90, // Aumenta a altura total da tab bar
          paddingTop: 12,
          paddingBottom: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Home2
              size={size}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(triagem)/triagem"
        options={{
          title: "Triagem",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Health
              size={size}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Profile
              size={size}
              color={color}
              variant={focused ? "Bold" : "Outline"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(triagem)/diagnostic-ideal"
        options={{
          title: "Diagnóstico Ideal",
          headerShown: false,
          href: null, // dont show the diagnostic screens in the tab bar
        }}
      />
      <Tabs.Screen
        name="(triagem)/(exercises)/exercise-group"
        options={{
          title: "Exercícios",
          headerShown: false,
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="(triagem)/(exercises)/single-exercise"
        options={{
          title: "Exercício",
          headerShown: false,
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="(triagem)/(mental)/index"
        options={{
          title: "Saúde Mental",
          headerShown: false,
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="(triagem)/(pain)/index"
        options={{
          title: "Dor",
          headerShown: false,
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name="(triagem)/(pain)/results"
        options={{
          title: "Resultados",
          headerShown: false,
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
