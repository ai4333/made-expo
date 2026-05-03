Create a new file called src/app/pages/ConnectHub.tsx with the following complete feature set. This is a new "Connect" tab for the tenant side of the My PG Match app, placed in the bottom navigation bar immediately to the right of the "Explore" tab.

━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM — match existing app exactly
━━━━━━━━━━━━━━━━━━━━━━━━━

Font: Inter throughout
Primary violet: #7C3AED
Amber accent: #F5A623
Pink/match: #F0436A
Emerald: #10B981
Dark bg: #0F172A
App bg: #F8F7FF
Cards: white with border 1px #E2E8F0
Border radius: 16px cards, 100px buttons (pill)
Shadow: 0px 4px 16px rgba(0,0,0,0.06)
All text primary: #0F172A
All text muted: #64748B
All text placeholder: #94A3B8
Minimum tap target: 44px height

━━━━━━━━━━━━━━━━━━━━━━━━━
BOTTOM NAV CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━

In MainLayout.tsx, add a 5th tab called "Connect" between the Explore tab and the last tab (Profile/My PG). Use the Heart icon from lucide-react. Active color: #7C3AED. Show a small red dot badge (8px circle, #F0436A) on the tab icon when there are unread messages. Route: /tenant/connect.

Also add to routes.ts:
{ path: "/tenant/connect", element: <ConnectHub /> }

━━━━━━━━━━━━━━━━━━━━━━━━━
CONNECT HUB — SCREEN STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━

The screen has 3 zones:

