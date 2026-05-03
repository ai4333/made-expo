import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft, MapPin, Star, Users, Bed,
  CheckCircle, Clock, Heart, X,
  ChevronDown, ChevronUp, Filter
} from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────
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

// ─── MOCK DATA ────────────────────────────────────────────
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
    id: "r1",
    number: "101",
    type: "3-Sharing",
    totalBeds: 3,
    occupiedBeds: 2,
    price: 8500,
    floor: "1st Floor",
    gender: "Male",
    amenities: ["AC", "Attached Bath", "WiFi"],
    roommates: [
      {
        id: "m1",
        name: "Rahul Nair",
        age: 24,
        gender: "Male",
        occupation: "Software Engineer",
        from: "Pune",
        initials: "RN",
        color: "#7C3AED",
        lifestyle: ["🦉 Night Owl", "🎮 Gamer"],
        interests: ["🎵 Music", "🍕 Foodie"],
        about: "Big into gaming and clean spaces 😄",
        joinedSince: "Jan 2025",
        vibeMatch: 92,
      },
      {
        id: "m2",
        name: "Karthik S",
        age: 25,
        gender: "Male",
        occupation: "Data Analyst",
        from: "Chennai",
        initials: "KS",
        color: "#0D9488",
        lifestyle: ["💼 Professional", "🏋️ Active"],
        interests: ["⚽ Sports", "📚 Reading"],
        about: "Early riser, love morning runs 🏃",
        joinedSince: "Feb 2025",
        vibeMatch: 78,
      },
    ],
  },
  {
    id: "r2",
    number: "102",
    type: "2-Sharing",
    totalBeds: 2,
    occupiedBeds: 1,
    price: 11000,
    floor: "1st Floor",
    gender: "Male",
    amenities: ["AC", "Attached Bath", "WiFi", "Balcony"],
    roommates: [
      {
        id: "m3",
        name: "Arjun Kumar",
        age: 23,
        gender: "Male",
        occupation: "Student (BITS)",
        from: "Delhi",
        initials: "AK",
        color: "#EA580C",
        lifestyle: ["🎓 Student", "🏠 Homebody"],
        interests: ["🎬 Movies", "🎵 Music"],
        about: "Chill guy, always up for a jam session 🎸",
        joinedSince: "Mar 2025",
        vibeMatch: 85,
      },
    ],
  },
  {
    id: "r3",
    number: "201",
    type: "4-Sharing",
    totalBeds: 4,
    occupiedBeds: 2,
    price: 6500,
    floor: "2nd Floor",
    gender: "Male",
    amenities: ["Fan", "Common Bath", "WiFi"],
    roommates: [
      {
        id: "m4",
        name: "Vijay P",
        age: 26,
        gender: "Male",
        occupation: "Freelancer",
        from: "Hyderabad",
        initials: "VP",
        color: "#16A34A",
        lifestyle: ["🖥️ Freelancer", "🌅 Early Bird"],
        interests: ["💻 Tech", "🍳 Cooking"],
        about: "Work from home, cook on weekends 🍛",
        joinedSince: "Dec 2024",
        vibeMatch: 71,
      },
      {
        id: "m5",
        name: "Dev Kumar",
        age: 22,
        gender: "Male",
        occupation: "Student (IIM)",
        from: "Jaipur",
        initials: "DK",
        color: "#D97706",
        lifestyle: ["🎓 Student", "💼 Hustler"],
        interests: ["📚 Reading", "⚽ Sports"],
        about: "MBA student, loves cricket matches 🏏",
        joinedSince: "Jan 2025",
        vibeMatch: 68,
      },
    ],
  },
  {
    id: "r4",
    number: "202",
    type: "2-Sharing",
    totalBeds: 2,
    occupiedBeds: 0,
    price: 11000,
    floor: "2nd Floor",
    gender: "Male",
    amenities: ["AC", "Attached Bath", "WiFi", "TV"],
    roommates: [],
  },
];

