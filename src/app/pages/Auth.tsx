import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Camera, CheckCircle } from "lucide-react";
import iconMark from "../../imports/Screenshot_2026-03-29_150001.png";

// ─── Role config ──────────────────────────────────────────
const ROLE_CONFIG = {
  tenant: {
    primary:    "#7C3AED",
    primaryGhost: "rgba(124,58,237,0.10)",
    primaryShadow: "rgba(124,58,237,0.25)",
    headline:   "Welcome to Staazy 👋",
    subtext:    "Find your perfect PG and roommate",
    destination: null as string | null, // continues to profile setup
  },
  owner: {
    primary:    "#7C3AED",
    primaryGhost: "rgba(124,58,237,0.10)",
    primaryShadow: "rgba(124,58,237,0.25)",
    headline:   "Welcome to Staazy 🏢",
    subtext:    "Manage your PGs with ease",
    destination: "/owner",
  },
};

// ─── Theme ────────────────────────────────────────────────
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

// ─── Vibe chips ───────────────────────────────────────────
const lifestyleChips = ["Early Bird 🌅","Night Owl 🦉","Homebody 🏠","Social Butterfly 🦋","Gym Freak 💪","Foodie 🍕","Traveller ✈️","Minimalist"];
const interestChips  = ["Music 🎵","Gaming 🎮","Reading 📚","Movies 🎬","Art 🎨","Fitness 🏋️","Cooking 🍳","Tech 💻","Sports ⚽","Dancing 💃"];
const workChips      = ["Student 🎓","Working Professional 💼","Freelancer 🖥️","Entrepreneur 🚀"];

type Step = "login" | "otp" | "success" | "profile1" | "profile2" | "profile3";

