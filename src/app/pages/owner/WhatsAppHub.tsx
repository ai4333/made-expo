import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Settings, X } from "lucide-react";

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

// ─── Constants ─────────────────────────────────────────
const WA_GREEN = "#25D366";
const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

const PENDING_CONFIRMATIONS: PendingConfirmation[] = [
  { id: 1, name: "Karthik Reddy", initials: "KR", color: "#8B5CF6", room: "5A", amount: 7000, time: "2 hrs ago" },
  { id: 2, name: "Ravi Sharma", initials: "RS", color: "#06B6D4", room: "4D", amount: 5500, time: "5 hrs ago" },
];

const ACTIVITY_LOG: ActivityLog[] = [
  { id: 1, type: "sent",     message: "Rent reminder sent",          recipient: "Deepak Rao (Room 3A)",    time: "2 hrs ago",  status: "delivered" },
  { id: 2, type: "alert",    message: "Payment alert — Arjun paid ₹6,500", recipient: "You",             time: "2 hrs ago",  status: "read" },
  { id: 3, type: "received", message: "Cash claim received",          recipient: "Karthik Reddy",          time: "3 hrs ago",  status: "replied" },
  { id: 4, type: "sent",     message: "Rent reminder sent",          recipient: "Ravi Sharma (Room 4D)",  time: "9 hrs ago",  status: "read" },
  { id: 5, type: "sent",     message: "Broadcast sent",             recipient: "All 21 tenants",         time: "1 day ago",  status: "delivered" },
  { id: 6, type: "sent",     message: "Rent reminder sent",         recipient: "Meena Iyer (Room 3C)",   time: "1 day ago",  status: "delivered" },
];

// ─── WhatsApp SVG Icon ──────────────────────────────────
const WAIcon = ({ size = 24, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.856L.057 23.882l6.204-1.629A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.213-3.681.967.983-3.587-.234-.373A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

// ─── Toast ─────────────────────────────────────────────
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  setTimeout(onClose, 3000);
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-xl whitespace-nowrap"
      style={{ background: WA_GREEN }}>
      {message}
    </div>
  );
};

// ─── Toggle Switch ──────────────────────────────────────
const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
  <button
    onClick={onChange}
    className="w-11 h-6 rounded-full transition-all duration-300 flex items-center px-0.5 flex-shrink-0"
    style={{ background: value ? WA_GREEN : "#D1D5DB", justifyContent: value ? "flex-end" : "flex-start" }}
  >
    <div className="w-5 h-5 bg-white rounded-full shadow" />
  </button>
);

