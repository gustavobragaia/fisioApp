import React from 'react';
import { Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import colors from '../../styles/colors';

interface CaixaRadioCustomProps {
  label: string;
  value: string;
  selectedValue: string;
  onPress: (value: string) => void;
  imageSource: ImageSourcePropType;
}

export default function CaixaRadioCustom({ label, value, selectedValue, onPress, imageSource }: CaixaRadioCustomProps) {
  const isSelected = value === selectedValue;

  return (
    <TouchableOpacity 
      className='flex-column items-center justify-center gap-3'
      onPress={() => onPress(value)}
      style={{
        width: '100%',  
        height: 120,
        backgroundColor: isSelected ? colors.light.deepBlueLight : colors.background,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: isSelected ? colors.light.deepBlueBorder : '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}
      activeOpacity={0.7}
    >
      <Image
        source={imageSource}
        style={{ width: 30, height: 30, resizeMode: 'contain' }}
      />
      <Text className='text-center' style={{ fontSize: 14, color: isSelected ? colors.textPrimary: colors.textPrimary, marginBottom: 4 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
