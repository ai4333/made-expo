import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
// Icon-only mark (no text) — used in header bar only
import iconMark from "figma:asset/571bf660a88c83d7942b794a42b4476b34684c5e.png";

// ─── Slide illustrations ──────────────────────────────────────

function Slide1Illustration() {
  return (
    <div style={{ position: "relative", width: 260, height: 200, margin: "0 auto" }}>
      {/* City skyline */}
      <svg width="260" height="140" viewBox="0 0 260 140" style={{ position: "absolute", bottom: 0, left: 0 }}>
        {/* Buildings */}
        <rect x="0"   y="80"  width="28" height="60" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <rect x="32"  y="50"  width="36" height="90" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <rect x="72"  y="70"  width="24" height="70" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <rect x="100" y="30"  width="44" height="110" rx="4" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/>
        <rect x="148" y="60"  width="30" height="80" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <rect x="182" y="45"  width="40" height="95" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        <rect x="226" y="75"  width="34" height="65" rx="4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        {/* Windows */}
        {[36,42,48,54,60,66,72,78].map(y => (
          [104,112,120,128,136].map(x => (
            <rect key={`${x}-${y}`} x={x} y={y} width={7} height={5} rx="1" fill="rgba(245,166,35,0.6)"/>
          ))
        ))}
        {/* Ground line */}
        <line x1="0" y1="140" x2="260" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
      </svg>

      {/* Price pins */}
      {[
        { left: 28, bottom: 115, price: "₹6,500" },
        { left: 88, bottom: 135, price: "₹8,500" },
        { left: 168, bottom: 120, price: "₹9,000" },
      ].map(({ left, bottom, price }) => (
        <motion.div
          key={price}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          style={{
            position: "absolute", left, bottom,
            background: "white", borderRadius: 10,
            padding: "4px 10px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED" }}>{price}</span>
          {/* Pin tail */}
          <div style={{
            position: "absolute", bottom: -6, left: "50%",
            transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "6px solid white",
          }} />
        </motion.div>
      ))}
    </div>
  );
}

