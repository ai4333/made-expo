# Complete PG Operating System — Full Design Prompt (Revised)

---

## 🎨 Color System — Purple & White Only

| Role | Light Mode | Dark Mode |
|---|---|---|
| Background | `#FFFFFF` | `#0F0F13` |
| Surface / Cards | `#F5F3FF` | `#1A1A24` |
| Elevated Surface | `#EDE9FE` | `#22223A` |
| Primary | `#8A2BE2` | `#8A2BE2` |
| Primary Hover | `#7A22CC` | `#A855F7` |
| Primary Ghost | `rgba(138,43,226,0.10)` | `rgba(138,43,226,0.15)` |
| Primary Border | `rgba(138,43,226,0.25)` | `rgba(138,43,226,0.30)` |
| Heading Text | `#1A0533` | `#F3F0FF` |
| Body Text | `#3D2C6B` | `#C4B5FD` |
| Muted Text | `#8B7AA8` | `#6B6B8A` |
| Divider | `#E9E3F5` | `#2D2D3D` |
| Danger | `#DC2626` | `#EF4444` |
| Warning | `#D97706` | `#F59E0B` |
| Success | `#059669` | `#10B981` |

**Light mode is the default.** Dark mode is a toggle in settings and top bar. Every component flips cleanly between both.

**Design rule:** White does the heavy lifting as background. Purple is used for actions, active states, and brand moments only. Never put purple on purple. Never put text on purple unless it's white.

---

## 🧠 Cognitive Load Philosophy (Core Design Principle)

This is a product used by local PG owners — many of whom are not tech-savvy. The interface must breathe.

**Rules enforced throughout:**
- Maximum **3 actions visible** per screen at once
- Every screen has **one primary CTA** — purple, full-width, unmissable
- **No more than 5 items** in any list before pagination or "see more"
- Forms are **one section at a time** — never show a long scrolling form
- Use **icons + labels always** — never icons alone
- Empty states always explain **what to do next** in plain language
- Destructive actions always require a **2-step confirmation**
- Dashboard shows **only what needs attention today** — not everything always

---

## 🔀 SCREEN 0 — ROLE SELECTION (First Launch)

Full white screen. PG OS logo centered at top. Tagline below: *"Your PG, sorted."*

Two large cards, stacked vertically on mobile:

**Card 1 — I'm a PG Owner**
- Purple `#8A2BE2` card background
- White icon (building/key) + white heading + white subtext: "Manage your PGs, tenants & rent"
- Feels like a badge of authority

**Card 2 — I'm a Tenant**
- White card, `#8A2BE2` border
- Purple icon + purple heading + muted subtext: "View your PG, pay rent & raise issues"
- Feels approachable and clean

Bottom: "Already registered? Log in" — small muted link.

From this point **every screen branches into two completely separate worlds.** Owner and Tenant never see each other's UI.

---

## 👤 OWNER WORLD — ALL SCREENS

---

### OWNER SCREEN 1 — Registration (Step 1 of 3)

White background. Purple progress bar at top — Step 1 of 3.

Heading: "Create your owner account"
Subheading in muted text: "Takes less than 2 minutes"

**One field group at a time (not all together):**
- Full Name
- WhatsApp Number (with +91 pre-filled)
- Email (optional)
- Password + Confirm Password

Primary CTA: Purple full-width button — "Continue"

Cognitive load rule: Fields appear in a single clean card `#F5F3FF` background. No clutter around the form. Just the form and the button.

---

### OWNER SCREEN 2 — Plan Selection (Step 2 of 3)

Heading: "Choose your plan"
Subheading: "You can upgrade anytime"

4 plan cards in a horizontal scroll on mobile:

| Plan | PGs | Price |
|---|---|---|
| Starter | 1 PG | ₹299/mo |
| Basic | 3 PGs | ₹399/mo |
| Growth | 5 PGs | ₹499/mo |
| Pro | 10 PGs | ₹599/mo |

Selected card: `#8A2BE2` background, white text, subtle shadow
Unselected card: White background, `#8A2BE2` border

"Most Popular" label on Basic — purple badge.

Payment collected after first PG is set up. This screen only selects the plan.

CTA: "Continue with [Plan Name]"

---

### OWNER SCREEN 3 — First PG Setup (Step 3 of 3)

Heading: "Set up your first PG"

**Split into 3 mini-steps within this screen using a simple stepper (not a progress bar — stepper feels faster):**

