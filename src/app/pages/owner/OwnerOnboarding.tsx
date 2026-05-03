import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, CheckCircle2, MessageSquare, Check, Clock, MessageCircle } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import stazyLogo from "../../../imports/image.png";
import stazyLogoS from "../../../imports/Screenshot_2026-03-29_150001-2.png";

type Step = "register" | "profile" | "create_pg";

// ─── NEW PLAN DATA ────────────────────────────────────────
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
    features: ["WhatsApp rent reminders", "Tenant & expense tracking", "Basic dashboard"],
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
    features: ["Everything in Small PG", "Multi-PG dashboard", "WhatsApp broadcast"],
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
    features: ["Everything in Growing PG", "Vendor marketplace access", "Priority WhatsApp support"],
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
    features: ["Everything in Mid-Scale", "Custom branding", "Dedicated account manager"],
    popular: false,
  },
];

// ─── PLAN CARD ────────────────────────────────────────────
function PlanCard({
  plan, selected, billing, onSelect,
}: {
  plan: typeof PLANS[0];
  selected: boolean;
  billing: "monthly" | "annual";
  onSelect: () => void;
}) {
  const price = billing === "monthly" ? plan.monthly : plan.annual;

  return (
    <button
      onClick={onSelect}
      style={{
        width: "100%", textAlign: "left", cursor: "pointer",
        background: selected ? "#FAFAFF" : "white",
        border: `${selected || plan.popular ? 2 : 1}px solid ${selected ? "#7C3AED" : plan.popular && !selected ? "#7C3AED" : "#E2E8F0"}`,
        borderRadius: 16, padding: 16,
        position: "relative",
        transition: "all 0.2s ease",
        boxShadow: selected ? "0 4px 16px rgba(124,58,237,0.12)" : "none",
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

// ─── STEPPER ──────────────────────────────────────────────
function Stepper({ current }: { current: number }) {
  const steps = ["Account", "Choose Plan", "Your PG"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, padding: "0 4px" }}>
      {steps.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: i <= current ? "#7C3AED" : "rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              {i < current
                ? <Check size={12} color="white" />
                : <span style={{ fontSize: 11, fontWeight: 700, color: i === current ? "white" : "rgba(255,255,255,0.6)" }}>{i + 1}</span>
              }
            </div>
            <span style={{
              fontSize: 12, fontWeight: i === current ? 600 : 400,
              color: i === current ? "white" : i < current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)",
            }}>{label}</span>
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex: 1, height: 1, margin: "0 8px",
              background: i < current ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  const { C } = useTheme();
  return <p className="text-sm font-semibold mb-1.5" style={{ color: C.muted }}>{children}</p>;
}

function FormInput({ placeholder, type = "text", value, onChange, prefix }: {
  placeholder: string; type?: string; value: string; onChange: (v: string) => void; prefix?: string;
}) {
  const { C } = useTheme();
  return (
    <div
      className="flex items-center rounded-xl overflow-hidden border focus-within:ring-2 transition-all"
      style={{ background: C.elevated, borderColor: C.border }}
    >
      {prefix && <span className="px-3 text-sm font-medium" style={{ color: C.muted }}>{prefix}</span>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-4 py-3.5 text-sm outline-none bg-transparent"
        style={{ color: C.heading }}
      />
    </div>
  );
}

function PillSelector({ options, value, onSelect }: {
  options: string[]; value: string; onSelect: (v: string) => void;
}) {
  const { C } = useTheme();
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onSelect(o)}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all"
          style={{
            background: value === o ? C.primaryGhost : "transparent",
            borderColor: value === o ? C.primary : C.border,
            color: value === o ? C.primary : C.muted,
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export function OwnerOnboarding() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("register");
  const [showPass, setShowPass] = useState(false);

  // Step 1 state
  const [s1, setS1] = useState({ name: "", phone: "", email: "", password: "", confirm: "" });

  // Step 2 state — plan selection
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("growing");

  // Step 3 state
  const [s3, setS3] = useState({
    pgName: "", address: "", pgType: "Boys",
    rooms: "8", bedsPerRoom: "2",
    defaultRent: "8500", advance: "8500",
    rentDue: "5", notice: "30",
    whatsapp: "", enableReminders: true,
  });
  const [pgDone, setPgDone] = useState(false);

  const totalBeds = +s3.rooms * +s3.bedsPerRoom || 0;
  const stepIndex = step === "register" ? 0 : step === "profile" ? 1 : 2;
  const selectedPlanObj = PLANS.find(p => p.id === selectedPlan)!;

  if (pgDone) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden" style={{ background: C.bg }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center w-full max-w-sm"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
            style={{ background: C.primaryGhost, border: `2px solid ${C.primary}` }}
          >
            <CheckCircle2 size={48} style={{ color: C.primary }} />
          </div>
          <h1 className="text-2xl font-black mb-2" style={{ color: C.heading }}>Dashboard Ready! 🚀</h1>
          <p className="text-base mb-6" style={{ color: C.muted }}>"{s3.pgName || "My First PG"}" is live. Start adding tenants!</p>
          <div className="rounded-2xl p-4 mb-6 text-left" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <div className="space-y-2">
              {[
                { label: "PG Name", value: s3.pgName || "My First PG" },
                { label: "Total Beds", value: String(totalBeds) },
                { label: "Default Rent", value: `₹${s3.defaultRent}/bed/mo` },
                { label: "Rent Due", value: `${s3.rentDue}th of every month` },
                { label: "Plan", value: `${selectedPlanObj.name} · ₹${billing === "monthly" ? selectedPlanObj.monthly : selectedPlanObj.annual}/mo` },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-sm" style={{ color: C.muted }}>{item.label}</span>
                  <span className="text-sm font-semibold" style={{ color: C.heading }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/owner/add-tenant")}
              className="flex-1 py-4 rounded-xl font-bold text-sm border"
              style={{ borderColor: C.primary, color: C.primary }}
            >
              Add Tenant Now
            </button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/owner")}
              className="flex-1 py-4 rounded-xl font-bold text-white text-sm"
              style={{ background: C.primary }}
            >
              Go to Dashboard →
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto" style={{ background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>
      {/* Purple gradient header */}
      <div style={{ background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)", padding: "48px 20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          {/* Back button - always visible */}
          <button
            onClick={() => {
              if (step === "register") navigate("/role-selection");
              else if (step === "profile") setStep("register");
              else setStep("profile");
            }}
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ChevronLeft size={18} color="white" />
          </button>
          
          {/* S Logo and Welcome Owner text */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img 
              src={stazyLogoS} 
              alt="Staazy" 
              style={{ 
                height: 36,
                width: 36,
                objectFit: "contain"
              }} 
            />
            <span style={{ color: "white", fontSize: 16, fontWeight: 600 }}>Welcome Owner</span>
          </div>
        </div>
        <Stepper current={stepIndex} />
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 100px" }}>
        <AnimatePresence mode="wait">

          {/* ── STEP 1: REGISTER ── */}
          {step === "register" && (
            <motion.div key="register" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Create Account</h2>
              <p style={{ fontSize: 14, color: "#64748B", marginBottom: 20 }}>Takes less than 2 minutes</p>

              <div className="space-y-4">
                <div><Label>Full Name</Label><FormInput placeholder="Ramesh Sharma" value={s1.name} onChange={(v) => setS1((p) => ({ ...p, name: v }))} /></div>
                <div><Label>WhatsApp Number</Label><FormInput placeholder="98765 43210" prefix="+91" value={s1.phone} onChange={(v) => setS1((p) => ({ ...p, phone: v }))} /></div>
                <div>
                  <Label>Email Address <span style={{ color: "#94A3B8", fontWeight: 400 }}>(optional)</span></Label>
                  <FormInput placeholder="your@email.com" type="email" value={s1.email} onChange={(v) => setS1((p) => ({ ...p, email: v }))} />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: CHOOSE PLAN ── */}
          {step === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <div style={{ marginBottom: 16 }}>
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
                borderRadius: 100, padding: 4, gap: 4, marginBottom: 16,
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
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
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
                      Custom pricing built for large operators
                    </p>
                  </div>
                  <button style={{
                    background: "none", border: "1.5px solid white",
                    borderRadius: 100, padding: "8px 16px",
                    color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <MessageCircle size={14} />
                    Talk to Us →
                  </button>
                </div>
              </div>

              {/* Founder pricing note */}
              <div style={{
                background: "#FFF7ED", border: "1px solid #FDE68A",
                borderRadius: 12, padding: "10px 14px",
                display: "flex", alignItems: "flex-start", gap: 8,
                marginBottom: 12,
              }}>
                <Clock size={14} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "#92400E", margin: 0, lineHeight: 1.5 }}>
                  <strong>Early adopter offer —</strong> prices locked for your first 60 days. Prices will increase as features are added.
                </p>
              </div>

              <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", margin: "0 0 0" }}>
                Payment collected after PG setup. Cancel anytime.
              </p>
            </motion.div>
          )}

          {/* ── STEP 3: CREATE PG ── */}
          {step === "create_pg" && (
            <motion.div key="create_pg" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <h2 className="text-2xl font-black mb-1" style={{ color: C.heading }}>Set Up Your First PG</h2>
              <p className="text-sm mb-6" style={{ color: C.muted }}>Takes 2 minutes — you can edit later</p>

              {/* A. Basic Info */}
              <div className="rounded-2xl p-4 mb-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>A. Basic Info</p>
                <div className="space-y-3">
                  <div><Label>PG Name</Label><FormInput placeholder="e.g. Sharma Boys PG" value={s3.pgName} onChange={(v) => setS3((p) => ({ ...p, pgName: v }))} /></div>
                  <div><Label>Full Address</Label><FormInput placeholder="Street, Area, City" value={s3.address} onChange={(v) => setS3((p) => ({ ...p, address: v }))} /></div>
                  <div><Label>PG Type</Label><PillSelector options={["Boys", "Girls", "Co-ed"]} value={s3.pgType} onSelect={(v) => setS3((p) => ({ ...p, pgType: v }))} /></div>
                </div>
              </div>

              {/* B. Rooms & Beds */}
              <div className="rounded-2xl p-4 mb-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>B. Rooms & Beds</p>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div><Label>Total Rooms</Label><FormInput placeholder="8" value={s3.rooms} onChange={(v) => setS3((p) => ({ ...p, rooms: v }))} /></div>
                  <div><Label>Beds per Room</Label><FormInput placeholder="2" value={s3.bedsPerRoom} onChange={(v) => setS3((p) => ({ ...p, bedsPerRoom: v }))} /></div>
                </div>
                {totalBeds > 0 && (
                  <div className="rounded-xl px-4 py-2.5 flex items-center gap-2" style={{ background: C.primaryGhost }}>
                    <CheckCircle2 size={14} style={{ color: C.primary }} />
                    <span className="text-sm font-semibold" style={{ color: C.primary }}>
                      Your PG has <strong>{totalBeds}</strong> total beds
                    </span>
                  </div>
                )}
              </div>

              {/* C. Rent Rules */}
              <div className="rounded-2xl p-4 mb-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>C. Rent Rules</p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div><Label>Monthly Rent/Bed (₹)</Label><FormInput placeholder="8500" prefix="₹" value={s3.defaultRent} onChange={(v) => setS3((p) => ({ ...p, defaultRent: v }))} /></div>
                  <div><Label>Advance Amount (₹)</Label><FormInput placeholder="8500" prefix="₹" value={s3.advance} onChange={(v) => setS3((p) => ({ ...p, advance: v }))} /></div>
                </div>
                <div className="mb-3">
                  <Label>Rent Due Date</Label>
                  <PillSelector options={["1st", "5th", "7th", "10th"]} value={`${s3.rentDue}th`} onSelect={(v) => setS3((p) => ({ ...p, rentDue: v.replace(/\D/g, "") }))} />
                </div>
                <div>
                  <Label>Notice Period</Label>
                  <PillSelector options={["15 days", "30 days", "45 days"]} value={`${s3.notice} days`} onSelect={(v) => setS3((p) => ({ ...p, notice: v.replace(/\D/g, "") }))} />
                </div>
              </div>

              {/* D. WhatsApp */}
              <div className="rounded-2xl p-4 mb-6" style={{ background: C.card, border: `1px solid ${C.border}` }}>
                <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>D. WhatsApp Setup</p>
                <div className="mb-3">
                  <Label>Your WhatsApp Number</Label>
                  <FormInput placeholder="98765 43210" prefix="+91" value={s3.whatsapp} onChange={(v) => setS3((p) => ({ ...p, whatsapp: v }))} />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: C.heading }}>Enable automated reminders</p>
                    <p className="text-xs" style={{ color: C.muted }}>Auto-send rent reminders to tenants</p>
                  </div>
                  <div
                    onClick={() => setS3((p) => ({ ...p, enableReminders: !p.enableReminders }))}
                    className="w-12 h-6 rounded-full transition-all relative cursor-pointer"
                    style={{ background: s3.enableReminders ? C.primary : C.border }}
                  >
                    <div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                      style={{ left: s3.enableReminders ? "calc(100% - 20px)" : 4 }}
                    />
                  </div>
                </div>
                <div className="rounded-xl p-3 flex items-start gap-3" style={{ background: C.primaryGhost }}>
                  <MessageSquare size={16} style={{ color: C.primary }} className="mt-0.5 flex-shrink-0" />
                  <p className="text-xs" style={{ color: C.primary }}>
                    We'll send rent reminders 3 days before, on due date, and after due date via WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky footer button */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "white", borderTop: "1px solid #E2E8F0",
        padding: "12px 16px 28px",
      }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            if (step === "register") setStep("profile");
            else if (step === "profile") setStep("create_pg");
            else setPgDone(true);
          }}
          style={{
            width: "100%", height: 56, borderRadius: 100,
            background: "#7C3AED", color: "white",
            fontSize: 16, fontWeight: 700, border: "none",
            cursor: "pointer",
          }}
        >
          {step === "register" && "Continue →"}
          {step === "profile" && `Continue with ${selectedPlanObj.name} →`}
          {step === "create_pg" && "Launch My Dashboard →"}
        </motion.button>
      </div>
    </div>
  );
}