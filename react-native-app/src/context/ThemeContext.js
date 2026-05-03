import React, { createContext, useContext } from 'react';
import { View } from 'react-native';

export const LIGHT = {
  bg: '#F8FAFC',
  card: 'rgba(255, 255, 255, 0.9)',
  elevated: '#FFFFFF',
  border: '#E2E8F0',
  primary: '#8338EC',
  primaryLight: '#9D5BFF',
  primaryGhost: 'rgba(131, 56, 236, 0.08)',
  primaryBorder: 'rgba(131, 56, 236, 0.2)',
  secondary: '#3A86FF',
  heading: '#0F172A',
  body: '#475569',
  muted: '#94A3B8',
  glass: 'rgba(255, 255, 255, 0.7)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  danger: '#EF476F',
  warning: '#FFD166',
  success: '#06D6A0',
  ownerPrimary: '#059669',
  ownerPrimaryLight: '#10B981',
  ownerPrimaryGhost: 'rgba(5, 150, 105, 0.08)',
};

export const DEEP = {
  bg: '#08080A',
  card: 'rgba(28, 28, 45, 0.6)',
  elevated: 'rgba(40, 40, 60, 0.8)',
  border: 'rgba(255, 255, 255, 0.1)',
  primary: '#8338EC', 
  primaryLight: '#9D5BFF',
  primaryGhost: 'rgba(131, 56, 236, 0.15)',
  primaryBorder: 'rgba(131, 56, 236, 0.3)',
  secondary: '#3A86FF',
  heading: '#FFFFFF',
  body: '#E2E8F0',
  muted: '#64748B',
  glass: 'rgba(255, 255, 255, 0.03)',
  glassBorder: 'rgba(255, 255, 255, 0.08)',
  danger: '#FF006E',
  warning: '#FFBE0B',
  success: '#3FB950',
  ownerPrimary: '#059669',
  ownerPrimaryLight: '#10B981',
  ownerPrimaryGhost: 'rgba(5, 150, 105, 0.15)',
};

const ThemeContext = createContext({
  isDark: false,
  toggle: () => {},
  C: LIGHT,
});

export function ThemeProvider({ children }) {
  const isDark = false;
  const C = LIGHT;
  const toggle = () => {};

  return (
    <ThemeContext.Provider value={{ isDark, toggle, C }}>
      <View style={{ flex: 1, backgroundColor: C.bg }}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
