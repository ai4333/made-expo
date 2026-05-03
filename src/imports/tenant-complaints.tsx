CONTEXT
This is a PG (Paying Guest) management app with two completely separate user worlds — PG Owner and Tenant. I am providing you updated code files along with this prompt. Apply ALL changes described below across the entire app.

1. 🎨 GLOBAL COLOR REPLACEMENT — DO THIS FIRST
The entire app currently uses indigo-600 and teal-600. Replace every instance with #8A2BE2 (BlueViolet purple). This is the ONLY brand color.
Run these replacements across every single file in the project:
Find (Tailwind class)Replace withbg-indigo-600bg-[#8A2BE2]bg-indigo-500bg-[#8A2BE2]text-indigo-600text-[#8A2BE2]text-indigo-700text-[#6D1CB5]border-indigo-600border-[#8A2BE2]bg-indigo-50bg-[#F5F3FF]bg-indigo-100bg-[#EDE9FE]text-indigo-100text-[#EDE9FE]shadow-indigo-500/30shadow-[rgba(138,43,226,0.28)]ring-indigo-600ring-[#8A2BE2]focus:ring-indigo-600focus:ring-[#8A2BE2]hover:bg-indigo-700hover:bg-[#6D1CB5]from-indigo-600from-[#8A2BE2]to-indigo-700to-[#6D1CB5]via-indigo-600via-[#8A2BE2]bg-teal-600bg-[#8A2BE2]text-teal-600text-[#8A2BE2]border-teal-600border-[#8A2BE2]from-teal-600from-[#8A2BE2]to-teal-600to-[#6D1CB5]
DO NOT change these — they are intentional functional colors:

rose-500 → heart/save button
amber-400 / amber-500 → star ratings + rent due warning bar
pink-500 → Female Only gender badge
blue-500 → Male Only gender badge
red- / danger → error states only


2. 🌗 DARK / LIGHT MODE — ADD TO EVERY SCREEN
Every screen must support dark and light mode. Add a toggle button (moon/sun icon) in the top right of every screen's top bar.
Use this exact token system throughout. Never hardcode colors — always reference these:
tsconst PURPLE       = "#8A2BE2";
const PURPLE_DARK  = "#6D1CB5";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_BORDER = "rgba(138,43,226,0.22)";
const PURPLE_SHADOW = "rgba(138,43,226,0.28)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF", elevated: "#EDE9FE",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  divider: "#E9E3F5", card: "#FFFFFF", cardBorder: "#E9E3F5",
  inputBg: "#F5F3FF",
  danger: "#DC2626", dangerBg: "rgba(220,38,38,0.08)",
  warning: "#D97706", warningBg: "rgba(217,119,6,0.10)",
  success: "#059669", successBg: "rgba(5,150,105,0.08)",
  navBg: "#FFFFFF", navBorder: "#E9E3F5",
};

const DARK = {
  bg: "#0F0F13", surface: "#1A1A24", elevated: "#22223A",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  divider: "#2D2D3D", card: "#1A1A24", cardBorder: "#2D2D3D",
  inputBg: "#22223A",
  danger: "#EF4444", dangerBg: "rgba(239,68,68,0.12)",
  warning: "#F59E0B", warningBg: "rgba(245,158,11,0.12)",
  success: "#10B981", successBg: "rgba(16,185,129,0.10)",
  navBg: "#1A1A24", navBorder: "#2D2D3D",
};
Dark mode toggle: top-right corner of every screen. Moon icon (light mode) → Sun icon (dark mode). Button style: background: PURPLE_GHOST, borderRadius: 9, padding: "6px 10px".

3. 🏠 HOME.TSX — REPLACE COMPLETELY
Replace the existing Home.tsx with the file I am attaching. Key changes made:

