import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Bell, Search, MapPin, Wifi, Wind, UtensilsCrossed, WashingMachine,
  Shield, ChevronDown, Grid3X3, Map, Heart, Star, SlidersHorizontal,
  Home as HomeIcon, ChevronRight, Clock, Moon, Sun, Megaphone,
  ClipboardList, MessageCircle, AlertCircle, Users,
} from "lucide-react";
import { pgListings, tenants, type PGListing, IMAGES } from "../data/mockData";

const PURPLE = "#8A2BE2";
const PURPLE_DARK = "#6D1CB5";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF", card: "#FFFFFF", cardBorder: "#E9E3F5",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  warning: "#D97706", warningBg: "rgba(217,119,6,0.10)",
  success: "#059669", successBg: "rgba(5,150,105,0.08)",
};
const DARK = {
  bg: "#0F0F13", surface: "#1A1A24", card: "#1A1A24", cardBorder: "#2D2D3D",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  warning: "#F59E0B", warningBg: "rgba(245,158,11,0.12)",
  success: "#10B981", successBg: "rgba(16,185,129,0.10)",
};

const filters = ["All", "Near Me", "Budget", "Room Type", "Vibe Match", "Available Now"];

const amenityIcons: Record<string, JSX.Element> = {
  WiFi: <Wifi size={14} />,
  AC: <Wind size={14} />,
  Meals: <UtensilsCrossed size={14} />,
  Laundry: <WashingMachine size={14} />,
  CCTV: <Shield size={14} />,
};

const latestAnnouncements = [
  { id: 1, text: "Water supply off tomorrow 10am–2pm for maintenance. Please store water in advance.", time: "2 hours ago" },
  { id: 2, text: "New WiFi password: PG@Sunrise2025. Old password deactivated from tonight.", time: "Yesterday, 8:30 PM" },
];

const recentComplaints = [
  { id: "c1", title: "AC not working", category: "Maintenance", status: "In Progress", date: "Feb 25" },
  { id: "c2", title: "WiFi speed issue", category: "Amenity", status: "Pending", date: "Feb 23" },
];

const statusStyle: Record<string, { color: string; bg: string }> = {
  "In Progress": { color: PURPLE, bg: PURPLE_GHOST },
  "Pending": { color: "#D97706", bg: "rgba(217,119,6,0.10)" },
  "Resolved": { color: "#059669", bg: "rgba(5,150,105,0.08)" },
  "Open": { color: "#D97706", bg: "rgba(217,119,6,0.10)" },
};

