import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function GlassCard({ children, style, intensity = 1 }) {
  const { C } = useTheme();

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(20, 20, 30, 0.7)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
