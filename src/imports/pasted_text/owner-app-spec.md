I want to completely replace and upgrade the Owner side of this app to match a 
premium PG management system. Here is the full spec — please implement every 
screen listed below exactly as described.

---

## DESIGN SYSTEM (apply to ALL owner screens)

- Background: deep dark gradient — `#0A0A1A` to `#1A1040` (deep navy/purple-black)
- Primary accent: bright purple `#8B5CF6` / violet `#7C3AED`
- Secondary accent: cyan/teal `#06B6D4`
- Success: `#10B981` (emerald green)
- Warning: `#F59E0B` (amber)
- Danger: `#EF4444` (red)
- Text primary: white `#FFFFFF`
- Text secondary: `rgba(255,255,255,0.6)`
- Cards: glassmorphism — `rgba(255,255,255,0.05)` background, `rgba(255,255,255,0.1)` border, `backdrop-blur-xl`
- All cards use `rounded-2xl` and subtle `shadow-lg`
- Font: use existing font stack, headings bold/semibold, body regular
- Bottom nav: 5 tabs — Home, Rooms, Finance, Reports, More
- All screens wrapped in a phone frame with dark background
- Smooth navigation between all screens using React state (currentScreen)

---

## OWNER BOTTOM NAV (OwnerBottomNav)

5 tabs with icons and labels:
1. 🏠 Home → `owner-home`
2. 🛏 Rooms → `pg-dashboard`  
3. 💰 Finance → `rent-overview`
4. 📊 Reports → `cash-flow`
5. ☰ More → show a drawer/menu with: Announcements, Complaints, Move-Outs, Settings, QR Generator

Active tab: purple highlight with glow. Inactive: muted white.

---

## SCREEN 1: OwnerHome (`/owner-home`)

Header:
- Top bar: "Good Morning, Rajesh 👋" left, notification bell + avatar right
- Subtitle: "Sunrise PG — 24 rooms"

Stats row (4 glass cards in 2x2 grid):
- Total Rooms: 24 | Occupied: 21 | Vacant: 3
- Monthly Revenue: ₹1,26,000
- Pending Dues: ₹18,500 (in red/amber)
- Expenses This Month: ₹42,000

Quick Actions (horizontal scroll, pill buttons with icons):
- 💵 Collect Rent → `cash-payment`
- 📦 Bulk Pay → `bulk-payments`
- ➕ Add Tenant → opens add tenant modal
- 📢 Announce → `announcements`
- 🔧 Complaint → `complaints`
- 📤 Move-Out → `move-outs`

Recent Activity section (last 5 items):
- Each item: avatar circle with initials, name, action, time, amount badge
- Types: "Paid Rent ₹5,500", "Raised Complaint", "Move-Out Request", "Joined Room 4B"
- Items are tappable → navigate to relevant screen

Occupancy visual: horizontal bar showing 21/24 rooms filled, color: purple→cyan gradient

---

## SCREEN 2: PGDashboard (`/pg-dashboard`)

Header: "Rooms" with search bar

Filter tabs: All | Occupied | Vacant | Maintenance

Room Grid (2 columns):
Each room card (glass card):
- Room number large: "4B"
- Status badge: Occupied (green) / Vacant (gray) / Maintenance (amber)
- Tenant name if occupied: "Arjun Kumar"
- Rent amount: ₹5,500/mo
- Days since last payment indicator
- Tap → navigate to RoomDetail

Floating + button: Add new room

---

## SCREEN 3: RoomDetail (`/room-detail`)

Back button header + "Room 4B"

Room info card:
- Floor, capacity, amenities chips (AC, WiFi, Attached Bath)
- Status badge

Current Tenant section (if occupied):
- Avatar, Name, Phone (tap to call), Move-in date
- Advance paid, Monthly rent
- Payment status badge: "Paid" (green) / "Pending" (amber) / "Overdue" (red)
- Buttons: View Full Profile | Collect Rent | Raise Issue

Payment History mini-list (last 3 months):
- Month, amount, date, method (Cash/UPI), status icon

Action buttons row:
- Edit Room | Mark Vacant | Generate QR

---

## SCREEN 4: TenantDetail (`/tenant-detail`)

Full tenant profile:
- Large avatar circle with initials (colored)
- Name, Phone, Email
- Room number badge

Details grid:
- Move-in Date | Advance Paid | Monthly Rent | Lock-in Period

Payment ledger (scrollable):
- Each row: month, due date, paid date, amount, method, status (color-coded)
- Running balance if any dues pending

