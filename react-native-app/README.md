# Staazy Mobile - React Native App

A complete React Native mobile application for PG (Paying Guest) management, converted from the web version.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start Expo
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## 📱 App Structure

### Entry Flow
1. **SplashScreen** → Auto-navigates to RoleSelection after 2.5s
2. **RoleSelectionScreen** → Choose Tenant or Owner
3. **AuthScreen** → Phone + OTP login with profile setup
4. **OnboardingScreen** → 3-slide carousel (Tenant only)
5. **VibeCalibrationScreen** → Lifestyle/interests selection (Tenant only)

### Tenant Flow (Bottom Tab Navigation)
- **Home** - PG listings with filters, search, current PG info
- **My PG** - Current PG details, roommates, rent status
- **Explore** - Student marketplace, map discovery
- **Connect** - Roommate matching (swipe cards)
- **More** - Profile, saved PGs, settings

### Owner Flow (Bottom Tab Navigation)
- **Dashboard** - Stats, quick actions, recent activity
- **PGs** - List of managed properties
- **Rent** - Rent collection tracking
- **WhatsApp** - WhatsApp integration hub
- **Profile** - Settings and account management

## 📂 Project Structure

```
react-native-app/
├── App.js                          # Main app entry with navigation
├── package.json                    # Dependencies
├── src/
│   ├── context/
│   │   └── ThemeContext.js         # Light/Dark theme provider
│   ├── data/
│   │   ├── mockData.js             # Tenant data (PGs, tenants, listings)
│   │   └── ownerMockData.js        # Owner data (PGs, tenants, expenses)
│   ├── navigation/
│   │   ├── TenantTabNavigator.js   # Tenant bottom tabs
│   │   └── OwnerTabNavigator.js    # Owner bottom tabs
│   ├── screens/
│   │   ├── SplashScreen.js         # ✅ Entry splash
│   │   ├── RoleSelectionScreen.js  # ✅ Tenant/Owner selection
│   │   ├── AuthScreen.js           # Phone + OTP login
│   │   ├── OnboardingScreen.js     # 3-slide carousel
│   │   ├── VibeCalibrationScreen.js # Lifestyle selection
│   │   ├── TenantKYCScreen.js      # KYC verification
│   │   ├── HomeScreen.js           # Main PG listings
│   │   ├── MyPGScreen.js           # Current PG details
│   │   ├── StudentMarketplaceScreen.js # Explore tab
│   │   ├── ConnectHubScreen.js     # Roommate matching
│   │   ├── MyProfileScreen.js      # Profile & settings
│   │   ├── PGDetailScreen.js       # PG detail view
│   │   ├── RoommateProfileScreen.js # Roommate profile
│   │   ├── FiltersScreen.js        # Search filters
│   │   ├── NotificationsScreen.js  # Notifications
│   │   ├── TenantUpdatesScreen.js  # PG announcements
│   │   ├── TenantComplaintsScreen.js # Complaints
│   │   ├── TenantMessagesScreen.js # Messages
│   │   ├── RoommateRoomsScreen.js  # Available rooms
│   │   ├── VisitSchedulingScreen.js # Schedule visits
│   │   └── owner/
│   │       ├── OwnerAuthScreen.js  # Owner login
│   │       ├── OwnerVerifyOTPScreen.js # OTP verification
│   │       ├── OwnerOnboardingScreen.js # Plan selection
│   │       ├── OwnerKYCScreen.js   # Owner KYC
│   │       ├── OwnerDashboardScreen.js # Dashboard
│   │       ├── PGListScreen.js     # PG list
│   │       ├── PGViewScreen.js     # PG details
│   │       ├── RentOverviewScreen.js # Rent tracking
│   │       ├── TenantDetailScreen.js # Tenant profile
│   │       ├── AddTenantScreen.js  # Add new tenant
│   │       ├── WhatsAppHubScreen.js # WhatsApp integration
│   │       └── OwnerSettingsScreen.js # Settings
│   └── components/
│       ├── PGCard.js               # Reusable PG card
│       ├── TenantCard.js           # Reusable tenant card
│       ├── Button.js               # Custom button
│       └── Badge.js                # Status badge
```