ZONE 1 — FIXED HEADER (white, border-bottom):
Left: "Connect" title bold 20px #0F172A
Right: Two icon buttons side by side (36px circle each, white bg, 1px border #E2E8F0):
  - Filter icon (SlidersHorizontal from lucide) → opens Settings Panel
  - Settings icon (Settings from lucide) → opens Settings Panel
Both buttons open the same Settings Panel.

Below the title, a segmented pill toggle (full width, gray bg, 4px padding, rounded-xl):
Left pill: Heart icon + "Matches" + count badge if matches exist
Right pill: MessageCircle icon + "Messages" + red unread count badge if unread > 0
Active pill: #7C3AED bg white text, 8px border radius
Inactive: transparent, #64748B text

━━━━━━━━━━━━━━━━━━━━━━━━━
MATCHES TAB — Full content
━━━━━━━━━━━━━━━━━━━━━━━━━

SECTION 1 — MY STATUS CARD (sticky near top, white card, 1px #EDE9FE border):
Shows the logged-in tenant's own status.
Left: Their avatar circle (40px, initials "AK", violet bg)
Center: 
  Label "My Status" 11px muted caps
  Two pills side by side:
    Pill 1: Users icon 9px + "2-Sharing" — bg #EDE9FE text #7C3AED
    Pill 2: Home icon 9px + "Same PG" — bg #ECFDF5 text #059669
Right: "Edit" button (small, outlined, violet text, pill shape) → opens Settings Panel

PURPOSE: This card tells other tenants what room type this person is in 
and whether they want a room in the same PG or a new one.

SECTION 2 — MATCH DISCOVERY CARD (the main swipe card):
One person shown at a time. Card is tall (min 400px), white, rounded-3xl, shadow.

CARD LAYOUT:

TOP SECTION (dark gradient bg #1E1B4B → #3D3784, padding 16px):
  Left side (flex column, 30% width):
    Large avatar circle (64px, initials, color-coded)
    Below avatar — TWO STATUS BADGES stacked:
      Badge 1: Users icon + room type ("2-Sharing" / "3-Sharing" / "Single")
        bg #EDE9FE, text #7C3AED, pill shape, 10px font
      Badge 2: Home/Building icon + looking-for status
        "Same PG" → bg #ECFDF5 text #059669
        "New PG" → bg #FFF7ED text #D97706
        pill shape, 10px font
  Right side (70% width):
    Name + age: white bold 18px
    Occupation: rgba(255,255,255,0.6) 12px
    PG name: 📍 rgba(255,255,255,0.45) 12px
    Top right corner: Vibe Match badge "#7C3AED pill" — "92% 🔥" white bold 12px

MIDDLE SECTION (white, padding 16px):
  Lifestyle tags row: violet filled chips (#EDE9FE bg #7C3AED text) — emoji + label
  About line: italic muted 13px in quotes

BOTTOM ACTION ROW (border-top #F1F5F9, flex row):
  Left half: X icon + "Skip" — gray text, tappable
  Divider line (1px)
  Right half: Heart filled icon (#7C3AED) + "Connect" — violet bold text, tappable

SKIP behavior: slides to next profile, no animation needed in V1
CONNECT behavior: 
  - Adds person to Matched list
  - Shows a MATCH BANNER for 2.5 seconds:
    Full width pill banner below header, gradient bg #7C3AED→#F0436A
    "🎉 You connected with [Name]! Say hi in messages →"
    White text, bold

EMPTY STATE (when all profiles seen):
  Large emoji 🎯 centered
  "You've seen everyone!" bold 18px
  "Update your preferences to find more" muted 14px
  "Update Preferences" violet pill button → opens Settings Panel

SECTION 3 — YOUR MATCHES LIST (below the active match card):
Title: "Your Matches 🎉 (X)" bold 15px
Each matched person shown as a compact horizontal card:
  Avatar (40px) | Name bold + RoomStatusBadge (same two pills) | "Message →" violet pill button right
  Tapping "Message →" switches to Messages tab

━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGES TAB — Full content
━━━━━━━━━━━━━━━━━━━━━━━━━

SEARCH BAR:
White card, search icon left, "Search messages..." placeholder
Full width, 12px radius, 1px #E2E8F0 border

FILTER CHIPS (horizontal scroll, no scrollbar):
Pills: All | Sunshine PG | Green Nest PG | Sunrise PG
Active: #7C3AED bg white text
Inactive: white bg, #64748B text, 1px #E2E8F0 border

MESSAGE LIST (each item is a full-width tappable card):
White card, 1px border (#EDE9FE if unread, #E2E8F0 if read)
Border radius 16px, padding 12px

Card layout (flex row):
LEFT: Avatar circle (44px) with small online dot (10px, #10B981, bottom-right of avatar, white border 2px) if online
CENTER (flex-1, min-width 0):
  Row 1: Name bold 14px + time muted 11px right-aligned
  Row 2: PG name muted 11px
  Row 3: Last message 12px — bold #0F172A if unread, muted if read
RIGHT: If unread: violet filled circle badge with count (20px, 10px font)
       If read: ChevronRight 16px muted

Tapping a message → opens full inline chat thread view

CHAT THREAD VIEW (replaces the Connect screen when open):
Header: back arrow | avatar + name | online status
Message bubbles: 
  Mine: right-aligned, #7C3AED bg, white text, rounded-2xl
  Theirs: left-aligned, white card, #0F172A text
  Time below each bubble: 10px muted opacity-60
Input row at bottom: text input (rounded-full, gray bg) + Send button (violet circle when text present, gray when empty)

EMPTY STATE for messages:
MessageCircle icon 40px muted centered
"No messages yet" bold
"Match with someone to start chatting" muted 13px

━━━━━━━━━━━━━━━━━━━━━━━━━
SETTINGS PANEL (full screen overlay)
━━━━━━━━━━━━━━━━━━━━━━━━━

Opens as a full-screen page (not a modal) over dark bg #0F172A.

HEADER:
Back arrow left | "Match Preferences" white bold center | "Save" violet pill button right

SECTION 1 — "ROOM SHARING" (small caps muted label):
4 pill chips wrap: Any | Single | 2 Sharing | 3 Sharing
Selected: #7C3AED filled white text
Unselected: rgba(255,255,255,0.07) bg, white text, 1px rgba(255,255,255,0.15) border

SECTION 2 — "LOOKING FOR" (small caps muted label):
3 pill chips: Open to Both | Room in Same PG | New PG
Selected: #10B981 emerald filled white text
Unselected: same as above

SECTION 3 — "MINIMUM VIBE MATCH" (small caps muted label):
Label + current value in amber right ("70%+")
Range slider: min 40, max 95, step 5
accent-violet-600
Range labels below: "40%" left, "95%" right in muted tiny text

SECTION 4 — "MY CURRENT STATUS" (small caps muted label):
White-tinted card (rgba(255,255,255,0.05)), 1px rgba(255,255,255,0.1) border
Row 1: "My room type" white 14px left | "2-Sharing" violet pill right
Row 2: "I'm looking for" white 14px left | "Same PG" emerald pill right
Below: "This is what others see on your card" tiny muted text

━━━━━━━━━━━━━━━━━━━━━━━━━
MOCK DATA to use
━━━━━━━━━━━━━━━━━━━━━━━━━

Profiles (4 total):
1. Rahul Nair, 24, Software Engineer, Sunshine PG, 2-sharing, same-pg, 92% match, tags: [🦉 Night Owl, 🎮 Gamer, 💻 Tech], about: "Big into gaming and clean spaces 😄"
2. Karthik S, 25, Data Analyst, Sunshine PG, 3-sharing, new-pg, 88% match, tags: [💼 Pro, 🏋️ Fitness, 🌅 Early Bird], about: "Love cooking and morning runs 🏃"
3. Arjun Kumar, 23, Student, Green Nest PG, 2-sharing, same-pg, 79% match, tags: [🎓 Student, 🎵 Music, 🏠 Homebody], about: "Chill vibes only, always up for a jam 🎸"
4. Meghna R, 22, Designer, Sunrise PG, single, new-pg, 85% match, tags: [🎨 Art, ☕ Café, 📚 Reading], about: "Looking for a quiet clean shared space"

Messages (3 total):
1. Rahul Nair — "Hey! Are you still looking at Sunshine PG?" — 2m ago — 2 unread — online
2. Karthik S — "Would love to be roommates — connect?" — 1h ago — 0 unread — offline
3. Arjun Kumar — "Saw we're both looking at Green Nest 🙌" — 3h ago — 1 unread — online

Avatar colors: RN=#7C3AED, KS=#10B981, AK=#F59E0B, MR=#F0436A

━━━━━━━━━━━━━━━━━━━━━━━━━
STATE MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━

useState for:
- activeTab: "matches" | "messages" — default "matches"
- currentProfileIndex: number — default 0
- matchedProfiles: TenantProfile[] — default []
- showMatchBanner: TenantProfile | null — default null
- openChatMessage: Message | null — default null
- showSettingsPanel: boolean — default false
- messageSearch: string — default ""
- filterPG: string — default "all"
- prefRoomType: "any" | "single" | "2-sharing" | "3-sharing" — default "any"
- prefLookingFor: "any" | "same-pg" | "new-pg" — default "any"
- prefMinMatch: number — default 60

No prop drilling — all state in the ConnectHub component itself.

━━━━━━━━━━━━━━━━━━━━━━━━━
INTERACTIONS & BEHAVIOR
━━━━━━━━━━━━━━━━━━━━━━━━━

1. Tapping Connect on a match card:
   - Adds to matchedProfiles array
   - Sets showMatchBanner to that profile
   - Clears banner after 2500ms via setTimeout
   - Advances currentProfileIndex by 1

2. Tapping Skip:
   - Advances currentProfileIndex by 1 only

3. Tapping Message button on a matched person:
   - Sets activeTab to "messages"

4. Tapping a message row:
   - Sets openChatMessage to that message
   - Shows full chat thread view (replaces entire screen)

5. Back arrow in chat:
   - Sets openChatMessage to null (returns to messages list)

6. Settings Save button:
   - Closes settings panel (setShowSettingsPanel(false))

7. Filter chips in messages:
   - Filter MESSAGES array where pgName includes selected filter

8. Search in messages:
   - Filter where name.toLowerCase() includes searchMsg.toLowerCase()

9. Match banner auto-dismiss:
   - setTimeout 2500ms then setShowMatchBanner(null)

━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTS NEEDED
━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react";
import {
  Settings, SlidersHorizontal, MessageCircle, Heart,
  X, Check, ChevronRight, Search, Users, Building2,
  Home, Send, ArrowLeft, Filter
} from "lucide-react";

No external libraries. No react-router needed inside this file.
Use only Tailwind utility classes + inline style for colors.

━━━━━━━━━━━━━━━━━━━━━━━━━
COMPONENT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━

Export default ConnectHub — the main component.

Internal sub-components (defined in same file, not exported):
- Avatar({ initials, size }) — colored circle with initials
- RoomStatusBadge({ roomStatus, lookingFor }) — two small pills stacked
- MatchCard({ profile, onLike, onSkip }) — the full swipe card
- ChatThread({ message, onBack }) — inline chat view
- SettingsPanel({ onClose, all preference states and setters }) — full screen

Do NOT create separate files. All in ConnectHub.tsx.

━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT NOT TO DO
━━━━━━━━━━━━━━━━━━━━━━━━━

- Do NOT add animations or CSS keyframes (keep simple in V1)
- Do NOT use any chart libraries
- Do NOT add react-router navigation inside this component
- Do NOT use localStorage or any persistence
- Do NOT add gesture/swipe libraries — use button taps only
- Do NOT create an API call — use the mock data provided
- Do NOT use shadcn components except for basic layout
- Do NOT add loading spinners
- Do NOT make the settings a modal/drawer — make it full screen