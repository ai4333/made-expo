import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Animated } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PremiumIcon from '../components/shared/PremiumIcon';
import PremiumButton from '../components/shared/PremiumButton';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'search-outline',
    title: 'Institutional Discovery',
    subtitle: 'Access a curated portfolio of verified institutional grade housing.',
  },
  {
    icon: 'people-outline',
    title: 'Social Alignment',
    subtitle: 'Our proprietary algorithm matches you with compatible professional profiles.',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Secure Onboarding',
    subtitle: 'Zero brokerage, instant digital contracts, and 24/7 concierge support.',
  },
];

export default function OnboardingScreen({ navigation }) {
  const { C } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(nextIndex);
        scrollViewRef.current?.scrollTo({ x: width * nextIndex, animated: true });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    } else {
      navigation.replace('TenantMain');
    }
  };

  const handleSkip = () => {
    navigation.replace('TenantMain');
  };

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: C.muted }]}>Skip Discovery</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <Animated.View style={[styles.slideContent, { opacity: fadeAnim }]}>
              <View style={[styles.iconContainer, { backgroundColor: 'rgba(131, 56, 236, 0.1)' }]}>
                <PremiumIcon name={slide.icon} size={80} color={C.primary} />
              </View>
              <Text style={[styles.title, { color: C.heading }]}>{slide.title}</Text>
              <Text style={[styles.subtitle, { color: C.muted }]}>{slide.subtitle}</Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: currentIndex === index ? C.primary : 'rgba(255,255,255,0.1)' },
                currentIndex === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <PremiumButton 
          title={currentIndex === slides.length - 1 ? 'Begin Experience' : 'Next Phase'} 
          onPress={handleNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  slideContent: {
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 20,
  },
});
