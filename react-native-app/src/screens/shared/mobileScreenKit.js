import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import PremiumIcon from '../../components/shared/PremiumIcon';
import { useTheme } from '../../context/ThemeContext';
import { pgListings, tenants } from '../../data/mockData';

export const PURPLE = '#8338EC';
export const VIOLET = '#7C3AED';
export const GREEN = '#06D6A0';
export const ORANGE = '#FFD166';
export const RED = '#EF476F';
export const WA_GREEN = '#25D366';

export function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString()}`;
}

export function getInitials(name) {
  return String(name || '')
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function getTenantById(id) {
  return tenants.find((t) => t.id === id) || tenants[0];
}

export function getPGById(id) {
  return pgListings.find((pg) => pg.id === id) || pgListings[0];
}

export function Header({ title, navigation, right }) {
  const { C, isDark } = useTheme();
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', borderColor: C.border }]}
      >
        <PremiumIcon name="chevron-back" size={20} color={C.heading} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: C.heading }]}>{title}</Text>
      {right || <View style={styles.headerRightSpacer} />}
    </View>
  );
}

export function Chip({ label, active, onPress, activeColor = PURPLE }) {
  const { C, isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.chip,
        active
          ? { backgroundColor: activeColor, borderColor: activeColor }
          : { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9', borderColor: C.border },
      ]}
    >
      <Text style={[styles.chipText, { color: active ? '#FFF' : C.muted }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenPad: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
  },
  listPad: {
    paddingHorizontal: 22,
    paddingBottom: 40,
  },
  bottomPadLarge: {
    paddingBottom: 120,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    height: 48,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 16,
    letterSpacing: -0.5,
  },
  headerRightSpacer: {
    width: 44,
    height: 44,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginTop: 32,
    marginBottom: 16,
  },
  sectionSubtle: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },

  card: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  cardSub: {
    fontSize: 14,
    lineHeight: 20,
  },

  sectionBlock: {
    paddingHorizontal: 22,
    marginTop: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  listRow: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  rowSub: {
    fontSize: 13,
    marginTop: 2,
  },
  flex1: {
    flex: 1,
  },

  heroCard: {
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingHorizontal: 22,
    paddingBottom: 36,
  },
  heroTag: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 12,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 16,
    marginTop: 6,
    opacity: 0.8,
  },
  heroStatsRow: {
    flexDirection: 'row',
    marginTop: 28,
    gap: 12,
  },
  heroStatBox: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  heroStatLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.6,
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },

  quickGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  quickCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  quickLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  amenityWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  amenityPill: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityText: {
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '700',
  },

  chip: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  pgCard: {
    borderWidth: 1,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 24,
  },
  pgImage: {
    width: '100%',
    height: 200,
  },
  pgCardBody: {
    padding: 22,
  },
  priceTag: {
    fontSize: 18,
    fontWeight: '800',
  },
  inlineMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 14,
    marginBottom: 22,
    gap: 12,
  },
  metaBadge: {
    fontSize: 12,
    fontWeight: '700',
  },

  ghostButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  ghostButtonText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  smallPrimary: {
    borderRadius: 16,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  smallPrimaryText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  smallCta: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  primaryButton: {
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },

  searchBox: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    height: 56,
  },
  searchInput: {
    flex: 1,
    height: 56,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },

  profileHero: {
    borderWidth: 1,
    borderRadius: 36,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar72: {
    width: 72,
    height: 72,
    borderRadius: 24,
  },
  avatarFallbackLarge: {
    width: 88,
    height: 88,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    borderWidth: 1,
    borderRadius: 18,
    height: 56,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 15,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  unreadDot: {
    minWidth: 22,
    paddingHorizontal: 8,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '900',
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  iconBubbleLarge: {
    width: 80,
    height: 80,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtext: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 16,
  },
  otpInput: {
    width: 50,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 48,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    opacity: 0.4,
  },
});
