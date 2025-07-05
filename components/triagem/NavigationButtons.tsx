import { ArrowRight2, ExportCircle } from 'iconsax-react-native';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../Button';

interface NavigationButtonsProps {
  currentScreen: number;
  totalScreens: number;
  hasAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => Promise<void>;
}

export function NavigationButtons({
  currentScreen,
  totalScreens,
  hasAnswer,
  onPrevious,
  onNext,
  onSubmit,
}: NavigationButtonsProps) {
  const isLastScreen = currentScreen === totalScreens - 1;
  const isFirstScreen = currentScreen === 0;

  const handleMainAction = async () => {
    if (isLastScreen) {
      await onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <View className="flex-row justify-between py-4">
      <Button
        onPress={onPrevious}
        disabled={isFirstScreen}
        title="Voltar"
        variant="secondary"
      />

      <Button
        title={isLastScreen ? "Finalizar Avaliação" : "Próxima"}
        iconPosition={isLastScreen ? "left" : "right"}
        Icon={isLastScreen ? ExportCircle : ArrowRight2}
        onPress={handleMainAction}
        disabled={!hasAnswer}
      />
    </View>
  );
};
