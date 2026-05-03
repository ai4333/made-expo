import { useState } from "react";
import { useNavigate } from "react-router";
import { Moon, Sun, Lock, Globe, LogOut, ChevronRight, Camera, Shield, CheckCircle2 } from "lucide-react";

const PURPLE       = "#8A2BE2";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_BORDER = "rgba(138,43,226,0.22)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF", elevated: "#EDE9FE",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  divider: "#E9E3F5", card: "#FFFFFF", cardBorder: "#E9E3F5",
  inputBg: "#F5F3FF",
};
const DARK = {
  bg: "#0F0F13", surface: "#1A1A24", elevated: "#22223A",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  divider: "#2D2D3D", card: "#1A1A24", cardBorder: "#2D2D3D",
  inputBg: "#22223A",
};

export function MyProfile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState("Ravi Kumar");
  const [email, setEmail] = useState("ravi.kumar@email.com");
  const [isDirty, setIsDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifRent, setNotifRent] = useState(true);
  const [notifUpdates, setNotifUpdates] = useState(true);
  const [notifComplaints, setNotifComplaints] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [kycVerified, setKycVerified] = useState(false); // Toggle to see both states
  const t = darkMode ? DARK : LIGHT;

  const handleSave = () => {
    setSaved(true); setIsDirty(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <div
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 12, cursor: "pointer", flexShrink: 0,
        background: value ? PURPLE : t.elevated,
        position: "relative",
        transition: "background 0.2s ease",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 3,
        left: value ? 23 : 3,
        transition: "left 0.2s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
      }} />
    </div>
  );

  return (
    <div style={{ background: t.bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif", paddingBottom: 100 }}>
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
        .profile-anim { animation: fadeSlideUp 0.3s ease both; }
      `}</style>

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "48px 16px 14px", background: t.card,
        borderBottom: `1px solid ${t.cardBorder}`,
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>My Profile</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex" }}
        >
          {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
        </button>
      </div>

      <div style={{ padding: "24px 16px 0" }}>

        {/* Avatar */}
        <div className="profile-anim" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20, animationDelay: "0.05s" }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <div
              style={{
                width: 84, height: 84, borderRadius: "50%", background: PURPLE,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 30, fontWeight: 900, color: "#fff",
                boxShadow: "0 4px 20px rgba(138,43,226,0.35)",
                cursor: "pointer", transition: "transform 0.15s",
              }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
            >R</div>
            <button style={{
              position: "absolute", bottom: 0, right: 0,
              width: 28, height: 28, borderRadius: "50%",
              background: PURPLE, border: `2px solid ${t.bg}`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}>
              <Camera size={12} color="#fff" />
            </button>
          </div>
          <p style={{ fontSize: 18, fontWeight: 800, color: t.heading, margin: "0 0 2px" }}>Ravi Kumar</p>
          <p style={{ fontSize: 13, color: t.muted, margin: 0 }}>Sunrise Premium PG · Room 204</p>
        </div>

        {/* KYC Card - Directly below profile photo */}
        {!kycVerified ? (
          <div className="profile-anim" style={{
            background: "rgba(239, 68, 68, 0.06)",
            borderTop: "1px solid rgba(239, 68, 68, 0.15)",
            borderRight: "1px solid rgba(239, 68, 68, 0.15)",
            borderBottom: "1px solid rgba(239, 68, 68, 0.15)",
            borderLeft: "4px solid #EF4444",
            borderRadius: 16, padding: "14px 16px", marginBottom: 14,
            animationDelay: "0.08s",
          }}>
            <div style={{ display: "flex", alignItems: "start", gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(239, 68, 68, 0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Shield size={18} style={{ color: "#DC2626" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: t.heading, margin: "0 0 4px" }}>
                  Verify Your Identity
                </p>
                <p style={{ fontSize: 12, color: t.muted, margin: "0 0 10px", lineHeight: 1.5 }}>
                  Verified users get 3x more roommate matches and can contact PG owners directly
                </p>
                {/* Mini step indicator */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  {[
                    { label: "Phone", done: true },
                    { label: "Aadhaar", done: false },
                    { label: "Selfie", done: false },
                  ].map((step, i, arr) => (
                    <div key={step.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: step.done ? "#10B981" : "rgba(156, 163, 175, 0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {step.done ? (
                          <span style={{ color: "white", fontSize: 10 }}>✓</span>
                        ) : (
                          <span style={{ color: t.muted, fontSize: 9 }}>•</span>
                        )}
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 600, color: step.done ? "#10B981" : t.muted }}>
                        {step.label}
                      </span>
                      {i < arr.length - 1 && (
                        <ChevronRight size={10} style={{ color: t.muted }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/tenant/kyc")} // Navigate to KYC flow
              style={{
                width: "100%", padding: "10px 14px", borderRadius: 12,
                background: "#EF4444", color: "white", border: "none",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              Verify Now <ChevronRight size={14} />
            </button>
          </div>
        ) : (
          <div className="profile-anim" style={{
            background: "rgba(16, 185, 129, 0.06)",
            borderTop: "1px solid rgba(16, 185, 129, 0.15)",
            borderRight: "1px solid rgba(16, 185, 129, 0.15)",
            borderBottom: "1px solid rgba(16, 185, 129, 0.15)",
            borderLeft: "4px solid #10B981",
            borderRadius: 16, padding: "14px 16px", marginBottom: 14,
            animationDelay: "0.08s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(16, 185, 129, 0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <CheckCircle2 size={18} style={{ color: "#059669" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#059669", margin: "0 0 2px" }}>
                  Identity Verified ✓
                </p>
                <p style={{ fontSize: 11, color: t.muted, margin: 0 }}>
                  Verified on 8 March 2026
                </p>
              </div>
              <button
                style={{
                  fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 8,
                  background: "rgba(16, 185, 129, 0.12)", color: "#059669", border: "none", cursor: "pointer",
                }}
              >
                Certificate
              </button>
            </div>
          </div>
        )}

        {/* Personal Info card */}
        <div className="profile-anim" style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, overflow: "hidden", marginBottom: 14,
          boxShadow: "0 2px 12px rgba(138,43,226,0.06)", animationDelay: "0.10s",
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.muted, padding: "14px 16px 0", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Personal Info
          </p>
          {[
            { label: "Full Name",     value: name,  onChange: (v: string) => { setName(v); setIsDirty(true); }, type: "text",  editable: true },
            { label: "Email Address", value: email, onChange: (v: string) => { setEmail(v); setIsDirty(true); }, type: "email", editable: true },
            { label: "Phone Number",  value: "+91 98765 43210", onChange: () => {}, type: "tel", editable: false },
          ].map((field, i, arr) => (
            <div key={field.label} style={{
              padding: "12px 16px",
              borderBottom: i < arr.length - 1 ? `1px solid ${t.divider}` : "none",
            }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: t.muted, display: "block", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {field.label}
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={e => field.editable && field.onChange(e.target.value)}
                  readOnly={!field.editable}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    fontSize: 15, fontWeight: 600, color: field.editable ? t.heading : t.muted,
                    fontFamily: "'DM Sans', sans-serif", cursor: field.editable ? "text" : "default",
                  }}
                />
                {!field.editable && (
                  <span style={{
                    fontSize: 10, background: t.elevated, color: t.muted,
                    padding: "2px 8px", borderRadius: 10, fontWeight: 600,
                  }}>Locked</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Save button */}
        <button
          className="profile-anim"
          onClick={isDirty ? handleSave : undefined}
          style={{
            width: "100%", padding: 14, borderRadius: 14, border: "none",
            background: isDirty ? PURPLE : t.surface,
            color: isDirty ? "#fff" : t.muted,
            fontSize: 15, fontWeight: 700, cursor: isDirty ? "pointer" : "default",
            boxShadow: isDirty ? "0 4px 16px rgba(138,43,226,0.28)" : "none",
            transition: "all 0.2s ease", marginBottom: 14,
            animationDelay: "0.12s",
          }}
        >
          {saved ? "✓ Changes Saved!" : "Save Changes"}
        </button>

        {/* Notifications */}
        <div className="profile-anim" style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, overflow: "hidden", marginBottom: 14,
          boxShadow: "0 2px 12px rgba(138,43,226,0.06)", animationDelay: "0.15s",
        }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: t.muted, padding: "14px 16px 0", margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Notifications
          </p>
          {[
            { label: "Rent reminders",    sub: "Get reminded before rent is due",    value: notifRent,       toggle: () => setNotifRent(!notifRent) },
            { label: "PG announcements",  sub: "Owner updates and notices",           value: notifUpdates,    toggle: () => setNotifUpdates(!notifUpdates) },
            { label: "Complaint updates", sub: "When your issues get a response",    value: notifComplaints, toggle: () => setNotifComplaints(!notifComplaints) },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 16px",
              borderBottom: i < arr.length - 1 ? `1px solid ${t.divider}` : "none",
            }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: t.heading, margin: "0 0 2px" }}>{item.label}</p>
                <p style={{ fontSize: 12, color: t.muted, margin: 0 }}>{item.sub}</p>
              </div>
              <Toggle value={item.value} onChange={item.toggle} />
            </div>
          ))}
        </div>

        {/* Appearance */}
        <div className="profile-anim" style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, overflow: "hidden", marginBottom: 14,
          boxShadow: "0 2px 12px rgba(138,43,226,0.06)", animationDelay: "0.18s",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: t.heading, margin: "0 0 2px" }}>Appearance</p>
              <p style={{ fontSize: 12, color: t.muted, margin: 0 }}>{darkMode ? "Dark mode" : "Light mode"}</p>
            </div>
            <Toggle value={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>

        {/* Account actions */}
        <div className="profile-anim" style={{
          background: t.card, border: `1px solid ${t.cardBorder}`,
          borderRadius: 18, overflow: "hidden", marginBottom: 14,
          boxShadow: "0 2px 12px rgba(138,43,226,0.06)", animationDelay: "0.20s",
        }}>
          {[
            { icon: <Lock size={16} color={PURPLE} />, label: "Change Password", sub: "Update your login password", disabled: false },
            { icon: <Globe size={16} color={PURPLE} />, label: "Language", sub: "English (more coming soon)", disabled: true },
          ].map((item, i) => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "13px 16px",
              borderBottom: i === 0 ? `1px solid ${t.divider}` : "none",
              opacity: item.disabled ? 0.5 : 1,
              cursor: item.disabled ? "default" : "pointer",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, background: PURPLE_GHOST,
                  borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: t.heading, margin: "0 0 1px" }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: t.muted, margin: 0 }}>{item.sub}</p>
                </div>
              </div>
              <ChevronRight size={16} color={t.muted} />
            </div>
          ))}
        </div>

        {/* Log out */}
        <button
          className="profile-anim"
          onClick={() => setShowLogout(true)}
          style={{
            width: "100%", padding: 14, background: "none", border: "none",
            color: "#DC2626", fontSize: 14, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            animationDelay: "0.22s",
          }}
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>

      {/* Logout sheet */}
      {showLogout && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.50)", zIndex: 100,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          animation: "fadeIn 0.2s ease",
        }}>
          <div style={{
            background: t.card, borderRadius: "24px 24px 0 0",
            padding: "24px 20px 48px", width: "100%", maxWidth: 430,
            animation: "slideUp 0.28s cubic-bezier(0.32,0.72,0,1)",
          }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>Log out?</p>
            <p style={{ fontSize: 14, color: t.muted, margin: "0 0 24px", lineHeight: 1.6 }}>
              You'll need to log in again to access your PG details.
            </p>
            <button onClick={() => navigate("/")} style={{
              width: "100%", padding: 14, background: "#DC2626", color: "#fff",
              border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700,
              cursor: "pointer", marginBottom: 10, transition: "transform 0.12s",
            }}
              onMouseDown={e => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
            >
              Yes, Log Out
            </button>
            <button onClick={() => setShowLogout(false)} style={{
              width: "100%", padding: 14, background: PURPLE_GHOST, color: PURPLE,
              border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer",
            }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}