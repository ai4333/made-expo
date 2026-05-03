import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Moon,
  User,
  Phone,
  CreditCard,
  Home,
  Plus,
  Star,
  LogOut,
  Check,
  TrendingUp,
  Calendar,
  FileText,
} from "lucide-react";
import { ownerProfile, ownerPGs } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!value)}
      className="w-12 h-6 rounded-full transition-all relative flex-shrink-0 cursor-pointer"
      style={{ background: value ? "#8A2BE2" : "#D1D5DB" }}
    >
      <div
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
        style={{ left: value ? "calc(100% - 20px)" : 4 }}
      />
    </div>
  );
}

function SettingRow({
  icon,
  label,
  sub,
  onPress,
  right,
  last,
}: {
  icon?: React.ReactNode;
  label: string;
  sub?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      onClick={onPress}
      className={`flex items-center gap-3 px-4 py-3.5 ${onPress ? "cursor-pointer" : ""}`}
      style={{
        borderBottom: last ? "none" : "1px solid #EDE9FE",
      }}
    >
      {icon && (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "#F5F3FF" }}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: "#1A0533" }}>
          {label}
        </p>
        {sub && (
          <p className="text-xs mt-0.5 truncate" style={{ color: "#8B7AA8" }}>
            {sub}
          </p>
        )}
      </div>
      {right !== undefined ? (
        right
      ) : onPress ? (
        <ChevronRight size={16} style={{ color: "#8B7AA8" }} />
      ) : null}
    </div>
  );
}

