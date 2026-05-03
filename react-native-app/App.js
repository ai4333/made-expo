import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { AppDataProvider } from './src/context/AppDataContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import AuthScreen from './src/screens/AuthScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import VibeCalibrationScreen from './src/screens/VibeCalibrationScreen';

// Tenant screens
import {
  TenantKYCScreen,
  PGDetailScreen,
  RoommateProfileScreen,
  FiltersScreen,
  MapDiscoveryScreen,
  SavedPGsScreen,
  ChatScreen,
  NotificationsScreen,
  TenantUpdatesScreen,
  TenantComplaintsScreen,
  TenantMessagesScreen,
  RoommateRoomsScreen,
  VisitSchedulingScreen,
} from './src/screens/tenant/TenantScreens';

// Owner screens
import {
  OwnerAuthScreen,
  OwnerVerifyOTPScreen,
  OwnerOnboardingScreen,
  OwnerKYCScreen,
  PGViewScreen,
  TenantDetailScreen,
  AddTenantScreen,
  WhatsAppHubScreen,
  ExpenseTrackerScreen,
  OwnerMessagesScreen,
  OwnerComplaintsScreen,
  OwnerNotificationsScreen,
} from './src/screens/owner/OwnerScreens';

// Navigators
import TenantTabNavigator from './src/navigation/TenantTabNavigator';
import OwnerTabNavigator from './src/navigation/OwnerTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AppDataProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#F8FAFC' },
              }}
            >
              {/* Entry Flow */}
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
              
              {/* Tenant Flow */}
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Auth" component={AuthScreen} />
              <Stack.Screen name="VibeCalibration" component={VibeCalibrationScreen} />
              <Stack.Screen name="TenantKYC" component={TenantKYCScreen} />
              <Stack.Screen name="TenantMain" component={TenantTabNavigator} />
              <Stack.Screen name="PGDetail" component={PGDetailScreen} />
              <Stack.Screen name="RoommateProfile" component={RoommateProfileScreen} />
              <Stack.Screen name="Filters" component={FiltersScreen} />
              <Stack.Screen name="MapDiscovery" component={MapDiscoveryScreen} />
              <Stack.Screen name="SavedPGs" component={SavedPGsScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
              <Stack.Screen name="Notifications" component={NotificationsScreen} />
              <Stack.Screen name="TenantUpdates" component={TenantUpdatesScreen} />
              <Stack.Screen name="TenantComplaints" component={TenantComplaintsScreen} />
              <Stack.Screen name="TenantMessages" component={TenantMessagesScreen} />
              <Stack.Screen name="RoommateRooms" component={RoommateRoomsScreen} />
              <Stack.Screen name="VisitScheduling" component={VisitSchedulingScreen} />
              
              {/* Owner Flow */}
              <Stack.Screen name="OwnerAuth" component={OwnerAuthScreen} />
              <Stack.Screen name="OwnerVerifyOTP" component={OwnerVerifyOTPScreen} />
              <Stack.Screen name="OwnerOnboarding" component={OwnerOnboardingScreen} />
              <Stack.Screen name="OwnerKYC" component={OwnerKYCScreen} />
              <Stack.Screen name="OwnerMain" component={OwnerTabNavigator} />
              <Stack.Screen name="PGView" component={PGViewScreen} />
              <Stack.Screen name="TenantDetail" component={TenantDetailScreen} />
              <Stack.Screen name="AddTenant" component={AddTenantScreen} />
              <Stack.Screen name="WhatsAppHub" component={WhatsAppHubScreen} />
              <Stack.Screen name="ExpenseTracker" component={ExpenseTrackerScreen} />
              <Stack.Screen name="OwnerMessages" component={OwnerMessagesScreen} />
              <Stack.Screen name="OwnerComplaints" component={OwnerComplaintsScreen} />
              <Stack.Screen name="OwnerNotifications" component={OwnerNotificationsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AppDataProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