function PGCard({ pg, onViewPG, onSeeRoommates }: { pg: PGListing; onViewPG: () => void; onSeeRoommates: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [saved, setSaved] = useState(pg.saved || false);
  const pgTenants = tenants.filter((t) => pg.tenantIds.includes(t.id)).slice(0, 4);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mx-4 mb-4">
      <div className="relative h-52">
        <img src={pg.images[imgIdx]} alt={pg.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {pg.images.map((_, i) => (
            <button key={i} onClick={() => setImgIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-4" : "bg-white/60"}`}
            />
          ))}
        </div>
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
          {pg.bedsAvailable} Bed{pg.bedsAvailable !== 1 ? "s" : ""} Available
        </div>
        <button onClick={() => setSaved(!saved)}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart size={16} className={saved ? "fill-rose-500 text-rose-500" : "text-slate-400"} />
        </button>
        <div className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full font-medium ${
          pg.gender === "Female Only" ? "bg-pink-500/90 text-white"
          : pg.gender === "Male Only" ? "bg-blue-500/90 text-white"
          : "text-white"
        }`} style={pg.gender === "Co-Living" || pg.gender === "Both" ? { background: `${PURPLE}E6` } : {}}>
          {pg.gender}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <h3 className="text-slate-900 font-semibold text-base">{pg.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={12} className="text-slate-400" />
              <span className="text-slate-500 text-xs">{pg.area} · {pg.distance} away</span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-base" style={{ color: PURPLE }}>₹{pg.price.toLocaleString()}</div>
            <div className="text-slate-400 text-xs">/month</div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span className="text-slate-700 text-xs font-medium">{pg.rating}</span>
          <span className="text-slate-400 text-xs">({pg.reviews.length} reviews)</span>
        </div>

        <div className="flex gap-3 mb-3">
          {pg.amenities.slice(0, 5).map((a) => (
            <div key={a} className="flex items-center gap-1 text-slate-500">
              {amenityIcons[a] || <Shield size={14} />}
              <span className="text-xs">{a}</span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-3 mb-3" style={{ background: PURPLE_GHOST }}>
          <p className="text-xs text-slate-500 mb-2">People living here:</p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {pgTenants.map((t) => (
                <img key={t.id} src={t.photo} alt={t.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {pg.vibeTypes.slice(0, 2).map((v) => (
                <span key={v} className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: PURPLE_GHOST, color: PURPLE }}
                >{v}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onViewPG}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold active:scale-95 transition-transform border-2"
            style={{ borderColor: PURPLE, color: PURPLE }}
          >
            View PG
          </button>
          <button onClick={onSeeRoommates}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white active:scale-95 transition-transform flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #F0436A 0%, #BE185D 100%)",
              border: "none",
              boxShadow: "0 4px 12px rgba(240,67,106,0.3)",
            }}
          >
            <Users size={15} />
            See Roommates
          </button>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [darkMode, setDarkMode] = useState(false);
  const t = darkMode ? DARK : LIGHT;

  const filteredPGs = pgListings;

  return (
    <div style={{ background: t.bg }} className="min-h-full">

      {/* ── Your PG Hero Banner ─────────────────────── */}
      <div
        className="relative px-4 pt-12 pb-5"
        style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)` }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${IMAGES.building1})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                <HomeIcon size={16} className="text-white" />
              </div>
              <span className="text-white/80 text-xs font-semibold tracking-wide uppercase">Your PG</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-amber-400 rounded-full px-2.5 py-1">
                <Star size={11} className="fill-white text-white" />
                <span className="text-white text-xs font-bold">4.5</span>
              </div>
              {/* Dark mode toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                {darkMode ? <Sun size={15} color="white" /> : <Moon size={15} color="white" />}
              </button>
              <button
                onClick={() => navigate("/tenant/mypg")}
                className="flex items-center gap-1 text-white px-2.5 py-1 rounded-full text-[10px] font-semibold active:scale-95 transition-transform"
                style={{ background: "rgba(255,255,255,0.18)" }}
              >
                View All <ChevronRight size={11} />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <h2 className="text-white font-black text-xl leading-tight">Sunrise Premium PG</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-white/60" />
              <span className="text-white/60 text-xs">Koramangala · Room 204</span>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            {[
              { label: "Living Since", value: "Jan 2025" },
              { label: "Roommates", value: "2 shared" },
              { label: "Open Issues", value: "2 active" },
            ].map((s) => (
              <div key={s.label} className="flex-1 rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.15)" }}>
                <p className="text-white/60 text-[9px] font-semibold uppercase">{s.label}</p>
                <p className="text-white font-bold text-sm">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-500 rounded-2xl px-4 py-2.5 flex items-center gap-3">
            <span className="text-white font-black text-sm">₹8,500 Due</span>
            <span className="text-white/80 text-xs flex items-center gap-1">
              <Clock size={11} /> Due Mar 5, 2025
            </span>
            <button
              onClick={() => navigate("/tenant/mypg")}
              className="ml-auto bg-white font-bold text-xs px-3 py-1.5 rounded-xl active:scale-95 transition-transform"
              style={{ color: "#D97706" }}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ───────────────────────────── */}
      <div className="px-4 pt-4 pb-1">
        <div className="flex gap-3">
          {[
            { icon: "📢", label: "PG Updates", sub: "2 new", path: "/tenant/updates" },
            { icon: "📋", label: "Raise Issue", sub: "Report now", path: "/tenant/complaints" },
            { icon: "💬", label: "Messages", sub: "Chat owner", path: "/tenant/messages" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.path)}
              className="flex-1 rounded-2xl p-3 text-center active:scale-95 transition-transform"
              style={{ background: t.surface, border: `1px solid ${t.cardBorder}` }}
            >
              <span className="text-2xl block mb-1">{a.icon}</span>
              <p className="text-xs font-bold" style={{ color: t.heading }}>{a.label}</p>
              <p className="text-[10px]" style={{ color: PURPLE }}>{a.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── PG Updates Preview ──────────────────────── */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Megaphone size={15} style={{ color: PURPLE }} />
            <span className="font-bold text-sm" style={{ color: t.heading }}>PG Updates</span>
          </div>
          <button
            onClick={() => navigate("/tenant/updates")}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: PURPLE }}
          >
            See all <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-2">
          {latestAnnouncements.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl px-4 py-3"
              style={{
                background: t.card,
                borderTop: `1px solid ${t.cardBorder}`,
                borderRight: `1px solid ${t.cardBorder}`,
                borderBottom: `1px solid ${t.cardBorder}`,
                borderLeft: `3px solid ${PURPLE}`,
              }}
            >
              <p className="text-xs mb-1 line-clamp-2" style={{ color: t.body }}>{a.text}</p>
              <p className="text-[10px]" style={{ color: t.muted }}>{a.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── My Complaints Strip ─────────────────────── */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="text-red-500" />
            <span className="font-bold text-sm" style={{ color: t.heading }}>My Complaints</span>
          </div>
          <button
            onClick={() => navigate("/tenant/complaints")}
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: PURPLE }}
          >
            View all <ChevronRight size={13} />
          </button>
        </div>
        <div className="space-y-2 mb-1">
          {recentComplaints.map((c) => {
            const s = statusStyle[c.status] || { color: "#8B7AA8", bg: "#F5F3FF" };
            return (
              <div
                key={c.id}
                className="rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background: t.card, border: `1px solid ${t.cardBorder}` }}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: t.heading }}>{c.title}</p>
                  <p className="text-[10px]" style={{ color: t.muted }}>{c.category} · {c.date}</p>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ color: s.color, background: s.bg }}
                >{c.status}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Search / Filter Bar ─────────────────────── */}
      <div className="px-4 pt-4 pb-3 sticky top-0 z-20 shadow-sm" style={{ background: t.card }}>
        <div className="flex items-center justify-between mb-3">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: t.surface }}>
            <MapPin size={16} style={{ color: PURPLE }} />
            <span className="text-sm font-semibold" style={{ color: t.heading }}>Bangalore</span>
            <ChevronDown size={14} style={{ color: t.muted }} />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: t.surface }}>
              <Search size={18} style={{ color: t.muted }} />
            </button>
            <button
              onClick={() => navigate("/filters")}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: t.surface }}
            >
              <SlidersHorizontal size={18} style={{ color: t.muted }} />
            </button>
            <button
              onClick={() => navigate("/notifications")}
              className="w-10 h-10 rounded-xl flex items-center justify-center relative"
              style={{ background: t.surface }}
            >
              <Bell size={18} style={{ color: t.muted }} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full" />
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all"
              style={
                activeFilter === f
                  ? { background: PURPLE, color: "white", boxShadow: "0 2px 8px rgba(138,43,226,0.28)" }
                  : { background: t.surface, color: t.muted }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── View Toggle & Count ─────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm" style={{ color: t.muted }}>
          <span className="font-semibold" style={{ color: t.heading }}>{filteredPGs.length}</span> PGs found
        </p>
        <div className="flex rounded-xl p-0.5" style={{ background: t.surface }}>
          <button
            onClick={() => setViewMode("list")}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={viewMode === "list" ? { background: t.card, color: PURPLE, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" } : { color: t.muted }}
          >
            <Grid3X3 size={14} /> List
          </button>
          <button
            onClick={() => { setViewMode("map"); navigate("/tenant/map"); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={viewMode === "map" ? { background: t.card, color: PURPLE, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" } : { color: t.muted }}
          >
            <Map size={14} /> Map
          </button>
        </div>
      </div>

      {/* ── PG List ─────────────────────────────────── */}
      <div className="pb-6">
        {filteredPGs.map((pg) => (
          <PGCard
            key={pg.id}
            pg={pg}
            onViewPG={() => navigate(`/pg/${pg.id}`)}
            onSeeRoommates={() => navigate('/tenant/roommate-rooms', {
              state: {
                pg: {
                  id: pg.id,
                  name: pg.name,
                  area: pg.area,
                  distance: pg.distance,
                  rating: pg.rating,
                  reviewCount: pg.reviews.length,
                  image: pg.images[0],
                }
              }
            })}
          />
        ))}
        <div
          className="mx-4 mt-2 rounded-3xl p-4 text-white"
          style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, ${PURPLE_DARK} 100%)` }}
        >
          <p className="font-bold text-sm mb-1">✨ Explore the full app flow</p>
          <p className="text-white/80 text-xs mb-3">Start from the splash screen to see onboarding, auth, vibe quiz & more!</p>
          <div className="flex gap-2">
            <button onClick={() => navigate("/onboarding")}
              className="bg-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform"
              style={{ color: PURPLE_DARK }}
            >
              Start Onboarding →
            </button>
            <button onClick={() => navigate("/")}
              className="bg-white/20 text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform"
            >
              PG OS (Owner) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}