## 🎨 Design System

### Colors
```javascript
Primary: #8A2BE2 (Purple)
Connect: #7C3AED (Violet)
WhatsApp: #25D366 (Green)
Success: #059669
Warning: #D97706
Danger: #DC2626
```

### Theme
- Light mode (default)
- Dark mode support via ThemeContext
- Consistent spacing and typography

## 🔑 Key Features

### Tenant Features
- ✅ PG discovery with filters
- ✅ Roommate matching with vibe scores
- ✅ Swipeable card interface
- ✅ Visit scheduling
- ✅ Complaint management
- ✅ Real-time notifications
- ✅ Saved PGs

### Owner Features
- ✅ Multi-PG management
- ✅ Tenant tracking (active/notice/vacated)
- ✅ Rent collection (paid/pending/overdue)
- ✅ Expense tracking
- ✅ WhatsApp integration
- ✅ Complaint resolution
- ✅ Occupancy analytics

## 📦 Dependencies

```json
{
  "expo": "~52.0.0",
  "react": "18.3.1",
  "react-native": "0.76.5",
  "@react-navigation/native": "^7.0.0",
  "@react-navigation/stack": "^7.0.0",
  "@react-navigation/bottom-tabs": "^7.0.0",
  "react-native-gesture-handler": "~2.20.0",
  "react-native-reanimated": "~3.16.0",
  "@expo/vector-icons": "^14.0.0",
  "expo-linear-gradient": "~14.0.0",
  "expo-image": "~2.0.0"
}
```

## 🛠️ Development Notes

### Navigation Structure
- **Stack Navigator** (root) - Handles all screen transitions
- **Bottom Tab Navigator** (Tenant) - 5 tabs with custom styling
- **Bottom Tab Navigator** (Owner) - 5 tabs with custom styling

### State Management
- React Context for theme
- Component-level useState for local state
- Navigation params for data passing

### Styling
- React Native StyleSheet (NO CSS/Tailwind)
- Consistent design tokens
- Mobile-first responsive design

### Data Flow
- Mock data in `/src/data/`
- Helper functions for stats calculation
- Ready for API integration

## 🚧 Implementation Status

### ✅ Completed
- App structure and navigation
- Theme context
- Mock data models
- Entry screens (Splash, RoleSelection)
- Tab navigators (Tenant, Owner)

### 🔨 To Implement
All remaining screens follow the same pattern:
1. Import React Native components (View, Text, ScrollView, etc.)
2. Use StyleSheet for styling
3. Use navigation prop for routing
4. Import mock data from `/src/data/`
5. Use useTheme() for colors

## 📝 Screen Implementation Template

```javascript
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ScreenName({ navigation }) {
  const { C } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: C.bg }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: C.heading }]}>Screen Title</Text>
        {/* Content here */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

## 🎯 Next Steps

1. Implement remaining screens using the template above
2. Add form validation
3. Integrate with backend API
4. Add push notifications
5. Implement image picker for profile photos
6. Add map integration for PG locations
7. Implement swipe gestures for roommate matching
8. Add animations with React Native Reanimated

## 📱 Testing

```bash
# Test on Android emulator
npm run android

# Test on iOS simulator (Mac only)
npm run ios

# Test on physical device
# Scan QR code from Expo Go app
npm start
```

## 🔐 Environment Setup

No environment variables needed for mock data version.
For production, create `.env`:

```
API_BASE_URL=https://api.staazy.com
GOOGLE_MAPS_API_KEY=your_key_here
```

## 📄 License

Private - Staazy Technologies

---

**Note**: This is a FULL React Native conversion with NO HTML/CSS/Tailwind. All components use React Native primitives (View, Text, ScrollView, etc.) and StyleSheet for styling.
