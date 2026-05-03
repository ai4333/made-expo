I want you to completely replace and upgrade the Owner side of this app. 
Use the following reference app as your primary design and feature inspiration:

🔗 REFERENCE APP (File 1 - ChaaloPG Premium PG Management):
https://www.figma.com/make/p25R8y4F2Z9bWC3gPioIxV/Premium-PG-Management-App?t=21nV4EGCaSwotDv8-1

Please open the above Figma Make reference and study ALL of the following 
owner screens from it — then rebuild the owner side of THIS app to match them 
exactly in design, features, and navigation flow:

From the reference app, replicate these screens:
1. /splash — Splash screen with ChaaloPG branding
2. /login — Login screen (for owner login flow)
3. /owner/home — OwnerHome dashboard
4. /owner/pg-dashboard — Room grid with status
5. /owner/room-detail — Individual room detail
6. /owner/tenant-detail — Full tenant profile
7. /owner/cash-payment — Record cash payment
8. /owner/bulk-payments — Bulk rent collection
9. /owner/rent-overview — Finance overview with collection stats
10. /owner/expense-entry — Add expense form
11. /owner/expenses-dashboard — Expense breakdown with charts
12. /owner/announcements — Send announcements to tenants
13. /owner/complaints — View and manage complaints
14. /owner/move-outs — Manage move-out requests
15. /owner/balance-sheet — P&L balance sheet
16. /owner/qr-generator — UPI QR code generator
17. /owner/payment-status — Payment status master list
18. /owner/cash-flow — Cash flow charts
19. /owner/room-profitability — Room-wise profitability
20. /owner/settings — Owner settings

---

DESIGN SYSTEM (must match reference app exactly):

- Dark theme: background gradient from #0A0A1A to #1A1040
- Primary: purple #8B5CF6 / #7C3AED
- Accent: cyan #06B6D4
- Success: #10B981 | Warning: #F59E0B | Danger: #EF4444
- Cards: glassmorphism (bg-white/5, border border-white/10, backdrop-blur-xl, rounded-2xl)
- All text white or white/60 for secondary
- Fonts: bold headings, regular body
- All monetary values in Indian format: ₹X,XX,XXX

---

OWNER BOTTOM NAV — 5 tabs:
1. 🏠 Home → /owner/home
2. 🛏 Rooms → /owner/pg-dashboard
3. 💰 Finance → /owner/rent-overview
4. 📊 Reports → /owner/cash-flow
5. ☰ More → slide-up drawer with: Announcements, Complaints, Move-Outs, 
   QR Generator, Balance Sheet, Settings

Active tab: purple with glow. Inactive: white/40.
All owner screens wrapped in OwnerLayout with this bottom nav.

---

OWNER HOME SCREEN:
- Header: "Good Morning, Rajesh 👋" + bell icon + avatar
- Subtitle: "Sunrise PG • 24 Rooms"
- Stats grid (2x2 glass cards): Total Rooms 24 | Occupied 21 | 
  Pending Dues ₹18,500 | Monthly Revenue ₹1,26,000
- Occupancy bar: 21/24 rooms filled, purple-cyan gradient
- Quick Actions (horizontal scroll pills): 
  💵 Collect Rent | 📦 Bulk Pay | ➕ Add Tenant | 
  📢 Announce | 🔧 Complaints | 📤 Move-Out
- Recent Activity feed (last 5): avatar + name + action + time + amount badge

---

PG DASHBOARD / ROOMS SCREEN:
- Search bar at top
- Filter tabs: All | Occupied | Vacant | Maintenance
- 2-column room card grid
- Each card: room number (large), status badge, tenant name, 
  rent amount, days since last payment
- Tap card → go to room detail
- Floating + button to add room

---

ROOM DETAIL SCREEN:
- Back nav + room number header
- Room info: floor, capacity, amenities chips (AC / WiFi / Attached Bath)
- Current tenant card: name, phone (tap to call), move-in date, 
  advance paid, payment status badge
- Last 3 payment history rows
- Action buttons: Edit Room | Mark Vacant | Generate QR

---

TENANT DETAIL SCREEN:
- Large colored avatar circle with initials
- Name, phone, email, room number badge
- Details grid: Move-in Date | Advance | Monthly Rent | Lock-in
- Full payment ledger (scrollable): month, due date, paid date, 
  amount, method, status
- Documents: ID Proof ✓ | Agreement ✓ | Photo ✓
- Action bar: 📞 Call | 💬 WhatsApp | 💵 Collect Rent | 📤 Move-Out

---

CASH PAYMENT SCREEN:
- Tenant searchable dropdown (name + room)
- Amount field (pre-filled with rent, editable)
- Month selector dropdown
- Payment date picker (today default)
- Method chips: Cash | UPI | Bank Transfer | Cheque
- Notes field
- "Record Payment" button with success animation
- Recent 10 payments list below

---

BULK PAYMENTS SCREEN:
- Month/Year selector
- Tenant list with: checkbox | avatar | name | room | amount | status badge
- "Select All Pending" button
- Sticky "Mark Selected as Paid" CTA (purple)
- Summary bar: X paid · Y pending · ₹Z total

