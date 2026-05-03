Make the following changes across 3 files. 
Apply all changes exactly as described.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND KIT — use consistently across ALL changes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary:    #7C3AED
Dark:       #5B21B6  
Light:      #EDE9FE
Gradient:   linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)
Amber:      #F59E0B
Pink:       #F0436A
Emerald:    #10B981
Black:      #0F172A
White:      #FFFFFF
App BG:     #F8F7FF
Card:       white
Border:     #E2E8F0
Muted:      #64748B
Font:       Inter

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 1 — UPDATE src/app/pages/RoommateRooms.tsx
ADD: Tappable roommate profile cards + profile bottom sheet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In RoommateRooms.tsx, each roommate listed inside a room card 
(the section showing "2 Roommates inside") must become tappable.

When user taps anywhere on a roommate row (the entire 
Rahul Nair row, Karthik S row etc.), open a FULL-SCREEN 
BOTTOM SHEET showing that person's complete profile card.

The profile bottom sheet must look EXACTLY like the match 
cards in ConnectHub.tsx — same layout, same colors, same 
structure. Specifically:

PROFILE BOTTOM SHEET STRUCTURE:

Overlay: semi-transparent black rgba(0,0,0,0.5) full screen
Sheet: white card, slides up from bottom, 
  border-radius 24px 24px 0 0, max-height 90vh, overflow-y auto

