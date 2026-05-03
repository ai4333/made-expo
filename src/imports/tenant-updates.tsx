import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Megaphone, Moon, Sun } from "lucide-react";

const PURPLE = "#8A2BE2";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";

const LIGHT = { bg: "#FFFFFF", surface: "#F5F3FF", heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8", divider: "#E9E3F5", card: "#FFFFFF", cardBorder: "#E9E3F5" };
const DARK  = { bg: "#0F0F13", surface: "#1A1A24", heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A", divider: "#2D2D3D", card: "#1A1A24", cardBorder: "#2D2D3D" };

const allAnnouncements = [
  { id: 1, text: "Water supply off tomorrow 10am–2pm for maintenance. Please store water in advance.", time: "2 hours ago", full: true },
  { id: 2, text: "New WiFi password: PG@Sunrise2025. Old password has been deactivated from tonight.", time: "Yesterday, 8:30 PM", full: true },
  { id: 3, text: "Rent reminder: Please clear February rent before 7th to avoid a late fee of ₹200.", time: "3 days ago", full: true },
  { id: 4, text: "Common area deep cleaning scheduled for Sunday 9am. Please keep your belongings in your room.", time: "1 week ago", full: true },
  { id: 5, text: "Gas cylinder replaced. Cooking gas is now available normally.", time: "2 weeks ago", full: true },
];

export function TenantUpdates() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const t = darkMode ? DARK : LIGHT;

  return (
    <div style={{ background: t.bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif", color: t.body }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 16px 14px", background: t.card, borderBottom: `1px solid ${t.cardBorder}`, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", color: PURPLE, fontSize: 22, lineHeight: 1, padding: 0 }}>‹</button>
          <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>PG Updates</span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", fontSize: 15 }}>
          {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
        </button>
      </div>

      <div style={{ padding: "12px 16px 40px" }}>
        {/* Sub label */}
        <p style={{ fontSize: 13, color: t.muted, marginBottom: 14 }}>Announcements from Sunrise Premium PG</p>

        {allAnnouncements.length === 0 ? (
          /* Empty state */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 12, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, background: PURPLE_GHOST, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Megaphone size={28} color={PURPLE} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: t.heading, margin: 0 }}>No updates yet</p>
            <p style={{ fontSize: 13, color: t.muted, margin: 0, maxWidth: 240, lineHeight: 1.5 }}>
              Your PG owner will post announcements here — maintenance notices, WiFi changes, rent reminders and more.
            </p>
          </div>
        ) : (
          allAnnouncements.map((a, idx) => (
            <div key={a.id} style={{
              background: t.card,
              border: `1px solid ${t.cardBorder}`,
              borderLeft: `3px solid ${PURPLE}`,
              borderRadius: 16,
              padding: "13px 14px",
              marginBottom: 10,
              boxShadow: "0 1px 8px rgba(138,43,226,0.05)",
            }}>
              <p style={{ fontSize: 14, color: t.body, margin: "0 0 8px", lineHeight: 1.55 }}>{a.text}</p>
              <p style={{ fontSize: 11, color: t.muted, margin: 0 }}>{a.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}