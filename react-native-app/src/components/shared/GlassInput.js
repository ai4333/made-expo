import React from 'react';
import { View, TextInput, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function GlassInput({ label, value, onChangeText, placeholder, ...props }) {
  const { C } = useTheme();

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: C.muted }]}>{label}</Text>}
      <View style={[styles.inputContainer, { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.1)' }]}>
        <TextInput
          style={[styles.input, { color: C.heading }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.3)"
          {...props}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputContainer: {
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    fontWeight: '500',
  },
});
