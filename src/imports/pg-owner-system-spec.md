Complete Prompt: PG Operating System — Owner Side

🎨 Color Palette Decision
Primary: #8A2BE2 — BlueViolet (Authority, trust, premium feel)
Secondary I choose: #10B981 — Emerald Green (Money, payments, growth, success states)
Full palette to use throughout:
RoleColorHexPrimary BrandBlueViolet#8A2BE2Secondary / SuccessEmerald Green#10B981BackgroundDeep Charcoal#0F0F13Card Surface#1A1A24Muted Text#6B7280Body Text#E5E7EBDanger / Overdue#EF4444Warning / Pending#F59E0BBorder / Divider#2D2D3D
Purple for ownership, authority, actions. Green exclusively for paid/success/money states. This creates instant visual clarity — green = money received, purple = actions to take.

🧠 Master Prompt for Developer / AI Builder

PRODUCT CONTEXT
Build a WhatsApp-first PG Operating System for Indian Paying Guest accommodation owners. The app is web-based, fully mobile-responsive, with no native app in V1. The product must feel premium but simple — built for local, family-run PG businesses, not corporate property managers.
The system uses:

React / Next.js frontend
Node.js or Django backend
PostgreSQL database
WhatsApp Business Cloud API for tenant communication
Primary color: #8A2BE2 | Secondary color: #10B981
Dark theme throughout using #0F0F13 base


SCREEN 0 — LANDING / ROLE SELECTION SCREEN
This is the very first screen a new user sees. It must NOT look like a generic login page.
Layout:

Full screen dark background #0F0F13
Center: PG OS logo + tagline: "Run your PG like a pro"
Below logo: Two large card-style role selector buttons side by side (or stacked on mobile)

Card 1 — PG Owner

Icon: Building / Key icon in #8A2BE2
Label: "I'm a PG Owner"
Subtext: "Manage your PGs, tenants & rent"
Border: #8A2BE2 glow on hover/tap
On select: Navigates to Owner Onboarding Flow

Card 2 — PG Tenant

Icon: Person / Home icon in #10B981
Label: "I'm a Tenant"
Subtext: "Check your rent & stay details"
Border: #10B981 glow on hover/tap
On select: Navigates to Tenant Flow (separate, out of scope for this prompt)

Bottom text: "Already have an account? Log in" — minimal link, no button.
Design rule: These two cards must feel completely separate and distinct. Owner card uses purple energy, tenant card uses green calm. This sets the tone that both user types have entirely different worlds inside the app.

OWNER FLOW — COMPLETE SCREEN MAP
Role Selection
    └── Owner Registration (Step 1 of 3)
    └── Owner Profile Setup (Step 2 of 3)
    └── First PG Creation (Step 3 of 3 — forced onboarding)
         └── Owner Dashboard (Home)
              ├── PG List
              │    └── Individual PG View
              │         ├── Room & Bed Manager
              │         ├── Tenant List
              │         │    └── Tenant Detail Page
              │         │         ├── Rent History
              │         │         ├── Advance & Notice Status
              │         │         └── Reward Status
              │         └── PG-level Expense View
              ├── Rent Overview (All PGs)
              ├── Expense Tracker
              ├── Notifications / Alerts
              └── Settings & Subscription

SCREEN 1 — OWNER REGISTRATION (Step 1 of 3)
Minimal, distraction-free form. Progress bar at top showing Step 1 of 3 in #8A2BE2.
Fields:

Full Name
Mobile Number (WhatsApp-linked) — with +91 prefix auto-filled for India
Email Address (optional but recommended)
Password
Confirm Password

UI rules:

Input fields: Dark surface #1A1A24, border #2D2D3D, focus border #8A2BE2
CTA button: Full-width, #8A2BE2 background, white text — "Continue →"
Below button: "By continuing you agree to our Terms & Privacy Policy" in muted text
No social login in V1


SCREEN 2 — OWNER PROFILE SETUP (Step 2 of 3)
Progress bar advances. Header: "Tell us about yourself"
Fields:

Profile Photo (optional, avatar placeholder if skipped)
City / Location (dropdown of Indian cities)
How many PGs do you currently operate? (1 / 2–3 / 4–5 / 6–10) — pill selector not dropdown
Years of experience running PGs (optional)

Subscription Plan Selection — shown here inline, not as a separate screen:
Display 4 plan cards horizontally (scroll on mobile):
PlanPGsPriceStarter1 PG₹299/moBasic3 PGs₹399/moGrowth5 PGs₹499/moPro10 PGs₹599/mo

Selected plan card: #8A2BE2 border + subtle purple background tint
Most popular badge on "Basic" plan in #10B981
Payment is NOT collected in this screen — plan just gets assigned, payment prompt comes after first PG is created