function Slide2Illustration() {
  const people = [
    { initials: "AK", color: "#F5A623", bg: "#FFF7ED", tags: ["🎮 Gaming", "🎵 Music"], x: 16 },
    { initials: "RN", color: "#7C3AED", bg: "#EDE9FE", tags: ["💻 Tech", "📚 Read"], x: 92 },
    { initials: "MR", color: "#F0436A", bg: "#FFF1F2", tags: ["📚 Study", "☕ Café"], x: 168 },
  ];

  return (
    <div style={{ position: "relative", width: 260, height: 200, margin: "0 auto" }}>
      {people.map(({ initials, color, bg, tags, x }, i) => (
        <motion.div
          key={initials}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.12, type: "spring", stiffness: 240, damping: 20 }}
          style={{ position: "absolute", top: 20, left: x, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          {/* Avatar */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: bg,
            border: `3px solid ${color}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 18, color,
            boxShadow: `0 6px 20px ${color}40`,
          }}>
            {initials}
          </div>
          {/* Tags */}
          {tags.map((tag) => (
            <div key={tag} style={{
              background: "rgba(255,255,255,0.18)",
              borderRadius: 100,
              padding: "3px 9px",
              fontSize: 10, fontWeight: 600,
              color: "white",
              border: "1px solid rgba(255,255,255,0.25)",
              whiteSpace: "nowrap",
            }}>
              {tag}
            </div>
          ))}
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg style={{ position: "absolute", top: 48, left: 0, pointerEvents: "none" }} width="260" height="20">
        <line x1="80" y1="10" x2="92" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
        <line x1="156" y1="10" x2="168" y2="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3"/>
      </svg>
    </div>
  );
}

function Slide3Illustration() {
  return (
    <div style={{ position: "relative", width: 260, height: 200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Left card */}
      <motion.div
        initial={{ x: -30, opacity: 0, rotate: -6 }}
        animate={{ x: 0, opacity: 1, rotate: -8 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
        style={{
          position: "absolute", left: 12, top: 20,
          width: 110, background: "white",
          borderRadius: 20, padding: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 20, fontWeight: 700, color: "#7C3AED" }}>AJ</div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>Arjun</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["🎮 Gaming", "🎵 Music"].map(t => (
            <span key={t} style={{ fontSize: 10, background: "#F5F3FF", color: "#7C3AED", borderRadius: 100, padding: "2px 8px" }}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Right card */}
      <motion.div
        initial={{ x: 30, opacity: 0, rotate: 6 }}
        animate={{ x: 0, opacity: 1, rotate: 8 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 18 }}
        style={{
          position: "absolute", right: 12, top: 20,
          width: 110, background: "white",
          borderRadius: 20, padding: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#FFF7ED", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 20, fontWeight: 700, color: "#F5A623" }}>RN</div>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>Rahul</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["🎮 Gaming", "💻 Tech"].map(t => (
            <span key={t} style={{ fontSize: 10, background: "#FFF7ED", color: "#D97706", borderRadius: 100, padding: "2px 8px" }}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Center heart */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ delay: 0.35, duration: 0.5, times: [0, 0.6, 1] }}
        style={{
          position: "absolute",
          width: 48, height: 48, borderRadius: "50%",
          background: "linear-gradient(135deg, #F0436A, #BE185D)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(240,67,106,0.5)",
          fontSize: 22, zIndex: 10,
        }}
      >
        💖
      </motion.div>
    </div>
  );
}

// ─── Slide data ───────────────────────────────────────────────
const SLIDES = [
  {
    illustration: <Slide1Illustration />,
    title: "Browse PGs Near You",
    subtitle: "Verified PGs. Real photos. Zero brokerage.",
  },
  {
    illustration: <Slide2Illustration />,
    title: "See Who's Already There",
    subtitle: "Know your future roommates before you move in.",
  },
  {
    illustration: <Slide3Illustration />,
    title: "Match With Your Vibe",
    subtitle: "Filter by lifestyle, habits and interests — not just location.",
    isCTA: true,
  },
];

// ─── Main Onboarding ─────────────────────────────────────────
export function Onboarding() {
  const navigate = useNavigate();
  const [slide, setSlide]       = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const goTo = (i: number) => {
    setDirection(i > slide ? 1 : -1);
    setSlide(i);
  };

  const handleFinish = () => {
    localStorage.setItem("mypgmatch_onboarded", "true");
    navigate("/role-selection");
  };

  const handleSkip = () => {
    localStorage.setItem("mypgmatch_onboarded", "true");
    navigate("/role-selection");
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (dx > 50 && slide < SLIDES.length - 1) goTo(slide + 1);
    if (dx < -50 && slide > 0) goTo(slide - 1);
    touchStartX.current = null;
  };

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{
        background: "linear-gradient(160deg, #4C1D95 0%, #7C3AED 55%, #9333EA 100%)",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
      `}</style>

      {/* ── Ambient blobs ── */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 100, left: -80, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

      {/* ── Header bar ── */}
      <div className="flex items-center justify-between px-5" style={{ paddingTop: 52, paddingBottom: 8 }}>
        {/* Icon mark + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10, overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
          }}>
            <img
              src={iconMark}
              alt="Staazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Staazy</span>
        </div>

        <button
          onClick={handleSkip}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            color: "rgba(255,255,255,0.85)",
            fontSize: 13, fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Skip
        </button>
      </div>

      {/* ── Illustration area ── */}
      <div className="flex-1 flex items-center justify-center" style={{ paddingTop: 8, paddingBottom: 8 }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%" }}
          >
            {SLIDES[slide].illustration}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom white card ── */}
      <div
        style={{
          background: "white",
          borderRadius: "32px 32px 0 0",
          padding: "28px 28px 40px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                height: 6,
                width: i === slide ? 24 : 8,
                borderRadius: 100,
                background: i === slide ? "#7C3AED" : "#E2E8F0",
                border: "none", cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Text content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 8px", letterSpacing: "-0.3px" }}>
              {SLIDES[slide].title}
            </h2>
            <p style={{ fontSize: 15, color: "#64748B", margin: 0, lineHeight: 1.55 }}>
              {SLIDES[slide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA button */}
        <div style={{ marginTop: 24 }}>
          {SLIDES[slide].isCTA ? (
            <>
              <button
                onClick={handleFinish}
                className="w-full active:scale-95 transition-transform"
                style={{
                  height: 54, borderRadius: 100,
                  background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                  color: "white", border: "none",
                  fontSize: 16, fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
                  cursor: "pointer", width: "100%",
                }}
              >
                Let's Go! 🚀
              </button>
              <p style={{ textAlign: "center", fontSize: 13, color: "#94A3B8", marginTop: 14 }}>
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/auth")}
                  style={{ background: "none", border: "none", color: "#7C3AED", fontWeight: 700, cursor: "pointer", fontSize: 13 }}
                >
                  Log in
                </button>
              </p>
            </>
          ) : (
            <button
              onClick={() => goTo(slide + 1)}
              className="w-full active:scale-95 transition-transform"
              style={{
                height: 54, borderRadius: 100,
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                color: "white", border: "none",
                fontSize: 15, fontWeight: 700,
                boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
                cursor: "pointer", width: "100%",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              Next <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}