**Mini Step A — Basic Info**
- PG Name
- Address
- PG Type: Boys / Girls / Co-ed (3 pill buttons)
- CTA: "Next →"

**Mini Step B — Rooms & Beds**
- Number of Rooms (+ / − stepper input)
- Beds per Room (+ / − stepper input)
- Live preview text: "Your PG has **X beds** in total" — purple text, updates as they type
- CTA: "Next →"

**Mini Step C — Rent Rules**
- Rent per Bed (₹)
- Advance Amount (₹)
- Rent Due Date: pill selector (1st / 5th / 7th / 10th)
- Notice Period: pill selector (15 / 30 / 45 days)
- CTA: "Launch My Dashboard →"

On completion: Friendly success screen — purple checkmark animation, text: "Your PG is ready! Let's add your first tenant." Two buttons: "Add Tenant Now" and "Go to Dashboard"

---

### OWNER SCREEN 4 — DASHBOARD (Home)

This is the most important screen. Must show **only what matters today**. No data overload.

**Top Bar:**
- Left: Hamburger (mobile) or logo (desktop)
- Center: "Good morning, Ramesh 👋"
- Right: Dark/Light mode toggle icon + Notification bell (purple dot if unread)

**Today's Summary — 3 cards only (horizontal scroll on mobile):**

1. 💰 Rent Collected — ₹X / ₹Y total expected — with a thin purple progress bar
2. 🏠 Beds Occupied — X/Y — with mini bar
3. ⚠️ Needs Action — X items (red badge if > 0)

**Needs Attention Section** (the most valuable part of the dashboard):
Shows maximum 3 items. If more exist, shows "See all 5 issues →"

Alert cards with **left colored border** only (not full color background — less aggressive):
- Red border: "Ravi Kumar — Room 3 — 9 days overdue ₹8,000" → "Remind" button
- Amber border: "Priya Sharma — Moving out in 3 days" → "View" button
- Purple border: "Advance refund pending — Ankit Singh" → "Settle" button

**My PGs Section:**
One card per PG. Keep it compact:
- PG Name + Occupancy (e.g., 12/15 beds) with mini bar
- This month: Collected ₹X | Pending ₹X
- Two buttons: "Manage" | "Add Tenant"

**Announcements Panel** (new feature — see below):
Small card at bottom: "Send a message to all tenants →" with a compose icon. Purple ghost style.

**Bottom Navigation (Mobile — 4 tabs only, not 5):**
Home | My PGs | Rent | More

Cognitive load rule: 4 tabs max on mobile. "More" contains Expenses, Messages, Settings.

---

### OWNER SCREEN 5 — MY PGs

List of all PGs the owner manages.

Each PG card:
- PG name + Type badge (Boys/Girls/Co-ed) in purple pill
- Address in muted text
- Occupancy bar — thin, purple fill, white track
- ₹ Collected / ₹ Expected this month
- Vacant beds count in amber if > 0

Tap card → Individual PG View

"+ Add New PG" button — top right, purple outlined button, not filled (secondary action)

---

### OWNER SCREEN 6 — INDIVIDUAL PG VIEW

Header: PG Name + back arrow + Edit icon

**3 tabs (not 4 — reduce cognitive load):**

**Tab 1: Overview**

Bed Grid — visual map of all rooms.
Each room is a collapsible row. Inside: bed slots.

Bed states:
- Purple filled circle = Occupied
- White circle with purple border = Vacant
- Red circle = Overdue tenant
- Amber circle = Notice given

Tap occupied bed → Tenant quick-view bottom sheet (name, rent status, 2 actions: View Full Profile | Send Message)
Tap vacant bed → "Add Tenant to this Bed" sheet

**Tab 2: Tenants**

Searchable list. Each row:
- Avatar (initial-based, purple background)
- Name + Room/Bed
- Rent status badge (Paid / Pending / Overdue / Notice Given)
- Joining date in muted text

Tap → Tenant Detail Page

Filter pills above list: All | Paid | Pending | Overdue | Notice

**Tab 3: Activity**

Chronological log of everything that happened in this PG:
- Rent payments marked
- Tenants added/vacated
- Notices submitted
- Messages sent
- Complaints raised

Each item: icon + description + timestamp. Purple icons throughout.

---

### OWNER SCREEN 7 — TENANT DETAIL PAGE

