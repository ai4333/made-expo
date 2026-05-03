Make the following specific changes to src/app/pages/ConnectHub.tsx only.
Do not touch any other file.

━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 1 — REMOVE MY STATUS CARD
━━━━━━━━━━━━━━━━━━━━━━━━━
Remove the entire "My Status" card section from the Matches tab completely.
Do not show it anywhere on the main screen.
It already exists inside the Settings Panel — that is enough.

━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 2 — GENDER BADGE ON MATCH CARD
━━━━━━━━━━━━━━━━━━━━━━━━━
Inside the dark gradient top section of the match card,
add a gender badge in the BOTTOM-RIGHT corner of that dark section.

The badge is a small pill (not a circle):
- Male: "♂ Male" — bg rgba(99,102,241,0.3), text #A5B4FC, border 1px rgba(165,180,252,0.4)
- Female: "♀ Female" — bg rgba(236,72,153,0.3), text #F9A8D4, border 1px rgba(249,168,212,0.4)

Position: absolute, bottom: 12px, right: 12px
Font: 11px semibold
Padding: 4px 10px
Border radius: 100px (full pill)

Add a gender field to the TenantProfile type and mock data:
- Rahul Nair: "male"
- Karthik S: "male"  
- Arjun Kumar: "male"
- Meghna R: "female"

━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 3 — ADD INTERESTS SECTION BELOW DARK CARD
━━━━━━━━━━━━━━━━━━━━━━━━━
Below the dark gradient section of the match card,
before the "about" text, add TWO rows of interest chips
exactly like the second reference image:

ROW 1 — Lifestyle chips (teal/emerald outlined):
Border: 1px solid #0D9488
Text: #0D9488
Background: #F0FDFA
Border radius: 100px
Padding: 6px 12px
Font: 12px medium

ROW 2 — Interest chips (violet outlined):
Border: 1px solid #7C3AED
Text: #7C3AED  
Background: #F5F3FF
Border radius: 100px
Padding: 6px 12px
Font: 12px medium

Split the existing tags array into two groups:
- Lifestyle tags (first 3): shown in ROW 1 with teal style
- Interest tags (remaining): shown in ROW 2 with violet style

If fewer than 4 tags, show all in ROW 1 only.

Add occupation + "From [city]" line above the chip rows
(like "🧳 Software Engineer · 📍 From Pune")
in muted gray 12px, with a small dot separator between them.

Also add a "Living here since [date]" OR "Looking to move [month]"
status pill below the occupation line:
- "Living here since Jan 2025" — bg #EFF6FF, text #3B82F6, border 1px #BFDBFE
- "Looking to move April 2025" — bg #FFF7ED, text #F59E0B, border 1px #FDE68A
Font: 12px medium, pill shape, self-start (left aligned)

━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 4 — AESTHETIC IMPROVEMENTS TO MATCH CARD
━━━━━━━━━━━━━━━━━━━━━━━━━

The dark top section:
- Height: minimum 140px
- Gradient: linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #3D3784 100%)
- Avatar: 72px, border: 3px solid rgba(255,255,255,0.2)
- Name: 20px bold white, letter-spacing -0.3px
- Occupation: 13px rgba(255,255,255,0.65)
- PG location: 12px rgba(255,255,255,0.45) with 📍 prefix

