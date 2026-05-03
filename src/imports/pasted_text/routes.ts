CRITICAL FIX — navigation is completely broken. 
Apply ALL of the following changes immediately.
This is a routing repair, not a redesign.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 1 — REWRITE src/app/routes.ts COMPLETELY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the entire contents of src/app/routes.ts 
with this exact routing structure.
Import every component listed. Do not skip any.

import { lazy, Suspense } from "react";
import { RouteObject, Navigate } from "react-router-dom";

// Pre-screens
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import RoleSelection from "./pages/RoleSelection";
import Auth from "./pages/Auth";

// Tenant screens
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import PGDetail from "./pages/PGDetail";
import MyPGPage from "./pages/MyPGPage";
import MyProfile from "./pages/MyProfile";
import ConnectHub from "./pages/ConnectHub";
import StudentMarketplace from "./pages/StudentMarketplace";
import SavedPGs from "./pages/SavedPGs";
import Filters from "./pages/Filters";
import RoommateDiscovery from "./pages/RoommateDiscovery";
import RoommateProfile from "./pages/RoommateProfile";
import VisitScheduling from "./pages/VisitScheduling";
import TenantKYC from "./pages/TenantKYC";
import Notifications from "./pages/Notifications";
import TenantComplaints from "./pages/TenantComplaints";
import MapDiscovery from "./pages/MapDiscovery";
import Chat from "./pages/Chat";
import TenantMessages from "./pages/TenantMessages";

// Owner screens
import OwnerLayout from "./pages/owner/OwnerLayout";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerOnboarding from "./pages/owner/OwnerOnboarding";
import PGList from "./pages/owner/PGList";
import PGView from "./pages/owner/PGView";
import AddTenant from "./pages/owner/AddTenant";
import TenantDetail from "./pages/owner/TenantDetail";
import RentOverview from "./pages/owner/RentOverview";
import ExpenseTracker from "./pages/owner/ExpenseTracker";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerKYC from "./pages/owner/OwnerKYC";
import OwnerComplaints from "./pages/owner/OwnerComplaints";
import OwnerMessages from "./pages/owner/OwnerMessages";
import OwnerNotifications from "./pages/owner/OwnerNotifications";
import WhatsAppHub from "./pages/owner/WhatsAppHub";

const routes: RouteObject[] = [
  // Entry point
  { path: "/", element: <SplashScreen /> },
  { path: "/splash", element: <SplashScreen /> },

  // Pre-auth flow
  { path: "/onboarding", element: <Onboarding /> },
  { path: "/role-selection", element: <RoleSelection /> },

  // Tenant auth
  { path: "/auth", element: <Auth /> },

  // Tenant app — all nested under MainLayout
  {
    path: "/tenant",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "pg/:id", element: <PGDetail /> },
      { path: "my-pg", element: <MyPGPage /> },
      { path: "profile", element: <MyProfile /> },
      { path: "connect", element: <ConnectHub /> },
      { path: "explore", element: <StudentMarketplace /> },
      { path: "saved", element: <SavedPGs /> },
      { path: "filters", element: <Filters /> },
      { path: "roommates", element: <RoommateDiscovery /> },
      { path: "roommate/:id", element: <RoommateProfile /> },
      { path: "visit/:pgId", element: <VisitScheduling /> },
      { path: "kyc", element: <TenantKYC /> },
      { path: "notifications", element: <Notifications /> },
      { path: "complaints", element: <TenantComplaints /> },
      { path: "map", element: <MapDiscovery /> },
      { path: "chat", element: <Chat /> },
      { path: "messages", element: <TenantMessages /> },
    ],
  },

  // Owner auth
  { path: "/owner/auth", element: <OwnerOnboarding /> },

  // Owner app — all nested under OwnerLayout
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      { index: true, element: <OwnerDashboard /> },
      { path: "dashboard", element: <OwnerDashboard /> },
      { path: "pgs", element: <PGList /> },
      { path: "pg/:id", element: <PGView /> },
      { path: "add-tenant", element: <AddTenant /> },
      { path: "tenant/:id", element: <TenantDetail /> },
      { path: "rent", element: <RentOverview /> },
      { path: "expenses", element: <ExpenseTracker /> },
      { path: "settings", element: <OwnerSettings /> },
      { path: "kyc", element: <OwnerKYC /> },
      { path: "complaints", element: <OwnerComplaints /> },
      { path: "messages", element: <OwnerMessages /> },
      { path: "notifications", element: <OwnerNotifications /> },
      { path: "whatsapp", element: <WhatsAppHub /> },
    ],
  },

  // Catch all — redirect to splash
  { path: "*", element: <Navigate to="/" replace /> },
];

