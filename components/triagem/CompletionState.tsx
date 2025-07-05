import React from "react";
import { Text, View } from "react-native";

interface CompletionStateProps {
  response?: string;
}

export function CompletionState({ response }: CompletionStateProps) {
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-2xl font-bold mb-4 text-deepBlue">
        Avaliação Concluída!
      </Text>
      <Text className="text-lg text-center mb-6 text-textPrimary">
        Suas respostas foram enviadas com sucesso. Aguarde o redirecionamento...
      </Text>
      {response && (
        <Text className="text-sm mt-4 text-textPrimary">
          Resposta: {response}
        </Text>
      )}
    </View>
  );
}
