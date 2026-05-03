Complete Tenant Screens — Full Design & Interaction Prompt for Figma Make

CONTEXT & GOAL
This app has two worlds — Owner and Tenant. The Owner screens are already well-designed with #8A2BE2 purple + white, smooth cards, and consistent styling. The Tenant screens must now match that exact same quality, color system, and feel — but with a warmer, more personal tone. Every tap, transition, and interaction must feel smooth and satisfying.

🎨 DESIGN SYSTEM — USE THESE EVERYWHERE, NO EXCEPTIONS
ts// Core brand
const PURPLE       = "#8A2BE2";
const PURPLE_DARK  = "#6D1CB5";
const PURPLE_LIGHT = "#A855F7";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_GHOSTHOVER = "rgba(138,43,226,0.16)";
const PURPLE_BORDER = "rgba(138,43,226,0.22)";
const PURPLE_SHADOW = "rgba(138,43,226,0.28)";

// Light mode
const LIGHT = {
  bg: "#FFFFFF",
  surface: "#F5F3FF",
  elevated: "#EDE9FE",
  heading: "#1A0533",
  body: "#3D2C6B",
  muted: "#8B7AA8",
  divider: "#E9E3F5",
  card: "#FFFFFF",
  cardBorder: "#E9E3F5",
  inputBg: "#F5F3FF",
  navBg: "#FFFFFF",
  navBorder: "#E9E3F5",
  danger: "#DC2626",
  dangerBg: "rgba(220,38,38,0.08)",
  warning: "#D97706",
  warningBg: "rgba(217,119,6,0.10)",
  success: "#059669",
  successBg: "rgba(5,150,105,0.08)",
};

// Dark mode
const DARK = {
  bg: "#0F0F13",
  surface: "#1A1A24",
  elevated: "#22223A",
  heading: "#F3F0FF",
  body: "#C4B5FD",
  muted: "#6B6B8A",
  divider: "#2D2D3D",
  card: "#1A1A24",
  cardBorder: "#2D2D3D",
  inputBg: "#22223A",
  navBg: "#1A1A24",
  navBorder: "#2D2D3D",
  danger: "#EF4444",
  dangerBg: "rgba(239,68,68,0.12)",
  warning: "#F59E0B",
  warningBg: "rgba(245,158,11,0.12)",
  success: "#10B981",
  successBg: "rgba(16,185,129,0.10)",
};

✨ INTERACTION & ANIMATION RULES — APPLY TO EVERYTHING
Every interactive element must feel alive. Use these patterns consistently:
Button press:
csstransition: transform 0.12s ease, box-shadow 0.12s ease, background 0.15s ease;
/* On active/press: */
transform: scale(0.97);
box-shadow: none;
Card hover/tap:
csstransition: transform 0.15s ease, box-shadow 0.15s ease;
/* On hover: */
transform: translateY(-2px);
box-shadow: 0 8px 24px rgba(138,43,226,0.14);
Page entry animation — stagger children:
css/* Parent */
.page-enter { animation: fadeSlideUp 0.3s ease both; }

/* Each card/section gets increasing delay */
.child-1 { animation-delay: 0.05s; }
.child-2 { animation-delay: 0.10s; }
.child-3 { animation-delay: 0.15s; }

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
Toggle switch:
css/* Track */
transition: background 0.2s ease;
/* Thumb */
transition: left 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); /* bouncy */
Bottom sheet slide-up:
cssanimation: slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1);
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
Success checkmark draw:
cssstroke-dasharray: 100;
stroke-dashoffset: 100;
animation: drawCheck 0.5s ease 0.2s forwards;
@keyframes drawCheck {
  to { stroke-dashoffset: 0; }
}
Filter pill / tab switch:
csstransition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
Input focus:
csstransition: border-color 0.15s ease, box-shadow 0.15s ease;
/* On focus: */
border-color: #8A2BE2;
box-shadow: 0 0 0 3px rgba(138,43,226,0.12);
Purple button standard:
tsxstyle={{
  background: PURPLE,
  color: "#fff",
  border: "none",
  borderRadius: 14,
  padding: "14px",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  width: "100%",
  boxShadow: `0 4px 16px ${PURPLE_SHADOW}`,
  transition: "transform 0.12s ease, box-shadow 0.12s ease",
  // onMouseDown: scale(0.97), shadow: none
  // onMouseUp: scale(1), shadow restored
}}
```

---

## 📱 SCREEN 1 — `RoleSelection.tsx`

Full white background. Everything centered vertically and horizontally.

**Layout (top to bottom):**
```
[Logo Block]
  ↓ 32px gap
