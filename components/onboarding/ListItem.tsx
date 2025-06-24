import colors from '@/styles/colors'
import React from 'react'
import {
  Image,
  ImageURISource,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'

type Props = {
  item: {
    text: string
    subtext: string
    image: ImageURISource
  }
  index: number
  currentIndex: number
}

export const ListItem = ({ item, index, currentIndex }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = currentIndex === index
    const opacity = withTiming(isActive ? 1 : 0.3, { duration: 400 })
    const scale = withTiming(isActive ? 1 : 0.8, { duration: 400 })
    
    return {
      opacity,
      transform: [{ scale }],
    }
  })

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.textItem}>{item.text}</Text>
        <Text style={styles.subtextItem}>{item.subtext}</Text>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 200,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 60,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: '90%',
  },
  textItem: {
    fontWeight: '600',
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 42,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtextItem: {
    fontWeight: '400',
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
})
