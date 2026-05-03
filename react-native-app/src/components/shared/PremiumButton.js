import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function PremiumButton({ title, onPress, type = 'primary', style }) {
  const { C } = useTheme();
  const scale = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const buttonStyle = [
    styles.button,
    { backgroundColor: type === 'primary' ? C.primary : 'rgba(255,255,255,0.05)' },
    type === 'outline' && { borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    style,
    { transform: [{ scale }] }
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Animated.View style={buttonStyle}>
        <Text style={[styles.text, { color: type === 'primary' ? '#FFF' : C.primary }]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 58,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
