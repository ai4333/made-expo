import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// Full logo (icon + "Staazy" text) — used ONLY on splash
import fullLogoImg from "../../imports/Screenshot_2026-03-29_150001.png";

type Phase = 0 | 1 | 2 | 3 | 4 | 5;

export function SplashScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 420),
      setTimeout(() => setPhase(3), 850),
      setTimeout(() => setPhase(4), 1200),
      setTimeout(() => setPhase(5), 1550),
      setTimeout(() => setExit(true), 2100),
      setTimeout(() => {
        const onboarded = localStorage.getItem("mypgmatch_onboarded");
        navigate(onboarded ? "/role-selection" : "/onboarding", { replace: true });
      }, 2550),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "linear-gradient(160deg, #5B21B6 0%, #7C3AED 60%, #9333EA 100%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "Inter, sans-serif",
        opacity: exit ? 0 : 1,
        transition: "opacity 0.4s ease",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes logoSpring {
          0%   { transform: scale(0.2) rotate(-8deg); opacity: 0; }
          55%  { transform: scale(1.1) rotate(2deg);  opacity: 1; }
          78%  { transform: scale(0.95) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg);    opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(22px); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1);   opacity: 0.6; }
          50%       { transform: scale(1.5); opacity: 1; }
        }
      `}</style>

      {/* Ambient radial glow */}
      <div style={{
        position: "absolute",
        width: 300, height: 300,
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
        opacity: phase >= 1 ? 1 : 0,
        transition: "opacity 0.5s ease",
      }} />

      {/* ── FULL LOGO (icon + Staazy text) ── */}
      <div
        style={{
          opacity: phase >= 2 ? 1 : 0,
          animation: phase >= 2 ? "logoSpring 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none",
          marginBottom: 28,
        }}
      >
        <img
          src={fullLogoImg}
          alt="Staazy"
          style={{
            width: 160,
            height: "auto",
            display: "block",
            // The full image already has the icon + "Staazy" text
          }}
        />
      </div>

      {/* ── TAGLINE ── */}
      <div style={{
        opacity: phase >= 4 ? 1 : 0,
        animation: phase >= 4 ? "slideUp 0.4s ease forwards" : "none",
        marginBottom: 36,
      }}>
        <p style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.72)",
          textAlign: "center",
          letterSpacing: "0.02em",
          margin: 0,
        }}>
          Find your PG. Find your people.
        </p>
      </div>

      {/* ── PULSING DOTS ── */}
      <div style={{
        display: "flex", gap: 10,
        opacity: phase >= 5 ? 1 : 0,
        animation: phase >= 5 ? "fadeIn 0.3s ease forwards" : "none",
      }}>
        {[
          { color: "#F5A623", delay: "0ms" },
          { color: "#F0436A", delay: "200ms" },
          { color: "#10B981", delay: "400ms" },
        ].map((dot, i) => (
          <div
            key={i}
            style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: dot.color,
              animation: phase >= 5
                ? `pulseDot 1.1s ease-in-out ${dot.delay} infinite`
                : "none",
            }}
          />
        ))}
      </div>

      {/* ── Version label ── */}
      <p style={{
        position: "absolute", bottom: 28,
        fontSize: 11,
        color: "rgba(255,255,255,0.28)",
        letterSpacing: "0.06em",
        margin: 0,
      }}>
        STAAZY · PG MATCH
      </p>
    </div>
  );
}