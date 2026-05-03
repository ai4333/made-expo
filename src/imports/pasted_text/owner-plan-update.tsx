Make the following changes to the owner section of the app.
Apply changes to these specific files only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BRAND KIT (use throughout both new screens)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary purple:  #7C3AED
Purple dark:     #5B21B6
Purple light:    #EDE9FE
Emerald:         #10B981
Amber:           #F59E0B
Pink:            #F0436A
Background:      #F8F7FF
Card:            white
Border:          #E2E8F0
Text primary:    #0F172A
Text muted:      #64748B
Font:            Inter

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 1 — UPDATE src/app/pages/owner/OwnerOnboarding.tsx
SECTION: Step 2 "Choose Your Plan"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the plan selection section entirely with the new plan
data and layout described below.

REMOVE: City/Location dropdown
REMOVE: "How many PGs do you operate?" question
REMOVE: "Years of experience" question
These questions add friction and are not needed.

KEEP: Step indicator at top (1 Account → 2 Choose Plan → 3 Your PG)
KEEP: "Continue →" button at bottom

REPLACE plan selection with:

STEP 2 HEADING:
  Title: "Pick the right size for your PG" — bold 22px #0F172A
  Subtitle: "You can upgrade anytime as your PG grows" — 14px #64748B

BILLING TOGGLE (Monthly / Annual):
  Pill toggle — 2 options side by side:
  Left: "Monthly"
  Right: "Annual  — Save ~17% 🎉" (green badge when selected)
  Active: #7C3AED bg white text
  Inactive: white bg #64748B text #E2E8F0 border
  Contained in a gray bg rounded pill container

PLAN CARDS (stacked vertically — one plan per card):

4 plan cards + 1 enterprise strip.

Each plan card structure:
  White card, 16px radius, 1px #E2E8F0 border
  Left: plan icon (emoji) + plan name bold 17px + room range muted 13px
  Right: price bold 20px + "/mo" muted 13px
  Below the main row: 3 feature tick bullets (green ✓ icons, 12px text)
  Bottom: if "Most Popular" → amber pill badge "Most Popular ⭐"

PLAN DATA:

PLAN 1 — "Small PG"
  Icon: 🏠
  Rooms: Up to 15 rooms
  Monthly: ₹799/mo  |  Annual: ₹667/mo (billed ₹7,999/yr)
  Save badge (annual only): "Save ₹1,589/yr"
  Features:
    ✓ WhatsApp rent reminders
    ✓ Tenant & expense tracking
    ✓ Basic dashboard
  Badge: none
  Border: 1px #E2E8F0

PLAN 2 — "Growing PG"  ← MOST POPULAR
  Icon: 🏘️
  Rooms: 16 – 30 rooms
  Monthly: ₹1,299/mo  |  Annual: ₹1,083/mo (billed ₹12,999/yr)
  Save badge (annual only): "Save ₹2,589/yr"
  Features:
    ✓ Everything in Small PG
    ✓ Multi-PG dashboard
    ✓ WhatsApp broadcast
  Badge: "Most Popular ⭐" — amber pill, positioned top-right corner
  Border: 2px #7C3AED (highlighted)
  Background: very light purple #FAFAFF

PLAN 3 — "Mid-Scale"
  Icon: 🏢
  Rooms: 31 – 60 rooms
  Monthly: ₹1,999/mo  |  Annual: ₹1,667/mo (billed ₹19,999/yr)
  Save badge (annual only): "Save ₹3,989/yr"
  Features:
    ✓ Everything in Growing PG
    ✓ Vendor marketplace access
    ✓ Priority WhatsApp support
  Badge: none
  Border: 1px #E2E8F0

PLAN 4 — "Large PG"
  Icon: 🏗️
  Rooms: 61 – 100 rooms
  Monthly: ₹2,999/mo  |  Annual: ₹2,500/mo (billed ₹29,999/yr)
  Save badge (annual only): "Save ₹5,989/yr"
  Features:
    ✓ Everything in Mid-Scale
    ✓ Custom branding
    ✓ Dedicated account manager
  Badge: none
  Border: 1px #E2E8F0

ENTERPRISE STRIP (full width, different style):
  Background: #0F172A dark
  Left: "100+ rooms?" white bold 15px
        "Custom pricing built for large operators" white muted 12px
  Right: "Talk to Us →" white outlined pill button (border white)
  Border radius: 16px
  No price shown

SELECTED STATE for plan cards:
  When a plan is tapped/selected:
  - Border becomes 2px #7C3AED
  - Background: #FAFAFF very light purple
  - A purple checkmark circle (20px) appears top-right

DEFAULT selected plan: "Growing PG" (Most Popular)

CONTINUE BUTTON:
  Full width, 56px, pill, #7C3AED bg white text
  Label updates dynamically: "Continue with [Plan Name] →"
  Example: "Continue with Growing PG →"

FOUNDER PRICING NOTE (below cards):
  Small amber info card:
  Clock icon + "Early adopter offer — prices locked for first 60 days only"
  Background: #FFF7ED, border: 1px #FDE68A, text: #92400E, 12px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILE 2 — UPDATE src/app/pages/owner/OwnerSettings.tsx
ADD: Subscription Management Section
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In OwnerSettings.tsx, after the profile section and before
the logout button, add a "SUBSCRIPTION" section.

CURRENT PLAN CARD (top of subscription section):

White card, 16px radius, 1px #EDE9FE border, subtle purple shadow.
Layout:
  Top row: Plan icon emoji + "Growing PG" bold 17px + 
    "Active ✓" green pill right
  Row 2: "16–30 rooms · ₹1,299/mo · Monthly billing" 
    — #64748B 13px
  Row 3: Progress bar showing usage:
    Label: "Rooms used: 14 of 30"
    Bar: #7C3AED fill, #E2E8F0 track, 6px height, rounded
  Row 4: "Renews on 15 April 2026" — #94A3B8 12px
  
  Two action buttons below:
    Button 1: "Upgrade Plan" — #7C3AED bg white text pill, 
      full width, 44px
    Button 2: "Switch to Annual & Save ₹2,589" 
      — #ECFDF5 bg #059669 text pill, full width, 44px
      Only show if user is on monthly billing.

PLAN COMPARISON (expandable, below the current plan card):

A "Compare all plans →" link in #7C3AED 13px.
When tapped, expands an inline comparison showing all 4 plans
as compact horizontal rows:

Each row:
  Plan name + room range | Monthly price | Annual price | 
  Select button (outlined if not current, filled if current)

Table header row: "Plan" | "Monthly" | "Annual" | ""
Separator lines between rows.
Current plan row: light purple bg #EDE9FE.
Other plan rows: white bg.

PLAN HISTORY (below comparison):
Section label: "BILLING HISTORY" small caps muted
Show last 3 payments as simple rows:
  Each: calendar icon | "Apr 2026 · Growing PG · ₹1,299" | 
    "Paid ✓" green chip
  "View all invoices →" link at bottom

CANCELLATION LINK:
At very bottom of subscription section (below billing history):
"Cancel subscription" — small, #EF4444 red text, centered.
Tapping shows a confirmation bottom sheet:
  "Are you sure?" title
  "Your subscription will remain active until [date]" muted
  "Yes, Cancel" red outlined button
  "Keep Subscription" #7C3AED filled button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DO NOT TOUCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Do NOT change:
- OwnerDashboard.tsx
- OwnerLayout.tsx
- Any tenant screens
- Auth.tsx
- RoleSelection.tsx
- routes.ts