SHEET HEADER:
  Drag handle bar (40px wide, 4px tall, #E2E8F0, centered, 
  margin-top 12px)
  
  Below handle: Dark gradient section 
  (linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #3D3784 100%))
  Padding 16px, min-height 140px
  
  LEFT side: Avatar circle (72px, initials, color-coded)
    Below avatar: Room status badge (e.g. "2-Sharing" in #EDE9FE 
    #7C3AED) and "Same PG" / "New PG" badge below that
  
  RIGHT side:
    Name + age: white bold 20px (e.g. "Rahul Nair, 24")
    Occupation: rgba(255,255,255,0.65) 13px
    PG + room: 📍 rgba(255,255,255,0.45) 12px
  
  VIBE MATCH badge: top-right absolute position
    gradient amber→red pill "92% 🔥" white bold 13px
    
  GENDER badge: bottom-right absolute
    Male: rgba(99,102,241,0.25) bg "♂ Male" #A5B4FC
    Female: rgba(236,72,153,0.25) bg "♀ Female" #F9A8D4

SHEET CONTENT (white section below dark header, padding 16px):

  Occupation + City row:
    Briefcase icon (12px #94A3B8) + occupation text 12px #64748B
    dot separator · MapPin icon + "From [city]" 12px #64748B

  Living status pill:
    "🏠 Living here since Jan 2025" — 
    bg #EFF6FF text #3B82F6 border #BFDBFE
    OR "🔍 Looking to move April 2025" —
    bg #FFF7ED text #F59E0B border #FDE68A

  Lifestyle tags row (teal chips):
    bg #F0FDFA text #0D9488 border 1px #0D9488
    padding 6px 12px rounded-full 12px font

  Interest tags row (violet chips):
    bg #F5F3FF text #7C3AED border 1px #7C3AED
    padding 6px 12px rounded-full 12px font

  About text: italic 13px #475569 in quotes

SHEET BOTTOM BAR (sticky, white, border-top #E2E8F0):
  Full width button: "💬 Unlock Chat" 
  Height: 56px, border-radius 100px
  Background: linear-gradient(135deg, #7C3AED, #5B21B6)
  Text: white bold 16px
  Below button (centered, 11px #94A3B8):
  "Tap to unlock full profile & start chatting"
  
  On tap: CLOSE the profile sheet and OPEN the UnlockPaywall 
  sheet (see below)

CLOSE BUTTON: X icon top-right of the sheet, 
  32px circle, #F1F5F9 bg, #64748B icon

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 2 — UPDATE src/app/pages/ConnectHub.tsx  
CHANGES: Notification bell + Match requests panel + 
Unlock paywall sheet + color fixes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CHANGE A — ADD NOTIFICATION BELL TO HEADER:

In the Connect screen header (top area with "Connect" title 
and filter/settings icons), add a notification bell button 
BETWEEN the title and the filter/settings icons.

Bell button: 36px circle, white bg, 1px #E2E8F0 border
Icon: Bell from lucide-react
Red badge dot: 8px circle #F0436A, position absolute 
  top-right of bell button, shows count "3"
  
On tap: opens the MatchRequestsPanel (see below)

CHANGE B — MATCH REQUESTS PANEL (replaces old version):

Create a MatchRequestsPanel bottom sheet that opens when 
bell is tapped.

SHEET STRUCTURE:
Background overlay: rgba(0,0,0,0.5)
Sheet: white, rounded 24px 24px 0 0, padding 20px

HEADER ROW:
  "Match Requests 🔔" bold 18px #0F172A left
  X close button right (32px, #F1F5F9 bg)

NOTIFICATION ITEMS (show 3 mock items):

Each notification row (white card, 1px #EDE9FE border, 
rounded 16px, padding 12px, flex row):

LEFT: Avatar circle (44px) — show a blurred gradient 
  avatar, NOT initials and NOT a real photo.
  Create a blurred effect using:
  background: linear-gradient(135deg, #C4B5FD, #A78BFA)
  filter: blur(3px)
  border-radius: 50%
  This simulates a blurred/hidden profile photo.
  
CENTER (flex-1):
  Name: Show their ACTUAL first name bold 14px #0F172A
    (e.g. "Rahul", "Priya", "Karthik" — real names, not anonymous)
  Match %: amber pill "91% Match 🔥" 11px
  Time: "2 hrs ago" muted 11px #94A3B8
  Subtext: "wants to connect with you 👋" #64748B 12px

RIGHT: "Unlock →" button
  Background: #7C3AED
  Text: white 12px bold
  Padding: 8px 14px, rounded-full
  On tap: opens UnlockPaywall sheet

BOTTOM BUTTON in panel:
  Full width "🔓 Unlock All — Get Premium →" button
  Background: linear-gradient(135deg, #7C3AED, #5B21B6)
  Text: white bold 15px
  Height: 52px, rounded-full
  On tap: opens UnlockPaywall with "premium" option pre-selected

MOCK DATA for notifications:
Item 1: name "Rahul", match 91%, time "2 hrs ago"
Item 2: name "Priya", match 88%, time "5 hrs ago"  
Item 3: name "Karthik", match 85%, time "1 day ago"

CHANGE C — UNLOCK PAYWALL SHEET:

Create an UnlockPaywallSheet component that can be opened 
from multiple places.

OVERLAY: rgba(0,0,0,0.6) full screen
SHEET: white, rounded 24px 24px 0 0

HANDLE BAR: centered, 40px wide, 4px tall, #E2E8F0

HEADER:
  "Unlock This Connection 🔓" bold 20px #0F172A centered
  Subtext: "See full profile and start chatting" 14px #64748B centered

WHAT YOU GET (3 feature rows):
Each row: green check circle + text
  ✓ See full name and photo
  ✓ View complete profile and tags
  ✓ Start chatting directly

PLAN OPTIONS (2 radio-style cards):

OPTION 1 — Single unlock:
  White card, 1px #E2E8F0 border, rounded 16px, padding 16px
  Left: radio circle (24px, outline #E2E8F0 when unselected, 
    filled #7C3AED with white dot when selected)
  Center: "₹29 · Unlock this one profile" bold 15px #0F172A
  Right: nothing
  When selected: border becomes 2px #7C3AED, bg #FAFAFF

OPTION 2 — Premium (DEFAULT SELECTED):
  Same card structure
  Center: 
    "₹199/month · Unlimited unlocks" bold 15px #0F172A
    "+ priority matches" 12px #64748B
  Right: "Best Value" amber pill badge
    bg #FFF7ED text #D97706 border #FDE68A 11px
  When selected (default): border 2px #7C3AED, bg #FAFAFF
  Radio circle filled #7C3AED

CONTINUE BUTTON:
  Full width, 56px, rounded-full
  Background: linear-gradient(135deg, #7C3AED, #5B21B6)
  Text: "Continue →" white bold 16px
  
  On tap: show a mock "Payment Processing..." state for 1s
  Then show success: "✓ Unlocked!" with green checkmark
  Then close sheet after 1.5s

State management:
  useState for selectedOption: "single" | "premium" — default "premium"
  useState for paymentState: "idle" | "processing" | "success"

CHANGE D — MATCH CARD BUTTON RENAME:

In the main match card (the ConnectHub swipe card), 
change the bottom action button from "Connect" to "Unlock Chat 💬"
Keep the Skip button unchanged.
"Unlock Chat 💬" button: violet text, Heart icon replaced 
with MessageCircle icon from lucide-react.
On tap: opens UnlockPaywall sheet.

CHANGE E — COLOR CONSISTENCY:

All sheets and panels in ConnectHub must use purple brand colors:
- All "Unlock" buttons: #7C3AED bg white text
- All match count badges: #7C3AED bg white text
- Notification bell badge: #F0436A
- Panel headers: #0F172A bold
- All highlighted/selected states: #7C3AED or #EDE9FE
- No teal/green primary buttons anywhere in ConnectHub
- Sheet backgrounds: white only (no dark/navy backgrounds)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 3 — UPDATE src/app/pages/Notifications.tsx
CHANGE: Make notification items show blurred photos + real names
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In the existing Notifications.tsx, find all "roommate activity" 
or "match request" type notifications.

For each match request notification:
  REPLACE: "Someone wants to connect!" anonymous text
  WITH: Show actual first name (Rahul / Priya / Karthik etc.)
  
  REPLACE: Any profile photo or colored avatar 
  WITH: A blurred gradient circle:
    width: 44px, height: 44px, borderRadius: 50%
    background: linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)
    filter: blur(4px)
    This simulates a blurred profile photo

When user taps any match request notification row:
  Open a BLURRED PROFILE VIEW (full screen bottom sheet):
  
  BLURRED PROFILE SHEET:
  Same structure as the profile sheet in RoommateRooms above,
  BUT with these blur effects applied:
  
  1. Avatar: blurred gradient circle (no initials visible)
     filter: blur(8px) on the avatar
     
  2. Profile name: show first name only, last name HIDDEN
     e.g. "Rahul N." not full name
     The last name is blurred: 
     <span style={{filter: "blur(4px)", userSelect: "none"}}>
       Nair
     </span>
     
  3. PG name: blurred text
     <span style={{filter: "blur(4px)", userSelect: "none"}}>
       Sunshine PG
     </span>
     Replace with generic "PG in Koramangala"
     
  4. Tags and interests: VISIBLE (not blurred) — 
     these create curiosity and desire to unlock
     
  5. About text: VISIBLE (not blurred)
  
  6. Bottom action: "🔓 Unlock to See Full Profile" button
     Purple gradient, full width, 56px
     On tap: opens UnlockPaywall sheet

LOCK OVERLAY on blurred profile sheet:
  A subtle centered overlay element showing:
  Lock icon (32px, #7C3AED) 
  "Unlock to see full profile" text 14px #0F172A bold
  This floats over the blurred header area as an overlay.
  Position: absolute, centered in the dark gradient header section.
  Background: rgba(255,255,255,0.15) blur-backdrop pill
  Padding: 8px 16px, rounded-full

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHARED COMPONENT — UnlockPaywallSheet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a reusable UnlockPaywallSheet component 
that is used in ALL THREE files above.
Define it ONCE inside ConnectHub.tsx and export it,
OR define it inline in each file (inline is simpler for 
Figma Make).

Define it separately in each file where needed 
(ConnectHub.tsx and RoommateRooms.tsx and Notifications.tsx)
since they are separate files.
Copy the same component code into each file.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DO NOT TOUCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Do NOT change:
- Home.tsx
- PGDetail.tsx
- Auth.tsx  
- SplashScreen.tsx
- Onboarding.tsx
- RoleSelection.tsx
- Any owner screens
- MainLayout.tsx bottom nav
- StudentMarketplace.tsx