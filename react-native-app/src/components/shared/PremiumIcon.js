import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

export default function PremiumIcon({ name, size = 24, color, style }) {
  const { C } = useTheme();
  
  return (
    <Ionicons 
      name={name} 
      size={size} 
      color={color || C.primary} 
      style={style}
    />
  );
}
