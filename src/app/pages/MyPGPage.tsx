import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MapPin, Star, ChevronRight, Plus, X, AlertCircle,
  Wifi, Wind, CheckCircle2, Clock, Users,
  UtensilsCrossed, WashingMachine, Shield, Zap, Dumbbell, Car,
} from "lucide-react";
import { IMAGES } from "../data/mockData";

const PURPLE       = "#8A2BE2";
const PURPLE_DARK  = "#6D1CB5";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_BORDER = "rgba(138,43,226,0.22)";
const PURPLE_SHADOW = "rgba(138,43,226,0.28)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF", elevated: "#EDE9FE",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  card: "#FFFFFF", cardBorder: "#E9E3F5", inputBg: "#F5F3FF",
};
const DARK = {
  bg: "#0F0F13", surface: "#1A1A24", elevated: "#22223A",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  card: "#1A1A24", cardBorder: "#2D2D3D", inputBg: "#22223A",
};

const myPG = {
  name: "Sunrise Premium PG",
  area: "3rd Cross, Koramangala 4th Block, Bangalore",
  rating: 4.5, room: "204", since: "Jan 2025",
  rent: 8500, rentDue: "Mar 5, 2025", rentPaid: false,
  owner: "Mr. Ravi Sharma", ownerPhone: "+91 98765 43210",
  image: IMAGES.building1, totalTenants: 18,
  type: "Boys PG",
  amenities: [
    { key: "WiFi", icon: <Wifi size={16} />, available: true },
    { key: "AC", icon: <Wind size={16} />, available: true },
    { key: "Meals", icon: <UtensilsCrossed size={16} />, available: true },
    { key: "Laundry", icon: <WashingMachine size={16} />, available: false },
    { key: "CCTV", icon: <Shield size={16} />, available: true },
    { key: "Power Backup", icon: <Zap size={16} />, available: false },
    { key: "Gym", icon: <Dumbbell size={16} />, available: false },
    { key: "Parking", icon: <Car size={16} />, available: true },
  ],
  rules: [
    "No guests after 10 PM",
    "No cooking in rooms",
    "Maintain common area cleanliness",
    "Noise restriction after 11 PM",
    "Rent due by 7th of every month",
  ],
};

const myRoommates = [
  { id: "t1", name: "Rahul", occupation: "Software Eng.", lifestyle: "Night Owl 🦉", photo: IMAGES.man1 },
  { id: "t4", name: "Sneha", occupation: "UX Designer", lifestyle: "Early Bird 🌅", photo: IMAGES.woman2 },
];

const pgMates = [
  { id: "t5", name: "Vikram", occupation: "Data Scientist", lifestyle: "Night Owl 🦉", photo: IMAGES.man3 },
  { id: "t3", name: "Arjun", occupation: "Product Manager", lifestyle: "Night Owl 🦉", photo: IMAGES.man2 },
  { id: "t2", name: "Priya", occupation: "Student", lifestyle: "Early Bird 🌅", photo: IMAGES.woman1 },
];

type Priority = "Urgent" | "Normal" | "Low";
type Status   = "Pending" | "In Progress" | "Resolved";

interface Complaint {
  id: string; title: string; desc: string;
  category: string; date: string; priority: Priority; status: Status;
}

const initComplaints: Complaint[] = [
  { id: "c1", title: "AC not working", desc: "The AC in room 204 stopped working yesterday", category: "Maintenance", date: "Feb 25, 2025", priority: "Urgent", status: "In Progress" },
  { id: "c2", title: "WiFi speed issue", desc: "Internet speed is very slow in the evening", category: "Amenity", date: "Feb 23, 2025", priority: "Normal", status: "Pending" },
  { id: "c3", title: "Food quality", desc: "Dinner portion size has reduced", category: "Food", date: "Feb 20, 2025", priority: "Low", status: "Resolved" },
];