// ─── ROOMMATE MINI CARD ───────────────────────────────────
function RoommateMiniCard({ person, vibeMatch }: { person: Roommate; vibeMatch: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: "white",
        border: "1px solid #EDE9FE",
        boxShadow: "0 2px 8px rgba(124,58,237,0.06)",
      }}
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 p-3 text-left"
        style={{ background: "none", border: "none" }}
      >
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: `${person.color}20`, color: person.color }}
        >
          {person.initials}
        </div>

        {/* Name + occupation */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>
              {person.name}, {person.age}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "#EFF6FF", color: "#2563EB" }}
            >
              {person.gender}
            </span>
          </div>
          <p className="text-xs mt-0.5 truncate" style={{ color: "#64748B" }}>
            {person.occupation} · From {person.from}
          </p>
        </div>

        {/* Vibe match + expand */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="text-xs font-bold px-2 py-1 rounded-full"
            style={{
              background: vibeMatch >= 85 ? "#EDE9FE" : vibeMatch >= 70 ? "#F0FDF4" : "#F8FAFC",
              color: vibeMatch >= 85 ? "#7C3AED" : vibeMatch >= 70 ? "#16A34A" : "#64748B",
            }}
          >
            {vibeMatch}% 🔥
          </div>
          {expanded
            ? <ChevronUp size={16} color="#94A3B8" />
            : <ChevronDown size={16} color="#94A3B8" />
          }
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div
          className="px-3 pb-3 pt-0"
          style={{ borderTop: "1px solid #F1F5F9" }}
        >
          {/* Since when */}
          <div className="flex items-center gap-1 mb-2 pt-2">
            <Clock size={12} color="#94A3B8" />
            <span className="text-xs" style={{ color: "#94A3B8" }}>
              Living here since {person.joinedSince}
            </span>
          </div>

          {/* Lifestyle tags */}
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {person.lifestyle.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border font-medium"
                style={{ borderColor: "#DDD6FE", color: "#7C3AED", background: "#F5F3FF" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Interest tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {person.interests.map(tag => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border"
                style={{ borderColor: "#BBF7D0", color: "#16A34A", background: "#F0FDF4" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* About */}
          <p
            className="text-xs italic"
            style={{ color: "#64748B" }}
          >
            "{person.about}"
          </p>
        </div>
      )}
    </div>
  );
}

// ─── BED SLOT VISUAL ─────────────────────────────────────
function BedSlots({ total, occupied }: { total: number; occupied: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1"
        >
          <div
            className="rounded-lg flex items-center justify-center"
            style={{
              width: 32, height: 24,
              background: i < occupied ? "#EDE9FE" : "#F1F5F9",
              border: `1.5px solid ${i < occupied ? "#DDD6FE" : "#E2E8F0"}`,
            }}
          >
            <Bed size={12} color={i < occupied ? "#7C3AED" : "#CBD5E1"} />
          </div>
          <span
            className="text-xs"
            style={{
              color: i < occupied ? "#7C3AED" : "#10B981",
              fontWeight: i >= occupied ? "600" : "400",
              fontSize: 9,
            }}
          >
            {i < occupied ? "Taken" : "Free ✓"}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── ROOM CARD ────────────────────────────────────────────
function RoomCard({ room, onBeRoomie }: {
  room: Room;
  onBeRoomie: (room: Room) => void;
}) {
  const [showRoommates, setShowRoommates] = useState(false);
  const availableBeds = room.totalBeds - room.occupiedBeds;
  const isFullyEmpty = room.occupiedBeds === 0;

  const typeColor = {
    "Single": { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
    "2-Sharing": { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
    "3-Sharing": { bg: "#EDE9FE", text: "#7C3AED", border: "#DDD6FE" },
    "4-Sharing": { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
  }[room.type];

  return (
    <div
      className="rounded-3xl overflow-hidden mb-4"
      style={{
        background: "white",
        border: availableBeds > 0 ? "1.5px solid #EDE9FE" : "1.5px solid #E2E8F0",
        boxShadow: availableBeds > 0
          ? "0 4px 20px rgba(124,58,237,0.08)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Room Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm"
              style={{ background: typeColor.bg, color: typeColor.text }}
            >
              {room.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base" style={{ color: "#0F172A" }}>
                  Room {room.number}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: typeColor.bg,
                    color: typeColor.text,
                    border: `1px solid ${typeColor.border}`,
                  }}
                >
                  {room.type}
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                {room.floor} · {room.gender} Only
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold text-base" style={{ color: "#7C3AED" }}>
              ₹{room.price.toLocaleString()}
            </p>
            <p className="text-xs" style={{ color: "#94A3B8" }}>/month</p>
          </div>
        </div>

        {/* Bed slots visual */}
        <div className="mt-3">
          <p className="text-xs font-medium mb-2" style={{ color: "#64748B" }}>
            Bed availability
          </p>
          <BedSlots total={room.totalBeds} occupied={room.occupiedBeds} />
        </div>

        {/* Availability badge */}
        <div className="flex items-center gap-2 mt-3">
          {availableBeds > 0 ? (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "#DCFCE7" }}
            >
              <span style={{ fontSize: 8, color: "#16A34A" }}>●</span>
              <span className="text-xs font-semibold" style={{ color: "#16A34A" }}>
                {availableBeds} bed{availableBeds > 1 ? "s" : ""} available
              </span>
            </div>
          ) : (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: "#FEE2E2" }}
            >
              <span style={{ fontSize: 8, color: "#DC2626" }}>●</span>
              <span className="text-xs font-semibold" style={{ color: "#DC2626" }}>
                Full
              </span>
            </div>
          )}

          {/* Amenities */}
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

      {/* Roommates Section */}
      {!isFullyEmpty && (
        <>
          <div
            className="mx-4"
            style={{ height: 1, background: "#F1F5F9" }}
          />
          <div className="px-4 py-3">
            <button
              onClick={() => setShowRoommates(!showRoommates)}
              className="w-full flex items-center justify-between"
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
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white"
                      style={{
                        background: `${rm.color}20`,
                        color: rm.color,
                        marginLeft: i > 0 ? -8 : 0,
                        fontSize: 9,
                      }}
                    >
                      {rm.initials}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium" style={{ color: "#7C3AED" }}>
                  {showRoommates ? "Hide" : "Meet them"}
                </span>
                {showRoommates
                  ? <ChevronUp size={14} color="#7C3AED" />
                  : <ChevronDown size={14} color="#7C3AED" />
                }
              </div>
            </button>

            {/* Expanded roommate cards */}
            {showRoommates && (
              <div className="mt-3 flex flex-col gap-2">
                {room.roommates.map(person => (
                  <RoommateMiniCard
                    key={person.id}
                    person={person}
                    vibeMatch={person.vibeMatch}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Fully empty room */}
      {isFullyEmpty && (
        <>
          <div className="mx-4" style={{ height: 1, background: "#F1F5F9" }} />
          <div
            className="mx-4 my-3 p-3 rounded-2xl flex items-center gap-2"
            style={{ background: "#F8FAFC", border: "1px dashed #E2E8F0" }}
          >
            <Users size={16} color="#CBD5E1" />
            <p className="text-sm" style={{ color: "#94A3B8" }}>
              No roommates yet — be the first! 🏠
            </p>
          </div>
        </>
      )}

      {/* CTA — Be Roomie */}
      {availableBeds > 0 && (
        <div className="px-4 pb-4 pt-1">
          <button
            onClick={() => onBeRoomie(room)}
            className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
              color: "white",
              border: "none",
              boxShadow: "0 4px 14px rgba(124,58,237,0.35)",
            }}
          >
            <Heart size={16} fill="white" />
            Be Roomie · {availableBeds} spot{availableBeds > 1 ? "s" : ""} left
          </button>
        </div>
      )}
    </div>
  );
}

// ─── BE ROOMIE MODAL ──────────────────────────────────────
function BeRoomieModal({ room, pg, onClose, onConfirm }: {
  room: Room;
  pg: PGData;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-t-3xl p-6"
        style={{ background: "white", maxWidth: 480 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center mb-5">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3"
            style={{ background: "#EDE9FE" }}
          >
            <span style={{ fontSize: 32 }}>🏠</span>
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>
            Request to Join Room {room.number}
          </h2>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            {pg.name} · {room.type}
          </p>
        </div>

        {/* Room details */}
        <div
          className="p-4 rounded-2xl mb-5"
          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
        >
          {[
            { label: "Room", value: `Room ${room.number} · ${room.floor}` },
            { label: "Type", value: room.type },
            { label: "Rent", value: `₹${room.price.toLocaleString()}/month` },
            { label: "Available beds", value: `${room.totalBeds - room.occupiedBeds}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1.5">
              <span className="text-sm" style={{ color: "#64748B" }}>{label}</span>
              <span className="text-sm font-semibold" style={{ color: "#0F172A" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Current roommates */}
        {room.roommates.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-semibold mb-2" style={{ color: "#64748B" }}>
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

        <p className="text-xs text-center mb-5" style={{ color: "#94A3B8" }}>
          The PG owner will be notified and will confirm your booking.
          You can visit the PG before confirming.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl font-semibold text-sm"
            style={{
              background: "#F8FAFC", color: "#64748B",
              border: "1px solid #E2E8F0",
            }}
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

// ─── SUCCESS TOAST ────────────────────────────────────────
function SuccessToast({ room, onDismiss }: { room: Room; onDismiss: () => void }) {
  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-50 p-4 rounded-2xl flex items-center gap-3"
      style={{
        background: "#0F172A",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        animation: "slideUp 0.3s ease",
      }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
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
        <p className="font-bold text-sm text-white">Roomie Request Sent! 🎉</p>
        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
          Room {room.number} · Owner will confirm shortly
        </p>
      </div>
      <button onClick={onDismiss} style={{ background: "none", border: "none" }}>
        <X size={18} color="rgba(255,255,255,0.5)" />
      </button>
    </div>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function RoommateRooms() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get PG data from route state (passed from Home.tsx)
  const pg: PGData = location.state?.pg ?? DEFAULT_PG;

  const [activeFilter, setActiveFilter] = useState<"all" | "available">("available");
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [toast, setToast] = useState<Room | null>(null);
  const [requestedRooms, setRequestedRooms] = useState<string[]>([]);

  const filtered = ROOMS_DATA.filter(r => {
    if (activeFilter === "available") return r.occupiedBeds < r.totalBeds;
    return true;
  });

  const availableCount = ROOMS_DATA.filter(r => r.occupiedBeds < r.totalBeds).length;
  const totalAvailableBeds = ROOMS_DATA.reduce(
    (sum, r) => sum + (r.totalBeds - r.occupiedBeds), 0
  );

  const handleConfirmRoomie = (room: Room) => {
    setRequestedRooms(prev => [...prev, room.id]);
    setSelectedRoom(null);
    setToast(room);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F7FF" }}>

      {/* ── HEADER ── */}
      <div
        className="px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #3D3784 0%, #7C3AED 100%)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", border: "none" }}
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg text-white">Find Your Roommates</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} color="#F59E0B" />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                {pg.name} · {pg.area}
              </span>
            </div>
          </div>
        </div>

        {/* PG Mini Info Card */}
        <div
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{ background: "rgba(255,255,255,0.12)" }}
        >
          <div
            className="rounded-xl overflow-hidden flex-shrink-0"
            style={{ width: 52, height: 52 }}
          >
            <img src={pg.image} alt={pg.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-white">{pg.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1">
                <Star size={11} fill="#F59E0B" color="#F59E0B" />
                <span className="text-xs text-white font-medium">{pg.rating}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
                  ({pg.reviewCount})
                </span>
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                {pg.distance}
              </span>
            </div>
          </div>
          {/* Availability summary */}
          <div className="text-right flex-shrink-0">
            <p className="font-bold text-white text-base">{totalAvailableBeds}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>beds free</p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 pb-28">

        {/* ── FILTER TABS ── */}
        <div
          className="flex gap-2 p-1 rounded-2xl mb-5"
          style={{ background: "white", border: "1px solid #E2E8F0" }}
        >
          {([
            { id: "available", label: `Available (${availableCount})` },
            { id: "all", label: `All Rooms (${ROOMS_DATA.length})` },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: activeFilter === tab.id ? "#7C3AED" : "transparent",
                color: activeFilter === tab.id ? "white" : "#64748B",
                border: "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── HOW IT WORKS BANNER ── */}
        <div
          className="p-3 rounded-2xl mb-5 flex gap-3 items-start"
          style={{ background: "#EDE9FE", border: "1px solid #DDD6FE" }}
        >
          <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
          <div>
            <p className="text-xs font-semibold" style={{ color: "#5B21B6" }}>
              How Roomie Request works
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#7C3AED" }}>
              See who's already in the room → tap "Be Roomie" → 
              owner confirms → schedule a visit → move in!
            </p>
          </div>
        </div>

        {/* ── ROOM CARDS ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <span style={{ fontSize: 48 }}>🏠</span>
            <p className="font-bold mt-3" style={{ color: "#0F172A" }}>No rooms available</p>
            <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
              All rooms are currently full. Check back later!
            </p>
          </div>
        ) : (
          filtered.map(room => (
            <div key={room.id} className="relative">
              {/* Already requested badge */}
              {requestedRooms.includes(room.id) && (
                <div
                  className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: "#DCFCE7", border: "1px solid #BBF7D0" }}
                >
                  <CheckCircle size={12} color="#16A34A" />
                  <span className="text-xs font-semibold" style={{ color: "#16A34A" }}>
                    Requested
                  </span>
                </div>
              )}
              <RoomCard
                room={room}
                onBeRoomie={setSelectedRoom}
              />
            </div>
          ))
        )}

        {/* ── SCHEDULE VISIT CTA ── */}
        <div
          className="p-4 rounded-3xl text-center"
          style={{
            background: "linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 100%)",
            border: "1px solid #DDD6FE",
          }}
        >
          <p className="font-bold" style={{ color: "#0F172A" }}>
            Want to see the PG first? 🏠
          </p>
          <p className="text-sm mt-1 mb-3" style={{ color: "#64748B" }}>
            Schedule a visit before sending a roomie request
          </p>
          <button
            onClick={() => navigate("/tenant/visit-scheduling")}
            className="px-6 py-3 rounded-2xl font-semibold text-sm"
            style={{
              background: "#7C3AED", color: "white",
              border: "none",
              boxShadow: "0 4px 12px rgba(124,58,237,0.3)",
            }}
          >
            Schedule a Visit →
          </button>
        </div>
      </div>

      {/* ── BE ROOMIE MODAL ── */}
      {selectedRoom && (
        <BeRoomieModal
          room={selectedRoom}
          pg={pg}
          onClose={() => setSelectedRoom(null)}
          onConfirm={() => handleConfirmRoomie(selectedRoom)}
        />
      )}

      {/* ── SUCCESS TOAST ── */}
      {toast && (
        <SuccessToast
          room={toast}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}