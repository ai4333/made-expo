# Staazy Mobile - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- Expo CLI installed globally: `npm install -g expo-cli`
- For Android: Android Studio with emulator
- For iOS: Xcode (Mac only) with simulator

### Installation Steps

```bash
# 1. Navigate to the React Native app directory
cd react-native-app

# 2. Install dependencies
npm install

# 3. Start Expo development server
npm start

# 4. Run on your preferred platform
# Press 'a' for Android
# Press 'i' for iOS (Mac only)
# Or scan QR code with Expo Go app on your phone
```

## 📱 Testing on Devices

### Android Emulator
1. Open Android Studio
2. Start an emulator (AVD Manager)
3. Run: `npm run android`

### iOS Simulator (Mac only)
1. Open Xcode
2. Run: `npm run ios`

### Physical Device
1. Install "Expo Go" app from Play Store/App Store
2. Run: `npm start`
3. Scan the QR code with your phone

## 🏗️ Project Status

### ✅ Fully Implemented
- App structure and navigation (Stack + Bottom Tabs)
- Theme context (Light/Dark mode)
- Mock data (Tenants, PGs, Owners)
- Entry screens:
  - SplashScreen
  - RoleSelectionScreen
  - AuthScreen (Phone + OTP + Profile)
- Main screens:
  - HomeScreen (Complete PG listings)
  - TenantTabNavigator
  - OwnerTabNavigator

### 🔨 Placeholder Screens (Need Implementation)
All following screens need to be implemented using the same pattern as HomeScreen:

**Tenant Screens:**
- OnboardingScreen - 3-slide carousel
- VibeCalibrationScreen - Lifestyle selection
- TenantKYCScreen - KYC verification
- MyPGScreen - Current PG details
- StudentMarketplaceScreen - Explore tab
- ConnectHubScreen - Roommate matching
- MyProfileScreen - Profile & settings
- PGDetailScreen - PG detail view
- RoommateProfileScreen - Roommate profile
- FiltersScreen - Search filters
- NotificationsScreen - Notifications
- TenantUpdatesScreen - PG announcements
- TenantComplaintsScreen - Complaints
- TenantMessagesScreen - Messages
- RoommateRoomsScreen - Available rooms
- VisitSchedulingScreen - Schedule visits

**Owner Screens:**
- OwnerAuthScreen - Owner login
- OwnerVerifyOTPScreen - OTP verification
- OwnerOnboardingScreen - Plan selection
- OwnerKYCScreen - Owner KYC
- OwnerDashboardScreen - Dashboard
- PGListScreen - PG list
- PGViewScreen - PG details
- RentOverviewScreen - Rent tracking
- TenantDetailScreen - Tenant profile
- AddTenantScreen - Add new tenant
- WhatsAppHubScreen - WhatsApp integration
- OwnerSettingsScreen - Settings

## 📝 Screen Implementation Template

Create any missing screen using this template:

```javascript
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function ScreenName({ navigation }) {
  const { C } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={C.heading} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: C.heading }]}>Screen Title</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.text, { color: C.body }]}>
          Screen content goes here
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
  },
  content: {
    padding: 16,
  },
  text: {
    fontSize: 16,
  },
});
```

## 🎨 Design Guidelines

### Colors (from ThemeContext)
```javascript
const { C } = useTheme();

C.bg          // Background
C.card        // Card background
C.primary     // #8A2BE2 (Purple)
C.heading     // Heading text
C.body        // Body text
C.muted       // Muted text
C.danger      // #DC2626
C.warning     // #D97706
C.success     // #059669
```

### Common Components
```javascript
// Button
<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>Button Text</Text>
</TouchableOpacity>

// Card
<View style={styles.card}>
  <Text style={styles.cardTitle}>Card Title</Text>
  <Text style={styles.cardText}>Card content</Text>
</View>

// Icon Button
<TouchableOpacity style={styles.iconButton}>
  <Ionicons name="heart" size={24} color={C.primary} />
</TouchableOpacity>
```

### Typography
```javascript
// Heading
fontSize: 24, fontWeight: '900'

// Subheading
fontSize: 18, fontWeight: '700'

// Body
fontSize: 16, fontWeight: '400'

// Caption
fontSize: 12, fontWeight: '600'
```

### Spacing
```javascript
// Padding/Margin
4, 8, 12, 16, 20, 24, 32, 40, 48

// Border Radius
8, 12, 16, 20, 24, 100 (pill)
```

## 🔧 Common Patterns

### Navigation
```javascript
// Navigate to screen
navigation.navigate('ScreenName');

// Navigate with params
navigation.navigate('ScreenName', { id: '123' });

// Go back
navigation.goBack();

// Replace (no back)
navigation.replace('ScreenName');
```

### Data Access
```javascript
import { pgListings, tenants, currentUser } from '../data/mockData';
import { ownerPGs, ownerTenants, getOverallStats } from '../data/ownerMockData';
```

### Lists
```javascript
import { FlatList } from 'react-native';

<FlatList
  data={items}
  renderItem={({ item }) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.listContent}
/>
```

### Images
```javascript
import { Image } from 'react-native';

<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
/>
```

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
# Clear cache
npm start -- --reset-cache

# Or
expo start -c
```

### Android Build Issues
```bash
# Clean Android build
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Build Issues
```bash
# Clean iOS build
cd ios
pod install
cd ..
npm run ios
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## 📚 Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [Expo Icons](https://icons.expo.fyi/)

## 🎯 Next Steps

1. **Implement Missing Screens**
   - Use the template above
   - Follow HomeScreen.js as reference
   - Maintain consistent styling

2. **Add Features**
   - Form validation
   - Image picker for profiles
   - Map integration
   - Swipe gestures
   - Animations

3. **Backend Integration**
   - Replace mock data with API calls
   - Add authentication
   - Implement real-time updates

4. **Testing**
   - Test on both Android and iOS
   - Test on different screen sizes
   - Test navigation flows

5. **Optimization**
   - Add loading states
   - Implement error handling
   - Optimize images
   - Add caching

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review React Native/Expo documentation
3. Check the implementation examples in existing screens

---

**Remember**: This is a FULL React Native app with NO HTML/CSS/Tailwind. All components use React Native primitives and StyleSheet.
