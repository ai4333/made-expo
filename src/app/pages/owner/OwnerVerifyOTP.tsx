import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, CheckCircle } from "lucide-react";

export function OwnerVerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [shaking, setShaking] = useState(false);
  const [focusedOtp, setFocusedOtp] = useState<number | null>(null);
  const [verified, setVerified] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend timer
  useEffect(() => {
    if (timer > 0 && !verified) {
      const id = setTimeout(() => setTimer((v) => v - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timer, verified]);

  // Auto-route after success
  useEffect(() => {
    if (verified) {
      const id = setTimeout(() => {
        navigate("/owner/register");
      }, 1200);
      return () => clearTimeout(id);
    }
  }, [verified, navigate]);

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = Array.from({ length: 6 }, (_, idx) =>
      idx === i ? val : otp[idx]
    );
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join("").length < 6) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    setVerified(true);
  };

  if (verified) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#FFFFFF",
          gap: 16,
          padding: "0 24px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            duration: 0.5,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "rgba(124,58,237,0.1)",
              border: "3px solid #7C3AED",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircle size={44} color="#7C3AED" strokeWidth={2.5} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          style={{ textAlign: "center" }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#1A0533",
              margin: "0 0 6px",
            }}
          >
            Verified! ✓
          </p>
          <p style={{ fontSize: 14, color: "#8B7AA8", margin: 0 }}>
            Setting up your dashboard…
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "52px 24px 32px",
        background: "#FFFFFF",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
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

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#7C3AED",
          padding: 0,
          fontSize: 14,
          fontWeight: 700,
          marginBottom: 36,
          alignSelf: "flex-start",
        }}
      >
        <ChevronLeft size={18} color="#7C3AED" /> Change Number
      </button>

      {/* Logo small */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 15,
            background: "linear-gradient(135deg, #7C3AED 0%, rgba(124,58,237,0.8) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(124,58,237,0.25)",
            marginBottom: 20,
          }}
        >
          <span style={{ fontSize: 22 }}>🏢</span>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: "#1A0533",
          margin: "0 0 8px",
        }}
      >
        Enter OTP
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 14, color: "#8B7AA8", margin: "0 0 32px" }}
      >
        Sent to{" "}
        <span style={{ fontWeight: 700, color: "#3D2C6B" }}>
          +91 ●●●●●● {phone.slice(-4)}
        </span>
      </motion.p>

      {/* 6 OTP boxes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        style={{
          display: "flex",
          gap: 10,
          justifyContent: "center",
          marginBottom: 24,
          animation: shaking ? "shake 0.4s ease" : "none",
        }}
      >
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              otpRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(i, e)}
            onFocus={() => setFocusedOtp(i)}
            onBlur={() => setFocusedOtp(null)}
            style={{
              width: 46,
              height: 56,
              textAlign: "center",
              fontSize: 26,
              fontWeight: 800,
              color: "#1A0533",
              borderRadius: 14,
              outline: "none",
              background: digit ? "#FFFFFF" : "#F5F3FF",
              border: `2px solid ${
                focusedOtp === i ? "#7C3AED" : digit ? "#7C3AED" : "#E9E3F5"
              }`,
              boxShadow:
                focusedOtp === i ? "0 0 0 3px rgba(124,58,237,0.10)" : "none",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
        ))}
      </motion.div>

      {/* Resend timer */}
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          color: "#8B7AA8",
          marginBottom: 28,
        }}
      >
        {timer > 0 ? (
          <>
            Resend OTP in{" "}
            <span style={{ fontWeight: 700, color: "#7C3AED" }}>{timer}s</span>
          </>
        ) : (
          <button
            onClick={() => {
              setTimer(30);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#7C3AED",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Resend OTP
          </button>
        )}
      </p>

      <button
        onClick={handleVerify}
        style={{
          width: "100%",
          height: 56,
          border: "none",
          borderRadius: 28,
          background: "#7C3AED",
          color: "white",
          fontSize: 15,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(124,58,237,0.25)",
          transition: "transform 0.12s ease",
        }}
        onMouseDown={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLButtonElement).style.transform = "scale(1)";
        }}
      >
        Verify & Continue →
      </button>
    </div>
  );
}