export default routes;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 2 — REWRITE src/app/pages/RoleSelection.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The "I'm Looking for a PG" button MUST navigate to /auth
The "I Own a PG" button MUST navigate to /owner/auth

Replace RoleSelection.tsx with this exact code:

import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function LogoMark({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <polyline points="4,42 40,8 76,42"
        stroke="#F5A623" strokeWidth="5"
        strokeLinejoin="miter" strokeLinecap="round" fill="none"/>
      <rect x="8" y="40" width="18" height="30" rx="3" fill="white"/>
      <rect x="54" y="40" width="18" height="30" rx="3" fill="white"/>
      <rect x="8" y="40" width="64" height="16" fill="white"/>
      <polygon points="20,40 60,40 40,56" fill="#7C3AED"/>
      <rect x="37" y="54" width="6" height="16" rx="3" fill="#F0436A"/>
      <line x1="40" y1="54" x2="20" y2="40"
        stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="40" y1="54" x2="60" y2="40"
        stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
}

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column",
      background: "#F8F7FF", fontFamily: "Inter, sans-serif",
    }}>
      {/* Purple header */}
      <div style={{
        background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
        borderRadius: "0 0 32px 32px",
        paddingTop: 56, paddingBottom: 48,
        paddingLeft: 24, paddingRight: 24,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 0,
      }}>
        <LogoMark size={56} />
        <p style={{
          fontSize: 22, fontWeight: 800, color: "white",
          marginTop: 12, letterSpacing: "-0.4px",
        }}>My PG Match</p>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>
          Who are you?
        </p>
      </div>

      {/* Cards */}
      <div style={{
        display: "flex", flexDirection: "column",
        gap: 12, padding: "0 20px",
        marginTop: -20,
      }}>
        {/* Tenant card */}
        <button
          onClick={() => navigate("/auth")}
          style={{
            display: "flex", alignItems: "center", gap: 16,
            background: "white", borderRadius: 20, padding: 20,
            border: "1px solid #EDE9FE", cursor: "pointer",
            boxShadow: "0 8px 24px rgba(124,58,237,0.12)",
            position: "relative", textAlign: "left",
            width: "100%",
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: "#EDE9FE", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
          }}>🏠</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
              I'm Looking for a PG
            </p>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 2, margin: "2px 0 0" }}>
              Find rooms, match with roommates
            </p>
          </div>
          <ChevronRight size={20} color="#7C3AED" />
          <div style={{
            position: "absolute", top: -10, right: 16,
            background: "#FFF7ED", color: "#D97706",
            border: "1px solid #FDE68A",
            borderRadius: 100, padding: "3px 10px",
            fontSize: 11, fontWeight: 600,
          }}>Most Popular</div>
        </button>

        {/* Owner card */}
        <button
          onClick={() => navigate("/owner/auth")}
          style={{
            display: "flex", alignItems: "center", gap: 16,
            background: "white", borderRadius: 20, padding: 20,
            border: "1px solid #E2E8F0", cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            textAlign: "left", width: "100%",
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: "#ECFDF5", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 26, flexShrink: 0,
          }}>🏢</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", margin: 0 }}>
              I Own a PG
            </p>
            <p style={{ fontSize: 13, color: "#64748B", marginTop: 2, margin: "2px 0 0" }}>
              Manage tenants, collect rent
            </p>
          </div>
          <ChevronRight size={20} color="#10B981" />
        </button>
      </div>

      {/* Terms */}
      <p style={{
        fontSize: 12, color: "#94A3B8", textAlign: "center",
        marginTop: "auto", padding: "24px 24px 32px",
      }}>
        By continuing you agree to our{" "}
        <span style={{ color: "#7C3AED", cursor: "pointer" }}>
          Terms & Privacy Policy
        </span>
      </p>
    </div>
  );
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 3 — REWRITE src/app/pages/Auth.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After OTP verified, navigate to /tenant (not /tenant/profile-setup).
This connects directly to the working home screen.

