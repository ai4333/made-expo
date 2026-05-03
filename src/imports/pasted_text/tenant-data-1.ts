import { useState } from "react";
import {
  Settings, SlidersHorizontal, MessageCircle, Heart,
  X, ChevronRight, Search, Users, Building2,
  Home, Send, ArrowLeft, MapPin, Briefcase, Bell,
  Lock, Check, Star
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────
type RoomStatus = "2-sharing" | "3-sharing" | "single";
type LookingFor = "same-pg" | "new-pg" | "open";
type Gender = "male" | "female";

interface TenantProfile {
  id: string; name: string; age: number; avatar: string;
  occupation: string; city: string; pgName: string;
  gender: Gender; roomStatus: RoomStatus; lookingFor: LookingFor;
  livingStatus: "living" | "looking"; since: string;
  vibeMatch: number; lifestyleTags: string[]; interestTags: string[];
  about: string;
}

interface Message {
  id: string; name: string; avatar: string;
  lastMessage: string; time: string; unread: number;
  pgName: string; isOnline: boolean;
}

interface NotifItem {
  id: string; name: string; match: number; time: string;
}

// ─── MOCK DATA ────────────────────────────────────────────
const PROFILES: TenantProfile[] = [
  {
    id: "1", name: "Rahul Nair", age: 24, avatar: "RN",
    occupation: "Software Engineer", city: "Pune", pgName: "Sunshine PG",
    gender: "male", roomStatus: "2-sharing", lookingFor: "same-pg",
    livingStatus: "living", since: "Jan 2025", vibeMatch: 92,
    lifestyleTags: ["🦉 Night Owl", "🎮 Gamer", "💻 Tech"],
    interestTags: ["🎵 Music", "🍕 Foodie"],
    about: "Big into gaming and clean spaces 😄",
  },
  {
    id: "2", name: "Karthik S", age: 25, avatar: "KS",
    occupation: "Data Analyst", city: "Chennai", pgName: "Sunshine PG",
    gender: "male", roomStatus: "3-sharing", lookingFor: "new-pg",
    livingStatus: "looking", since: "April 2025", vibeMatch: 88,
    lifestyleTags: ["💼 Working Pro", "🏋️ Fitness", "🌅 Early Bird"],
    interestTags: ["⚽ Sports", "📚 Reading"],
    about: "Love cooking and morning runs 🏃",
  },
  {
    id: "3", name: "Arjun Kumar", age: 23, avatar: "AK",
    occupation: "Student", city: "Delhi", pgName: "Green Nest PG",
    gender: "male", roomStatus: "2-sharing", lookingFor: "same-pg",
    livingStatus: "living", since: "Mar 2025", vibeMatch: 79,
    lifestyleTags: ["🎓 Student", "🎵 Music", "🏠 Homebody"],
    interestTags: ["🎬 Movies", "🍕 Foodie"],
    about: "Chill vibes only, always up for a jam 🎸",
  },
  {
    id: "4", name: "Meghna R", age: 22, avatar: "MR",
    occupation: "UX Designer", city: "Hyderabad", pgName: "Sunrise PG",
    gender: "female", roomStatus: "single", lookingFor: "new-pg",
    livingStatus: "looking", since: "March 2025", vibeMatch: 85,
    lifestyleTags: ["🎨 Art", "☕ Café", "🌅 Early Bird"],
    interestTags: ["📚 Reading", "✨ Minimalist"],
    about: "Looking for a quiet clean shared space",
  },
];

const MESSAGES: Message[] = [
  { id: "1", name: "Rahul Nair", avatar: "RN", lastMessage: "Hey! Are you still looking at Sunshine PG?", time: "2m ago", unread: 2, pgName: "Sunshine PG", isOnline: true },
  { id: "2", name: "Karthik S", avatar: "KS", lastMessage: "Would love to be roommates — connect?", time: "1h ago", unread: 0, pgName: "Sunshine PG", isOnline: false },
  { id: "3", name: "Arjun Kumar", avatar: "AK", lastMessage: "Saw we're both looking at Green Nest 🙌", time: "3h ago", unread: 1, pgName: "Green Nest PG", isOnline: true },
];

const NOTIFS: NotifItem[] = [
  { id: "1", name: "Rahul", match: 91, time: "2 hrs ago" },
  { id: "2", name: "Priya", match: 88, time: "5 hrs ago" },
  { id: "3", name: "Karthik", match: 85, time: "1 day ago" },
];

const AVATAR_COLORS: Record<string, string> = {
  RN: "#7C3AED", KS: "#10B981", AK: "#F59E0B", MR: "#F0436A",
};

// ─── AVATAR ───────────────────────────────────────────────
function Avatar({ initials, size = 40, border }: { initials: string; size?: number; border?: string }) {
  return (
    <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.33, backgroundColor: AVATAR_COLORS[initials] ?? "#7C3AED", border: border ?? "none" }}>
      {initials}
    </div>
  );
}

