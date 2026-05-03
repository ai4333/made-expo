import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ChevronLeft, Share2, Heart, MapPin, Star, Wifi, Wind, Droplets,
  UtensilsCrossed, WashingMachine, Shield, ParkingMeter, Zap,
  Tv, Dumbbell, Sparkles, CheckCircle2, Phone, MessageCircle,
  ChevronRight, BadgeCheck, Clock3, Users2, CalendarCheck2,
} from "lucide-react";
import { pgListings, tenants } from "../data/mockData";

const P  = "#7C3AED";
const PD = "#6D28D9";
const PL = "#ede9fe";
const PT = "#5b21b6";

const amenityMap: Record<string, { icon: JSX.Element; label: string }> = {
  WiFi:         { icon: <Wifi size={18} />,            label: "WiFi" },
  AC:           { icon: <Wind size={18} />,            label: "AC" },
  HotWater:     { icon: <Droplets size={18} />,        label: "Hot Water" },
  Meals:        { icon: <UtensilsCrossed size={18} />, label: "Meals" },
  Laundry:      { icon: <WashingMachine size={18} />,  label: "Laundry" },
  CCTV:         { icon: <Shield size={18} />,          label: "CCTV" },
  Parking:      { icon: <ParkingMeter size={18} />,    label: "Parking" },
  PowerBackup:  { icon: <Zap size={18} />,             label: "Power" },
  ROWater:      { icon: <Droplets size={18} />,        label: "RO Water" },
  CommonTV:     { icon: <Tv size={18} />,              label: "TV" },
  Gym:          { icon: <Dumbbell size={18} />,        label: "Gym" },
  Housekeeping: { icon: <Sparkles size={18} />,        label: "Cleaning" },
};