Replace Auth.tsx with:

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowLeft } from "lucide-react";

function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <polyline points="4,42 40,8 76,42"
        stroke="#F5A623" strokeWidth="5"
        strokeLinejoin="miter" strokeLinecap="round" fill="none"/>
      <rect x="8" y="40" width="18" height="30" rx="3" fill="white"/>
      <rect x="54" y="40" width="18" height="30" rx="3" fill="white"/>
      <rect x="8" y="40" width="64" height="16" fill="white"/>
      <polygon points="20,40 60,40 40,56" fill="#7C3AED"/>
      <rect x="37" y="54" width="6" height="16" rx="3" fill="#F0436A"/>
      <line x1="40" y1="54" x2="20" y2="40"
        stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
      <line x1="40" y1="54" x2="60" y2="40"
        stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  );
}

type Step = "phone" | "otp" | "success";

export default function Auth() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["","","","","",""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleSendOTP = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep("otp");
    setResendTimer(28);
  };

  const handleOTPChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const n = [...otp];
    n[i] = val.slice(-1);
    setOtp(n);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
    if (!val && i > 0) otpRefs.current[i - 1]?.focus();
  };

  const handleVerify = async () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep("success");
    setTimeout(() => navigate("/tenant", { replace: true }), 1000);
  };

  const inputStyle = (active: boolean): React.CSSProperties => ({
    height: 56, borderRadius: 14, fontSize: 16, color: "#0F172A",
    border: `2px solid ${active ? "#7C3AED" : "#E2E8F0"}`,
    outline: "none", padding: "0 16px",
    background: "white", width: "100%",
    transition: "border-color 0.2s",
  });

  const btnStyle = (enabled: boolean): React.CSSProperties => ({
    width: "100%", height: 56, borderRadius: 100,
    background: enabled ? "#7C3AED" : "#E2E8F0",
    color: enabled ? "white" : "#94A3B8",
    fontSize: 16, fontWeight: 700, border: "none",
    cursor: enabled ? "pointer" : "not-allowed",
    transition: "all 0.2s",
  });

  return (
    <div style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column",
      background: "#7C3AED", fontFamily: "Inter, sans-serif",
    }}>
      {/* Purple top */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 56, paddingBottom: 40, gap: 8,
      }}>
        <LogoMark size={52} />
        <p style={{ fontSize: 22, fontWeight: 800, color: "white", margin: 0 }}>
          {step === "otp" ? "Verify your number" : "Welcome Back 👋"}
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0, textAlign: "center", padding: "0 24px" }}>
          {step === "otp"
            ? `Code sent to +91 ${phone.slice(0,5)}XXXXX`
            : "Enter your number to continue"}
        </p>
      </div>

      {/* White card */}
      <div style={{
        flex: 1, background: "white",
        borderRadius: "28px 28px 0 0",
        padding: "32px 24px 40px",
        display: "flex", flexDirection: "column", gap: 16,
      }}>

        {/* PHONE STEP */}
        {step === "phone" && (
          <>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#94A3B8",
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Mobile Number
              </p>
              <div style={{
                display: "flex", borderRadius: 14, overflow: "hidden",
                border: `2px solid ${phone.length > 0 ? "#7C3AED" : "#E2E8F0"}`,
                transition: "border-color 0.2s",
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "0 16px", background: "#F8FAFC",
                  borderRight: "1px solid #E2E8F0", flexShrink: 0,
                }}>
                  <Phone size={14} color="#64748B" />
                  <span style={{ fontSize: 16, fontWeight: 600, color: "#0F172A" }}>+91</span>
                </div>
                <input
                  type="tel" inputMode="numeric" maxLength={10}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number"
                  style={{ flex: 1, padding: "0 16px", fontSize: 16,
                    color: "#0F172A", border: "none", outline: "none",
                    background: "white", height: 56 }}
                />
              </div>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={phone.length < 10 || loading}
              style={btnStyle(phone.length >= 10 && !loading)}
            >
              {loading ? "Sending..." : "Send OTP →"}
            </button>

            <p style={{ textAlign: "center", fontSize: 14, color: "#94A3B8" }}>
              PG Owner?{" "}
              <span
                onClick={() => navigate("/owner/auth")}
                style={{ color: "#7C3AED", fontWeight: 600, cursor: "pointer" }}
              >
                Owner Login →
              </span>
            </p>
          </>
        )}

        {/* OTP STEP */}
        {step === "otp" && (
          <>
            <button
              onClick={() => setStep("phone")}
              style={{ display: "flex", alignItems: "center", gap: 6,
                background: "none", border: "none", cursor: "pointer",
                color: "#64748B", fontSize: 13, padding: 0,
              }}
            >
              <ArrowLeft size={16} /> Change number
            </button>

            <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { otpRefs.current[i] = el; }}
                  type="tel" inputMode="numeric" maxLength={1}
                  value={digit}
                  onChange={e => handleOTPChange(i, e.target.value)}
                  style={{
                    width: 44, height: 56, textAlign: "center",
                    fontSize: 20, fontWeight: 700, color: "#0F172A",
                    border: `2px solid ${digit ? "#7C3AED" : "#E2E8F0"}`,
                    borderRadius: 12, outline: "none",
                    background: digit ? "#EDE9FE" : "#F8FAFC",
                    transition: "all 0.15s",
                  }}
                />
              ))}
            </div>

            <p style={{ textAlign: "center", fontSize: 13, color: "#94A3B8" }}>
              {resendTimer > 0
                ? <>Resend in <span style={{ color: "#F59E0B", fontWeight: 600 }}>{resendTimer}s</span></>
                : <span onClick={() => setResendTimer(28)} style={{ color: "#7C3AED", cursor: "pointer", fontWeight: 600 }}>Resend OTP</span>
              }
            </p>

            <button
              onClick={handleVerify}
              disabled={otp.join("").length < 6 || loading}
              style={btnStyle(otp.join("").length === 6 && !loading)}
            >
              {loading ? "Verifying..." : "Verify & Enter →"}
            </button>
          </>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            flex: 1, gap: 12, paddingTop: 40,
          }}>
            <style>{`
              @keyframes popIn {
                0%{transform:scale(0);opacity:0}
                70%{transform:scale(1.15)}
                100%{transform:scale(1);opacity:1}
              }
            `}</style>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              border: "3px solid #7C3AED",
              background: "#EDE9FE",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
              fontSize: 36,
            }}>✓</div>
            <p style={{ fontSize: 22, fontWeight: 700, color: "#0F172A" }}>Verified!</p>
            <p style={{ fontSize: 14, color: "#64748B" }}>Taking you in...</p>
          </div>
        )}
      </div>
    </div>
  );
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 4 — REWRITE src/app/pages/SplashScreen.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The splash screen must show ONLY the logo SVG + app name + tagline.
NO full-screen photos. NO background images. Just purple + SVG logo.

