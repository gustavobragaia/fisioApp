import { ButtonOnboarding } from "@/components/onboarding/ButtonOnboarding";
import { ListItem } from "@/components/onboarding/ListItem";
import { PaginationElement } from "@/components/onboarding/PaginationElement";
import colors from "@/styles/colors";
import React, { useCallback, useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const pages = [
  {
    text: "Identifique suas principais dores",
    subtext:
      "Responda a algumas perguntas simples para entendermos suas dores mentais, e recomendar os exercícios mais adequados para você.",
    image: require("../../assets/images/onboarding/onboarding-1.png"),
  },
  {
    text: "Exercícios personalizados",
    subtext:
      "Receba exercícios feito sob medida para as suas dores, com orientações passo a passo para cada movimento.",
    image: require("../../assets/images/onboarding/onboarding-2.png"),
  },
  {
    text: "Acompanhe seu progresso",
    subtext:
      "Monitore sua evolução, registre seus treinos e sinta a diferença a cada dia. Veja como a consistência leva ao alívio e à sua recuperação.",
    image: require("../../assets/images/onboarding/onboarding-3.png"),
  },
  {
    text: "Viva uma vida ativa e sem dor",
    subtext:
      "Com Alivio Já, você terá as ferramentas para gerenciar suas dores e retomar as atividades que mais ama, tudo na palma da sua mão.",
    image: require("../../assets/images/onboarding/onboarding-4.png"),
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animateToIndex = useCallback(
    (targetIndex: number) => {
      if (targetIndex >= 0 && targetIndex < pages.length) {
        const itemsPerRow = 2;
        const row = Math.floor(targetIndex / itemsPerRow);
        const col = targetIndex % itemsPerRow;

        translateX.value = withTiming(-col * SCREEN_WIDTH, {
          duration: 600,
          easing: Easing.out(Easing.quad),
        });

        translateY.value = withTiming(-row * SCREEN_HEIGHT, {
          duration: 600,
          easing: Easing.out(Easing.quad),
        });

        setCurrentIndex(targetIndex);
      }
    },
    [translateX, translateY]
  );

  const animateToNext = useCallback(() => {
    if (currentIndex < pages.length - 1) {
      animateToIndex(currentIndex + 1);
    }
  }, [currentIndex, animateToIndex]);

  const animateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      animateToIndex(currentIndex - 1);
    }
  }, [currentIndex, animateToIndex]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
    },
    onEnd: (event) => {
      const { velocityX, translationX } = event;
      const threshold = SCREEN_WIDTH * 0.3;

      if (Math.abs(translationX) > threshold || Math.abs(velocityX) > 500) {
        if (translationX > 0) {
          runOnJS(animateToPrevious)();
        } else {
          runOnJS(animateToNext)();
        }
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const renderPages = () => {
    const itemsPerRow = 2;
    const rows = Math.ceil(pages.length / itemsPerRow);

    return Array.from({ length: rows }).map((_, rowIndex) => (
      <View key={rowIndex} style={{ flexDirection: "row" }}>
        {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
          const pageIndex = rowIndex * itemsPerRow + colIndex;
          if (pageIndex >= pages.length) return null;

          return (
            <View
              key={pageIndex}
              style={{
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
              }}
            >
              <ListItem
                item={pages[pageIndex]}
                index={pageIndex}
                currentIndex={currentIndex}
              />
            </View>
          );
        })}
      </View>
    ));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {
                flex: 1,
              },
              containerStyle,
            ]}
          >
            {renderPages()}
          </Animated.View>
        </PanGestureHandler>

        <View
          style={{
            position: "absolute",
            bottom: 60,
            left: 32,
            right: 32,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 32,
          }}
        >
          <PaginationElement
            length={pages.length}
            currentIndex={currentIndex}
            onDotPress={animateToIndex}
          />
          <ButtonOnboarding
            currentIndex={currentIndex}
            length={pages.length}
            onPress={animateToNext}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