Full #8A2BE2 color system — zero indigo/teal remaining
Dark/light mode toggle added to the purple hero banner
PG Updates preview section added — shows 2 latest announcements from owner with purple left border cards, "See all →" link navigates to /tenant/updates
Quick Actions row added — 3 cards: 📢 PG Updates, 📋 Raise Issue, 💬 Messages — each navigates to their respective screens
My Complaints strip added — shows 2 recent complaints with status badges, "View all →" navigates to /tenant/complaints
PG card price color changed from text-teal-600 to text-[#8A2BE2]
All vibe/roommate chips changed from indigo-100 text-indigo-700 to PURPLE_GHOST + PURPLE text
Filter pills: active state uses #8A2BE2 background + white text + purple shadow
View toggle: active state uses #8A2BE2 text
Demo shortcut card: gradient changed to #8A2BE2 → #6D1CB5


4. 📢 CREATE NEW FILE: TenantUpdates.tsx
Create this file at src/app/pages/TenantUpdates.tsx. I am attaching the complete code.
What it does:

Full-page announcement feed from PG owner
Top bar with back arrow + "PG Updates" title + dark mode toggle
Subheading: "Announcements from [PG Name]"
Each announcement card: white background, 3px solid #8A2BE2 left border, 16px border radius, message text + time ago
Empty state: purple ghost circle + Megaphone icon + helpful message
Read-only — tenant cannot post, only owner can

Add to routes.ts:
ts{ path: "/tenant/updates", element: <TenantUpdates /> }

5. 📋 CREATE NEW FILE: TenantComplaints.tsx
Create this file at src/app/pages/TenantComplaints.tsx. I am attaching the complete code.
What it does:
Tab 1 — Raise Issue:
Step 1 — Category selection:

Heading: "What's the problem?"
3×3 icon grid of categories: 🔧 Maintenance, 📶 WiFi, 🍽️ Food, 🧹 Cleanliness, 🔊 Noise, 🚿 Plumbing, 💡 Electricity, 🔒 Security, 📦 Other
Selected category: #8A2BE2 border + purple ghost background + checkmark overlay
"Next →" button: purple filled, only active after category selected

Step 2 — Describe issue:

Back arrow to return to step 1
Auto-heading: "[Category] Issue" using selected category name
Textarea: 5 rows, purple border on focus, 300 char limit with counter
Urgency selector: 3 pill buttons — "Can wait" (grey), "Urgent" (amber), "Emergency" (red)
"Submit Report →" button: disabled/grey if no text, purple + shadow when active

Success state (full screen replacement):

Purple checkmark circle (animated draw-in)
"Issue Reported!" heading
"Your PG owner has been notified" body text
Complaint reference number pill in purple ghost
"Track This Complaint →" purple button → switches to My Complaints tab
"Raise another issue" muted link

Tab 2 — My Complaints:

Status filter pills: All / Open / In Progress / Resolved
Each complaint card: colored left border (amber=Open, purple=In Progress, green=Resolved)
Shows: category icon + name + status badge + time + issue text + owner reply card (if exists)
In Progress complaints show a 3-dot timeline: Raised → Acknowledged → Resolved
Empty state with clipboard icon

Add to routes.ts:
ts{ path: "/tenant/complaints", element: <TenantComplaints /> }

6. 💬 CREATE NEW FILE: TenantMessages.tsx
Create this file at src/app/pages/TenantMessages.tsx. I am attaching the complete code.
What it does:

Full-screen chat between tenant and PG owner
Top bar: owner name as title (not "Messages") + "PG Owner" subtitle + dark mode toggle
Owner messages (left): white/surface card bubbles with #8A2BE2 border, owner initial avatar (purple circle, 28px) on the left, border-radius: 4px 16px 16px 16px
Tenant messages (right): #8A2BE2 filled bubbles, white text, border-radius: 16px 4px 16px 16px, purple box shadow
Timestamps below each bubble in muted color
Quick template chips (horizontally scrollable, above compose bar): white background, #8A2BE2 border — options: "When will my issue be resolved?", "I've paid the rent, please check", "I need a rent receipt", "I'd like to request a change", "There's a maintenance issue" — tapping fills the compose input
Compose bar (fixed at bottom): text input with purple border-on-focus + send button (purple circle with white arrow, only active when input has text)
Auto-scrolls to latest message on send
Empty state: owner avatar + "Start the conversation! Messages also go to owner's WhatsApp"

Add to routes.ts:
ts{ path: "/tenant/messages", element: <TenantMessages /> }

7. 🗺️ UPDATE routes.ts
Add all 3 new tenant routes:
tsimport { TenantUpdates }    from "./pages/TenantUpdates";
import { TenantComplaints } from "./pages/TenantComplaints";
import { TenantMessages }   from "./pages/TenantMessages";

// Inside your routes array:
{ path: "/tenant/updates",    element: <TenantUpdates /> },
{ path: "/tenant/complaints", element: <TenantComplaints /> },
{ path: "/tenant/messages",   element: <TenantMessages /> },

8. 🔧 FIX EXISTING TENANT SCREENS
Apply these fixes to every existing tenant-side file:
MyPGPage.tsx

Replace all indigo- and teal- with #8A2BE2 equivalents
Add dark mode toggle to top bar
Add "Message Owner" button → navigates to /tenant/messages
Add "PG Updates" link → navigates to /tenant/updates
Add "Raise Issue" button → navigates to /tenant/complaints
Move-out notice section: use purple outline button (not filled — irreversible action)
After notice submitted: show purple ghost confirmation card with checkmark

Chat.tsx (existing)

Replace with same design system as new TenantMessages.tsx
Purple bubbles for tenant (right), white/surface bubbles for owner (left)
Add quick template chips above compose bar
Add dark mode toggle

Notifications.tsx

Replace indigo- colors with #8A2BE2
Add dark mode toggle
Notification types use colored left borders: red=overdue, amber=pending, purple=info

MyProfile.tsx

Replace indigo- colors with #8A2BE2
Add dark mode toggle
Save button: only active (purple) when a field has changed

SavedPGs.tsx

Replace indigo- with #8A2BE2
Heart/save icon stays rose-500
Add dark mode toggle

PGDetail.tsx

Replace indigo- with #8A2BE2
Price displayed in #8A2BE2
"Schedule Visit" CTA: purple filled
"Save" button: rose-500 (keep)
Add dark mode toggle

VisitScheduling.tsx

Selected date/slot: #8A2BE2 background, white text
Unselected: #F5F3FF surface background, muted text
CTA: purple filled

Filters.tsx

Active filter pills: #8A2BE2 background
Apply button: #8A2BE2 filled
Clear button: purple outline/ghost
Range slider track fill: #8A2BE2

VibeCalibration.tsx

Selected vibe option: #8A2BE2 border + #F5F3FF ghost background
Progress bar fill: #8A2BE2
Next button: #8A2BE2 filled

RoommateDiscovery.tsx and RoommateProfile.tsx

Replace indigo- with #8A2BE2
Match/connect CTA: #8A2BE2 filled
Compatibility score shown in #8A2BE2


9. ✅ STATUS BADGE SYSTEM — STANDARDIZE EVERYWHERE
Use this exact pattern for ALL status badges across all screens:
tsxfunction StatusBadge({ status, t }) {
  const map = {
    "Paid":         { color: t.success, bg: t.successBg },
    "Pending":      { color: t.warning, bg: t.warningBg },
    "Overdue":      { color: t.danger,  bg: t.dangerBg  },
    "In Progress":  { color: PURPLE,    bg: PURPLE_GHOST },
    "Resolved":     { color: t.success, bg: t.successBg },
    "Notice Given": { color: PURPLE,    bg: PURPLE_GHOST },
    "Open":         { color: t.warning, bg: t.warningBg },
    "Active":       { color: PURPLE,    bg: PURPLE_GHOST },
    "Vacant":       { color: t.muted,   bg: t.surface   },
  };
  const c = map[status] || { color: t.muted, bg: t.surface };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 20,
      fontSize: 12, fontWeight: 700,
      color: c.color, background: c.bg,
    }}>
      {status}
    </span>
  );
}

