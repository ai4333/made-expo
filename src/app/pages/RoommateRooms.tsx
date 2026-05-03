import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  ArrowLeft, MapPin, Star, Users, Bed,
  CheckCircle, Clock, Heart, X,
  ChevronDown, ChevronUp, MessageCircle,
  Lock, Sparkles, Shield, Home
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────
interface Roommate {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  occupation: string;
  from: string;
  initials: string;
  color: string;
  lifestyle: string[];
  interests: string[];
  about: string;
  joinedSince: string;
  vibeMatch: number;
  phone?: string;
}

interface Room {
  id: string;
  number: string;
  type: "Single" | "2-Sharing" | "3-Sharing" | "4-Sharing";
  totalBeds: number;
  occupiedBeds: number;
  price: number;
  amenities: string[];
  floor: string;
  roommates: Roommate[];
  gender: "Male" | "Female" | "Any";
}

interface PGData {
  id: string;
  name: string;
  area: string;
  distance: string;
  rating: number;
  reviewCount: number;
  image: string;
}

// ─── MOCK DATA ─────────────────────────────────────────────
const DEFAULT_PG: PGData = {
  id: "1",
  name: "Sunrise Premium PG",
  area: "Koramangala",
  distance: "1.2 km away",
  rating: 4.5,
  reviewCount: 3,
  image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400",
};

const ROOMS_DATA: Room[] = [
  {
    id: "r1", number: "101", type: "3-Sharing",
    totalBeds: 3, occupiedBeds: 2, price: 8500,
    floor: "1st Floor", gender: "Male",
    amenities: ["AC", "Attached Bath", "WiFi"],
    roommates: [
      {
        id: "m1", name: "Rahul Nair", age: 24, gender: "Male",
        occupation: "Software Engineer", from: "Pune",
        initials: "RN", color: "#7C3AED",
        lifestyle: ["🦉 Night Owl", "🎮 Gamer"],
        interests: ["🎵 Music", "🍕 Foodie"],
        about: "Big into gaming and clean spaces 😄",
        joinedSince: "Jan 2025", vibeMatch: 92,
      },
      {
        id: "m2", name: "Karthik S", age: 25, gender: "Male",
        occupation: "Data Analyst", from: "Chennai",
        initials: "KS", color: "#0D9488",
        lifestyle: ["💼 Professional", "🏋️ Active"],
        interests: ["⚽ Sports", "📚 Reading"],
        about: "Early riser, love morning runs 🏃",
        joinedSince: "Feb 2025", vibeMatch: 78,
      },
    ],
  },
  {
    id: "r2", number: "102", type: "2-Sharing",
    totalBeds: 2, occupiedBeds: 1, price: 11000,
    floor: "1st Floor", gender: "Male",
    amenities: ["AC", "Attached Bath", "WiFi", "Balcony"],
    roommates: [
      {
        id: "m3", name: "Arjun Kumar", age: 23, gender: "Male",
        occupation: "Student (BITS)", from: "Delhi",
        initials: "AK", color: "#EA580C",
        lifestyle: ["🎓 Student", "🏠 Homebody"],
        interests: ["🎬 Movies", "🎵 Music"],
        about: "Chill guy, always up for a jam session 🎸",
        joinedSince: "Mar 2025", vibeMatch: 85,
      },
    ],
  },
  {
    id: "r3", number: "201", type: "4-Sharing",
    totalBeds: 4, occupiedBeds: 2, price: 6500,
    floor: "2nd Floor", gender: "Male",
    amenities: ["Fan", "Common Bath", "WiFi"],
    roommates: [
      {
        id: "m4", name: "Vijay P", age: 26, gender: "Male",
        occupation: "Freelancer", from: "Hyderabad",
        initials: "VP", color: "#16A34A",
        lifestyle: ["🖥️ Freelancer", "🌅 Early Bird"],
        interests: ["💻 Tech", "🍳 Cooking"],
        about: "Work from home, cook on weekends 🍛",
        joinedSince: "Dec 2024", vibeMatch: 71,
      },
      {
        id: "m5", name: "Dev Kumar", age: 22, gender: "Male",
        occupation: "Student (IIM)", from: "Jaipur",
        initials: "DK", color: "#D97706",
        lifestyle: ["🎓 Student", "💼 Hustler"],
        interests: ["📚 Reading", "⚽ Sports"],
        about: "MBA student, loves cricket matches 🏏",
        joinedSince: "Jan 2025", vibeMatch: 68,
      },
    ],
  },
  {
    id: "r4", number: "202", type: "2-Sharing",
    totalBeds: 2, occupiedBeds: 0, price: 11000,
    floor: "2nd Floor", gender: "Male",
    amenities: ["AC", "Attached Bath", "WiFi", "TV"],
    roommates: [],
  },
];