CTA: "Continue →"

SCREEN 3 — FIRST PG CREATION (Step 3 of 3 — Forced Onboarding)
Do not let the owner skip this. The app has no value until at least one PG is created. Header: "Set up your first PG — takes 2 minutes"
Section A: Basic Info

PG Name (e.g., "Sharma Boys PG")
Full Address
City (auto-filled from profile)
PG Type: Boys / Girls / Co-ed (pill selector)
PG Photo Upload (optional, max 3 photos)

Section B: Room Configuration

Total Number of Rooms (number input)
Default Beds per Room (number input)
System auto-calculates: "Your PG has X total beds" — shown live below inputs in #10B981 text

Section C: Financial Defaults

Default Monthly Rent per Bed (₹)
Advance Amount (₹)
Rent Due Date: 1st / 5th / 7th / 10th (pill selector)
Notice Period: 15 days / 30 days / 45 days (pill selector)

Section D: WhatsApp Setup

Owner's WhatsApp Number for Notifications (pre-filled from registration)
Toggle: Enable automated tenant reminders (ON by default)
Small explainer card: "We'll send rent reminders to your tenants 3 days before, on due date, and after due date via WhatsApp. You stay stress-free."

CTA: "Launch My PG Dashboard →" — this button should feel like an achievement moment, large, full-width, #8A2BE2 with a subtle shimmer animation.
On completion: Confetti or subtle success animation, then redirect to Dashboard.

SCREEN 4 — OWNER DASHBOARD (Home)
This is the command center. Everything important visible above the fold on desktop. Mobile: scrollable card stack.
Top Bar:

Left: PG OS logo
Center: "Good morning, [Owner Name]" — greeting changes by time of day
Right: Notification bell (with red dot if alerts exist) + Avatar

Summary Strip (horizontal scroll on mobile, grid on desktop):
5 metric cards using icon + number + label format:

Total PGs — #8A2BE2 icon
Occupied Beds / Total Beds — e.g., "34/40"
Expected Rent This Month — ₹ amount
Collected — #10B981 text (green = money in)
Pending — #F59E0B text (amber = action needed)

Alerts Section — "Needs Your Attention"
Compact alert cards in priority order:

Overdue rent tenants (red left border)
Upcoming move-outs in next 7 days (amber left border)
Pending advance refunds (purple left border)
Vacant beds (neutral border)

Each alert card has a quick action button: "View" or "Resolve"
PG Cards Grid
One card per PG. Each card shows:

PG Name + City
Occupied/Total beds with a mini progress bar (#10B981 fill)
This month: Collected vs Pending
Quick actions: "View PG" | "Add Tenant" | "Add Expense"

Bottom Nav (Mobile only):
5 tabs: Home | PGs | Rent | Expenses | Settings
Active tab: #8A2BE2 icon + label. Inactive: #6B7280

SCREEN 5 — PG LIST VIEW
Accessible from Dashboard or bottom nav "PGs" tab.
Header: "My PGs" + "Add New PG" button (top right, outlined #8A2BE2 style)
List of PG cards (same as dashboard but more detailed):

PG Name, Address, Type badge (Boys/Girls/Co-ed)
Bed occupancy bar
Monthly collection status
3-dot menu: Edit PG | View Tenants | Add Room | Archive PG

Floating action button (mobile): + in #8A2BE2 to add new PG

SCREEN 6 — INDIVIDUAL PG VIEW
Accessed by tapping any PG card. This is the PG-level command center.
Header: PG Name + Edit icon + Back arrow
4 Tabs inside this screen:
Tab 1: Overview

Bed map: Visual grid of all rooms and beds

Green bed = Occupied (#10B981)
Purple bed = Vacant (#8A2BE2 outline)
Red bed = Overdue tenant (#EF4444)


Tapping a bed opens: Tenant quick view OR "Add Tenant" if vacant

Tab 2: Tenants

Searchable list of all tenants in this PG
Each row: Avatar + Name + Room/Bed + Rent status badge + Move-out warning if applicable
Rent status badges: Paid (green) | Pending (amber) | Overdue (red) | Notice Given (purple)
Tap any tenant: Opens Tenant Detail Page

Tab 3: Rooms

Room-by-room breakdown
Each room card shows beds and occupancy
Add/Edit rooms from here
Assign/unassign tenants to beds

Tab 4: Expenses

Monthly expense summary for this PG
Category-wise bars: Groceries, Gas, Repairs, Salary, Maintenance, Other
Add Expense FAB button


SCREEN 7 — ADD TENANT SCREEN
Triggered from vacant bed tap or "Add Tenant" button.
Pre-filled context: PG Name, Room, Bed Number (not editable here, shown as info chips)
Form fields:

Full Name
WhatsApp Number (+91 prefix)
Monthly Rent (pre-filled from PG default, editable)
Advance Paid (₹) + Payment Mode: Cash / UPI / Bank Transfer
Joining Date (date picker)
Rent Due Date (inherited from PG default, editable per tenant)
ID Proof Upload (optional in V1 — photo upload)
Notes (optional)

WhatsApp preview panel (collapsible):
Shows a preview of the welcome message that will be sent to the tenant on save:

"Hi [Name], welcome to [PG Name]! Your rent of ₹[amount] is due on the [date] every month. Reply STATUS anytime to check your dues. — [Owner Name]"

Toggle: Send welcome message — ON by default
CTA: "Add Tenant & Send Welcome" — #8A2BE2 full-width

SCREEN 8 — TENANT DETAIL PAGE
Comprehensive view of a single tenant.
Header:

Large avatar (initials-based if no photo) with status badge
Name + Room/Bed + Join Date
Status pill: Active / Notice Given / Vacated

Section 1: Current Month Status

Rent due: ₹X
Status: Paid / Pending / Overdue (color coded)
If pending: "Mark as Paid" button in #10B981
If paid: Payment mode + timestamp shown

Section 2: Rent History

Month-by-month table
Columns: Month | Amount | Status | Paid Date | Mode
Color-coded status column

Section 3: Advance & Notice

Advance Paid: ₹X (shown with payment date)
Notice Status: Not Given / Notice Given (date) / Vacated
Advance Eligibility: Eligible / Not Eligible / Pending
Owner actions: Mark Refunded | Mark Deducted (with reason modal)
"Register Move-Out Notice" button if not yet given

Section 4: Reward Status

If reward system enabled: Shows reward credits earned
Early payment count
Total reward credited

Section 5: Communication Log

Timeline of all WhatsApp messages sent to this tenant
Each entry: Message type + timestamp + delivery status

Danger Zone (bottom, collapsed by default):

Edit Tenant Details
Transfer to Different Bed
Mark as Vacated
All destructive actions require confirmation modal


SCREEN 9 — RENT OVERVIEW (All PGs)
Accessible from bottom nav or dashboard "View All Rent" link.
Header: "Rent — [Month Year]" with month navigation arrows
Summary cards row:

Expected Total: ₹X
Collected: ₹X (green)
Pending: ₹X (amber)
Overdue: ₹X (red)
Collection Rate: XX% (circular progress in #8A2BE2)

Filter bar: All PGs | [PG Name 1] | [PG Name 2] — horizontal scroll pills
Tenant rent list:
Grouped by PG. Each tenant row:

Name + PG + Room
Amount
Status badge
Quick action: "Mark Paid" inline button

Bulk Actions:

Select multiple tenants
Send reminder to selected (WhatsApp)
Export list (CSV)


SCREEN 10 — EXPENSE TRACKER
Header: "Expenses" + "Add Expense" button
Month selector at top
Summary:

Total spent this month: ₹X
Category donut chart (use #8A2BE2 and #10B981 and variants as segment colors)

Filter: All PGs | Per PG dropdown
Expense list:
Each entry: Category icon + Category name + PG + Date + Amount + Notes icon if note exists + Edit/Delete
Add Expense Modal/Sheet:

PG selector
Category (icon grid selector — more visual than dropdown)
Amount
Date
Notes
CTA: "Save Expense"


SCREEN 11 — NOTIFICATIONS CENTER
All system alerts in one place. Bell icon from header.
Types of notifications (with distinct icons):

🔴 Overdue rent: "[Tenant] at [PG] is 7 days overdue — ₹X"
🟡 Rent reminder sent: "Reminder sent to [X] tenants today"
🟢 Payment marked: "[Tenant] rent marked paid — ₹X"
🟣 Move-out notice: "[Tenant] submitted move-out notice"
⚪ Vacancy alert: "Bed [X] in [PG] has been vacant for 15 days"

Each notification: Timestamp + Quick action button
Mark all as read option at top.

SCREEN 12 — SETTINGS
Grouped into sections:
Profile Settings

Edit name, photo, phone, email

PG Defaults

Edit global rent due date default
Edit global notice period default
Edit global advance policy

Reward System

Toggle ON/OFF globally
Set early payment reward amount (₹)

WhatsApp Notifications

Toggle each reminder type on/off
Reminder timing preferences

Subscription

Current plan display
Upgrade plan CTA
Renewal date
Billing history

Security

Change password
2-step verification (future)

Support

Chat with support (WhatsApp link)
Report a bug
Privacy Policy / Terms

Danger Zone

Delete account (with full data warning)


🎨 Design System Refinements (Apply Throughout)
Typography: Use Inter or Poppins. Headings bold, body regular. No serif anywhere.
Buttons:

Primary action: #8A2BE2 fill, white text, 8px radius
Success/Money action: #10B981 fill, white text
Secondary: Transparent with #8A2BE2 border
Destructive: #EF4444 fill, only in confirm modals

Status Badges — standardized everywhere:

Paid: #10B981 bg at 15% opacity, #10B981 text
Pending: #F59E0B bg at 15% opacity, #F59E0B text
Overdue: #EF4444 bg at 15% opacity, #EF4444 text
Notice Given: #8A2BE2 bg at 15% opacity, #8A2BE2 text
Vacant: #6B7280 bg at 15% opacity, #6B7280 text

Cards: #1A1A24 background, 1px solid #2D2D3D border, 12px border-radius, subtle box-shadow: 0 4px 24px rgba(138,43,226,0.08)
Empty States: Every empty list must have a purple-tinted illustration + helpful CTA. No blank white screens.
Loading States: Purple skeleton shimmer animation, not spinning loaders.
Modals: Dark overlay rgba(0,0,0,0.7), card slides up from bottom on mobile, centers on desktop.

✅ V1 Refinements Added Beyond Original Document

Role selection screen added as mandatory entry point
Forced first PG onboarding after registration — no empty dashboard
Visual bed map in PG view for instant occupancy overview
WhatsApp message preview when adding tenants
Inline "Mark Paid" on rent list to reduce click depth
Notification center as dedicated screen (not just toast alerts)
Communication log per tenant for dispute resolution
Category icon grid for expense entry (faster than dropdown)
Collection rate % metric on rent overview
Vacancy duration tracking in alerts (how long bed has been empty)
#10B981 i didnt like this color ok now only go with  #8A2BE26:52 PMPivoted to monochromatic palette using single color variantPivoted to monochromatic palette using single color variantThe user wants to use only #8A2BE2 as the main color and wants me to suggest a new secondary color to replace #10B981, or they want to go monochromatic with just #8A2BE2 and its variants.
Let me re-read: "i didnt like this color ok now only go with #8A2BE2" — they want to drop #10B981 and build the entire palette around #8A2BE2 only.
Let me create a full monochromatic/single-hue palette based on #8A2BE2 with different shades, tints, and opacities to handle all the UI states.DoneUpdated Color System — #8A2BE2 Only
No second color. Everything is built from one purple using shades, tints, and opacity to create hierarchy.

Full Palette Derived from #8A2BE2
RoleColorHexUsagePrimaryBlueViolet#8A2BE2Buttons, active states, iconsPrimary Light#A855F7Hover states, highlightsPrimary Dim#6D1CB5Pressed states, deep accentsPrimary Ghostrgba(138,43,226,0.15)Badge backgrounds, card tintsPrimary Glowrgba(138,43,226,0.08)Card shadows, subtle bg tintsBackground#0F0F13App baseCard Surface#1A1A24All cards, modalsElevated Surface#22223AInputs, secondary cardsBorder#2D2D3DDividers, input bordersBody Text#E5E7EBPrimary readable textMuted Text#6B7280Labels, placeholdersDanger#EF4444Overdue, errors onlyWarning#F59E0BPending, warnings onlyWhite#FFFFFFText on purple buttons

How Status Colors Work Now
Since green is removed, status badges use purple + neutrals + only red/amber for negative states:
StatusBackgroundTextPaidrgba(138,43,226,0.15)#A855F7Pendingrgba(245,158,11,0.15)#F59E0BOverduergba(239,68,68,0.15)#EF4444Notice Givenrgba(138,43,226,0.25)#8A2BE2Vacantrgba(107,114,128,0.15)#6B7280
Red and amber are kept only because they are functional danger/warning signals — not brand colors. Everything positive and branded is purely purple.

Button System (Purple Only)

Primary CTA → #8A2BE2 fill, white text
Hover → #A855F7 fill
Pressed → #6D1CB5 fill
Secondary → transparent, #8A2BE2 border + text
Ghost → rgba(138,43,226,0.10) fill, #A855F7 text
Destructive → #EF4444 — only inside confirm modals


What Changes in the UI
Every place #10B981 was used before now becomes:

"Mark as Paid" button → #8A2BE2
Paid badge → purple tint as above
Occupancy bar fill → #8A2BE2
Collection metric text → #A855F7 (lighter purple for emphasis)
Success states/confirmations → #8A2BE2 with a checkmark icon
Tenant card "active" indicator → #8A2BE2 dot
Welcome animation on PG creation → purple confetti only