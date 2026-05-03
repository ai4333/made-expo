import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Send, Image, ChevronDown } from "lucide-react";
import { ownerPGs, ownerTenants } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const pastAnnouncements = [
  { id: 1, time: "Today, 10:00 AM", message: "Water supply will be off tomorrow 10am–2pm for maintenance. Please store water.", sentTo: "All tenants", delivered: 12 },
  { id: 2, time: "Feb 20, 9:00 AM", message: "Please clear rent before the 5th to avoid the late fee of ₹200.", sentTo: "All tenants", delivered: 12 },
  { id: 3, time: "Feb 15, 4:00 PM", message: "New WiFi password: pgos2025 — please update all your devices.", sentTo: "Sharma Boys PG", delivered: 8 },
  { id: 4, time: "Feb 10, 8:00 AM", message: "Reminder: Register for government ID verification by end of this month.", sentTo: "All tenants", delivered: 12 },
];

const conversations = [
  { tenantId: "ot3", name: "Suresh Patel", lastMsg: "Sir please give me 2 more days for rent", time: "2h ago", unread: 2 },
  { tenantId: "ot4", name: "Kiran Rao", lastMsg: "I've paid the rent, please check", time: "Yesterday", unread: 0 },
  { tenantId: "ot6", name: "Ankit Verma", lastMsg: "Regarding my notice period...", time: "Feb 20", unread: 1 },
  { tenantId: "ot9", name: "Priya Sharma", lastMsg: "Thank you for confirming!", time: "Feb 19", unread: 0 },
];

const mockThread = [
  { from: "tenant", text: "Sir please give me 2 more days for rent payment. I'll pay by Friday.", time: "2:30 PM" },
  { from: "owner", text: "Okay Suresh, please make sure it's done by Friday. Late fee will apply after that.", time: "2:45 PM" },
  { from: "tenant", text: "Yes sir, definitely by Friday. Sorry for the delay.", time: "2:50 PM" },
];