// ─── UTILS ─────────────────────────────────────────────────
const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Single":    { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  "2-Sharing": { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  "3-Sharing": { bg: "#EDE9FE", text: "#7C3AED", border: "#DDD6FE" },
  "4-Sharing": { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
};

// ─── STAR RATING ───────────────────────────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} size={11}
          fill={rating >= s ? "#F59E0B" : "none"}
          color={rating >= s ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </div>
  );
}

// ─── BED SLOTS ─────────────────────────────────────────────
function BedSlots({ total, occupied }: { total: number; occupied: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 36, height: 28,
              background: i < occupied ? "#EDE9FE" : "#F0FDF4",
              border: `2px solid ${i < occupied ? "#C4B5FD" : "#86EFAC"}`,
              transition: "all 0.2s ease",
            }}
          >
            <Bed size={14} color={i < occupied ? "#7C3AED" : "#16A34A"} />
          </div>
          <span style={{
            fontSize: 9, fontWeight: 600,
            color: i < occupied ? "#7C3AED" : "#16A34A",
          }}>
            {i < occupied ? "Taken" : "Free ✓"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── UNLOCK PROFILE MODAL ──────────────────────────────────
function UnlockModal({
  person,
  onClose,
  onUnlocked,
}: {
  person: Roommate;
  onClose: () => void;
  onUnlocked: (person: Roommate) => void;
}) {
  const [step, setStep] = useState<"paywall" | "payment" | "processing" | "done">("paywall");
  const [selectedPlan, setSelectedPlan] = useState<"single" | "premium">("single");

  const handleSelectPlan = (plan: "single" | "premium") => {
    setSelectedPlan(plan);
    setStep("payment");
  };

  const handlePayment = () => {
    setStep("processing");
    setTimeout(() => setStep("done"), 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(4px)" }}
      onClick={step !== "done" && step !== "processing" ? onClose : undefined}
    >
      <div
        className="w-full rounded-t-3xl overflow-hidden"
        style={{ background: "white", maxWidth: 480 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* PAYWALL STEP */}
        {step === "paywall" && (
          <div className="p-6">
            {/* Blurred profile preview */}
            <div
              className="rounded-2xl p-4 mb-5 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #3D3784 0%, #7C3AED 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold border-2 border-white/30"
                  style={{ background: `${person.color}40`, color: "white" }}
                >
                  {person.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{person.name}, {person.age}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {person.occupation}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={11} color="#F59E0B" />
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                      From {person.from}
                    </span>
                  </div>
                </div>
                <div
                  className="ml-auto text-sm font-bold px-3 py-1.5 rounded-full"
                  style={{ background: "#F59E0B", color: "#1C0A00" }}
                >
                  {person.vibeMatch}% 🔥
                </div>
              </div>
              {/* Lock overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl"
                style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
              >
                <div className="text-center">
                  <Lock size={28} color="white" />
                  <p className="text-white font-bold text-sm mt-1">Profile Locked</p>
                </div>
              </div>
            </div>

            {/* What you unlock */}
            <p className="font-bold text-base mb-3" style={{ color: "#0F172A" }}>
              Unlock full profile to start chatting
            </p>
            <div className="flex flex-col gap-2 mb-5">
              {[
                { icon: "📞", text: "Get contact details" },
                { icon: "💬", text: "Start direct chat" },
                { icon: "🏠", text: "Discuss room sharing details" },
                { icon: "✅", text: "Confirm roomie match" },
              ].map(item => (
                <div key={item.text} className="flex items-center gap-3">
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                  <span className="text-sm" style={{ color: "#374151" }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Pricing options */}
            <div className="space-y-3 mb-4">
              {/* Single unlock */}
              <button
                onClick={() => handleSelectPlan("single")}
                className="w-full p-4 rounded-2xl text-left border-2 transition-all"
                style={{
                  background: "#F8F7FF",
                  borderColor: "#DDD6FE",
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm" style={{ color: "#0F172A" }}>
                    Single Unlock
                  </span>
                  <span className="font-black text-lg" style={{ color: "#7C3AED" }}>
                    ₹29
                  </span>
                </div>
                <p className="text-xs" style={{ color: "#64748B" }}>
                  Unlock {person.name.split(" ")[0]}'s profile only
                </p>
              </button>

              {/* Premium plan */}
              <button
                onClick={() => handleSelectPlan("premium")}
                className="w-full p-4 rounded-2xl text-left border-2 transition-all relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)",
                  borderColor: "#7C3AED",
                }}
              >
                <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "#F59E0B", color: "#1C0A00" }}>
                  BEST VALUE 🔥
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm" style={{ color: "#0F172A" }}>
                    Premium Access
                  </span>
                  <div className="text-right">
                    <span className="font-black text-lg" style={{ color: "#7C3AED" }}>
                      ₹199
                    </span>
                    <p className="text-xs" style={{ color: "#7C3AED" }}>/month</p>
                  </div>
                </div>
                <p className="text-xs" style={{ color: "#5B21B6" }}>
                  Unlimited unlocks + priority support
                </p>
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 mt-2 text-sm font-medium"
              style={{ background: "none", border: "none", color: "#94A3B8" }}
            >
              Maybe later
            </button>
          </div>
        )}

        {/* PAYMENT CONFIRMATION STEP */}
        {step === "payment" && (
          <div className="p-6">
            <div className="text-center mb-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background: "#EDE9FE" }}
              >
                <Sparkles size={32} color="#7C3AED" />
              </div>
              <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
                Confirm Purchase
              </h2>
              <p className="text-sm mt-1" style={{ color: "#64748B" }}>
                {selectedPlan === "single" 
                  ? `Unlock ${person.name.split(" ")[0]}'s profile`
                  : "Get Premium Access"}
              </p>
            </div>

            {/* Order summary */}
            <div
              className="p-4 rounded-2xl mb-4"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <div className="flex justify-between py-2">
                <span className="text-sm" style={{ color: "#64748B" }}>
                  {selectedPlan === "single" ? "Single Unlock" : "Premium Monthly"}
                </span>
                <span className="text-sm font-bold" style={{ color: "#0F172A" }}>
                  ₹{selectedPlan === "single" ? "29" : "199"}
                </span>
              </div>
              <div className="flex justify-between py-2" style={{ borderTop: "1px solid #E2E8F0" }}>
                <span className="text-sm font-bold" style={{ color: "#0F172A" }}>Total</span>
                <span className="text-base font-black" style={{ color: "#7C3AED" }}>
                  ₹{selectedPlan === "single" ? "29" : "199"}
                </span>
              </div>
            </div>

            {/* Payment methods */}
            <p className="text-xs font-semibold mb-2" style={{ color: "#94A3B8" }}>
              PAYMENT METHOD
            </p>
            <div className="space-y-2 mb-5">
              {["💳 UPI / Cards", "💰 Wallets", "🏦 Net Banking"].map(method => (
                <button
                  key={method}
                  className="w-full p-3 rounded-xl text-left text-sm font-medium"
                  style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", color: "#0F172A" }}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("paywall")}
                className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
                style={{ background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0" }}
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                className="flex-[2] py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
                  border: "none",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.4)",
                }}
              >
                <Sparkles size={16} />
                Pay ₹{selectedPlan === "single" ? "29" : "199"}
              </button>
            </div>
          </div>
        )}

        {/* PROCESSING STEP */}
        {step === "processing" && (
          <div className="p-6 flex flex-col items-center py-12">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: "#EDE9FE" }}
            >
              <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
              `}</style>
              <div
                className="w-10 h-10 rounded-full border-4"
                style={{
                  borderColor: "#EDE9FE",
                  borderTopColor: "#7C3AED",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            </div>
            <p className="font-bold text-lg" style={{ color: "#0F172A" }}>Processing Payment...</p>
            <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>Please wait</p>
          </div>
        )}

        {/* DONE STEP — THE FIX: Start Chatting button */}
        {step === "done" && (
          <div className="p-6 flex flex-col items-center">
            <style>{`
              @keyframes popIn {
                0% { transform: scale(0); opacity: 0; }
                70% { transform: scale(1.15); }
                100% { transform: scale(1); opacity: 1; }
              }
              @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Success circle */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "#DCFCE7",
                border: "3px solid #86EFAC",
                animation: "popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
              }}
            >
              <CheckCircle size={40} color="#16A34A" />
            </div>

            <p
              className="font-black text-2xl mb-1"
              style={{ color: "#0F172A", animation: "fadeSlideUp 0.4s ease 0.2s both" }}
            >
              Unlocked! 🎉
            </p>
            <p
              className="text-sm text-center mb-2"
              style={{
                color: "#64748B",
                animation: "fadeSlideUp 0.4s ease 0.3s both",
              }}
            >
              You can now chat with {person.name.split(" ")[0]} directly
            </p>

            {/* Person preview — now fully unlocked */}
            <div
              className="w-full rounded-2xl p-3 mb-5 flex items-center gap-3"
              style={{
                background: "#F8F7FF",
                border: "1.5px solid #EDE9FE",
                animation: "fadeSlideUp 0.4s ease 0.35s both",
              }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                style={{ background: `${person.color}20`, color: person.color }}
              >
                {person.initials}
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: "#0F172A" }}>
                  {person.name}
                </p>
                <p className="text-xs" style={{ color: "#64748B" }}>
                  {person.occupation} · {person.from}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {person.lifestyle.slice(0, 2).map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "#EDE9FE", color: "#7C3AED" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="text-xs font-bold px-2.5 py-1.5 rounded-full flex-shrink-0"
                style={{ background: "#EDE9FE", color: "#7C3AED" }}
              >
                {person.vibeMatch}% 🔥
              </div>
            </div>

            {/* ── THE MISSING BUTTON — START CHATTING ── */}
            <button
              onClick={() => onUnlocked(person)}
              className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2 mb-3"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
                border: "none",
                boxShadow: "0 6px 20px rgba(124,58,237,0.4)",
                animation: "fadeSlideUp 0.4s ease 0.4s both",
              }}
            >
              <MessageCircle size={20} fill="white" />
              Start Chatting with {person.name.split(" ")[0]}
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl text-sm font-medium"
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                color: "#64748B",
                animation: "fadeSlideUp 0.4s ease 0.45s both",
              }}
            >
              Chat later
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOMMATE EXPANDED CARD ────────────────────────────────
function RoommateCard({
  person,
  onUnlock,
  isUnlocked,
}: {
  person: Roommate;
  onUnlock: (p: Roommate) => void;
  isUnlocked: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "white",
        border: isUnlocked ? "1.5px solid #C4B5FD" : "1px solid #EDE9FE",
        boxShadow: isUnlocked
          ? "0 4px 12px rgba(124,58,237,0.12)"
          : "0 2px 6px rgba(124,58,237,0.06)",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 text-left"
        style={{ background: "none", border: "none" }}
      >
        {/* Avatar with unlocked indicator */}
        <div className="relative flex-shrink-0">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: `${person.color}15`, color: person.color }}
          >
            {person.initials}
          </div>
          {isUnlocked && (
            <div
              className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "#DCFCE7", border: "1.5px solid white" }}
            >
              <CheckCircle size={10} color="#16A34A" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>
              {person.name}, {person.age}
            </span>
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: "#EFF6FF", color: "#2563EB" }}
            >
              {person.gender}
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: "#64748B" }}>
            {person.occupation} · From {person.from}
          </p>
        </div>

        {/* Vibe % + chevron */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{
              background: person.vibeMatch >= 85
                ? "#EDE9FE"
                : person.vibeMatch >= 70
                ? "#F0FDF4"
                : "#F8FAFC",
              color: person.vibeMatch >= 85
                ? "#7C3AED"
                : person.vibeMatch >= 70
                ? "#16A34A"
                : "#64748B",
            }}
          >
            {person.vibeMatch}% 🔥
          </div>
          {expanded
            ? <ChevronUp size={15} color="#94A3B8" />
            : <ChevronDown size={15} color="#94A3B8" />
          }
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-3 pb-3" style={{ borderTop: "1px solid #F1F5F9" }}>
          <div className="flex items-center gap-1 mb-2 pt-2">
            <Clock size={11} color="#94A3B8" />
            <span className="text-xs" style={{ color: "#94A3B8" }}>
              Living here since {person.joinedSince}
            </span>
          </div>

          {/* Lifestyle */}
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {person.lifestyle.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "#F5F3FF", color: "#7C3AED", border: "1px solid #DDD6FE" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {person.interests.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* About */}
          <p className="text-xs italic mb-3" style={{ color: "#64748B" }}>
            "{person.about}"
          </p>

          {/* Unlock / Chat button */}
          {isUnlocked ? (
            <button
              onClick={() => onUnlock(person)}
              className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
                color: "white", border: "none",
              }}
            >
              <MessageCircle size={15} />
              Continue Chatting
            </button>
          ) : (
            <button
              onClick={() => onUnlock(person)}
              className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
              style={{
                background: "#EDE9FE", color: "#7C3AED",
                border: "1.5px solid #DDD6FE",
              }}
            >
              <Lock size={14} />
              Unlock Chat
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── BED AVAILABILITY VISUAL ───────────────────────────────
function BedAvailabilityRow({ total, occupied }: { total: number; occupied: number }) {
  return (
    <div>
      <p className="text-xs font-medium mb-2" style={{ color: "#64748B" }}>
        Bed availability
      </p>
      <BedSlots total={total} occupied={occupied} />
    </div>
  );
}

// ─── ROOM CARD ─────────────────────────────────────────────
function RoomCard({
  room,
  onBeRoomie,
  onUnlockPerson,
  unlockedPersons,
  requested,
}: {
  room: Room;
  onBeRoomie: (r: Room) => void;
  onUnlockPerson: (p: Roommate) => void;
  unlockedPersons: string[];
  requested: boolean;
}) {
  const [showRoommates, setShowRoommates] = useState(false);
  const available = room.totalBeds - room.occupiedBeds;
  const isEmpty = room.occupiedBeds === 0;
  const tc = TYPE_COLORS[room.type];

  return (
    <div
      className="rounded-3xl overflow-hidden mb-4"
      style={{
        background: "white",
        border: available > 0 ? "1.5px solid #EDE9FE" : "1.5px solid #F1F5F9",
        boxShadow: available > 0
          ? "0 6px 24px rgba(124,58,237,0.1)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.2s ease",
      }}
    >
      {/* Room header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: tc.bg, color: tc.text }}
            >
              {room.number}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-base" style={{ color: "#0F172A" }}>
                  Room {room.number}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                >
                  {room.type}
                </span>
                {requested && (
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"
                    style={{ background: "#DCFCE7", color: "#16A34A", border: "1px solid #BBF7D0" }}
                  >
                    <CheckCircle size={10} />
                    Requested
                  </span>
                )}
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                {room.floor} · {room.gender} Only
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0">
            <p className="font-bold text-lg" style={{ color: "#7C3AED" }}>
              ₹{room.price.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: "#94A3B8" }}>/month</p>
          </div>
        </div>

        {/* Bed slots */}
        <BedAvailabilityRow total={room.totalBeds} occupied={room.occupiedBeds} />

        {/* Status + amenities */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {available > 0 ? (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{ background: "#DCFCE7", color: "#16A34A" }}
            >
              <span style={{ fontSize: 8 }}>●</span>
              {available} bed{available > 1 ? "s" : ""} available
            </span>
          ) : (
            <span
              className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: "#FEE2E2", color: "#DC2626" }}
            >
              Full
            </span>
          )}
          {room.amenities.slice(0, 3).map(a => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full"
              style={{ background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0" }}
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Roommates section */}
      {!isEmpty && (
        <>
          <div className="mx-4" style={{ height: 1, background: "#F8F7FF" }} />
          <div className="px-4 py-3">
            <button
              onClick={() => setShowRoommates(!showRoommates)}
              className="w-full flex items-center justify-between mb-0"
              style={{ background: "none", border: "none" }}
            >
              <div className="flex items-center gap-2">
                <Users size={14} color="#7C3AED" />
                <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>
                  {room.occupiedBeds} Roommate{room.occupiedBeds > 1 ? "s" : ""} inside
                </span>
                {/* Avatar stack */}
                <div className="flex">
                  {room.roommates.map((rm, i) => (
                    <div
                      key={rm.id}
                      className="w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-white"
                      style={{
                        background: `${rm.color}20`, color: rm.color,
                        marginLeft: i > 0 ? -8 : 0, fontSize: 9,
                      }}
                    >
                      {rm.initials}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold" style={{ color: "#7C3AED" }}>
                  {showRoommates ? "Hide" : "Meet them"}
                </span>
                {showRoommates
                  ? <ChevronUp size={14} color="#7C3AED" />
                  : <ChevronDown size={14} color="#7C3AED" />
                }
              </div>
            </button>

            {showRoommates && (
              <div className="mt-3 flex flex-col gap-2.5">
                {room.roommates.map(person => (
                  <RoommateCard
                    key={person.id}
                    person={person}
                    onUnlock={onUnlockPerson}
                    isUnlocked={unlockedPersons.includes(person.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Empty room notice */}
      {isEmpty && (
        <>
          <div className="mx-4" style={{ height: 1, background: "#F8F7FF" }} />
          <div
            className="mx-4 my-3 p-3 rounded-2xl flex items-center gap-2"
            style={{ background: "#F8FAFC", border: "1px dashed #E2E8F0" }}
          >
            <Home size={16} color="#CBD5E1" />
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              No roommates yet — be the first! 🏠
            </p>
          </div>
        </>
      )}

      {/* Be Roomie CTA */}
      {available > 0 && (
        <div className="px-4 pb-4 pt-1">
          <button
            onClick={() => onBeRoomie(room)}
            disabled={requested}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
            style={{
              background: requested
                ? "#F0FDF4"
                : "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: requested ? "#16A34A" : "white",
              border: requested ? "1.5px solid #BBF7D0" : "none",
              boxShadow: requested ? "none" : "0 4px 16px rgba(124,58,237,0.35)",
              cursor: requested ? "default" : "pointer",
            }}
          >
            {requested ? (
              <><CheckCircle size={16} /> Request Sent · Awaiting Confirmation</>
            ) : (
              <><Heart size={16} fill="white" /> Be Roomie · {available} spot{available > 1 ? "s" : ""} left</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

// ─── BE ROOMIE CONFIRM MODAL ───────────────────────────────
function BeRoomieModal({
  room, pg, onClose, onConfirm,
}: {
  room: Room; pg: PGData; onClose: () => void; onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-3xl p-6"
        style={{ background: "white", maxWidth: 480 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-5">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="text-center mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "#EDE9FE" }}
          >
            <span style={{ fontSize: 32 }}>🏠</span>
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
            Join Room {room.number}?
          </h2>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            {pg.name} · {room.type}
          </p>
        </div>

        {/* Details */}
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
        >
          {[
            { label: "Room", value: `Room ${room.number} · ${room.floor}` },
            { label: "Type", value: room.type },
            { label: "Rent", value: `₹${room.price.toLocaleString()}/month` },
            { label: "Available", value: `${room.totalBeds - room.occupiedBeds} bed(s)` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1.5"
              style={{ borderBottom: "1px solid #F1F5F9" }}>
              <span className="text-sm" style={{ color: "#64748B" }}>{label}</span>
              <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Future roommates preview */}
        {room.roommates.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold mb-2" style={{ color: "#94A3B8" }}>
              YOUR FUTURE ROOMMATES
            </p>
            <div className="flex gap-3">
              {room.roommates.map(rm => (
                <div key={rm.id} className="flex flex-col items-center gap-1">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: `${rm.color}20`, color: rm.color }}
                  >
                    {rm.initials}
                  </div>
                  <span className="text-xs" style={{ color: "#64748B" }}>
                    {rm.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-center mb-4" style={{ color: "#94A3B8" }}>
          The PG owner will be notified. You can visit the PG before confirming.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
            style={{ background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0" }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-[2] py-3.5 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              border: "none",
              boxShadow: "0 4px 14px rgba(124,58,237,0.3)",
            }}
          >
            <Heart size={16} fill="white" />
            Send Roomie Request
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SUCCESS TOAST ─────────────────────────────────────────
function Toast({ message, sub, onDismiss }: { message: string; sub: string; onDismiss: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-50 p-4 rounded-2xl flex items-center gap-3"
      style={{
        background: "#0F172A",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
        animation: "slideUpToast 0.35s ease forwards",
      }}
    >
      <style>{`
        @keyframes slideUpToast {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "#DCFCE7" }}
      >
        <CheckCircle size={20} color="#16A34A" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm text-white">{message}</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{sub}</p>
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none" }}>
        <X size={18} color="rgba(255,255,255,0.45)" />
      </button>
    </div>
  );
}

// ─── MAIN SCREEN ───────────────────────────────────────────
export function RoommateRooms() {
  const navigate = useNavigate();
  const location = useLocation();
  const pg: PGData = location.state?.pg ?? DEFAULT_PG;

  const [filter, setFilter] = useState<"available" | "all">("available");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [unlockPerson, setUnlockPerson] = useState<Roommate | null>(null);
  const [requestedRooms, setRequestedRooms] = useState<string[]>([]);
  const [unlockedPersons, setUnlockedPersons] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; sub: string } | null>(null);

  const filtered = ROOMS_DATA.filter(r => r.occupiedBeds < r.totalBeds);

  const availableCount = ROOMS_DATA.filter(r => r.occupiedBeds < r.totalBeds).length;
  const totalFreeBeds = ROOMS_DATA.reduce((s, r) => s + (r.totalBeds - r.occupiedBeds), 0);

  const handleBeRoomie = (room: Room) => {
    setRequestedRooms(p => [...p, room.id]);
    setSelectedRoom(null);
    setToast({
      message: "Roomie Request Sent! 🎉",
      sub: `Room ${room.number} · Owner will confirm shortly`,
    });
  };

  // ── THE FIX: After unlock → navigate to chat ──
  const handleUnlocked = (person: Roommate) => {
    setUnlockedPersons(p => [...p, person.id]);
    setUnlockPerson(null);
    navigate("/tenant/chat", {
      state: {
        person: {
          id: person.id,
          name: person.name,
          initials: person.initials,
          color: person.color,
          occupation: person.occupation,
          vibeMatch: person.vibeMatch,
        },
        pg,
      },
    });
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>

      {/* ── HEADER ── */}
      <div
        className="px-4 pt-12 pb-5"
        style={{ background: "linear-gradient(135deg, #3D3784 0%, #7C3AED 100%)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)", border: "none" }}
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg text-white leading-tight">
              Find Your Roommates
            </h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} color="#F59E0B" />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                {pg.name} · {pg.area}
              </span>
            </div>
          </div>
        </div>

        {/* PG mini card */}
        <div
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 52, height: 52 }}>
            <img src={pg.image} alt={pg.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white truncate">{pg.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Stars rating={pg.rating} />
              <span className="text-xs font-medium text-white">{pg.rating}</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
                {pg.distance}
              </span>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-black text-white text-xl leading-none">{totalFreeBeds}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>
              beds free
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-28">

        {/* ── FILTER TABS ── */}
        <div className="flex items-center px-0 pt-0 mb-4">
          <span className="bg-purple-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full"
            style={{ background: "#7C3AED", color: "white" }}>
            Available ({availableCount})
          </span>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div
          className="p-3 rounded-2xl mb-4 flex gap-2.5 items-start"
          style={{ background: "#EDE9FE", border: "1px solid #DDD6FE" }}
        >
          <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</span>
          <div>
            <p className="text-xs font-bold" style={{ color: "#5B21B6" }}>
              How Roomie Request works
            </p>
            <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#7C3AED" }}>
              See who's in the room → tap "Meet them" → unlock chat → 
              "Be Roomie" → owner confirms → move in!
            </p>
          </div>
        </div>

        {/* ── ROOM CARDS ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span style={{ fontSize: 52 }}>🏠</span>
            <p className="font-bold mt-3 text-lg" style={{ color: "#0F172A" }}>
              No rooms available
            </p>
            <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
              All rooms are currently full
            </p>
          </div>
        ) : (
          filtered.map(room => (
            <RoomCard
              key={room.id}
              room={room}
              onBeRoomie={setSelectedRoom}
              onUnlockPerson={setUnlockPerson}
              unlockedPersons={unlockedPersons}
              requested={requestedRooms.includes(room.id)}
            />
          ))
        )}

        {/* ── SCHEDULE VISIT CTA ── */}
        <div
          className="p-4 rounded-3xl text-center mt-2"
          style={{
            background: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
            border: "1.5px solid #DDD6FE",
          }}
        >
          <Shield size={22} color="#7C3AED" style={{ margin: "0 auto 8px" }} />
          <p className="font-bold" style={{ color: "#0F172A" }}>
            Want to see the PG first?
          </p>
          <p className="text-sm mt-1 mb-3" style={{ color: "#64748B" }}>
            Schedule a free visit before sending a roomie request
          </p>
          <button
            onClick={() => navigate(`/pg/${pg.id}/schedule`)}
            className="px-6 py-3 rounded-2xl font-semibold text-sm text-white"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              border: "none",
              boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
            }}
          >
            Schedule a Visit →
          </button>
        </div>
      </div>

      {/* ── MODALS & TOASTS ── */}
      {selectedRoom && (
        <BeRoomieModal
          room={selectedRoom}
          pg={pg}
          onClose={() => setSelectedRoom(null)}
          onConfirm={() => handleBeRoomie(selectedRoom)}
        />
      )}

      {unlockPerson && (
        <UnlockModal
          person={unlockPerson}
          onClose={() => setUnlockPerson(null)}
          onUnlocked={handleUnlocked}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          sub={toast.sub}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}