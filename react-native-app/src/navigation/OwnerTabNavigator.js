import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PremiumIcon from '../components/shared/PremiumIcon';

// Screens
import {
  OwnerDashboardScreen,
  PGListScreen,
  RentOverviewScreen,
  OwnerSettingsScreen,
  WhatsAppHubScreen,
} from '../screens/owner/OwnerScreens';

const Tab = createBottomTabNavigator();

export default function OwnerTabNavigator() {
  const { C, isDark } = useTheme();
  const OWNER_ACCENT = '#059669';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar, 
          { 
            backgroundColor: isDark ? 'rgba(30, 30, 40, 0.92)' : '#FFFFFF', 
            borderColor: C.border 
          }
        ],
        tabBarActiveTintColor: OWNER_ACCENT,
        tabBarInactiveTintColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={OwnerDashboardScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <PremiumIcon name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: OWNER_ACCENT }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Properties"
        component={PGListScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <PremiumIcon name={focused ? 'business' : 'business-outline'} size={24} color={color} />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: OWNER_ACCENT }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cashflow"
        component={RentOverviewScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <PremiumIcon name={focused ? 'wallet' : 'wallet-outline'} size={24} color={color} />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: OWNER_ACCENT }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={WhatsAppHubScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <PremiumIcon name="logo-whatsapp" size={24} color={focused ? '#25D366' : color} />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: '#25D366' }]} />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={OwnerSettingsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.iconContainer}>
              <PremiumIcon name={focused ? 'person' : 'person-outline'} size={24} color={color} />
              {focused && <View style={[styles.activeIndicator, { backgroundColor: OWNER_ACCENT }]} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 20,
    right: 20,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    elevation: 0,
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
  },
  activeIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
  },
});
