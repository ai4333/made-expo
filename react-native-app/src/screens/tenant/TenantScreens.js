import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { useAppData } from '../../context/AppDataContext';
import PremiumIcon from '../../components/shared/PremiumIcon';
import {
  currentUser,
  latestAnnouncements,
  pgListings,
  tenants,
} from '../../data/mockData';
import {
  Chip,
  GREEN,
  Header,
  ORANGE,
  PURPLE,
  RED,
  VIOLET,
  formatINR,
  getPGById,
  getTenantById,
  styles,
} from '../shared/mobileScreenKit';

export function TenantKYCScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const [docs, setDocs] = useState({
    identity: false,
    address: false,
    selfie: false,
  });

  const allDone = docs.identity && docs.address && docs.selfie;

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Identity Verification" navigation={navigation} />
      <Text style={[styles.sectionSubtle, { color: C.muted, marginTop: 12 }]}>To ensure a safe and secure community, please complete the institutional verification process below.</Text>

      <View style={{ marginTop: 24, gap: 16 }}>
        {[
          { key: 'identity', title: 'National Identity', desc: 'Passport, Aadhaar Card, or Driving License' },
          { key: 'address', title: 'Proof of Address', desc: 'Utility bill or official bank document' },
          { key: 'selfie', title: 'Biometric Selfie', desc: 'A quick photo to verify your identity' },
        ].map((item) => (
          <View key={item.key} style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}> 
            <View style={styles.rowBetween}>
              <View style={styles.flex1}>
                <Text style={[styles.cardTitle, { color: C.heading, fontSize: 16 }]}>{item.title}</Text>
                <Text style={[styles.cardSub, { color: C.muted, marginTop: 4, fontSize: 13 }]}>{item.desc}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.smallCta,
                  {
                    backgroundColor: docs[item.key] ? GREEN + '1A' : C.primaryGhost,
                    borderColor: docs[item.key] ? GREEN : C.primary,
                  },
                ]}
                onPress={() => setDocs((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
              >
                <Text style={{ color: docs[item.key] ? GREEN : C.primary, fontWeight: '800', fontSize: 11 }}>
                  {docs[item.key] ? 'VALIDATED' : 'UPLOAD'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: allDone ? C.primary : isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0', marginTop: 40 }]}
        disabled={!allDone}
        onPress={() => navigation.replace('TenantMain')}
      >
        <Text style={[styles.primaryButtonText, { color: allDone ? '#FFF' : C.muted }]}>Complete Verification</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export function MyPGScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const { hasJoinedPg, joinedPg } = useAppData();
  const pg = joinedPg || null;

  if (!hasJoinedPg || !pg) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
        <Header title="My Stay" navigation={navigation} />
        <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 24, padding: 32, alignItems: 'center' }]}> 
          <View style={[styles.iconBubble, { backgroundColor: C.primaryGhost, width: 60, height: 60, borderRadius: 30, marginBottom: 20 }]}>
            <PremiumIcon name="business" size={28} color={C.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: C.heading, fontSize: 18, textAlign: 'center' }]}>No Active Stay Found</Text>
          <Text style={[styles.cardSub, { color: C.muted, marginTop: 12, textAlign: 'center', lineHeight: 22 }]}>Join a property from the explore section to unlock rent management, unit details, and support services.</Text>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: C.primary, marginTop: 32, width: '100%' }]}
            onPress={() => navigation.navigate('TenantMain', { screen: 'Explore' })}
          >
            <Text style={styles.primaryButtonText}>Explore Properties</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const roommates = pg.tenantIds.map((id) => getTenantById(id));

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.bottomPadLarge}>
      <View style={[styles.heroCard, { backgroundColor: C.primary, borderRadius: 0, paddingTop: 40, paddingBottom: 32 }]}> 
        <View style={styles.rowBetween}>
          <Text style={[styles.heroTag, { color: 'rgba(255,255,255,0.8)', letterSpacing: 1 }]}>RESIDENT STATUS: ACTIVE</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PGDetail', { pgId: pg.id })}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 }}>
              <Text style={[styles.heroLink, { fontSize: 11 }]}>VIEW DETAILS</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={[styles.heroTitle, { fontSize: 32, marginTop: 16 }]}>{pg.name}</Text>
        <Text style={[styles.heroSub, { color: 'rgba(255,255,255,0.7)', fontSize: 15, marginTop: 6 }]}>{pg.area} · Verified Partner</Text>

        <View style={[styles.heroStatsRow, { marginTop: 32 }]}>
          <View style={[styles.heroStatBox, { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 12 }]}>
            <Text style={[styles.heroStatLabel, { color: 'rgba(255,255,255,0.6)' }]}>Monthly Rent</Text>
            <Text style={styles.heroStatValue}>{formatINR(pg.price)}</Text>
          </View>
          <View style={[styles.heroStatBox, { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 12 }]}>
            <Text style={[styles.heroStatLabel, { color: 'rgba(255,255,255,0.6)' }]}>Lease Term</Text>
            <Text style={styles.heroStatValue}>11 Months</Text>
          </View>
        </View>
      </View>

      <View style={[styles.sectionBlock, { marginTop: 32 }]}>
        <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800' }]}>SERVICES & SUPPORT</Text>
        <View style={[styles.quickGrid, { gap: 12, marginTop: 16 }]}>
          {[
            { label: 'Updates', icon: 'megaphone', nav: 'TenantUpdates' },
            { label: 'Complaint', icon: 'alert-circle', nav: 'TenantComplaints' },
            { label: 'Messages', icon: 'chatbubbles', nav: 'TenantMessages' },
          ].map((a) => (
            <TouchableOpacity
              key={a.label}
              onPress={() => navigation.navigate(a.nav)}
              style={[styles.quickCard, { backgroundColor: C.card, borderColor: C.border, padding: 16 }]}
            >
              <PremiumIcon name={a.icon} size={22} color={C.primary} />
              <Text style={[styles.quickLabel, { color: C.heading, marginTop: 10, fontSize: 11 }]}>{a.label.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800' }]}>PROPERTY AMENITIES</Text>
        <View style={[styles.amenityWrap, { marginTop: 16 }]}>
          {pg.amenities.map((amenity) => (
            <View key={amenity} style={[styles.amenityPill, { backgroundColor: C.card, borderColor: C.border }]}> 
              <PremiumIcon name="checkmark-circle" size={14} color={GREEN} />
              <Text style={[styles.amenityText, { color: C.body, marginLeft: 8 }]}>{amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sectionBlock}>
        <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800' }]}>YOUR ROOMMATES</Text>
        <View style={{ marginTop: 16, gap: 12 }}>
          {roommates.map((mate) => (
            <TouchableOpacity
              key={mate.id}
              onPress={() => navigation.navigate('RoommateProfile', { tenantId: mate.id })}
              style={[styles.listRow, { backgroundColor: C.card, borderColor: C.border, padding: 12 }]}
            >
              <Image source={{ uri: mate.photo }} style={[styles.avatar48, { borderRadius: 12 }]} />
              <View style={[styles.flex1, { marginLeft: 16 }]}>
                <Text style={[styles.rowTitle, { color: C.heading, fontSize: 15 }]}>{mate.name}</Text>
                <Text style={[styles.rowSub, { color: C.muted, fontSize: 12, marginTop: 2 }]}>{mate.occupation}</Text>
              </View>
              <PremiumIcon name="chevron-forward" size={18} color={C.muted} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export function StudentMarketplaceScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');

  const filtered = useMemo(() => {
    return pgListings.filter((pg) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        pg.name.toLowerCase().includes(q) ||
        pg.area.toLowerCase().includes(q) ||
        pg.city.toLowerCase().includes(q);
      const matchesGender =
        genderFilter === 'All' ||
        (genderFilter === 'Male' && pg.gender === 'Male Only') ||
        (genderFilter === 'Female' && pg.gender === 'Female Only') ||
        (genderFilter === 'Co-Living' && pg.gender === 'Co-Living');
      return matchesQuery && matchesGender;
    });
  }, [query, genderFilter]);

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}> 
      <View style={styles.screenPad}>
        <View style={[styles.rowBetween, { marginBottom: 16 }]}>
          <Text style={[styles.pageTitle, { color: C.heading }]}>Explore</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MapDiscovery')}>
            <PremiumIcon name="map" size={20} color={C.primary} />
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBox, { backgroundColor: C.card, borderColor: C.border }]}> 
          <PremiumIcon name="search" size={18} color={C.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search city, area or property..."
            placeholderTextColor={C.muted}
            style={[styles.searchInput, { color: C.heading, fontSize: 14 }]}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
            <PremiumIcon name="options" size={20} color={C.primary} />
          </TouchableOpacity>
        </View>

        <View style={[styles.filterRow, { marginTop: 16 }]}>
          {['All', 'Male', 'Female', 'Co-Living'].map((f) => (
            <Chip key={f} label={f} active={genderFilter === f} onPress={() => setGenderFilter(f)} activeColor={C.primary} />
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listPad, { paddingTop: 0 }]}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            activeOpacity={0.9}
            style={[styles.pgCard, { backgroundColor: C.card, borderColor: C.border, overflow: 'hidden', borderRadius: 24, marginBottom: 24 }]}
            onPress={() => navigation.navigate('PGDetail', { pgId: item.id })}
          > 
            <Image source={{ uri: item.images[0] }} style={[styles.pgImage, { height: 200 }]} />
            <View style={[styles.pgCardBody, { padding: 20 }]}>
              <View style={styles.rowBetween}>
                <Text style={[styles.rowTitle, { color: C.heading, fontSize: 18, fontWeight: '800' }]}>{item.name}</Text>
                <Text style={[styles.priceTag, { color: C.primary, fontSize: 16, fontWeight: '900' }]}>{formatINR(item.price)}</Text>
              </View>
              <Text style={[styles.rowSub, { color: C.muted, fontSize: 13, marginTop: 4 }]}>{item.area} · {item.city}</Text>
              
              <View style={[styles.inlineMeta, { marginTop: 16 }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <PremiumIcon name="star" size={12} color={ORANGE} />
                  <Text style={[styles.metaBadge, { color: C.heading, marginLeft: 4, fontWeight: '700' }]}>{item.rating}</Text>
                </View>
                <View style={{ backgroundColor: item.gender === 'Male Only' ? C.primaryGhost : item.gender === 'Female Only' ? RED + '1A' : C.primaryGhost, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                  <Text style={[styles.metaBadge, { color: item.gender === 'Male Only' ? C.primary : item.gender === 'Female Only' ? RED : C.primary, fontWeight: '700' }]}> 
                    {item.gender.split(' ')[0]}
                  </Text>
                </View>
                <Text style={[styles.metaBadge, { color: GREEN, fontWeight: '800' }]}>{item.bedsAvailable} LEFT</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export function ConnectHubScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const [tab, setTab] = useState('Discover');
  const [query, setQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('All');
  const [hiSent, setHiSent] = useState({});

  const ranked = useMemo(() => [...tenants].sort((a, b) => b.vibeMatch - a.vibeMatch), []);

  const discoverList = useMemo(() => {
    return ranked.filter((item) => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.occupation.toLowerCase().includes(q) || item.company.toLowerCase().includes(q);
      const matchesGender = genderFilter === 'All' || item.gender === genderFilter;
      return matchesQuery && matchesGender;
    });
  }, [ranked, query, genderFilter]);

  const requests = useMemo(() => ranked.filter((item) => item.vibeMatch >= 85).slice(0, 4), [ranked]);

  const inboxThreads = useMemo(
    () =>
      ranked.slice(0, 6).map((item, idx) => ({
        ...item,
        time: idx % 2 === 0 ? '2m ago' : '1h ago',
        lastMessage: idx % 2 === 0 ? 'Hey, saw we have similar lifestyle tags 👋' : 'Are you still looking for a roommate?',
        unread: idx % 3 === 0 ? 1 : 0,
      })),
    [ranked]
  );

  const sendHi = (tenant) => {
    setHiSent((prev) => ({ ...prev, [tenant.id]: true }));
    Alert.alert('Request Sent', `Your connection request was sent to ${tenant.name}.`);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.listPad}>
      <View style={{ marginBottom: 16 }}>
        <Text style={[styles.pageTitle, { color: C.heading }]}>Connect Hub</Text>
        <Text style={[styles.sectionSubtle, { color: C.muted, marginTop: 8 }]}>Discover roommates, send requests, and chat with your best matches.</Text>
      </View>

      <View style={[styles.searchBox, { marginTop: 0, backgroundColor: C.card, borderColor: C.border }]}>
        <PremiumIcon name="search" size={18} color={C.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by name or occupation"
          placeholderTextColor={C.muted}
          style={[styles.searchInput, { color: C.heading, fontSize: 14 }]}
        />
      </View>

      <View style={[styles.filterRow, { marginTop: 14 }]}>
        {['Discover', 'Requests', 'Inbox'].map((item) => (
          <Chip key={item} label={item} active={tab === item} onPress={() => setTab(item)} activeColor={C.primary} />
        ))}
      </View>

      {tab === 'Discover' ? (
        <>
          <View style={[styles.filterRow, { marginTop: 8, marginBottom: 8 }]}>
            {['All', 'Male', 'Female'].map((f) => (
              <Chip key={f} label={f} active={genderFilter === f} onPress={() => setGenderFilter(f)} activeColor={VIOLET} />
            ))}
          </View>

          {discoverList.map((item) => {
            const matchedPg = pgListings.find((pg) => pg.tenantIds.includes(item.id));
            return (
              <View key={item.id} style={[styles.card, { backgroundColor: C.card, borderColor: C.border, borderRadius: 24, padding: 20, marginBottom: 14 }]}> 
                <View style={styles.rowCenter}>
                  <Image source={{ uri: item.photo }} style={[styles.avatar56, { borderRadius: 16 }]} />
                  <View style={[styles.flex1, { marginLeft: 16 }]}> 
                    <Text style={[styles.cardTitle, { color: C.heading, fontSize: 17 }]}>{item.name}, {item.age}</Text>
                    <Text style={[styles.cardSub, { color: C.muted, fontSize: 13, marginTop: 2 }]}>{item.occupation} · {item.company}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                      <PremiumIcon name="sparkles" size={14} color={C.primary} />
                      <Text style={[styles.cardSub, { color: C.primary, marginLeft: 6, fontWeight: '800' }]}>{item.vibeMatch}% MATCH</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.filterRow, { marginVertical: 16 }]}> 
                  {item.lifestyle.slice(0, 3).map((tag) => (
                    <View key={tag} style={[styles.tagPill, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', borderColor: 'transparent' }]}> 
                      <Text style={[styles.tagText, { color: C.body, fontSize: 11, fontWeight: '700' }]}>{tag.toUpperCase()}</Text>
                    </View>
                  ))}
                </View>

                <View style={[styles.rowBetween, { marginBottom: 12 }]}> 
                  <Text style={[styles.rowSub, { color: C.muted, fontSize: 12 }]}>{matchedPg?.name || 'Nearby stay'} · {item.fromCity}</Text>
                  <TouchableOpacity onPress={() => sendHi(item)} style={[styles.badge, { backgroundColor: hiSent[item.id] ? GREEN + '1A' : C.primaryGhost }]}> 
                    <Text style={{ color: hiSent[item.id] ? GREEN : C.primary, fontWeight: '800', fontSize: 10 }}>{hiSent[item.id] ? 'REQUESTED' : 'SAY HI'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.rowBetween}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RoommateProfile', { tenantId: item.id })}
                    style={[styles.ghostButton, { borderColor: C.border, flex: 1, marginRight: 8 }]}
                  >
                    <Text style={[styles.ghostButtonText, { color: C.heading }]}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('RoommateRooms', { pg: matchedPg || pgListings[0] })}
                    style={[styles.smallPrimary, { backgroundColor: VIOLET, flex: 1, marginLeft: 8 }]}
                  >
                    <Text style={styles.smallPrimaryText}>View Stay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </>
      ) : null}

      {tab === 'Requests' ? (
        <View style={{ marginTop: 8 }}>
          {requests.map((item) => (
            <View key={item.id} style={[styles.listRow, { backgroundColor: C.card, borderColor: C.border, marginBottom: 12 }]}> 
              <Image source={{ uri: item.photo }} style={[styles.avatar48, { borderRadius: 14 }]} />
              <View style={[styles.flex1, { marginLeft: 12 }]}> 
                <Text style={[styles.rowTitle, { color: C.heading }]}>{item.name}</Text>
                <Text style={[styles.rowSub, { color: C.muted }]}>{item.vibeMatch}% match · wants to connect</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('RoommateProfile', { tenantId: item.id })} style={[styles.smallCta, { borderColor: C.primary, backgroundColor: C.primaryGhost }]}> 
                <Text style={{ color: C.primary, fontWeight: '700', fontSize: 11 }}>Open</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : null}

      {tab === 'Inbox' ? (
        <View style={{ marginTop: 8 }}>
          {inboxThreads.map((thread) => (
            <TouchableOpacity key={thread.id} onPress={() => navigation.navigate('Chat')} style={[styles.listRow, { backgroundColor: C.card, borderColor: C.border, marginBottom: 12 }]}> 
              <Image source={{ uri: thread.photo }} style={[styles.avatar48, { borderRadius: 14 }]} />
              <View style={[styles.flex1, { marginLeft: 12 }]}> 
                <Text style={[styles.rowTitle, { color: C.heading }]}>{thread.name}</Text>
                <Text numberOfLines={1} style={[styles.rowSub, { color: C.muted }]}>{thread.lastMessage}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.rowSub, { color: C.muted, fontSize: 10, fontWeight: '700' }]}>{thread.time}</Text>
                {thread.unread ? (
                  <View style={[styles.unreadDot, { backgroundColor: C.primary, marginTop: 6 }]}>
                    <Text style={styles.unreadText}>{thread.unread}</Text>
                  </View>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

export function MyProfileScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const { tenantProfile, backend, isHydrated } = useAppData();
  const preferences = currentUser?.preferences || {
    city: 'Bangalore',
    budgetMin: 5000,
    budgetMax: 15000,
    roomType: 'Shared',
    lifestyle: ['Focused', 'Clean', 'Friendly'],
  };
  const displayName = isHydrated ? (tenantProfile?.name?.trim() || 'Resident') : 'Loading...';
  const displayContact = tenantProfile?.phone?.trim() || currentUser?.phone || currentUser?.email || '';

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.bottomPadLarge}>
      <View style={styles.screenPad}>
        <View style={[styles.profileHero, { backgroundColor: C.card, borderColor: C.border }]}> 
          <Image source={{ uri: currentUser.photo }} style={styles.avatar72} />
          <Text style={[styles.pageTitle, { color: C.heading, marginTop: 16, fontSize: 24 }]}>{displayName}</Text>
          <Text style={[styles.cardSub, { color: C.muted, letterSpacing: 0.3, fontSize: 12 }]}>{displayContact}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: backend.connected ? GREEN : ORANGE, marginRight: 8 }} />
            <Text style={[styles.cardSub, { color: backend.connected ? GREEN : ORANGE, fontWeight: '700', fontSize: 11 }]}> 
              {backend.connected ? 'Cloud Sync Active' : 'Demo Mode'}
            </Text>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: C.muted }]}>Resident Identity</Text>
          <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}> 
            <View style={{ gap: 10 }}>
              <View style={styles.rowBetween}>
                <Text style={[styles.rowSub, { color: C.muted, fontWeight: '700' }]}>LOCATION</Text>
                <Text style={[styles.rowSub, { color: C.heading, fontWeight: '600' }]}>{String(preferences.city || 'Bangalore').toUpperCase()}</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={[styles.rowSub, { color: C.muted, fontWeight: '700' }]}>BUDGET RANGE</Text>
                <Text style={[styles.rowSub, { color: C.heading, fontWeight: '600' }]}>{formatINR(preferences.budgetMin)} - {formatINR(preferences.budgetMax)}</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={[styles.rowSub, { color: C.muted, fontWeight: '700' }]}>TYPOLOGY</Text>
                <Text style={[styles.rowSub, { color: C.heading, fontWeight: '600' }]}>{String(preferences.roomType || 'Shared').toUpperCase()}</Text>
              </View>
            </View>
            <View style={[styles.filterRow, { marginTop: 20 }]}> 
              {(Array.isArray(preferences.lifestyle) ? preferences.lifestyle : []).map((tag) => (
                <View key={tag} style={[styles.tagPill, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9', borderColor: C.border }]}> 
                  <Text style={[styles.tagText, { color: C.body }]}>{tag.toUpperCase()}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={[styles.sectionTitle, { color: C.muted }]}>Management</Text>
          {[
            { label: 'Notifications', icon: 'notifications-outline', nav: 'Notifications' },
            { label: 'Asset Filters', icon: 'options-outline', nav: 'Filters' },
            { label: 'Saved Assets', icon: 'heart-outline', nav: 'SavedPGs' },
            { label: 'Connect Hub', icon: 'people-outline', nav: 'Connect' },
            { label: 'Geospatial Discovery', icon: 'map-outline', nav: 'MapDiscovery' },
            { label: 'Encryption & Chat', icon: 'chatbubble-ellipses-outline', nav: 'Chat' },
          ].map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => navigation.navigate(item.nav)}
              style={[styles.listRow, { backgroundColor: C.card, borderColor: C.border }]}
            >
              <PremiumIcon name={item.icon} size={18} color={C.primary} />
              <Text style={[styles.rowTitle, { color: C.heading, marginLeft: 16 }]}>{item.label.toUpperCase()}</Text>
              <View style={styles.flex1} />
              <PremiumIcon name="chevron-forward" size={16} color={C.muted} />
            </TouchableOpacity>
          ))}
          
          <View style={[styles.listRow, { backgroundColor: C.card, borderColor: C.border }]}> 
            <PremiumIcon name="color-palette-outline" size={18} color={C.primary} />
            <Text style={[styles.rowTitle, { color: C.heading, marginLeft: 16 }]}>THEME: STAAZY CLASSIC</Text>
            <View style={styles.flex1} />
            <Text style={[styles.rowSub, { color: C.muted, fontWeight: '700' }]}>Light</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('RoleSelection')}
            style={[styles.listRow, { backgroundColor: RED + '10', borderColor: RED + '33' }]}
          >
            <PremiumIcon name="swap-horizontal-outline" size={18} color={RED} />
            <Text style={[styles.rowTitle, { color: RED, marginLeft: 16 }]}>SWITCH TO OWNER PANEL</Text>
            <View style={styles.flex1} />
            <PremiumIcon name="chevron-forward" size={16} color={RED} opacity={0.5} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export function PGDetailScreen({ navigation, route }) {
  const { C, isDark } = useTheme();
  const { hasJoinedPg, joinedPgId, joinPG } = useAppData();
  const pg = getPGById(route?.params?.pgId);
  const roomies = pg.tenantIds.map((id) => getTenantById(id));
  const galleryRef = useRef(null);
  const photoWidth = Dimensions.get('window').width;
  const [activeImage, setActiveImage] = useState(0);

  const onImageScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const nextIndex = Math.round(offsetX / photoWidth);
    if (nextIndex !== activeImage) setActiveImage(nextIndex);
  };

  const jumpToImage = (index) => {
    setActiveImage(index);
    galleryRef.current?.scrollTo({ x: index * photoWidth, animated: true });
  };

  const onJoin = () => {
    const result = joinPG(pg.id);
    if (!result.ok) {
      Alert.alert('System Error', result.error || 'Unable to process request');
      return;
    }
    Alert.alert('Residency Confirmed', `Verification for ${pg.name} initiated. You can now access the management portal.`, [
      { text: 'GO TO MESSAGES', onPress: () => navigation.navigate('TenantMessages') },
      { text: 'REMAIN HERE', style: 'cancel' },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.bottomPadLarge}>
      <View style={styles.screenPad}>
        <Header title="Asset Intelligence" navigation={navigation} />
      </View>

      <View style={{ position: 'relative' }}>
        <ScrollView
          ref={galleryRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onImageScroll}
          scrollEventThrottle={16}
        >
          {pg.images.map((img, idx) => (
            <Image key={`${img}-${idx}`} source={{ uri: img }} style={[styles.detailImage, { width: photoWidth, height: 280 }]} />
          ))}
        </ScrollView>
        <View style={{ position: 'absolute', bottom: 12, right: 16, backgroundColor: 'rgba(15,23,42,0.55)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>{activeImage + 1}/{pg.images.length}</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 10 }}>
        {pg.images.map((img, idx) => (
          <TouchableOpacity
            key={`thumb-${img}-${idx}`}
            onPress={() => jumpToImage(idx)}
            style={{ marginRight: 10, borderWidth: activeImage === idx ? 2 : 1, borderColor: activeImage === idx ? C.primary : C.border, borderRadius: 10, padding: 2 }}
          >
            <Image source={{ uri: img }} style={{ width: 72, height: 52, borderRadius: 8 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.screenPad}>
        <View style={styles.card}> 
          <Text style={[styles.pageTitle, { color: C.heading, fontSize: 26 }]}>{pg.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <PremiumIcon name="location-outline" size={14} color={C.muted} />
            <Text style={[styles.cardSub, { color: C.muted, marginLeft: 6 }]}>{pg.location.address.toUpperCase()}</Text>
          </View>
          
          <View style={styles.inlineMeta}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PremiumIcon name="star" size={14} color={ORANGE} />
              <Text style={[styles.metaBadge, { color: C.heading, marginLeft: 6 }]}>{pg.rating}</Text>
            </View>
            <Text style={[styles.metaBadge, { color: C.primaryLight, fontWeight: '800' }]}>{formatINR(pg.price).toUpperCase()} / MO</Text>
            <Text style={[styles.metaBadge, { color: GREEN }]}>{pg.bedsAvailable} UNITS AVAILABLE</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: C.muted }]}>Asset Amenities</Text>
        <View style={styles.amenityWrap}>
          {pg.amenities.map((amenity) => (
            <View key={amenity} style={styles.amenityPill}> 
              <PremiumIcon name="checkmark-circle-outline" size={14} color={GREEN} />
              <Text style={[styles.amenityText, { color: C.body }]}>{amenity.toUpperCase()}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: C.muted }]}>Current Residents</Text>
        {roomies.map((rm) => (
          <TouchableOpacity
            key={rm.id}
            onPress={() => navigation.navigate('RoommateProfile', { tenantId: rm.id })}
            style={styles.listRow}
          >
            <Image source={{ uri: rm.photo }} style={styles.avatar40} />
            <View style={styles.flex1}>
              <Text style={[styles.rowTitle, { color: C.heading }]}>{rm.name}</Text>
              <Text style={[styles.rowSub, { color: C.muted }]}>{rm.lifestyle[0].toUpperCase()}</Text>
            </View>
            <PremiumIcon name="chevron-forward" size={16} color={C.muted} />
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionTitle, { color: C.muted }]}>Verified Reviews</Text>
        {pg.reviews.length === 0 ? (
          <View style={styles.card}> 
            <Text style={[styles.cardSub, { color: C.muted }]}>No residency records found.</Text>
          </View>
        ) : (
          pg.reviews.map((review, idx) => (
            <View key={`${review.name}-${idx}`} style={styles.card}> 
              <View style={styles.rowBetween}>
                <Text style={[styles.rowTitle, { color: C.heading }]}>{review.name.toUpperCase()}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <PremiumIcon name="star" size={12} color={ORANGE} />
                  <Text style={{ color: C.heading, fontWeight: '700', fontSize: 12, marginLeft: 4 }}>{review.rating}</Text>
                </View>
              </View>
              <Text style={[styles.cardSub, { color: C.body, marginTop: 8, lineHeight: 22 }]}>{review.text}</Text>
            </View>
          ))
        )}

        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: hasJoinedPg && joinedPgId === pg.id ? (isDark ? 'rgba(255,255,255,0.05)' : '#E2E8F0') : C.primary }]}
          onPress={hasJoinedPg && joinedPgId === pg.id ? () => navigation.navigate('TenantMessages') : onJoin}
        >
          <Text style={[styles.primaryButtonText, { color: hasJoinedPg && joinedPgId === pg.id ? C.muted : '#FFF' }]}> 
            {hasJoinedPg && joinedPgId === pg.id ? 'MANAGE RESIDENCY' : 'INITIATE JOIN REQUEST'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.ghostButton, { alignSelf: 'center', marginTop: 12, width: '100%', alignItems: 'center' }]}
          onPress={() => navigation.navigate('VisitScheduling', { pgId: pg.id })}
        >
          <Text style={[styles.ghostButtonText, { color: C.heading }]}>REQUEST INSPECTION</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export function RoommateProfileScreen({ navigation, route }) {
  const { C, isDark } = useTheme();
  const tenant = getTenantById(route?.params?.tenantId);
  const matchedPg = pgListings.find((item) => item.tenantIds.includes(tenant.id));
  const profilePhotos = [tenant.photo, ...(matchedPg?.images || []).slice(0, 2)];

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Roommate Profile" navigation={navigation} />
      <View style={[styles.profileHero, { alignItems: 'center', marginTop: 24, backgroundColor: C.card, borderColor: C.border }]}> 
        <Image source={{ uri: tenant.photo }} style={[styles.avatar88, { borderRadius: 30 }]} />
        <Text style={[styles.pageTitle, { color: C.heading, marginTop: 20, fontSize: 26 }]}>{tenant.name}, {tenant.age}</Text>
        <Text style={[styles.cardSub, { color: C.muted, fontSize: 15, marginTop: 4 }]}>{tenant.occupation} @ {tenant.company}</Text>
        <View style={[styles.badge, { marginTop: 16, backgroundColor: C.primaryGhost }]}> 
          <PremiumIcon name="sparkles" size={14} color={C.primary} />
          <Text style={[styles.cardSub, { color: C.primary, marginLeft: 8, fontWeight: '800', fontSize: 12 }]}>{tenant.vibeMatch}% Compatibility</Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 10 }]}>PHOTO HIGHLIGHTS</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 4 }}>
        {profilePhotos.map((photo, idx) => (
          <Image key={`${photo}-${idx}`} source={{ uri: photo }} style={{ width: 128, height: 100, borderRadius: 14, marginRight: 10 }} />
        ))}
      </ScrollView>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 40, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 0, marginBottom: 16 }]}>ABOUT ME</Text>
        <Text style={[styles.cardSub, { color: C.body, lineHeight: 24, fontSize: 14 }]}>{tenant.aboutMe}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 16, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 0, marginBottom: 16 }]}>LIFESTYLE</Text>
        <View style={styles.filterRow}>
          {tenant.lifestyle.map((tag) => (
            <View key={tag} style={[styles.tagPill, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', borderColor: 'transparent' }]}> 
              <Text style={[styles.tagText, { color: C.body, fontSize: 11, fontWeight: '700' }]}>{tag.toUpperCase()}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 16, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 0, marginBottom: 20 }]}>HABITS</Text>
        <View style={{ gap: 16 }}>
          {[
            { label: 'Sleep Cycle', value: tenant.sleepTime },
            { label: 'Wake Up', value: tenant.wakeTime },
            { label: 'Noise Tolerance', value: tenant.noiseLevel },
            { label: 'Food Preference', value: tenant.food },
          ].map((item) => (
            <View key={item.label} style={styles.rowBetween}>
              <Text style={{ color: C.muted, fontSize: 14 }}>{item.label}</Text>
              <Text style={{ color: C.heading, fontWeight: '700', fontSize: 14 }}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: VIOLET, marginTop: 32 }]}
        onPress={() => Alert.alert('Request Sent', `A connection request has been sent to ${tenant.name}.`)}
      >
        <Text style={styles.primaryButtonText}>Send Connect Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export function FiltersScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const [roomType, setRoomType] = useState('Any');
  const [gender, setGender] = useState('Any');
  const [budget, setBudget] = useState(15000);

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Search Filters" navigation={navigation} />

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 24, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 0, fontSize: 11, fontWeight: '800' }]}>ROOM TYPE</Text>
        <View style={[styles.filterRow, { marginTop: 16 }]}>
          {['Any', 'Single', '2 Sharing', '3 Sharing'].map((item) => (
            <Chip key={item} label={item} active={roomType === item} onPress={() => setRoomType(item)} activeColor={C.primary} />
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 16, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 0, fontSize: 11, fontWeight: '800' }]}>GENDER PREFERENCE</Text>
        <View style={[styles.filterRow, { marginTop: 16 }]}>
          {['Any', 'Male', 'Female', 'Co-Living'].map((item) => (
            <Chip key={item} label={item} active={gender === item} onPress={() => setGender(item)} activeColor={C.primary} />
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 16, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 0, fontSize: 11, fontWeight: '800' }]}>MONTHLY BUDGET</Text>
        <Text style={[styles.budgetText, { color: C.primary, fontSize: 28, fontWeight: '900', marginTop: 12 }]}>{formatINR(budget)}</Text>
        <View style={[styles.filterRow, { marginTop: 20 }]}>
          {[8000, 10000, 12000, 15000, 18000].map((value) => (
            <Chip key={String(value)} label={formatINR(value)} active={budget === value} onPress={() => setBudget(value)} activeColor={C.primary} />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: C.primary, marginTop: 40 }]}
        onPress={() => {
          Alert.alert('Filters Applied', `Updated searches for ${roomType} stays.`);
          navigation.goBack();
        }}
      >
        <Text style={styles.primaryButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export function NotificationsScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const {
    tenantNotifications,
    markTenantNotificationRead,
    markAllTenantNotificationsRead,
  } = useAppData();

  const markAllRead = () => {
    markAllTenantNotificationsRead();
  };

  const getIcon = (type) => {
    if (type === 'rent_due') return 'time';
    if (type === 'announcement') return 'megaphone';
    if (type === 'complaint_update') return 'build';
    return 'notifications';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header
        title="Alerts"
        navigation={navigation}
        right={
          <TouchableOpacity onPress={markAllRead} style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', borderColor: C.border }]}> 
            <PremiumIcon name="checkmark-done" size={18} color={C.primary} />
          </TouchableOpacity>
        }
      />

      <View style={{ marginTop: 24, gap: 12 }}>
        {tenantNotifications.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => markTenantNotificationRead(item.id)}
            style={[
              styles.listRow,
              {
                backgroundColor: C.card,
                borderColor: item.read ? C.border : C.primary + '33',
                borderLeftWidth: item.read ? 1 : 4,
                borderLeftColor: item.read ? C.border : C.primary,
                padding: 16,
              },
            ]}
          >
            <View style={[styles.iconBubble, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9', width: 44, height: 44, borderRadius: 14 }]}> 
              <PremiumIcon name={getIcon(item.type)} size={20} color={item.read ? C.muted : C.primary} />
            </View>
            <View style={[styles.flex1, { marginLeft: 16 }]}>
              <Text style={[styles.rowTitle, { color: item.read ? C.muted : C.heading, fontSize: 15, fontWeight: item.read ? '600' : '800' }]}>{item.title}</Text>
              <Text style={[styles.rowSub, { color: C.muted, lineHeight: 20, marginTop: 4, fontSize: 13 }]}>{item.message}</Text>
              <Text style={[styles.rowSub, { color: C.muted, fontSize: 11, marginTop: 8, fontWeight: '700', opacity: 0.6 }]}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export function TenantUpdatesScreen({ navigation }) {
  const { C, isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Updates" navigation={navigation} />
      <View style={{ marginTop: 24, gap: 16 }}>
        {latestAnnouncements.map((a) => (
          <View key={a.id} style={[styles.card, { backgroundColor: C.card, borderColor: C.border, padding: 20 }]}> 
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ backgroundColor: C.primaryGhost, padding: 8, borderRadius: 10, marginRight: 12 }}>
                <PremiumIcon name="megaphone" size={16} color={C.primary} />
              </View>
              <Text style={[styles.cardSub, { color: C.muted, fontWeight: '800', fontSize: 11 }]}>{a.time}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: C.heading, lineHeight: 24, fontSize: 16, fontWeight: '600' }]}>{a.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function TenantComplaintsScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const { tenantComplaints, submitTenantComplaint } = useAppData();
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Maintenance');

  const statusColor = (status) => {
    if (status === 'Resolved') return GREEN;
    if (status === 'In Progress') return C.primary;
    return ORANGE;
  };

  const addComplaint = () => {
    const result = submitTenantComplaint({ title: newTitle, category: newCategory });
    if (!result.ok) {
      Alert.alert('Error', result.error);
      return;
    }
    setNewTitle('');
    Alert.alert('Complaint Filed', 'Your maintenance request has been recorded and shared with the manager.');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Complaints" navigation={navigation} />

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 24, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 0, fontSize: 11, fontWeight: '800' }]}>NEW COMPLAINT</Text>
        <TextInput
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="Describe the issue..."
          placeholderTextColor={C.muted}
          style={[styles.input, { borderColor: C.border, color: C.heading, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9', marginTop: 16, height: 60, borderRadius: 16, paddingHorizontal: 16 }]}
        />
        <View style={[styles.filterRow, { marginVertical: 20 }]}>
          {['Maintenance', 'Amenity', 'Food', 'Others'].map((cat) => (
            <Chip
              key={cat}
              label={cat}
              active={newCategory === cat}
              onPress={() => setNewCategory(cat)}
              activeColor={C.primary}
            />
          ))}
        </View>
        <TouchableOpacity style={[styles.primaryButton, { marginTop: 0, backgroundColor: C.primary }]} onPress={addComplaint}>
          <Text style={styles.primaryButtonText}>Submit Complaint</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 40 }]}>MY COMPLAINTS</Text>
      <View style={{ marginTop: 16, gap: 12 }}>
        {tenantComplaints.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: C.card, borderColor: C.border, padding: 20, borderRadius: 20 }]}> 
            <View style={styles.rowBetween}>
              <Text style={[styles.cardTitle, { color: C.heading, fontSize: 16, fontWeight: '700' }]}>{item.title}</Text>
              <View style={{ backgroundColor: statusColor(item.status) + '1A', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 }}>
                <Text style={{ color: statusColor(item.status), fontWeight: '900', fontSize: 10 }}>{item.status.toUpperCase()}</Text>
              </View>
            </View>
            <Text style={[styles.cardSub, { color: C.muted, marginTop: 10, fontSize: 12 }]}>{item.category} · Filed on {item.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function TenantMessagesScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const {
    isHydrated,
    hasJoinedPg,
    joinedPg,
    tenantConversation,
    sendTenantMessage,
    markTenantThreadRead,
  } = useAppData();
  const [draft, setDraft] = useState('');
  const ownerLabel = joinedPg?.ownerName || joinedPg?.owner?.name || 'Property Manager';

  useEffect(() => {
    markTenantThreadRead();
  }, []);

  const onSend = () => {
    const result = sendTenantMessage(draft);
    if (!result.ok) {
      Alert.alert('Transmission Failed', result.error);
      return;
    }
    setDraft('');
  };

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}> 
      <View style={styles.screenPad}>
        <Header title="Direct Chat" navigation={navigation} />
      </View>

      {!isHydrated ? (
        <View style={styles.centerContent}>
          <PremiumIcon name="time-outline" size={50} color={C.muted} />
          <Text style={[styles.cardSub, { color: C.muted, marginTop: 12 }]}>Loading your conversation...</Text>
        </View>
      ) : null}

      {isHydrated && !hasJoinedPg ? (
        <View style={styles.centerContent}>
          <PremiumIcon name="chatbubbles-outline" size={60} color={C.muted} />
          <Text style={[styles.title, { color: C.heading, marginTop: 24 }]}>Secure Channel Offline</Text>
          <Text style={[styles.subtext, { color: C.muted }]}>Secure concierge communication is reserved for verified residents of institutional assets.</Text>
          <TouchableOpacity
            style={[styles.primaryButton, { width: 220, marginTop: 32, backgroundColor: C.primary }]}
            onPress={() => navigation.navigate('TenantMain', { screen: 'Explore' })}
          >
            <Text style={styles.primaryButtonText}>DISCOVER ASSETS</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {isHydrated && hasJoinedPg ? (
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 24, paddingBottom: 16 }}>
            <View style={[styles.card, { padding: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, borderColor: C.border }]}> 
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: GREEN, marginRight: 10 }} />
              <Text style={[styles.cardSub, { color: C.heading, fontWeight: '700' }]}>DIRECT CHANNEL: {ownerLabel}</Text>
            </View>
          </View>

          <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}
          >
            {tenantConversation.length === 0 ? (
              <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border }]}> 
                <Text style={[styles.cardSub, { color: C.muted }]}>No messages yet. Start the conversation with your owner.</Text>
              </View>
            ) : null}
            {tenantConversation.map((m) => (
              <View
                key={m.id}
                style={{
                  alignSelf: m.senderRole === 'tenant' ? 'flex-end' : 'flex-start',
                  backgroundColor: m.senderRole === 'tenant' ? C.primary : (isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9'),
                  padding: 14,
                  borderRadius: 18,
                  borderBottomRightRadius: m.senderRole === 'tenant' ? 4 : 18,
                  borderBottomLeftRadius: m.senderRole === 'owner' ? 4 : 18,
                  maxWidth: '85%',
                  marginBottom: 12,
                  borderWidth: m.senderRole === 'owner' ? 1 : 0,
                  borderColor: C.border,
                }}
              >
                <Text style={{ color: m.senderRole === 'tenant' ? '#FFFFFF' : C.heading, fontSize: 14, lineHeight: 20 }}>{m.text}</Text>
                <Text style={{ color: m.senderRole === 'tenant' ? 'rgba(255,255,255,0.7)' : C.muted, fontSize: 9, marginTop: 4, fontWeight: '700', alignSelf: 'flex-end' }}>{m.timeLabel?.toUpperCase()}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={{ 
            paddingBottom: 40, 
            paddingHorizontal: 24, 
            paddingTop: 16, 
            backgroundColor: C.bg,
            borderTopWidth: 1,
            borderColor: C.border
          }}>
            <View style={[styles.searchBox, { marginTop: 0, backgroundColor: C.card, borderColor: C.border }]}>
              <TextInput
                value={draft}
                onChangeText={setDraft}
                placeholder="Type your message..."
                placeholderTextColor={C.muted}
                style={[styles.searchInput, { color: C.heading }]}
              />
              <TouchableOpacity
                onPress={onSend}
                disabled={!draft.trim()}
                style={[styles.iconButton, { width: 36, height: 36, backgroundColor: draft.trim() ? C.primary : 'transparent', borderWidth: 0 }]}
              >
                <PremiumIcon name="send" size={16} color={draft.trim() ? '#FFF' : C.muted} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

export function RoommateRoomsScreen({ navigation, route }) {
  const { C, isDark } = useTheme();
  const pg = route?.params?.pg || pgListings[0];
  const candidateTenants = pg.tenantIds.map((id) => getTenantById(id));

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Room Details" navigation={navigation} />
      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 24, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.pageTitle, { color: C.heading, fontSize: 24, fontWeight: '800' }]}>{pg.name}</Text>
        <Text style={[styles.cardSub, { color: C.muted, marginTop: 6, fontSize: 14 }]}>{pg.area} · {pg.bedsAvailable} units left</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: C.muted, fontSize: 11, fontWeight: '800', marginTop: 40 }]}>CURRENT ROOMMATES</Text>
      <View style={{ marginTop: 16, gap: 12 }}>
        {candidateTenants.map((mate) => (
          <View key={mate.id} style={[styles.card, { backgroundColor: C.card, borderColor: C.border, padding: 20, borderRadius: 20 }]}> 
            <View style={styles.rowCenter}>
              <Image source={{ uri: mate.photo }} style={[styles.avatar48, { borderRadius: 12 }]} />
              <View style={[styles.flex1, { marginLeft: 16 }]}>
                <Text style={[styles.rowTitle, { color: C.heading, fontSize: 16, fontWeight: '700' }]}>{mate.name}</Text>
                <Text style={[styles.rowSub, { color: C.muted, fontSize: 13, marginTop: 2 }]}>{mate.occupation}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', backgroundColor: C.primaryGhost, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
                <Text style={{ color: C.primary, fontWeight: '900', fontSize: 12 }}>{mate.vibeMatch}%</Text>
              </View>
            </View>
            <View style={[styles.rowBetween, { marginTop: 24 }]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RoommateProfile', { tenantId: mate.id })}
                style={[styles.ghostButton, { borderColor: C.border, height: 44, flex: 1, marginRight: 8 }]}
              >
                <Text style={[styles.ghostButtonText, { color: C.heading, fontSize: 13 }]}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('VisitScheduling', { pgId: pg.id })}
                style={[styles.smallPrimary, { backgroundColor: C.primary, height: 44, flex: 1, marginLeft: 8 }]}
              >
                <Text style={[styles.smallPrimaryText, { fontSize: 13 }]}>Book Visit</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

export function VisitSchedulingScreen({ navigation, route }) {
  const { C, isDark } = useTheme();
  const pg = getPGById(route?.params?.pgId);
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('6:00 PM');

  const dates = ['Today', 'Tomorrow', 'Sat', 'Sun', 'Mon'];
  const slots = ['10:00 AM', '12:00 PM', '4:00 PM', '6:00 PM', '7:30 PM'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Schedule Visit" navigation={navigation} />

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 24, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.cardTitle, { color: C.heading, fontSize: 22, fontWeight: '800' }]}>{pg.name}</Text>
        <Text style={[styles.cardSub, { color: C.muted, marginTop: 6, fontSize: 14 }]}>{pg.area}, {pg.city}</Text>
        <View style={{ backgroundColor: C.primaryGhost, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 16 }}>
          <Text style={{ color: C.primary, fontWeight: '900', fontSize: 11 }}>ONSITE VISIT</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 16, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 0, fontSize: 11, fontWeight: '800' }]}>SELECT DATE</Text>
        <View style={[styles.filterRow, { marginTop: 16 }]}>
          {dates.map((d) => (
            <Chip key={d} label={d} active={selectedDate === d} onPress={() => setSelectedDate(d)} activeColor={C.primary} />
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 16, padding: 24, borderRadius: 24 }]}> 
        <Text style={[styles.sectionTitle, { color: C.muted, marginTop: 0, fontSize: 11, fontWeight: '800' }]}>SELECT TIME</Text>
        <View style={[styles.filterRow, { marginTop: 16 }]}>
          {slots.map((slot) => (
            <Chip key={slot} label={slot} active={selectedSlot === slot} onPress={() => setSelectedSlot(slot)} activeColor={C.primary} />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: C.primary, marginTop: 40 }]}
        onPress={() => Alert.alert('Visit Scheduled', `We've confirmed your visit for ${selectedDate} at ${selectedSlot}.`)}
      >
        <Text style={styles.primaryButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export function MapDiscoveryScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const [selectedId, setSelectedId] = useState(pgListings[0]?.id || '');
  const selected = getPGById(selectedId);

  return (
    <View style={[styles.container, { backgroundColor: C.bg }]}>
      <View style={styles.screenPad}>
        <Header title="Property Map" navigation={navigation} />
        <View style={[styles.card, { backgroundColor: GREEN + '1A', borderColor: GREEN + '33', marginTop: 24, padding: 16, borderRadius: 16 }]}> 
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <PremiumIcon name="globe" size={16} color={GREEN} />
            <Text style={{ color: GREEN, fontWeight: '800', fontSize: 13, marginLeft: 10 }}>LIVE PROPERTY GRID</Text>
          </View>
          <Text style={{ color: C.muted, fontSize: 13, marginTop: 10, lineHeight: 20 }}>
            Showing verified stays near your location. Select a property to view availability and price.
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 60 }}>
        {pgListings.map((pg) => (
          <TouchableOpacity
            key={pg.id}
            onPress={() => setSelectedId(pg.id)}
            style={[
              styles.listRow,
              {
                backgroundColor: selectedId === pg.id ? C.card : 'transparent',
                borderColor: selectedId === pg.id ? C.primary : C.border,
                borderLeftWidth: selectedId === pg.id ? 4 : 1,
                borderLeftColor: selectedId === pg.id ? C.primary : C.border,
                padding: 16,
                marginTop: 12,
              },
            ]}
          >
            <View style={[styles.iconBubble, { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F1F5F9', width: 44, height: 44, borderRadius: 14 }]}> 
              <PremiumIcon name="location" size={18} color={selectedId === pg.id ? C.primary : C.muted} />
            </View>
            <View style={[styles.flex1, { marginLeft: 16 }]}>
              <Text style={[styles.rowTitle, { color: C.heading, fontSize: 15, fontWeight: '700' }]}>{pg.name}</Text>
              <Text style={[styles.rowSub, { color: C.muted, fontSize: 11, fontWeight: '700', marginTop: 4 }]}>{pg.area} · {pg.distance}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#F1F5F9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }}>
              <PremiumIcon name="star" size={12} color={ORANGE} />
              <Text style={{ color: C.heading, fontWeight: '800', fontSize: 12, marginLeft: 4 }}>{pg.rating}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 32, padding: 24, borderRadius: 24 }]}> 
          <Text style={[styles.cardTitle, { color: C.heading, fontSize: 20, fontWeight: '800' }]}>{selected.name}</Text>
          <View style={{ gap: 8, marginTop: 16 }}>
            <Text style={[styles.cardSub, { color: C.muted, fontWeight: '700', fontSize: 12 }]}>Lat: {selected.location.lat} · Lng: {selected.location.lng}</Text>
            <Text style={[styles.cardSub, { color: C.body, marginTop: 4, fontSize: 14, lineHeight: 22 }]}>{selected.location.address}</Text>
          </View>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: C.primary, alignSelf: 'flex-start', marginTop: 24, paddingHorizontal: 24, height: 48 }]}
            onPress={() => navigation.navigate('PGDetail', { pgId: selected.id })}
          >
            <Text style={styles.primaryButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export function SavedPGsScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const { savedPgIds, toggleSavedPg } = useAppData();

  const list = pgListings.filter((pg) => savedPgIds.includes(pg.id));

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Favorites" navigation={navigation} />

      {list.length === 0 ? (
        <View style={[styles.card, { backgroundColor: C.card, borderColor: C.border, marginTop: 40, padding: 32, alignItems: 'center' }]}> 
          <View style={{ backgroundColor: C.primaryGhost, width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <PremiumIcon name="heart" size={32} color={C.primary} />
          </View>
          <Text style={[styles.cardTitle, { color: C.heading, fontSize: 18, textAlign: 'center' }]}>No Favorites Yet</Text>
          <Text style={[styles.cardSub, { color: C.muted, marginTop: 12, textAlign: 'center', lineHeight: 22 }]}>Save properties you like to compare them easily and book visits later.</Text>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: C.primary, width: '100%', marginTop: 32 }]}
            onPress={() => navigation.navigate('TenantMain', { screen: 'Explore' })}
          >
            <Text style={styles.primaryButtonText}>Browse Properties</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ marginTop: 24, gap: 20 }}>
          {list.map((pg) => (
            <TouchableOpacity 
              key={pg.id} 
              style={[styles.card, { backgroundColor: C.card, borderColor: C.border, padding: 0, overflow: 'hidden', borderRadius: 24 }]}
              onPress={() => navigation.navigate('PGDetail', { pgId: pg.id })}
            > 
              <Image source={{ uri: pg.images[0] }} style={{ height: 180, width: '100%' }} />
              <View style={{ padding: 20 }}>
                <View style={styles.rowBetween}>
                  <Text style={[styles.cardTitle, { color: C.heading, fontSize: 18, fontWeight: '800' }]}>{pg.name}</Text>
                  <TouchableOpacity onPress={() => toggleSavedPg(pg.id)}>
                    <PremiumIcon name="heart" size={24} color={RED} />
                  </TouchableOpacity>
                </View>
                <Text style={[styles.cardSub, { color: C.muted, marginTop: 6, fontSize: 13, fontWeight: '700' }]}>{pg.area} · {formatINR(pg.price)}/mo</Text>
                <View style={[styles.rowBetween, { marginTop: 24 }]}>
                  <TouchableOpacity
                    style={[styles.ghostButton, { borderColor: C.border, height: 44, flex: 1, marginRight: 8 }]}
                    onPress={() => navigation.navigate('PGDetail', { pgId: pg.id })}
                  >
                    <Text style={[styles.ghostButtonText, { color: C.heading }]}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.smallPrimary, { backgroundColor: C.primary, height: 44, flex: 1, marginLeft: 8 }]}
                    onPress={() => navigation.navigate('VisitScheduling', { pgId: pg.id })}
                  >
                    <Text style={styles.smallPrimaryText}>Schedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export function ChatScreen({ navigation }) {
  const { C, isDark } = useTheme();
  const [threads] = useState(
    tenants.slice(0, 8).map((t, idx) => ({
      id: t.id,
      name: t.name,
      photo: t.photo,
      message: idx % 2 ? 'Shall we coordinate our stay details?' : 'Are you looking for a roommate?',
      time: idx % 2 ? '5m ago' : '1h ago',
      unread: idx % 3 === 0 ? 1 : 0,
    }))
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]} contentContainerStyle={styles.screenPad}>
      <Header title="Messages" navigation={navigation} />
      <View style={{ marginTop: 24 }}>
        {threads.map((t) => (
          <TouchableOpacity
            key={t.id}
            style={[styles.listRow, { backgroundColor: C.card, borderColor: C.border, padding: 16, marginBottom: 12, borderRadius: 20 }]}
            onPress={() => Alert.alert('Chat', `Connecting with ${t.name}...`)}
          >
            <Image source={{ uri: t.photo }} style={[styles.avatar56, { borderRadius: 16 }]} />
            <View style={[styles.flex1, { marginLeft: 16 }]}>
              <Text style={[styles.rowTitle, { color: C.heading, fontSize: 16, fontWeight: '700' }]}>{t.name}</Text>
              <Text style={[styles.rowSub, { color: C.muted, fontSize: 13, marginTop: 4 }]} numberOfLines={1}>{t.message}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.rowSub, { color: C.muted, fontSize: 10, fontWeight: '700', opacity: 0.6 }]}>{t.time}</Text>
              {t.unread > 0 ? (
                <View style={[styles.unreadDot, { backgroundColor: C.primary, marginTop: 8 }]}>
                  <Text style={[styles.unreadText, { fontSize: 10 }]}>{t.unread}</Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
