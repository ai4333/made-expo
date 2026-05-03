import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function LogoMark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <polyline points="4,42 40,8 76,42" stroke="#F5A623" strokeWidth="5" strokeLinejoin="miter" strokeLinecap="round" fill="none" />
      <rect x="8" y="40" width="18" height="30" rx="3" fill="white" />
      <rect x="54" y="40" width="18" height="30" rx="3" fill="white" />
      <rect x="8" y="40" width="64" height="16" fill="white" />
      <polygon points="20,40 60,40 40,56" fill="#7C3AED" />
      <rect x="37" y="54" width="6" height="16" rx="3" fill="#F0436A" />
      <line x1="40" y1="54" x2="20" y2="40" stroke="#F0436A" strokeWidth="5" strokeLinecap="round" />
      <line x1="40" y1="54" x2="60" y2="40" stroke="#F0436A" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

const SLIDES = [
  {
    title: "Browse PGs Near You",
    body: "Verified PGs. Real photos. Zero brokerage.",
    illustration: (
      <svg viewBox="0 0 280 200" style={{ width: "100%", height: "100%" }}>
        {/* Buildings */}
        {[30, 110, 190].map((x, i) => (
          <g key={i}>
            <rect x={x} y={60 + i * 10} width={60} height={130 - i * 10} rx="4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            {[0, 1, 2].map(row => [0, 1].map(col => (
              <rect key={`${row}-${col}`} x={x + 8 + col * 24} y={80 + i * 10 + row * 22} width="16" height="14" rx="2" fill="rgba(255,255,255,0.15)" />
            )))}
          </g>
        ))}
        {/* Price pins */}
        {[{ x: 55, y: 45, price: "₹6,500" }, { x: 135, y: 35, price: "₹8,500" }, { x: 215, y: 50, price: "₹9,000" }].map((pin, i) => (
          <g key={i}>
            <rect x={pin.x - 28} y={pin.y - 14} width="56" height="24" rx="12" fill="white" />
            <text x={pin.x} y={pin.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#7C3AED">{pin.price}</text>
            <polygon points={`${pin.x},${pin.y + 14} ${pin.x - 5},${pin.y + 10} ${pin.x + 5},${pin.y + 10}`} fill="white" />
          </g>
        ))}
      </svg>
    ),
  },
  {
    title: "See Who's Already There",
    body: "Know your future roommates before you move in.",
    illustration: (
      <svg viewBox="0 0 280 200" style={{ width: "100%", height: "100%" }}>
        {/* Avatar circles */}
        {[
          { cx: 80, cy: 110, color: "#F5A623", initials: "AK", tags: [{ x: 120, y: 80, text: "🎮 Gaming" }] },
          { cx: 145, cy: 90, color: "#7C3AED", initials: "RN", tags: [{ x: 170, y: 60, text: "🎵 Music" }] },
          { cx: 210, cy: 115, color: "#F0436A", initials: "MR", tags: [{ x: 230, y: 85, text: "📚 Study" }] },
        ].map((a, i) => (
          <g key={i}>
            <circle cx={a.cx} cy={a.cy} r="32" fill={a.color} fillOpacity="0.9" />
            <text x={a.cx} y={a.cy + 6} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">{a.initials}</text>
            {a.tags.map((tag, j) => (
              <g key={j}>
                <rect x={tag.x - 38} y={tag.y - 12} width="76" height="22" rx="11" fill="white" fillOpacity="0.9" />
                <text x={tag.x} y={tag.y + 4} textAnchor="middle" fontSize="10" fontWeight="600" fill="#7C3AED">{tag.text}</text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    ),
  },
  {
    title: "Match With Your Vibe",
    body: "Filter by lifestyle, habits and interests — not just location.",
    illustration: (
      <svg viewBox="0 0 280 200" style={{ width: "100%", height: "100%" }}>
        {/* Left card */}
        <rect x="20" y="60" width="100" height="110" rx="16" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="70" cy="90" r="20" fill="#F5A623" />
        <text x="70" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">AK</text>
        <rect x="32" y="120" width="76" height="20" rx="10" fill="white" fillOpacity="0.2" />
        <text x="70" y="134" textAnchor="middle" fontSize="10" fill="white">🎮 Gaming</text>
        <rect x="32" y="146" width="76" height="20" rx="10" fill="white" fillOpacity="0.2" />
        <text x="70" y="160" textAnchor="middle" fontSize="10" fill="white">🎵 Music</text>
        {/* Heart */}
        <text x="140" y="120" textAnchor="middle" fontSize="28">💜</text>
        {/* Right card */}
        <rect x="160" y="60" width="100" height="110" rx="16" fill="white" fillOpacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="210" cy="90" r="20" fill="#7C3AED" fillOpacity="0.8" />
        <text x="210" y="96" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">RN</text>
        <rect x="172" y="120" width="76" height="20" rx="10" fill="white" fillOpacity="0.2" />
        <text x="210" y="134" textAnchor="middle" fontSize="10" fill="white">🎮 Gaming</text>
        <rect x="172" y="146" width="76" height="20" rx="10" fill="white" fillOpacity="0.2" />
        <text x="210" y="160" textAnchor="middle" fontSize="10" fill="white">💻 Tech</text>
      </svg>
    ),
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < SLIDES.length - 1) {
      setCurrent(c => c + 1);
    } else {
      localStorage.setItem("mypgmatch_onboarded", "true");
      navigate("/role-selection");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("mypgmatch_onboarded", "true");
    navigate("/role-selection");
  };

  const slide = SLIDES[current];

  return (
    <div className="fixed inset-0 flex flex-col" style={{ background: "#7C3AED", fontFamily: "Inter, sans-serif" }}>
      {/* Skip */}
      <div className="flex justify-end px-5 pt-12">
        <button onClick={handleSkip} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500 }}>
          Skip
        </button>
      </div>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-8" style={{ minHeight: 0 }}>
        {slide.illustration}
      </div>

      {/* Bottom card */}
      <div
        className="flex flex-col"
        style={{
          background: "white",
          borderRadius: "32px 32px 0 0",
          padding: "28px 24px 40px",
          gap: 16,
        }}
      >
        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                borderRadius: 100,
                background: i === current ? "#7C3AED" : "#E2E8F0",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
          {slide.title}
        </h2>
        <p style={{ fontSize: 15, color: "#64748B", lineHeight: 1.6, marginBottom: 4 }}>
          {slide.body}
        </p>

        <button
          onClick={handleNext}
          className="w-full flex items-center justify-center gap-2"
          style={{
            background: "#7C3AED",
            color: "white",
            height: 56,
            borderRadius: 100,
            fontSize: 16,
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          {current < SLIDES.length - 1 ? "Next" : "Let's Go! 🚀"}
          {current < SLIDES.length - 1 && <ChevronRight size={18} />}
        </button>

        {current === SLIDES.length - 1 && (
          <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center" }}>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth")}
              style={{ color: "#7C3AED", fontWeight: 600, background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  );
}