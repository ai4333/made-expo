import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Heart, MapPin, Star, Wifi, Wind, UtensilsCrossed, WashingMachine, Shield,
  BarChart2, Users, Clock, Trash2, Bookmark, Zap,
} from "lucide-react";
import { pgListings, tenants, type PGListing, type Tenant, IMAGES } from "../data/mockData";

const amenityIcons: Record<string, JSX.Element> = {
  WiFi: <Wifi size={12} />,
  AC: <Wind size={12} />,
  Meals: <UtensilsCrossed size={12} />,
  Laundry: <WashingMachine size={12} />,
  CCTV: <Shield size={12} />,
};

// ── Matched profiles (previously in Matches nav) ─────────────
const matchedProfiles = tenants.filter(t => t.vibeMatch >= 70).sort((a, b) => b.vibeMatch - a.vibeMatch);

const matchColor = (pct: number) => {
  if (pct >= 85) return "bg-green-100 text-green-700";
  if (pct >= 70) return "bg-teal-100 text-teal-700";
  return "bg-amber-100 text-amber-700";
};

function MatchedCard({ tenant, onView }: { tenant: Tenant; onView: () => void }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 mx-4 mb-4">
      <div className="relative h-44">
        <img src={tenant.photo} alt={tenant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${matchColor(tenant.vibeMatch)}`}>
          {tenant.vibeMatch}% Match {tenant.vibeMatch >= 85 ? "🔥" : "✨"}
        </div>
        <div className="absolute bottom-3 left-4">
          <h3 className="text-white font-bold text-lg">{tenant.name}, {tenant.age}</h3>
          <p className="text-white/80 text-xs">{tenant.occupation} · {tenant.fromCity}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tenant.lifestyle.slice(0, 3).map(l => (
            <span key={l} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full font-medium">{l}</span>
          ))}
        </div>
        <p className="text-slate-500 text-xs mb-3 line-clamp-2">{tenant.aboutMe}</p>
        <div className="flex gap-2 text-xs text-slate-400 mb-3">
          <span>🌙 Sleeps {tenant.sleepTime}</span>
          <span>·</span>
          <span>🌅 Wakes {tenant.wakeTime}</span>
        </div>
        <button
          onClick={onView}
          className="w-full bg-indigo-600 text-white py-3 rounded-2xl text-sm font-semibold shadow-md shadow-indigo-500/30 active:scale-95 transition-transform"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

// ── Saved PG Card ─────────────────────────────────────────────
function SavedCard({ pg, selected, onSelect, onView, onRemove }: {
  pg: PGListing;
  selected: boolean;
  onSelect: () => void;
  onView: () => void;
  onRemove: () => void;
}) {
  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm border-2 mx-4 mb-4 transition-all ${selected ? "border-indigo-500" : "border-slate-100"}`}>
      <div className="relative h-44">
        <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <button
          onClick={onSelect}
          className={`absolute top-3 left-3 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? "bg-indigo-600 border-indigo-600" : "bg-white/80 border-white"
          }`}
        >
          {selected && <span className="text-white text-xs">✓</span>}
        </button>

        <button
          onClick={onRemove}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
        >
          <Heart size={14} className="fill-rose-500 text-rose-500" />
        </button>

        <div className={`absolute bottom-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium ${
          pg.bedsAvailable > 0 ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
        }`}>
          {pg.bedsAvailable > 0 ? `${pg.bedsAvailable} Beds Available` : "Full"}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="text-slate-900 font-bold text-base">{pg.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-slate-400" />
              <span className="text-slate-500 text-xs">{pg.area} · {pg.distance}</span>
            </div>
          </div>
          <span className="text-teal-600 font-bold">₹{pg.price.toLocaleString()}<span className="text-slate-400 text-xs font-normal">/mo</span></span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-slate-600 text-xs font-medium">{pg.rating}</span>
          </div>
          <div className="flex gap-2">
            {pg.amenities.slice(0, 4).map(a => (
              <div key={a} className="flex items-center gap-1 text-slate-400">
                {amenityIcons[a]}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl px-3 py-2 mb-3 flex items-center gap-2">
          <Users size={12} className="text-amber-500" />
          <span className="text-amber-700 text-xs font-medium">3 people also looking at this</span>
          <div className="ml-auto flex items-center gap-1 text-slate-400">
            <Clock size={11} />
            <span className="text-xs">Updated 2d ago</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onView}
            className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl text-sm font-semibold active:scale-95 transition-transform"
          >
            View PG
          </button>
          <button
            onClick={onRemove}
            className="w-11 h-11 border border-slate-200 rounded-2xl flex items-center justify-center"
          >
            <Trash2 size={16} className="text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Compare Modal ─────────────────────────────────────────────
function CompareModal({ pgs, onClose }: { pgs: PGListing[]; onClose: () => void }) {
  const params = ["Price/mo", "Rating", "Beds Available", "Distance", "Amenities", "WiFi", "AC", "Meals", "Gym"];

  const getValue = (pg: PGListing, param: string) => {
    switch (param) {
      case "Price/mo": return `₹${pg.price.toLocaleString()}`;
      case "Rating": return `⭐ ${pg.rating}`;
      case "Beds Available": return pg.bedsAvailable > 0 ? `✅ ${pg.bedsAvailable}` : "❌ Full";
      case "Distance": return pg.distance;
      case "Amenities": return `${Object.values(pg.allAmenities).filter(Boolean).length}/12`;
      case "WiFi": return pg.allAmenities.WiFi ? "✅" : "❌";
      case "AC": return pg.allAmenities.AC ? "✅" : "❌";
      case "Meals": return pg.allAmenities.Meals ? "✅" : "❌";
      case "Gym": return pg.allAmenities.Gym ? "✅" : "❌";
      default: return "-";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={onClose}>
      <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-slate-900 font-bold text-lg">Compare PGs</h2>
          <button onClick={onClose} className="text-slate-500 text-sm">Close</button>
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-4 py-3 text-slate-500 text-xs font-semibold w-28">Parameter</th>
                {pgs.map(pg => (
                  <th key={pg.id} className="px-3 py-3 text-center">
                    <p className="text-slate-900 font-semibold text-xs">{pg.name.split(" ").slice(0, 2).join(" ")}</p>
                    <p className="text-teal-600 font-bold text-sm">₹{pg.price.toLocaleString()}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {params.map((param, i) => (
                <tr key={param} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  <td className="px-4 py-3 text-slate-500 text-xs font-medium">{param}</td>
                  {pgs.map(pg => (
                    <td key={pg.id} className="px-3 py-3 text-center text-slate-700 text-xs">{getValue(pg, param)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export function SavedPGs() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"saved" | "matched">("saved");
  const [savedPGs, setSavedPGs] = useState(pgListings.filter(p => p.saved));
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedForCompare(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleRemove = (id: string) => {
    setSavedPGs(prev => prev.filter(p => p.id !== id));
    setSelectedForCompare(prev => prev.filter(x => x !== id));
  };

  const comparePGs = pgListings.filter(p => selectedForCompare.includes(p.id));

  return (
    <div className="bg-slate-50 min-h-full pb-8">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-0 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-slate-900 font-bold text-xl flex items-center gap-2">
              {tab === "saved" ? (
                <>Saved PGs <Bookmark size={18} className="text-indigo-500" /></>
              ) : (
                <>Matched <Zap size={18} className="text-amber-500" /></>
              )}
              <span className={`text-sm px-2.5 py-0.5 rounded-full font-semibold ${
                tab === "saved" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
              }`}>
                {tab === "saved" ? savedPGs.length : matchedProfiles.length}
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {tab === "saved" ? "Your shortlisted properties" : "People you vibe with"}
            </p>
          </div>
          {tab === "saved" && selectedForCompare.length >= 2 && (
            <button
              onClick={() => setShowCompare(true)}
              className="flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
            >
              <BarChart2 size={16} />
              Compare ({selectedForCompare.length})
            </button>
          )}
        </div>

        {/* Tab Toggle */}
        <div className="flex rounded-xl p-1 mb-0" style={{ background: "#F1F5F9" }}>
          <button
            onClick={() => setTab("saved")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              tab === "saved" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-400"
            }`}
          >
            <Bookmark size={15} /> Saved
          </button>
          <button
            onClick={() => setTab("matched")}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-1.5 ${
              tab === "matched" ? "bg-white text-amber-500 shadow-sm" : "text-slate-400"
            }`}
          >
            <Zap size={15} /> Matched
          </button>
        </div>
      </div>

      {/* ── Saved Tab ──────────────────────────────────── */}
      {tab === "saved" && (
        <>
          {savedPGs.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center">
              <div className="text-6xl mb-4">🔖</div>
              <h2 className="text-slate-900 font-bold text-xl mb-2">No Saved PGs Yet</h2>
              <p className="text-slate-500 text-sm mb-6">You haven't saved any PGs yet. Start exploring and heart the ones you love!</p>
              <button
                onClick={() => navigate("/tenant")}
                className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30"
              >
                Start Exploring 🏠
              </button>
            </div>
          ) : (
            <div className="pt-4">
              {selectedForCompare.length > 0 && (
                <div className="mx-4 mb-4 bg-indigo-50 border border-indigo-200 rounded-2xl p-3 flex items-center gap-2">
                  <span className="text-indigo-600 text-xs font-medium">✓ Tap cards to select for comparison (max 3)</span>
                  <button
                    onClick={() => setSelectedForCompare([])}
                    className="ml-auto text-indigo-600 text-xs font-semibold"
                  >
                    Clear
                  </button>
                </div>
              )}
              {savedPGs.map(pg => (
                <SavedCard
                  key={pg.id}
                  pg={pg}
                  selected={selectedForCompare.includes(pg.id)}
                  onSelect={() => toggleSelect(pg.id)}
                  onView={() => navigate(`/pg/${pg.id}`)}
                  onRemove={() => handleRemove(pg.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Matched Tab ────────────────────────────────── */}
      {tab === "matched" && (
        <div className="pt-4">
          {/* Info banner */}
          <div className="mx-4 mb-4 bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-center gap-2">
            <Zap size={15} className="text-amber-500 flex-shrink-0" />
            <p className="text-amber-700 text-xs font-medium">These are people whose vibe matches yours — connect and co-rent!</p>
          </div>
          {matchedProfiles.map(tenant => (
            <MatchedCard
              key={tenant.id}
              tenant={tenant}
              onView={() => navigate(`/roommate/${tenant.id}`)}
            />
          ))}
        </div>
      )}

      {showCompare && (
        <CompareModal pgs={comparePGs} onClose={() => setShowCompare(false)} />
      )}
    </div>
  );
}