Vibe Match badge (top right of dark section):
- Background: linear-gradient(135deg, #F59E0B, #EF4444)
- Text: white bold 13px
- Padding: 6px 12px
- Border radius: 100px
- Shadow: 0 2px 8px rgba(245,158,11,0.4)

The white content section below:
- Padding: 16px
- Gap between elements: 10px
- About text: 13px italic color #475569 (slightly darker muted)
- Wrap all tags in flex-wrap

The action row (Skip / Connect):
- Height: 56px
- Skip: X icon 16px + "Skip" 14px — color #94A3B8
- Connect: Heart icon filled #7C3AED 16px + "Connect" 14px bold — color #7C3AED
- Add subtle hover: Skip bg becomes #FEF2F2, Connect bg becomes #F5F3FF
  Use CSS transition on background

Overall card:
- Border radius: 24px (rounded-3xl)
- Box shadow: 0 8px 32px rgba(124,58,237,0.12), 0 2px 8px rgba(0,0,0,0.06)
- Border: 1px solid #EDE9FE

━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE 5 — FIX SETTINGS PANEL THEME
━━━━━━━━━━━━━━━━━━━━━━━━━
The Settings Panel must NOT be dark/black.
Change it to match the app's light theme:

Background: #F8F7FF (same as app background)
Header: white, border-bottom 1px #E2E8F0

Header layout:
- Back arrow: #64748B color
- Title: "Match Preferences" — #0F172A bold 17px center
- Save button: #7C3AED bg, white text, pill shape, 14px semibold

Section labels: "ROOM SHARING", "LOOKING FOR" etc.
- Color: #94A3B8
- Font: 11px semibold uppercase tracking-widest

Chip buttons (unselected):
- Background: white
- Border: 1px solid #E2E8F0
- Text: #64748B
- Border radius: 100px

Chip buttons (selected for Room Sharing):
- Background: #7C3AED
- Border: #7C3AED
- Text: white

Chip buttons (selected for Looking For):
- Background: #10B981
- Border: #10B981
- Text: white

Vibe Match slider label:
- "MINIMUM VIBE MATCH" label: #94A3B8 small caps
- Current value badge: amber pill — bg #FFF7ED, text #D97706, border #FDE68A, "70%+"
- Slider accent: violet (#7C3AED)
- Range labels (40% / 95%): #CBD5E1 tiny

My Current Status card inside settings:
- Background: white
- Border: 1px solid #EDE9FE
- Border radius: 16px
- "My room type" label: #64748B 13px
- "2-Sharing" value: #7C3AED bg #EDE9FE pill
- "I'm looking for" label: #64748B 13px
- "Same PG" value: #059669 bg #ECFDF5 pill
- Note text: #94A3B8 11px

All section containers:
- Background: white
- Border radius: 16px
- Padding: 16px
- Border: 1px solid #E2E8F0

━━━━━━━━━━━━━━━━━━━━━━━━━
UPDATED MOCK DATA
━━━━━━━━━━━━━━━━━━━━━━━━━
Add these fields to each profile:
- gender: "male" | "female"
- city: string (e.g. "Pune", "Chennai", "Delhi", "Hyderabad")
- livingStatus: "living" | "looking"
- since: string (e.g. "Jan 2025", "April 2025")
- lifestyleTags: string[] (first 3 tags)
- interestTags: string[] (remaining tags)

Profile 1 — Rahul Nair: gender male, city Pune, living since Jan 2025
  lifestyle: ["🦉 Night Owl", "🎮 Gamer", "💻 Tech"]
  interests: ["🎵 Music", "🍕 Foodie"]

Profile 2 — Karthik S: gender male, city Chennai, looking April 2025
  lifestyle: ["💼 Working Pro", "🏋️ Fitness", "🌅 Early Bird"]
  interests: ["⚽ Sports", "📚 Reading"]

Profile 3 — Arjun Kumar: gender male, city Delhi, living since Mar 2025
  lifestyle: ["🎓 Student", "🎵 Music", "🏠 Homebody"]
  interests: ["🎬 Movies", "🍕 Foodie"]

Profile 4 — Meghna R: gender female, city Hyderabad, looking March 2025
  lifestyle: ["🎨 Art", "☕ Café", "🌅 Early Bird"]
  interests: ["📚 Reading", "✨ Minimalist"]

━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT NOT TO CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━
- Do NOT change the Messages tab
- Do NOT change the header (Connect title + filter + settings icons)
- Do NOT change the tab toggle (Matches / Messages)
- Do NOT change the Match Banner
- Do NOT change the Matched list at bottom of Matches tab
- Do NOT change MainLayout.tsx or routes.ts

Apply all 5 changes to ConnectHub.tsx only.