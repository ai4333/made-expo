import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";

const questions = [
  {
    q: "You're home on a Friday night. What's happening?",
    options: [
      { emoji: "🎬", label: "Quiet movie alone", tag: "Homebody" },
      { emoji: "🎮", label: "Gaming session", tag: "Gamer" },
      { emoji: "🥳", label: "Friends over", tag: "Social Butterfly" },
      { emoji: "😴", label: "Asleep by 10", tag: "Early Bird" },
    ],
  },
  {
    q: "Your room setup vibe:",
    options: [
      { emoji: "✨", label: "Pinterest-perfect minimalist", tag: "Minimalist" },
      { emoji: "🛋️", label: "Cozy and cluttered", tag: "Homebody" },
      { emoji: "🪑", label: "Whatever works", tag: "Chill" },
      { emoji: "🧹", label: "Clean but lived-in", tag: "Neat" },
    ],
  },
  {
    q: "Your alarm goes off at 6am. You:",
    options: [
      { emoji: "☀️", label: "Jump up, love mornings", tag: "Early Bird" },
      { emoji: "⏰", label: "Snooze twice", tag: "Moderate" },
      { emoji: "🦉", label: "What alarm? Sleep till 9", tag: "Night Owl" },
      { emoji: "🤔", label: "Depends on the day", tag: "Flexible" },
    ],
  },
  {
    q: "A stranger walks into your shared space. You:",
    options: [
      { emoji: "😃", label: "Love meeting new people", tag: "Extrovert" },
      { emoji: "😊", label: "Friendly but take time", tag: "Ambivert" },
      { emoji: "🤝", label: "Prefer to know them first", tag: "Introvert" },
      { emoji: "😅", label: "Bit awkward at first", tag: "Introvert" },
    ],
  },
  {
    q: "Music in common areas?",
    options: [
      { emoji: "🔊", label: "Yes please, loud", tag: "Lively" },
      { emoji: "🎵", label: "Soft background OK", tag: "Moderate" },
      { emoji: "🎧", label: "Headphones only", tag: "Quiet" },
      { emoji: "🤷", label: "No preference", tag: "Flexible" },
    ],
  },
];

const vibeResults: Record<string, { type: string; emoji: string; desc: string }> = {
  Homebody: { type: "Homebody 🏠", emoji: "🏠", desc: "You love your cozy space!" },
  Gamer: { type: "Night Owl 🦉", emoji: "🦉", desc: "You come alive at night!" },
  "Social Butterfly": { type: "Social Butterfly 🦋", emoji: "🦋", desc: "You thrive with people around!" },
  "Early Bird": { type: "Early Bird 🌅", emoji: "🌅", desc: "You start the day right!" },
};

export function VibeCalibration() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (optIdx: number, tag: string) => {
    setSelected(optIdx);
    setTimeout(() => {
      const newAnswers = [...answers, tag];
      setAnswers(newAnswers);
      setSelected(null);
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setDone(true);
      }
    }, 400);
  };

  const getVibeType = () => {
    const counts: Record<string, number> = {};
    answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "Homebody";
    return vibeResults[top] || { type: "Chill Viber 🎯", emoji: "🎯", desc: "You go with the flow!" };
  };

  if (done) {
    const vibe = getVibeType();
    return (
      <div className="h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="space-y-6"
        >
          <div className="text-8xl mb-4">{vibe.emoji}</div>
          <h2 className="text-2xl font-bold text-white">Your Vibe Type:</h2>
          <div className="bg-teal-500/20 border border-teal-400 rounded-2xl px-6 py-4">
            <p className="text-teal-300 text-xl font-bold">{vibe.type}</p>
            <p className="text-indigo-300 text-sm mt-1">{vibe.desc}</p>
          </div>
          <div className="bg-indigo-800/50 rounded-2xl px-6 py-4 border border-indigo-600">
            <p className="text-white font-semibold">We found <span className="text-teal-400">12 people</span> with similar vibes in Bangalore!</p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={() => navigate("/tenant")}
              className="w-full bg-teal-500 text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-teal-500/30"
            >
              Find My PG 🏠
            </button>
            <button
              onClick={() => navigate("/tenant")}
              className="w-full border border-indigo-500 text-indigo-300 py-3 rounded-2xl text-sm"
            >
              Explore Later
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[current];
  if (!currentQuestion) {
    // Safety fallback
    return null;
  }
  
  const progress = ((current) / questions.length) * 100;

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 flex flex-col px-6 pt-14 pb-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-indigo-300 text-sm font-medium">Question {current + 1} of {questions.length}</p>
          <p className="text-teal-400 text-sm font-medium">~60 seconds</p>
        </div>
        <div className="h-1.5 bg-indigo-800 rounded-full">
          <motion.div
            className="h-1.5 bg-teal-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="text-white text-xs mt-2 text-right">Let's calibrate your vibe 🎯</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <h2 className="text-xl font-bold text-white mb-8 leading-snug">{currentQuestion.q}</h2>
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, i) => (
              <motion.button
                key={i}
                onClick={() => handleSelect(i, opt.tag)}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  selected === i
                    ? "bg-teal-500 border-teal-400 shadow-lg shadow-teal-500/30"
                    : "bg-indigo-800/50 border-indigo-600 hover:border-teal-400"
                }`}
              >
                <div className="text-3xl mb-2">{opt.emoji}</div>
                <p className="text-white text-sm font-medium leading-tight">{opt.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}