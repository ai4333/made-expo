import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, CheckCheck } from "lucide-react";
import { ownerNotifications as initial } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const typeConfig = {
  overdue: { icon: "🔴", label: "Overdue Rent", colorKey: "danger" },
  reminder_sent: { icon: "🟡", label: "Reminder Sent", colorKey: "warning" },
  payment_marked: { icon: "🟣", label: "Payment Received", colorKey: "primary" },
  move_out: { icon: "🟠", label: "Move-Out Notice", colorKey: "warning" },
  vacancy: { icon: "⚪", label: "Vacancy Alert", colorKey: "muted" },
};

export function OwnerNotifications() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(initial);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const unread = notifs.filter((n) => !n.read).length;

  const getColor = (colorKey: string) => {
    const map: Record<string, string> = {
      danger: C.danger, warning: C.warning, primary: C.primary, muted: C.muted,
    };
    return map[colorKey] || C.muted;
  };

  if (notifs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ background: C.bg }}>
        <div className="text-5xl mb-4">🎉</div>
        <p className="font-black text-xl mb-2" style={{ color: C.heading }}>All caught up!</p>
        <p className="text-sm" style={{ color: C.muted }}>No new notifications right now.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8" style={{ background: C.bg }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between px-4 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: C.elevated }}
            >
              <ChevronLeft size={18} style={{ color: C.heading }} />
            </button>
            <div className="flex items-center gap-2">
              <p className="font-black text-xl" style={{ color: C.heading }}>Notifications</p>
              {unread > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{ background: C.danger }}>
                  {unread}
                </span>
              )}
            </div>
          </div>
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-sm font-bold"
              style={{ color: C.primary }}
            >
              <CheckCheck size={16} /> Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Grouped: Today / Yesterday / Earlier */}
      {["Today", "Yesterday", "Earlier"].map((group) => {
        const groupNotifs = notifs.filter((n) => {
          if (group === "Today") return n.time.startsWith("Today");
          if (group === "Yesterday") return n.time.startsWith("Yesterday");
          return !n.time.startsWith("Today") && !n.time.startsWith("Yesterday");
        });
        if (groupNotifs.length === 0) return null;
        return (
          <div key={group} className="px-4 pt-4">
            <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: C.muted }}>{group}</p>
            <div className="space-y-3">
              {groupNotifs.map((notif) => {
                const tc = typeConfig[notif.type] || typeConfig.vacancy;
                const color = getColor(tc.colorKey);
                return (
                  <div
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className="rounded-2xl p-4 transition-all cursor-pointer"
                    style={{
                      background: !notif.read ? C.card : C.elevated,
                      border: `1px solid ${!notif.read ? C.border : "transparent"}`,
                      borderLeftWidth: 4,
                      borderLeftColor: color,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background: `${color}18` }}
                      >
                        {tc.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs font-bold mb-0.5" style={{ color }}>{tc.label}</p>
                            <p className="text-sm font-medium" style={{ color: notif.read ? C.muted : C.body }}>
                              {notif.message}
                            </p>
                          </div>
                          {!notif.read && (
                            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{ background: C.primary }} />
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs" style={{ color: C.muted }}>{notif.time}</p>
                          {notif.action && (
                            <button
                              className="text-xs font-bold px-3 py-1 rounded-lg"
                              style={{ background: C.primaryGhost, color: C.primary }}
                            >
                              {notif.action}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