const priorityStyle: Record<Priority, { color: string; bg: string }> = {
  Urgent: { color: "#DC2626", bg: "rgba(220,38,38,0.08)" },
  Normal: { color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  Low:    { color: "#059669", bg: "rgba(5,150,105,0.08)" },
};

const statusStyle: Record<Status, { color: string }> = {
  Pending:      { color: "#D97706" },
  "In Progress": { color: PURPLE },
  Resolved:     { color: "#059669" },
};

function AddComplaintModal({ onClose, onAdd, t }: {
  onClose: () => void; onAdd: (c: Complaint) => void; t: typeof LIGHT;
}) {
  const [title, setTitle] = useState(""); const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Maintenance");
  const [priority, setPriority] = useState<Priority>("Normal");
  const categories = ["Maintenance", "Amenity", "Food", "Cleanliness", "Security", "Other"];

  const submit = () => {
    if (!title.trim()) return;
    onAdd({ id: `c${Date.now()}`, title: title.trim(), desc: desc.trim() || "No description", category, date: "Mar 1, 2025", priority, status: "Pending" });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 50,
      display: "flex", alignItems: "flex-end", animation: "fadeIn 0.2s ease",
    }} onClick={onClose}>
      <div style={{
        background: t.card, width: "100%", borderRadius: "24px 24px 0 0",
        maxHeight: "90vh", overflowY: "auto",
        animation: "slideUp 0.28s cubic-bezier(0.32,0.72,0,1)",
      }} onClick={e => e.stopPropagation()}>
        <style>{`
          @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        `}</style>
        <div style={{
          padding: "20px 20px 14px", borderBottom: `1px solid ${t.cardBorder}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, background: t.card,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: t.heading, margin: 0 }}>New Complaint</h2>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: "50%", background: t.surface,
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <X size={16} color={t.muted} />
          </button>
        </div>
        <div style={{ padding: "16px 20px 32px", display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Issue Title *", value: title, onChange: setTitle, placeholder: "e.g. Water leakage in bathroom", type: "input" },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 6 }}>{f.label}</label>
              <input value={f.value} onChange={e => f.onChange(e.target.value)} placeholder={f.placeholder}
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 12, boxSizing: "border-box",
                  border: `1.5px solid ${t.cardBorder}`, background: t.inputBg, color: t.heading,
                  outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                }}
                onFocus={e => { e.target.style.borderColor = PURPLE; e.target.style.boxShadow = "0 0 0 3px rgba(138,43,226,0.12)"; }}
                onBlur={e => { e.target.style.borderColor = t.cardBorder; e.target.style.boxShadow = "none"; }}
              />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 6 }}>Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3}
              placeholder="Describe the issue in detail..."
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 12, boxSizing: "border-box",
                border: `1.5px solid ${t.cardBorder}`, background: t.inputBg, color: t.heading,
                outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "none",
              }}
              onFocus={e => { e.target.style.borderColor = PURPLE; e.target.style.boxShadow = "0 0 0 3px rgba(138,43,226,0.12)"; }}
              onBlur={e => { e.target.style.borderColor = t.cardBorder; e.target.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>Category</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {categories.map(c => (
                <button key={c} onClick={() => setCategory(c)} style={{
                  padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: "none", cursor: "pointer", transition: "all 0.15s",
                  background: category === c ? PURPLE : t.surface,
                  color: category === c ? "white" : t.muted,
                }}>{c}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>Priority</label>
            <div style={{ display: "flex", gap: 8 }}>
              {(["Urgent", "Normal", "Low"] as Priority[]).map(p => {
                const ps = priorityStyle[p];
                return (
                  <button key={p} onClick={() => setPriority(p)} style={{
                    flex: 1, padding: "8px 4px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                    border: `2px solid ${priority === p ? ps.color : t.cardBorder}`,
                    background: priority === p ? ps.bg : t.surface,
                    color: priority === p ? ps.color : t.muted,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>{p}</button>
                );
              })}
            </div>
          </div>
          <button onClick={submit} disabled={!title.trim()} style={{
            width: "100%", padding: 14, borderRadius: 14, border: "none",
            background: title.trim() ? PURPLE : t.surface,
            color: title.trim() ? "white" : t.muted,
            fontSize: 15, fontWeight: 700, cursor: title.trim() ? "pointer" : "default",
            boxShadow: title.trim() ? `0 4px 16px ${PURPLE_SHADOW}` : "none",
            transition: "all 0.15s",
          }}>
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
}

export function MyPGPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const t = darkMode ? DARK : LIGHT;
  const [complaints, setComplaints] = useState<Complaint[]>(initComplaints);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAllRoommates, setShowAllRoommates] = useState(false);
  const [showAllPGMates, setShowAllPGMates] = useState(false);
  const [showMoveOut, setShowMoveOut] = useState(false);
  const [moveOutConfirmed, setMoveOutConfirmed] = useState(false);

  const addComplaint = (c: Complaint) => setComplaints(prev => [c, ...prev]);
  const displayedRoommates = showAllRoommates ? myRoommates : myRoommates.slice(0, 2);
  const displayedPGMates   = showAllPGMates   ? pgMates    : pgMates.slice(0, 3);
  const openComplaints = complaints.filter(c => c.status !== "Resolved").length;

  return (
    <div style={{ background: t.bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .anim-1 { animation: fadeSlideUp 0.3s 0.05s both; }
        .anim-2 { animation: fadeSlideUp 0.3s 0.10s both; }
        .anim-3 { animation: fadeSlideUp 0.3s 0.15s both; }
        .anim-4 { animation: fadeSlideUp 0.3s 0.20s both; }
        .anim-5 { animation: fadeSlideUp 0.3s 0.25s both; }
      `}</style>

      {/* ── Header ───────────────────────────────────── */}
      <div style={{
        padding: "48px 16px 12px", background: t.card,
        borderBottom: `1px solid ${t.cardBorder}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>My PG</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex" }}
        >
          {darkMode
            ? <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth={2}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            : <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth={2}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>
      </div>

      <div style={{ padding: "16px 16px 0" }}>

        {/* ── Hero Card ────────────────────────────────── */}
        <div className="anim-1" style={{
          background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)`,
          borderRadius: 20, padding: "22px 18px",
          boxShadow: "0 8px 28px rgba(138,43,226,0.32)",
          position: "relative", overflow: "hidden", marginBottom: 14,
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.08,
            backgroundImage: `url(${myPG.image})`, backgroundSize: "cover", backgroundPosition: "center",
          }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: "white", margin: "0 0 6px", letterSpacing: "-0.3px" }}>
                  {myPG.name}
                </h1>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                  <span style={{ fontSize: 12 }}>📍</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.70)" }}>{myPG.area}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[myPG.type, `Since ${myPG.since}`].map(badge => (
                    <span key={badge} style={{
                      fontSize: 11, fontWeight: 600, color: "white",
                      background: "rgba(255,255,255,0.20)", borderRadius: 20, padding: "3px 10px",
                    }}>{badge}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(251,191,36,1)", borderRadius: 20, padding: "4px 10px" }}>
                <Star size={11} style={{ fill: "white", color: "white" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{myPG.rating}</span>
              </div>
            </div>
            {/* Room pills */}
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.18)", borderRadius: 14, padding: "10px 14px" }}>
                <p style={{ color: "rgba(255,255,255,0.60)", fontSize: 9, fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Room</p>
                <p style={{ color: "white", fontWeight: 900, fontSize: 20, margin: 0 }}>{myPG.room}</p>
              </div>
              <div style={{ flex: 1, background: "rgba(255,255,255,0.18)", borderRadius: 14, padding: "10px 14px" }}>
                <p style={{ color: "rgba(255,255,255,0.60)", fontSize: 9, fontWeight: 700, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Tenants</p>
                <p style={{ color: "white", fontWeight: 900, fontSize: 20, margin: 0 }}>{myPG.totalTenants}</p>
              </div>
            </div>
            {/* Rent bar */}
            {!myPG.rentPaid ? (
              <div style={{ background: "rgba(245,158,11,1)", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "white", fontWeight: 800, fontSize: 15, margin: 0 }}>₹{myPG.rent.toLocaleString()} Due</p>
                  <p style={{ color: "rgba(255,255,255,0.80)", fontSize: 11, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={10} /> Due by {myPG.rentDue}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/tenant/mypg")}
                  style={{
                    background: "white", color: "#D97706", border: "none", borderRadius: 10,
                    padding: "7px 14px", fontSize: 12, fontWeight: 800, cursor: "pointer",
                    transition: "transform 0.12s",
                  }}
                  onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
                  onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Pay Now
                </button>
              </div>
            ) : (
              <div style={{ background: "rgba(16,185,129,0.85)", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 size={18} color="white" />
                <p style={{ color: "white", fontWeight: 700, fontSize: 13, margin: 0 }}>Rent Paid ✓ for this month</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Owner Contact Card ───────────────────────── */}
        <div className="anim-2" style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, padding: "14px 16px", marginBottom: 14,
          boxShadow: "0 2px 12px rgba(138,43,226,0.06)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: t.muted, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Owner Contact
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: PURPLE,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 800, color: "white", flexShrink: 0,
            }}>
              R
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.heading }}>{myPG.owner}</p>
              <p style={{ margin: 0, fontSize: 12, color: t.muted }}>{myPG.ownerPhone}</p>
            </div>
            <button
              onClick={() => navigate("/tenant/messages")}
              style={{
                background: PURPLE_GHOST, border: `1.5px solid ${PURPLE_BORDER}`, borderRadius: 12,
                padding: "8px 14px", fontSize: 13, fontWeight: 700, color: PURPLE, cursor: "pointer",
                transition: "transform 0.12s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              💬 Message
            </button>
          </div>

          {/* Quick actions row */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <button onClick={() => navigate("/tenant/updates")}
              style={{
                flex: 1, padding: "9px 8px", background: PURPLE_GHOST,
                border: `1px solid ${PURPLE_BORDER}`, borderRadius: 12,
                color: PURPLE, fontSize: 12, fontWeight: 700, cursor: "pointer",
                transition: "transform 0.12s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >📢 Updates</button>
            <button onClick={() => navigate("/tenant/complaints")}
              style={{
                flex: 1, padding: "9px 8px", background: PURPLE_GHOST,
                border: `1px solid ${PURPLE_BORDER}`, borderRadius: 12,
                color: PURPLE, fontSize: 12, fontWeight: 700, cursor: "pointer",
                transition: "transform 0.12s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >📋 Raise Issue</button>
            <button onClick={() => navigate("/tenant/messages")}
              style={{
                flex: 1, padding: "9px 8px", background: PURPLE,
                border: "none", borderRadius: 12, color: "white",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                boxShadow: `0 3px 12px ${PURPLE_SHADOW}`, transition: "transform 0.12s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >💬 Message</button>
          </div>
        </div>

        {/* ── Amenities Grid ───────────────────────────── */}
        <div className="anim-3" style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: t.muted, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Amenities
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {myPG.amenities.map(a => (
              <div key={a.key} style={{
                background: a.available ? PURPLE_GHOST : t.surface,
                border: `1.5px solid ${a.available ? PURPLE_BORDER : t.cardBorder}`,
                borderRadius: 14, padding: "10px 6px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
                opacity: a.available ? 1 : 0.45, transition: "transform 0.12s",
                cursor: "default",
              }}>
                <div style={{ color: a.available ? PURPLE : t.muted }}>
                  {a.icon}
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: a.available ? PURPLE : t.muted, textAlign: "center" }}>
                  {a.key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Roommates ────────────────────────────────── */}
        <div className="anim-3" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={15} color={PURPLE} />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.heading }}>Your Roommates</span>
              <span style={{
                background: PURPLE, color: "white", fontSize: 10, fontWeight: 700,
                width: 20, height: 20, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{myRoommates.length}</span>
            </div>
            <button onClick={() => setShowAllRoommates(p => !p)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 2, color: PURPLE, fontSize: 12, fontWeight: 600,
            }}>
              {showAllRoommates ? "Show Less" : "View All"} <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {displayedRoommates.map(rm => (
              <div key={rm.id} style={{
                background: t.card, border: `1px solid ${t.cardBorder}`,
                borderRadius: 16, padding: 12, flexShrink: 0, width: 130, textAlign: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}>
                <img src={rm.photo} alt={rm.name} style={{ width: 60, height: 60, borderRadius: 14, objectFit: "cover", display: "block", margin: "0 auto 8px" }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: t.heading, margin: "0 0 2px" }}>{rm.name}</p>
                <p style={{ fontSize: 10, color: t.muted, margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{rm.occupation}</p>
                <span style={{ fontSize: 10, fontWeight: 600, background: PURPLE_GHOST, color: PURPLE, borderRadius: 20, padding: "2px 8px" }}>{rm.lifestyle}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PG Mates ─────────────────────────────────── */}
        <div className="anim-4" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Users size={15} color={PURPLE} />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.heading }}>PG Mates</span>
              <span style={{
                background: PURPLE, color: "white", fontSize: 10, fontWeight: 700,
                width: 20, height: 20, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{myPG.totalTenants}</span>
            </div>
            <button onClick={() => setShowAllPGMates(p => !p)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 2, color: PURPLE, fontSize: 12, fontWeight: 600,
            }}>
              {showAllPGMates ? "Show Less" : "View All"} <ChevronRight size={13} />
            </button>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
            {displayedPGMates.map(mate => (
              <div key={mate.id} style={{
                background: t.card, border: `1px solid ${t.cardBorder}`,
                borderRadius: 16, padding: 12, flexShrink: 0, width: 110, textAlign: "center",
              }}>
                <img src={mate.photo} alt={mate.name} style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover", display: "block", margin: "0 auto 8px" }} />
                <p style={{ fontSize: 12, fontWeight: 700, color: t.heading, margin: "0 0 2px" }}>{mate.name}</p>
                <p style={{ fontSize: 10, color: t.muted, margin: "0 0 5px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mate.occupation}</p>
                <span style={{ fontSize: 10, fontWeight: 600, background: PURPLE_GHOST, color: PURPLE, borderRadius: 20, padding: "2px 7px" }}>{mate.lifestyle}</span>
              </div>
            ))}
            {!showAllPGMates && (
              <div
                onClick={() => setShowAllPGMates(true)}
                style={{
                  background: t.surface, borderRadius: 16, padding: 12, flexShrink: 0, width: 80,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", border: `1px solid ${t.cardBorder}`,
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 18, color: t.muted }}>+{myPG.totalTenants - displayedPGMates.length}</span>
                <span style={{ fontSize: 10, color: t.muted }}>more</span>
              </div>
            )}
          </div>
        </div>

        {/* ── PG Rules ─────────────────────────────────── */}
        <div className="anim-4" style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, padding: "14px 16px", marginBottom: 14,
          boxShadow: "0 2px 12px rgba(138,43,226,0.04)",
        }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: t.muted, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            PG Rules
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {myPG.rules.map((rule, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: PURPLE, marginTop: 5, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: t.body, margin: 0, lineHeight: 1.5 }}>{rule}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Complaints ───────────────────────────────── */}
        <div className="anim-4" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AlertCircle size={15} color="#DC2626" />
              <span style={{ fontSize: 14, fontWeight: 700, color: t.heading }}>Complaints</span>
              {openComplaints > 0 && (
                <span style={{
                  background: "#DC2626", color: "white", fontSize: 10, fontWeight: 700,
                  padding: "1px 7px", borderRadius: 20,
                }}>{openComplaints}</span>
              )}
            </div>
            <button onClick={() => setShowAddModal(true)} style={{
              background: PURPLE, color: "white", border: "none", borderRadius: 10,
              padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 4,
              boxShadow: `0 3px 10px ${PURPLE_SHADOW}`, transition: "transform 0.12s",
            }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Plus size={13} /> Add
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {complaints.map(c => {
              const ps = priorityStyle[c.priority];
              const ss = statusStyle[c.status];
              return (
                <div key={c.id} style={{
                  background: t.card,
                  borderTop: `1px solid ${t.cardBorder}`, borderRight: `1px solid ${t.cardBorder}`,
                  borderBottom: `1px solid ${t.cardBorder}`,
                  borderLeft: `3px solid ${c.status === "Resolved" ? "#059669" : c.status === "In Progress" ? PURPLE : "#D97706"}`,
                  borderRadius: 16, padding: "12px 14px",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: t.heading, margin: 0, flex: 1 }}>{c.title}</p>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                      color: ps.color, background: ps.bg, flexShrink: 0, marginLeft: 8,
                    }}>{c.priority}</span>
                  </div>
                  <p style={{ fontSize: 12, color: t.muted, margin: "0 0 8px", lineHeight: 1.4 }}>{c.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 10, color: t.muted }}>{c.category} · {c.date}</span>
                    <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, color: ss.color }}>
                      {c.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Move-out Notice ──────────────────────────── */}
        <div className="anim-5" style={{ marginBottom: 20 }}>
          {moveOutConfirmed ? (
            <div style={{
              background: PURPLE_GHOST, border: `1px solid ${PURPLE_BORDER}`,
              borderRadius: 16, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 10,
              animation: "fadeSlideUp 0.3s ease",
            }}>
              <CheckCircle2 size={20} color={PURPLE} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: PURPLE, margin: "0 0 2px" }}>Move-out Notice Submitted</p>
                <p style={{ fontSize: 12, color: t.muted, margin: 0 }}>Your owner has been notified. They'll reach out soon.</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowMoveOut(true)}
              style={{
                width: "100%", padding: 14, border: `2px solid ${PURPLE_BORDER}`,
                borderRadius: 14, background: "transparent", color: PURPLE,
                fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "transform 0.12s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Submit Move-Out Notice
            </button>
          )}
        </div>
      </div>

      {/* Add Complaint Modal */}
      {showAddModal && (
        <AddComplaintModal onClose={() => setShowAddModal(false)} onAdd={addComplaint} t={t} />
      )}

      {/* Move-out Bottom Sheet */}
      {showMoveOut && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.50)", zIndex: 50,
          display: "flex", alignItems: "flex-end",
          animation: "fadeIn 0.2s ease",
        }} onClick={() => setShowMoveOut(false)}>
          <div style={{
            background: t.card, width: "100%", borderRadius: "24px 24px 0 0",
            padding: "24px 20px 48px",
            animation: "slideUp 0.28s cubic-bezier(0.32,0.72,0,1)",
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>Submit Move-Out Notice?</h2>
            <p style={{ fontSize: 14, color: t.muted, margin: "0 0 24px", lineHeight: 1.6 }}>
              This will notify your PG owner that you plan to move out. Make sure you've discussed this with them beforehand.
            </p>
            <button
              onClick={() => { setMoveOutConfirmed(true); setShowMoveOut(false); }}
              style={{
                width: "100%", padding: 14, background: "#DC2626", color: "white",
                border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10,
              }}
            >
              Yes, Submit Notice
            </button>
            <button
              onClick={() => setShowMoveOut(false)}
              style={{
                width: "100%", padding: 14, background: PURPLE_GHOST, color: PURPLE,
                border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
