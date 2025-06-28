import { UserStats } from "@/app/(tabs)";
import DiasSeguidosHeaderIcon from "@/assets/images/home/DiasSeguidosHeaderIcon";
import ExerciciosHeaderIcon from "@/assets/images/home/ExerciciosHeaderIcon";
import TriagensHeaderIcon from "@/assets/images/home/TriagensHeaderIcon";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";

export const DashboardHeader = ({ userStats }: { userStats: UserStats }) => (
  <SafeAreaView className="bg-primary rounded-b-3xl overflow-hidden">
    <ImageBackground
      source={require('@/assets/images/banner-background.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
      imageStyle={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
    >
      <View className="absolute inset-0 bg-primary/60 rounded-b-3xl" />
      
      <View className="p-6 pt-24 relative z-10">
        <Text className="text-4xl font-bold text-white">
          Bem-vindo de volta,
        </Text>
        <Text className="text-3xl font-bold text-white">
          {userStats.name} 👋
        </Text>
        
        <View className="flex-row justify-around items-center mt-6">
          <StatItem 
            icon={<ExerciciosHeaderIcon />}
            value={userStats.exercisesDone}
            label="Exercícios"
          />
          <StatItem 
            icon={<TriagensHeaderIcon />}
            value={userStats.triagemCount}
            label="Triagens"
          />
          <StatItem 
            icon={<DiasSeguidosHeaderIcon />}
            value={userStats.consecutiveDays}
            label="Dias seguidos"
          />
        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
);

const StatItem = ({ icon, value, label }: { 
  icon: any; 
  value: number; 
  label: string; 
}) => (
  <View className="items-center gap-2">
    {icon}
    <Text className="text-2xl font-bold text-white">{value}</Text>
    <Text className="text-white text-sm">{label}</Text>
  </View>
);