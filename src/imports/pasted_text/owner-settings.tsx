// Add these imports at top of OwnerSettings.tsx
import { Check, ChevronRight, TrendingUp, Calendar, FileText, AlertCircle } from "lucide-react";
import { useState } from "react";

// ─── PLAN DATA (same as onboarding) ──────────────────────
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

// ─── SUBSCRIPTION SECTION COMPONENT ─────────────────────
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
      <p style={{
        fontSize: 11, fontWeight: 600, color: "#94A3B8",
        letterSpacing: "0.08em", textTransform: "uppercase",
        margin: 0,
      }}>Subscription</p>

      {/* Current plan card */}
      <div style={{
        background: "white", borderRadius: 16,
        border: "1px solid #EDE9FE",
        boxShadow: "0 4px 16px rgba(124,58,237,0.08)",
        padding: 16,
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        {/* Plan name + status */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{currentPlan.icon}</span>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                {currentPlan.name}
              </p>
              <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
                {currentPlan.rooms} rooms · ₹{currentPlan.monthly.toLocaleString()}/mo · Monthly
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
            Active
          </div>
        </div>

        {/* Usage bar */}
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

        {/* Action buttons */}
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

        {billing === "monthly" && (
          <button style={{
            width: "100%", height: 44, borderRadius: 100,
            background: "#ECFDF5", color: "#059669",
            fontSize: 13, fontWeight: 600,
            border: "1px solid #A7F3D0", cursor: "pointer",
          }}>
            Switch to Annual &amp; Save ₹2,589 🎉
          </button>
        )}
      </div>

      {/* Compare plans toggle */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#7C3AED", fontSize: 13, fontWeight: 600,
          textAlign: "left", padding: 0,
          display: "flex", alignItems: "center", gap: 4,
        }}
      >
        {showComparison ? "Hide plan comparison ↑" : "Compare all plans →"}
      </button>

      {/* Plan comparison table */}
      {showComparison && (
        <div style={{
          background: "white", borderRadius: 16,
          border: "1px solid #E2E8F0", overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 80px 80px 80px",
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
                display: "grid", gridTemplateColumns: "1fr 80px 80px 80px",
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
                      background: "#EDE9FE", padding: "3px 8px", borderRadius: 100,
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

      {/* Billing history */}
      <p style={{
        fontSize: 11, fontWeight: 600, color: "#94A3B8",
        letterSpacing: "0.08em", textTransform: "uppercase",
        margin: "4px 0 0",
      }}>Billing History</p>

      <div style={{
        background: "white", borderRadius: 16,
        border: "1px solid #E2E8F0", overflow: "hidden",
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

      {/* Cancel confirmation sheet */}
      {showCancelSheet && (
        <div style={{
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
              <p style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>
                Cancel subscription?
              </p>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                Your subscription stays active until 15 April 2026. After that, you'll lose access to premium features.
              </p>
            </div>
            <button style={{
              width: "100%", height: 52, borderRadius: 100,
              background: "#7C3AED", color: "white",
              fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer",
            }}
              onClick={() => setShowCancelSheet(false)}
            >
              Keep Subscription
            </button>
            <button style={{
              width: "100%", height: 48, borderRadius: 100,
              background: "white", color: "#EF4444",
              fontSize: 14, fontWeight: 600,
              border: "1.5px solid #EF4444", cursor: "pointer",
            }}>
              Yes, Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}