import { useNavigate } from "react-router";
import { Bell, ChevronRight } from "lucide-react";
import {
  ownerProfile,
  ownerPGs,
  ownerNotifications,
  getOverallStats,
  getPGStats,
  ownerTenants,
} from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning,";
  if (h < 17) return "Good afternoon,";
  return "Good evening,";
};

const recentActivity = [
  { icon: "💰", text: "Cash received from Arjun Kumar", sub: "Room 101A • ₹8,500", time: "2m ago" },
  { icon: "⚠️", text: "Rent overdue — Suresh Patel", sub: "Room 101C • ₹8,500", time: "5m ago" },
  { icon: "🔧", text: "New complaint: Tap leaking", sub: "Room 101B • Urgent", time: "1h ago" },
];

const WA_GREEN = "#25D366";

// WhatsApp SVG icon
const WAIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill={WA_GREEN}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.856L.057 23.882l6.204-1.629A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.213-3.681.967.983-3.587-.234-.373A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

const quickActions = [
  { emoji: "💵", label: "+Cash Paid", nav: "/owner/rent" },
  { emoji: "📢", label: "Announce", nav: "/owner/messages" },
  { emoji: "📊", label: "+Expense", nav: "/owner/expenses" },
  { emoji: "wa", label: "WhatsApp", nav: "/owner/whatsapp-hub" },
];

export function OwnerDashboard() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const stats = getOverallStats();
  const unreadCount = ownerNotifications.filter((n) => !n.read).length;
  const occupancyPct =
    stats.totalBeds > 0
      ? Math.round((stats.occupiedBeds / stats.totalBeds) * 100)
      : 0;

  return (
    <div style={{ background: C.bg }} className="min-h-screen pb-8">
      {/* Purple gradient header */}
      <div style={{ background: PURPLE_GRAD }} className="px-4 pt-12 pb-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              {getGreeting()}
            </p>
            <p className="font-black text-2xl text-white">
              {ownerProfile.name.split(" ")[0]} 👋
            </p>
          </div>
          <button
            onClick={() => navigate("/owner/notifications")}
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <Bell size={18} color="white" />
            {unreadCount > 0 && (
              <span
                className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white font-black"
                style={{ background: "#DC143C", fontSize: 9 }}
              >
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            {
              label: "Total Income",
              value: `₹${(stats.collectedRent / 1000).toFixed(0)}K`,
              icon: "💚",
            },
            {
              label: "Occupancy",
              value: `${occupancyPct}%`,
              icon: "🟠",
            },
            {
              label: "Overdue",
              value: `₹${stats.overdueRent.toLocaleString()}`,
              icon: "🔴",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-3"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <span style={{ fontSize: 14 }}>{s.icon}</span>
              <p className="font-black text-white mt-1" style={{ fontSize: 15 }}>
                {s.value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <p
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: C.muted }}
        >
          Quick Actions
        </p>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.nav)}
              className="flex flex-col items-center gap-1.5 py-3.5 rounded-2xl transition-all"
              style={{
                background: C.card,
                border: `1px solid ${C.border}`,
              }}
            >
              {action.emoji === "wa" ? <WAIcon /> : <span style={{ fontSize: 22 }}>{action.emoji}</span>}
              <span
                className="font-semibold text-center leading-tight"
                style={{ color: C.body, fontSize: 10 }}
              >
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* My PGs */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: C.muted }}
          >
            My PGs
          </p>
          <button
            onClick={() => navigate("/owner/pgs")}
            className="flex items-center gap-1 text-xs font-bold"
            style={{ color: "#8A2BE2" }}
          >
            Manage <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2.5">
          {ownerPGs.map((pg) => {
            const pgStats = getPGStats(pg.id);
            const allBeds = pg.rooms.flatMap((r) => r.beds);
            return (
              <button
                key={pg.id}
                onClick={() => navigate(`/owner/pg/${pg.id}`)}
                className="w-full rounded-2xl p-4 text-left flex items-center gap-3 transition-all"
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                  style={{ background: "rgba(138,43,226,0.10)", color: "#8A2BE2" }}
                >
                  {pg.name
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: C.heading }}>
                    {pg.name}
                  </p>
                  <p className="text-xs mb-2" style={{ color: C.muted }}>
                    {pg.address.split(",")[0]}, {pg.city}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {allBeds.map((bed) => (
                      <div
                        key={bed.id}
                        className="w-2 h-2 rounded-full"
                        style={{
                          background:
                            bed.status === "vacant"
                              ? C.border
                              : bed.status === "overdue"
                              ? "#DC2626"
                              : "#8A2BE2",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-xs" style={{ color: "#8A2BE2" }}>
                    {pgStats.occupiedBeds}/{pgStats.totalBeds}
                  </p>
                  <p className="text-[10px]" style={{ color: C.muted }}>
                    occupied
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4">
        <p
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: C.muted }}
        >
          Recent Activity
        </p>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          {recentActivity.map((act, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5"
              style={{
                borderBottom:
                  i < recentActivity.length - 1
                    ? `1px solid ${C.border}`
                    : "none",
              }}
            >
              <span className="text-xl flex-shrink-0">{act.icon}</span>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium"
                  style={{ color: C.heading }}
                >
                  {act.text}
                </p>
                <p className="text-xs" style={{ color: C.muted }}>
                  {act.sub}
                </p>
              </div>
              <span
                className="text-xs flex-shrink-0"
                style={{ color: C.muted }}
              >
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}