export function PGDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = pgListings.find(p => p.id === id) || pgListings[0];
  const [saved, setSaved] = useState(pg.saved || false);

  /* ── Carousel ── */
  const images = pg.images?.length ? pg.images : [pg.images[0]];
  const [activeImg, setActiveImg] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX   = useRef<number>(0);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const onTouchMove  = (e: React.TouchEvent) => { touchEndX.current   = e.targetTouches[0].clientX; };
  const onTouchEnd   = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeImg < images.length - 1) setActiveImg(p => p + 1);
      if (diff < 0 && activeImg > 0)                 setActiveImg(p => p - 1);
    }
  };

  /* ── Review ── */
  const [pgRating,    setPgRating]    = useState(0);
  const [ownerRating, setOwnerRating] = useState(0);
  const [reviewText,  setReviewText]  = useState("");
  const [submitted,   setSubmitted]   = useState(false);
  const [hovPg,       setHovPg]       = useState(0);
  const [hovOwner,    setHovOwner]    = useState(0);

  const handleSubmit = () => {
    if (!reviewText || pgRating === 0) return;
    setSubmitted(true);
    setReviewText(""); setPgRating(0); setOwnerRating(0);
    setTimeout(() => setSubmitted(false), 3500);
  };

  const pgTenants = tenants.filter(t => pg.tenantIds.includes(t.id));

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 14, letterSpacing: "-0.2px" }}>
      {children}
    </h2>
  );

  const Divider = () => (
    <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #e2e8f0 20%, #e2e8f0 80%, transparent)", margin: "20px 0" }} />
  );

  return (
    <div style={{ background: "#f8f7ff", minHeight: "100vh", paddingBottom: 112 }}>

      {/* ════════════════════════════════
          SWIPEABLE IMAGE CAROUSEL
      ════════════════════════════════ */}
      <div
        style={{ position: "relative", overflow: "hidden", height: 300 }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Strip */}
        <div
          style={{
            display: "flex",
            height: "100%",
            transform: `translateX(-${activeImg * 100}%)`,
            transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={`PG photo ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", flexShrink: 0, minWidth: "100%" }}
            />
          ))}
        </div>

        {/* Gradients */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 42%, rgba(0,0,0,0.28) 100%)", pointerEvents: "none" }} />

        {/* ── TOP: Back + Share + Save ── */}
        <div style={{ position: "absolute", top: 52, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
            }}
          >
            <ChevronLeft size={20} color="#1e293b" />
          </button>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
              }}
            >
              <Share2 size={16} color="#1e293b" />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(10px)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
              }}
            >
              <Heart size={16} style={{ color: saved ? "#f43f5e" : "#475569", fill: saved ? "#f43f5e" : "transparent" }} />
            </button>
          </div>
        </div>

        {/* ── BOTTOM: Dots (center) + Counter (right) — SAME ROW ── */}
        {/* Dot indicators — centered, with right padding so they don't overlap counter */}
        <div
          style={{
            position: "absolute", bottom: 16,
            left: 0, right: 0,
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: 6,
            paddingRight: 56,             /* room for counter badge on the right */
            pointerEvents: "none",
          }}
        >
          {images.map((_: string, idx: number) => (
            <div
              key={idx}
              style={{
                width:  idx === activeImg ? 22 : 6,
                height: 6,
                borderRadius: 3,
                background: idx === activeImg ? "#ffffff" : "rgba(255,255,255,0.48)",
                transition: "all 0.3s ease",
                boxShadow: idx === activeImg ? "0 1px 4px rgba(0,0,0,0.25)" : "none",
              }}
            />
          ))}
        </div>

        {/* Counter badge — bottom-right, same level as dots */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            background: "rgba(0,0,0,0.52)",
            backdropFilter: "blur(8px)",
            borderRadius: 20,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "0.4px",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {activeImg + 1} / {images.length}
        </div>
      </div>

      {/* ════════════════════════════════
          MAIN WHITE CARD
      ════════════════════════════════ */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "28px 28px 0 0",
          marginTop: -20,
          position: "relative",
          padding: "22px 16px 8px",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.4px" }}>{pg.name}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
              <MapPin size={12} color="#94a3b8" />
              <span style={{ fontSize: 13, color: "#64748b" }}>{pg.area} · {pg.distance} away</span>
            </div>
          </div>
          {/* Availability pill */}
          <div
            style={{
              padding: "5px 12px",
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              marginLeft: 10,
              flexShrink: 0,
              marginTop: 3,
              ...(pg.bedsAvailable > 0
                ? { background: PL, color: PD }
                : { background: "#fee2e2", color: "#dc2626" }
              ),
            }}
          >
            {pg.bedsAvailable > 0 ? `${pg.bedsAvailable} Beds Available` : "Full"}
          </div>
        </div>

        {/* Rating row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, marginTop: 8 }}>
          <div style={{ display: "flex", gap: 2 }}>
            {[1,2,3,4,5].map(i => (
              <Star
                key={i} size={14}
                style={{
                  color: i <= Math.floor(pg.rating) ? "#f59e0b" : "#e2e8f0",
                  fill:  i <= Math.floor(pg.rating) ? "#f59e0b" : "#e2e8f0",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{pg.rating}</span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>({pg.reviews.length} reviews)</span>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
            <BadgeCheck size={14} color={P} />
            <span style={{ fontSize: 11, fontWeight: 600, color: PT }}>Verified PG</span>
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            PRICING & AVAILABILITY
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Pricing & Availability</SectionLabel>
          <div style={{ borderRadius: 18, border: "1px solid #f1f5f9", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            {[
              { label: "Single Room",     emoji: "🛏",  price: pg.roomTypes.single.price,  available: pg.roomTypes.single.available },
              { label: "Shared (2-bed)",  emoji: "🛏🛏", price: pg.roomTypes.shared2.price, available: pg.roomTypes.shared2.available },
              { label: "Shared (3-bed)",  emoji: "🛏🛏🛏",price: pg.roomTypes.shared3.price, available: pg.roomTypes.shared3.available },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px",
                  borderTop: i !== 0 ? "1px solid #f8fafc" : "none",
                  background: i % 2 === 0 ? "#ffffff" : "#fafbff",
                }}
              >
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0 }}>{row.emoji} {row.label}</p>
                  <p style={{ fontSize: 11, margin: "3px 0 0", color: row.available > 0 ? P : "#ef4444", fontWeight: 600 }}>
                    {row.available > 0 ? `${row.available} bed${row.available !== 1 ? "s" : ""} available` : "Full"}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: P }}>
                    ₹{row.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 400 }}>/mo</span>
                </div>
              </div>
            ))}
          </div>
          <button
            style={{
              width: "100%", marginTop: 12,
              padding: "14px 0",
              borderRadius: 18,
              border: `2px solid ${P}`,
              background: "transparent",
              color: P,
              fontSize: 13, fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.2px",
            }}
          >
            Check Availability
          </button>
        </div>

        <Divider />

        {/* ══════════════════════
            AMENITIES
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Amenities</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {Object.entries(amenityMap).map(([key, { icon, label }]) => {
              const avail = pg.allAmenities[key];
              return (
                <div
                  key={key}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    padding: "12px 4px",
                    borderRadius: 16,
                    background: avail ? PL : "#f8fafc",
                    border: avail ? `1px solid #ddd6fe` : "1px solid #f1f5f9",
                    boxShadow: avail ? "0 2px 8px rgba(124,58,237,0.08)" : "none",
                  }}
                >
                  <div style={{ color: avail ? P : "#cbd5e1" }}>{icon}</div>
                  <span style={{ fontSize: 10, textAlign: "center", lineHeight: 1.3, color: avail ? "#374151" : "#cbd5e1", fontWeight: 600 }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            HOUSE RULES
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>House Rules</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {pg.rules.map(rule => (
              <span
                key={rule}
                style={{
                  background: "#f8f7ff",
                  color: "#475569",
                  fontSize: 12,
                  padding: "7px 14px",
                  borderRadius: 20,
                  fontWeight: 500,
                  border: "1px solid #e2e8f0",
                }}
              >
                {rule}
              </span>
            ))}
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            LOCATION
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Location</SectionLabel>
          {/* Map placeholder */}
          <div
            style={{
              height: 150, borderRadius: 20, marginBottom: 12,
              background: "linear-gradient(135deg, #ede9fe 0%, #c4b5fd 100%)",
              position: "relative", overflow: "hidden",
              boxShadow: "0 4px 16px rgba(124,58,237,0.12)",
            }}
          >
            {/* Grid */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
              {[...Array(6)].map((_, i) => (
                <div key={`h${i}`} style={{ position: "absolute", left: 0, right: 0, borderTop: "1px solid #7C3AED", top: `${i * 20}%` }} />
              ))}
              {[...Array(6)].map((_, i) => (
                <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, borderLeft: "1px solid #7C3AED", left: `${i * 20}%` }} />
              ))}
            </div>
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${P}, ${PD})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 8px",
                    boxShadow: `0 4px 16px rgba(124,58,237,0.4)`,
                  }}
                >
                  <MapPin size={22} color="white" fill="white" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: PT, background: "rgba(255,255,255,0.8)", padding: "3px 10px", borderRadius: 10 }}>{pg.name}</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: "#64748b", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={12} color="#94a3b8" />
            {pg.location.address}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {pg.location.landmarks.map(l => (
              <span
                key={l}
                style={{
                  background: "#f8f7ff", color: "#475569",
                  fontSize: 11, padding: "5px 12px", borderRadius: 20,
                  display: "flex", alignItems: "center", gap: 4,
                  border: "1px solid #ede9fe", fontWeight: 500,
                }}
              >
                <MapPin size={10} color={P} />{l}
              </span>
            ))}
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            WHO'S LIVING HERE
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <SectionLabel>Who's Living Here? 🏠</SectionLabel>
            <button
              onClick={() => navigate("/tenant/connect")}
              style={{ background: "none", border: "none", cursor: "pointer", color: P, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}
            >
              See All <ChevronRight size={14} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8, margin: "0 -16px", padding: "0 16px 8px" }}>
            {pgTenants.map(tenant => (
              <button
                key={tenant.id}
                onClick={() => navigate(`/roommate/${tenant.id}`)}
                style={{
                  flexShrink: 0, width: 172,
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: 14,
                  textAlign: "left",
                  border: "1px solid #ede9fe",
                  boxShadow: "0 2px 12px rgba(124,58,237,0.08)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <img
                    src={tenant.photo} alt={tenant.name}
                    style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: `2px solid ${PL}` }}
                  />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{tenant.name}, {tenant.age}</p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{tenant.gender}</p>
                  </div>
                </div>
                <p style={{ fontSize: 11, color: "#64748b", marginBottom: 8, fontWeight: 500 }}>{tenant.occupation}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {tenant.interests.slice(0, 2).map(interest => (
                    <span
                      key={interest}
                      style={{ fontSize: 10, padding: "3px 8px", borderRadius: 10, background: PL, color: P, fontWeight: 600, border: `1px solid #ddd6fe` }}
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "4px 10px", borderRadius: 12,
                    fontSize: 11, fontWeight: 700,
                    background: tenant.vibeMatch >= 85 ? PL : "#f0fdf4",
                    color: tenant.vibeMatch >= 85 ? PT : "#15803d",
                  }}
                >
                  {tenant.vibeMatch}% Match {tenant.vibeMatch >= 85 ? "🔥" : "✨"}
                </div>
              </button>
            ))}
          </div>

          {/* Vibe score card */}
          <div
            style={{
              marginTop: 12, borderRadius: 18, padding: "14px 16px",
              background: `linear-gradient(135deg, ${PL} 0%, #ddd6fe 100%)`,
              border: "1px solid #ddd6fe",
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, color: PT, marginBottom: 3 }}>Room Vibe Score 🎯</p>
            <p style={{ fontSize: 13, color: "#374151" }}>
              This PG is mostly:{" "}
              <span style={{ fontWeight: 700, color: PT }}>{pg.vibeTypes.join(" · ")}</span>
            </p>
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            REVIEWS
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <SectionLabel>Reviews</SectionLabel>
            <div
              style={{
                display: "flex", alignItems: "center", gap: 5,
                background: "#fffbeb", padding: "4px 10px", borderRadius: 12,
                border: "1px solid #fde68a",
              }}
            >
              <Star size={13} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: "#92400e" }}>{pg.rating}</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {pg.reviews.map((review, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  padding: 16,
                  background: "#fafbff",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <img
                    src={review.photo} alt={review.name}
                    style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid #e2e8f0" }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{review.name}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={11} style={{ color: s <= review.rating ? "#f59e0b" : "#e2e8f0", fill: s <= review.rating ? "#f59e0b" : "#e2e8f0" }} />
                      ))}
                      <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 2 }}>{review.date}</span>
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: 0 }}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            TRUST & VERIFICATION
        ══════════════════════ */}
        <div style={{ marginBottom: 20 }}>
          <SectionLabel>Trust & Verification ✅</SectionLabel>

          {/* Trust grid */}
          <div
            style={{
              borderRadius: 20, padding: 18, marginBottom: 14,
              background: `linear-gradient(135deg, ${PL} 0%, #ddd6fe 100%)`,
              border: "1px solid #ddd6fe",
              boxShadow: "0 2px 12px rgba(124,58,237,0.08)",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: <BadgeCheck size={20} color={P} />,    label: "Owner Verified",  sub: "ID confirmed" },
                { icon: <span style={{ fontSize: 20 }}>📸</span>, label: "Photos Verified", sub: "Updated Mar 2025" },
                { icon: <Clock3 size={20} color={P} />,        label: "Response Time",   sub: `~${pg.owner.responseTime}` },
                { icon: <Users2 size={20} color={P} />,        label: "Tenants Hosted",  sub: `${pg.owner.totalHosted} since 2022` },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: PT, margin: 0 }}>{item.label}</p>
                    <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Owner card */}
          <div
            style={{
              borderRadius: 20, padding: 16,
              background: "#ffffff",
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", gap: 14,
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: PL,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26,
                  border: `2px solid #ddd6fe`,
                }}
              >👤</div>
              {pg.owner.active && (
                <div style={{
                  position: "absolute", bottom: 1, right: 1,
                  width: 13, height: 13, borderRadius: "50%",
                  background: "#22c55e",
                  border: "2px solid white",
                }} />
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0 }}>{pg.owner.name}</p>
                {pg.owner.verified && <CheckCircle2 size={15} color={P} style={{ fill: PL }} />}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}>
                <Star size={12} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{pg.owner.rating} owner rating</span>
              </div>
              <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>{pg.owner.active ? "🟢 Active now" : `Usually replies in ${pg.owner.responseTime}`}</p>
            </div>
            <button
              style={{
                padding: "9px 14px",
                borderRadius: 14,
                background: `linear-gradient(135deg, ${P}, ${PD})`,
                border: "none",
                color: "white",
                fontSize: 12, fontWeight: 700,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
                boxShadow: `0 3px 12px rgba(124,58,237,0.35)`,
                flexShrink: 0,
              }}
            >
              <Phone size={13} /> Contact
            </button>
          </div>
        </div>

        <Divider />

        {/* ══════════════════════
            WRITE A REVIEW
        ══════════════════════ */}
        <div style={{ marginBottom: 16 }}>
          <SectionLabel>✍️ Write a Review</SectionLabel>

          {/* Success banner */}
          {submitted && (
            <div
              style={{
                padding: "13px 16px",
                borderRadius: 16,
                background: `linear-gradient(135deg, ${P}, ${PD})`,
                color: "white",
                fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8,
                marginBottom: 14,
                boxShadow: `0 4px 16px rgba(124,58,237,0.35)`,
              }}
            >
              ✅ Review submitted! Thank you for your feedback.
            </div>
          )}

          <div
            style={{
              background: "#ffffff",
              borderRadius: 22,
              padding: 18,
              border: "1px solid #f1f5f9",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            }}
          >
            {/* Rate PG */}
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>Rate this PG</p>
            <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  onClick={() => setPgRating(star)}
                  onMouseEnter={() => setHovPg(star)}
                  onMouseLeave={() => setHovPg(0)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      display: "inline-block",
                      color: star <= (hovPg || pgRating) ? "#f59e0b" : "#e2e8f0",
                      filter: star <= (hovPg || pgRating) ? "drop-shadow(0 2px 4px rgba(245,158,11,0.45))" : "none",
                      transform: star <= (hovPg || pgRating) ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.15s ease",
                    }}
                  >★</span>
                </button>
              ))}
            </div>

            {/* Rate Owner */}
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 10 }}>Rate the Owner</p>
            <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  onClick={() => setOwnerRating(star)}
                  onMouseEnter={() => setHovOwner(star)}
                  onMouseLeave={() => setHovOwner(0)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, lineHeight: 1 }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      display: "inline-block",
                      color: star <= (hovOwner || ownerRating) ? "#f59e0b" : "#e2e8f0",
                      filter: star <= (hovOwner || ownerRating) ? "drop-shadow(0 2px 4px rgba(245,158,11,0.45))" : "none",
                      transform: star <= (hovOwner || ownerRating) ? "scale(1.1)" : "scale(1)",
                      transition: "all 0.15s ease",
                    }}
                  >★</span>
                </button>
              ))}
            </div>

            {/* Text area */}
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Share your experience — cleanliness, food, wifi, owner behaviour..."
              rows={4}
              style={{
                width: "100%",
                fontFamily: "inherit",
                fontSize: 13,
                color: "#374151",
                border: `1.5px solid ${reviewText ? P : "#e2e8f0"}`,
                borderRadius: 14,
                padding: "12px 14px",
                outline: "none",
                resize: "none",
                boxSizing: "border-box",
                background: reviewText ? "#faf9ff" : "#fafafa",
                transition: "all 0.2s ease",
                boxShadow: reviewText ? `0 0 0 3px ${PL}` : "none",
              }}
            />

            {/* Hint */}
            {pgRating === 0 && (
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "8px 0 0", textAlign: "center" }}>
                ⭐ Select a star rating to enable submission
              </p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!reviewText || pgRating === 0}
              style={{
                marginTop: 12, width: "100%",
                padding: "15px 0",
                borderRadius: 16,
                border: "none",
                fontSize: 14, fontWeight: 800,
                cursor: reviewText && pgRating > 0 ? "pointer" : "not-allowed",
                background: reviewText && pgRating > 0
                  ? `linear-gradient(135deg, ${P}, ${PD})`
                  : "#f1f5f9",
                color: reviewText && pgRating > 0 ? "white" : "#94a3b8",
                boxShadow: reviewText && pgRating > 0 ? `0 5px 18px rgba(124,58,237,0.38)` : "none",
                transition: "all 0.2s ease",
                letterSpacing: "0.2px",
              }}
            >
              Submit Review 🚀
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          STICKY BOTTOM BAR
      ════════════════════════════════ */}
      <div
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid #f1f5f9",
          padding: "14px 16px 28px",
          display: "flex", alignItems: "center", gap: 12,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
          zIndex: 40,
        }}
      >
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: P, letterSpacing: "-0.5px" }}>
            ₹{pg.price.toLocaleString()}
            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 400 }}>/mo</span>
          </div>
          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>per bed</div>
        </div>

        <button
          onClick={() => navigate(`/pg/${pg.id}/schedule`)}
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 18,
            border: `2px solid ${P}`,
            background: "transparent",
            color: P,
            fontSize: 13, fontWeight: 700,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          <CalendarCheck2 size={16} /> Schedule Visit
        </button>

        <button
          style={{
            flex: 1,
            padding: "14px 0",
            borderRadius: 18,
            border: "none",
            background: `linear-gradient(135deg, ${P} 0%, ${PD} 100%)`,
            color: "white",
            fontSize: 13, fontWeight: 800,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            boxShadow: `0 5px 18px rgba(124,58,237,0.40)`,
            letterSpacing: "0.2px",
          }}
        >
          <MessageCircle size={16} /> Express Interest
        </button>
      </div>
    </div>
  );
}
