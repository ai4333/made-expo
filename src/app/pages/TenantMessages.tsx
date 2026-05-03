import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Moon, Sun, Send } from "lucide-react";

const PURPLE       = "#8A2BE2";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const PURPLE_BORDER = "rgba(138,43,226,0.22)";
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

const TEMPLATES = [
  "When will my issue be resolved?",
  "I've paid the rent, please check",
  "I need a rent receipt",
  "I'd like to request a change",
  "There's a maintenance issue",
];

interface Message {
  id: string;
  from: "owner" | "tenant";
  text: string;
  time: string;
}

const INIT_MESSAGES: Message[] = [
  { id: "m1", from: "owner", text: "Hi! Welcome to Sunrise Premium PG. Feel free to message me anytime for any queries or issues.", time: "10:00 AM" },
  { id: "m2", from: "tenant", text: "Thank you! I wanted to ask about the AC in room 204 — it stopped working yesterday.", time: "10:05 AM" },
  { id: "m3", from: "owner", text: "Thanks for letting me know, Ravi. I've raised a service request. A technician will come by tomorrow evening between 5–7 PM.", time: "10:12 AM" },
  { id: "m4", from: "tenant", text: "Perfect, thank you! Also, could I get a rent receipt for February?", time: "10:14 AM" },
  { id: "m5", from: "owner", text: "Yes, I'll send the February receipt to your email by end of day today.", time: "10:18 AM" },
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function TenantMessages() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const t = darkMode ? DARK : LIGHT;

  const [messages, setMessages] = useState<Message[]>(INIT_MESSAGES);
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: `m${Date.now()}`, from: "tenant", text, time: now() }]);
    setInput("");
    // Simulate owner reply after 1.2s
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `m${Date.now()}`,
        from: "owner",
        text: "Thanks for your message! I'll get back to you shortly.",
        time: now(),
      }]);
    }, 1200);
  };

  const handleTemplate = (tpl: string) => {
    setInput(tpl);
    inputRef.current?.focus();
  };

  return (
    <div style={{
      background: t.bg, minHeight: "100%", fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column", height: "100dvh",
    }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "48px 16px 12px", background: t.card,
        borderBottom: `1px solid ${t.cardBorder}`, flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}
          >
            <ArrowLeft size={20} color={PURPLE} />
          </button>
          {/* Owner avatar */}
          <div style={{
            width: 38, height: 38, borderRadius: "50%", background: PURPLE,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ color: "white", fontWeight: 800, fontSize: 16 }}>R</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: t.heading }}>Mr. Ravi Sharma</p>
            <p style={{ margin: 0, fontSize: 11, color: PURPLE }}>PG Owner · Sunrise PG</p>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{ background: PURPLE_GHOST, border: "none", borderRadius: 9, padding: "6px 10px", cursor: "pointer" }}
        >
          {darkMode ? <Sun size={15} color={PURPLE} /> : <Moon size={15} color={PURPLE} />}
        </button>
      </div>

      {/* Messages scroll area */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px" }}>
        {messages.length === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", height: "100%", gap: 12, textAlign: "center",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", background: PURPLE,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "white", fontWeight: 800, fontSize: 28 }}>R</span>
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: t.heading }}>Start the conversation!</p>
            <p style={{ fontSize: 13, color: t.muted, maxWidth: 240, lineHeight: 1.5 }}>
              Messages also go to the owner's WhatsApp for faster replies.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((msg) => {
              const isOwner = msg.from === "owner";
              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex", flexDirection: "column",
                    alignItems: isOwner ? "flex-start" : "flex-end",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                    {isOwner && (
                      <div style={{
                        width: 28, height: 28, borderRadius: "50%", background: PURPLE,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <span style={{ color: "white", fontWeight: 800, fontSize: 12 }}>R</span>
                      </div>
                    )}
                    <div style={{
                      maxWidth: "75%",
                      padding: "10px 14px",
                      borderRadius: isOwner ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      background: isOwner ? t.surface : PURPLE,
                      border: isOwner ? `1px solid ${PURPLE_BORDER}` : "none",
                      color: isOwner ? t.body : "white",
                      fontSize: 14, lineHeight: 1.55,
                      boxShadow: isOwner ? "none" : `0 2px 12px ${PURPLE_SHADOW}`,
                    }}>
                      {msg.text}
                    </div>
                  </div>
                  <p style={{
                    fontSize: 10, color: t.muted, margin: "4px 0 0",
                    paddingLeft: isOwner ? 36 : 0,
                  }}>
                    {msg.time}
                  </p>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Compose area */}
      <div style={{
        background: t.card, borderTop: `1px solid ${t.cardBorder}`,
        paddingBottom: "env(safe-area-inset-bottom, 12px)", flexShrink: 0,
      }}>
        {/* Template chips */}
        <div style={{ display: "flex", gap: 8, padding: "10px 12px 0", overflowX: "auto" }}>
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl}
              onClick={() => handleTemplate(tpl)}
              style={{
                flexShrink: 0, padding: "6px 12px", borderRadius: 20,
                border: `1.5px solid ${PURPLE_BORDER}`, background: t.card,
                color: t.body, fontSize: 12, fontWeight: 500, cursor: "pointer",
                whiteSpace: "nowrap", transition: "background 0.1s",
              }}
            >
              {tpl}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div style={{ display: "flex", gap: 8, padding: "10px 12px 12px", alignItems: "center" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Type a message..."
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 24,
              border: `2px solid ${focused ? PURPLE : t.cardBorder}`,
              background: t.inputBg, color: t.body, fontSize: 14,
              outline: "none", fontFamily: "'DM Sans', sans-serif",
              transition: "border-color 0.15s",
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            style={{
              width: 44, height: 44, borderRadius: "50%", border: "none",
              background: input.trim() ? PURPLE : t.surface,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: input.trim() ? "pointer" : "default",
              boxShadow: input.trim() ? `0 4px 12px ${PURPLE_SHADOW}` : "none",
              transition: "all 0.15s", flexShrink: 0,
            }}
          >
            <Send size={18} color={input.trim() ? "white" : PURPLE} style={{ marginLeft: 2 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
