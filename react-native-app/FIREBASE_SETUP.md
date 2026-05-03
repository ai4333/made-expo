# Firebase Setup (Keep Mock Data UI)

This app keeps mock PG/tenant visuals, but runtime actions (join PG, messages, complaints, notifications, saved PGs, expenses) can sync to Firebase Firestore when keys are provided.

## 1) Add env file

Copy `.env.example` to `.env` and fill values:

```bash
cp .env.example .env
```

Required keys:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

Then restart Expo:

```bash
npx expo start -c
```

## 2) Firestore rules (demo)

For classroom demo only, use permissive rules temporarily:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /staazy_demo/{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 3) Where data is stored

- Collection: `staazy_demo`
- Document: `app_state_v1`
- Field: `appState`

## 4) Verify connected mode

In tenant/owner profile settings, check backend label:

- `Firebase Connected` => live Firestore sync is active.
- `Local Demo Mode` => running local fallback only.
