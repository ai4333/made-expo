import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, Upload, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

type Step = "mobile" | "aadhaar" | "aadhaar-otp" | "business" | "success";

export function OwnerKYC() {
  const { C, isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("mobile");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const formatAadhaar = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 12);
    return digits.match(/.{1,4}/g)?.join(" ") || digits;
  };

  const Stepper = ({ current }: { current: number }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
      {["Mobile", "Aadhaar", "Business", "Done"].map((label, i) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: i <= current ? C.primary : C.elevated,
            border: i <= current ? "none" : `2px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: i <= current ? "white" : C.muted,
          }}>
            {i < current ? "✓" : i + 1}
          </div>
          {i < 3 && (
            <div style={{ flex: 1, height: 2, background: i < current ? C.primary : C.border }} />
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
        background: disabled ? C.elevated : C.primary,
        color: disabled ? C.muted : "white",
        fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : C.primaryShadow,
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );

  /* ── Mobile (Auto-skip) ──────────────────────────────────── */
  if (step === "mobile") {
    setTimeout(() => setStep("aadhaar"), 1500);
    return (
      <div style={{ background: C.bg, minHeight: "100dvh", padding: "80px 24px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%", background: "rgba(16, 185, 129, 0.12)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
          }}>
            <CheckCircle2 size={36} style={{ color: "#10B981" }} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.heading, margin: "0 0 8px" }}>
            Mobile Number Verified ✓
          </h2>
          <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>+91 XXXXXX7890</p>
          <p style={{ fontSize: 13, color: C.muted, margin: "16px 0 0" }}>Continuing to Aadhaar...</p>
        </div>
      </div>
    );
  }

  /* ── Aadhaar Input ───────────────────────────────────────── */
  if (step === "aadhaar") {
    return (
      <div style={{ background: C.bg, minHeight: "100dvh" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "48px 16px 14px", background: C.card, borderBottom: `1px solid ${C.border}`,
        }}>
          <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <ArrowLeft size={20} color={C.primary} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: C.heading }}>KYC Verification</span>
          <div style={{ width: 20 }} />
        </div>

        <div style={{ padding: "24px 16px" }}>
          <Stepper current={1} />

          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.heading, margin: "0 0 8px" }}>Verify with Aadhaar</h2>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 20 }}>Your details are encrypted and never shared</p>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, display: "block", marginBottom: 8 }}>
              Aadhaar Number
            </label>
            <input
              type="text"
              value={aadhaar}
              onChange={e => setAadhaar(formatAadhaar(e.target.value))}
              placeholder="1234 5678 9012"
              style={{
                width: "100%", padding: "14px 16px", borderRadius: 14, boxSizing: "border-box",
                border: `2px solid ${C.border}`, background: C.elevated, color: C.heading,
                outline: "none", fontSize: 16, letterSpacing: "0.05em",
              }}
              onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px ${C.primaryGhost}`; }}
              onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}
            />
            <p style={{ fontSize: 11, color: C.muted, margin: "6px 0 0", display: "flex", alignItems: "center", gap: 4 }}>
              🔒 We only verify, never store your full Aadhaar number
            </p>
          </div>

          <PrimaryBtn
            label="Fetch OTP"
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
      <div style={{ background: C.bg, minHeight: "100dvh" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "48px 16px 14px", background: C.card, borderBottom: `1px solid ${C.border}`,
        }}>
          <button onClick={() => setStep("aadhaar")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <ArrowLeft size={20} color={C.primary} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: C.heading }}>Enter OTP</span>
          <div style={{ width: 20 }} />
        </div>

        <div style={{ padding: "24px 16px" }}>
          <Stepper current={1} />

          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.heading, margin: "0 0 8px" }}>Verify OTP</h2>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>
            Sent to Aadhaar-linked mobile
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
                  color: C.heading, borderRadius: 12, outline: "none",
                  background: digit ? C.card : C.elevated,
                  border: `2px solid ${digit ? C.primary : C.border}`,
                }}
              />
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginBottom: 24 }}>
            Didn't receive? <button style={{ background: "none", border: "none", color: C.primary, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Resend OTP</button>
          </p>

          <PrimaryBtn
            label="Verify Aadhaar"
            onClick={() => setStep("business")}
            disabled={otp.join("").length !== 6}
          />
        </div>
      </div>
    );
  }

  /* ── Business Proof ──────────────────────────────────────── */
  if (step === "business") {
    const docOptions = [
      { key: "electricity", label: "Electricity Bill", icon: "⚡" },
      { key: "rental", label: "Rental Agreement", icon: "📄" },
      { key: "tax", label: "Property Tax Receipt", icon: "🧾" },
    ];

    return (
      <div style={{ background: C.bg, minHeight: "100dvh" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "48px 16px 14px", background: C.card, borderBottom: `1px solid ${C.border}`,
        }}>
          <button onClick={() => setStep("aadhaar-otp")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <ArrowLeft size={20} color={C.primary} />
          </button>
          <span style={{ fontSize: 17, fontWeight: 700, color: C.heading }}>Business Proof</span>
          <div style={{ width: 20 }} />
        </div>

        <div style={{ padding: "24px 16px" }}>
          <Stepper current={2} />

          <h2 style={{ fontSize: 20, fontWeight: 800, color: C.heading, margin: "0 0 8px" }}>
            Upload Business Proof
          </h2>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>
            Optional but recommended · Increases trust score
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {docOptions.map(doc => (
              <div key={doc.key} style={{
                border: `2px dashed ${uploadedDocs.includes(doc.key) ? C.primary : C.border}`,
                borderRadius: 14, padding: 16,
                background: uploadedDocs.includes(doc.key) ? C.primaryGhost : C.elevated,
                cursor: "pointer",
              }}
                onClick={() => {
                  if (!uploadedDocs.includes(doc.key)) {
                    setUploadedDocs([...uploadedDocs, doc.key]);
                  }
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: uploadedDocs.includes(doc.key) ? C.primary : C.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20,
                  }}>
                    {uploadedDocs.includes(doc.key) ? "✓" : doc.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.heading, margin: "0 0 2px" }}>
                      {doc.label}
                    </p>
                    {uploadedDocs.includes(doc.key) ? (
                      <p style={{ fontSize: 12, color: C.primary, margin: 0 }}>Uploaded ✓</p>
                    ) : (
                      <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Tap to upload</p>
                    )}
                  </div>
                  {uploadedDocs.includes(doc.key) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadedDocs(uploadedDocs.filter(d => d !== doc.key));
                      }}
                      style={{
                        width: 24, height: 24, borderRadius: "50%", background: C.border,
                        border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <X size={12} style={{ color: C.muted }} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginBottom: 16 }}>
            <button style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13 }}>
              Skip for Now
            </button>
          </p>

          <PrimaryBtn
            label="Submit for Review"
            onClick={() => setStep("success")}
          />
        </div>
      </div>
    );
  }

  /* ── Success ─────────────────────────────────────────────── */
  return (
    <div style={{
      background: C.bg, minHeight: "100dvh",
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

      <h2 style={{ fontSize: 24, fontWeight: 800, color: C.heading, margin: "0 0 12px" }}>
        KYC Submitted! 🎉
      </h2>
      <p style={{ fontSize: 14, color: C.muted, margin: "0 0 32px", lineHeight: 1.6 }}>
        We'll verify your documents within 24 hours
      </p>

      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 18, padding: "20px 24px", marginBottom: 32, width: "100%", maxWidth: 320,
      }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: C.heading, margin: "0 0 14px" }}>Verification Summary:</p>
        {[
          { label: "Mobile Verified", done: true },
          { label: "Aadhaar Verified", done: true },
          { label: "Business Proof", done: uploadedDocs.length > 0 },
        ].map(item => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <CheckCircle2 size={16} style={{ color: item.done ? "#10B981" : C.border, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: item.done ? C.body : C.muted, margin: 0 }}>{item.label}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 320 }}>
        <button
          onClick={() => navigate("/owner")}
          style={{
            width: "100%", padding: 14, borderRadius: 14, border: "none",
            background: C.primary, color: "white", fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: C.primaryShadow,
          }}
        >
          Go to Dashboard
        </button>
        <button
          style={{
            width: "100%", padding: 14, borderRadius: 14,
            background: C.primaryGhost, color: C.primary, border: "none",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
          }}
        >
          Share Verified Profile
        </button>
      </div>
    </div>
  );
}