Document section:
- ID Proof uploaded ✓ | Agreement ✓ | Photo ✓ (with status icons)

Action bar: Call | WhatsApp | Collect Rent | Initiate Move-Out

---

## SCREEN 5: CashPayment (`/cash-payment`)

Title: "Record Cash Payment"

Tenant selector (searchable dropdown): show name + room
Amount field: pre-filled with monthly rent, editable
Month selector: dropdown (current month default)
Payment date: date picker (today default)
Payment method chips: Cash | UPI | Bank Transfer | Cheque
Notes field: optional

"Record Payment" button → shows success animation with confetti

Recent payments list below (last 10 entries)

---

## SCREEN 6: BulkPayments (`/bulk-payments`)

Title: "Bulk Rent Collection"

Month/Year selector at top

List of ALL tenants with:
- Checkbox | Avatar | Name | Room | Amount | Status (Paid/Pending/Overdue)
- Color-coded status

"Select All Pending" button
"Mark Selected as Paid" CTA button (purple, sticky bottom)

Summary bar: X paid · Y pending · ₹Z collected this month

---

## SCREEN 7: RentOverview (`/rent-overview`)

Title: "Finance Overview"

Month tabs (last 6 months, scrollable)

Summary cards row:
- Expected: ₹1,26,000 | Collected: ₹1,07,500 | Pending: ₹18,500
- Collection rate: 85% shown as circular progress ring (purple)

Tenant payment status list:
- Each row: name, room, amount, due date, status badge, payment method icon
- Overdue rows: red left border highlight
- Tappable → go to TenantDetail

Filter: All | Paid | Pending | Overdue

Export button (top right): "Export CSV"

---

## SCREEN 8: ExpenseEntry (`/expense-entry`)

Title: "Add Expense"

Category chips (horizontal scroll, select one):
Electricity ⚡ | Water 💧 | Maintenance 🔧 | Salary 👷 | Internet 📡 | Groceries 🛒 | Other

Amount field
Date picker
Description / notes
Attach receipt button (camera icon)
Split across rooms toggle (optional)

"Save Expense" button

---

## SCREEN 9: ExpensesDashboard (`/expenses-dashboard`)

Title: "Expenses"

Month selector tabs

Total expenses card: ₹42,000 this month

Donut/pie chart by category (use recharts):
- Electricity 35% | Maintenance 25% | Salary 20% | Other 20%

Expense list below chart:
- Icon + category + description + date + amount
- Swipe or long-press to delete (with confirm dialog)

Add expense FAB button (+ icon, purple)

---

## SCREEN 10: Announcements (`/announcements`)

Title: "Announcements"

Create announcement card (top):
- Text input: "Write announcement..."
- Target: All Tenants / Specific Floor / Specific Room
- Priority: Normal | Urgent (toggle)
- "Send" button → shows sent animation

Past announcements list:
Each card:
- Date + time
- Message content
- "Sent to: All 21 tenants" label
- Read count: "18/21 read" with progress
- Urgent ones: amber left border

---

## SCREEN 11: Complaints (`/complaints`)

Title: "Complaints"

Filter tabs: All | Open | In Progress | Resolved

Each complaint card:
- Room number badge (colored)
- Tenant name + time submitted
- Category: Plumbing 🔧 / Electrical ⚡ / WiFi 📡 / Other
- Short description text
- Status badge with color
- Priority: High (red) / Medium (amber) / Low (green)
- Tap → opens complaint detail with status update buttons:
  - "Mark In Progress" | "Mark Resolved"
  - Notes/response field

Unread complaints counter on tab badge

---

## SCREEN 12: MoveOuts (`/move-outs`)

Title: "Move-Outs"

Tabs: Pending Requests | Completed

Pending list:
Each card:
- Tenant avatar + name + room
- Move-out requested date
- Notice period status (15 days remaining)
- Advance refund due: ₹20,000
- Buttons: "Approve" (green) | "Reject" (red) | "View Details"

Move-out detail (on tap):
- Full checklist: Room inspected ✓ | Keys returned ✓ | Dues cleared ✓
- Advance refund breakdown
- Final settlement button

---

## SCREEN 13: BalanceSheet (`/balance-sheet`)

Title: "Balance Sheet"

Period selector: This Month | Last 3M | Last 6M | This Year

Income section:
- Rent Collected: ₹1,07,500
- Advance Received: ₹20,000
- Other Income: ₹2,000
- **Total Income: ₹1,29,500** (green)

