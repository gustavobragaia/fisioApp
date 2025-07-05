import { useMentalHealthForm } from "@/hooks/useMentalHealthForm";
import { FormTriagemRefType } from "@/types/triagem";
import React, { forwardRef, useImperativeHandle } from "react";
import { SafeAreaView } from "react-native";
import { Loading } from "../Loading";
import { CompletionState } from "./CompletionState";
import { FormHeader } from "./FormHeader";
import { NavigationButtons } from "./NavigationButtons";
import { ProgressIndicator } from "./ProgressIndicator";
import { QuestionContent } from "./QuestionContent";

const FormMentalHealth = forwardRef<FormTriagemRefType>((props, ref) => {
  const {
    questions,
    currentScreen,
    isLoading,
    response,
    goToNextScreen,
    goToPreviousScreen,
    submitFormData,
    resetForm,
  } = useMentalHealthForm();

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  const handleSubmit = async () => {
    await submitFormData();
    goToNextScreen();
  };

  const renderMainContent = () => {
    if (isLoading) {
      return <Loading />;
    }

    if (currentScreen >= questions.length) {
      return <CompletionState response={response} />;
    }

    const currentQuestion = questions[currentScreen];

    return (
      <>
        <ProgressIndicator
          totalSteps={questions.length}
          currentStep={currentScreen}
        />
        <FormHeader
          title="Avaliação de Saúde Mental"
          subtitle="Vamos entender melhor como você está se sentindo para recomendar os melhores exercícios"
        />
        <QuestionContent question={currentQuestion} />
        <NavigationButtons
          currentScreen={currentScreen}
          totalScreens={questions.length}
          hasAnswer={!!currentQuestion.state}
          onPrevious={goToPreviousScreen}
          onNext={goToNextScreen}
          onSubmit={handleSubmit}
        />
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {renderMainContent()}
    </SafeAreaView>
  );
});

FormMentalHealth.displayName = "FormMentalHealth";

export { FormMentalHealth };