10. 🔤 TYPOGRAPHY
Add this to index.html or fonts.css if not already present:
html<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
Add to global CSS:
cssbody {
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

---

## 11. 🧠 COGNITIVE LOAD RULES — ENFORCE EVERYWHERE

These rules must be applied to every screen during updates:

- Maximum **3 primary actions** visible per screen at once
- Every screen has exactly **one** primary CTA — purple, full-width
- Forms show maximum **4 fields** at a time — use steps/sections for longer forms
- Every empty state has an icon + message + one helpful CTA button
- Destructive actions (delete, move-out notice) always require a **2-step confirmation**
- Bottom navigation on tenant side: maximum **4 tabs** — Home / My PG / Rent / More
- Never show icons alone — always pair with text labels
- Filter pills and tab switchers always show the active state clearly with purple fill

---

## 12. 📱 BUTTON STYLES — STANDARDIZE

**Primary button** (main CTA):
```
background: #8A2BE2, color: white, borderRadius: 14, padding: 14px,
fontSize: 15, fontWeight: 700, boxShadow: 0 4px 16px rgba(138,43,226,0.28)
```

**Secondary/Outline button:**
```
background: transparent, border: 2px solid #8A2BE2, color: #8A2BE2,
borderRadius: 14, padding: 12px, fontSize: 14, fontWeight: 700
```

**Ghost button:**
```
background: rgba(138,43,226,0.10), color: #8A2BE2, border: none,
borderRadius: 12, padding: 10px 18px, fontSize: 13, fontWeight: 600
```

**Disabled state (any button):**
```
background: #F5F3FF (light) / #1A1A24 (dark), color: #8B7AA8, no shadow, cursor: default

SUMMARY OF ALL CHANGES
WhatActionAll indigo- + teal- colorsReplace with #8A2BE2 systemDark/Light mode toggleAdd to every screen top barHome.tsxReplace with attached fileTenantUpdates.tsxCreate new — attachedTenantComplaints.tsxCreate new — attachedTenantMessages.tsxCreate new — attachedroutes.tsAdd 3 new tenant routesAll existing tenant screensApply color + dark mode fixesStatus badgesStandardize across all screensTypographyDM Sans everywhereButton stylesStandardize to 3-tier systemCognitive loadMax 3 actions, 1 CTA, 4 tabs