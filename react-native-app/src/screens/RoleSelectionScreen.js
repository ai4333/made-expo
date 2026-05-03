import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumIcon from '../components/shared/PremiumIcon';
import { useTheme } from '../context/ThemeContext';

function RoleCard({ icon, title, subtitle, chips, accent, onPress, badge }) {
  const { C, isDark } = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={[styles.card, { backgroundColor: C.card, borderColor: accent + '33' }]}> 
      {badge ? (
        <View style={styles.badgeWrap}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}

      <View style={styles.cardHeader}>
        <View style={[styles.iconBox, { backgroundColor: accent + '1A' }]}>
          <Text style={styles.iconEmoji}>{icon}</Text>
        </View>
        <PremiumIcon name="chevron-forward" size={18} color={accent} />
      </View>

      <Text style={[styles.cardTitle, { color: C.heading }]}>{title}</Text>
      <Text style={[styles.cardSubtitle, { color: C.muted }]}>{subtitle}</Text>

      <View style={styles.chipRow}>
        {chips.map((chip) => (
          <View key={chip} style={[styles.chip, { borderColor: accent + '33', backgroundColor: accent + '12' }]}>
            <Text style={[styles.chipText, { color: accent }]}>{chip}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

export default function RoleSelectionScreen({ navigation }) {
  const { C } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <LinearGradient colors={[C.primary, C.primaryLight, C.primaryLight]} style={styles.top}> 
        <View style={styles.logoBox}>
          <PremiumIcon name="home" size={28} color="#FFFFFF" />
        </View>
        <Text style={styles.brand}>Staazy</Text>
        <Text style={styles.subtitle}>Who are you?</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <RoleCard
          icon="🏠"
          title="I'm Looking for a PG"
          subtitle="Find rooms, match with roommates"
          chips={['Browse PGs', 'Find Roommates', 'Zero Brokerage']}
          accent={C.primary}
          badge="Most Popular"
          onPress={() => navigation.navigate('Auth')}
        />

        <RoleCard
          icon="🏢"
          title="I Own a PG"
          subtitle="Manage tenants and collect rent"
          chips={['Manage Tenants', 'Rent Collection', 'Analytics']}
          accent={C.ownerPrimary}
          onPress={() => navigation.navigate('OwnerAuth')}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Auth')} style={styles.loginLink}>
          <Text style={[styles.loginText, { color: C.primary }]}>Already have an account? Log in</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    paddingTop: 64,
    paddingBottom: 42,
    alignItems: 'center',
  },
  logoBox: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  brand: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 28,
  },
  card: {
    borderWidth: 2,
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  badgeWrap: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  badgeText: {
    color: '#B45309',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 13,
    marginTop: 3,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 11,
    fontWeight: '600',
  },
  loginLink: {
    alignSelf: 'center',
    marginTop: 8,
  },
  loginText: {
    fontSize: 13,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});
