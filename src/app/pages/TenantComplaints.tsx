import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Moon, Sun, CheckCircle2, ClipboardList } from "lucide-react";

const PURPLE       = "#8A2BE2";
const PURPLE_DARK  = "#6D1CB5";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_BORDER = "rgba(138,43,226,0.22)";
const PURPLE_SHADOW = "rgba(138,43,226,0.28)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF", elevated: "#EDE9FE",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  divider: "#E9E3F5", card: "#FFFFFF", cardBorder: "#E9E3F5",
  inputBg: "#F5F3FF",
  warning: "#D97706", warningBg: "rgba(217,119,6,0.10)",
  success: "#059669", successBg: "rgba(5,150,105,0.08)",
};
const DARK = {
  bg: "#0F0F13", surface: "#1A1A24", elevated: "#22223A",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  divider: "#2D2D3D", card: "#1A1A24", cardBorder: "#2D2D3D",
  inputBg: "#22223A",
  warning: "#F59E0B", warningBg: "rgba(245,158,11,0.12)",
  success: "#10B981", successBg: "rgba(16,185,129,0.10)",
};

const CATEGORIES = [
  { key: "Maintenance", icon: "🔧" },
  { key: "WiFi", icon: "📶" },
  { key: "Food", icon: "🍽️" },
  { key: "Cleanliness", icon: "🧹" },
  { key: "Noise", icon: "🔊" },
  { key: "Plumbing", icon: "🚿" },
  { key: "Electricity", icon: "💡" },
  { key: "Security", icon: "🔒" },
  { key: "Other", icon: "📦" },
];

type Urgency = "Can wait" | "Urgent" | "Emergency";
type Status = "Open" | "In Progress" | "Resolved";
type FilterTab = "All" | Status;

interface Complaint {
  id: string;
  category: string;
  categoryIcon: string;
  text: string;
  urgency: Urgency;
  status: Status;
  date: string;
  reply?: string;
}

const INIT_COMPLAINTS: Complaint[] = [
  {
    id: "c1", category: "Maintenance", categoryIcon: "🔧",
    text: "The AC in room 204 stopped working yesterday. It's very hot at night.",
    urgency: "Urgent", status: "In Progress", date: "Feb 25, 2025",
    reply: "We have raised a service request. Technician will visit by tomorrow evening.",
  },
  {
    id: "c2", category: "WiFi", categoryIcon: "📶",
    text: "Internet speed is very slow in the evening, especially between 8–11 PM.",
    urgency: "Can wait", status: "Open", date: "Feb 23, 2025",
  },
  {
    id: "c3", category: "Food", categoryIcon: "🍽️",
    text: "Dinner portion size has reduced significantly over the past week.",
    urgency: "Can wait", status: "Resolved", date: "Feb 20, 2025",
    reply: "We have spoken to the cook and increased portion sizes from today.",
  },
];

function StatusBadge({ status, t }: { status: string; t: typeof LIGHT }) {
  const map: Record<string, { color: string; bg: string }> = {
    "Open":        { color: t.warning, bg: t.warningBg },
    "In Progress": { color: PURPLE,    bg: PURPLE_GHOST },
    "Resolved":    { color: t.success, bg: t.successBg },
  };
  const c = map[status] || { color: t.muted, bg: t.surface };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 700,
      color: c.color, background: c.bg,
    }}>
      {status}
    </span>
  );
}