// ─── BLURRED AVATAR ───────────────────────────────────────
function BlurredAvatar({ size = 44 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)",
      filter: "blur(3px)", flexShrink: 0,
    }} />
  );
}

// ─── ROOM STATUS BADGE ────────────────────────────────────
function RoomStatusBadge({ roomStatus, lookingFor }: { roomStatus: RoomStatus; lookingFor: LookingFor }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: "#EDE9FE", width: "fit-content" }}>
        <Users size={9} color="#7C3AED" />
        <span style={{ fontSize: 10, fontWeight: 600, color: "#7C3AED" }}>
          {roomStatus === "2-sharing" ? "2-Sharing" : roomStatus === "3-sharing" ? "3-Sharing" : "Single"}
        </span>
      </div>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: lookingFor === "same-pg" ? "#ECFDF5" : "#FFF7ED", width: "fit-content" }}>
        {lookingFor === "same-pg" ? <Home size={9} color="#059669" /> : <Building2 size={9} color="#D97706" />}
        <span style={{ fontSize: 10, fontWeight: 500, color: lookingFor === "same-pg" ? "#059669" : "#D97706" }}>
          {lookingFor === "same-pg" ? "Same PG" : "New PG"}
        </span>
      </div>
    </div>
  );
}

// ─── GENDER BADGE ─────────────────────────────────────────
function GenderBadge({ gender }: { gender: Gender }) {
  return (
    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full" style={{
      background: gender === "male" ? "rgba(99,102,241,0.25)" : "rgba(236,72,153,0.25)",
      border: `1px solid ${gender === "male" ? "rgba(165,180,252,0.5)" : "rgba(249,168,212,0.5)"}`,
    }}>
      <span style={{ fontSize: 11 }}>{gender === "male" ? "♂" : "♀"}</span>
      <span style={{ fontSize: 11, fontWeight: 600, color: gender === "male" ? "#A5B4FC" : "#F9A8D4" }}>
        {gender === "male" ? "Male" : "Female"}
      </span>
    </div>
  );
}

