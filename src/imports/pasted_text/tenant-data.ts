import { useState } from "react";
import {
  Settings, SlidersHorizontal, MessageCircle, Heart,
  X, ChevronRight, Search, Users, Building2,
  Home, Send, ArrowLeft, MapPin, Briefcase
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────
type RoomStatus = "2-sharing" | "3-sharing" | "single";
type LookingFor = "same-pg" | "new-pg" | "open";
type Gender = "male" | "female";

interface TenantProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  occupation: string;
  city: string;
  pgName: string;
  gender: Gender;
  roomStatus: RoomStatus;
  lookingFor: LookingFor;
  livingStatus: "living" | "looking";
  since: string;
  vibeMatch: number;
  lifestyleTags: string[];
  interestTags: string[];
  about: string;
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
    occupation: "Software Engineer", city: "Pune",
    pgName: "Sunshine PG", gender: "male",
    roomStatus: "2-sharing", lookingFor: "same-pg",
    livingStatus: "living", since: "Jan 2025",
    vibeMatch: 92,
    lifestyleTags: ["🦉 Night Owl", "🎮 Gamer", "💻 Tech"],
    interestTags: ["🎵 Music", "🍕 Foodie"],
    about: "Big into gaming and clean spaces 😄",
  },
  {
    id: "2", name: "Karthik S", age: 25, avatar: "KS",
    occupation: "Data Analyst", city: "Chennai",
    pgName: "Sunshine PG", gender: "male",
    roomStatus: "3-sharing", lookingFor: "new-pg",
    livingStatus: "looking", since: "April 2025",
    vibeMatch: 88,
    lifestyleTags: ["💼 Working Pro", "🏋️ Fitness", "🌅 Early Bird"],
    interestTags: ["⚽ Sports", "📚 Reading"],
    about: "Love cooking and morning runs 🏃",
  },
  {
    id: "3", name: "Arjun Kumar", age: 23, avatar: "AK",
    occupation: "Student", city: "Delhi",
    pgName: "Green Nest PG", gender: "male",
    roomStatus: "2-sharing", lookingFor: "same-pg",
    livingStatus: "living", since: "Mar 2025",
    vibeMatch: 79,
    lifestyleTags: ["🎓 Student", "🎵 Music", "🏠 Homebody"],
    interestTags: ["🎬 Movies", "🍕 Foodie"],
    about: "Chill vibes only, always up for a jam 🎸",
  },
  {
    id: "4", name: "Meghna R", age: 22, avatar: "MR",
    occupation: "UX Designer", city: "Hyderabad",
    pgName: "Sunrise PG", gender: "female",
    roomStatus: "single", lookingFor: "new-pg",
    livingStatus: "looking", since: "March 2025",
    vibeMatch: 85,
    lifestyleTags: ["🎨 Art", "☕ Café", "🌅 Early Bird"],
    interestTags: ["📚 Reading", "✨ Minimalist"],
    about: "Looking for a quiet clean shared space",
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

// ─── CONSTANTS ────────────────────────────────────────────
const AVATAR_COLORS: Record<string, string> = {
  RN: "#7C3AED", KS: "#10B981", AK: "#F59E0B", MR: "#F0436A",
};

// ─── AVATAR ───────────────────────────────────────────────
function Avatar({ initials, size = 40, border }: { initials: string; size?: number; border?: string }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{
        width: size, height: size,
        fontSize: size * 0.33,
        backgroundColor: AVATAR_COLORS[initials] ?? "#7C3AED",
        border: border ?? "none",
      }}
    >
      {initials}
    </div>
  );
}

// ─── ROOM STATUS BADGE ────────────────────────────────────
function RoomStatusBadge({ roomStatus, lookingFor }: { roomStatus: RoomStatus; lookingFor: LookingFor }) {
  const roomLabel = roomStatus === "2-sharing" ? "2-Sharing" : roomStatus === "3-sharing" ? "3-Sharing" : "Single";
  const lookLabel = lookingFor === "same-pg" ? "Same PG" : lookingFor === "new-pg" ? "New PG" : "Open";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{
        background: "#EDE9FE", width: "fit-content",
      }}>
        <Users size={9} color="#7C3AED" />
        <span style={{ fontSize: 10, fontWeight: 600, color: "#7C3AED" }}>{roomLabel}</span>
      </div>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{
        background: lookingFor === "same-pg" ? "#ECFDF5" : "#FFF7ED", width: "fit-content",
      }}>
        {lookingFor === "same-pg"
          ? <Home size={9} color="#059669" />
          : <Building2 size={9} color="#D97706" />}
        <span style={{
          fontSize: 10, fontWeight: 500,
          color: lookingFor === "same-pg" ? "#059669" : "#D97706",
        }}>{lookLabel}</span>
      </div>
    </div>
  );
}

