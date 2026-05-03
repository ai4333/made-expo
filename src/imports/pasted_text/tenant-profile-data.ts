import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings, SlidersHorizontal, MessageCircle, Heart,
  X, Check, ChevronRight, Search, Users, Building2,
  Home, Send, ArrowLeft, Filter
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────
type RoomStatus = "2-sharing" | "3-sharing" | "single";
type LookingFor = "same-pg" | "new-pg" | "open";

interface TenantProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  occupation: string;
  pgName: string;
  roomStatus: RoomStatus;
  lookingFor: LookingFor;
  vibeMatch: number;
  tags: string[];
  about: string;
  isMatched?: boolean;
}

interface Message {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  pgName: string;
  isOnline: boolean;
}

// ─── MOCK DATA ────────────────────────────────────────────
const PROFILES: TenantProfile[] = [
  {
    id: "1", name: "Rahul Nair", age: 24, avatar: "RN",
    occupation: "Software Engineer", pgName: "Sunshine PG",
    roomStatus: "2-sharing", lookingFor: "same-pg",
    vibeMatch: 92, tags: ["🦉 Night Owl", "🎮 Gamer", "💻 Tech"],
    about: "Big into gaming and clean spaces 😄",
  },
  {
    id: "2", name: "Karthik S", age: 25, avatar: "KS",
    occupation: "Data Analyst", pgName: "Sunshine PG",
    roomStatus: "3-sharing", lookingFor: "new-pg",
    vibeMatch: 88, tags: ["💼 Pro", "🏋️ Fitness", "🌅 Early Bird"],
    about: "Love cooking and morning runs 🏃",
  },
  {
    id: "3", name: "Arjun Kumar", age: 23, avatar: "AK",
    occupation: "Student", pgName: "Green Nest PG",
    roomStatus: "2-sharing", lookingFor: "same-pg",
    vibeMatch: 79, tags: ["🎓 Student", "🎵 Music", "🏠 Homebody"],
    about: "Chill vibes only, always up for a jam 🎸",
  },
  {
    id: "4", name: "Meghna R", age: 22, avatar: "MR",
    occupation: "Designer", pgName: "Sunrise PG",
    roomStatus: "single", lookingFor: "new-pg",
    vibeMatch: 85, tags: ["🎨 Art", "☕ Café", "📚 Reading"],
    about: "Looking for a quiet, clean shared space",
  },
];

const MESSAGES: Message[] = [
  {
    id: "1", name: "Rahul Nair", avatar: "RN",
    lastMessage: "Hey! Are you still looking at Sunshine PG?",
    time: "2m ago", unread: 2, pgName: "Sunshine PG", isOnline: true,
  },
  {
    id: "2", name: "Karthik S", avatar: "KS",
    lastMessage: "Would love to be roommates — connect?",
    time: "1h ago", unread: 0, pgName: "Sunshine PG", isOnline: false,
  },
  {
    id: "3", name: "Arjun Kumar", avatar: "AK",
    lastMessage: "Saw we're both looking at Green Nest 🙌",
    time: "3h ago", unread: 1, pgName: "Green Nest PG", isOnline: true,
  },
];

// ─── AVATAR ───────────────────────────────────────────────
const avatarColors: Record<string, string> = {
  RN: "#7C3AED", KS: "#10B981", AK: "#F59E0B", MR: "#F0436A",
};