// ── Tab: Raise Issue ─────────────────────────────────────────
function RaiseIssueTab({
  t, onSuccess,
}: {
  t: typeof LIGHT;
  onSuccess: (cat: string) => void;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [urgency, setUrgency] = useState<Urgency>("Can wait");
  const [focused, setFocused] = useState(false);

  const catIcon = CATEGORIES.find(c => c.key === selectedCat)?.icon || "📦";

  if (step === 1) {
    return (
      <div style={{ padding: "16px 16px 80px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, marginBottom: 6 }}>
          What's the problem?
        </h2>
        <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>
          Select the category that best describes your issue
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 24 }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                style={{
                  background: isSelected ? PURPLE_GHOST : t.surface,
                  border: `2px solid ${isSelected ? PURPLE : t.cardBorder}`,
                  borderRadius: 16, padding: "14px 8px",
                  cursor: "pointer", position: "relative",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: 6, transition: "all 0.15s",
                }}
              >
                {isSelected && (
                  <div style={{
                    position: "absolute", top: 6, right: 6,
                    width: 16, height: 16, background: PURPLE,
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ color: "white", fontSize: 10, fontWeight: 900 }}>✓</span>
                  </div>
                )}
                <span style={{ fontSize: 26 }}>{cat.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: isSelected ? PURPLE : t.body, textAlign: "center" }}>
                  {cat.key}
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => { if (selectedCat) setStep(2); }}
          disabled={!selectedCat}
          style={{
            width: "100%", padding: 14, borderRadius: 14, border: "none",
            background: selectedCat ? PURPLE : t.surface,
            color: selectedCat ? "white" : t.muted,
            fontSize: 15, fontWeight: 700, cursor: selectedCat ? "pointer" : "default",
            boxShadow: selectedCat ? `0 4px 16px ${PURPLE_SHADOW}` : "none",
            transition: "all 0.15s",
          }}
        >
          Next →
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <button
        onClick={() => setStep(1)}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: PURPLE, display: "flex", alignItems: "center", gap: 6,
          marginBottom: 16, padding: 0, fontSize: 14, fontWeight: 600,
        }}
      >
        ← Back
      </button>

      <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, marginBottom: 4 }}>
        {catIcon} {selectedCat} Issue
      </h2>
      <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>
        Describe the issue clearly so the owner can act quickly
      </p>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 6 }}>
          Describe the issue *
        </label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value.slice(0, 300))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          placeholder="e.g. The AC started making a loud noise and stopped cooling yesterday evening..."
          style={{
            width: "100%", borderRadius: 14, border: `2px solid ${focused ? PURPLE : t.cardBorder}`,
            background: t.inputBg, padding: "12px 14px", fontSize: 14,
            color: t.body, resize: "none", outline: "none", boxSizing: "border-box",
            transition: "border-color 0.15s", fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <p style={{ fontSize: 11, color: t.muted, textAlign: "right", marginTop: 4 }}>
          {desc.length}/300
        </p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>
          How urgent is this?
        </label>
        <div style={{ display: "flex", gap: 8 }}>
          {(["Can wait", "Urgent", "Emergency"] as Urgency[]).map((u) => {
            const isActive = urgency === u;
            const activeStyle =
              u === "Can wait" ? { bg: PURPLE_GHOST, color: PURPLE, border: PURPLE } :
              u === "Urgent"   ? { bg: "rgba(217,119,6,0.15)", color: "#D97706", border: "#D97706" } :
                                 { bg: "rgba(220,38,38,0.10)", color: "#DC2626", border: "#DC2626" };
            return (
              <button
                key={u}
                onClick={() => setUrgency(u)}
                style={{
                  flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                  border: `2px solid ${isActive ? activeStyle.border : t.cardBorder}`,
                  background: isActive ? activeStyle.bg : t.surface,
                  color: isActive ? activeStyle.color : t.muted,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {u === "Can wait" ? "🟢 Can wait" : u === "Urgent" ? "🟡 Urgent" : "🔴 Emergency"}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => { if (desc.trim()) onSuccess(selectedCat!); }}
        disabled={!desc.trim()}
        style={{
          width: "100%", padding: 14, borderRadius: 14, border: "none",
          background: desc.trim() ? PURPLE : t.surface,
          color: desc.trim() ? "white" : t.muted,
          fontSize: 15, fontWeight: 700, cursor: desc.trim() ? "pointer" : "default",
          boxShadow: desc.trim() ? `0 4px 16px ${PURPLE_SHADOW}` : "none",
          transition: "all 0.15s",
        }}
      >
        Submit Report →
      </button>
    </div>
  );
}

// ── Tab: My Complaints ───────────────────────────────────────
function MyComplaintsTab({ complaints, t, onAdd }: {
  complaints: Complaint[];
  t: typeof LIGHT;
  onAdd: () => void;
}) {
  const [filter, setFilter] = useState<FilterTab>("All");

  const filters: FilterTab[] = ["All", "Open", "In Progress", "Resolved"];
  const filtered = filter === "All" ? complaints : complaints.filter(c => c.status === filter);

  const leftBorder: Record<Status, string> = {
    "Open": "#D97706",
    "In Progress": PURPLE,
    "Resolved": "#059669",
  };

  return (
    <div style={{ padding: "16px 16px 80px" }}>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              flexShrink: 0, padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
              border: "none", cursor: "pointer", transition: "all 0.15s",
              background: filter === f ? PURPLE : t.surface,
              color: filter === f ? "white" : t.muted,
              boxShadow: filter === f ? `0 2px 8px ${PURPLE_SHADOW}` : "none",
            }}
          >
            {f}
            {f !== "All" && (
              <span style={{
                marginLeft: 5, fontSize: 11,
                color: filter === f ? "rgba(255,255,255,0.8)" : t.muted,
              }}>
                {complaints.filter(c => c.status === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", paddingTop: 60, gap: 12, textAlign: "center",
        }}>
          <div style={{ width: 64, height: 64, background: PURPLE_GHOST, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ClipboardList size={26} color={PURPLE} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: t.heading, margin: 0 }}>No complaints</p>
          <p style={{ fontSize: 13, color: t.muted, margin: 0 }}>
            {filter === "All" ? "You haven't raised any issues yet" : `No ${filter.toLowerCase()} complaints`}
          </p>
          {filter === "All" && (
            <button
              onClick={onAdd}
              style={{
                background: PURPLE, color: "white", border: "none", borderRadius: 12,
                padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                boxShadow: `0 4px 12px ${PURPLE_SHADOW}`,
              }}
            >
              Raise an Issue
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((c) => (
            <div
              key={c.id}
              style={{
                background: t.card,
                borderTop: `1px solid ${t.cardBorder}`,
                borderRight: `1px solid ${t.cardBorder}`,
                borderBottom: `1px solid ${t.cardBorder}`,
                borderLeft: `3px solid ${leftBorder[c.status]}`,
                borderRadius: 16, padding: "14px 14px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{c.categoryIcon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.heading }}>{c.category}</span>
                </div>
                <StatusBadge status={c.status} t={t} />
              </div>

              <p style={{ fontSize: 13, color: t.body, marginBottom: 8, lineHeight: 1.5 }}>{c.text}</p>
              <p style={{ fontSize: 11, color: t.muted, marginBottom: c.status === "In Progress" ? 12 : 0 }}>
                📅 {c.date} · {c.urgency}
              </p>

              {/* Progress timeline for In Progress */}
              {c.status === "In Progress" && (
                <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: c.reply ? 12 : 0 }}>
                  {["Raised", "Acknowledged", "Resolved"].map((step, i) => {
                    const done = i < 2;
                    return (
                      <div key={step} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <div style={{
                            width: 20, height: 20, borderRadius: "50%",
                            background: done ? PURPLE : t.surface,
                            border: `2px solid ${done ? PURPLE : t.cardBorder}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            {done && <span style={{ color: "white", fontSize: 10 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: 9, color: done ? PURPLE : t.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{step}</span>
                        </div>
                        {i < 2 && (
                          <div style={{ flex: 1, height: 2, background: done ? PURPLE : t.cardBorder, margin: "0 4px", marginBottom: 14 }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Owner reply */}
              {c.reply && (
                <div style={{
                  background: PURPLE_GHOST, borderRadius: 12, padding: "10px 12px",
                  borderTop: "none",
                  borderRight: "none",
                  borderBottom: "none",
                  borderLeft: `2px solid ${PURPLE}`,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: PURPLE, marginBottom: 3 }}>Owner's reply</p>
                  <p style={{ fontSize: 12, color: t.body, margin: 0, lineHeight: 1.5 }}>{c.reply}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export function TenantComplaints() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const t = darkMode ? DARK : LIGHT;
  const [activeTab, setActiveTab] = useState<"raise" | "mine">("raise");
  const [complaints, setComplaints] = useState<Complaint[]>(INIT_COMPLAINTS);
  const [successCat, setSuccessCat] = useState<string | null>(null);
  const [refNum] = useState(`PG-${Date.now().toString().slice(-6)}`);

  const handleSuccess = (cat: string) => {
    setSuccessCat(cat);
  };

  const handleTrack = () => {
    setSuccessCat(null);
    setActiveTab("mine");
  };

  const handleRaiseAnother = () => {
    setSuccessCat(null);
  };

  // ── Success Screen ─────────────────────────────────────────
  if (successCat) {
    return (
      <div style={{
        background: t.bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "40px 24px", textAlign: "center",
      }}>
        <div style={{
          width: 80, height: 80, background: PURPLE_GHOST, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
          border: `2px solid ${PURPLE_BORDER}`,
        }}>
          <CheckCircle2 size={36} color={PURPLE} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, marginBottom: 8 }}>Issue Reported!</h2>
        <p style={{ fontSize: 14, color: t.muted, marginBottom: 20, lineHeight: 1.6 }}>
          Your PG owner has been notified and will respond shortly.
        </p>
        <div style={{
          background: PURPLE_GHOST, border: `1px solid ${PURPLE_BORDER}`,
          borderRadius: 12, padding: "8px 20px", marginBottom: 28,
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ fontSize: 12, color: t.muted }}>Reference:</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: PURPLE }}>{refNum}</span>
        </div>
        <button
          onClick={handleTrack}
          style={{
            width: "100%", padding: 14, borderRadius: 14, border: "none",
            background: PURPLE, color: "white", fontSize: 15, fontWeight: 700,
            cursor: "pointer", boxShadow: `0 4px 16px ${PURPLE_SHADOW}`, marginBottom: 12,
          }}
        >
          Track This Complaint →
        </button>
        <button
          onClick={handleRaiseAnother}
          style={{ background: "none", border: "none", fontSize: 14, color: t.muted, cursor: "pointer", fontWeight: 600 }}
        >
          Raise another issue
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: t.bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif", color: t.body }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "48px 16px 14px", background: t.card,
        borderBottom: `1px solid ${t.cardBorder}`, position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "none", border: "none", cursor: "pointer", color: PURPLE, padding: 0, display: "flex", alignItems: "center" }}
          >
            <ArrowLeft size={20} color={PURPLE} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>Complaints & Issues</span>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer" }}
        >
          {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
        </button>
      </div>

      {/* Tab switcher */}
      <div style={{ padding: "12px 16px 0", background: t.card, borderBottom: `1px solid ${t.cardBorder}` }}>
        <div style={{ display: "flex", background: t.surface, borderRadius: 12, padding: 3 }}>
          {([["raise", "📋 Raise Issue"], ["mine", "My Complaints"]] as [string, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as "raise" | "mine")}
              style={{
                flex: 1, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 700, transition: "all 0.15s",
                background: activeTab === key ? t.card : "transparent",
                color: activeTab === key ? PURPLE : t.muted,
                boxShadow: activeTab === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
              {key === "mine" && complaints.filter(c => c.status !== "Resolved").length > 0 && (
                <span style={{
                  marginLeft: 6, background: PURPLE, color: "white",
                  borderRadius: "50%", fontSize: 10, fontWeight: 700,
                  padding: "1px 5px", display: "inline-block",
                }}>
                  {complaints.filter(c => c.status !== "Resolved").length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "raise"
        ? <RaiseIssueTab t={t} onSuccess={handleSuccess} />
        : <MyComplaintsTab complaints={complaints} t={t} onAdd={() => setActiveTab("raise")} />
      }
    </div>
  );
}