Header: Tenant name + Status badge + Back

**Simplified into 3 collapsible sections (not a long scroll):**

**Section 1: Current Status (always expanded)**
- Room/Bed
- Monthly Rent ₹X
- Rent Status: large badge — Paid / Pending / Overdue
- If pending: "Mark as Paid" — purple primary button
- If paid: Mode + date in muted text
- Advance on record: ₹X

**Section 2: History (collapsed by default)**
Tap to expand:
- Month-by-month rent table
- Color coded status column
- Export as PDF link (future)

**Section 3: Move-Out & Advance (collapsed)**
Tap to expand:
- Notice Status
- Advance Eligibility
- Owner action buttons: Refunded | Deducted (with reason)

**Bottom Action Bar (always visible):**
3 icon buttons:
- 💬 Send Message (opens compose sheet)
- ⚠️ Raise Issue (owner flags a problem with this tenant)
- ✏️ Edit Details

---

### OWNER SCREEN 8 — MESSAGES & ANNOUNCEMENTS *(New Feature)*

This is the **owner's broadcast and communication hub.**

**Two tabs:**

**Tab 1: Announcements (Broadcast)**

Owner can send a message to:
- All tenants across all PGs
- All tenants in one specific PG
- Individual tenant

Compose card at top:
- "Who receives this?" — selector: All PGs / Select PG / Select Tenant
- Message text area (max 300 characters — keep it simple)
- Optional: Attach photo
- Send via: WhatsApp toggle (ON by default)
- CTA: "Send Announcement"

Below compose: History of past announcements
Each entry: Date + "Sent to X tenants" + message preview + delivery count

Examples of what owners send:
- "Water supply off tomorrow 10am–2pm"
- "Please clear rent before 7th to avoid late fee"
- "New WiFi password: pg2024"

**Tab 2: Individual Messages**

Inbox-style list of conversations with individual tenants.
Each row: Tenant name + last message preview + time
Unread messages show purple dot.

Tap → Opens conversation thread (WhatsApp-style bubbles, purple for owner, white for tenant)

Cognitive load note: This is **not** a full chat app. It's a structured communication log. Owners can compose and send — replies from tenants come in via WhatsApp and are mirrored here.

---

### OWNER SCREEN 9 — COMPLAINTS & QUERIES *(New Feature)*

Heading: "Issues Raised by Tenants"

**Status filter tabs:** Open | In Progress | Resolved

Each complaint card:
- Tenant Name + PG + Room
- Category icon + Category: Maintenance / WiFi / Food / Cleanliness / Noise / Other
- Issue description (2 lines, truncated)
- Time raised
- Priority auto-tag: Urgent (red) / Normal (amber) / Low (grey)
- Status badge

**Actions on each card:**
- "Mark In Progress" → status updates, tenant gets WhatsApp notification
- "Mark Resolved" + optional resolution note
- "Reply to Tenant" → opens message compose

**Complaint Detail View (tap any card):**
- Full issue description
- Photos attached by tenant (if any)
- Timeline: Raised → Acknowledged → Resolved
- Owner's resolution note
- Option to reopen

**Add Issue on behalf of tenant:**
Owner can also raise an issue themselves — for when tenants report verbally.

---

### OWNER SCREEN 10 — RENT OVERVIEW

Header: "Rent — [Month Year]" with left/right month navigation

**Top summary (3 numbers, not 5):**
- Collected: ₹X (purple, large)
- Pending: ₹X (amber)
- Overdue: ₹X (red)

Collection rate: circular progress ring in purple — "78% collected"

**Filter:** All PGs pill + individual PG pills (horizontal scroll)

**List:** Grouped by PG name. Each tenant row:
- Name + Room
- ₹ Amount
- Status badge
- "Mark Paid" inline — purple ghost button (saves a full tap)

**Bulk action bar** (appears when tenants are selected via checkbox):
"Send Reminder to X tenants" — purple button at bottom

---

### OWNER SCREEN 11 — EXPENSE TRACKER

Header: "Expenses" + current month + Add button (top right)

**Summary card:**
- Total this month: ₹X (large, purple)
- Simple horizontal bar showing top 3 categories

**Expense list:**
Grouped by date. Each row:
- Category icon (purple) + Category name
- PG name in muted text
- Note preview if exists
- ₹ Amount (right aligned)
- Tap to edit/delete

