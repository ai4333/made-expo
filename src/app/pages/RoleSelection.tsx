import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
// Icon-only mark (no text) — used in headers
import iconMark from "../../imports/Screenshot_2026-03-29_150001.png";

export function RoleSelection() {
  const navigate = useNavigate();
  const [tenantHover, setTenantHover] = useState(false);
  const [ownerHover, setOwnerHover]   = useState(false);

  return (
    <div
      className="fixed inset-0 flex flex-col"
      style={{ background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}
    >
      {/* ── PURPLE GRADIENT HEADER ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 60%, #9333EA 100%)",
          borderRadius: "0 0 36px 36px",
          paddingTop: 52,
          paddingBottom: 52,
          paddingLeft: 24,
          paddingRight: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Icon mark only — no text in logo image */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
          style={{ marginBottom: 14 }}
        >
          <div style={{
            width: 64, height: 64,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 10px 30px rgba(0,0,0,0.28), 0 0 0 2px rgba(255,255,255,0.18)",
          }}>
            <img
              src={iconMark}
              alt="Staazy icon"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: 22, fontWeight: 800, color: "white", letterSpacing: "-0.4px", margin: "0 0 4px" }}>
            Staazy
          </p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.78)", margin: 0 }}>
            Who are you?
          </p>
        </motion.div>
      </div>

      {/* ── ROLE CARDS ── */}
      <div className="flex flex-col gap-3 px-5" style={{ marginTop: -24 }}>

        {/* Tenant Card — navigates to /auth */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 280, damping: 22 }}
        >
          <button
            onClick={() => navigate("/auth")}
            onMouseEnter={() => setTenantHover(true)}
            onMouseLeave={() => setTenantHover(false)}
            className="w-full text-left active:scale-[0.98] transition-transform"
            style={{
              background: "white",
              borderRadius: 22,
              padding: "20px 20px",
              border: tenantHover ? "2px solid #7C3AED" : "2px solid #EDE9FE",
              boxShadow: tenantHover
                ? "0 12px 40px rgba(124,58,237,0.2)"
                : "0 6px 24px rgba(124,58,237,0.1)",
              cursor: "pointer",
              position: "relative",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            {/* Most Popular badge */}
            <div style={{ position: "absolute", top: -11, right: 18 }}>
              <span style={{
                background: "#FFF7ED", color: "#D97706",
                border: "1px solid #FDE68A",
                borderRadius: 100, padding: "3px 12px",
                fontSize: 11, fontWeight: 700,
              }}>
                Most Popular
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 54, height: 54, borderRadius: 16,
                background: "#EDE9FE",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 26,
              }}>
                🏠
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: "0 0 3px" }}>
                  I'm Looking for a PG
                </p>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                  Find rooms, match with roommates
                </p>
              </div>
              <ChevronRight size={20} color="#7C3AED" style={{ flexShrink: 0 }} />
            </div>

            {/* Feature pills */}
            <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
              {["🔍 Browse PGs", "🤝 Find Roommates", "✅ Zero Brokerage"].map((f) => (
                <span key={f} style={{
                  fontSize: 11, fontWeight: 500,
                  background: "#F5F3FF", color: "#7C3AED",
                  border: "1px solid #DDD6FE",
                  borderRadius: 100, padding: "3px 10px",
                }}>
                  {f}
                </span>
              ))}
            </div>
          </button>
        </motion.div>

        {/* Owner Card — navigates to /owner/auth */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 22 }}
        >
          <button
            onClick={() => navigate("/owner/auth")}
            onMouseEnter={() => setOwnerHover(true)}
            onMouseLeave={() => setOwnerHover(false)}
            className="w-full text-left active:scale-[0.98] transition-transform"
            style={{
              background: "white",
              borderRadius: 22,
              padding: "20px 20px",
              border: ownerHover ? "2px solid #10B981" : "2px solid #E2E8F0",
              boxShadow: ownerHover
                ? "0 12px 40px rgba(16,185,129,0.15)"
                : "0 4px 16px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 54, height: 54, borderRadius: 16,
                background: "#ECFDF5",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontSize: 26,
              }}>
                🏢
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: "0 0 3px" }}>
                  I Own a PG
                </p>
                <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
                  Manage tenants, collect rent
                </p>
              </div>
              <ChevronRight size={20} color="#10B981" style={{ flexShrink: 0 }} />
            </div>

            <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
              {["📋 Manage Tenants", "💰 Collect Rent", "📊 Analytics"].map((f) => (
                <span key={f} style={{
                  fontSize: 11, fontWeight: 500,
                  background: "#F0FDF4", color: "#059669",
                  border: "1px solid #BBF7D0",
                  borderRadius: 100, padding: "3px 10px",
                }}>
                  {f}
                </span>
              ))}
            </div>
          </button>
        </motion.div>
      </div>

      {/* ── FOOTER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        style={{ marginTop: "auto", textAlign: "center", paddingBottom: 32, paddingLeft: 24, paddingRight: 24 }}
      >
        <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 12px" }}>
          Already have an account?{" "}
          <button
            onClick={() => navigate("/auth")}
            style={{
              background: "none", border: "none",
              color: "#7C3AED", fontWeight: 700,
              cursor: "pointer", fontSize: 13,
              textDecoration: "underline",
              textDecorationColor: "rgba(124,58,237,0.4)",
            }}
          >
            Log in →
          </button>
        </p>
        <p style={{ fontSize: 11, color: "#CBD5E1", margin: 0 }}>
          By continuing you agree to our{" "}
          <span style={{ color: "#7C3AED", textDecoration: "underline", cursor: "pointer" }}>
            Terms &amp; Privacy Policy
          </span>
        </p>
      </motion.div>
    </div>
  );
}