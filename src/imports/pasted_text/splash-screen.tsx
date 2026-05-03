Make the following changes across these files. 
Read each change carefully and apply exactly as specified.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND KIT — apply consistently across ALL screens listed below
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Primary Purple:    #7C3AED
Purple Dark:       #5B21B6  
Purple Light:      #EDE9FE
Purple Gradient:   linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)
Accent Yellow:     #F5A623
Pink/Energy:       #F0436A
Emerald:           #10B981
Black:             #0F172A
White:             #FFFFFF
Light BG:          #F8F7FF
Card BG:           #FFFFFF
Muted Text:        #64748B
Border:            #E2E8F0
Font:              Inter throughout
Border radius:     16px cards, 100px pill buttons
Shadow:            0px 4px 24px rgba(124,58,237,0.12)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 1 — CREATE src/app/pages/SplashScreen.tsx (NEW FILE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a brand new animated splash screen component.
This is the very first screen users see when opening the app.

ANIMATION SEQUENCE (use CSS keyframes + useEffect + setTimeout):

PHASE 1 (0–400ms): 
  Background fades in from white to #7C3AED purple
  Full screen, centered

PHASE 2 (400–900ms): 
  Logo SVG scales in from 0.3 to 1.0
  Use CSS animation: scale 0.3→1, opacity 0→1
  Easing: cubic-bezier(0.34, 1.56, 0.64, 1) — spring bounce feel

PHASE 3 (900–1300ms): 
  App name "My PG Match" slides up from 20px below, fades in
  Font: Inter Bold 28px, white

PHASE 4 (1300–1700ms):
  Tagline "Find your PG. Find your people." fades in
  Font: Inter Regular 14px, rgba(255,255,255,0.75)

PHASE 5 (1700–2200ms): 
  Three floating dots appear below tagline
  Dot 1: #F5A623 amber, 8px circle
  Dot 2: #F0436A pink, 8px circle  
  Dot 3: #10B981 emerald, 8px circle
  They pulse (scale 1→1.3→1) in sequence, 300ms apart

PHASE 6 (2200ms):
  Entire screen fades out (opacity 1→0, 400ms)
  Then navigate to /onboarding OR /auth based on 
  whether the user has seen onboarding before
  (use localStorage key "mypgmatch_onboarded" to check)

LOGO SVG (draw inline — do not use an image file):
  The logo is a house shape with M and Y letters embedded.
  Draw using SVG paths:

  Canvas: 80x80px viewBox
  Background circle: none (transparent — purple bg is the bg)

  AMBER ROOF (top element):
    <polyline points="4,42 40,8 76,42"
      stroke="#F5A623" strokeWidth="5"
      strokeLinejoin="miter" strokeLinecap="round"
      fill="none"/>

  LEFT WALL (white rectangle):
    <rect x="8" y="40" width="18" height="30" rx="3" fill="white"/>

  RIGHT WALL (white rectangle):
    <rect x="54" y="40" width="18" height="30" rx="3" fill="white"/>

  M CROSSBAR (white — connects both walls):
    <rect x="8" y="40" width="64" height="16" rx="0" fill="white"/>

  M VALLEY CUTOUT (purple triangle — creates M notch):
    <polygon points="20,40 60,40 40,56" fill="#7C3AED"/>

  Y STEM (pink — vertical center bar):
    <rect x="37" y="54" width="6" height="16" rx="3" fill="#F0436A"/>

  Y LEFT ARM (pink diagonal):
    <line x1="40" y1="54" x2="20" y2="40"
      stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>

  Y RIGHT ARM (pink diagonal):
    <line x1="40" y1="54" x2="60" y2="40"
      stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>

LAYOUT:
  Full screen, flex column, items-center, justify-center
  Background: starts white, transitions to #7C3AED
  Gap between logo and name: 20px
  Gap between name and tagline: 8px
  Gap between tagline and dots: 24px

After 2600ms total → navigate('/onboarding') for new users
                   → navigate('/auth') for returning users

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 2 — UPDATE src/app/routes.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add route: { path: "/", element: <SplashScreen /> }
Make "/" the default entry route — it should be the first route.
Import SplashScreen from ./pages/SplashScreen

If there is currently a "/" or index route pointing elsewhere, 
replace it with SplashScreen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 3 — REWRITE src/app/pages/Onboarding.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Complete rewrite with consistent purple brand theme.
This is the 3-slide swipeable intro shown to NEW users only.

GLOBAL STYLE for Onboarding:
  Background: #7C3AED (full screen purple — consistent with splash)
  All text: white
  Progress dots: white (active) / rgba(255,255,255,0.35) (inactive)
  Skip button: top right, "Skip" text, rgba(255,255,255,0.7), 14px

SLIDE 1 — "Find Your PG":
  Illustration area (top 50% of screen):
    SVG illustration: a city skyline with 3 building outlines (white strokes)
    3 price pins floating above buildings: "₹6,500" "₹8,500" "₹9,000"
    Each pin: white rounded rect, purple text
  Bottom card (white, rounded top 32px, padding 28px):
    Dot indicators row (3 dots, first active/white)
    Headline: "Browse PGs Near You" — #0F172A Bold 26px
    Body: "Verified PGs. Real photos. Zero brokerage." — #64748B 15px
    "Next →" button: full width, #7C3AED bg, white text, pill, 56px height

SLIDE 2 — "Meet Your Roommates":
  Illustration: 3 avatar circles with emoji tags floating around them
    Avatar 1: yellow circle "AK", tags: 🎮 Gaming
    Avatar 2: purple circle "RN", tags: 🎵 Music  
    Avatar 3: pink circle "MR", tags: 📚 Study
  Bottom card: same structure as slide 1
    Headline: "See Who's Already There"
    Body: "Know your future roommates before you move in."
    Second dot active

SLIDE 3 — "Match Your Vibe":
  Illustration: two profile cards overlapping with a ✨ spark between
    Left card: white rounded card with "Arjun" + 🎮 🎵 tags
    Right card: white rounded card with "Rahul" + 🎮 💻 tags
    Center: pink heart icon between them
  Bottom card:
    Headline: "Match With Your Vibe"
    Body: "Filter by lifestyle, habits and interests — not just location."
    Third dot active
    Button: "Let's Go! 🚀" — #7C3AED filled
    Below button: "Already have an account?" → navigate to /auth
      Text: #64748B 13px centered, underlined link in #7C3AED

NAVIGATION:
  Swiping left OR tapping Next advances slides
  On slide 3 button tap: 
    localStorage.setItem("mypgmatch_onboarded", "true")
    navigate('/role-selection')
  Skip button: same as above (sets storage, goes to role-selection)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 4 — REWRITE src/app/pages/RoleSelection.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full rewrite. Purple brand theme throughout.

Background: #F8F7FF (light, transitions from purple onboarding 
  to a lighter feel — intentional design step-down)