function Avatar({ initials, size = 40 }: { initials: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{
        width: size, height: size, fontSize: size * 0.35,
        backgroundColor: avatarColors[initials] ?? "#7C3AED",
      }}
    >
      {initials}
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────
function RoomStatusBadge({ status, lookingFor }: { status: RoomStatus; lookingFor: LookingFor }) {
  const roomLabel = status === "2-sharing" ? "2-Sharing" : status === "3-sharing" ? "3-Sharing" : "Single";
  const lookLabel = lookingFor === "same-pg" ? "Same PG" : lookingFor === "new-pg" ? "New PG" : "Open";
  const lookIcon = lookingFor === "same-pg" ? <Home size={9} /> : <Building2 size={9} />;

  return (
    <div className="flex flex-col gap-1">
      <div
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
        style={{ background: "#EDE9FE", color: "#7C3AED", width: "fit-content" }}
      >
        <Users size={9} />
        {roomLabel}
      </div>
      <div
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
        style={{
          background: lookingFor === "same-pg" ? "#ECFDF5" : "#FFF7ED",
          color: lookingFor === "same-pg" ? "#059669" : "#D97706",
          width: "fit-content",
        }}
      >
        {lookIcon}
        {lookLabel}
      </div>
    </div>
  );
}

// ─── SETTINGS PANEL ───────────────────────────────────────
function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [roomPref, setRoomPref] = useState<RoomStatus | "any">("any");
  const [lookPref, setLookPref] = useState<LookingFor | "any">("any");
  const [minMatch, setMinMatch] = useState(60);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "#0F172A" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={onClose}>
          <ArrowLeft size={22} color="white" />
        </button>
        <h2 className="text-white font-bold text-lg">Match Preferences</h2>
        <button
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ background: "#7C3AED", color: "white" }}
          onClick={onClose}
        >
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-6 pt-2">
        {/* Room Sharing Preference */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Room Sharing
          </p>
          <div className="flex gap-2 flex-wrap">
            {[["any", "Any"], ["single", "Single"], ["2-sharing", "2 Sharing"], ["3-sharing", "3 Sharing"]] .map(([val, label]) => (
              <button
                key={val}
                onClick={() => setRoomPref(val as any)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  background: roomPref === val ? "#7C3AED" : "rgba(255,255,255,0.07)",
                  borderColor: roomPref === val ? "#7C3AED" : "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Looking For
          </p>
          <div className="flex gap-2 flex-wrap">
            {[["any", "Open to Both"], ["same-pg", "Room in Same PG"], ["new-pg", "New PG"]] .map(([val, label]) => (
              <button
                key={val}
                onClick={() => setLookPref(val as any)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  background: lookPref === val ? "#10B981" : "rgba(255,255,255,0.07)",
                  borderColor: lookPref === val ? "#10B981" : "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe Match Minimum */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Minimum Vibe Match
            </p>
            <span className="text-sm font-bold" style={{ color: "#F59E0B" }}>{minMatch}%+</span>
          </div>
          <input
            type="range" min={40} max={95} step={5}
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
            <span>40%</span><span>95%</span>
          </div>
        </div>

        {/* My Status */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            My Current Status
          </p>
          <div
            className="rounded-2xl p-4 flex flex-col gap-3"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">My room type</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "#EDE9FE", color: "#7C3AED" }}>
                2-Sharing
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">I'm looking for</span>
              <span className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: "#ECFDF5", color: "#059669" }}>
                Same PG
              </span>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              This is what others see on your card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MATCH CARD ───────────────────────────────────────────
function MatchCard({ profile, onLike, onSkip }: {
  profile: TenantProfile;
  onLike: () => void;
  onSkip: () => void;
}) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "white",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        minHeight: 420,
      }}
    >
      {/* Top: Avatar + Status (left) + Match % (right) */}
      <div
        className="p-4 flex items-start gap-3"
        style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #3D3784 100%)" }}
      >
        {/* Left: Avatar + name */}
        <div className="flex flex-col items-center gap-2">
          <Avatar initials={profile.avatar} size={64} />
          <RoomStatusBadge status={profile.roomStatus} lookingFor={profile.lookingFor} />
        </div>

        {/* Right: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-bold text-lg leading-tight">{profile.name}, {profile.age}</h3>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
                {profile.occupation}
              </p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                📍 {profile.pgName}
              </p>
            </div>
            <div
              className="px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0 ml-2"
              style={{ background: "#F59E0B", color: "#0F172A" }}
            >
              {profile.vibeMatch}% 🔥
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="px-4 pt-3 pb-2 flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: "#EDE9FE", color: "#7C3AED" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* About */}
      <div className="px-4 pb-4">
        <p className="text-sm italic" style={{ color: "#64748B" }}>"{profile.about}"</p>
      </div>

      {/* Action Row */}
      <div className="mt-auto border-t flex" style={{ borderColor: "#F1F5F9" }}>
        <button
          onClick={onSkip}
          className="flex-1 py-4 flex items-center justify-center gap-2 font-semibold text-sm transition-colors"
          style={{ color: "#94A3B8" }}
        >
          <X size={18} />
          Skip
        </button>
        <div style={{ width: 1, background: "#F1F5F9" }} />
        <button
          onClick={onLike}
          className="flex-1 py-4 flex items-center justify-center gap-2 font-bold text-sm"
          style={{ color: "#7C3AED" }}
        >
          <Heart size={18} fill="#7C3AED" />
          Connect
        </button>
      </div>
    </div>
  );
}

// ─── CHAT THREAD ─────────────────────────────────────────
function ChatThread({ msg, onBack }: { msg: Message; onBack: () => void }) {
  const [text, setText] = useState("");
  const mockChat = [
    { from: "them", text: msg.lastMessage, time: msg.time },
    { from: "me", text: "Hey! Yes still checking it out", time: "1m ago" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8F7FF" }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-b"
        style={{ background: "white", borderColor: "#E2E8F0" }}
      >
        <button onClick={onBack}>
          <ArrowLeft size={20} color="#64748B" />
        </button>
        <Avatar initials={msg.avatar} size={36} />
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>{msg.name}</p>
          <p className="text-xs" style={{ color: msg.isOnline ? "#10B981" : "#94A3B8" }}>
            {msg.isOnline ? "● Online" : msg.pgName}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {mockChat.map((c, i) => (
          <div key={i} className={`flex ${c.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className="px-3 py-2 rounded-2xl max-w-[75%] text-sm"
              style={{
                background: c.from === "me" ? "#7C3AED" : "white",
                color: c.from === "me" ? "white" : "#0F172A",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              {c.text}
              <p className="text-xs mt-1 opacity-60">{c.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-3 px-4 py-3 border-t"
        style={{ background: "white", borderColor: "#E2E8F0" }}
      >
        <input
          className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none border"
          style={{ borderColor: "#E2E8F0", background: "#F8FAFC", color: "#0F172A" }}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: text ? "#7C3AED" : "#E2E8F0" }}
        >
          <Send size={16} color={text ? "white" : "#94A3B8"} />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────
export default function ConnectHub() {
  const [activeTab, setActiveTab] = useState<"matches" | "messages">("matches");
  const [showSettings, setShowSettings] = useState(false);
  const [profiles, setProfiles] = useState(PROFILES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [matched, setMatched] = useState<TenantProfile[]>([]);
  const [showMatchBanner, setShowMatchBanner] = useState<TenantProfile | null>(null);
  const [openChat, setOpenChat] = useState<Message | null>(null);
  const [searchMsg, setSearchMsg] = useState("");
  const [filterRoom, setFilterRoom] = useState<string>("all");

  const currentProfile = profiles[currentIdx];
  const totalUnread = MESSAGES.reduce((s, m) => s + m.unread, 0);

  const handleLike = () => {
    if (!currentProfile) return;
    const newMatched = [...matched, currentProfile];
    setMatched(newMatched);
    setShowMatchBanner(currentProfile);
    setTimeout(() => setShowMatchBanner(null), 2500);
    setCurrentIdx((i) => i + 1);
  };

  const handleSkip = () => setCurrentIdx((i) => i + 1);

  const filteredMessages = MESSAGES.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchMsg.toLowerCase());
    const matchRoom = filterRoom === "all" || m.pgName.includes(filterRoom);
    return matchSearch && matchRoom;
  });

  // If chat open
  if (openChat) {
    return (
      <div className="flex flex-col h-screen">
        <ChatThread msg={openChat} onBack={() => setOpenChat(null)} />
      </div>
    );
  }

  // Settings panel
  if (showSettings) {
    return <SettingsPanel onClose={() => setShowSettings(false)} />;
  }

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>

      {/* ── HEADER ── */}
      <div
        className="px-4 pt-12 pb-0"
        style={{ background: "white", borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold" style={{ color: "#0F172A" }}>Connect</h1>
          <div className="flex items-center gap-2">
            {/* Filter icon */}
            <button
              onClick={() => setShowSettings(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center border"
              style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
            >
              <Filter size={16} color="#64748B" />
            </button>
            {/* Settings */}
            <button
              onClick={() => setShowSettings(true)}
              className="w-9 h-9 rounded-full flex items-center justify-center border"
              style={{ borderColor: "#E2E8F0", background: "#F8FAFC" }}
            >
              <Settings size={16} color="#64748B" />
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-0">
          <button
            onClick={() => setActiveTab("matches")}
            className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
            style={{
              background: activeTab === "matches" ? "#7C3AED" : "transparent",
              color: activeTab === "matches" ? "white" : "#64748B",
            }}
          >
            <Heart size={14} />
            Matches
            {matched.length > 0 && (
              <span
                className="w-4 h-4 rounded-full text-xs flex items-center justify-center"
                style={{ background: activeTab === "matches" ? "rgba(255,255,255,0.3)" : "#7C3AED", color: "white", fontSize: 10 }}
              >
                {matched.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all"
            style={{
              background: activeTab === "messages" ? "#7C3AED" : "transparent",
              color: activeTab === "messages" ? "white" : "#64748B",
            }}
          >
            <MessageCircle size={14} />
            Messages
            {totalUnread > 0 && (
              <span
                className="w-4 h-4 rounded-full text-xs flex items-center justify-center"
                style={{ background: activeTab === "messages" ? "rgba(255,255,255,0.3)" : "#F0436A", color: "white", fontSize: 10 }}
              >
                {totalUnread}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── MATCH BANNER ── */}
      {showMatchBanner && (
        <div
          className="mx-4 mt-3 p-3 rounded-2xl flex items-center gap-3 animate-pulse"
          style={{ background: "linear-gradient(135deg, #7C3AED, #F0436A)" }}
        >
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-white font-bold text-sm">You connected with {showMatchBanner.name}!</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Say hi in messages →</p>
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className="flex-1 overflow-y-auto">

        {/* ════ MATCHES TAB ════ */}
        {activeTab === "matches" && (
          <div className="px-4 py-4 flex flex-col gap-4">

            {/* My Status Card */}
            <div
              className="rounded-2xl p-3 flex items-center gap-3"
              style={{ background: "white", border: "1px solid #EDE9FE" }}
            >
              <Avatar initials="AK" size={36} />
              <div className="flex-1">
                <p className="text-xs font-semibold" style={{ color: "#64748B" }}>My Status</p>
                <div className="flex gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#EDE9FE", color: "#7C3AED" }}>
                    2-Sharing
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "#ECFDF5", color: "#059669" }}>
                    Same PG
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: "#F8F7FF", color: "#7C3AED", border: "1px solid #EDE9FE" }}
              >
                Edit
              </button>
            </div>

            {/* Profile to swipe */}
            {currentProfile ? (
              <MatchCard
                profile={currentProfile}
                onLike={handleLike}
                onSkip={handleSkip}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <span style={{ fontSize: 48 }}>🎯</span>
                <p className="font-bold text-lg" style={{ color: "#0F172A" }}>You've seen everyone!</p>
                <p className="text-sm text-center" style={{ color: "#64748B" }}>
                  Update your preferences to discover more people
                </p>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-3 rounded-full font-semibold text-sm text-white"
                  style={{ background: "#7C3AED" }}
                >
                  Update Preferences
                </button>
              </div>
            )}

            {/* Confirmed Matches */}
            {matched.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-3" style={{ color: "#0F172A" }}>
                  Your Matches 🎉 ({matched.length})
                </p>
                <div className="flex flex-col gap-2">
                  {matched.map((m) => (
                    <div
                      key={m.id}
                      className="rounded-2xl p-3 flex items-center gap-3"
                      style={{ background: "white", border: "1px solid #EDE9FE" }}
                    >
                      <Avatar initials={m.avatar} size={40} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>{m.name}</p>
                        <RoomStatusBadge status={m.roomStatus} lookingFor={m.lookingFor} />
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab("messages");
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold text-white"
                        style={{ background: "#7C3AED" }}
                      >
                        Message
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════ MESSAGES TAB ════ */}
        {activeTab === "messages" && (
          <div className="px-4 py-4 flex flex-col gap-3">

            {/* Search */}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{ background: "white", border: "1px solid #E2E8F0" }}
            >
              <Search size={15} color="#94A3B8" />
              <input
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#0F172A" }}
                placeholder="Search messages..."
                value={searchMsg}
                onChange={(e) => setSearchMsg(e.target.value)}
              />
            </div>

            {/* Filter chips */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["all", "Sunshine PG", "Green Nest PG", "Sunrise PG"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterRoom(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all"
                  style={{
                    background: filterRoom === f ? "#7C3AED" : "white",
                    color: filterRoom === f ? "white" : "#64748B",
                    borderColor: filterRoom === f ? "#7C3AED" : "#E2E8F0",
                  }}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>

            {/* Message list */}
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle size={40} color="#CBD5E1" className="mx-auto mb-3" />
                <p className="font-semibold" style={{ color: "#0F172A" }}>No messages yet</p>
                <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>Match with someone to start chatting</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setOpenChat(msg)}
                  className="w-full rounded-2xl p-3 flex items-center gap-3 text-left"
                  style={{
                    background: "white",
                    border: msg.unread > 0 ? "1px solid #EDE9FE" : "1px solid #E2E8F0",
                  }}
                >
                  {/* Avatar + online dot */}
                  <div className="relative flex-shrink-0">
                    <Avatar initials={msg.avatar} size={44} />
                    {msg.isOnline && (
                      <div
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                        style={{ background: "#10B981" }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm truncate" style={{ color: "#0F172A" }}>{msg.name}</p>
                      <p className="text-xs flex-shrink-0 ml-2" style={{ color: "#94A3B8" }}>{msg.time}</p>
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color: "#64748B" }}>{msg.pgName}</p>
                    <p className="text-xs truncate mt-0.5" style={{
                      color: msg.unread > 0 ? "#0F172A" : "#94A3B8",
                      fontWeight: msg.unread > 0 ? 500 : 400,
                    }}>
                      {msg.lastMessage}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {msg.unread > 0 && (
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: "#7C3AED" }}
                    >
                      {msg.unread}
                    </div>
                  )}
                  {msg.unread === 0 && <ChevronRight size={16} color="#CBD5E1" />}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## STEP 3 — Add route + nav tab. Paste this into Figma Make chat:
```
In src/app/pages/MainLayout.tsx, add a new bottom nav tab called "Connect" with the Heart icon from lucide-react, placed between the Explore tab and the last tab.
Route: /tenant/connect
Component: ConnectHub (import from ./ConnectHub)
Show a small red dot badge on the Connect tab icon when there are unread messages (hardcode as true for now).

Also add this route to src/app/routes.ts:
{ path: "/tenant/connect", element: <ConnectHub /> }