export function OwnerSettings() {
  const { C, isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen pb-8" style={{ background: "#F8F6FF" }}>
      {/* Purple gradient header */}
      <div style={{ background: PURPLE_GRAD }} className="px-4 pt-12 pb-14">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <ChevronLeft size={18} color="white" />
          </button>
          <p className="font-black text-lg text-white flex-1">
            Settings & Profile
          </p>
        </div>
      </div>

      {/* Profile card — overlaps header */}
      <div className="px-4 -mt-8 mb-4">
        <div
          className="rounded-2xl p-4"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EDE9FE",
            boxShadow: "0 4px 20px rgba(138,43,226,0.10)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
              style={{ background: "rgba(138,43,226,0.12)", color: "#8A2BE2" }}
            >
              {ownerProfile.avatar}
            </div>
            <div className="flex-1">
              <p className="font-bold text-base" style={{ color: "#1A0533" }}>
                {ownerProfile.name}
              </p>
              <p className="text-xs mb-1" style={{ color: "#8B7AA8" }}>
                PG Owner • {ownerProfile.city}
              </p>
              <div className="flex items-center gap-1.5">
                <Star size={11} color="#F59E0B" fill="#F59E0B" />
                <span className="text-xs font-semibold" style={{ color: "#8B7AA8" }}>4.8</span>
                <span style={{ color: "#D1D5DB" }}>•</span>
                <span className="text-xs font-semibold" style={{ color: "#10B981" }}>Verified 🟢</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications + Dark Mode toggles */}
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
        <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid #EDE9FE" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(138,43,226,0.10)" }}>
            <Bell size={15} style={{ color: "#8A2BE2" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#1A0533" }}>Notifications</p>
            <p className="text-xs" style={{ color: "#8B7AA8" }}>Rent alerts, complaints</p>
          </div>
          <Toggle value={notifications} onChange={setNotifications} />
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F5F3FF" }}>
            <Moon size={15} style={{ color: "#8B7AA8" }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold" style={{ color: "#1A0533" }}>Dark Mode</p>
            <p className="text-xs" style={{ color: "#8B7AA8" }}>Easy on the eyes</p>
          </div>
          <Toggle value={isDark} onChange={toggle} />
        </div>
      </div>

      {/* PROFILE section */}
      <p className="text-xs font-bold uppercase tracking-wider px-4 mb-2" style={{ color: "#8B7AA8" }}>Profile</p>
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
        <SettingRow icon={<User size={15} style={{ color: "#8A2BE2" }} />} label="Edit Profile" sub={`${ownerProfile.name} • ${ownerProfile.email}`} onPress={() => {}} />
        <SettingRow icon={<Phone size={15} style={{ color: "#8B7AA8" }} />} label="Phone Number" sub={ownerProfile.phone} onPress={() => {}} />
        <SettingRow icon={<CreditCard size={15} style={{ color: "#8B7AA8" }} />} label="Bank Account" sub="SBI **** 4321" onPress={() => {}} last />
      </div>

      {/* MY PGS section */}
      <p className="text-xs font-bold uppercase tracking-wider px-4 mb-2" style={{ color: "#8B7AA8" }}>My PGs</p>
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
        {ownerPGs.map((pg, i) => (
          <SettingRow
            key={pg.id}
            icon={<Home size={15} style={{ color: "#8A2BE2" }} />}
            label={pg.name}
            sub={`${pg.rooms.length * 2} rooms • ${pg.address.split(",")[0]}`}
            onPress={() => navigate(`/owner/pg/${pg.id}`)}
            last={i === ownerPGs.length - 1}
          />
        ))}
        <div style={{ borderTop: "1px solid #EDE9FE" }}>
          <SettingRow icon={<Plus size={15} style={{ color: "#8A2BE2" }} />} label="Add New PG" sub="Register another property" onPress={() => {}} last />
        </div>
      </div>

      {/* Payment section */}
      <p className="text-xs font-bold uppercase tracking-wider px-4 mb-2" style={{ color: "#8B7AA8" }}>Payment</p>
      <div className="mx-4 mb-4 rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}>
        <SettingRow icon={<CreditCard size={15} style={{ color: "#8B7AA8" }} />} label="UPI ID" sub="ramesh@upi" onPress={() => {}} />
        <SettingRow icon={<CreditCard size={15} style={{ color: "#8B7AA8" }} />} label="Payout Key" sub="Every 5th of month" onPress={() => {}} last />
      </div>

      {/* ── SUBSCRIPTION SECTION ── */}
      <div className="mb-4">
        <SubscriptionSection />
      </div>

      {/* Logout */}
      <div className="mx-4 mt-2">
        <button
          onClick={() => navigate("/")}
          className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
          style={{
            background: "rgba(220,38,38,0.07)",
            color: "#DC2626",
            border: "1px solid rgba(220,38,38,0.18)",
          }}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <p className="text-center text-xs mt-5" style={{ color: "#D1D5DB" }}>
        PG OS v1.0.0 • Made with ♥ in India
      </p>
    </div>
  );
}

// ─── PLAN & BILLING DATA ─────────────────────────────────
const PLAN_LIST = [
  { id: "small",    name: "Small PG",   icon: "🏠", rooms: "Up to 15",  monthly: 799,   annual: 667,   annualTotal: 7999  },
  { id: "growing",  name: "Growing PG", icon: "🏘️", rooms: "16–30",     monthly: 1299,  annual: 1083,  annualTotal: 12999 },
  { id: "midscale", name: "Mid-Scale",  icon: "🏢", rooms: "31–60",     monthly: 1999,  annual: 1667,  annualTotal: 19999 },
  { id: "large",    name: "Large PG",   icon: "🏗️", rooms: "61–100",    monthly: 2999,  annual: 2500,  annualTotal: 29999 },
];

const BILLING_HISTORY = [
  { month: "Mar 2026", plan: "Growing PG", amount: 1299 },
  { month: "Feb 2026", plan: "Growing PG", amount: 1299 },
  { month: "Jan 2026", plan: "Growing PG", amount: 1299 },
];

// ─── SUBSCRIPTION SECTION ────────────────────────────────
function SubscriptionSection() {
  const currentPlan = PLAN_LIST[1]; // Growing PG
  const billing = "monthly";
  const roomsUsed = 14;
  const roomsTotal = 30;
  const [showComparison, setShowComparison] = useState(false);
  const [showCancelSheet, setShowCancelSheet] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Section label */}
      <p className="text-xs font-bold uppercase tracking-wider px-4 mb-0" style={{ color: "#8B7AA8" }}>
        Subscription
      </p>

      {/* Current plan card */}
      <div className="mx-4" style={{
        background: "white", borderRadius: 16,
        border: "1px solid #EDE9FE",
        boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
        padding: 16,
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {/* Plan name + active status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{currentPlan.icon}</span>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                {currentPlan.name}
              </p>
              <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
                {currentPlan.rooms} rooms · ₹{currentPlan.monthly.toLocaleString()}/mo · Monthly billing
              </p>
            </div>
          </div>
          <div style={{
            background: "#ECFDF5", color: "#059669",
            border: "1px solid #A7F3D0",
            borderRadius: 100, padding: "4px 10px",
            fontSize: 12, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669" }} />
            Active ✓
          </div>
        </div>

        {/* Rooms usage bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "#64748B" }}>Rooms used</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>
              {roomsUsed} of {roomsTotal}
            </span>
          </div>
          <div style={{ height: 6, background: "#E2E8F0", borderRadius: 100, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 100,
              width: `${(roomsUsed / roomsTotal) * 100}%`,
              background: roomsUsed / roomsTotal > 0.8 ? "#F59E0B" : "#7C3AED",
              transition: "width 0.3s ease",
            }} />
          </div>
          {roomsUsed / roomsTotal > 0.8 && (
            <p style={{ fontSize: 11, color: "#D97706", marginTop: 4 }}>
              ⚠️ Almost full — consider upgrading
            </p>
          )}
        </div>

        {/* Renewal date */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Calendar size={13} color="#94A3B8" />
          <span style={{ fontSize: 12, color: "#94A3B8" }}>Renews on 15 April 2026</span>
        </div>

        {/* Upgrade button */}
        <button style={{
          width: "100%", height: 44, borderRadius: 100,
          background: "#7C3AED", color: "white",
          fontSize: 14, fontWeight: 700, border: "none",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8,
        }}>
          <TrendingUp size={16} />
          Upgrade Plan
        </button>

        {/* Annual switch button — only shown on monthly billing */}
        {billing === "monthly" && (
          <button style={{
            width: "100%", height: 44, borderRadius: 100,
            background: "#ECFDF5", color: "#059669",
            fontSize: 13, fontWeight: 600,
            border: "1px solid #A7F3D0", cursor: "pointer",
          }}>
            Switch to Annual & Save ₹2,589 🎉
          </button>
        )}
      </div>

      {/* Compare plans toggle */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#7C3AED", fontSize: 13, fontWeight: 600,
          textAlign: "left", padding: "0 16px",
          display: "flex", alignItems: "center", gap: 4,
        }}
      >
        {showComparison ? "Hide plan comparison ↑" : "Compare all plans →"}
      </button>

      {/* Plan comparison table */}
      {showComparison && (
        <div className="mx-4" style={{
          background: "white", borderRadius: 16,
          border: "1px solid #E2E8F0", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 72px 72px 64px",
            padding: "10px 12px", background: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          }}>
            {["Plan", "Monthly", "Annual", ""].map((h, i) => (
              <span key={i} style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", textAlign: i > 0 ? "center" : "left" }}>
                {h}
              </span>
            ))}
          </div>

          {PLAN_LIST.map((plan, i) => {
            const isCurrent = plan.id === currentPlan.id;
            return (
              <div key={plan.id} style={{
                display: "grid", gridTemplateColumns: "1fr 72px 72px 64px",
                padding: "12px 12px", alignItems: "center",
                background: isCurrent ? "#EDE9FE" : "white",
                borderBottom: i < PLAN_LIST.length - 1 ? "1px solid #F1F5F9" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{plan.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", margin: 0 }}>{plan.name}</p>
                    <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>{plan.rooms} rooms</p>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", textAlign: "center" }}>
                  ₹{plan.monthly.toLocaleString()}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#059669", textAlign: "center" }}>
                  ₹{plan.annual.toLocaleString()}
                </span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {isCurrent ? (
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: "#7C3AED",
                      background: "white", padding: "3px 8px", borderRadius: 100,
                      border: "1px solid #7C3AED",
                    }}>Current</span>
                  ) : (
                    <button style={{
                      fontSize: 11, fontWeight: 600, color: "#7C3AED",
                      background: "white", border: "1px solid #7C3AED",
                      borderRadius: 100, padding: "4px 10px", cursor: "pointer",
                    }}>
                      Select
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Billing History label */}
      <p className="text-xs font-bold uppercase tracking-wider px-4 mb-0 mt-1" style={{ color: "#8B7AA8" }}>
        Billing History
      </p>

      {/* Billing history card */}
      <div className="mx-4" style={{
        background: "white", borderRadius: 16,
        border: "1px solid #EDE9FE", overflow: "hidden",
      }}>
        {BILLING_HISTORY.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: i < BILLING_HISTORY.length - 1 ? "1px solid #F1F5F9" : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: "#F8F7FF",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <FileText size={14} color="#7C3AED" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", margin: 0 }}>
                  {item.month} · {item.plan}
                </p>
                <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
                  ₹{item.amount.toLocaleString()}
                </p>
              </div>
            </div>
            <div style={{
              background: "#ECFDF5", color: "#059669",
              borderRadius: 100, padding: "3px 10px",
              fontSize: 11, fontWeight: 600,
            }}>Paid ✓</div>
          </div>
        ))}
        <button style={{
          width: "100%", padding: "10px 16px",
          background: "#F8FAFC", border: "none", cursor: "pointer",
          color: "#7C3AED", fontSize: 13, fontWeight: 600,
          borderTop: "1px solid #F1F5F9",
        }}>
          View all invoices →
        </button>
      </div>

      {/* Cancel link */}
      <button
        onClick={() => setShowCancelSheet(true)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#EF4444", fontSize: 13, textAlign: "center",
          padding: "4px 0",
        }}
      >
        Cancel subscription
      </button>

      {/* Cancel confirmation bottom sheet */}
      {showCancelSheet && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(0,0,0,0.4)",
            display: "flex", alignItems: "flex-end",
          }}
          onClick={() => setShowCancelSheet(false)}
        >
          <div
            style={{
              background: "white", borderRadius: "24px 24px 0 0",
              padding: "20px 20px 40px", width: "100%",
              display: "flex", flexDirection: "column", gap: 16,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: 40, height: 4, background: "#E2E8F0", borderRadius: 100, margin: "0 auto" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 8px" }}>
                Cancel subscription?
              </p>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0, lineHeight: 1.5 }}>
                Your subscription stays active until{" "}
                <span style={{ fontWeight: 600, color: "#0F172A" }}>15 April 2026</span>.
                After that, you'll lose access to premium features.
              </p>
            </div>
            {/* Primary: Keep (dark pattern done right) */}
            <button
              style={{
                width: "100%", height: 52, borderRadius: 100,
                background: "#7C3AED", color: "white",
                fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer",
              }}
              onClick={() => setShowCancelSheet(false)}
            >
              Keep Subscription
            </button>
            {/* Secondary: Yes Cancel */}
            <button
              style={{
                width: "100%", height: 48, borderRadius: 100,
                background: "white", color: "#EF4444",
                fontSize: 14, fontWeight: 600,
                border: "1.5px solid #EF4444", cursor: "pointer",
              }}
              onClick={() => setShowCancelSheet(false)}
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}