[Tagline]
  ↓ 48px gap
[Tenant Card — Purple]
  ↓ 14px gap
[Owner Card — White/Border]
  ↓ 24px gap
[Already registered? Log in]
Logo block:

68×68px purple square (#8A2BE2), border-radius 20px
🏠 emoji inside, 32px
Box shadow: 0 8px 28px rgba(138,43,226,0.35)
Entry animation: scale from 0.7 → 1 with bounce, 0.4s

Tagline:

"PG OS" — 28px, 900 weight, #1A0533
"Your PG, sorted." — 15px, muted color, margin-top 6px

Card 1 — I'm a Tenant (Purple):
tsxbackground: PURPLE
borderRadius: 20px
padding: 22px 20px
boxShadow: 0 10px 36px rgba(138,43,226,0.38)
cursor: pointer
transition: transform 0.15s ease, box-shadow 0.15s ease
// onMouseDown: transform scale(0.98)
// onMouseUp / onMouseLeave: scale(1)

// Inside:
🏠 icon — 30px emoji, marginBottom 10
"I'm a Tenant" — 20px, 800 weight, white
"View your PG, pay rent & raise issues" — 13px, white 75% opacity, marginTop 5
ChevronRight icon — 16px, white 60%, float right aligned vertically
Card 2 — I'm a PG Owner (White):
tsxbackground: t.card
border: 2px solid rgba(138,43,226,0.22)
borderRadius: 20px
padding: 22px 20px
cursor: pointer
transition: transform 0.15s ease, border-color 0.15s ease
// onMouseEnter: border-color rgba(138,43,226,0.45)
// onMouseDown: transform scale(0.98)

// Inside:
🔑 icon — 30px emoji
"I'm a PG Owner" — 20px, 800 weight, t.heading
"Manage your PGs, tenants & rent" — 13px, t.muted
```

**Both cards animate in** with `fadeSlideUp` stagger — Tenant card delay 0.1s, Owner card delay 0.2s.

**Dark mode toggle:** Top-right corner, absolute position. Moon/Sun icon in PURPLE_GHOST button.

**"Already registered? Log in"** — centered below cards, 13px, muted color. "Log in" part is `#8A2BE2` underlined on hover.

---

## 📱 SCREEN 2 — `Auth.tsx` (Tenant Login)

Clean, minimal. One thing at a time.

**Top bar:** Back arrow (purple) + "Join Your PG" title + dark mode toggle

**Step 1 — Phone number:**
```
"Welcome 👋"  — 24px, 900 weight, heading color
"Enter your registered WhatsApp number"  — 14px, muted

[+91 prefix box] [Phone input field]
— prefix box: 52px wide, surface background, purple border on focus
— phone input: fills remaining width
— both share same height: 52px, borderRadius 14px

[Info card — purple ghost]
  💡 "Use the number your PG owner registered for you"
  — surface background, purple left border 3px, 13px text

[Send OTP →] — purple filled button, full width
— onPress: slight scale down, then navigate to step 2
```

**Step 2 — OTP:**
```
"Enter OTP"  — 22px, 800 weight
"Sent to +91 XXXXXX"  — 14px, muted

[6 OTP boxes in a row]
— each box: 44px × 54px, borderRadius 12px
— empty: surface bg, muted border
— focused: white bg, #8A2BE2 border, 0 0 0 3px rgba(138,43,226,0.12) shadow
— filled: white bg, #8A2BE2 border, value in 24px bold heading color
— auto-advance to next box on input
— shake animation if wrong OTP (horizontal keyframe: 0 → -6 → 6 → -4 → 4 → 0, 0.4s)

[Verify & Enter →] — purple button
[Resend OTP] — ghost button, disabled with countdown timer (30s → active)
```

**Entry animation:** Form card slides up from bottom, 0.3s.

---

## 📱 SCREEN 3 — `Home.tsx` (Tenant Home)

This is the most important screen. Everything must feel polished.

**Hero banner (purple gradient):**
```
background: linear-gradient(145deg, #8A2BE2 0%, #6D1CB5 100%)
padding: 48px 16px 18px
```

Inside hero:
- Top row: home icon label "Your PG" (left) + dark mode toggle + bell icon (right)
- PG name: 22px, 900 weight, white, letter-spacing -0.5px
- Location + room: muted white, 12px, MapPin icon
- 3 stat pills in a row (glassmorphism: white 13% bg, 12px radius)
- **Rent alert bar** at bottom of hero: amber background, alert icon, amount, due date, "Pay Now" white button

**Rent alert bar interaction:**
```
Tap anywhere on bar → navigate to /tenant/mypg
"Pay Now" button → onPress scale(0.95), then navigate
transition: transform 0.12s ease
```

**Quick Actions (3 cards, grid):**
- Each card: white bg, purple border, 16px radius
- Inside: 40×40 purple ghost icon container + label below
- Tap animation: scale(0.96), background flashes to PURPLE_GHOST
- Cards animate in with stagger: 0.05s, 0.10s, 0.15s delay

**PG Updates preview:**
- Section heading + "See all →" link
- 2 announcement cards with 3px purple left border
- Cards slide in from right: `translateX(20px) → translateX(0)`, 0.25s each

**Filter pills (PG discovery section):**
- Active: `#8A2BE2` bg, white text, `0 4px 12px rgba(138,43,226,0.28)` shadow
- Inactive: surface bg, muted text
- Switching pills: smooth background transition 0.15s, active pill gets shadow

**PG cards:**
- Border radius 24px, overflow hidden
- Image carousel dots: active dot expands from 6px → 18px width (transition: width 0.2s)
- Save button: heart icon fills rose-500 with scale(1.2) bounce on tap
- "View PG" button: purple outline, on press bg briefly fills purple then back
- "See Roommates" button: purple filled, shadow `0 4px 14px rgba(138,43,226,0.30)`

---

## 📱 SCREEN 4 — `MyPGPage.tsx`

**Hero card — purple gradient (same as owner dashboard style):**
```
background: linear-gradient(135deg, #8A2BE2 0%, #6D1CB5 100%)
borderRadius: 20px
padding: 22px 18px
margin: 16px
boxShadow: 0 8px 28px rgba(138,43,226,0.32)
```

Inside hero:
- PG name (white, 22px, 800)
- Address with 📍 pin (white 70% opacity)
- 2 pill badges: "Boys PG" + "Since Jan 2025" (white 20% bg)

**Owner contact card:**
- Purple avatar (44×44, 12px radius) with initial
- Name + phone
- "💬 Message" ghost button → onPress: scale(0.96), navigate to /tenant/messages

**3 action buttons row (Updates / Raise Issue / Message):**
- Updates + Raise Issue: PURPLE_GHOST background, PURPLE text, purple border
- Message: PURPLE filled, white text, shadow
- All 3: onPress scale(0.96), transition 0.12s

**Amenities grid (3×2):**
- Available: PURPLE_GHOST bg, purple icon + label, purple border
- Not available: surface bg, gray icon 35% opacity, gray label
- Each cell: onPress scale(0.95) even though non-interactive (feels responsive)

**PG Rules list:**
- Each rule: purple bullet + body text
- Rows animate in with stagger on page load

**Move-out notice:**
- Default: outlined purple button "Submit Move-Out Notice"
- **On tap → bottom sheet slides up:**
```
  animation: slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1)
  background: t.card
  borderRadius: 24px 24px 0 0
  padding: 24px 20px 48px
  overlay: rgba(0,0,0,0.5) fade in 0.2s
```
  Inside: "Are you sure?" heading + explanation + "Yes, Submit" (danger red) + "Cancel" (ghost)
- **After confirmed:** Purple ghost confirmation card replaces button, slides in with `fadeSlideUp` 0.3s

---

## 📱 SCREEN 5 — `TenantComplaints.tsx`

**Tab switcher:**
- Container: surface background, 4px padding, 14px radius
- Active tab: white card, PURPLE text, box-shadow `0 1px 6px rgba(0,0,0,0.08)`
- Inactive: transparent, muted text
- Switching: background + color transition 0.15s, shadow appears/disappears

**Step indicator (for raise flow):**
- Filled circle: PURPLE background, white number
- Empty circle: surface background, muted number
- Connecting line: PURPLE when step passed, divider color when not
- Step transition: circle bg animates from surface → PURPLE over 0.2s

**Category grid (Step 1):**
- 3×3 grid, each cell: card background, border, 16px radius
- **Unselected:** white bg, light border, emoji + label
- **Selected:** PURPLE_GHOST bg, PURPLE border 2px, purple label, checkmark badge top-right
```
  transition: background 0.15s, border-color 0.15s, transform 0.12s
  // On tap: scale(0.95) → scale(1)
  // Selected state: scale(1.02) for a moment then settle
```
- "Next →" button: disabled (surface bg, muted text) until category selected, then animates to purple with shadow over 0.2s

**Textarea (Step 2):**
- Border transitions to PURPLE on focus with 0 0 0 3px rgba(138,43,226,0.12) outer glow
- Character counter counts up in real time, turns amber at 250+, red at 290+

**Urgency pills:**
- "Can wait": surface → gray tint on select
- "Urgent": surface → amber bg + amber border on select, transition 0.15s
- "Emergency": surface → red bg + red border on select, transition 0.15s

**Submit button:**
- Disabled: surface bg, muted text, no shadow, cursor default
- Active (text entered): purple bg, white text, shadow — transitions smoothly over 0.2s
- On press: scale(0.97), shadow compresses

**Success screen:**
- Entire content fades out (opacity 0 over 0.2s), then success screen fades in (opacity 1 over 0.3s)
- Checkmark circle: scale from 0 → 1.1 → 1 (bouncy), 0.4s
- Checkmark SVG stroke draws itself: stroke-dashoffset 100 → 0 over 0.5s, 0.2s delay
- Heading + subtext + reference + buttons: fadeSlideUp stagger 0.3s, 0.4s, 0.5s, 0.6s

**Complaint cards (My Complaints tab):**
- Left border color: amber=Open, purple=In Progress, green=Resolved
- Status filter switching: pills transition 0.15s
- Cards enter with `fadeSlideUp` stagger, 0.05s apart
- Timeline dots (In Progress): filled dots pulse subtly with `0 0 0 4px rgba(138,43,226,0.15)` shadow

---

## 📱 SCREEN 6 — `TenantMessages.tsx`

**Message thread:**
- On send: new bubble appears with `fadeSlideUp` 0.2s from bottom
- Tenant bubble (right): PURPLE bg, white text, radius `16px 4px 16px 16px`
- Owner bubble (left): card bg, purple border 1px, radius `4px 16px 16px 16px`
- Each bubble: enters with `fadeSlideUp` 0.2s + slight scale(0.95) → scale(1)
- Timestamps: fade in 0.3s after bubble appears

**Quick template chips:**
- Horizontal scroll, no scrollbar visible
- Each chip: white bg, PURPLE_BORDER, purple text
- On tap: chip bg briefly flashes PURPLE_GHOST, then input fills with text
- Active chip (selected but not yet sent): PURPLE bg, white text

**Compose input:**
- Border: `t.cardBorder` default → `#8A2BE2` on focus
- Focus box-shadow: `0 0 0 3px rgba(138,43,226,0.12)`
- transition: border-color 0.15s, box-shadow 0.15s

**Send button:**
- Disabled (empty input): `rgba(138,43,226,0.2)` bg, white icon, cursor default
- Active (has text): PURPLE bg, `0 3px 12px rgba(138,43,226,0.30)` shadow
- Transition from disabled → active: 0.2s ease
- On press: scale(0.90) → scale(1), 0.12s

---

## 📱 SCREEN 7 — `TenantUpdates.tsx`

**Announcement cards enter with stagger:**
- Each card: `fadeSlideUp` animation, 0.05s delay per card
- `1st card: delay 0.05s, 2nd: 0.10s, 3rd: 0.15s` etc.

**Card interaction:**
- On tap: scale(0.99), background goes from white → surface for 150ms then back
- Purple left border is always 3px solid PURPLE — no change on tap

**Empty state:**
- Icon container: subtle pulse animation (`scale 1 → 1.05 → 1`, 2s loop, ease-in-out)
- Text fades in after icon, 0.3s delay

---

## 📱 SCREEN 8 — `MyProfile.tsx`

**Avatar:**
- Purple circle (84px) with initial letter, 900 weight, 30px font
- Box shadow: `0 4px 20px rgba(138,43,226,0.35)`
- Camera button (bottom-right): purple circle, white Camera icon
- On avatar tap: scale(1.03) briefly

**Edit fields:**
- All in one white card, each field separated by divider line
- Label: 11px, uppercase, letter-spacing 0.05em, muted
- Input: 15px, 600 weight, heading color
- On focus: border of the entire card section gets purple left accent (3px, animates in)
- Non-editable fields: muted text, "Locked" badge (surface bg, 10px radius pill)

**Save button state machine:**
- `isDirty = false`: surface bg, muted text, cursor default — no shadow
- `isDirty = true`: PURPLE bg, white text, shadow — transition 0.2s ease
- `saved = true` (after save): bg stays purple, text changes to "✓ Changes Saved!" with checkmark
- After 2 seconds: button returns to inactive state smoothly

**Toggle switches:**
- Track: `t.elevated` → `PURPLE`, transition: background 0.2s
- Thumb: slides left ↔ right, transition: left 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) — slight bounce on land

