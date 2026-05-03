import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumIcon from '../components/shared/PremiumIcon';
import { useAppData } from '../context/AppDataContext';
import { useTheme } from '../context/ThemeContext';
import { pgListings } from '../data/mockData';

export default function HomeScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const {
    hasJoinedPg,
    joinedPg,
    joinPG,
    savedPgIds,
    toggleSavedPg,
  } = useAppData();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Near Me', 'Budget', 'Room Type', 'Vibe Match'];

  const list = useMemo(() => {
    if (activeFilter === 'All') return pgListings;
    if (activeFilter === 'Near Me') return pgListings.filter((p) => p.distance.includes('km'));
    if (activeFilter === 'Budget') return pgListings.filter((p) => p.price <= 10000);
    return pgListings;
  }, [activeFilter]);

  const joinAndOpen = (pgId) => {
    const res = joinPG(pgId);
    if (res.ok) navigation.navigate('TenantMessages');
  };

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}> 
      <LinearGradient colors={[C.primary, C.primaryLight]} style={styles.hero}> 
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.heroLabel}>Your PG</Text>
            <Text style={styles.heroTitle}>{hasJoinedPg ? joinedPg.name : 'Find Your Space'}</Text>
            <Text style={styles.heroSub}>{hasJoinedPg ? `${joinedPg.area} · Joined` : 'Browse PGs and join instantly'}</Text>
          </View>
          <TouchableOpacity style={styles.heroNotif} onPress={() => navigation.navigate('Notifications')}>
            <PremiumIcon name="notifications-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.quickRow}>
          {[
            { label: 'Updates', icon: 'megaphone-outline', screen: 'TenantUpdates' },
            { label: 'Issues', icon: 'alert-circle-outline', screen: 'TenantComplaints' },
            { label: 'Messages', icon: 'chatbubbles-outline', screen: 'TenantMessages' },
            { label: 'Connect', icon: 'people-outline', screen: 'Connect' },
          ].map((a) => (
            <TouchableOpacity key={a.label} style={styles.quickAction} onPress={() => navigation.navigate(a.screen)}>
              <PremiumIcon name={a.icon} size={16} color="#FFFFFF" />
              <Text style={styles.quickText}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.filtersWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[styles.filterChip, { backgroundColor: activeFilter === f ? C.primary : C.card, borderColor: activeFilter === f ? C.primary : C.border }]}
            >
              <Text style={[styles.filterChipText, { color: activeFilter === f ? '#FFFFFF' : C.body }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 30 }}
        renderItem={({ item }) => (
          <PgCard
            pg={item}
            saved={savedPgIds.includes(item.id)}
            onToggleSave={() => toggleSavedPg(item.id)}
            onView={() => navigation.navigate('PGDetail', { pgId: item.id })}
            onJoin={() => joinAndOpen(item.id)}
          />
        )}
      />
    </View>
  );
}

function PgCard({ pg, saved, onToggleSave, onView, onJoin }) {
  const { C, isDark } = useTheme();
  return (
    <View style={[styles.pgCard, { backgroundColor: C.card, borderColor: C.border }]}>
      <Image source={{ uri: pg.images[0] }} style={styles.pgImage} />
      <View style={styles.pgOverlayRow}>
        <View style={styles.availablePill}>
          <Text style={styles.availableText}>{pg.bedsAvailable} beds</Text>
        </View>
        <TouchableOpacity style={[styles.heartBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.92)' }]} onPress={onToggleSave}>
          <PremiumIcon name={saved ? 'heart' : 'heart-outline'} size={16} color={saved ? '#E11D48' : C.muted} />
        </TouchableOpacity>
      </View>

      <View style={styles.pgBody}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.pgName, { color: C.heading }]}>{pg.name}</Text>
            <Text style={[styles.pgMeta, { color: C.muted }]}>{pg.area} · {pg.distance}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.pgPrice, { color: C.primary }]}>₹{pg.price.toLocaleString()}</Text>
            <Text style={[styles.pgPer, { color: C.muted }]}>/month</Text>
          </View>
        </View>

        <View style={styles.rowBetween}>
          <Text style={[styles.pgRating, { color: C.body }]}>⭐ {pg.rating} ({pg.reviews.length})</Text>
          <Text style={[styles.pgGender, { color: C.primary }]}>{pg.gender}</Text>
        </View>

        <View style={styles.tagRow}>
          {pg.vibeTypes.slice(0, 2).map((v) => (
            <View key={v} style={[styles.tagPill, { backgroundColor: C.primaryGhost, borderColor: C.primaryBorder }]}>
              <Text style={[styles.tagText, { color: C.primary }]}>{v}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.rowBetween, { marginTop: 10 }]}>
          <TouchableOpacity style={[styles.ghostBtn, { borderColor: C.primary }]} onPress={onView}>
            <Text style={[styles.ghostBtnText, { color: C.primary }]}>View PG</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryBtnSmall, { backgroundColor: C.primary }]} onPress={onJoin}>
            <Text style={styles.primaryBtnSmallText}>Join PG</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  heroTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginTop: 4 },
  heroSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, marginTop: 2 },
  heroNotif: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickRow: { flexDirection: 'row', marginTop: 12 },
  quickAction: {
    flex: 1,
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quickText: { color: '#FFFFFF', fontSize: 11, marginTop: 4, fontWeight: '600' },

  filtersWrap: { paddingHorizontal: 16, paddingVertical: 12 },
  filterChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterChipText: { fontSize: 12, fontWeight: '600' },

  pgCard: {
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 12,
  },
  pgImage: { width: '100%', height: 168 },
  pgOverlayRow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  availablePill: {
    backgroundColor: 'rgba(15,23,42,0.75)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  availableText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  heartBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pgBody: { padding: 12 },
  rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pgName: { fontSize: 15, fontWeight: '700' },
  pgMeta: { fontSize: 12, marginTop: 2 },
  pgPrice: { fontSize: 16, fontWeight: '800' },
  pgPer: { fontSize: 11 },
  pgRating: { fontSize: 12, marginTop: 8 },
  pgGender: { fontSize: 11, fontWeight: '700', marginTop: 8 },
  tagRow: { flexDirection: 'row', marginTop: 8 },
  tagPill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginRight: 6,
  },
  tagText: { fontSize: 11, fontWeight: '600' },
  ghostBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  ghostBtnText: { fontWeight: '700', fontSize: 12 },
  primaryBtnSmall: {
    flex: 1,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  primaryBtnSmallText: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
});