Replace SplashScreen.tsx with:

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setExit(true), 2000);
    const t3 = setTimeout(() => {
      const seen = localStorage.getItem("mypgmatch_onboarded");
      navigate(seen ? "/auth" : "/onboarding", { replace: true });
    }, 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [navigate]);

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "#7C3AED",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "Inter, sans-serif",
      opacity: exit ? 0 : 1,
      transition: "opacity 0.4s ease",
    }}>
      <style>{`
        @keyframes logoIn {
          0%{transform:scale(0.2) rotate(-10deg);opacity:0}
          60%{transform:scale(1.1) rotate(2deg)}
          100%{transform:scale(1) rotate(0deg);opacity:1}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes pulse {
          0%,100%{transform:scale(1);opacity:0.7}
          50%{transform:scale(1.4);opacity:1}
        }
      `}</style>

      {/* Logo SVG only — no image */}
      <div style={{
        opacity: visible ? 1 : 0,
        animation: visible ? "logoIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards" : "none",
        marginBottom: 20,
      }}>
        <svg width="96" height="96" viewBox="0 0 80 80" fill="none">
          <polyline points="4,42 40,8 76,42"
            stroke="#F5A623" strokeWidth="5"
            strokeLinejoin="miter" strokeLinecap="round" fill="none"/>
          <rect x="8" y="40" width="18" height="30" rx="3" fill="white"/>
          <rect x="54" y="40" width="18" height="30" rx="3" fill="white"/>
          <rect x="8" y="40" width="64" height="16" fill="white"/>
          <polygon points="20,40 60,40 40,56" fill="#7C3AED"/>
          <rect x="37" y="54" width="6" height="16" rx="3" fill="#F0436A"/>
          <line x1="40" y1="54" x2="20" y2="40"
            stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
          <line x1="40" y1="54" x2="60" y2="40"
            stroke="#F0436A" strokeWidth="5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* App name only — NO "My PG Match" wordmark text on other screens */}
      <p style={{
        fontSize: 28, fontWeight: 800, color: "white",
        letterSpacing: "-0.5px",
        opacity: visible ? 1 : 0,
        animation: visible ? "fadeUp 0.5s ease 0.5s both" : "none",
        margin: "0 0 6px",
      }}>My PG Match</p>

      <p style={{
        fontSize: 14, color: "rgba(255,255,255,0.7)",
        opacity: visible ? 1 : 0,
        animation: visible ? "fadeUp 0.4s ease 0.8s both" : "none",
        margin: "0 0 28px",
      }}>Find your PG. Find your people.</p>

      {/* 3 colored pulsing dots */}
      <div style={{ display: "flex", gap: 10,
        opacity: visible ? 1 : 0,
        animation: visible ? "fadeUp 0.4s ease 1s both" : "none",
      }}>
        {[["#F5A623","0ms"],["#F0436A","250ms"],["#10B981","500ms"]].map(([color, delay], i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: "50%",
            background: color,
            animation: visible ? `pulse 1.4s ease-in-out ${delay} infinite` : "none",
          }}/>
        ))}
      </div>
    </div>
  );
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 5 — REWRITE src/app/pages/Onboarding.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CRITICAL: The onboarding must NOT use any full-screen photos or images.
Use ONLY SVG illustrations and the logo mark SVG.
The logo on the onboarding slides shows ONLY the SVG logo mark
(no photo, no background image of any kind).

