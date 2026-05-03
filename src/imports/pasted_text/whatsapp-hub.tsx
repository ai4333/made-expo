Please implement the WhatsApp Automation Hub feature. 
Here is the complete TypeScript/React code to use as the exact implementation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — Create this new file exactly:
Path: src/app/pages/owner/WhatsAppHub.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```tsx
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────
interface PendingConfirmation {
  id: number;
  name: string;
  initials: string;
  color: string;
  room: string;
  amount: number;
  time: string;
}

interface ActivityLog {
  id: number;
  type: "sent" | "received" | "alert";
  message: string;
  recipient: string;
  time: string;
  status: "delivered" | "read" | "replied" | "pending";
}

interface AutomationConfig {
  rentReminder: boolean;
  paymentAlert: boolean;
  cashConfirm: boolean;
}

// ─── Constants ────────────────────────────────────────────
const WA_GREEN = "#25D366";
const GLASS = "bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl";

const PENDING_CONFIRMATIONS: PendingConfirmation[] = [
  { id: 1, name: "Karthik Reddy", initials: "KR", color: "#8B5CF6",
    room: "5A", amount: 7000, time: "2 hrs ago" },
  { id: 2, name: "Ravi Sharma", initials: "RS", color: "#06B6D4",
    room: "4D", amount: 5500, time: "5 hrs ago" },
];

const ACTIVITY_LOG: ActivityLog[] = [
  { id: 1, type: "sent", message: "Rent reminder sent",
    recipient: "Deepak Rao (Room 3A)", time: "2 hrs ago", status: "delivered" },
  { id: 2, type: "alert", message: "Payment alert — Arjun paid ₹6,500",
    recipient: "You", time: "2 hrs ago", status: "read" },
  { id: 3, type: "received", message: "Cash claim received",
    recipient: "Karthik Reddy", time: "3 hrs ago", status: "replied" },
  { id: 4, type: "sent", message: "Rent reminder sent",
    recipient: "Ravi Sharma (Room 4D)", time: "9 hrs ago", status: "read" },
  { id: 5, type: "sent", message: "Broadcast sent",
    recipient: "All 21 tenants", time: "1 day ago", status: "delivered" },
  { id: 6, type: "sent", message: "Rent reminder sent",
    recipient: "Meena Iyer (Room 3C)", time: "1 day ago", status: "delivered" },
];

// ─── WhatsApp SVG Icon ─────────────────────────────────────
const WAIcon = ({ size = 24, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15
      -.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075
      -.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059
      -.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52
      .149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52
      -.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51
      -.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372
      -.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074
      .149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625
      .712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413
      .248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.856L.057 23.882
      l6.204-1.629A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z
      m0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.213-3.681.967.983-3.587
      -.234-.373A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182
      S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

// ─── Toast Component ──────────────────────────────────────
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  setTimeout(onClose, 3000);
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50
      bg-emerald-500 text-white text-sm font-medium
      px-4 py-2 rounded-full shadow-lg
      animate-bounce-in whitespace-nowrap">
      {message}
    </div>
  );
};

// ─── Config Bottom Sheet ──────────────────────────────────
const ConfigSheet = ({
  type, onClose
}: {
  type: "rentReminder" | "paymentAlert" | "cashConfirm";
  onClose: () => void;
}) => {
  const configs = {
    rentReminder: {
      title: "⏰ Rent Reminder Settings",
      preview1Label: "Message tenant receives:",
      preview1: `Hi {Name} 👋\nYour rent of ₹{amount} for Room {X} ({sharing}) at Sunrise PG is due.\nPlease pay today to avoid reminders.\n— Rajesh Kumar`,
    },
    paymentAlert: {
      title: "✅ Payment Alert Settings",
      preview1Label: "Alert you receive on payment:",
      preview1: `💰 Payment Received!\n{Name} paid ₹{amount}\nRoom {X} • {sharing} • Sunrise PG\nDate: {date}\nMethod: UPI ✓`,
    },
    cashConfirm: {
      title: "💵 Cash Confirm Flow",
      preview1Label: "Step 1 — Tenant receives:",
      preview1: `Hi {Name} 👋\nRent reminder: ₹{amount} for Room {X}\n\nReply with:\n1️⃣ Pay now (UPI link)\n2️⃣ Already paid cash\n3️⃣ Remind me tomorrow`,
    },
  };
  const c = configs[type];

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose} />
      <div className="relative w-full bg-[#1A1040] border border-white/10
        rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto">
        {/* Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
        <h3 className="text-white font-semibold text-base mb-4">{c.title}</h3>

        {/* Start day / time pickers for rent reminder */}
        {type === "rentReminder" && (
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-white/50 text-xs mb-1 block">Start Day</label>
              <select className="w-full bg-white/10 border border-white/10
                rounded-xl px-3 py-2 text-white text-sm">
                {[1,2,3,4,5].map(d => (
                  <option key={d} value={d}>{d}st of month</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-white/50 text-xs mb-1 block">Morning</label>
              <input type="time" defaultValue="09:00"
                className="w-full bg-white/10 border border-white/10
                rounded-xl px-3 py-2 text-white text-sm" />
            </div>
            <div className="flex-1">
              <label className="text-white/50 text-xs mb-1 block">Evening</label>
              <input type="time" defaultValue="19:00"
                className="w-full bg-white/10 border border-white/10
                rounded-xl px-3 py-2 text-white text-sm" />
            </div>
          </div>
        )}

        {/* Message preview bubble */}
        <p className="text-white/50 text-xs mb-2">{c.preview1Label}</p>
        <div className="bg-[#25D366]/10 border border-[#25D366]/30
          rounded-2xl rounded-tl-sm p-3 mb-4">
          <p className="text-white/80 text-xs leading-relaxed whitespace-pre-line">
            {c.preview1}
          </p>
        </div>

        {/* Cash confirm step 2 */}
        {type === "cashConfirm" && (
          <>
            <p className="text-white/50 text-xs mb-2">
              Step 2 — Owner receives after "Already paid cash":
            </p>
            <div className="bg-amber-500/10 border border-amber-500/30
              rounded-2xl rounded-tl-sm p-3 mb-4">
              <p className="text-white/80 text-xs leading-relaxed whitespace-pre-line">
                {`⚠️ Cash Claim\n{Name} says he paid ₹{amount} cash\nRoom {X} • Sunrise PG\n\nReply:\n✅ YES — confirm & stop reminders\n❌ NO — continue reminders`}
              </p>
            </div>
            <p className="text-white/40 text-xs mb-4">
              Owner replies YES/NO directly in WhatsApp.
              Dashboard updates automatically.
            </p>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold text-sm text-white"
          style={{ backgroundColor: WA_GREEN }}>
          Save Settings
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────
export default function WhatsAppHub({ onNavigate }: { onNavigate: (route: string) => void }) {
  const [automations, setAutomations] = useState<AutomationConfig>({
    rentReminder: true,
    paymentAlert: true,
    cashConfirm: true,
  });
  const [pending, setPending] = useState<PendingConfirmation[]>(PENDING_CONFIRMATIONS);
  const [toast, setToast] = useState<string | null>(null);
  const [configSheet, setConfigSheet] = useState
    "rentReminder" | "paymentAlert" | "cashConfirm" | null
  >(null);
  const [quickSendOpen, setQuickSendOpen] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  const handleConfirm = (id: number, confirmed: boolean) => {
    const item = pending.find(p => p.id === id);
    setPending(prev => prev.filter(p => p.id !== id));
    if (confirmed) {
      showToast(`✓ ${item?.name}'s payment confirmed. Reminders stopped.`);
    } else {
      showToast(`Reminders will continue for ${item?.name}`);
    }
  };

  const toggleAutomation = (key: keyof AutomationConfig) => {
    setAutomations(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatAmount = (n: number) =>
    "₹" + n.toLocaleString("en-IN");

  const statusIcon = (status: ActivityLog["status"]) => {
    if (status === "delivered") return <span className="text-white/40">✓✓</span>;
    if (status === "read") return <span style={{ color: "#34B7F1" }}>✓✓</span>;
    if (status === "replied") return <span className="text-emerald-400">💬</span>;
    return <span className="text-white/30">✓</span>;
  };

  return (
    <div className="min-h-screen text-white overflow-y-auto pb-24"
      style={{ background: "linear-gradient(135deg, #0A0A1A 0%, #1A1040 100%)" }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button
          onClick={() => onNavigate("/owner/home")}
          className="w-9 h-9 flex items-center justify-center
            bg-white/10 rounded-full text-white">
          ←
        </button>
        <div className="flex items-center gap-2">
          <WAIcon size={22} color={WA_GREEN} />
          <span className="text-white font-bold text-base">WhatsApp Hub</span>
        </div>
        <div className="flex items-center gap-1 bg-emerald-500/20
          border border-emerald-500/30 rounded-full px-3 py-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium">Active</span>
        </div>
      </div>

      <div className="px-4 space-y-5">

        {/* ── Connection Card ── */}
        <div className={`${GLASS} p-4 flex items-center gap-3`}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: WA_GREEN }}>
            <WAIcon size={26} color="#fff" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              WhatsApp Business Connected
            </p>
            <p className="text-white/50 text-xs">+91 98765 43210 — Rajesh Kumar</p>
          </div>
          <button className="text-xs border border-white/20 text-white/70
            px-3 py-1.5 rounded-lg">
            Manage
          </button>
        </div>

        {/* ── Pending Confirmations ── */}
        {pending.length > 0 && (
          <div className={`${GLASS} p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">⚠️</span>
              <p className="text-amber-400 font-semibold text-sm">
                {pending.length} Cash Claim{pending.length > 1 ? "s" : ""} Awaiting Confirmation
              </p>
            </div>
            <div className="space-y-3">
              {pending.map(item => (
                <div key={item.id}
                  className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center
                    text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: item.color }}>
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-white/50 text-xs">
                      Room {item.room} • {formatAmount(item.amount)} • {item.time}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleConfirm(item.id, true)}
                      className="bg-emerald-500/20 border border-emerald-500/40
                        text-emerald-400 text-xs px-2.5 py-1.5 rounded-lg font-medium">
                      ✅ Yes
                    </button>
                    <button
                      onClick={() => handleConfirm(item.id, false)}
                      className="bg-red-500/20 border border-red-500/40
                        text-red-400 text-xs px-2.5 py-1.5 rounded-lg font-medium">
                      ❌ No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Automation Cards ── */}
        <div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">
            Automations
          </p>
          <div className="space-y-3">

            {/* Card 1: Rent Reminder */}
            <div className={`${GLASS} p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔔</span>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Rent Reminder Loop
                    </p>
                    <span className="text-xs bg-white/10 text-white/50
                      px-2 py-0.5 rounded-full">
                      Outbound Only
                    </span>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggleAutomation("rentReminder")}
                  className={`w-11 h-6 rounded-full transition-all duration-300
                    flex items-center px-0.5
                    ${automations.rentReminder ? "justify-end" : "justify-start"}
                  `}
                  style={{
                    backgroundColor: automations.rentReminder ? WA_GREEN : "rgba(255,255,255,0.15)"
                  }}>
                  <div className="w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Auto-remind unpaid tenants every morning & evening from
                the 1st until rent is marked paid
              </p>
              <div className="flex items-center justify-between">
                <p className="text-amber-400 text-xs">
                  Last sent: Today 9:00 AM • 4 tenants pending
                </p>
                <button
                  onClick={() => setConfigSheet("rentReminder")}
                  className="text-xs border border-white/20 text-white/60
                    px-2.5 py-1 rounded-lg">
                  Configure
                </button>
              </div>
            </div>

            {/* Card 2: Payment Alert */}
            <div className={`${GLASS} p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Payment Received Alert
                    </p>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400
                      px-2 py-0.5 rounded-full">
                      Instant • Outbound
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleAutomation("paymentAlert")}
                  className={`w-11 h-6 rounded-full transition-all duration-300
                    flex items-center px-0.5
                    ${automations.paymentAlert ? "justify-end" : "justify-start"}
                  `}
                  style={{
                    backgroundColor: automations.paymentAlert ? WA_GREEN : "rgba(255,255,255,0.15)"
                  }}>
                  <div className="w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Owner gets WhatsApp alert the moment any tenant pays digitally
              </p>
              <div className="flex items-center justify-between">
                <p className="text-emerald-400 text-xs">
                  Last triggered: 2 hrs ago — Arjun Kumar ₹6,500
                </p>
                <button
                  onClick={() => setConfigSheet("paymentAlert")}
                  className="text-xs border border-white/20 text-white/60
                    px-2.5 py-1 rounded-lg">
                  Configure
                </button>
              </div>
            </div>

            {/* Card 3: Cash Confirm */}
            <div className={`${GLASS} p-4`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💵</span>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Cash Confirm Flow
                    </p>
                    <span className="text-xs bg-blue-500/20 text-blue-400
                      px-2 py-0.5 rounded-full">
                      Two-Way Interactive
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleAutomation("cashConfirm")}
                  className={`w-11 h-6 rounded-full transition-all duration-300
                    flex items-center px-0.5
                    ${automations.cashConfirm ? "justify-end" : "justify-start"}
                  `}
                  style={{
                    backgroundColor: automations.cashConfirm ? WA_GREEN : "rgba(255,255,255,0.15)"
                  }}>
                  <div className="w-5 h-5 bg-white rounded-full shadow" />
                </button>
              </div>
              <p className="text-white/50 text-xs leading-relaxed mb-3">
                Tenant claims cash paid → you confirm YES/NO →
                dashboard & reminders update automatically
              </p>
              <div className="flex items-center justify-between">
                {pending.length > 0 ? (
                  <span className="text-xs bg-amber-500/20 text-amber-400
                    border border-amber-500/30 px-2 py-0.5 rounded-full">
                    {pending.length} pending confirmations
                  </span>
                ) : (
                  <p className="text-white/40 text-xs">No pending claims</p>
                )}
                <button
                  onClick={() => setConfigSheet("cashConfirm")}
                  className="text-xs border border-white/20 text-white/60
                    px-2.5 py-1 rounded-lg">
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quick Send ── */}
        <div>
          <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">
            Quick Send
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📨", label: "Send Rent Reminder", sub: "→ WhatsApp", color: "#8B5CF6" },
              { icon: "📢", label: "Broadcast Message", sub: "→ All Tenants", color: "#06B6D4" },
              { icon: "💳", label: "Share Payment Link", sub: "→ WhatsApp", color: WA_GREEN },
              { icon: "📄", label: "Send Receipt", sub: "→ Last payment", color: "#F59E0B" },
            ].map((item, i) => (
              <button key={i}
                onClick={() => showToast(`${item.label} — opening WhatsApp...`)}
                className={`${GLASS} p-4 text-left active:scale-95 transition-transform`}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <p className="text-white font-medium text-xs leading-tight">{item.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{item.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Activity Log ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
              Recent Activity
            </p>
            <span className="text-white/30 text-xs">Last 7 days</span>
          </div>
          <div className={`${GLASS} divide-y divide-white/5`}>
            {ACTIVITY_LOG.map(log => (
              <div key={log.id} className="flex items-center gap-3 p-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center
                  flex-shrink-0"
                  style={{ backgroundColor: `${WA_GREEN}22` }}>
                  <WAIcon size={14} color={WA_GREEN} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">
                    {log.message}
                  </p>
                  <p className="text-white/40 text-xs truncate">
                    {log.recipient}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/30 text-xs">{log.time}</p>
                  <div className="mt-0.5">{statusIcon(log.status)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Config Bottom Sheet ── */}
      {configSheet && (
        <ConfigSheet
          type={configSheet}
          onClose={() => setConfigSheet(null)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — Update src/app/routes.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Add this route entry:
  { path: "/owner/whatsapp-hub", component: "WhatsAppHub" }
Import: import WhatsAppHub from "./pages/owner/WhatsAppHub"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — Update OwnerDashboard.tsx Quick Actions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
In the Quick Actions horizontal scroll section:
- REMOVE the "Services" button (any button labeled 
  Services, Vendors, or similar)
- ADD this new button in its place:
```tsx
<button
  onClick={() => onNavigate("/owner/whatsapp-hub")}
  className="flex flex-col items-center gap-1.5 flex-shrink-0">
  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
    style={{ backgroundColor: "#25D366" }}>
    {/* WhatsApp SVG */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967
        -.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164
        -.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475
        -.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606
        .134-.133.298-.347.446-.52.149-.174.198-.298.298-.497
        .099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207
        -.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01
        -.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479
        0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487
        .709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118
        .571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413
        -.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.856
        L.057 23.882l6.204-1.629A11.945 11.945 0 0012 24
        c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818
        a9.818 9.818 0 01-5.006-1.369l-.36-.213-3.681.967.983-3.587
        -.234-.373A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182
        12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
    </svg>
  </div>
  <span className="text-white/70 text-xs">WhatsApp</span>
</button>
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTANT RULES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Use the EXACT TypeScript code above — do not simplify or rewrite it
- The onNavigate prop must use whatever navigation method 
  already exists in this project (useNavigate hook or router push)
- Do NOT touch any tenant/discovery/seeker screens
- WhatsApp green = #25D366 throughout
- All toggle switches must work with useState
- Pending confirmation YES/NO must update state in real-time
- Config sheets open as bottom sheets (slide up from bottom)
- Toast must auto-dismiss after 3 seconds