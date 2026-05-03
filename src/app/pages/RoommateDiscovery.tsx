import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, X, Check, List } from "lucide-react";
import { tenants, pgListings, type Tenant } from "../data/mockData";

const matchColor = (pct: number) => {
  if (pct >= 85) return "bg-green-500 text-white";
  if (pct >= 70) return "bg-teal-500 text-white";
  return "bg-amber-500 text-white";
};

function TenantCard({ tenant, onLike, onPass }: { tenant: Tenant; onLike: () => void; onPass: () => void }) {
  const [dragX, setDragX] = useState(0);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      onDrag={(_, info) => setDragX(info.offset.x)}
      onDragEnd={(_, info) => {
        if (info.offset.x > 80) onLike();
        else if (info.offset.x < -80) onPass();
        setDragX(0);
      }}
      animate={{ rotate: dragX * 0.05 }}
      style={{ touchAction: "none" }}
    >
      <div className="h-full rounded-3xl overflow-hidden bg-white shadow-2xl relative">
        {/* Profile Photo */}
        <div className="relative h-[62%]">
          <img src={tenant.photo} alt={tenant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Vibe Match Badge */}
          <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-bold ${matchColor(tenant.vibeMatch)}`}>
            {tenant.vibeMatch}% Match {tenant.vibeMatch >= 85 ? "🔥" : "✨"}
          </div>

          {/* Like / Pass overlay indicators */}
          {dragX > 30 && (
            <div className="absolute top-12 left-6 bg-green-500 border-4 border-green-400 rounded-2xl px-5 py-2 rotate-[-15deg]">
              <span className="text-white font-black text-xl">LIKE 👍</span>
            </div>
          )}
          {dragX < -30 && (
            <div className="absolute top-12 right-6 bg-red-500 border-4 border-red-400 rounded-2xl px-5 py-2 rotate-[15deg]">
              <span className="text-white font-black text-xl">PASS ❌</span>
            </div>
          )}

          {/* Name & basic info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white font-bold text-2xl">{tenant.name}, {tenant.age}</h2>
            <p className="text-white/80 text-sm">{tenant.gender}</p>
          </div>
        </div>

        {/* Card Info */}
        <div className="px-4 py-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-slate-600 text-sm">💼 {tenant.occupation}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 text-sm">📍 From {tenant.fromCity}</span>
          </div>
          <div className="bg-indigo-50 rounded-xl px-3 py-2 text-xs text-indigo-700 font-medium mb-3">
            {tenant.status}
          </div>

          {/* Lifestyle tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tenant.lifestyle.map(tag => (
              <span key={tag} className="bg-teal-50 text-teal-700 text-xs px-2.5 py-1 rounded-full border border-teal-100">{tag}</span>
            ))}
          </div>
          {/* Interest tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tenant.interests.map(tag => (
              <span key={tag} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full border border-indigo-100">{tag}</span>
            ))}
          </div>

          {tenant.aboutMe && (
            <p className="text-slate-500 text-xs italic">"{tenant.aboutMe}"</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MatchScreen({ tenant, onContinue }: { tenant: Tenant; onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-teal-900 flex flex-col items-center justify-center px-8 z-50"
    >
      <div className="text-center">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-3xl font-black text-white mb-2">You both vibed!</h2>
        <p className="text-teal-300 text-base mb-6">You and {tenant.name} matched at this PG</p>

        <div className="flex justify-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full border-4 border-teal-400 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1770564513018-79915efba870?w=200" alt="You" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-center text-3xl">💖</div>
          <div className="w-20 h-20 rounded-full border-4 border-indigo-400 overflow-hidden">
            <img src={tenant.photo} alt={tenant.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-3 w-full">
          <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-green-500/30">
            💬 Send a Message (WhatsApp)
          </button>
          <button
            onClick={onContinue}
            className="w-full border border-white/30 text-white/80 py-3.5 rounded-2xl text-sm"
          >
            Keep Exploring
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function RoommateDiscovery() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = pgListings.find(p => p.id === id) || pgListings[0];
  const [activeTab, setActiveTab] = useState<"living" | "looking">("living");
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack");
  const [cardIdx, setCardIdx] = useState(0);
  const [matchedTenant, setMatchedTenant] = useState<Tenant | null>(null);
  const [swipedIds, setSwipedIds] = useState<string[]>([]);

  const livingTenants = tenants.filter(t => pg.tenantIds.includes(t.id) && t.since);
  const lookingTenants = tenants.filter(t => !t.since);
  const currentList = activeTab === "living" ? livingTenants : lookingTenants;
  const remaining = currentList.filter(t => !swipedIds.includes(t.id));

  const handleLike = (tenant: Tenant) => {
    setSwipedIds(prev => [...prev, tenant.id]);
    // 50% chance of match
    if (Math.random() > 0.5) {
      setMatchedTenant(tenant);
    } else {
      setCardIdx(i => i + 1);
    }
  };

  const handlePass = (tenant: Tenant) => {
    setSwipedIds(prev => [...prev, tenant.id]);
    setCardIdx(i => i + 1);
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div>
          <p className="text-white font-semibold text-sm text-center">{pg.name}</p>
          <p className="text-slate-400 text-xs text-center">Roommate Discovery</p>
        </div>
        <button
          onClick={() => setViewMode(v => v === "stack" ? "list" : "stack")}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <List size={18} className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex mx-4 bg-white/10 rounded-2xl p-1 mb-4">
        <button
          onClick={() => { setActiveTab("living"); setCardIdx(0); setSwipedIds([]); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "living" ? "bg-white text-slate-900" : "text-white/70"
          }`}
        >
          Living Here 🏠
        </button>
        <button
          onClick={() => { setActiveTab("looking"); setCardIdx(0); setSwipedIds([]); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "looking" ? "bg-white text-slate-900" : "text-white/70"
          }`}
        >
          Also Looking 🔍
        </button>
      </div>

      {/* Card Stack View */}
      {viewMode === "stack" ? (
        <div className="flex-1 relative mx-4">
          {remaining.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-white font-bold text-xl mb-2">All caught up!</h3>
              <p className="text-slate-400 text-sm">You've seen everyone {activeTab === "living" ? "living here" : "looking at this PG"}</p>
            </div>
          ) : (
            <>
              {/* Background cards for stack effect */}
              {remaining.slice(1, 3).reverse().map((t, i) => (
                <div
                  key={t.id}
                  className="absolute inset-0 rounded-3xl bg-white/20 border border-white/10"
                  style={{
                    transform: `scale(${0.95 - i * 0.03}) translateY(${-i * 8}px)`,
                    zIndex: i
                  }}
                />
              ))}

              {/* Top card */}
              <div className="absolute inset-0 z-10">
                <AnimatePresence mode="wait">
                  <TenantCard
                    key={remaining[0].id}
                    tenant={remaining[0]}
                    onLike={() => handleLike(remaining[0])}
                    onPass={() => handlePass(remaining[0])}
                  />
                </AnimatePresence>
              </div>
            </>
          )}

          {/* Match Screen Overlay */}
          {matchedTenant && (
            <MatchScreen
              tenant={matchedTenant}
              onContinue={() => { setMatchedTenant(null); setCardIdx(i => i + 1); }}
            />
          )}
        </div>
      ) : (
        // List View
        <div className="flex-1 overflow-y-auto px-4 space-y-3">
          {currentList.map(tenant => (
            <button
              key={tenant.id}
              onClick={() => navigate(`/roommate/${tenant.id}`)}
              className="w-full bg-white/10 rounded-2xl p-4 flex items-center gap-3 text-left"
            >
              <img src={tenant.photo} alt={tenant.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-white font-semibold text-sm">{tenant.name}, {tenant.age}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${matchColor(tenant.vibeMatch)}`}>
                    {tenant.vibeMatch}%
                  </span>
                </div>
                <p className="text-slate-400 text-xs">{tenant.occupation} · {tenant.fromCity}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tenant.interests.slice(0, 2).map(i => (
                    <span key={i} className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full">{i}</span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {viewMode === "stack" && remaining.length > 0 && !matchedTenant && (
        <div className="flex justify-center gap-6 py-5 px-4">
          <button
            onClick={() => handlePass(remaining[0])}
            className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border-2 border-red-400/50 active:scale-90 transition-transform"
          >
            <X size={28} className="text-red-400" />
          </button>
          <button
            onClick={() => navigate(`/roommate/${remaining[0].id}`)}
            className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mt-2"
          >
            <span className="text-white text-xs">Info</span>
          </button>
          <button
            onClick={() => handleLike(remaining[0])}
            className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-400/50 active:scale-90 transition-transform"
          >
            <Check size={28} className="text-green-400" />
          </button>
        </div>
      )}
    </div>
  );
}