TOP SECTION (purple gradient header, rounded bottom 32px):
  Background: linear-gradient(135deg, #7C3AED, #5B21B6)
  Padding: 48px top, 28px sides, 40px bottom
  Logo SVG (same as splash, 48px version) — white tones
  "My PG Match" — white bold 20px below logo
  "Who are you?" — white 16px below name, opacity 0.8

TWO ROLE CARDS (stacked, below header):
  Margin: -20px top (overlaps the purple header slightly — elegant)
  Each card: white, 20px radius, shadow, full width, padding 24px

TENANT CARD:
  Left icon: 🏠 in a purple circle (48px, #EDE9FE bg, purple icon)
  Right: 
    "I'm Looking for a PG" — bold 17px #0F172A
    "Find rooms, match with roommates" — 13px #64748B
  Arrow right: ChevronRight, #7C3AED
  Bottom: "Most Popular" amber pill badge — #FFF7ED bg #D97706 text
  On tap: navigate('/auth?role=tenant')

OWNER CARD:
  Left icon: 🏢 in an emerald circle (48px, #ECFDF5 bg, emerald icon)
  Right:
    "I Own a PG" — bold 17px #0F172A
    "Manage tenants, collect rent" — 13px #64748B
  Arrow right: ChevronRight, #10B981
  On tap: navigate('/owner/auth')

Below cards:
  "By continuing you agree to our " 
  Terms & Privacy Policy — #7C3AED underline link
  Font: 12px #94A3B8 centered

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 5 — REWRITE src/app/pages/Auth.tsx (TENANT AUTH)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Full rewrite. ONLY phone number + OTP. No Google. No password.

LAYOUT:
  Top 35%: purple gradient bg (same as role selection header)
    Logo SVG (40px) — white
    "Welcome Back 👋" — white bold 22px
    "Enter your number to continue" — white 14px opacity 0.75
  
  Bottom 65%: white card, rounded top-left/right 28px
    Overlaps purple section by ~20px

PHONE INPUT STEP:
  Label: "MOBILE NUMBER" — 11px semibold #94A3B8 uppercase tracking
  Input row: 
    Left box: "+91" — #0F172A semibold, #F8FAFC bg, right border 1px #E2E8F0
    Right: number input, 16px, no border
    Full row: 2px border #7C3AED when focused, #E2E8F0 when idle
    Border radius: 14px
    Height: 56px
  
  "Send OTP →" button:
    Full width, 56px height, pill
    Active (10 digits): #7C3AED bg white text
    Inactive: #E2E8F0 bg #94A3B8 text
    Transition: 0.2s ease

  Below button:
    "PG Owner? " + "Owner Login →" — #7C3AED link
    → navigate('/owner/auth')

OTP STEP (replaces phone step with fade transition):
  "We sent a code to +91 XXXXX XXXXX" muted 14px
  6 individual OTP boxes — 48px wide, 56px tall each
    Active/filled: #7C3AED border, #EDE9FE bg
    Empty: #E2E8F0 border, #F8FAFC bg
    Font: 20px bold #0F172A
  Resend timer: "Resend in 28s" — #F59E0B when counting, 
    "Resend OTP" — #7C3AED link when expired
  "Verify & Continue →" button — same style as Send OTP
  Back link: "← Change number" — #64748B 13px centered

SUCCESS STATE (800ms, then route):
  Checkmark circle (64px): #7C3AED border, white tick inside
  Scale in from 0 → 1 with spring (cubic-bezier(0.34,1.56,0.64,1))
  "Verified! ✓" — bold 22px #0F172A
  Then navigate to /tenant/profile-setup (NEW — see file 6)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 6 — CREATE src/app/pages/TenantProfileSetup.tsx (NEW FILE)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This replaces VibeCalibration entirely for new users.
It is a 2-step profile setup (NOT the 4-5 question quiz).

PURPOSE: Collect only what we don't already know.
We already know their preferences from the onboarding.
Just collect: name, photo, budget, city, room type.

HEADER (purple gradient, same style as Auth):
  Step indicator: "Step X of 2" — white 12px
  Progress bar: white fill, rgba(255,255,255,0.2) track, full width

STEP 1 — "Tell us about you":
  White card body below header

  Profile photo circle (88px):
    Dashed border #7C3AED, purple camera icon center
    "Add Photo" label below — #7C3AED 13px
    "Optional — helps roommates recognise you" — #94A3B8 11px
    Tap: shows file input (accept image/*)
    After selection: show preview in circle

  Full Name input:
    Label: "FULL NAME" — small caps muted
    Input: 56px height, 16px text, #0F172A
    Placeholder: "e.g. Arjun Sharma"

  Age input:
    Label: "AGE"
    Number input, min 18, max 40

  Gender toggle (3 options as pill chips):
    Male | Female | Prefer not to say
    Selected: #7C3AED bg white text
    Unselected: white bg #E2E8F0 border #64748B text

  "Continue →" button — purple, full width, 56px, pill
  Disabled until name is filled

STEP 2 — "What are you looking for?":
  City dropdown:
    Label: "LOOKING IN"
    Options: Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chennai, Other
    Styled as a custom select with ChevronDown icon
    Border: 1px #E2E8F0, height 56px, 14px text

  Budget slider:
    Label: "MONTHLY BUDGET" + current value "₹8,000 – ₹15,000" in amber pill right
    Dual handle — min ₹3,000, max ₹25,000, step 500
    Track filled: #7C3AED
    Handles: white circle, #7C3AED border

  Room type (pill chip group):
    Label: "ROOM TYPE"
    Options: Single | 2 Sharing | 3 Sharing | Any
    Multi-select allowed
    Selected: #7C3AED bg white text
    Unselected: white, border #E2E8F0

  Move-in date:
    Label: "MOVE-IN DATE"
    Date input styled to match other inputs
    OR "Flexible" toggle (teal when ON) — if toggled ON, hides date input

  Interest tags (THE KEY STEP — replaces VibeCalibration):
    Label: "YOUR VIBE" — bold 15px #0F172A
    Sublabel: "Select tags that describe you (up to 8)" — #64748B 13px
    
    ROW 1 — Lifestyle:
    Early Bird 🌅 | Night Owl 🦉 | Homebody 🏠 | Social 🦋 | 
    Gym Freak 💪 | Foodie 🍕 | Traveller ✈️ | Minimalist

    ROW 2 — Interests:
    Music 🎵 | Gaming 🎮 | Reading 📚 | Movies 🎬 | 
    Art 🎨 | Tech 💻 | Sports ⚽ | Cooking 🍳

    ROW 3 — Work/Study:
    Student 🎓 | Working Pro 💼 | Freelancer 🖥️ | Entrepreneur 🚀

    Chip style:
    Selected: #7C3AED bg, white text, subtle glow border
    Unselected: white bg, 1px #E2E8F0 border, #64748B text
    Selection counter: "6/8 selected" amber pill — top right of section

  "Find My PG 🚀" button — purple, full width, 56px, pill
  On tap: navigate('/tenant') (home screen)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 7 — REWRITE src/app/pages/owner/OwnerOnboarding.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remove Password field. Remove Confirm Password field.
Owner login is phone number + OTP only — same as tenant.

The owner onboarding "Create Account" form (image 5) should have:
  KEEP: Full Name input
  KEEP: WhatsApp Number input (+91 prefix)
  KEEP: Email Address (optional) input
  REMOVE: Password input — DELETE COMPLETELY
  REMOVE: Confirm Password input — DELETE COMPLETELY
  KEEP: Continue → button

Step indicator stepper at top:
  1 Account → 2 Profile → 3 Your PG
  Active step: #7C3AED filled circle, white number
  Inactive: #E2E8F0 filled, #94A3B8 number
  Connector line: #E2E8F0

Header:
  Logo (small, 32px) + "PG OS" text — purple
  Clean white background

All input fields:
  Height: 56px
  Border: 1px #E2E8F0 → #7C3AED when focused
  Border radius: 12px
  Label: 13px semibold #374151 above input
  Font: 16px #0F172A

Continue button:
  Full width, 56px, pill
  Background: #7C3AED
  Text: white bold 16px "Continue →"
  Fixed to bottom or below last field

Terms line below button:
  "By continuing you agree to our Terms & Privacy Policy"
  12px #94A3B8 centered
  "Terms & Privacy Policy" — #7C3AED underline

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 8 — UPDATE src/app/pages/VibeCalibration.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The VibeCalibration screen with 4-5 questions must be 
COMPLETELY BYPASSED in the new user flow.

Change the component to immediately redirect:
  useEffect(() => {
    navigate('/tenant/profile-setup', { replace: true });
  }, []);
  
  Return a loading spinner (purple) while redirecting.

This ensures any old links or routes pointing to 
/tenant/vibe or /vibe-calibration automatically go 
to the new TenantProfileSetup instead.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 9 — UPDATE src/app/routes.ts (additions)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Add these routes:
{ path: "/tenant/profile-setup", element: <TenantProfileSetup /> }

Ensure the flow order is:
/ → SplashScreen (auto-routes after 2.6s)
/onboarding → Onboarding (new users only)
/role-selection → RoleSelection
/auth → Auth (tenant)
/owner/auth → Owner auth (phone+OTP, no password)
/tenant/profile-setup → TenantProfileSetup (NEW)
/tenant → MainLayout → Home (the existing home)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHAT NOT TO CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Do NOT change:
- Home.tsx
- ConnectHub.tsx
- StudentMarketplace.tsx
- PGDetail.tsx
- MainLayout.tsx bottom nav
- Any owner dashboard screens
- Any tenant screens beyond what's listed above