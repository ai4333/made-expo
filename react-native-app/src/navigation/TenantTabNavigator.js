import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import PremiumIcon from '../components/shared/PremiumIcon';

// Screens
import HomeScreen from '../screens/HomeScreen';
import {
  ConnectHubScreen,
  MyPGScreen,
  MyProfileScreen,
  StudentMarketplaceScreen,
} from '../screens/tenant/TenantScreens';

const Tab = createBottomTabNavigator();

export default function TenantTabNavigator() {
  const { C, isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { 
            backgroundColor: isDark ? 'rgba(30, 30, 40, 0.9)' : 'rgba(255, 255, 255, 0.9)', 
            borderColor: C.border,
            borderTopColor: C.border,
          }
        ],
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
        tabBarLabelStyle: styles.tabLabel,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <PremiumIcon name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPG"
        component={MyPGScreen}
        options={{
          tabBarLabel: 'My Stay',
          tabBarIcon: ({ color, focused }) => (
            <PremiumIcon name={focused ? "business" : "business-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={StudentMarketplaceScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <PremiumIcon name={focused ? "compass" : "compass-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={ConnectHubScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <PremiumIcon 
                name={focused ? "people" : "people-outline"} 
                size={22} 
                color={color} 
              />
              <View style={[styles.badge, { backgroundColor: C.primary }]}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MyProfileScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <PremiumIcon name={focused ? "person" : "person-outline"} size={22} color={color} />
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
    paddingBottom: 4,
    paddingTop: 8,
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
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
});
