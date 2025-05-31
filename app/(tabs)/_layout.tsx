import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="(triagem)/triagem" options={{ title: "Triagem", headerShown: false }} />

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
