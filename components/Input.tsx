import React, { useState } from 'react'
import {
  ColorValue,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import colors from '@/styles/colors'
import { Eye, EyeOff } from 'lucide-react-native'
import MaskInput from 'react-native-mask-input'

interface LucideIconProps {
  size?: number
  color?: ColorValue
  onPress?: () => void
}

interface InputProps extends TextInputProps {
  Icon?: React.ComponentType<LucideIconProps>
  placeholder: string
  isPassword?: boolean
  error?: string | null
  keyboardType?: KeyboardTypeOptions
  mask?: (string | RegExp)[]
}

export function Input({
  Icon,
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  error = null,
  keyboardType = 'default',
  mask,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const colorProgress = useSharedValue(error ? 0 : 1)
  
  const placeholderAnimation = useSharedValue(0)

  React.useEffect(() => {
    colorProgress.value = withTiming(error ? 0 : 1, { duration: 150 })
  }, [error, colorProgress])

  React.useEffect(() => {
    const shouldAnimateUp = value && value.length > 0
    placeholderAnimation.value = withTiming(shouldAnimateUp ? 1 : 0, { duration: 150 })
  }, [value, placeholderAnimation])

  const animatedInputStyle = useAnimatedStyle(() => {
    if (!error) {
      return {
        borderWidth: 1,
        borderColor: "transparent",
      }
    }

    const interpolatedBorderColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.error, colors.input],
    )

    return {
      borderWidth: 1,
      borderColor: interpolatedBorderColor,
    }
  })

  const animatedPlaceholderStyle = useAnimatedStyle(() => {
    const translateY = placeholderAnimation.value * -25
    const translateX = placeholderAnimation.value * -12
    const scale = 1 - placeholderAnimation.value * 0.15
    const opacity = 1 - placeholderAnimation.value * 0.3

    const interpolatedColor = interpolateColor(
      colorProgress.value,
      [0, 1],
      [colors.error, colors.input],
    )

    return {
      transform: [{ translateY }, { translateX }, { scale }],
      opacity,
      color: interpolatedColor,
    }
  })

  const iconColor = error ? colors.error : colors.input
  const PasswordToggleIcon = showPassword ? EyeOff : Eye
  const TextInputComponent = mask ? MaskInput : TextInput

  const showStaticPlaceholder = !value || value.length === 0

  return (
    <View className='mb-5'>
      <Animated.View style={[styles.inputContainer, animatedInputStyle]}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={20} color={iconColor} />
          </View>
        )}

        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.animatedPlaceholder, animatedPlaceholderStyle]}>
            {placeholder}
          </Animated.Text>

          <TextInputComponent
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !showPassword}
            keyboardType={keyboardType}
            placeholder={showStaticPlaceholder ? '' : placeholder}
            placeholderTextColor="transparent"
            {...(mask && { mask })}
            {...(props as TextInputProps)}
          />
        </View>

        {isPassword && (
          <View style={styles.passwordToggle}>
            <PasswordToggleIcon
              size={20}
              color={iconColor}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        )}
      </Animated.View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(141, 144, 161, 0.08)',
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 12,
    minHeight: 70,
    height: 70,
  },
  iconContainer: {
    marginRight: 16,
    marginLeft: 0,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    height: '100%',
  },
  animatedPlaceholder: {
    position: 'absolute',
    left: 0,
    fontSize: 16,
    color: colors.input,
    zIndex: 1,
    pointerEvents: 'none',
  },
  input: {
    color: colors.textPrimary,
    fontSize: 16,
    padding: 0,
    height: '100%',
    minHeight: 46,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
  },
  passwordToggle: {
    marginLeft: 12,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 0,
  },
})