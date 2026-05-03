import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { MessageCircle, X } from "lucide-react";
import { chatMatches, type Tenant } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

const icebreakers = [
  "Hey! Looks like we have a lot in common 😊",
  "Would love to be roommates — want to connect?",
  "Saw we're both looking at this PG — what do you think of it?",
];

const matchColor = (pct: number) => {
  if (pct >= 85) return "bg-green-100 text-green-700";
  if (pct >= 70) return "bg-teal-100 text-teal-700";
  return "bg-amber-100 text-amber-700";
};

function IcebreakerModal({ person, pgName, onClose }: { person: Tenant; pgName: string; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const messages = icebreakers.map(m => m.replace("[PG Name]", pgName));

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <div className="bg-white rounded-3xl p-6 w-full text-center" onClick={e => e.stopPropagation()}>
          <div className="text-4xl mb-3">✅</div>
          <h3 className="text-slate-900 font-bold text-lg mb-1">Message Sent!</h3>
          <p className="text-slate-500 text-sm">Your icebreaker was sent to {person.name}</p>
          <button onClick={onClose} className="mt-4 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm w-full">
            Done
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 30 }}
        className="bg-white w-full rounded-t-3xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-5">
          <img src={person.photo} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
          <div>
            <p className="text-slate-900 font-semibold">Send Icebreaker to {person.name}</p>
            <p className="text-slate-500 text-xs">{pgName}</p>
          </div>
          <button onClick={onClose} className="ml-auto">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <p className="text-slate-500 text-sm mb-3">Choose a message to send:</p>
        <div className="space-y-2 mb-4">
          {messages.map(msg => (
            <button
              key={msg}
              onClick={() => setSelected(msg)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm transition-all ${
                selected === msg
                  ? "border-indigo-600 bg-indigo-50 text-indigo-800 font-medium"
                  : "border-slate-200 text-slate-700"
              }`}
            >
              "{msg}"
            </button>
          ))}
        </div>
        <button
          disabled={!selected}
          onClick={() => setSent(true)}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
            selected ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          Send Message 💬
        </button>
      </motion.div>
    </motion.div>
  );
}

function MatchBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4 bg-gradient-to-r from-indigo-600 to-teal-600 rounded-3xl p-4 text-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 opacity-20 text-6xl">🎉</div>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
      >
        <X size={12} className="text-white" />
      </button>
      <p className="font-bold text-base mb-1">🎉 You matched with Sneha!</p>
      <p className="text-white/80 text-xs mb-3">You both love Art and Fitness. You're at Sunrise Premium PG!</p>
      <button className="bg-white text-indigo-700 px-4 py-2 rounded-xl text-xs font-bold">
        Break the Ice 🧊
      </button>
    </motion.div>
  );
}

export function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"matches" | "liked_you" | "you_liked">("matches");
  const [icebreakerTarget, setIcebreakerTarget] = useState<{ person: Tenant; pgName: string } | null>(null);

  // Handle incoming roommate from RoommateRooms unlock flow
  useEffect(() => {
    if (location.state?.person && location.state?.pg) {
      const { person, pg } = location.state;
      
      // Convert roommate data to Tenant format and open icebreaker
      const tenantPerson: Tenant = {
        id: person.id,
        name: person.name,
        age: 24, // default, could be passed from state if available
        photo: `https://ui-avatars.com/api/?name=${person.name}&background=random&size=200`,
        occupation: person.occupation,
        interests: ["🏠 Roommate", "💬 Chat"],
        vibeMatch: person.vibeMatch,
      };

      setIcebreakerTarget({
        person: tenantPerson,
        pgName: pg.name || "PG",
      });

      // Clear the navigation state to prevent re-opening on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const tabItems = {
    matches: chatMatches.filter(c => c.type === "match"),
    liked_you: chatMatches.filter(c => c.type === "liked_you"),
    you_liked: chatMatches.filter(c => c.type === "you_liked"),
  };

  const currentItems = tabItems[activeTab];

  const tabs = [
    { key: "matches", label: "Matches 🎉", count: tabItems.matches.length },
    { key: "liked_you", label: "Liked You", count: tabItems.liked_you.length },
    { key: "you_liked", label: "You Liked", count: tabItems.you_liked.length },
  ];

  return (
    <div className="bg-slate-50 min-h-full">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-3 sticky top-0 z-10 shadow-sm">
        <h1 className="text-slate-900 font-bold text-xl mb-3">Roommate Matches</h1>

        {/* Tabs */}
        <div className="flex bg-slate-100 rounded-2xl p-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.key ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 pb-8">
        {activeTab === "matches" && <MatchBanner />}

        {currentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="text-5xl mb-4">
              {activeTab === "matches" ? "💔" : activeTab === "liked_you" ? "👀" : "⏳"}
            </div>
            <h3 className="text-slate-900 font-bold text-lg mb-2">
              {activeTab === "matches" ? "No matches yet" : activeTab === "liked_you" ? "No one liked you yet" : "You haven't liked anyone"}
            </h3>
            <p className="text-slate-500 text-sm mb-4">
              {activeTab === "matches" ? "Keep swiping to find your roommate match!" : "Check back soon!"}
            </p>
            {activeTab !== "liked_you" && (
              <button
                onClick={() => navigate("/tenant")}
                className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg shadow-indigo-500/30"
              >
                Explore PGs
              </button>
            )}
          </div>
        ) : (
          <div className="px-4 space-y-3">
            <AnimatePresence>
              {currentItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`bg-white rounded-3xl p-4 shadow-sm border ${item.isNew ? "border-indigo-200" : "border-slate-100"}`}
                >
                  {item.isNew && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <span className="text-indigo-600 text-xs font-semibold">New!</span>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <button onClick={() => navigate(`/roommate/${item.person.id}`)}>
                        <img
                          src={item.person.photo}
                          alt={item.person.name}
                          className="w-16 h-16 rounded-2xl object-cover"
                        />
                      </button>
                      {item.type === "match" && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-xs">
                          💖
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-slate-900 font-bold text-base">{item.person.name}, {item.person.age}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${matchColor(item.person.vibeMatch)}`}>
                          {item.person.vibeMatch}%
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs">{item.person.occupation}</p>
                      <p className="text-indigo-600 text-xs font-medium">📍 {item.pgName}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{item.time}</p>
                    </div>
                  </div>

                  {/* Interest tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                    {item.person.interests.slice(0, 3).map(i => (
                      <span key={i} className="bg-indigo-50 text-indigo-600 text-xs px-2.5 py-1 rounded-full">{i}</span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    {item.type !== "you_liked" ? (
                      <>
                        <button
                          onClick={() => setIcebreakerTarget({ person: item.person, pgName: item.pgName })}
                          className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20"
                        >
                          <MessageCircle size={14} />
                          Send Icebreaker
                        </button>
                      </>
                    ) : (
                      <div className="flex-1 bg-slate-100 text-slate-500 py-3 rounded-2xl text-xs font-medium text-center">
                        ⏳ Waiting for {item.person.name}'s response...
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Icebreaker Modal */}
      <AnimatePresence>
        {icebreakerTarget && (
          <IcebreakerModal
            person={icebreakerTarget.person}
            pgName={icebreakerTarget.pgName}
            onClose={() => setIcebreakerTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}