The last slide "Let's Go 🚀" button navigates to /role-selection.

Replace the entire Onboarding.tsx with a version that:
1. Has purple full-screen background
2. Shows 3 slides with SVG-only illustrations (no photos, no images)
3. Bottom white card with dots, headline, body text, Next button
4. Skip button top right
5. Last slide button → navigate("/role-selection")
6. Sets localStorage.setItem("mypgmatch_onboarded", "true") before navigating

Slide 1: City skyline illustration (SVG white line buildings, price pins)
Slide 2: 3 avatar circles with emoji tags (SVG)
Slide 3: Two overlapping cards with heart (SVG)

DO NOT use any <img> tags. DO NOT use background-image CSS.
ALL illustrations must be inline SVG only.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 6 — UPDATE src/app/pages/owner/OwnerOnboarding.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In OwnerOnboarding.tsx, the "Continue →" button on the 
account creation step (Step 1) must navigate to /owner
after a mock 800ms delay.

Also remove Password and Confirm Password fields completely.
Keep only: Full Name, WhatsApp Number, Email (optional).

The logo shown in OwnerOnboarding must be ONLY the LogoMark SVG
(same SVG as above) — no text below it except "PG OS" as the 
app subtitle. No photos anywhere on this screen.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOGO RULE — APPLY EVERYWHERE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In ALL pre-home screens (SplashScreen, Onboarding, RoleSelection, 
Auth, OwnerOnboarding), the logo must be:
- ONLY the inline SVG house mark (no photo, no image file)
- On Splash: show logo + "My PG Match" text + tagline
- On Auth: show logo + role-specific headline (NO "My PG Match" wordmark)
- On RoleSelection: show logo + "My PG Match" + "Who are you?"
- On Onboarding slides: show NO logo at all in illustrations
  (illustrations are SVG scenes, not logos)
- NEVER use <img> tags for the logo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DO NOT TOUCH THESE FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Do NOT change:
- MainLayout.tsx
- Home.tsx
- ConnectHub.tsx
- StudentMarketplace.tsx
- OwnerDashboard.tsx
- OwnerLayout.tsx
- Any other screen beyond what's listed above