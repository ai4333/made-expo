import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ChevronRight, Clock, MessageCircle } from "lucide-react";

// ─── PLAN DATA ───────────────────────────────────────────
const PLANS = [
  {
    id: "small",
    name: "Small PG",
    icon: "🏠",
    rooms: "Up to 15 rooms",
    monthly: 799,
    annual: 667,
    annualTotal: 7999,
    annualSave: 1589,
    features: [
      "WhatsApp rent reminders",
      "Tenant & expense tracking",
      "Basic dashboard",
    ],
    popular: false,
  },
  {
    id: "growing",
    name: "Growing PG",
    icon: "🏘️",
    rooms: "16 – 30 rooms",
    monthly: 1299,
    annual: 1083,
    annualTotal: 12999,
    annualSave: 2589,
    features: [
      "Everything in Small PG",
      "Multi-PG dashboard",
      "WhatsApp broadcast",
    ],
    popular: true,
  },
  {
    id: "midscale",
    name: "Mid-Scale",
    icon: "🏢",
    rooms: "31 – 60 rooms",
    monthly: 1999,
    annual: 1667,
    annualTotal: 19999,
    annualSave: 3989,
    features: [
      "Everything in Growing PG",
      "Vendor marketplace access",
      "Priority WhatsApp support",
    ],
    popular: false,
  },
  {
    id: "large",
    name: "Large PG",
    icon: "🏗️",
    rooms: "61 – 100 rooms",
    monthly: 2999,
    annual: 2500,
    annualTotal: 29999,
    annualSave: 5989,
    features: [
      "Everything in Mid-Scale",
      "Custom branding",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

// ─── STEPPER ─────────────────────────────────────────────
function Stepper({ current }: { current: number }) {
  const steps = ["Account", "Choose Plan", "Your PG"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 4px" }}>
      {steps.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: i < current ? "#7C3AED" : i === current ? "#7C3AED" : "#E2E8F0",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {i < current
                ? <Check size={12} color="white" />
                : <span style={{ fontSize: 11, fontWeight: 700, color: i === current ? "white" : "#94A3B8" }}>{i + 1}</span>
              }
            </div>
            <span style={{
              fontSize: 12, fontWeight: i === current ? 600 : 400,
              color: i === current ? "#7C3AED" : i < current ? "#0F172A" : "#94A3B8",
            }}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 1, margin: "0 8px",
              background: i < current ? "#7C3AED" : "#E2E8F0",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── PLAN CARD ───────────────────────────────────────────
function PlanCard({
  plan, selected, billing, onSelect,
}: {
  plan: typeof PLANS[0];
  selected: boolean;
  billing: "monthly" | "annual";
  onSelect: () => void;
}) {
  const price = billing === "monthly" ? plan.monthly : plan.annual;
  const billingLabel = billing === "monthly" ? "/mo" : "/mo (billed annually)";

  return (
    <button
      onClick={onSelect}
      style={{
        width: "100%", textAlign: "left", cursor: "pointer",
        background: selected ? "#FAFAFF" : "white",
        border: `${selected ? 2 : 1}px solid ${selected ? "#7C3AED" : "#E2E8F0"}`,
        borderRadius: 16, padding: 16,
        position: "relative",
        transition: "all 0.2s ease",
        boxShadow: selected ? "0 4px 16px rgba(124,58,237,0.1)" : "none",
      }}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div style={{
          position: "absolute", top: -10, right: 12,
          background: "#FFF7ED", color: "#D97706",
          border: "1px solid #FDE68A",
          borderRadius: 100, padding: "3px 10px",
          fontSize: 11, fontWeight: 600,
        }}>Most Popular ⭐</div>
      )}

      {/* Selected checkmark */}
      {selected && (
        <div style={{
          position: "absolute", top: 12, right: 12,
          width: 22, height: 22, borderRadius: "50%",
          background: "#7C3AED",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Check size={12} color="white" />
        </div>
      )}

      {/* Top row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>{plan.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: selected ? 28 : 0 }}>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
              {plan.name}
            </p>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: "#7C3AED", margin: 0, lineHeight: 1 }}>
                ₹{price.toLocaleString()}
                <span style={{ fontSize: 13, fontWeight: 400, color: "#64748B" }}>/mo</span>
              </p>
              {billing === "annual" && (
                <p style={{ fontSize: 10, color: "#059669", margin: "2px 0 0", fontWeight: 500 }}>
                  Save ₹{plan.annualSave.toLocaleString()}/yr
                </p>
              )}
            </div>
          </div>
          <p style={{ fontSize: 13, color: "#64748B", margin: "2px 0 10px" }}>{plan.rooms}</p>

          {/* Features */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {plan.features.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: "#ECFDF5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Check size={9} color="#059669" />
                </div>
                <span style={{ fontSize: 12, color: "#475569" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────
export default function OwnerOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 0=Account, 1=Plan, 2=PG
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("growing");
  const [showCancelSheet, setShowCancelSheet] = useState(false);

  // Account form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const selected = PLANS.find(p => p.id === selectedPlan)!;

  const inputStyle: React.CSSProperties = {
    width: "100%", height: 56, borderRadius: 12,
    border: "1px solid #E2E8F0", padding: "0 16px",
    fontSize: 16, color: "#0F172A", outline: "none",
    background: "white", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: "#374151",
    display: "block", marginBottom: 6,
  };

  return (
    <div style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column",
      background: "#F8F7FF", fontFamily: "Inter, sans-serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
        padding: "48px 20px 24px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
            <polyline points="4,42 40,8 76,42" stroke="#F5A623" strokeWidth="5" strokeLinejoin="miter" strokeLinecap="round" fill="none"/>
            <rect x="8" y="40" width="18" height="30" rx="3" fill="white"/>
            <rect x="54" y="40" width="18" height="30" rx="3" fill="white"/>
            <rect x="8" y="40" width="64" height="16" fill="white"/>
            <polygon points="20,40 60,40 40,56" fill="#7C3AED"/>
            <rect x="37" y="54" width="6" height="16" rx="3" fill="#F0436A"/>
            <line x1="40" y1="54" x2="20" y2="40" stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
            <line x1="40" y1="54" x2="60" y2="40" stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
          </svg>
          <span style={{ color: "white", fontSize: 16, fontWeight: 700 }}>PG OS</span>
        </div>
        <Stepper current={step} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 100px" }}>

        {/* ── STEP 0: ACCOUNT ── */}
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>
                Create Account
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                Takes less than 2 minutes
              </p>
            </div>

            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                style={inputStyle} placeholder="Ramesh Sharma"
                value={name} onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <label style={labelStyle}>WhatsApp Number</label>
              <div style={{ display: "flex", border: "1px solid #E2E8F0", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "0 14px", background: "#F8FAFC", borderRight: "1px solid #E2E8F0", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#0F172A" }}>+91</span>
                </div>
                <input
                  style={{ ...inputStyle, border: "none", borderRadius: 0, flex: 1 }}
                  placeholder="98765 43210" type="tel"
                  value={phone} onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Email Address <span style={{ color: "#94A3B8", fontWeight: 400 }}>(optional)</span></label>
              <input
                style={inputStyle} placeholder="your@email.com" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* ── STEP 1: CHOOSE PLAN ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>
                Pick the right size for your PG
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                You can upgrade anytime as your PG grows
              </p>
            </div>

            {/* Billing toggle */}
            <div style={{
              display: "flex", background: "#F1F5F9",
              borderRadius: 100, padding: 4, gap: 4,
            }}>
              {(["monthly", "annual"] as const).map(b => (
                <button
                  key={b}
                  onClick={() => setBilling(b)}
                  style={{
                    flex: 1, padding: "10px 0", borderRadius: 100, border: "none",
                    cursor: "pointer", fontSize: 13, fontWeight: 600,
                    transition: "all 0.2s",
                    background: billing === b ? "#7C3AED" : "transparent",
                    color: billing === b ? "white" : "#64748B",
                  }}
                >
                  {b === "monthly" ? "Monthly" : "Annual  — Save 17% 🎉"}
                </button>
              ))}
            </div>

            {/* Plan cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PLANS.map(plan => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={selectedPlan === plan.id}
                  billing={billing}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              ))}

              {/* Enterprise strip */}
              <div style={{
                background: "#0F172A", borderRadius: 16, padding: 16,
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: "0 0 3px" }}>
                    100+ rooms?
                  </p>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0 }}>
                    Custom pricing for large operators
                  </p>
                </div>
                <button style={{
                  background: "none", border: "1.5px solid white",
                  borderRadius: 100, padding: "8px 16px",
                  color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  <MessageCircle size={14} />
                  Talk to Us
                </button>
              </div>
            </div>

            {/* Founder note */}
            <div style={{
              background: "#FFF7ED", border: "1px solid #FDE68A",
              borderRadius: 12, padding: "10px 14px",
              display: "flex", alignItems: "flex-start", gap: 8,
            }}>
              <Clock size={14} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: "#92400E", margin: 0, lineHeight: 1.5 }}>
                <strong>Early adopter offer —</strong> prices locked for your first 60 days. Prices will increase as features are added.
              </p>
            </div>

            <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", margin: 0 }}>
              Payment collected after PG setup. Cancel anytime.
            </p>
          </div>
        )}

        {/* ── STEP 2: YOUR PG ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>
                Set up your first PG
              </h2>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>
                You can add more details later
              </p>
            </div>
            <div>
              <label style={labelStyle}>PG Name</label>
              <input style={inputStyle} placeholder="e.g. Sharma Boys PG" />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input style={inputStyle} placeholder="e.g. Bangalore" />
            </div>
            <div>
              <label style={labelStyle}>Total Rooms</label>
              <input style={inputStyle} placeholder="e.g. 20" type="number" />
            </div>
          </div>
        )}
      </div>

      {/* Sticky footer button */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid #E2E8F0",
        padding: "12px 16px 28px",
      }}>
        <button
          onClick={() => {
            if (step < 2) setStep(s => s + 1);
            else navigate("/owner");
          }}
          style={{
            width: "100%", height: 56, borderRadius: 100,
            background: "#7C3AED", color: "white",
            fontSize: 16, fontWeight: 700, border: "none",
            cursor: "pointer",
          }}
        >
          {step === 0 && "Continue →"}
          {step === 1 && `Continue with ${selected.name} →`}
          {step === 2 && "Create My PG →"}
        </button>
      </div>
    </div>
  );
}