export function Auth() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleKey = (searchParams.get("role") === "owner" ? "owner" : "tenant") as "tenant" | "owner";
  const RC = ROLE_CONFIG[roleKey];
  const P  = RC.primary;
  const PG = RC.primaryGhost;
  const PS = RC.primaryShadow;

  const [step, setStep]         = useState<Step>("login");
  const [phone, setPhone]       = useState("");
  const [otp, setOtp]           = useState(["","","","","",""]);
  const [timer, setTimer]       = useState(30);
  const [shaking, setShaking]   = useState(false);
  const [focusedOtp, setFocusedOtp] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [profileData, setProfileData]   = useState({
    name: "", age: "", gender: "", photo: null as string | null,
    city: "Bangalore", budgetMin: 5000, budgetMax: 15000, roomType: "Any",
  });
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const t = LIGHT; // always light for auth screens

  // Resend timer
  useEffect(() => {
    if (step === "otp" && timer > 0) {
      const id = setTimeout(() => setTimer(v => v - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [step, timer]);

  // Auto-route after success animation (800ms)
  useEffect(() => {
    if (step === "success") {
      const id = setTimeout(() => {
        if (RC.destination) {
          navigate(RC.destination);
        } else {
          setStep("profile1");
        }
      }, 900);
      return () => clearTimeout(id);
    }
  }, [step]);

  // ─── OTP helpers ─────────────────────────────────────────
  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = Array.from({ length: 6 }, (_, idx) => (idx === i ? val : otp[idx]) || "");
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleVerify = () => {
    if (otp.join("").length < 6) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setStep("success");
  };

  const sendOtp = () => {
    if (phone.length < 10) return;
    setStep("otp");
    setTimer(30);
  };

  // ─── Shared sub-components ───────────────────────────────
  const profileComplete = Math.min(100, 30 + selectedTags.length * 5 + (profileData.name ? 10 : 0) + (profileData.photo ? 15 : 0));

  const toggleTag = (tag: string) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(x => x !== tag) : prev.length < 8 ? [...prev, tag] : prev
    );

  const ProgressBar = ({ current }: { current: number }) => (
    <div style={{ display: "flex", gap: 6, flex: 1 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{
          height: 5, flex: 1, borderRadius: 10,
          background: i <= current ? P : t.cardBorder,
          transition: "background 0.2s",
        }} />
      ))}
    </div>
  );

  const PrimaryBtn = ({
    label, onClick, disabled,
  }: { label: string; onClick: () => void; disabled?: boolean }) => {
    const [pressed, setPressed] = useState(false);
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        style={{
          width: "100%", height: 56, border: "none", borderRadius: 28,
          background: disabled ? t.surface : P,
          color: disabled ? t.muted : "white",
          fontSize: 15, fontWeight: 700,
          cursor: disabled ? "default" : "pointer",
          boxShadow: disabled ? "none" : `0 6px 20px ${PS}`,
          transform: pressed && !disabled ? "scale(0.97)" : "scale(1)",
          transition: "transform 0.12s ease, box-shadow 0.15s ease",
          letterSpacing: 0.2,
        }}
      >
        {label}
      </button>
    );
  };

  // ─── STEP: Login ──────────────────────────────────────────
  const renderLogin = () => (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: "100%",
      padding: "0 24px 32px", background: t.bg, overflowY: "auto",
    }}>
      {/* Top section — logo + branding */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", flex: "0 0 42%", paddingTop: 56,
      }}>
        {/* Logo mark — icon only, no text */}
        <div style={{
          width: 72, height: 72, borderRadius: 22,
          overflow: "hidden",
          boxShadow: `0 12px 32px ${PS}`,
          marginBottom: 18,
        }}>
          <img
            src={iconMark}
            alt="Staazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h1 style={{
          fontSize: 22, fontWeight: 900, color: t.heading,
          margin: "0 0 8px", textAlign: "center", lineHeight: 1.2,
        }}>
          {RC.headline}
        </h1>
        <p style={{ fontSize: 14, color: t.muted, margin: 0, textAlign: "center" }}>
          {RC.subtext}
        </p>
      </div>

      {/* Middle section — phone input */}
      <div style={{ flex: "0 0 auto", paddingTop: 8 }}>
        <label style={{
          fontSize: 11, fontWeight: 700, color: t.muted, letterSpacing: 1.2,
          textTransform: "uppercase", display: "block", marginBottom: 10,
        }}>
          Mobile Number
        </label>

        {/* Phone field */}
        <div
          style={{
            display: "flex", borderRadius: 16, overflow: "hidden",
            border: `2px solid ${t.cardBorder}`, background: t.inputBg, height: 56,
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocusCapture={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = P;
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 3px ${PG}`;
          }}
          onBlurCapture={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder;
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <div style={{
            width: 80, display: "flex", alignItems: "center", justifyContent: "center",
            background: t.surface, borderRight: `1px solid ${t.cardBorder}`, flexShrink: 0,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: t.body }}>🇳 +91</span>
          </div>
          <input
            type="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            maxLength={10}
            style={{
              flex: 1, padding: "0 18px", background: "transparent",
              border: "none", outline: "none",
              fontSize: 18, fontWeight: 700, color: t.heading,
              fontFamily: "'DM Sans', sans-serif", letterSpacing: 1,
            }}
          />
        </div>

        {/* Helper text */}
        <p style={{
          fontSize: 12, color: t.muted, marginTop: 10, marginBottom: 22,
          paddingLeft: 2,
        }}>
          {roleKey === "owner"
            ? "Enter the number registered with your PG OS account"
            : "💡 Use the number your PG owner registered for you"}
        </p>

        <PrimaryBtn
          label="Send OTP →"
          onClick={sendOtp}
          disabled={phone.length < 10}
        />
      </div>
    </div>
  );

  // ─── STEP: OTP ────────────────────────────────────────────
  const renderOTP = () => (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "52px 24px 32px", background: t.bg,
    }}>
      {/* Back */}
      <button
        onClick={() => setStep("login")}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          background: "none", border: "none", cursor: "pointer",
          color: P, padding: 0, fontSize: 14, fontWeight: 700,
          marginBottom: 36, alignSelf: "flex-start",
        }}
      >
        <ChevronLeft size={18} color={P} /> Change Number
      </button>

      {/* Logo small */}
      <div style={{
        width: 48, height: 48, borderRadius: 15,
        background: `linear-gradient(135deg, ${P} 0%, ${P}BB 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `0 6px 18px ${PS}`,
        marginBottom: 20,
      }}>
        <span style={{ fontSize: 22 }}>{roleKey === "owner" ? "🏢" : "🏡"}</span>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 900, color: t.heading, margin: "0 0 8px" }}>
        Enter OTP
      </h1>
      <p style={{ fontSize: 14, color: t.muted, margin: "0 0 32px" }}>
        Sent to{" "}
        <span style={{ fontWeight: 700, color: t.body }}>
          +91 ●●●●●● {phone.slice(-4)}
        </span>
      </p>

      {/* 6 OTP boxes */}
      <div style={{
        display: "flex", gap: 10, justifyContent: "center", marginBottom: 24,
        animation: shaking ? "shake 0.4s ease" : "none",
      }}>
        <style>{`
          @keyframes shake {
            0%,100% { transform: translateX(0); }
            15% { transform: translateX(-6px); }
            30% { transform: translateX(6px); }
            45% { transform: translateX(-4px); }
            60% { transform: translateX(4px); }
            75% { transform: translateX(-2px); }
          }
        `}</style>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { otpRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleOtpChange(i, e.target.value)}
            onKeyDown={e => handleOtpKeyDown(i, e)}
            onFocus={() => setFocusedOtp(i)}
            onBlur={() => setFocusedOtp(null)}
            style={{
              width: 46, height: 56, textAlign: "center",
              fontSize: 26, fontWeight: 800, color: t.heading,
              borderRadius: 14, outline: "none",
              background: digit ? t.card : t.surface,
              border: `2px solid ${
                focusedOtp === i ? P : digit ? P : t.cardBorder
              }`,
              boxShadow: focusedOtp === i ? `0 0 0 3px ${PG}` : "none",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        ))}
      </div>

      {/* Resend timer */}
      <p style={{ textAlign: "center", fontSize: 13, color: t.muted, marginBottom: 28 }}>
        {timer > 0 ? (
          <>Resend OTP in <span style={{ fontWeight: 700, color: P }}>{timer}s</span></>
        ) : (
          <button
            onClick={() => { setTimer(30); }}
            style={{
              background: "none", border: "none", color: P,
              fontWeight: 700, cursor: "pointer", fontSize: 13,
            }}
          >
            Resend OTP
          </button>
        )}
      </p>

      <PrimaryBtn label="Verify & Enter →" onClick={handleVerify} />
    </div>
  );

  // ─── STEP: Success ────────────────────────────────────────
  const renderSuccess = () => (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100%", background: t.bg,
      gap: 16, padding: "0 24px",
    }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, duration: 0.5 }}
      >
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: `${P}18`, border: `3px solid ${P}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CheckCircle size={44} color={P} strokeWidth={2.5} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        style={{ textAlign: "center" }}
      >
        <p style={{ fontSize: 22, fontWeight: 900, color: t.heading, margin: "0 0 6px" }}>
          Verified! ✓
        </p>
        <p style={{ fontSize: 14, color: t.muted, margin: 0 }}>
          {roleKey === "owner" ? "Opening your dashboard…" : "Setting up your profile…"}
        </p>
      </motion.div>
    </div>
  );

  // ─── STEP: Profile 1 (Basic Info) ────────────────────────
  const renderProfile1 = () => (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "48px 24px 32px", background: t.bg, overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={() => setStep("otp")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <ChevronLeft size={20} color={P} />
        </button>
        <ProgressBar current={1} />
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 4px" }}>Basic Info</h2>
      <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>Tell us a bit about yourself</p>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
        <div style={{ position: "relative" }}>
          <div style={{
            width: 88, height: 88, borderRadius: "50%",
            background: t.surface, border: `2px dashed ${t.cardBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          }}>
            {profileData.photo
              ? <img src={profileData.photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="profile" />
              : <Camera size={28} color={t.muted} />}
          </div>
          <button
            onClick={() => setProfileData(p => ({ ...p, photo: "https://images.unsplash.com/photo-1770564513018-79915efba870?w=200" }))}
            style={{
              position: "absolute", bottom: -2, right: -2, width: 30, height: 30,
              background: P, borderRadius: "50%", border: `2px solid ${t.bg}`,
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            }}
          >
            <Camera size={13} color="white" />
          </button>
        </div>
        <p style={{ fontSize: 12, color: t.muted, marginTop: 8 }}>This helps your future roommates know you.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {[
          { label: "Full Name", key: "name", type: "text", placeholder: "Your name" },
          { label: "Age", key: "age", type: "number", placeholder: "18+" },
        ].map(f => (
          <div key={f.key}>
            <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 6 }}>{f.label}</label>
            <input
              type={f.type}
              placeholder={f.placeholder}
              value={(profileData as any)[f.key]}
              onChange={e => setProfileData(p => ({ ...p, [f.key]: e.target.value }))}
              style={{
                width: "100%", padding: "12px 16px", borderRadius: 14, boxSizing: "border-box",
                border: `2px solid ${t.cardBorder}`, background: t.inputBg, color: t.heading,
                outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onFocus={e => { e.target.style.borderColor = P; e.target.style.boxShadow = `0 0 0 3px ${PG}`; }}
              onBlur={e => { e.target.style.borderColor = t.cardBorder; e.target.style.boxShadow = "none"; }}
            />
          </div>
        ))}

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>Gender</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["Male", "Female", "Other"].map(g => (
              <button
                key={g}
                onClick={() => setProfileData(p => ({ ...p, gender: g }))}
                style={{
                  flex: 1, padding: "10px 6px", borderRadius: 12, fontSize: 13, fontWeight: 600,
                  border: `2px solid ${profileData.gender === g ? P : t.cardBorder}`,
                  background: profileData.gender === g ? PG : t.inputBg,
                  color: profileData.gender === g ? P : t.muted,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >{g}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <PrimaryBtn label="Continue" onClick={() => setStep("profile2")} />
      </div>
    </div>
  );

  // ─── STEP: Profile 2 (Preferences) ───────────────────────
  const renderProfile2 = () => (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "48px 24px 32px", background: t.bg, overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={() => setStep("profile1")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <ChevronLeft size={20} color={P} />
        </button>
        <ProgressBar current={2} />
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 4px" }}>Your Preferences</h2>
      <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>Help us find the right PG for you</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>City</label>
          <select style={{
            width: "100%", padding: "12px 16px", borderRadius: 14,
            border: `2px solid ${t.cardBorder}`, background: t.inputBg, color: t.heading,
            outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            transition: "border-color 0.15s",
          }}
            onFocus={e => e.target.style.borderColor = P}
            onBlur={e => e.target.style.borderColor = t.cardBorder}
          >
            {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>
            Budget:{" "}
            <span style={{ color: P, fontWeight: 700 }}>₹{profileData.budgetMin.toLocaleString()} – ₹{profileData.budgetMax.toLocaleString()}/mo</span>
          </label>
          <div style={{ background: t.surface, borderRadius: 14, padding: "14px 16px" }}>
            <input
              type="range" min={3000} max={50000} step={500}
              value={profileData.budgetMax}
              onChange={e => setProfileData(p => ({ ...p, budgetMax: +e.target.value }))}
              style={{ width: "100%", accentColor: P }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ fontSize: 11, color: t.muted }}>₹3,000</span>
              <span style={{ fontSize: 11, color: t.muted }}>₹50,000</span>
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: t.muted, display: "block", marginBottom: 8 }}>Room Type</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Single", "Shared 2-person", "Shared 3-person", "Any"].map(r => (
              <button key={r}
                onClick={() => setProfileData(p => ({ ...p, roomType: r }))}
                style={{
                  padding: "10px 8px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                  border: `2px solid ${profileData.roomType === r ? P : t.cardBorder}`,
                  background: profileData.roomType === r ? PG : t.inputBg,
                  color: profileData.roomType === r ? P : t.muted,
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >{r}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <PrimaryBtn label="Continue" onClick={() => setStep("profile3")} />
      </div>
    </div>
  );

  // ─── STEP: Profile 3 (Vibe Tags) ─────────────────────────
  const renderProfile3 = () => (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      padding: "48px 24px 32px", background: t.bg, overflowY: "auto",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button onClick={() => setStep("profile2")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
          <ChevronLeft size={20} color={P} />
        </button>
        <ProgressBar current={3} />
      </div>

      <h2 style={{ fontSize: 20, fontWeight: 800, color: t.heading, margin: "0 0 4px" }}>Tell people what you're like 🎯</h2>
      <p style={{ fontSize: 12, color: t.muted, marginBottom: 10 }}>Select up to 8 tags total</p>

      <div style={{
        background: PG, borderRadius: 12, padding: "10px 14px",
        marginBottom: 16, display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ flex: 1, background: `${P}22`, borderRadius: 10, height: 6, overflow: "hidden" }}>
          <div style={{ background: P, height: "100%", width: `${profileComplete}%`, borderRadius: 10, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: P }}>{profileComplete}%</span>
      </div>

      {[["My Lifestyle", lifestyleChips], ["I'm Into", interestChips], ["Study / Work", workChips]].map(([label, chips]) => (
        <div key={label as string} style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: t.body, marginBottom: 10 }}>{label as string}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {(chips as string[]).map(chip => {
              const sel = selectedTags.includes(chip);
              return (
                <button key={chip} onClick={() => toggleTag(chip)} style={{
                  padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                  border: `2px solid ${sel ? P : t.cardBorder}`,
                  background: sel ? P : t.inputBg,
                  color: sel ? "white" : t.muted,
                  cursor: "pointer", transition: "all 0.15s",
                  boxShadow: sel ? `0 2px 8px ${PS}` : "none",
                }}>{chip}</button>
              );
            })}
          </div>
        </div>
      ))}

      <p style={{ textAlign: "center", fontSize: 13, color: t.muted, marginBottom: 16 }}>
        {selectedTags.length}/8 tags selected
      </p>

      <PrimaryBtn label="Let's Go! 🚀" onClick={() => navigate("/tenant")} />
    </div>
  );

  // ─── Step map ──────────────────────────────────────────────
  const stepMap: Record<Step, () => JSX.Element> = {
    login:    renderLogin,
    otp:      renderOTP,
    success:  renderSuccess,
    profile1: renderProfile1,
    profile2: renderProfile2,
    profile3: renderProfile3,
  };

  // Direction: forward or backward
  const STEP_ORDER: Step[] = ["login","otp","success","profile1","profile2","profile3"];
  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div style={{ height: "100dvh", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          style={{ height: "100%" }}
        >
          {stepMap[step]()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}