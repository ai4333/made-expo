import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: { emoji: string; label: string; sublabel: string; value: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "When do you usually sleep? 🌙",
    options: [
      { emoji: "🌅", label: "Before 11pm", sublabel: "Early sleeper", value: "early" },
      { emoji: "🦉", label: "After midnight", sublabel: "Night owl", value: "night" },
      { emoji: "🎯", label: "Around 11-12", sublabel: "Flexible", value: "flexible" },
      { emoji: "📱", label: "Depends on mood", sublabel: "Unpredictable", value: "unpredictable" },
    ],
  },
  {
    id: 2,
    question: "How do you feel about guests at home? 🏠",
    options: [
      { emoji: "🎉", label: "Love it!", sublabel: "More the merrier", value: "social" },
      { emoji: "🤝", label: "Occasionally", sublabel: "Sometimes is fine", value: "occasional" },
      { emoji: "📖", label: "Prefer quiet", sublabel: "Mostly calm space", value: "quiet" },
      { emoji: "🚫", label: "My sanctuary", sublabel: "Private space", value: "private" },
    ],
  },
  {
    id: 3,
    question: "On a regular weekday evening you are...?",
    options: [
      { emoji: "💻", label: "Working/Studying", sublabel: "Hustler mode", value: "work" },
      { emoji: "🎮", label: "Gaming/Shows", sublabel: "Chill mode", value: "gaming" },
      { emoji: "🏋️", label: "Gym/Outdoors", sublabel: "Active mode", value: "active" },
      { emoji: "🍳", label: "Cooking/Chilling", sublabel: "Homebody mode", value: "home" },
    ],
  },
  {
    id: 4,
    question: "How would you describe your living style? 🧹",
    options: [
      { emoji: "✨", label: "Very neat", sublabel: "Everything in place", value: "neat" },
      { emoji: "📦", label: "Clean-ish", sublabel: "Clean but lived-in", value: "moderate" },
      { emoji: "🌀", label: "Bit of chaos", sublabel: "Organised mess", value: "messy" },
      { emoji: "🤝", label: "I adapt", sublabel: "Roommate's call", value: "adaptive" },
    ],
  },
];

export default function VibeCalibration() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [done, setDone] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    if (transitioning) return;
    setSelected(value);

    setTimeout(() => {
      const newAnswers = [...answers, value];
      setAnswers(newAnswers);

      if (currentQ < QUESTIONS.length - 1) {
        setDirection("left");
        setTransitioning(true);
        setTimeout(() => {
          setCurrentQ(currentQ + 1);
          setSelected(null);
          setTransitioning(false);
        }, 300);
      } else {
        setTransitioning(true);
        setTimeout(() => {
          setDone(true);
          setTransitioning(false);
        }, 300);
      }
    }, 350);
  };

  const handleBack = () => {
    if (currentQ === 0) {
      navigate(-1);
      return;
    }
    setDirection("right");
    setTransitioning(true);
    setTimeout(() => {
      setCurrentQ(currentQ - 1);
      setAnswers(answers.slice(0, -1));
      setSelected(null);
      setTransitioning(false);
    }, 300);
  };

  const getVibeEmojis = () => {
    const emojiMap: Record<string, string> = {
      early: "🌅", night: "🦉", flexible: "🎯", unpredictable: "📱",
      social: "🎉", occasional: "🤝", quiet: "📖", private: "🚫",
      work: "💻", gaming: "🎮", active: "🏋️", home: "🍳",
      neat: "✨", moderate: "📦", messy: "🌀", adaptive: "🤝",
    };
    return answers.map(a => emojiMap[a] || "✨");
  };

  if (done) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "#0F172A" }}
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
          style={{
            border: "3px solid #7C3AED",
            animation: "popIn 0.5s ease forwards",
          }}
        >
          <style>{`
            @keyframes popIn {
              0% { transform: scale(0); opacity: 0; }
              70% { transform: scale(1.1); }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <span style={{ fontSize: 40 }}>✓</span>
        </div>

        <h1
          className="text-3xl font-bold text-white text-center mb-3"
          style={{ animation: "slideUp 0.5s ease 0.3s both" }}
        >
          Vibe Captured! 🎯
        </h1>
        <p
          className="text-center mb-8"
          style={{
            color: "rgba(255,255,255,0.5)",
            animation: "slideUp 0.5s ease 0.4s both",
          }}
        >
          We found 18 people with your vibe in Bangalore!
        </p>

        {/* Answer chips */}
        <div
          className="flex gap-3 mb-10 flex-wrap justify-center"
          style={{ animation: "slideUp 0.5s ease 0.5s both" }}
        >
          {getVibeEmojis().map((emoji, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.5)" }}
            >
              {emoji}
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/tenant")}
          className="w-full py-4 rounded-2xl font-bold text-base text-white mb-4"
          style={{
            background: "#7C3AED",
            animation: "slideUp 0.5s ease 0.6s both",
          }}
        >
          Find My PG →
        </button>

        <button
          onClick={() => {
            setDone(false);
            setCurrentQ(0);
            setAnswers([]);
            setSelected(null);
          }}
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Edit my answers
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col px-6 pt-14 pb-8"
      style={{ background: "#0F172A" }}
    >
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(60px); }
        }
        .card-selected {
          transform: scale(1.02);
          background: #7C3AED !important;
          border-color: #7C3AED !important;
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handleBack}>
          <ArrowLeft size={22} color="rgba(255,255,255,0.6)" />
        </button>
        <span
          className="text-xs font-semibold"
          style={{ color: "#7C3AED" }}
        >
          Question {currentQ + 1} of {QUESTIONS.length}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color: "#F59E0B" }}
        >
          ~45 seconds
        </span>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full rounded-full mb-2"
        style={{ height: 4, background: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${((currentQ + (selected ? 1 : 0)) / QUESTIONS.length) * 100}%`,
            background: "#7C3AED",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Calibration hint */}
      <p
        className="text-right text-xs mb-8"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Let's calibrate your vibe 🎯
      </p>

      {/* Question */}
      <div
        key={currentQ}
        style={{
          animation: transitioning
            ? direction === "left"
              ? "slideOutLeft 0.3s ease forwards"
              : "slideOutRight 0.3s ease forwards"
            : direction === "left"
            ? "slideInRight 0.3s ease forwards"
            : "slideInLeft 0.3s ease forwards",
        }}
      >
        <h2
          className="font-bold text-white mb-8"
          style={{ fontSize: 22, lineHeight: 1.3 }}
        >
          {question.question}
        </h2>

        {/* Options 2x2 Grid */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {question.options.map((option) => {
            const isSelected = selected === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="flex flex-col items-start p-4 rounded-2xl text-left"
                style={{
                  background: isSelected
                    ? "#7C3AED"
                    : "rgba(255,255,255,0.07)",
                  border: `${isSelected ? "2px" : "1px"} solid ${
                    isSelected ? "#7C3AED" : "rgba(255,255,255,0.12)"
                  }`,
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.2s ease",
                  minHeight: 100,
                }}
              >
                <span style={{ fontSize: 28, marginBottom: 8, display: "block" }}>
                  {option.emoji}
                </span>
                <span
                  className="font-semibold text-sm block"
                  style={{ color: "white", marginBottom: 2 }}
                >
                  {option.label}
                </span>
                <span
                  className="text-xs"
                  style={{
                    color: isSelected
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.45)",
                  }}
                >
                  {option.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom hint */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Tap any option to continue
        </p>
      </div>
    </div>
  );
}