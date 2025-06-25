import { UserStats } from "@/app/(tabs)";
import { Image, SafeAreaView, Text, View } from "react-native";
const DiasSeguidosHeaderIcon = require("../../assets/images/home/dias-seguidos-header-icon.png");
const ExerciciosHeaderIcon = require("../../assets/images/home/exercicios-header-icon.png");
const TriagensHeaderIcon = require("../../assets/images/home/triagens-header-icon.png");

export const DashboardHeader = ({ userStats }: { userStats: UserStats }) => (
  <SafeAreaView className="bg-primary rounded-b-3xl">
    <View className="p-6 pt-24">
      <Text className="text-4xl font-bold text-white">
        Bem-vindo de volta,
      </Text>
      <Text className="text-3xl font-bold text-white">
        {userStats.name} 👋
      </Text>
      
      <View className="flex flex-row justify-around items-center mt-6">
        <StatItem 
          icon={ExerciciosHeaderIcon}
          value={userStats.exercisesDone}
          label="Exercícios"
        />
        <StatItem 
          icon={TriagensHeaderIcon}
          value={userStats.triagemCount}
          label="Triagens"
        />
        <StatItem 
          icon={DiasSeguidosHeaderIcon}
          value={userStats.consecutiveDays}
          label="Dias seguidos"
        />
      </View>
    </View>
  </SafeAreaView>
);

const StatItem = ({ icon, value, label }: { 
  icon: any; 
  value: number; 
  label: string; 
}) => (
  <View className="items-center gap-2">
    <Image source={icon} />
    <Text className="text-2xl font-bold text-white">{value}</Text>
    <Text className="text-white text-sm">{label}</Text>
  </View>
);
