import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import iconMark from "../../../imports/Screenshot_2026-03-29_150001.png";

export function OwnerAuth() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [pressed, setPressed] = useState(false);

  const sendOtp = () => {
    if (phone.length < 10) return;
    navigate("/owner/verify-otp", { state: { phone } });
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "#FFFFFF",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Top section — logo + branding */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 42%",
        paddingTop: 56,
        paddingLeft: 24,
        paddingRight: 24,
      }}>
        {/* Logo mark */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 12px 32px rgba(124,58,237,0.25)",
            marginBottom: 18,
          }}>
            <img
              src={iconMark}
              alt="Staazy"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#1A0533",
            margin: "0 0 8px",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Welcome to Staazy 🏢
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: 14,
            color: "#8B7AA8",
            margin: 0,
            textAlign: "center",
          }}
        >
          Manage your PGs with ease
        </motion.p>
      </div>

      {/* Middle section — phone input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          flex: "0 0 auto",
          paddingTop: 8,
          paddingLeft: 24,
          paddingRight: 24,
        }}
      >
        <label style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#8B7AA8",
          letterSpacing: 1.2,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 10,
        }}>
          Mobile Number
        </label>

        {/* Phone field */}
        <div
          style={{
            display: "flex",
            borderRadius: 16,
            overflow: "hidden",
            border: "2px solid #E9E3F5",
            background: "#F5F3FF",
            height: 56,
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
          onFocusCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#7C3AED";
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 0 3px rgba(124,58,237,0.10)";
          }}
          onBlurCapture={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "#E9E3F5";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <div style={{
            width: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#EDE9FE",
            borderRight: "1px solid #E9E3F5",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#3D2C6B" }}>
              🇮🇳 +91
            </span>
          </div>
          <input
            type="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            maxLength={10}
            style={{
              flex: 1,
              padding: "0 18px",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 18,
              fontWeight: 700,
              color: "#1A0533",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 1,
            }}
          />
        </div>

        {/* Helper text */}
        <p style={{
          fontSize: 12,
          color: "#8B7AA8",
          marginTop: 10,
          marginBottom: 22,
          paddingLeft: 2,
        }}>
          Enter the number registered with your PG owner account
        </p>

        <button
          onClick={sendOtp}
          disabled={phone.length < 10}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          style={{
            width: "100%",
            height: 56,
            border: "none",
            borderRadius: 28,
            background: phone.length < 10 ? "#F5F3FF" : "#7C3AED",
            color: phone.length < 10 ? "#8B7AA8" : "white",
            fontSize: 15,
            fontWeight: 700,
            cursor: phone.length < 10 ? "default" : "pointer",
            boxShadow:
              phone.length < 10 ? "none" : "0 6px 20px rgba(124,58,237,0.25)",
            transform: pressed && phone.length >= 10 ? "scale(0.97)" : "scale(1)",
            transition: "transform 0.12s ease, box-shadow 0.15s ease",
            letterSpacing: 0.2,
          }}
        >
          Send OTP →
        </button>
      </motion.div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          padding: "0 24px 32px",
          textAlign: "center",
        }}
      >
        <p style={{
          fontSize: 12,
          color: "#8B7AA8",
          margin: 0,
        }}>
          By continuing, you agree to our{" "}
          <span style={{ color: "#7C3AED", fontWeight: 600 }}>
            Terms & Privacy Policy
          </span>
        </p>
      </motion.div>
    </div>
  );
}