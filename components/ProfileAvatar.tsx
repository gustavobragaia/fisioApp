import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import colors from '../styles/colors';

interface ProfileAvatarProps {
  name: string;
  size?: number;
}

// Function to generate a consistent color based on name
const getColorFromName = (name: string) => {
  const colorOptions = [
    colors.light.deepBlue,
    colors.light.lightBlue,
    colors.light.seafoam,
    '#F4A261', // Additional colors for variety
    '#E76F51',
    '#2A9D8F'
  ];
  
  // Use the sum of character codes to pick a color
  const charSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colorOptions[charSum % colorOptions.length];
};

// Get initials from name (up to 2 characters)
const getInitials = (name: string) => {
  if (!name) return '?';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, size = 50 }) => {
  const backgroundColor = useMemo(() => getColorFromName(name), [name]);
  const initials = useMemo(() => getInitials(name), [name]);
  
  const fontSize = size * 0.4;
  
  return (
    <View 
      className="items-center justify-center rounded-full"
      style={{ 
        backgroundColor, 
        width: size, 
        height: size,
      }}
    >
      <Text 
        className="text-white font-bold"
        style={{ fontSize }}
      >
        {initials}
      </Text>
    </View>
  );
};

export default ProfileAvatar;