// ─── Config Bottom Sheet ────────────────────────────────
const ConfigSheet = ({
  type,
  onClose,
}: {
  type: "rentReminder" | "paymentAlert" | "cashConfirm";
  onClose: () => void;
}) => {
  const configs = {
    rentReminder: {
      title: "⏰ Rent Reminder Settings",
      preview1Label: "Message tenant receives:",
      preview1: `Hi {Name} 👋\nYour rent of ₹{amount} for Room {X} ({sharing}) at Sunrise PG is due.\nPlease pay today to avoid reminders.\n— Rajesh Kumar`,
      previewColor: WA_GREEN,
    },
    paymentAlert: {
      title: "✅ Payment Alert Settings",
      preview1Label: "Alert you receive on payment:",
      preview1: `💰 Payment Received!\n{Name} paid ₹{amount}\nRoom {X} • {sharing} • Sunrise PG\nDate: {date}\nMethod: UPI ✓`,
      previewColor: "#10B981",
    },
    cashConfirm: {
      title: "💵 Cash Confirm Flow",
      preview1Label: "Step 1 — Tenant receives:",
      preview1: `Hi {Name} 👋\nRent reminder: ₹{amount} for Room {X}\n\nReply with:\n1️⃣ Pay now (UPI link)\n2️⃣ Already paid cash\n3️⃣ Remind me tomorrow`,
      previewColor: "#3B82F6",
    },
  };
  const c = configs[type];

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full rounded-t-3xl p-5 max-h-[82vh] overflow-y-auto"
        style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ background: "#D1D5DB" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base" style={{ color: "#1A0533" }}>{c.title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#F5F3FF" }}>
            <X size={16} style={{ color: "#8B7AA8" }} />
          </button>
        </div>

        {/* Time pickers for rent reminder */}
        {type === "rentReminder" && (
          <div className="flex gap-3 mb-4">
            {[
              { label: "Start Day", type: "select" },
              { label: "Morning", type: "time", default: "09:00" },
              { label: "Evening", type: "time", default: "19:00" },
            ].map((field) => (
              <div key={field.label} className="flex-1">
                <label className="text-xs font-semibold mb-1 block" style={{ color: "#8B7AA8" }}>{field.label}</label>
                {field.type === "select" ? (
                  <select
                    className="w-full rounded-xl px-3 py-2 text-sm font-medium outline-none"
                    style={{ background: "#F5F3FF", color: "#1A0533", border: "1px solid #EDE9FE" }}
                  >
                    {[1,2,3,4,5].map(d => <option key={d}>{d}st of month</option>)}
                  </select>
                ) : (
                  <input
                    type="time"
                    defaultValue={field.default}
                    className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                    style={{ background: "#F5F3FF", color: "#1A0533", border: "1px solid #EDE9FE" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Message preview */}
        <p className="text-xs font-semibold mb-2" style={{ color: "#8B7AA8" }}>{c.preview1Label}</p>
        <div
          className="rounded-2xl rounded-tl-sm p-4 mb-4"
          style={{ background: `${c.previewColor}12`, border: `1px solid ${c.previewColor}33` }}
        >
          <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "#3D2C6B" }}>
            {c.preview1}
          </p>
        </div>

        {/* Cash confirm step 2 */}
        {type === "cashConfirm" && (
          <>
            <p className="text-xs font-semibold mb-2" style={{ color: "#8B7AA8" }}>
              Step 2 — Owner receives after "Already paid cash":
            </p>
            <div
              className="rounded-2xl rounded-tl-sm p-4 mb-4"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }}
            >
              <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: "#3D2C6B" }}>
                {`⚠️ Cash Claim\n{Name} says he paid ₹{amount} cash\nRoom {X} • Sunrise PG\n\nReply:\n✅ YES — confirm & stop reminders\n❌ NO — continue reminders`}
              </p>
            </div>
            <p className="text-xs mb-4" style={{ color: "#8B7AA8" }}>
              Owner replies YES/NO directly in WhatsApp. Dashboard updates automatically.
            </p>
          </>
        )}

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all"
          style={{ background: WA_GREEN }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────
export function WhatsAppHub() {
  const navigate = useNavigate();
  const [automations, setAutomations] = useState<AutomationConfig>({
    rentReminder: true,
    paymentAlert: true,
    cashConfirm: true,
  });
  const [pending, setPending] = useState<PendingConfirmation[]>(PENDING_CONFIRMATIONS);
  const [toast, setToast] = useState<string | null>(null);
  const [configSheet, setConfigSheet] = useState<"rentReminder" | "paymentAlert" | "cashConfirm" | null>(null);

  const showToast = (msg: string) => setToast(msg);

  const handleConfirm = (id: number, confirmed: boolean) => {
    const item = pending.find(p => p.id === id);
    setPending(prev => prev.filter(p => p.id !== id));
    showToast(
      confirmed
        ? `✓ ${item?.name}'s payment confirmed. Reminders stopped.`
        : `Reminders will continue for ${item?.name}`
    );
  };

  const toggleAutomation = (key: keyof AutomationConfig) =>
    setAutomations(prev => ({ ...prev, [key]: !prev[key] }));

  const statusIcon = (status: ActivityLog["status"]) => {
    if (status === "delivered") return <span style={{ color: "#9CA3AF", fontSize: 12 }}>✓✓</span>;
    if (status === "read")      return <span style={{ color: "#34B7F1", fontSize: 12 }}>✓✓</span>;
    if (status === "replied")   return <span style={{ fontSize: 12 }}>💬</span>;
    return <span style={{ color: "#D1D5DB", fontSize: 12 }}>✓</span>;
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8F6FF" }}>

      {/* ── Purple Gradient Header ── */}
      <div style={{ background: PURPLE_GRAD }} className="px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <ChevronLeft size={18} color="white" />
          </button>
          <div className="flex-1 flex items-center gap-2">
            <WAIcon size={20} color={WA_GREEN} />
            <p className="font-black text-lg text-white">WhatsApp Hub</p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0"
            style={{ background: "rgba(37,211,102,0.20)", border: "1px solid rgba(37,211,102,0.40)" }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: WA_GREEN }} />
            <span className="text-xs font-semibold" style={{ color: WA_GREEN }}>Live</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2">
          {[
            { label: "Sent Today", value: "9", icon: "📨" },
            { label: "Pending", value: pending.length.toString(), icon: "⚠️" },
            { label: "Delivered", value: "98%", icon: "✅" },
          ].map(s => (
            <div
              key={s.label}
              className="flex-1 rounded-2xl py-2.5 px-3"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <div className="flex items-center gap-1">
                <span style={{ fontSize: 13 }}>{s.icon}</span>
                <p className="font-black text-white" style={{ fontSize: 15 }}>{s.value}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }} className="mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* ── Connection Card ── */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: WA_GREEN }}
          >
            <WAIcon size={26} color="#fff" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm" style={{ color: "#1A0533" }}>
              WhatsApp Business Connected
            </p>
            <p className="text-xs" style={{ color: "#8B7AA8" }}>+91 98765 43210 — Rajesh Kumar</p>
          </div>
          <button
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg"
            style={{ background: "#F5F3FF", color: "#8B7AA8", border: "1px solid #EDE9FE" }}
          >
            Manage
          </button>
        </div>

        {/* ── Pending Cash Confirmations ── */}
        {pending.length > 0 && (
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(245,158,11,0.05)",
              borderTop: "1px solid rgba(245,158,11,0.20)",
              borderRight: "1px solid rgba(245,158,11,0.20)",
              borderBottom: "1px solid rgba(245,158,11,0.20)",
              borderLeft: "3px solid #F59E0B",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: 16 }}>⚠️</span>
              <p className="font-bold text-sm" style={{ color: "#D97706" }}>
                {pending.length} Cash Claim{pending.length > 1 ? "s" : ""} Awaiting Confirmation
              </p>
            </div>
            <div className="space-y-2.5">
              {pending.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl p-3"
                  style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: item.color }}
                  >
                    {item.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs" style={{ color: "#1A0533" }}>{item.name}</p>
                    <p className="text-xs" style={{ color: "#8B7AA8" }}>
                      Room {item.room} • ₹{item.amount.toLocaleString("en-IN")} • {item.time}
                    </p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => handleConfirm(item.id, true)}
                      className="text-xs font-bold px-2.5 py-1.5 rounded-lg"
                      style={{ background: "rgba(16,185,129,0.12)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}
                    >
                      ✅ Yes
                    </button>
                    <button
                      onClick={() => handleConfirm(item.id, false)}
                      className="text-xs font-bold px-2.5 py-1.5 rounded-lg"
                      style={{ background: "rgba(220,38,38,0.08)", color: "#DC2626", border: "1px solid rgba(220,38,38,0.20)" }}
                    >
                      ❌ No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Automations ── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#8B7AA8" }}>
            Automations
          </p>
          <div className="space-y-3">

            {/* Card 1: Rent Reminder */}
            <div className="rounded-2xl p-4" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span style={{ fontSize: 20 }}>🔔</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#1A0533" }}>Rent Reminder Loop</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "#F5F3FF", color: "#8B7AA8" }}
                    >
                      Outbound Only
                    </span>
                  </div>
                </div>
                <Toggle value={automations.rentReminder} onChange={() => toggleAutomation("rentReminder")} />
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#8B7AA8" }}>
                Auto-remind unpaid tenants every morning & evening from the 1st until rent is marked paid
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: "#D97706" }}>
                  Last sent: Today 9:00 AM • 4 tenants pending
                </p>
                <button
                  onClick={() => setConfigSheet("rentReminder")}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                  style={{ background: "#F5F3FF", color: "#8B7AA8", border: "1px solid #EDE9FE" }}
                >
                  Configure
                </button>
              </div>
            </div>

            {/* Card 2: Payment Alert */}
            <div className="rounded-2xl p-4" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span style={{ fontSize: 20 }}>✅</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#1A0533" }}>Payment Received Alert</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}
                    >
                      Instant • Outbound
                    </span>
                  </div>
                </div>
                <Toggle value={automations.paymentAlert} onChange={() => toggleAutomation("paymentAlert")} />
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#8B7AA8" }}>
                Owner gets WhatsApp alert the moment any tenant pays digitally
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium" style={{ color: "#10B981" }}>
                  Last triggered: 2 hrs ago — Arjun Kumar ₹6,500
                </p>
                <button
                  onClick={() => setConfigSheet("paymentAlert")}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                  style={{ background: "#F5F3FF", color: "#8B7AA8", border: "1px solid #EDE9FE" }}
                >
                  Configure
                </button>
              </div>
            </div>

            {/* Card 3: Cash Confirm */}
            <div className="rounded-2xl p-4" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span style={{ fontSize: 20 }}>💵</span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm" style={{ color: "#1A0533" }}>Cash Confirm Flow</p>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(59,130,246,0.12)", color: "#3B82F6" }}
                    >
                      Two-Way Interactive
                    </span>
                  </div>
                </div>
                <Toggle value={automations.cashConfirm} onChange={() => toggleAutomation("cashConfirm")} />
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#8B7AA8" }}>
                Tenant claims cash paid → you confirm YES/NO → dashboard &amp; reminders update automatically
              </p>
              <div className="flex items-center justify-between">
                {pending.length > 0 ? (
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(245,158,11,0.12)", color: "#D97706", border: "1px solid rgba(245,158,11,0.25)" }}
                  >
                    {pending.length} pending confirmations
                  </span>
                ) : (
                  <p className="text-xs" style={{ color: "#8B7AA8" }}>No pending claims</p>
                )}
                <button
                  onClick={() => setConfigSheet("cashConfirm")}
                  className="text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all"
                  style={{ background: "#F5F3FF", color: "#8B7AA8", border: "1px solid #EDE9FE" }}
                >
                  Configure
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ── Quick Send ── */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#8B7AA8" }}>
            Quick Send
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📨", label: "Send Rent Reminder", sub: "→ WhatsApp", accent: "#8B5CF6" },
              { icon: "📢", label: "Broadcast Message",  sub: "→ All Tenants", accent: "#06B6D4" },
              { icon: "💳", label: "Share Payment Link", sub: "→ WhatsApp",   accent: WA_GREEN },
              { icon: "📄", label: "Send Receipt",       sub: "→ Last payment", accent: "#F59E0B" },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => showToast(`${item.label} — opening WhatsApp...`)}
                className="rounded-2xl p-4 text-left transition-all active:scale-95"
                style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <p className="font-bold text-xs mt-2 leading-tight" style={{ color: "#1A0533" }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8B7AA8" }}>{item.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Activity Log ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#8B7AA8" }}>
              Recent Activity
            </p>
            <span className="text-xs" style={{ color: "#D1D5DB" }}>Last 7 days</span>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}
          >
            {ACTIVITY_LOG.map((log, i) => (
              <div
                key={log.id}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderBottom: i < ACTIVITY_LOG.length - 1 ? "1px solid #EDE9FE" : "none" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${WA_GREEN}18` }}
                >
                  <WAIcon size={14} color={WA_GREEN} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: "#1A0533" }}>
                    {log.message}
                  </p>
                  <p className="text-xs truncate" style={{ color: "#8B7AA8" }}>
                    {log.recipient}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs mb-0.5" style={{ color: "#D1D5DB" }}>{log.time}</p>
                  {statusIcon(log.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Config Bottom Sheet ── */}
      {configSheet && (
        <ConfigSheet type={configSheet} onClose={() => setConfigSheet(null)} />
      )}

      {/* ── Toast ── */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
