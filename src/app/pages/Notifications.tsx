import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCheck, Moon, Sun, X, Check, MapPin, Briefcase, Users, Home, Building2, Lock } from "lucide-react";
import { notifications as initialNotifications } from "../data/mockData";

const PURPLE       = "#8A2BE2";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  card: "#FFFFFF", cardBorder: "#E9E3F5", divider: "#E9E3F5",
};
const DARK = {
  bg: "#0F0F13", surface: "#1A1A24",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  card: "#1A1A24", cardBorder: "#2D2D3D", divider: "#2D2D3D",
};

type NotifType = "roommate" | "match" | "pg" | "reminder";

// ─── MATCH NOTIFICATION MOCK PROFILES ────────────────────────
const MATCH_PROFILES = [
  {
    id: "n1",
    firstName: "Priya",
    lastName: "Sharma",
    age: 23,
    occupation: "UX Designer",
    city: "Bangalore",
    vibeMatch: 91,
    lifestyleTags: ["🎨 Art", "☕ Café", "🌅 Early Bird"],
    interestTags: ["📚 Reading", "✨ Minimalist"],
    about: "Looking for a calm, clean space to call home 🌿",
    since: "March 2025",
    livingStatus: "looking" as const,
  },
  {
    id: "n2",
    firstName: "Rahul",
    lastName: "Nair",
    age: 24,
    occupation: "Software Engineer",
    city: "Pune",
    vibeMatch: 88,
    lifestyleTags: ["🦉 Night Owl", "🎮 Gamer", "💻 Tech"],
    interestTags: ["🎵 Music", "🍕 Foodie"],
    about: "Big into gaming and clean spaces 😄",
    since: "Jan 2025",
    livingStatus: "living" as const,
  },
];

// ─── HELPERS ─────────────────────────────────────────────────
function getLeftBorderColor(type: NotifType, read: boolean): string {
  if (read) return "transparent";
  if (type === "reminder") return "#D97706";
  if (type === "match")    return "#DC2626";
  if (type === "pg")       return PURPLE;
  return PURPLE;
}

function getIconBg(type: NotifType): string {
  if (type === "reminder") return "rgba(217,119,6,0.12)";
  if (type === "match")    return "rgba(220,38,38,0.10)";
  return PURPLE_GHOST;
}

// ─── BLURRED AVATAR ──────────────────────────────────────────
function BlurredAvatar({ size = 44 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)",
      filter: "blur(4px)", flexShrink: 0,
    }} />
  );
}