---

RENT OVERVIEW / FINANCE SCREEN:
- 6-month scrollable tab selector
- Summary: Expected ₹1,26,000 | Collected ₹1,07,500 | Pending ₹18,500
- Circular progress ring (purple): 85% collection rate
- Tenant payment list: name | room | amount | due date | status | method
- Overdue rows: red left border
- Filter: All | Paid | Pending | Overdue
- Export CSV button

---

EXPENSES SCREENS:
Add Expense:
- Category chips: Electricity⚡ Water💧 Maintenance🔧 Salary👷 
  Internet📡 Groceries🛒 Other
- Amount, date, description, receipt attach button

Expenses Dashboard:
- Month selector
- Total card + donut chart by category (recharts)
- Expense list with icon + category + date + amount
- FAB + button to add expense

---

ANNOUNCEMENTS SCREEN:
- Text input "Write announcement..."
- Target: All Tenants / Specific Floor / Room
- Priority toggle: Normal | Urgent
- Send button with animation
- Past announcements list: message + date + "X/21 read" counter
- Urgent = amber left border

---

COMPLAINTS SCREEN:
- Filter tabs: All | Open | In Progress | Resolved
- Each card: room badge | tenant name + time | category icon | 
  description | status badge | priority (High/Med/Low)
- Tap → detail view with "Mark In Progress" / "Mark Resolved" buttons

---

MOVE-OUTS SCREEN:
- Tabs: Pending | Completed
- Card: tenant avatar | name | room | requested date | 
  notice period remaining | advance refund amount
- Buttons: Approve (green) | Reject (red) | View Details
- Detail view: checklist (room inspected / keys returned / dues cleared) + 
  final settlement button

---

BALANCE SHEET SCREEN:
- Period selector: This Month | 3M | 6M | Year
- Income section: Rent + Advance + Other = Total (green)
- Expense section: by category = Total (red)
- NET PROFIT large and green: ₹87,500
- Bar chart: Income vs Expense per month (recharts, 6 months)
- Export PDF button

---

QR GENERATOR SCREEN:
- PG Name + UPI ID (editable)
- Large QR code (white background card)
- Optional fixed amount field
- Buttons: Download QR | Share QR | Copy UPI Link
- Per-tenant QR toggle with tenant selector

---

PAYMENT STATUS SCREEN:
- Search bar + month filter
- Master list: room | name | amount | status | last paid | days overdue
- Color: green=paid | amber=due soon | red=overdue
- Summary chips row: 21 Total | 15 Paid | 4 Pending | 2 Overdue

---

CASH FLOW SCREEN:
- Period tabs: Weekly | Monthly | Quarterly
- Line chart: Income (purple) vs Expense (red) — recharts
- Net cash flow bar chart
- Metrics row: Avg Income | Avg Expense | Best Month | Worst Month
- Chronological transaction timeline below

---

ROOM PROFITABILITY SCREEN:
- Horizontal bar chart per room (recharts)
- Room list: room | tenant | rent | occupancy % | profit score badge
- Vacancy cost alert: "Room 3A vacant 45 days = ₹8,250 lost"

---

SETTINGS SCREEN:
Sections:
- PG Profile: name, address, total rooms, type (Boys/Girls/Co-ed)
- Payment: UPI ID, bank account, rent due date
- Notifications: rent reminder (ON/OFF + days), complaints, move-outs
- Account: name, phone, photo, change password, Logout (red)

---

MOCK DATA (use throughout all screens):
- PG: Sunrise PG, Koramangala, Bengaluru
- Owner: Rajesh Kumar, 9876543210
- 24 rooms (4A–6D), 21 occupied, 3 vacant
- Tenants: Arjun Kumar (4A ₹6,500), Priya Sharma (4B ₹5,500), 
  Karthik Reddy (5A ₹7,000), Sneha Nair (5B ₹6,000), 
  Amit Singh (6A ₹8,000) — fill remaining rooms similarly
- 6 months of payment history: mix of paid/pending/overdue
- Expenses: Electricity ₹14,700 | Maintenance ₹10,500 | 
  Salary ₹8,400 | Internet ₹3,500 | Other ₹4,900

---

TECHNICAL REQUIREMENTS:
- All owner files go in src/app/pages/owner/
- All routes added to src/app/routes.ts under /owner/*
- Create/update src/app/pages/owner/OwnerLayout.tsx with OwnerBottomNav
- Create src/app/pages/owner/OwnerBottomNav.tsx (5-tab nav)
- GlassCard style: bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4
- Wrap all charts in error boundary / try-catch
- Navigation: use existing router/state system
- DO NOT touch any tenant/discovery/seeker screens — keep them 100% as-is
- Indian number format for all currency: ₹X,XX,XXX
- All interactive elements: 200ms ease transitions
- Tapping back always returns to previous screen

Please implement all 20 screens now, starting with OwnerLayout + 
OwnerBottomNav, then OwnerHome, then the rest in order.