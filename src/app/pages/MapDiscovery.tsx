import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Search, SlidersHorizontal, Navigation, List, X } from "lucide-react";
import { pgListings, type PGListing } from "../data/mockData";

const mapPins = [
  { id: "pg1", x: 35, y: 42, price: 8500 },
  { id: "pg2", x: 62, y: 28, price: 9500 },
  { id: "pg3", x: 48, y: 60, price: 7500 },
  { id: "pg4", x: 72, y: 55, price: 6500 },
  // Cluster
  { id: "cluster1", x: 25, y: 35, price: null, count: 3 },
];

function MiniCard({ pg, onView }: { pg: PGListing; onView: () => void }) {
  return (
    <div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100">
      <div className="relative h-32">
        <img src={pg.images[0]} alt={pg.name} className="w-full h-full object-cover" />
        <div className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full font-medium ${
          pg.bedsAvailable > 0 ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"
        }`}>
          {pg.bedsAvailable > 0 ? `${pg.bedsAvailable} Beds` : "Full"}
        </div>
        <div className="absolute top-2 right-2 bg-indigo-600/90 text-white text-xs px-2 py-1 rounded-full font-semibold">
          78% Match ✨
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-slate-900 font-semibold text-sm mb-0.5">{pg.name}</h3>
        <p className="text-slate-500 text-xs mb-2">{pg.area} · {pg.distance}</p>
        <div className="flex items-center justify-between">
          <span className="text-teal-600 font-bold text-base">₹{pg.price.toLocaleString()}<span className="text-slate-400 text-xs font-normal">/mo</span></span>
          <button
            onClick={onView}
            className="bg-indigo-600 text-white text-xs px-3 py-2 rounded-xl font-semibold active:scale-95 transition-transform"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

export function MapDiscovery() {
  const navigate = useNavigate();
  const [selectedPGId, setSelectedPGId] = useState<string | null>(null);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(true);
  const [filterCount] = useState(2);

  const selectedPG = pgListings.find(p => p.id === selectedPGId);

  return (
    <div className="relative overflow-hidden" style={{ height: "calc(100vh - 56px)" }}>
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-blue-100">
        {/* Roads */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 700">
          {/* Main roads */}
          <line x1="0" y1="200" x2="400" y2="200" stroke="#94a3b8" strokeWidth="8" />
          <line x1="0" y1="350" x2="400" y2="380" stroke="#94a3b8" strokeWidth="8" />
          <line x1="0" y1="500" x2="400" y2="480" stroke="#94a3b8" strokeWidth="6" />
          <line x1="100" y1="0" x2="120" y2="700" stroke="#94a3b8" strokeWidth="8" />
          <line x1="250" y1="0" x2="270" y2="700" stroke="#94a3b8" strokeWidth="8" />
          {/* Secondary roads */}
          <line x1="0" y1="280" x2="400" y2="280" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="0" y1="430" x2="400" y2="420" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="170" y1="0" x2="180" y2="700" stroke="#cbd5e1" strokeWidth="4" />
          <line x1="330" y1="0" x2="340" y2="700" stroke="#cbd5e1" strokeWidth="4" />
          {/* Blocks */}
          <rect x="120" y="210" width="130" height="70" fill="#e2e8f0" rx="4" />
          <rect x="260" y="210" width="130" height="70" fill="#e2e8f0" rx="4" />
          <rect x="120" y="390" width="130" height="90" fill="#e2e8f0" rx="4" />
          <rect x="260" y="390" width="130" height="90" fill="#e2e8f0" rx="4" />
          {/* Park */}
          <rect x="5" y="210" width="95" height="70" fill="#bbf7d0" rx="4" />
          <text x="40" y="250" fontSize="20">🌳</text>
          {/* Labels */}
          <text x="145" y="245" fontSize="9" fill="#64748b">Koramangala</text>
          <text x="275" y="245" fontSize="9" fill="#64748b">Indiranagar</text>
          <text x="145" y="435" fontSize="9" fill="#64748b">HSR Layout</text>
          <text x="275" y="435" fontSize="9" fill="#64748b">Whitefield</text>
        </svg>

        {/* PG Pins */}
        {mapPins.map(pin => (
          <button
            key={pin.id}
            onClick={() => {
              if (pin.count) return;
              setSelectedPGId(pin.id === selectedPGId ? null : pin.id);
              setBottomSheetOpen(true);
            }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            {pin.count ? (
              <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white">
                {pin.count}
              </div>
            ) : (
              <div className={`px-3 py-2 rounded-full font-bold text-xs shadow-lg border-2 flex items-center gap-1 transition-all ${
                selectedPGId === pin.id
                  ? "bg-indigo-600 text-white border-indigo-400 scale-110"
                  : "bg-white text-slate-800 border-white"
              }`}>
                <span>🏠</span>
                ₹{(pin.price! / 1000).toFixed(1)}k
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Top Search Bar */}
      <div className="relative z-20 px-4 pt-12 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md"
          >
            <ChevronLeft size={20} className="text-slate-700" />
          </button>
          <div className="flex-1 bg-white rounded-2xl flex items-center gap-3 px-4 py-3 shadow-md">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search area, locality, landmark..."
              className="flex-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Floating Right Buttons */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        <button className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md">
          <Navigation size={18} className="text-indigo-600" />
        </button>
        <button className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-md relative">
          <SlidersHorizontal size={18} className="text-slate-600" />
          {filterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {filterCount}
            </span>
          )}
        </button>
      </div>

      {/* Bottom Left Toggle */}
      <div className="absolute left-4 bottom-52 z-20">
        <button
          onClick={() => navigate("/tenant")}
          className="bg-white rounded-2xl flex items-center gap-2 px-4 py-3 shadow-md"
        >
          <List size={16} className="text-slate-600" />
          <span className="text-slate-700 text-sm font-medium">List View</span>
        </button>
      </div>

      {/* Bottom Sheet */}
      {bottomSheetOpen && (
        <div className="absolute bottom-0 left-0 right-0 z-30">
          {/* Collapsed state - mini cards scroll */}
          {!selectedPG ? (
            <div className="bg-white rounded-t-3xl px-4 pt-4 pb-8 shadow-2xl">
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-800 font-semibold text-sm">{pgListings.length} PGs nearby</p>
                <button onClick={() => setBottomSheetOpen(false)}>
                  <X size={18} className="text-slate-400" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
                {pgListings.map(pg => (
                  <MiniCard
                    key={pg.id}
                    pg={pg}
                    onView={() => navigate(`/pg/${pg.id}`)}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Expanded state for selected PG
            <div className="bg-white rounded-t-3xl shadow-2xl">
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-2" />
              <div className="px-4 pb-8">
                <div className="flex gap-3">
                  <img src={selectedPG.images[0]} alt={selectedPG.name} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-slate-900 font-bold text-base">{selectedPG.name}</h3>
                      <button onClick={() => setSelectedPGId(null)}>
                        <X size={18} className="text-slate-400" />
                      </button>
                    </div>
                    <p className="text-slate-500 text-sm">{selectedPG.area} · {selectedPG.distance}</p>
                    <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${
                      selectedPG.bedsAvailable > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {selectedPG.bedsAvailable > 0 ? `${selectedPG.bedsAvailable} Beds Available` : "Full"}
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-teal-600 font-bold">₹{selectedPG.price.toLocaleString()}/mo</span>
                      <button
                        onClick={() => navigate(`/pg/${selectedPG.id}`)}
                        className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-xl font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {!bottomSheetOpen && (
        <button
          onClick={() => setBottomSheetOpen(true)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
        >
          Show {pgListings.length} PGs
        </button>
      )}
    </div>
  );
}