// ─── UNLOCK PAYWALL SHEET ────────────────────────────────────
function UnlockPaywallSheet({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<"single" | "premium">("premium");
  const [state, setState] = useState<"idle" | "processing" | "success">("idle");

  const handleContinue = async () => {
    setState("processing");
    await new Promise(r => setTimeout(r, 1000));
    setState("success");
    setTimeout(() => onClose(), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl bg-white p-5 pb-8 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto" />
        {state === "success" ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <style>{`@keyframes popInN{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", animation: "popInN 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
              <Check size={36} color="#10B981" />
            </div>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Unlocked! 🎉</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <p style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "0 0 4px" }}>Unlock This Connection 🔓</p>
              <p style={{ fontSize: 14, color: "#64748B", margin: 0 }}>See full profile and start chatting</p>
            </div>
            <div className="flex flex-col gap-2">
              {["See full name and photo", "View complete profile and tags", "Start chatting directly"].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check size={11} color="#10B981" />
                  </div>
                  <span style={{ fontSize: 14, color: "#0F172A" }}>{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => setSelected("single")} className="w-full text-left p-4 rounded-2xl flex items-center gap-3 transition-all"
                style={{ background: selected === "single" ? "#FAFAFF" : "white", border: `${selected === "single" ? 2 : 1}px solid ${selected === "single" ? "#7C3AED" : "#E2E8F0"}` }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected === "single" ? "#7C3AED" : "#E2E8F0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected === "single" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7C3AED" }} />}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>₹29 · Unlock this one profile</span>
              </button>
              <button onClick={() => setSelected("premium")} className="w-full text-left p-4 rounded-2xl flex items-center gap-3 relative transition-all"
                style={{ background: selected === "premium" ? "#FAFAFF" : "white", border: `${selected === "premium" ? 2 : 1}px solid ${selected === "premium" ? "#7C3AED" : "#E2E8F0"}` }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected === "premium" ? "#7C3AED" : "#E2E8F0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected === "premium" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7C3AED" }} />}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", margin: 0 }}>₹199/month · Unlimited unlocks</p>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>+ priority matches</p>
                </div>
                <span style={{ background: "#FFF7ED", color: "#D97706", border: "1px solid #FDE68A", borderRadius: 100, padding: "3px 8px", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>Best Value</span>
              </button>
            </div>
            <button onClick={handleContinue}
              style={{ width: "100%", height: 56, borderRadius: 100, background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "white", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>
              {state === "processing" ? "Processing..." : "Continue →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── BLURRED PROFILE SHEET ───────────────────────────────────
function BlurredProfileSheet({ profile, onClose, onUnlock }: {
  profile: typeof MATCH_PROFILES[0];
  onClose: () => void;
  onUnlock: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl bg-white overflow-y-auto" style={{ maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mt-3 mb-0" />

        {/* Dark gradient header */}
        <div className="relative p-4 flex items-start gap-3" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #3D3784 100%)", minHeight: 140 }}>
          {/* Close */}
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color="white" />
          </button>

          {/* Blurred avatar */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)", filter: "blur(8px)", border: "3px solid rgba(255,255,255,0.2)" }} />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-end mb-1">
              <div style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)", borderRadius: 100, padding: "6px 12px", boxShadow: "0 2px 8px rgba(245,158,11,0.4)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{profile.vibeMatch}% 🔥</span>
              </div>
            </div>
            {/* Blurred last name */}
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", letterSpacing: "-0.3px", lineHeight: 1.2, margin: 0 }}>
              {profile.firstName}{" "}
              <span style={{ filter: "blur(4px)", userSelect: "none" }}>{profile.lastName}</span>
              , {profile.age}
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "2px 0" }}>{profile.occupation}</p>
            <div className="flex items-center gap-1">
              <MapPin size={11} color="rgba(255,255,255,0.45)" />
              {/* Blurred PG name */}
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                PG in{" "}
                <span style={{ filter: "blur(4px)", userSelect: "none" }}>Koramangala</span>
              </p>
            </div>
          </div>

          {/* Lock overlay pill */}
          <div style={{
            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            borderRadius: 100, padding: "8px 16px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <Lock size={16} color="#7C3AED" />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>Unlock to see full profile</span>
          </div>
        </div>

        {/* White content — tags visible to create curiosity */}
        <div className="flex flex-col p-4 gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Briefcase size={12} color="#94A3B8" />
            <span style={{ fontSize: 12, color: "#64748B" }}>{profile.occupation}</span>
            <span style={{ color: "#CBD5E1" }}>·</span>
            <MapPin size={12} color="#94A3B8" />
            <span style={{ fontSize: 12, color: "#64748B" }}>From {profile.city}</span>
          </div>

          <div>
            {profile.livingStatus === "living" ? (
              <span style={{ fontSize: 12, fontWeight: 500, background: "#EFF6FF", color: "#3B82F6", border: "1px solid #BFDBFE", borderRadius: 100, padding: "4px 12px", display: "inline-block" }}>
                🏠 Living here since {profile.since}
              </span>
            ) : (
              <span style={{ fontSize: 12, fontWeight: 500, background: "#FFF7ED", color: "#F59E0B", border: "1px solid #FDE68A", borderRadius: 100, padding: "4px 12px", display: "inline-block" }}>
                🔍 Looking to move {profile.since}
              </span>
            )}
          </div>

          {/* Lifestyle tags — visible */}
          <div className="flex flex-wrap gap-2">
            {profile.lifestyleTags.map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 500, background: "#F0FDFA", color: "#0D9488", border: "1px solid #0D9488", borderRadius: 100, padding: "6px 12px" }}>{t}</span>
            ))}
          </div>

          {/* Interest tags — visible */}
          <div className="flex flex-wrap gap-2">
            {profile.interestTags.map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 500, background: "#F5F3FF", color: "#7C3AED", border: "1px solid #7C3AED", borderRadius: 100, padding: "6px 12px" }}>{t}</span>
            ))}
          </div>

          {/* About — visible */}
          <p style={{ fontSize: 13, color: "#475569", fontStyle: "italic" }}>"{profile.about}"</p>
        </div>

        {/* Sticky bottom */}
        <div className="sticky bottom-0 bg-white border-t p-4 pb-6" style={{ borderColor: "#E2E8F0" }}>
          <button onClick={() => { onClose(); onUnlock(); }}
            style={{ width: "100%", height: 56, borderRadius: 100, background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "white", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>
            🔓 Unlock to See Full Profile
          </button>
          <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", marginTop: 6 }}>
            Tap to unlock full profile & start chatting
          </p>
        </div>
      </div>
    </div>
  );
}

export function Notifications() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifs, setNotifs] = useState(initialNotifications);
  const [selectedMatchProfile, setSelectedMatchProfile] = useState<typeof MATCH_PROFILES[0] | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const t = darkMode ? DARK : LIGHT;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const unreadCount = notifs.filter(n => !n.read).length;

  const isMatchType = (type: string) => type === "match" || type === "roommate";

  const getMatchProfile = (notifId: string) => {
    if (notifId === "n1") return MATCH_PROFILES[0]; // Priya
    if (notifId === "n2") return MATCH_PROFILES[1]; // Rahul
    return MATCH_PROFILES[0];
  };

  const handleNotifTap = (notif: typeof notifs[0]) => {
    markRead(notif.id);
    if (isMatchType(notif.type)) {
      setSelectedMatchProfile(getMatchProfile(notif.id));
    }
  };

  if (notifs.length === 0) {
    return (
      <div style={{
        height: "100dvh", background: t.bg, fontFamily: "'DM Sans', sans-serif",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "0 32px", textAlign: "center",
      }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>You're all caught up!</h2>
        <p style={{ fontSize: 14, color: t.muted, margin: "0 0 24px" }}>No new notifications right now.</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: PURPLE_GHOST, color: PURPLE, border: "none", borderRadius: 12,
            padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: t.bg, minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        background: t.card, borderBottom: `1px solid ${t.cardBorder}`,
        padding: "48px 16px 14px",
        position: "sticky", top: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}
          >
            <ArrowLeft size={20} color={PURPLE} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>Notifications</span>
            {unreadCount > 0 && (
              <span style={{
                background: "#DC2626", color: "white",
                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
              }}>
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
                color: PURPLE, fontSize: 12, fontWeight: 700,
                transition: "opacity 0.15s",
              }}
            >
              <CheckCheck size={14} color={PURPLE} /> Mark all read
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex" }}
          >
            {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
          </button>
        </div>
      </div>

      <div style={{ padding: "14px 16px 80px" }}>
        {notifs.map((notif, index) => {
          const leftColor = getLeftBorderColor(notif.type as NotifType, notif.read);
          const iconBg    = getIconBg(notif.type as NotifType);
          const isMatch   = isMatchType(notif.type);

          return (
            <button
              key={notif.id}
              onClick={() => handleNotifTap(notif)}
              style={{
                width: "100%", textAlign: "left", display: "flex", alignItems: "flex-start",
                gap: 12, padding: "12px 14px", marginBottom: 8, cursor: "pointer",
                background: !notif.read ? "rgba(138,43,226,0.04)" : t.card,
                borderTop: `1px solid ${t.cardBorder}`,
                borderRight: `1px solid ${t.cardBorder}`,
                borderBottom: `1px solid ${t.cardBorder}`,
                borderLeft: `3px solid ${notif.read ? t.cardBorder : leftColor}`,
                borderRadius: 14,
                transition: "background 0.15s",
                animation: `fadeSlideUp 0.3s ${index * 0.05}s both`,
              }}
            >
              {/* Icon: blurred gradient for match/roommate, emoji for others */}
              {isMatch ? (
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <BlurredAvatar size={44} />
                </div>
              ) : (
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 17, flexShrink: 0,
                }}>
                  {notif.icon}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    {/* For match/roommate: show first name prominently */}
                    {isMatch ? (
                      <div style={{ marginBottom: 4 }}>
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p style={{ fontSize: 14, fontWeight: 700, color: !notif.read ? t.body : t.muted, margin: 0 }}>
                            {notif.id === "n1" ? "Priya" : notif.id === "n2" ? "Rahul" : notif.title.split(" ")[0]}
                          </p>
                          <span style={{ background: "#FFF7ED", color: "#D97706", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>
                            {notif.id === "n1" ? "91%" : "88%"} 🔥
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>wants to connect with you 👋</p>
                      </div>
                    ) : (
                      <p style={{
                        fontSize: 14, color: !notif.read ? t.body : t.muted,
                        margin: "0 0 4px", lineHeight: 1.5,
                        fontWeight: !notif.read ? 600 : 400,
                      }}>
                        {notif.title}
                      </p>
                    )}
                    <p style={{ fontSize: 12, color: t.muted, margin: 0 }}>{notif.time}</p>
                  </div>
                  {!notif.read && (
                    <span
                      role="button"
                      style={{
                        background: isMatch ? "#7C3AED" : PURPLE_GHOST,
                        color: "white",
                        border: "none",
                        borderRadius: 8, padding: "3px 10px", fontSize: 11,
                        fontWeight: 700, cursor: "pointer", flexShrink: 0,
                        transition: "transform 0.12s", display: "inline-block",
                      }}
                      onMouseDown={e => { e.stopPropagation(); (e.currentTarget as HTMLSpanElement).style.transform = "scale(0.95)"; }}
                      onMouseUp={e => { (e.currentTarget as HTMLSpanElement).style.transform = "scale(1)"; }}
                    >
                      {isMatch ? "Unlock →" : "View"}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}

        {notifs.every(n => n.read) && (
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button
              onClick={() => setNotifs([])}
              style={{ background: "none", border: "none", color: t.muted, fontSize: 13, cursor: "pointer" }}
            >
              Clear all notifications
            </button>
          </div>
        )}
      </div>

      {/* Blurred Profile Sheet */}
      {selectedMatchProfile && (
        <BlurredProfileSheet
          profile={selectedMatchProfile}
          onClose={() => setSelectedMatchProfile(null)}
          onUnlock={() => { setSelectedMatchProfile(null); setShowPaywall(true); }}
        />
      )}

      {/* Paywall */}
      {showPaywall && <UnlockPaywallSheet onClose={() => setShowPaywall(false)} />}
    </div>
  );
}
