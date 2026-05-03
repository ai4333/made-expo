import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PremiumIcon from '../components/shared/PremiumIcon';
import PremiumButton from '../components/shared/PremiumButton';

const lifestyleChips = ['Early Bird', 'Night Owl', 'Homebody', 'Social', 'Fitness Enthusiast', 'Foodie', 'Traveler', 'Minimalist'];
const interestChips = ['Music', 'Gaming', 'Reading', 'Cinema', 'Arts', 'Wellness', 'Culinary', 'Technology'];

export default function VibeCalibrationScreen({ navigation }) {
  const { C } = useTheme();
  const [selectedLifestyle, setSelectedLifestyle] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const toggleLifestyle = (item) => {
    setSelectedLifestyle(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleInterest = (item) => {
    setSelectedInterests(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleContinue = () => {
    navigation.replace('TenantMain');
  };

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.headerIconBox, { backgroundColor: 'rgba(131, 56, 236, 0.1)' }]}>
            <PremiumIcon name="options-outline" size={28} />
          </View>
          <Text style={[styles.title, { color: C.heading }]}>Preference Alignment</Text>
          <Text style={[styles.subtitle, { color: C.muted }]}>Calibrate your profile to optimize social compatibility matching.</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.muted }]}>Core Lifestyle</Text>
          <View style={styles.chipContainer}>
            {lifestyleChips.map((chip) => {
              const isActive = selectedLifestyle.includes(chip);
              return (
                <TouchableOpacity
                  key={chip}
                  style={[
                    styles.chip,
                    { 
                      backgroundColor: isActive ? C.primary : 'rgba(255,255,255,0.05)',
                      borderColor: isActive ? C.primary : 'rgba(255,255,255,0.1)'
                    }
                  ]}
                  onPress={() => toggleLifestyle(chip)}
                >
                  <Text style={[styles.chipText, { color: isActive ? '#FFF' : C.body }]}>{chip}</Text>
                  {isActive && <PremiumIcon name="checkmark" size={12} color="#FFF" style={{ marginLeft: 6 }} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: C.muted }]}>Areas of Interest</Text>
          <View style={styles.chipContainer}>
            {interestChips.map((chip) => {
              const isActive = selectedInterests.includes(chip);
              return (
                <TouchableOpacity
                  key={chip}
                  style={[
                    styles.chip,
                    { 
                      backgroundColor: isActive ? C.secondary : 'rgba(255,255,255,0.05)',
                      borderColor: isActive ? C.secondary : 'rgba(255,255,255,0.1)'
                    }
                  ]}
                  onPress={() => toggleInterest(chip)}
                >
                  <Text style={[styles.chipText, { color: isActive ? '#FFF' : C.body }]}>{chip}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PremiumButton 
          title="Complete Calibration" 
          onPress={handleContinue}
          type={(selectedLifestyle.length > 0 || selectedInterests.length > 0) ? 'primary' : 'outline'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: 80,
  },
  header: {
    marginBottom: 44,
  },
  headerIconBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 20,
    marginLeft: 4,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 100,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    padding: 24,
    paddingBottom: 50,
  },
});