export function OwnerMessages() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"announcements" | "messages">("announcements");
  const [recipient, setRecipient] = useState("all");
  const [message, setMessage] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const [sent, setSent] = useState(false);
  const [openThread, setOpenThread] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  if (openThread) {
    const conv = conversations.find((c) => c.tenantId === openThread);
    return (
      <div className="flex flex-col h-screen" style={{ background: C.bg }}>
        <div
          className="flex items-center gap-3 px-4 pt-12 pb-4 flex-shrink-0"
          style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}
        >
          <button
            onClick={() => setOpenThread(null)}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: C.elevated }}
          >
            <ChevronLeft size={18} style={{ color: C.heading }} />
          </button>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: C.primaryGhost, color: C.primary }}
          >
            {conv?.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: C.heading }}>{conv?.name}</p>
            <p className="text-xs" style={{ color: C.muted }}>Mirrored via WhatsApp</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {mockThread.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "owner" ? "justify-end" : "justify-start"}`}>
              <div
                className="max-w-[75%] rounded-2xl px-4 py-3"
                style={{
                  background: msg.from === "owner" ? C.primary : C.card,
                  border: msg.from === "tenant" ? `1px solid ${C.border}` : "none",
                }}
              >
                <p className="text-sm" style={{ color: msg.from === "owner" ? "white" : C.body }}>{msg.text}</p>
                <p className="text-xs mt-1" style={{ color: msg.from === "owner" ? "rgba(255,255,255,0.6)" : C.muted }}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
          style={{ background: C.card, borderTop: `1px solid ${C.border}` }}
        >
          <input
            placeholder="Type a message..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
            style={{ background: C.elevated, color: C.heading, border: `1px solid ${C.border}` }}
          />
          <button
            onClick={() => setReply("")}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ background: C.primary }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-8" style={{ background: C.bg }}>
      {/* Header */}
      <div style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}>
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <p className="font-black text-2xl" style={{ color: C.heading }}>Messages</p>
        </div>

        {/* Tabs */}
        <div className="flex px-4 pb-0">
          {[
            { key: "announcements", label: "Announcements" },
            { key: "messages", label: "Direct Messages" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as typeof tab)}
              className="flex-1 py-3 text-xs font-bold transition-all border-b-2"
              style={{
                color: tab === t.key ? C.primary : C.muted,
                borderBottomColor: tab === t.key ? C.primary : "transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements Tab */}
      {tab === "announcements" && (
        <div className="px-4 py-4">
          {/* Compose Card */}
          <div className="rounded-2xl p-4 mb-5" style={{ background: C.card, border: `1px solid ${C.border}` }}>
            <p className="font-bold text-sm mb-3" style={{ color: C.heading }}>New Announcement</p>

            {/* Recipient */}
            <div className="mb-3">
              <p className="text-xs font-semibold mb-1.5" style={{ color: C.muted }}>Who receives this?</p>
              <div className="flex gap-2 flex-wrap">
                {[
                  { val: "all", label: "All Tenants" },
                  ...ownerPGs.map((pg) => ({ val: pg.id, label: pg.name.split(" ").slice(0, 2).join(" ") })),
                ].map((r) => (
                  <button
                    key={r.val}
                    onClick={() => setRecipient(r.val)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{
                      background: recipient === r.val ? C.primary : C.elevated,
                      color: recipient === r.val ? "white" : C.muted,
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-3">
              <p className="text-xs font-semibold mb-1.5" style={{ color: C.muted }}>Message (max 300 chars)</p>
              <textarea
                placeholder={`e.g. "Water supply off tomorrow 10am–2pm"`}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 300))}
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                style={{ background: C.elevated, border: `1px solid ${C.border}`, color: C.heading }}
              />
              <p className="text-xs text-right mt-1" style={{ color: C.muted }}>{message.length}/300</p>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold" style={{ color: C.muted }}>Send via WhatsApp</p>
              </div>
              <div
                onClick={() => setWhatsapp((v) => !v)}
                className="w-11 h-6 rounded-full transition-all relative cursor-pointer"
                style={{ background: whatsapp ? C.primary : C.border }}
              >
                <div
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                  style={{ left: whatsapp ? "calc(100% - 20px)" : 4 }}
                />
              </div>
            </div>

            {sent ? (
              <div className="rounded-xl p-3 flex items-center gap-2" style={{ background: `${C.success}18` }}>
                <span>✅</span>
                <p className="text-sm font-bold" style={{ color: C.success }}>Announcement sent successfully!</p>
              </div>
            ) : (
              <button
                onClick={handleSend}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{ background: C.primary }}
              >
                <Send size={14} /> Send Announcement
              </button>
            )}
          </div>

          {/* Past Announcements */}
          <p className="font-bold text-sm mb-3" style={{ color: C.heading }}>Past Announcements</p>
          <div className="space-y-3">
            {pastAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="rounded-2xl p-4 flex gap-3"
                style={{ background: C.card, border: `1px solid ${C.border}`, borderLeftWidth: 4, borderLeftColor: C.primary }}
              >
                <div className="flex-1">
                  <p className="text-sm" style={{ color: C.body }}>{ann.message}</p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-xs" style={{ color: C.muted }}>{ann.time}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: C.primaryGhost, color: C.primary }}>
                      {ann.sentTo}
                    </span>
                    <span className="text-xs" style={{ color: C.success }}>✓ {ann.delivered} delivered</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Messages Tab */}
      {tab === "messages" && (
        <div className="px-4 py-4 space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.tenantId}
              onClick={() => setOpenThread(conv.tenantId)}
              className="w-full rounded-2xl p-4 flex items-center gap-3 text-left"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: C.primaryGhost, color: C.primary }}
                >
                  {conv.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                {conv.unread > 0 && (
                  <div
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: C.primary }}
                  >
                    {conv.unread}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="font-bold text-sm" style={{ color: C.heading }}>{conv.name}</p>
                  <p className="text-xs" style={{ color: C.muted }}>{conv.time}</p>
                </div>
                <p
                  className="text-xs truncate"
                  style={{ color: conv.unread > 0 ? C.body : C.muted, fontWeight: conv.unread > 0 ? 600 : 400 }}
                >
                  {conv.lastMsg}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