Expenses section:
- Electricity: ₹14,700
- Maintenance: ₹10,500
- Salary: ₹8,400
- Internet: ₹3,500
- Other: ₹4,900
- **Total Expenses: ₹42,000** (red)

**Net Profit: ₹87,500** (large, green, prominent)

Bar chart (recharts): Income vs Expenses per month (last 6 months)

Export PDF button

---

## SCREEN 14: QRGenerator (`/qr-generator`)

Title: "Payment QR"

PG Name display: "Sunrise PG"
UPI ID input: pre-filled, editable
Generated QR code (large, centered, white background card)
Amount field: optional fixed amount

Buttons:
- "Download QR" | "Share QR" | "Copy UPI Link"

Personalized QR per tenant toggle: ON/OFF
If ON: tenant selector, generates unique QR with amount pre-filled

---

## SCREEN 15: PaymentStatus (`/payment-status`)

Title: "Payment Status"

Search bar (filter by name/room)

Month filter

Master list with:
- Room number | Name | Rent Amount | Status | Last Paid Date | Days Overdue

Color coding:
- Green: Paid this month
- Amber: Due soon (within 5 days)  
- Red: Overdue

Summary chips: 21 Total | 15 Paid | 4 Pending | 2 Overdue

Tap row → go to TenantDetail

---

## SCREEN 16: CashFlow (`/cash-flow`)

Title: "Cash Flow"

Period tabs: Weekly | Monthly | Quarterly

Line chart (recharts): Income line (purple) vs Expense line (red) over time

Net cash flow bar chart below

Key metrics row:
- Avg Monthly Income | Avg Monthly Expense | Best Month | Worst Month

Transaction timeline (bottom): 
- Chronological list of all income/expense entries with icons

---

## SCREEN 17: RoomProfitability (`/room-profitability`)

Title: "Room Profitability"

Horizontal bar chart: each room's rent contribution (recharts)

Room list with profitability score:
Each row:
- Room number | Tenant | Rent | Occupancy % (last 12mo) | Profit score badge
- Color coded: Green (high) / Amber (medium) / Red (low/vacant)

Vacancy cost indicator: "Room 3A has been vacant 45 days = ₹8,250 lost"

---

## SCREEN 18: Settings (`/settings`)

Sections:
**PG Profile**
- PG Name, Address, Total Rooms, PG Type (Boys/Girls/Co-ed)
- Edit button

**Payment Settings**
- UPI ID, Bank Account, Rent Due Date (1st-28th picker)

**Notifications**
- Rent reminder: ON/OFF + days before (3/5/7 days)
- Complaint alerts: ON/OFF
- Move-out reminders: ON/OFF

**Account**
- Owner name, phone, profile photo
- Change Password
- Logout (red)

---

## ROUTING (routes.ts)

Add all these routes under `/owner/`:
- `/owner/home` → OwnerHome
- `/owner/pg-dashboard` → PGDashboard  
- `/owner/room-detail` → RoomDetail
- `/owner/tenant-detail` → TenantDetail
- `/owner/cash-payment` → CashPayment
- `/owner/bulk-payments` → BulkPayments
- `/owner/rent-overview` → RentOverview
- `/owner/expense-entry` → ExpenseEntry
- `/owner/expenses-dashboard` → ExpensesDashboard
- `/owner/announcements` → Announcements
- `/owner/complaints` → Complaints
- `/owner/move-outs` → MoveOuts
- `/owner/balance-sheet` → BalanceSheet
- `/owner/qr-generator` → QRGenerator
- `/owner/payment-status` → PaymentStatus
- `/owner/cash-flow` → CashFlow
- `/owner/room-profitability` → RoomProfitability
- `/owner/settings` → Settings

All owner screens use OwnerLayout wrapping OwnerBottomNav.

---

## MOCK DATA

Use realistic Indian PG data:
- PG Name: Sunrise PG, Koramangala, Bengaluru
- Owner: Rajesh Kumar
- 24 rooms (4A–6D), 21 occupied, 3 vacant
- Tenants: mix of Indian names, rents ₹4,500–₹8,000
- Expense data for last 6 months
- Payment history showing mix of paid/pending/overdue

---

## TECHNICAL NOTES

- All new owner screens go in `src/app/pages/owner/` (match existing file structure)
- Wrap charts in try/catch in case recharts fails
- All navigation uses the existing router/state system
- Keep existing tenant/discovery side 100% untouched
- GlassCard component: `bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl`
- Animations: use CSS transitions (200ms ease) for all interactive elements
- All monetary values formatted as ₹X,XX,XXX (Indian number format)