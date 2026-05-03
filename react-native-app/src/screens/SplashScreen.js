import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PremiumIcon from '../components/shared/PremiumIcon';

export default function SplashScreen({ navigation }) {
  const { C } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('RoleSelection');
    }, 2800);
    
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.logoContainer}>
          <PremiumIcon name="home-outline" size={56} color={C.primary} />
        </View>
        <Text style={[styles.title, { color: C.heading }]}>Staazy</Text>
        <Text style={[styles.subtitle, { color: C.muted }]}>Institutional Housing redefined</Text>
      </Animated.View>
      <Text style={[styles.footer, { color: 'rgba(255,255,255,0.2)' }]}>Bespoke living experiences</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