// ─── GENDER BADGE ─────────────────────────────────────────
function GenderBadge({ gender }: { gender: Gender }) {
  const isMale = gender === "male";
  return (
    <div
      className="flex items-center gap-1 px-2.5 py-1 rounded-full"
      style={{
        background: isMale ? "rgba(99,102,241,0.25)" : "rgba(236,72,153,0.25)",
        border: `1px solid ${isMale ? "rgba(165,180,252,0.5)" : "rgba(249,168,212,0.5)"}`,
        backdropFilter: "blur(4px)",
      }}
    >
      <span style={{ fontSize: 11 }}>{isMale ? "♂" : "♀"}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: isMale ? "#A5B4FC" : "#F9A8D4" }}>
        {isMale ? "Male" : "Female"}
      </span>
    </div>
  );
}

// ─── MATCH CARD ───────────────────────────────────────────
function MatchCard({ profile, onLike, onSkip }: {
  profile: TenantProfile;
  onLike: () => void;
  onSkip: () => void;
}) {
  const [skipHover, setSkipHover] = useState(false);
  const [connectHover, setConnectHover] = useState(false);

  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "white",
        boxShadow: "0 8px 32px rgba(124,58,237,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        border: "1px solid #EDE9FE",
      }}
    >
      {/* ── DARK TOP SECTION ── */}
      <div
        className="relative p-4 flex items-start gap-3"
        style={{
          background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #3D3784 100%)",
          minHeight: 140,
        }}
      >
        {/* Left: Avatar + Status */}
        <div className="flex flex-col items-start gap-2 flex-shrink-0">
          <Avatar
            initials={profile.avatar}
            size={72}
            border="3px solid rgba(255,255,255,0.2)"
          />
          <RoomStatusBadge roomStatus={profile.roomStatus} lookingFor={profile.lookingFor} />
        </div>

        {/* Right: Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          {/* Vibe match top right */}
          <div className="flex justify-end mb-1">
            <div
              className="px-3 py-1.5 rounded-full"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #EF4444)",
                boxShadow: "0 2px 8px rgba(245,158,11,0.4)",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>
                {profile.vibeMatch}% 🔥
              </span>
            </div>
          </div>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", letterSpacing: "-0.3px", lineHeight: 1.2 }}>
            {profile.name}, {profile.age}
          </h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
            {profile.occupation}
          </p>
          <div className="flex items-center gap-1">
            <MapPin size={11} color="rgba(255,255,255,0.45)" />
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{profile.pgName}</p>
          </div>
        </div>

        {/* Gender badge — absolute bottom right */}
        <div className="absolute" style={{ bottom: 12, right: 12 }}>
          <GenderBadge gender={profile.gender} />
        </div>
      </div>

      {/* ── WHITE CONTENT SECTION ── */}
      <div className="flex flex-col p-4 gap-3">

        {/* Occupation + City */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Briefcase size={12} color="#94A3B8" />
          <span style={{ fontSize: 12, color: "#64748B" }}>{profile.occupation}</span>
          <span style={{ color: "#CBD5E1", fontSize: 12 }}>·</span>
          <MapPin size={12} color="#94A3B8" />
          <span style={{ fontSize: 12, color: "#64748B" }}>From {profile.city}</span>
        </div>

        {/* Living/Looking status pill */}
        <div>
          {profile.livingStatus === "living" ? (
            <span className="px-3 py-1 rounded-full" style={{
              fontSize: 12, fontWeight: 500,
              background: "#EFF6FF", color: "#3B82F6",
              border: "1px solid #BFDBFE",
              display: "inline-block",
            }}>
              🏠 Living here since {profile.since}
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full" style={{
              fontSize: 12, fontWeight: 500,
              background: "#FFF7ED", color: "#F59E0B",
              border: "1px solid #FDE68A",
              display: "inline-block",
            }}>
              🔍 Looking to move {profile.since}
            </span>
          )}
        </div>

        {/* Lifestyle tags — teal style */}
        {profile.lifestyleTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.lifestyleTags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full" style={{
                fontSize: 12, fontWeight: 500,
                background: "#F0FDFA", color: "#0D9488",
                border: "1px solid #0D9488",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Interest tags — violet style */}
        {profile.interestTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {profile.interestTags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full" style={{
                fontSize: 12, fontWeight: 500,
                background: "#F5F3FF", color: "#7C3AED",
                border: "1px solid #7C3AED",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* About */}
        <p style={{ fontSize: 13, color: "#475569", fontStyle: "italic" }}>
          "{profile.about}"
        </p>
      </div>

      {/* ── ACTION ROW ── */}
      <div className="flex border-t" style={{ borderColor: "#F1F5F9" }}>
        <button
          onMouseEnter={() => setSkipHover(true)}
          onMouseLeave={() => setSkipHover(false)}
          onClick={onSkip}
          className="flex-1 flex items-center justify-center gap-2 py-4 transition-colors"
          style={{
            background: skipHover ? "#FEF2F2" : "transparent",
            borderRadius: "0 0 0 24px",
          }}
        >
          <X size={16} color="#94A3B8" />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#94A3B8" }}>Skip</span>
        </button>

        <div style={{ width: 1, background: "#F1F5F9" }} />

        <button
          onMouseEnter={() => setConnectHover(true)}
          onMouseLeave={() => setConnectHover(false)}
          onClick={onLike}
          className="flex-1 flex items-center justify-center gap-2 py-4 transition-colors"
          style={{
            background: connectHover ? "#F5F3FF" : "transparent",
            borderRadius: "0 0 24px 0",
          }}
        >
          <Heart size={16} fill="#7C3AED" color="#7C3AED" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#7C3AED" }}>Connect</span>
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
    { from: "me", text: "Hey! Yes still checking it out 👀", time: "1m ago" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#F8F7FF" }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: "white", borderColor: "#E2E8F0" }}>
        <button onClick={onBack}><ArrowLeft size={20} color="#64748B" /></button>
        <Avatar initials={msg.avatar} size={36} />
        <div className="flex-1">
          <p className="font-semibold text-sm" style={{ color: "#0F172A" }}>{msg.name}</p>
          <p className="text-xs" style={{ color: msg.isOnline ? "#10B981" : "#94A3B8" }}>
            {msg.isOnline ? "● Online" : msg.pgName}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {mockChat.map((c, i) => (
          <div key={i} className={`flex ${c.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className="px-3 py-2 rounded-2xl max-w-xs text-sm" style={{
              background: c.from === "me" ? "#7C3AED" : "white",
              color: c.from === "me" ? "white" : "#0F172A",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
              {c.text}
              <p className="text-xs mt-1" style={{ opacity: 0.6 }}>{c.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ background: "white", borderColor: "#E2E8F0" }}>
        <input
          className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none border"
          style={{ borderColor: "#E2E8F0", background: "#F8FAFC", color: "#0F172A" }}
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
          style={{ background: text ? "#7C3AED" : "#E2E8F0" }}
        >
          <Send size={16} color={text ? "white" : "#94A3B8"} />
        </button>
      </div>
    </div>
  );
}

// ─── SETTINGS PANEL (light theme) ────────────────────────
function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [roomPref, setRoomPref] = useState<string>("any");
  const [lookPref, setLookPref] = useState<string>("any");
  const [minMatch, setMinMatch] = useState(60);

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#F8F7FF" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ background: "white", borderColor: "#E2E8F0" }}>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "#F1F5F9" }}>
          <ArrowLeft size={18} color="#64748B" />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Match Preferences</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-full text-sm font-semibold text-white"
          style={{ background: "#7C3AED" }}
        >
          Save
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">

        {/* Room Sharing */}
        <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid #E2E8F0" }}>
          <p className="mb-3" style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Room Sharing
          </p>
          <div className="flex gap-2 flex-wrap">
            {[["any", "Any"], ["single", "Single"], ["2-sharing", "2 Sharing"], ["3-sharing", "3 Sharing"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setRoomPref(val)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  background: roomPref === val ? "#7C3AED" : "white",
                  borderColor: roomPref === val ? "#7C3AED" : "#E2E8F0",
                  color: roomPref === val ? "white" : "#64748B",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Looking For */}
        <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid #E2E8F0" }}>
          <p className="mb-3" style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Looking For
          </p>
          <div className="flex gap-2 flex-wrap">
            {[["any", "Open to Both"], ["same-pg", "Same PG Room"], ["new-pg", "New PG"]].map(([val, label]) => (
              <button
                key={val}
                onClick={() => setLookPref(val)}
                className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                style={{
                  background: lookPref === val ? "#10B981" : "white",
                  borderColor: lookPref === val ? "#10B981" : "#E2E8F0",
                  color: lookPref === val ? "white" : "#64748B",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe Match */}
        <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid #E2E8F0" }}>
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Minimum Vibe Match
            </p>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{
              background: "#FFF7ED", color: "#D97706", border: "1px solid #FDE68A",
            }}>
              {minMatch}%+
            </span>
          </div>
          <input
            type="range" min={40} max={95} step={5}
            value={minMatch}
            onChange={(e) => setMinMatch(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between mt-1">
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>40%</span>
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>95%</span>
          </div>
        </div>

        {/* My Current Status */}
        <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid #EDE9FE" }}>
          <p className="mb-3" style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            My Current Status
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: "#64748B" }}>My room type</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#EDE9FE", color: "#7C3AED" }}>
                2-Sharing
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 13, color: "#64748B" }}>I'm looking for</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#ECFDF5", color: "#059669" }}>
                Same PG
              </span>
            </div>
            <p style={{ fontSize: 11, color: "#CBD5E1" }}>This is shown on your profile card to others</p>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────
export default function ConnectHub() {
  const [activeTab, setActiveTab] = useState<"matches" | "messages">("matches");
  const [showSettings, setShowSettings] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [matched, setMatched] = useState<TenantProfile[]>([]);
  const [showMatchBanner, setShowMatchBanner] = useState<TenantProfile | null>(null);
  const [openChat, setOpenChat] = useState<Message | null>(null);
  const [searchMsg, setSearchMsg] = useState("");
  const [filterPG, setFilterPG] = useState("all");

  const currentProfile = PROFILES[currentIdx];
  const totalUnread = MESSAGES.reduce((s, m) => s + m.unread, 0);

  const handleLike = () => {
    if (!currentProfile) return;
    setMatched((prev) => [...prev, currentProfile]);
    setShowMatchBanner(currentProfile);
    setTimeout(() => setShowMatchBanner(null), 2500);
    setCurrentIdx((i) => i + 1);
  };

  const handleSkip = () => setCurrentIdx((i) => i + 1);

  const filteredMessages = MESSAGES.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchMsg.toLowerCase());
    const matchPG = filterPG === "all" || m.pgName === filterPG;
    return matchSearch && matchPG;
  });

  if (openChat) {
    return (
      <div className="flex flex-col" style={{ height: "100dvh" }}>
        <ChatThread msg={openChat} onBack={() => setOpenChat(null)} />
      </div>
    );
  }

  if (showSettings) return <SettingsPanel onClose={() => setShowSettings(false)} />;

  return (
    <div className="flex flex-col" style={{ height: "100dvh", background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0" }}>
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>
            Connect
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center justify-center rounded-full border transition-colors"
              style={{ width: 36, height: 36, borderColor: "#E2E8F0", background: "#F8FAFC" }}
            >
              <SlidersHorizontal size={15} color="#64748B" />
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="flex items-center justify-center rounded-full border transition-colors"
              style={{ width: 36, height: 36, borderColor: "#E2E8F0", background: "#F8FAFC" }}
            >
              <Settings size={15} color="#64748B" />
            </button>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 mx-4 mb-3 p-1 rounded-xl" style={{ background: "#F1F5F9" }}>
          <button
            onClick={() => setActiveTab("matches")}
            className="flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
            style={{
              background: activeTab === "matches" ? "#7C3AED" : "transparent",
              color: activeTab === "matches" ? "white" : "#64748B",
            }}
          >
            <Heart size={14} fill={activeTab === "matches" ? "white" : "none"} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Matches</span>
            {matched.length > 0 && (
              <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{
                background: "rgba(255,255,255,0.25)", fontSize: 10, color: "white",
              }}>{matched.length}</span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className="flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
            style={{
              background: activeTab === "messages" ? "#7C3AED" : "transparent",
              color: activeTab === "messages" ? "white" : "#64748B",
            }}
          >
            <MessageCircle size={14} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Messages</span>
            {totalUnread > 0 && (
              <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{
                background: activeTab === "messages" ? "rgba(255,255,255,0.25)" : "#F0436A",
                fontSize: 10, color: "white",
              }}>{totalUnread}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── MATCH BANNER ── */}
      {showMatchBanner && (
        <div className="mx-4 mt-3 px-4 py-3 rounded-2xl flex items-center gap-3" style={{
          background: "linear-gradient(135deg, #7C3AED, #F0436A)",
          boxShadow: "0 4px 16px rgba(124,58,237,0.3)",
        }}>
          <span style={{ fontSize: 24 }}>🎉</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "white" }}>
              Connected with {showMatchBanner.name}!
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Say hi in messages →</p>
          </div>
        </div>
      )}

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="flex-1 overflow-y-auto">

        {/* MATCHES TAB */}
        {activeTab === "matches" && (
          <div className="px-4 py-4 flex flex-col gap-4">

            {currentProfile ? (
              <MatchCard profile={currentProfile} onLike={handleLike} onSkip={handleSkip} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <span style={{ fontSize: 52 }}>🎯</span>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>You've seen everyone!</p>
                <p style={{ fontSize: 14, color: "#64748B", textAlign: "center" }}>
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
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
                  Your Matches 🎉 ({matched.length})
                </p>
                <div className="flex flex-col gap-2">
                  {matched.map((m) => (
                    <div key={m.id} className="rounded-2xl p-3 flex items-center gap-3"
                      style={{ background: "white", border: "1px solid #EDE9FE" }}>
                      <Avatar initials={m.avatar} size={40} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{m.name}</p>
                        <RoomStatusBadge roomStatus={m.roomStatus} lookingFor={m.lookingFor} />
                      </div>
                      <button
                        onClick={() => setActiveTab("messages")}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex-shrink-0"
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

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="px-4 py-4 flex flex-col gap-3">
            {/* Search */}
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
              style={{ background: "white", border: "1px solid #E2E8F0" }}>
              <Search size={15} color="#94A3B8" />
              <input
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color: "#0F172A" }}
                placeholder="Search messages..."
                value={searchMsg}
                onChange={(e) => setSearchMsg(e.target.value)}
              />
            </div>

            {/* PG Filter */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {["all", "Sunshine PG", "Green Nest PG", "Sunrise PG"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterPG(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all flex-shrink-0"
                  style={{
                    background: filterPG === f ? "#7C3AED" : "white",
                    color: filterPG === f ? "white" : "#64748B",
                    borderColor: filterPG === f ? "#7C3AED" : "#E2E8F0",
                  }}
                >
                  {f === "all" ? "All PGs" : f}
                </button>
              ))}
            </div>

            {/* Messages List */}
            {filteredMessages.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-3">
                <MessageCircle size={44} color="#CBD5E1" />
                <p style={{ fontSize: 16, fontWeight: 600, color: "#0F172A" }}>No messages yet</p>
                <p style={{ fontSize: 13, color: "#94A3B8" }}>Match with someone to start chatting</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setOpenChat(msg)}
                  className="w-full rounded-2xl p-3 flex items-center gap-3 text-left transition-all"
                  style={{
                    background: "white",
                    border: msg.unread > 0 ? "1px solid #EDE9FE" : "1px solid #E2E8F0",
                  }}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar initials={msg.avatar} size={44} />
                    {msg.isOnline && (
                      <div className="absolute border-2 border-white rounded-full"
                        style={{ width: 12, height: 12, bottom: 0, right: 0, background: "#10B981" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{msg.name}</p>
                      <p style={{ fontSize: 11, color: "#94A3B8" }}>{msg.time}</p>
                    </div>
                    <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>{msg.pgName}</p>
                    <p className="truncate" style={{
                      fontSize: 12, marginTop: 2,
                      color: msg.unread > 0 ? "#0F172A" : "#94A3B8",
                      fontWeight: msg.unread > 0 ? 500 : 400,
                    }}>
                      {msg.lastMessage}
                    </p>
                  </div>
                  {msg.unread > 0 ? (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "#7C3AED" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{msg.unread}</span>
                    </div>
                  ) : (
                    <ChevronRight size={16} color="#CBD5E1" />
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}