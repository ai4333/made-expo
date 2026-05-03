import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, Camera, Moon, Sun } from "lucide-react";

const PURPLE       = "#8A2BE2";
const PURPLE_DARK  = "#6D1CB5";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_SHADOW = "rgba(138,43,226,0.28)";

const LIGHT = {
  bg: "#FFFFFF", surface: "#F5F3FF", elevated: "#EDE9FE",
  heading: "#1A0533", body: "#3D2C6B", muted: "#8B7AA8",
  card: "#FFFFFF", cardBorder: "#E9E3F5", inputBg: "#F5F3FF",
};
const DARK = {
  bg: "#0F0F13", surface: "#1A1A24", elevated: "#22223A",
  heading: "#F3F0FF", body: "#C4B5FD", muted: "#6B6B8A",
  card: "#1A1A24", cardBorder: "#2D2D3D", inputBg: "#22223A",
};

type Step = "phone" | "aadhaar" | "aadhaar-otp" | "selfie" | "success";

export function TenantKYC() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [step, setStep] = useState<Step>("phone");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const t = darkMode ? DARK : LIGHT;

  const formatAadhaar = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 12);
    return digits.match(/.{1,4}/g)?.join(" ") || digits;
  };

  const handleAadhaarChange = (val: string) => {
    setAadhaar(formatAadhaar(val));
  };

  const Stepper = ({ current }: { current: number }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      {["Phone", "Aadhaar", "Selfie", "Done"].map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: i <= current ? PURPLE : t.surface,
            border: i <= current ? "none" : `2px solid ${t.cardBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: i <= current ? "white" : t.muted,
          }}>
            {i < current ? "✓" : i + 1}
          </div>
          {i < 3 && (
            <div style={{ flex: 1, height: 2, background: i < current ? PURPLE : t.cardBorder }} />
          )}
        </div>
      ))}
    </div>
  );

  const PrimaryBtn = ({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%", padding: 14, border: "none", borderRadius: 14,
        background: disabled ? t.surface : PURPLE,
        color: disabled ? t.muted : "white",
        fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : `0 4px 16px ${PURPLE_SHADOW}`,
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );

  /* ── Phone (Auto-skip) ───────────────────────────────────── */
  if (step === "phone") {
    setTimeout(() => setStep("aadhaar"), 1500);
    return (
      <div style={{ background: t.bg, minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif", padding: "80px 24px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", background: "rgba(16, 185, 129, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
          }}>
            <CheckCircle2 size={36} style={{ color: "#10B981" }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>
            Phone Already Verified ✓
          </h2>
          <p style={{ fontSize: 14, color: t.muted, margin: 0 }}>Continuing to Aadhaar verification...</p>
        </div>
      </div>
    );
  }

  /* ── Aadhaar Input ───────────────────────────────────────── */
  if (step === "aadhaar") {
    return (
      <div style={{ background: t.bg, minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "48px 16px 14px", background: t.card, borderBottom: `1px solid ${t.cardBorder}`,
        }}>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <ArrowLeft size={20} color={PURPLE} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>Verify Identity</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex" }}
          >
            {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
          </button>
        </div>

        <div style={{ padding: "24px 16px" }}>
          <Stepper current={1} />

          <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>Link Your Aadhaar</h2>
          <p style={{ fontSize: 14, color: t.muted, marginBottom: 20 }}>Quick 60-second verification. 100% secure.</p>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            {["256-bit Encrypted", "UIDAI Compliant", "Never Stored"].map(badge => (
              <div key={badge} style={{
                flex: 1, background: t.surface, borderRadius: 12, padding: "8px 6px", textAlign: "center",
              }}>
                <p style={{ fontSize: 10, fontWeight: 600, color: t.muted, margin: 0 }}>{badge}</p>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>
              Aadhaar Number
            </label>
            <input
              type="text"
              value={aadhaar}
              onChange={e => handleAadhaarChange(e.target.value)}
              placeholder="1234 5678 9012"
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 14, boxSizing: "border-box",
                border: `2px solid ${t.cardBorder}`, background: t.inputBg, color: t.heading,
                outline: "none", fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "0.05em",
              }}
              onFocus={e => { e.target.style.borderColor = PURPLE; e.target.style.boxShadow = "0 0 0 3px rgba(138,43,226,0.12)"; }}
              onBlur={e => { e.target.style.borderColor = t.cardBorder; e.target.style.boxShadow = "none"; }}
            />
            <p style={{ fontSize: 11, color: t.muted, margin: "6px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
              🔒 We only verify, never store your full Aadhaar number
            </p>
          </div>

          <PrimaryBtn
            label="Send OTP to Linked Mobile"
            onClick={() => setStep("aadhaar-otp")}
            disabled={aadhaar.replace(/\s/g, "").length !== 12}
          />
        </div>
      </div>
    );
  }

  /* ── Aadhaar OTP ─────────────────────────────────────────── */
  if (step === "aadhaar-otp") {
    return (
      <div style={{ background: t.bg, minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "48px 16px 14px", background: t.card, borderBottom: `1px solid ${t.cardBorder}`,
        }}>
          <button onClick={() => setStep("aadhaar")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <ArrowLeft size={20} color={PURPLE} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>Enter OTP</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex" }}
          >
            {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
          </button>
        </div>

        <div style={{ padding: "24px 16px" }}>
          <Stepper current={1} />

          <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>Verify OTP</h2>
          <p style={{ fontSize: 14, color: t.muted, marginBottom: 24 }}>
            Sent to Aadhaar-linked mobile ending in ****7890
          </p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => {
                  const newOtp = [...otp];
                  newOtp[i] = e.target.value;
                  setOtp(newOtp);
                }}
                style={{
                  width: 44, height: 54, textAlign: "center", fontSize: 24, fontWeight: 800,
                  color: t.heading, borderRadius: 12, outline: "none",
                  background: digit ? t.card : t.surface,
                  border: `2px solid ${digit ? PURPLE : t.cardBorder}`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: t.muted, marginBottom: 24 }}>
            Didn't receive? <button style={{ background: "none", border: "none", color: PURPLE, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Resend OTP</button>
          </p>

          <PrimaryBtn
            label="Verify Aadhaar"
            onClick={() => setStep("selfie")}
            disabled={otp.join("").length !== 6}
          />
        </div>
      </div>
    );
  }

  /* ── Selfie ──────────────────────────────────────────────── */
  if (step === "selfie") {
    return (
      <div style={{ background: t.bg, minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "48px 16px 14px", background: t.card, borderBottom: `1px solid ${t.cardBorder}`,
        }}>
          <button onClick={() => setStep("aadhaar-otp")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <ArrowLeft size={20} color={PURPLE} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: t.heading }}>Take Selfie</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer", display: "flex" }}
          >
            {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
          </button>
        </div>

        <div style={{ padding: "24px 16px" }}>
          <Stepper current={2} />

          <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 8px" }}>Take a Quick Selfie</h2>
          <p style={{ fontSize: 14, color: t.muted, marginBottom: 32 }}>
            We match it with your Aadhaar photo to confirm it's really you
          </p>

          {/* Camera preview */}
          <div style={{
            width: 240, height: 240, borderRadius: "50%", margin: "0 auto 32px",
            background: t.surface, border: `4px dashed ${t.cardBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Camera size={64} style={{ color: t.muted }} />
          </div>

          {/* Tips */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32, justifyContent: "center" }}>
            {["💡 Good lighting", "👤 Face centered", "🕶️ No sunglasses"].map(tip => (
              <p key={tip} style={{ fontSize: 11, color: t.muted, margin: 0, textAlign: "center" }}>{tip}</p>
            ))}
          </div>

          <PrimaryBtn label="Take Selfie" onClick={() => setStep("success")} />
        </div>
      </div>
    );
  }

  /* ── Success ─────────────────────────────────────────────── */
  return (
    <div style={{
      background: t.bg, minHeight: "100dvh", fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "40px 24px", textAlign: "center",
    }}>
      <div style={{
        width: 100, height: 100, borderRadius: "50%",
        background: "rgba(16, 185, 129, 0.12)", margin: "0 0 24px",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <CheckCircle2 size={48} style={{ color: "#10B981" }} />
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 800, color: t.heading, margin: "0 0 12px" }}>
        You're Verified! 🎉
      </h2>
      <p style={{ fontSize: 14, color: t.muted, margin: "0 0 32px", lineHeight: 1.6 }}>
        Your Verified badge is now live on your profile
      </p>

      <div style={{
        background: t.card, border: `1px solid ${t.cardBorder}`,
        borderRadius: 18, padding: "20px 24px", marginBottom: 32, width: "100%", maxWidth: 320,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: t.heading, margin: "0 0 14px" }}>Benefits Unlocked:</p>
        {[
          "Contact PG owners directly",
          "3x more roommate match visibility",
          "Priority in PG applications",
        ].map(benefit => (
          <div key={benefit} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: t.body, margin: 0 }}>{benefit}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/tenant/profile")}
        style={{
          width: "100%", maxWidth: 320, padding: 14, borderRadius: 14, border: "none",
          background: PURPLE, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer",
          boxShadow: `0 4px 16px ${PURPLE_SHADOW}`,
        }}
      >
        Back to Profile
      </button>
    </div>
  );
}
