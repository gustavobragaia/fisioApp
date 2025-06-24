import colors from '@/styles/colors'
import { useRouter } from 'expo-router'
import { ChevronRight } from 'lucide-react-native'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated'

type Props = {
  currentIndex: number
  length: number
  onPress: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const ButtonOnboarding = ({ currentIndex, length, onPress }: Props) => {
  const router = useRouter()

  const buttonStyle = useAnimatedStyle(() => {
    return {
      width: currentIndex === length - 1 ? withSpring(140) : withSpring(72),
      height: 72,
    }
  })

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex === length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: currentIndex === length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    }
  })

  const iconStyle = useAnimatedStyle(() => {
    return {
      opacity: currentIndex !== length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX: currentIndex !== length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    }
  })

  const handlePress = () => {
    if (currentIndex === length - 1) {
      router.navigate('/(auth)/login')
    } else {
      onPress()
    }
  }

  return (
    <AnimatedPressable 
      style={[styles.container, buttonStyle]} 
      onPress={handlePress}
    >
      <Animated.Text style={[styles.textStyle, textStyle]}>
        Começar
      </Animated.Text>
      <Animated.View style={iconStyle}>
        <ChevronRight size={24} color="#ffffff" />
      </Animated.View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: 56,
  },
  textStyle: {
    color: '#ffffff',
    position: 'absolute',
    fontWeight: '600',
    fontSize: 16,
  },
})
