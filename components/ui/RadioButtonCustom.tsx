import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

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
      onPress={() => onPress(value)}
      style={{
        width: '100%',
        height: 100,
        backgroundColor: isSelected ? '#007AFF' : '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: isSelected ? '#007AFF' : '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
      }}
      activeOpacity={0.7}
    >
      <Text style={{ fontSize: 14, color: isSelected ? '#fff' : '#333', marginBottom: 4 }}>
        {label}
      </Text>
      <Image
        source={imageSource}
        style={{ width: 30, height: 30, resizeMode: 'contain' }}
      />
    </TouchableOpacity>
  );
}