**Add Expense — Bottom Sheet (not a new page):**
Appears from bottom, 4 fields only:
- PG (dropdown if multiple)
- Category (icon grid — visual, fast)
- Amount (large number input)
- Date (today by default)
- Optional note
- "Save" button

---

### OWNER SCREEN 12 — NOTIFICATIONS

Bell icon from top bar.

Grouped: Today / Yesterday / Earlier

Each notification:
- Purple icon indicating type
- Plain English description (no jargon)
- Timestamp
- One action button where relevant: "View" or "Resolve"

Types:
- Rent marked paid by owner
- Tenant submitted move-out notice
- Advance refund pending
- Complaint raised by tenant (with priority)
- Reminder sent to tenant
- Vacancy open for X days
- Subscription renewal in 7 days

---

### OWNER SCREEN 13 — SETTINGS

Organized into 5 simple groups. No walls of toggles.

**Your Account:** Edit name, photo, phone, email, change password

**PG Defaults:** Default rent due date, notice period, advance policy — editing here applies to new PGs only

**Notifications:** Toggle which alert types you receive — grouped logically, max 6 toggles

**Reward System:** ON/OFF toggle + reward amount input (shown only when ON) + clear explanation of what it does

**Subscription:** Plan name + renewal date + Upgrade button + billing history link

**Appearance:** Light / Dark mode toggle — with live preview of both (small phone mockup showing each)

**Support & Feedback:** WhatsApp support link + "Report a problem" + Privacy Policy

---

## 🏠 TENANT WORLD — ALL SCREENS

---

### TENANT SCREEN 1 — Registration / Join

Heading: "Join your PG"
Subheading: "Your PG owner needs to add you first. Enter your invite code or phone number."

Two options, clearly explained:

**Option A — Enter Invite Code**
- Code sent by owner via WhatsApp on joining
- 6-digit code input — big, purple-bordered boxes

**Option B — Enter Registered Mobile**
- Phone number input
- OTP verification

After verification: Welcome screen with PG name, room, and bed number pre-filled. Tenant sets password and profile photo (optional).

---

### TENANT SCREEN 2 — TENANT DASHBOARD (Home)

Completely different from owner dashboard. Warmer, simpler, personal.

**Top:** "Hi Ravi 👋" + PG name subtitle

**My Rent Card (most prominent thing on screen):**
Large card, purple background, white text:
- "This Month's Rent"
- ₹8,000
- Status: Paid ✓ / Due on 5th / Overdue since 3rd
- If pending: "Pay Now" button (white button on purple card)

**My PG Card (new addition — replacing matches):**
- PG Name + Address
- Room No. + Bed No.
- Owner name + WhatsApp contact icon
- Amenities listed: WiFi / Food / Laundry / AC (icons, whatever the owner has set)
- "View Full PG Details" link

**PG Updates Feed (new feature — below My PG):**
Announcement cards from the owner. Most recent 3 shown.
Each: Purple left border + message + time
"View all announcements →" link at bottom

**Quick Actions Row (3 icons only):**
- 🔔 My Rent (rent history)
- 📋 Raise Issue
- 💬 Messages

**Bottom Navigation (Mobile — 3 tabs only):**
Home | My PG | Profile

---

### TENANT SCREEN 3 — MY PG

Full details of the tenant's current PG.

**Section 1: PG Info**
- PG photos (carousel if owner has added)
- PG Name, Address, Type
- Owner Name + "Message Owner" button (WhatsApp)

**Section 2: My Stay Details**
- Room Number + Bed
- Joining Date
- Monthly Rent
- Advance Paid
- Notice Period

**Section 3: Amenities**
Icon grid: WiFi / Food / Laundry / AC / Parking / CCTV / etc.
Filled purple icon = available. Grey outline = not available.

**Section 4: PG Rules**
Owner can add rules text. Shown here in a simple list.
Examples: "No guests after 10PM" / "Rent due by 5th every month"

**Section 5: Move-Out Notice**
If not given: "Submit move-out notice" — outlined purple button with clear explanation of what happens
If given: Shows notice date + countdown to last day + advance refund status

---

### TENANT SCREEN 4 — MY RENT

Heading: "My Rent"

**Current Month Card:**
- Month + Year
- Amount Due: ₹X
- Status badge (large)
- If pending: Due date + days remaining or days overdue
- Payment mode options shown if owner has enabled online pay (future)
- "Notify Owner I've Paid" button — sends WhatsApp to owner to confirm