// ─── UNLOCK PAYWALL SHEET ─────────────────────────────────
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
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onClose}>
      <div className="w-full rounded-t-3xl bg-white p-5 pb-8 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}>
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto" />

        {state === "success" ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <style>{`@keyframes popIn{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}`}</style>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
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

            {/* Features */}
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

            {/* Options */}
            <div className="flex flex-col gap-3">
              {/* Single */}
              <button onClick={() => setSelected("single")} className="w-full text-left p-4 rounded-2xl flex items-center gap-3 transition-all"
                style={{ background: selected === "single" ? "#FAFAFF" : "white", border: `${selected === "single" ? 2 : 1}px solid ${selected === "single" ? "#7C3AED" : "#E2E8F0"}` }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected === "single" ? "#7C3AED" : "#E2E8F0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected === "single" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7C3AED" }} />}
                </div>
                <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>₹29 · Unlock this one profile</span>
              </button>

              {/* Premium */}
              <button onClick={() => setSelected("premium")} className="w-full text-left p-4 rounded-2xl flex items-center gap-3 relative transition-all"
                style={{ background: selected === "premium" ? "#FAFAFF" : "white", border: `${selected === "premium" ? 2 : 1}px solid ${selected === "premium" ? "#7C3AED" : "#E2E8F0"}` }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected === "premium" ? "#7C3AED" : "#E2E8F0"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {selected === "premium" && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#7C3AED" }} />}
                </div>
                <div className="flex-1">
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", margin: 0 }}>₹199/month · Unlimited unlocks</p>
                  <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>+ priority matches</p>
                </div>
                <span style={{ background: "#FFF7ED", color: "#D97706", border: "1px solid #FDE68A", borderRadius: 100, padding: "3px 8px", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
                  Best Value
                </span>
              </button>
            </div>

            {/* Continue */}
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

// ─── MATCH REQUESTS PANEL ─────────────────────────────────
function MatchRequestsPanel({ onClose, onUnlock }: { onClose: () => void; onUnlock: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl bg-white p-5 pb-8 flex flex-col gap-4" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto" />

        <div className="flex items-center justify-between">
          <p style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>Match Requests 🔔</p>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: "#F1F5F9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={16} color="#64748B" />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {NOTIFS.map(n => (
            <div key={n.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "white", border: "1px solid #EDE9FE" }}>
              <BlurredAvatar size={44} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0F172A", margin: 0 }}>{n.name}</p>
                  <span style={{ background: "#FFF7ED", color: "#D97706", borderRadius: 100, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>
                    {n.match}% 🔥
                  </span>
                </div>
                <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>wants to connect with you 👋</p>
                <p style={{ fontSize: 11, color: "#94A3B8", margin: "2px 0 0" }}>{n.time}</p>
              </div>
              <button
                onClick={() => { onClose(); onUnlock(); }}
                style={{ background: "#7C3AED", color: "white", border: "none", borderRadius: 100, padding: "8px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", flexShrink: 0 }}>
                Unlock →
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => { onClose(); onUnlock(); }}
          style={{ width: "100%", height: 52, borderRadius: 100, background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "white", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
          🔓 Unlock All — Get Premium →
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE CARD (full view) ─────────────────────────────
function ProfileBottomSheet({ profile, onClose, onUnlock }: {
  profile: TenantProfile; onClose: () => void; onUnlock: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full rounded-t-3xl bg-white overflow-y-auto" style={{ maxHeight: "90vh" }} onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mt-3 mb-0" />

        {/* Dark header */}
        <div className="relative p-4 flex items-start gap-3" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #3D3784 100%)", minHeight: 140 }}>
          <button onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} color="white" />
          </button>

          <div className="flex flex-col gap-2 flex-shrink-0">
            <Avatar initials={profile.avatar} size={72} border="3px solid rgba(255,255,255,0.2)" />
            <RoomStatusBadge roomStatus={profile.roomStatus} lookingFor={profile.lookingFor} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-end mb-1">
              <div style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)", borderRadius: 100, padding: "6px 12px", boxShadow: "0 2px 8px rgba(245,158,11,0.4)" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{profile.vibeMatch}% 🔥</span>
              </div>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", letterSpacing: "-0.3px", lineHeight: 1.2, margin: 0 }}>
              {profile.name}, {profile.age}
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "2px 0" }}>{profile.occupation}</p>
            <div className="flex items-center gap-1">
              <MapPin size={11} color="rgba(255,255,255,0.45)" />
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0 }}>{profile.pgName}</p>
            </div>
          </div>

          <div className="absolute" style={{ bottom: 12, right: 12 }}>
            <GenderBadge gender={profile.gender} />
          </div>
        </div>

        {/* Content */}
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

          <div className="flex flex-wrap gap-2">
            {profile.lifestyleTags.map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 500, background: "#F0FDFA", color: "#0D9488", border: "1px solid #0D9488", borderRadius: 100, padding: "6px 12px" }}>{t}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.interestTags.map(t => (
              <span key={t} style={{ fontSize: 12, fontWeight: 500, background: "#F5F3FF", color: "#7C3AED", border: "1px solid #7C3AED", borderRadius: 100, padding: "6px 12px" }}>{t}</span>
            ))}
          </div>

          <p style={{ fontSize: 13, color: "#475569", fontStyle: "italic" }}>"{profile.about}"</p>
        </div>

        {/* Sticky bottom */}
        <div className="sticky bottom-0 bg-white border-t p-4 pb-6" style={{ borderColor: "#E2E8F0" }}>
          <button
            onClick={() => { onClose(); onUnlock(); }}
            style={{ width: "100%", height: 56, borderRadius: 100, background: "linear-gradient(135deg, #7C3AED, #5B21B6)", color: "white", fontSize: 16, fontWeight: 700, border: "none", cursor: "pointer" }}>
            💬 Unlock Chat
          </button>
          <p style={{ fontSize: 11, color: "#94A3B8", textAlign: "center", marginTop: 6 }}>
            Tap to unlock full profile & start chatting
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CHAT THREAD ─────────────────────────────────────────
function ChatThread({ msg, onBack }: { msg: Message; onBack: () => void }) {
  const [text, setText] = useState("");
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
        {[{ from: "them", text: msg.lastMessage, time: msg.time }, { from: "me", text: "Hey! Yes still checking it out 👀", time: "1m ago" }].map((c, i) => (
          <div key={i} className={`flex ${c.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className="px-3 py-2 rounded-2xl max-w-xs text-sm" style={{ background: c.from === "me" ? "#7C3AED" : "white", color: c.from === "me" ? "white" : "#0F172A", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              {c.text}
              <p className="text-xs mt-1" style={{ opacity: 0.6 }}>{c.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 px-4 py-3 border-t" style={{ background: "white", borderColor: "#E2E8F0" }}>
        <input className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none border" style={{ borderColor: "#E2E8F0", background: "#F8FAFC", color: "#0F172A" }}
          placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} />
        <button className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: text ? "#7C3AED" : "#E2E8F0" }}>
          <Send size={16} color={text ? "white" : "#94A3B8"} />
        </button>
      </div>
    </div>
  );
}

// ─── SETTINGS PANEL ───────────────────────────────────────
function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [roomPref, setRoomPref] = useState("any");
  const [lookPref, setLookPref] = useState("any");
  const [minMatch, setMinMatch] = useState(60);
  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: "#F8F7FF" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ background: "white", borderColor: "#E2E8F0" }}>
        <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full" style={{ background: "#F1F5F9" }}>
          <ArrowLeft size={18} color="#64748B" />
        </button>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Match Preferences</h2>
        <button onClick={onClose} className="px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: "#7C3AED" }}>Save</button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">
        {[
          { label: "ROOM SHARING", opts: [["any","Any"],["single","Single"],["2-sharing","2 Sharing"],["3-sharing","3 Sharing"]], val: roomPref, set: setRoomPref, color: "#7C3AED" },
          { label: "LOOKING FOR", opts: [["any","Open to Both"],["same-pg","Same PG Room"],["new-pg","New PG"]], val: lookPref, set: setLookPref, color: "#10B981" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid #E2E8F0" }}>
            <p className="mb-3" style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</p>
            <div className="flex gap-2 flex-wrap">
              {s.opts.map(([val, label]) => (
                <button key={val} onClick={() => s.set(val)} className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
                  style={{ background: s.val === val ? s.color : "white", borderColor: s.val === val ? s.color : "#E2E8F0", color: s.val === val ? "white" : "#64748B" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="rounded-2xl p-4" style={{ background: "white", border: "1px solid #E2E8F0" }}>
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>MINIMUM VIBE MATCH</p>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "#FFF7ED", color: "#D97706", border: "1px solid #FDE68A" }}>{minMatch}%+</span>
          </div>
          <input type="range" min={40} max={95} step={5} value={minMatch} onChange={e => setMinMatch(Number(e.target.value))} className="w-full accent-violet-600" />
          <div className="flex justify-between mt-1">
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>40%</span>
            <span style={{ fontSize: 11, color: "#CBD5E1" }}>95%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MATCH CARD ───────────────────────────────────────────
function MatchCard({ profile, onSkip, onUnlock }: { profile: TenantProfile; onSkip: () => void; onUnlock: () => void }) {
  return (
    <div className="rounded-3xl overflow-hidden flex flex-col" style={{ background: "white", boxShadow: "0 8px 32px rgba(124,58,237,0.12), 0 2px 8px rgba(0,0,0,0.06)", border: "1px solid #EDE9FE" }}>
      {/* Dark top */}
      <div className="relative p-4 flex items-start gap-3" style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #3D3784 100%)", minHeight: 140 }}>
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Avatar initials={profile.avatar} size={72} border="3px solid rgba(255,255,255,0.2)" />
          <RoomStatusBadge roomStatus={profile.roomStatus} lookingFor={profile.lookingFor} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-end mb-1">
            <div style={{ background: "linear-gradient(135deg, #F59E0B, #EF4444)", borderRadius: 100, padding: "6px 12px", boxShadow: "0 2px 8px rgba(245,158,11,0.4)" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{profile.vibeMatch}% 🔥</span>
            </div>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "white", letterSpacing: "-0.3px", lineHeight: 1.2, margin: 0 }}>{profile.name}, {profile.age}</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", margin: "2px 0" }}>{profile.occupation}</p>
          <div className="flex items-center gap-1">
            <MapPin size={11} color="rgba(255,255,255,0.45)" />
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", margin: 0 }}>{profile.pgName}</p>
          </div>
        </div>
        <div className="absolute" style={{ bottom: 12, right: 12 }}><GenderBadge gender={profile.gender} /></div>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Briefcase size={12} color="#94A3B8" />
          <span style={{ fontSize: 12, color: "#64748B" }}>{profile.occupation}</span>
          <span style={{ color: "#CBD5E1" }}>·</span>
          <MapPin size={12} color="#94A3B8" />
          <span style={{ fontSize: 12, color: "#64748B" }}>From {profile.city}</span>
        </div>
        <div>
          {profile.livingStatus === "living"
            ? <span style={{ fontSize: 12, fontWeight: 500, background: "#EFF6FF", color: "#3B82F6", border: "1px solid #BFDBFE", borderRadius: 100, padding: "4px 12px", display: "inline-block" }}>🏠 Living here since {profile.since}</span>
            : <span style={{ fontSize: 12, fontWeight: 500, background: "#FFF7ED", color: "#F59E0B", border: "1px solid #FDE68A", borderRadius: 100, padding: "4px 12px", display: "inline-block" }}>🔍 Looking to move {profile.since}</span>
          }
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.lifestyleTags.map(t => <span key={t} style={{ fontSize: 12, fontWeight: 500, background: "#F0FDFA", color: "#0D9488", border: "1px solid #0D9488", borderRadius: 100, padding: "6px 12px" }}>{t}</span>)}
        </div>
        <div className="flex flex-wrap gap-2">
          {profile.interestTags.map(t => <span key={t} style={{ fontSize: 12, fontWeight: 500, background: "#F5F3FF", color: "#7C3AED", border: "1px solid #7C3AED", borderRadius: 100, padding: "6px 12px" }}>{t}</span>)}
        </div>
        <p style={{ fontSize: 13, color: "#475569", fontStyle: "italic" }}>"{profile.about}"</p>
      </div>

      {/* Actions */}
      <div className="flex border-t" style={{ borderColor: "#F1F5F9" }}>
        <button onClick={onSkip} className="flex-1 flex items-center justify-center gap-2 py-4" style={{ color: "#94A3B8" }}>
          <X size={16} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>Skip</span>
        </button>
        <div style={{ width: 1, background: "#F1F5F9" }} />
        <button onClick={onUnlock} className="flex-1 flex items-center justify-center gap-2 py-4">
          <MessageCircle size={16} color="#7C3AED" />
          <span style={{ fontSize: 14, fontWeight: 700, color: "#7C3AED" }}>Unlock Chat 💬</span>
        </button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────
export default function ConnectHub() {
  const [activeTab, setActiveTab] = useState<"matches" | "messages">("matches");
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showProfile, setShowProfile] = useState<TenantProfile | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [matched, setMatched] = useState<TenantProfile[]>([]);
  const [showMatchBanner, setShowMatchBanner] = useState<TenantProfile | null>(null);
  const [openChat, setOpenChat] = useState<Message | null>(null);
  const [searchMsg, setSearchMsg] = useState("");
  const [filterPG, setFilterPG] = useState("all");

  const currentProfile = PROFILES[currentIdx];
  const totalUnread = MESSAGES.reduce((s, m) => s + m.unread, 0);

  const handleUnlock = () => { setShowPaywall(true); };
  const handleSkip = () => setCurrentIdx(i => i + 1);

  const filteredMessages = MESSAGES.filter(m =>
    m.name.toLowerCase().includes(searchMsg.toLowerCase()) &&
    (filterPG === "all" || m.pgName === filterPG)
  );

  if (openChat) return <div className="flex flex-col" style={{ height: "100dvh" }}><ChatThread msg={openChat} onBack={() => setOpenChat(null)} /></div>;
  if (showSettings) return <SettingsPanel onClose={() => setShowSettings(false)} />;

  return (
    <div className="flex flex-col" style={{ height: "100dvh", background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "white", borderBottom: "1px solid #E2E8F0" }}>
        <div className="flex items-center justify-between px-4 pt-12 pb-3">
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>Connect</h1>
          <div className="flex items-center gap-2">
            {/* Bell */}
            <button onClick={() => setShowNotifs(true)} className="relative flex items-center justify-center rounded-full border" style={{ width: 36, height: 36, borderColor: "#E2E8F0", background: "#F8FAFC" }}>
              <Bell size={15} color="#64748B" />
              <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: "#F0436A", border: "1.5px solid white" }} />
            </button>
            <button onClick={() => setShowSettings(true)} className="flex items-center justify-center rounded-full border" style={{ width: 36, height: 36, borderColor: "#E2E8F0", background: "#F8FAFC" }}>
              <SlidersHorizontal size={15} color="#64748B" />
            </button>
            <button onClick={() => setShowSettings(true)} className="flex items-center justify-center rounded-full border" style={{ width: 36, height: 36, borderColor: "#E2E8F0", background: "#F8FAFC" }}>
              <Settings size={15} color="#64748B" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mx-4 mb-3 p-1 rounded-xl" style={{ background: "#F1F5F9" }}>
          {(["matches", "messages"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all"
              style={{ background: activeTab === tab ? "#7C3AED" : "transparent", color: activeTab === tab ? "white" : "#64748B" }}>
              {tab === "matches" ? <Heart size={14} fill={activeTab === "matches" ? "white" : "none"} /> : <MessageCircle size={14} />}
              <span style={{ fontSize: 13, fontWeight: 600 }}>{tab === "matches" ? "Matches" : "Messages"}</span>
              {tab === "messages" && totalUnread > 0 && (
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: activeTab === "messages" ? "rgba(255,255,255,0.25)" : "#F0436A", fontSize: 10, color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>{totalUnread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Match banner */}
      {showMatchBanner && (
        <div className="mx-4 mt-3 px-4 py-3 rounded-2xl flex items-center gap-3" style={{ background: "linear-gradient(135deg, #7C3AED, #F0436A)", boxShadow: "0 4px 16px rgba(124,58,237,0.3)" }}>
          <span style={{ fontSize: 24 }}>🎉</span>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Connected with {showMatchBanner.name}!</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Say hi in messages →</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "matches" && (
          <div className="px-4 py-4 flex flex-col gap-4">
            {currentProfile
              ? <MatchCard profile={currentProfile} onSkip={handleSkip} onUnlock={handleUnlock} />
              : (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <span style={{ fontSize: 52 }}>🎯</span>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>You've seen everyone!</p>
                  <button onClick={() => setShowSettings(true)} className="px-6 py-3 rounded-full font-semibold text-sm text-white" style={{ background: "#7C3AED" }}>Update Preferences</button>
                </div>
              )
            }
            {matched.length > 0 && (
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Your Matches 🎉 ({matched.length})</p>
                <div className="flex flex-col gap-2">
                  {matched.map(m => (
                    <div key={m.id} className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "white", border: "1px solid #EDE9FE" }}>
                      <Avatar initials={m.avatar} size={40} />
                      <div className="flex-1 min-w-0">
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{m.name}</p>
                        <RoomStatusBadge roomStatus={m.roomStatus} lookingFor={m.lookingFor} />
                      </div>
                      <button onClick={() => setActiveTab("messages")} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex-shrink-0" style={{ background: "#7C3AED" }}>Message</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="px-4 py-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "white", border: "1px solid #E2E8F0" }}>
              <Search size={15} color="#94A3B8" />
              <input className="flex-1 text-sm outline-none bg-transparent" style={{ color: "#0F172A" }} placeholder="Search messages..." value={searchMsg} onChange={e => setSearchMsg(e.target.value)} />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["all", "Sunshine PG", "Green Nest PG", "Sunrise PG"].map(f => (
                <button key={f} onClick={() => setFilterPG(f)} className="px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all flex-shrink-0"
                  style={{ background: filterPG === f ? "#7C3AED" : "white", color: filterPG === f ? "white" : "#64748B", borderColor: filterPG === f ? "#7C3AED" : "#E2E8F0" }}>
                  {f === "all" ? "All PGs" : f}
                </button>
              ))}
            </div>
            {filteredMessages.map(msg => (
              <button key={msg.id} onClick={() => setOpenChat(msg)} className="w-full rounded-2xl p-3 flex items-center gap-3 text-left"
                style={{ background: "white", border: msg.unread > 0 ? "1px solid #EDE9FE" : "1px solid #E2E8F0" }}>
                <div className="relative flex-shrink-0">
                  <Avatar initials={msg.avatar} size={44} />
                  {msg.isOnline && <div className="absolute border-2 border-white rounded-full" style={{ width: 12, height: 12, bottom: 0, right: 0, background: "#10B981" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{msg.name}</p>
                    <p style={{ fontSize: 11, color: "#94A3B8" }}>{msg.time}</p>
                  </div>
                  <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>{msg.pgName}</p>
                  <p className="truncate" style={{ fontSize: 12, marginTop: 2, color: msg.unread > 0 ? "#0F172A" : "#94A3B8", fontWeight: msg.unread > 0 ? 500 : 400 }}>{msg.lastMessage}</p>
                </div>
                {msg.unread > 0 ? (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#7C3AED" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "white" }}>{msg.unread}</span>
                  </div>
                ) : <ChevronRight size={16} color="#CBD5E1" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Overlays */}
      {showNotifs && <MatchRequestsPanel onClose={() => setShowNotifs(false)} onUnlock={() => { setShowNotifs(false); setShowPaywall(true); }} />}
      {showPaywall && <UnlockPaywallSheet onClose={() => setShowPaywall(false)} />}
      {showProfile && <ProfileBottomSheet profile={showProfile} onClose={() => setShowProfile(null)} onUnlock={() => { setShowProfile(null); setShowPaywall(true); }} />}
    </div>
  );
}