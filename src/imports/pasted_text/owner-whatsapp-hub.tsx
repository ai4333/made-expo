TASK: Replace the "Services" quick action button on the Owner Home screen 
with a "WhatsApp" button, and build a full WhatsApp Automation Hub screen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 1 — UPDATE OWNER HOME QUICK ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In OwnerHome.tsx, find the Quick Actions horizontal scroll section.
REMOVE the "Services" button entirely.
REPLACE it with a WhatsApp button:

  Icon : WhatsApp logo (use a green circle with "W" or 💬 icon)
  Label: "WhatsApp"
  Color: #25D366 (WhatsApp green) with white icon
  Style: same pill/card style as other quick action buttons
  OnTap: navigate to /owner/whatsapp-hub

The updated Quick Actions row should be:
  💵 Collect Rent → /owner/cash-payment
  📦 Bulk Pay     → /owner/bulk-payments
  ➕ Add Tenant   → add tenant modal
  📢 Announce     → /owner/announcements
  💬 WhatsApp     → /owner/whatsapp-hub   ← NEW (replaces Services)
  📤 Move-Out     → /owner/move-outs

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 2 — NEW SCREEN: WhatsApp Automation Hub
File: src/app/pages/owner/WhatsAppHub.tsx
Route: /owner/whatsapp-hub
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESIGN:
- Same dark glassmorphism theme as all owner screens
- Background: #0A0A1A to #1A1040
- Cards: bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl
- WhatsApp green (#25D366) used as accent for this screen's highlights

━━━━━━━━━━━━━━━━
HEADER
━━━━━━━━━━━━━━━━
- Back arrow ← on left → goes back to /owner/home
- Center: WhatsApp logo icon (green) + "WhatsApp Hub" title
- Right: Green dot indicator "Connected" (or gray "Not Connected")
  with a small settings gear icon

━━━━━━━━━━━━━━━━
SECTION 1 — CONNECTION STATUS CARD (top of screen)
━━━━━━━━━━━━━━━━
Glass card with:
- Left: large WhatsApp green circle icon
- Title: "WhatsApp Business Connected"
- Subtitle: "+91 98765 43210 — Rajesh Kumar"
- Status pill: "● Active" in green
- Right: "Manage" button (outline, small)

If not connected, show:
- Title: "Connect WhatsApp Business"
- Subtitle: "Link your number to enable automation"
- CTA button: "Connect Now →" (green, full width)

━━━━━━━━━━━━━━━━
SECTION 2 — AUTOMATION CARDS (the 3 core automations)
━━━━━━━━━━━━━━━━

Each automation is a glass card with:
- Toggle (ON/OFF) in top right
- Icon + Title + Description
- Status badge showing last triggered time or "Never triggered"
- "Configure" button → opens config bottom sheet

--- CARD 1: Rent Reminder Loop ---
Icon : 🔔 (amber colored)
Title: "Rent Reminder Loop"
Badge: "Outbound Only" (gray pill)
Desc : "Auto-remind unpaid tenants every morning & evening from the 1st until paid"
Toggle: ON by default
Status: "Last sent: Today 9:00 AM • 4 tenants pending"
Config sheet (when "Configure" tapped):
  - Start day: [1st of month] (number picker 1–5)
  - Morning time: [9:00 AM] (time picker)
  - Evening time: [7:00 PM] (time picker)  
  - Message preview (read-only, styled like a WhatsApp bubble):
    "Hi {Name} 👋
     Your rent of ₹{amount} for Room {X} ({sharing}) 
     at Sunrise PG is due.
     Please pay today to avoid reminders.
     — Rajesh Kumar"
  - "Save Settings" button (green)

--- CARD 2: Payment Received Alert ---
Icon : ✅ (green colored)  
Title: "Payment Received Alert"
Badge: "Instant • Outbound Only" (green pill)
Desc : "Owner gets WhatsApp alert the moment any tenant pays digitally"
Toggle: ON by default
Status: "Last triggered: 2 hrs ago — Arjun Kumar ₹6,500"
Config sheet:
  - Alert recipient: Owner number (pre-filled, editable)
  - Message preview (WhatsApp bubble style):
    "💰 Payment Received!
     Arjun Kumar paid ₹6,500
     Room 4B • 2-sharing • Sunrise PG
     Date: 1 Mar 2026
     Method: UPI ✓"
  - "Save Settings" button

--- CARD 3: Cash Confirm Flow ---
Icon : 💵 (blue colored)
Title: "Cash Confirm Flow"
Badge: "Two-Way Interactive" (blue pill)
Desc : "Tenant claims cash paid → you confirm YES/NO → dashboard updates automatically"
Toggle: ON by default
Status: "2 pending confirmations" (amber badge if any pending)
Config sheet:
  - Message preview — STEP 1 (tenant receives):
    WhatsApp bubble:
    "Hi Karthik 👋 
     Rent reminder: ₹7,000 for Room 5A
     
     Reply with:
     1️⃣ Pay now (UPI link)
     2️⃣ Already paid cash
     3️⃣ Remind me tomorrow"
  - Message preview — STEP 2 (owner receives after tenant picks option 2):
    WhatsApp bubble:
    "⚠️ Cash Claim
     Karthik Reddy says he paid ₹7,000 cash
     Room 5A • Sunrise PG
     
     Reply:
     ✅ YES — confirm & stop reminders
     ❌ NO — continue reminders"
  - Note text: "Owner replies YES/NO directly in WhatsApp. 
    Dashboard updates automatically."
  - "Save Settings" button

━━━━━━━━━━━━━━━━
SECTION 3 — PENDING CONFIRMATIONS (show only if count > 0)
━━━━━━━━━━━━━━━━
Amber header card: "⚠️ 2 Cash Claims Awaiting Your Confirmation"

List of pending confirmations, each row:
- Avatar circle with initials (colored)
- Name + Room + Amount
- "Claimed: 2 hrs ago" timestamp
- Two buttons: 
    ✅ Confirm Paid (green, tap → marks as Cash Paid in dashboard)
    ❌ Not Confirmed (red, tap → reminders resume)

When owner taps Confirm:
  - Row disappears with animation
  - Toast: "✓ Karthik's payment confirmed. Reminders stopped."
  - Show a simulated WhatsApp message that would be sent to tenant:
    "✅ Payment confirmed, Karthik! 
     ₹7,000 for March received.
     Thank you — Sunrise PG 🙏"

When owner taps Not Confirmed:
  - Row disappears with animation  
  - Toast: "Reminders will continue for Karthik"
  - Simulated WA to tenant:
    "We couldn't confirm your cash payment, Karthik.
     Please pay ₹7,000 or contact the owner directly."

━━━━━━━━━━━━━━━━
SECTION 4 — QUICK SEND (manual WhatsApp actions)
━━━━━━━━━━━━━━━━
Title: "Quick Send"
Subtitle: "Send WhatsApp messages manually"

4 action buttons in 2x2 grid (glass cards, tappable):

  📨 Send Rent Reminder    → opens tenant picker → sends reminder to selected
  📢 Broadcast Message     → text input + "All Tenants" target → send
  💳 Share Payment Link    → tenant picker → sends UPI link to tenant
  📄 Send Receipt          → tenant picker → sends last payment receipt

Each button: icon (colored) + label + "→ WhatsApp" small subtitle

━━━━━━━━━━━━━━━━
SECTION 5 — ACTIVITY LOG (bottom, scrollable)
━━━━━━━━━━━━━━━━
Title: "Recent Activity"
Subtitle: "Last 7 days"

Chronological list (most recent first):
Each row:
  - WA green dot icon on left
  - Message type + recipient name
  - Time ago
  - Status: Delivered ✓✓ (gray) / Read ✓✓ (blue) / Replied 💬

Sample log entries:
  ✓✓ Rent reminder sent → Deepak Rao (Room 3A) — 2 hrs ago — Delivered
  ✓✓ Payment alert → You (Arjun paid ₹6,500) — 2 hrs ago — Read
  💬 Cash claim received ← Karthik Reddy — 3 hrs ago — Awaiting reply
  ✓✓ Rent reminder sent → Ravi Sharma (Room 4D) — 9 hrs ago — Read
  ✓✓ Broadcast sent → All 21 tenants — 1 day ago — Delivered
  ✓✓ Rent reminder sent → Meena Iyer (Room 3C) — 1 day ago — Delivered

━━━━━━━━━━━━━━━━
STATE MANAGEMENT
━━━━━━━━━━━━━━━━
Use React useState for:
  - whatsappConnected: boolean (true by default for demo)
  - automations: { rentReminder: bool, paymentAlert: bool, cashConfirm: bool }
  - pendingConfirmations: array of { name, room, amount, time }
  - activeConfigSheet: string | null (which config sheet is open)
  - activityLog: array

Pending confirmations mock data:
  [
    { id: 1, name: "Karthik Reddy", room: "5A", amount: 7000, time: "2 hrs ago" },
    { id: 2, name: "Ravi Sharma", room: "4D", amount: 5500, time: "5 hrs ago" }
  ]

━━━━━━━━━━━━━━━━
ROUTING
━━━━━━━━━━━━━━━━
Add to routes.ts:
  /owner/whatsapp-hub → WhatsAppHub

WhatsAppHub is wrapped in OwnerLayout (has bottom nav).
Back button → /owner/home

DO NOT touch any tenant-side or discovery screens.