**Past Payments list:**
Month by month. Each row:
- Month
- ₹ Amount
- Status badge
- Payment mode if paid
- Date paid

**Advance Status Card:**
- Advance Paid: ₹X on [date]
- Refund Status: Not Applicable / Eligible / Pending / Refunded / Deducted

---

### TENANT SCREEN 5 — RAISE AN ISSUE / COMPLAINT *(New Feature)*

Heading: "Report a Problem"

**Category selector — icon grid (8 categories):**
- 🔧 Maintenance
- 📶 WiFi
- 🍽️ Food
- 🧹 Cleanliness
- 🔊 Noise
- 🚿 Water / Plumbing
- 💡 Electricity
- 📦 Other

Tap one to select (turns purple).

**Form (appears after category selected):**
- Describe the issue (text area — "What's the problem? Be specific so it gets fixed faster")
- How urgent? — 3 pills: Can wait / Urgent / Emergency
- Add photo (optional — up to 3)
- CTA: "Submit Complaint" — purple full-width

**After submit:**
Success screen: "Issue reported! Your PG owner has been notified and will respond shortly."

**My Complaints tab:**
Shows all past complaints with status timeline: Raised → Acknowledged → Resolved.
Each complaint card has status badge + owner's reply if any.

---

### TENANT SCREEN 6 — PG UPDATES FEED *(New Feature)*

All announcements from the PG owner in one place.

Chronological feed — newest first.

Each card:
- Purple left border
- Date + time (muted)
- Message text
- Photo (if attached)

If no updates: "Your PG owner hasn't posted any updates yet. Check back later."

Tenant cannot post to this feed — read-only. They use "Raise Issue" for communication.

---

### TENANT SCREEN 7 — MESSAGES *(New Feature)*

Direct message thread between tenant and owner.

WhatsApp-style bubble UI:
- Purple bubbles for tenant's messages (right)
- White bubbles with purple border for owner's messages (left)

Compose bar at bottom: Text input + Send button (purple arrow icon)

Note: Messages sent here also go to the owner's WhatsApp. This is a mirror log, not a standalone chat system in V1.

**Pre-set quick message templates** (reduces cognitive load, especially for shy tenants):
Chips above compose bar:
- "When will my issue be resolved?"
- "I've paid the rent, please check"
- "I need a rent receipt"
- "I'd like to request a change"

Tap chip → fills compose bar → tenant edits if needed → sends.

---

### TENANT SCREEN 8 — PROFILE

- Profile photo + Name
- Phone Number (non-editable)
- Email (editable)
- Notification preferences (WhatsApp reminders ON/OFF)
- Language preference (English / Hindi — future)
- Dark / Light mode toggle
- "Contact Support"
- "Log Out"

---

## 🌗 Dark / Light Mode Toggle — Implementation

**Toggle location:** Top bar (moon/sun icon, always visible) + Settings screen

**Behavior:**
- Preference saved to user account — persists across devices
- Transition: 200ms smooth fade, not instant flash
- Default: Light mode for all new users

**Light Mode:**
- Background: `#FFFFFF`
- Cards: `#F5F3FF`
- Text: `#1A0533`
- Primary: `#8A2BE2`

**Dark Mode:**
- Background: `#0F0F13`
- Cards: `#1A1A24`
- Text: `#F3F0FF`
- Primary: `#8A2BE2` (same — purple looks great on both)

---

## ✅ All New Features Added — Summary

| Feature | Who Uses It | What It Does |
|---|---|---|
| PG Updates Feed | Tenant (read) + Owner (write) | Owner broadcasts announcements to tenants |
| Complaints & Issues | Tenant raises, Owner resolves | Structured problem reporting with status tracking |
| My PG Screen | Tenant | Full PG info, amenities, rules, owner contact |
| Messages | Both | Mirrored WhatsApp-backed direct communication |
| Quick Message Templates | Tenant | Reduces friction for raising common queries |
| Light / Dark Mode | Both | Full theme toggle saved to account |
| Role Selection Screen | All new users | Owner and Tenant enter completely separate flows |
| Bed Visual Map | Owner | See all beds at a glance — occupied/vacant/overdue |
| Complaint Priority Tags | Owner | Urgent vs Normal vs Low auto-tagging |
| Move-Out from Tenant Side | Tenant | Submit notice, track advance refund status |