**Log out flow:**
- "Log Out" text button: red color, LogOut icon
- On tap → overlay fades in (rgba(0,0,0,0.5), 0.2s), bottom sheet slides up (slideUp 0.28s)
- Sheet has: "Log out?" heading + explanation + red "Yes, Log Out" + purple ghost "Cancel"
- On cancel: sheet slides back down (slideDown 0.22s), overlay fades out

---

## 📱 SCREEN 9 — `Notifications.tsx`

**Notification cards by type:**
```
Left border 3px:
- Overdue rent alert → #DC2626 (red)
- Rent reminder → #D97706 (amber)
- PG update / announcement → #8A2BE2 (purple)
- Complaint update → #8A2BE2 (purple)
- General info → t.divider (neutral)
```

**Card structure:**
```
[colored left border]
[icon in 36×36 ghost bg circle] [text column] [View button if actionable]

Text column:
- Title: 14px, 600 weight, heading color
- Time: 12px, muted
Interactions:

Cards enter with fadeSlideUp stagger 0.05s apart
"View" button: PURPLE_GHOST bg, PURPLE text, on press scale(0.95)
Unread cards: very subtle rgba(138,43,226,0.04) background tint
"Mark all as read" link: purple, top-right, on tap all cards smoothly lose tint (transition 0.3s)


📱 SCREEN 10 — SavedPGs.tsx
Saved PG cards:

Same card design as Home PG cards — 24px radius, image carousel, content below
Heart icon: filled rose-500 (they're all saved on this screen)
On unsave tap: heart icon animates scale(1.3) → scale(0) then card slides up and collapses (height 0, opacity 0, marginBottom 0 over 0.3s)
Undo toast: slides up from bottom — "Removed from saved. Undo?" — purple ghost button

Empty state:

If all removed: center the screen with 💜 emoji + "No saved PGs yet" + "Browse PGs" purple button


📱 SCREEN 11 — PGDetail.tsx
Image gallery:

Full-width image at top, 260px tall
Dot indicators: active = white, 18px wide pill; inactive = white 50%, 6px circle
Dot transition: width animates smoothly

Sticky header on scroll:

When user scrolls past image, top bar appears: slides down from top (translateY(-100%) → 0, 0.2s)
Shows PG name + price in header

"Schedule Visit" CTA (bottom sticky bar):

Fixed at bottom, white bg with top border
Purple filled button: "Schedule a Visit →"
On press: scale(0.97), shadow compresses, then navigate

Save button (top-right overlay on image):

White circle, 36px, shadow
Unsaved: outline heart, slate color
Saved: filled rose-500 heart, scale(1.25) bounce animation on toggle


📱 SCREEN 12 — Filters.tsx
Filter categories:

Section headings: 13px, uppercase, letter-spacing 0.06em, muted
Pill selectors (room type, amenities): same active/inactive pattern as filter pills on Home
Active: PURPLE bg, white text, shadow — transition 0.15s
Multi-select pills: can have multiple active at once

Price range slider:

Track: surface background
Fill: #8A2BE2 from 0 to current value
Thumb: white circle, 22px, 0 2px 8px rgba(138,43,226,0.35) shadow, PURPLE border 2px
While dragging: thumb scale(1.15), shadow increases

Apply button:

Purple filled, full width, fixed at bottom of screen
Shows count of active filters: "Apply 3 Filters" — number updates live as filters are changed

Clear All:

Ghost purple button, top-right of header
On tap: all selections clear with smooth 0.15s transitions on each pill


📱 SCREEN 13 — VibeCalibration.tsx
Progress bar:

Track: surface bg, 6px height, 3px radius
Fill: PURPLE, animates width when step advances — transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1)

Vibe option cards:

Unselected: card bg, light border
Selected: PURPLE_GHOST bg, PURPLE border 2px, purple label
On select: brief scale(0.97) → scale(1.02) → scale(1) — feels like a satisfying click

Next/Continue button:

Disabled until option selected: surface bg, muted text
Enabled: PURPLE bg, shadow — animates in over 0.2s


📱 SCREEN 14 — VisitScheduling.tsx
Date picker:

Calendar grid with dates
Today: purple ghost bg, purple text
Selected date: PURPLE bg, white text, shadow
Past dates: 40% opacity, not tappable

Time slot pills:

Unselected: surface bg, muted text, light border
Selected: PURPLE bg, white text, 0 3px 10px rgba(138,43,226,0.25) shadow
Unavailable: surface bg, strikethrough text, 40% opacity

"Confirm Visit" button:

Disabled until date + time selected
When both selected: animates to purple with shadow over 0.2s
On press: scale(0.97), then navigate to confirmation

Confirmation screen:

Purple checkmark circle with draw animation
Visit details card: surface bg, purple left border
"Add to Calendar" ghost button + "Done" purple button


📱 SCREEN 15 — RoommateDiscovery.tsx
Profile cards:

24px radius, white bg, purple shadow 0 4px 20px rgba(138,43,226,0.10)
Photo at top (rounded), name + details below
Compatibility percentage: shown as circular progress ring in PURPLE
Tags (vibe types): PURPLE_GHOST bg, PURPLE text pills

"Connect" button:

PURPLE filled, full width
On press: scale(0.97), brief "Connecting..." text, then success state

Skip / Next interaction:

Swipe right gesture hints → purple arrow
Card swipes away with spring physics feeling


🔲 BOTTOM NAVIGATION — MainLayout.tsx
4 tabs only: Home · My PG · Rent · More
tsx// Tab item
{
  active tab:   color: #8A2BE2, fontWeight: 700
  inactive tab: color: t.muted, fontWeight: 400
  
  // Active indicator: small purple dot below icon (not underline)
  // dot: 4px circle, #8A2BE2 bg, fade in on active

  // Tab switch animation:
  icon: scale(1) → scale(1.15) → scale(1), 0.2s
  label: color transition 0.15s
  dot: opacity 0 → 1, 0.15s
}

// Nav bar itself:
background: t.navBg
borderTop: 1px solid t.navBorder
height: 62px
paddingBottom: env(safe-area-inset-bottom, 8px)
boxShadow: 0 -4px 20px rgba(138,43,226,0.06)

🎯 FINAL CHECKLIST — EVERY TENANT SCREEN MUST HAVE

 const t = darkMode ? DARK : LIGHT — theme applied to every style prop
 Dark mode toggle: top-right of every screen's top bar
 Moon icon (light mode) → Sun icon (dark mode), PURPLE_GHOST button
 Page entry animation: fadeSlideUp on main content, stagger on list items
 All buttons: press scale(0.97), transition 0.12s
 All cards: hover translateY(-2px), transition 0.15s
 All inputs: PURPLE border + glow shadow on focus
 All filter/tab pills: color + background transition 0.15s
 Bottom sheets: slideUp animation 0.28s cubic-bezier
 Empty states: icon + helpful message + one CTA
 DM Sans font throughout, -webkit-font-smoothing: antialiased
 NO indigo-, NO teal- anywhere in tenant files