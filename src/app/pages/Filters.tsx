import { useState } from "react";
import { useNavigate } from "react-router";
import { X, ChevronLeft } from "lucide-react";

const localities = ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Marathahalli", "BTM Layout", "Electronic City", "Bellandur"];
const amenityOptions = ["WiFi", "AC", "Meals", "Hot Water", "Gym", "Laundry", "CCTV", "Parking", "Power Backup"];
const lifestyleTags = ["Early Bird 🌅", "Night Owl 🦉", "Homebody 🏠", "Social Butterfly 🦋", "Gym Freak 💪", "Foodie 🍕", "Traveller ✈️", "Minimalist"];
const interestTags = ["Music 🎵", "Gaming 🎮", "Reading 📚", "Movies 🎬", "Art 🎨", "Fitness 🏋️", "Cooking 🍳", "Tech 💻", "Sports ⚽", "Dancing 💃"];

function ChipButton({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`px-3 py-2 rounded-full text-xs font-medium border transition-all ${
        selected ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20" : "bg-white text-slate-600 border-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

export function Filters() {
  const navigate = useNavigate();
  const [activeGroup, setActiveGroup] = useState<"pg" | "roommate">("pg");
  const [selectedLocalities, setSelectedLocalities] = useState<string[]>([]);
  const [budget, setBudget] = useState([3000, 50000]);
  const [roomType, setRoomType] = useState("Any");
  const [genderPref, setGenderPref] = useState("Any");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [availableNow, setAvailableNow] = useState(false);

  // Roommate filters
  const [rmGender, setRmGender] = useState("No Preference");
  const [ageRange, setAgeRange] = useState([18, 40]);
  const [occupationType, setOccupationType] = useState("Any");
  const [sleepSchedule, setSleepSchedule] = useState("No Preference");
  const [noiseLevel, setNoiseLevel] = useState("No Preference");
  const [guestPolicy, setGuestPolicy] = useState("No Preference");
  const [vibeMinMatch, setVibeMinMatch] = useState(60);
  const [selectedLifestyle, setSelectedLifestyle] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter(x => x !== item) : [...list, item]);
  };

  const handleReset = () => {
    setSelectedLocalities([]); setBudget([3000, 50000]); setRoomType("Any");
    setGenderPref("Any"); setSelectedAmenities([]); setAvailableNow(false);
    setRmGender("No Preference"); setAgeRange([18, 40]); setOccupationType("Any");
    setSleepSchedule("No Preference"); setNoiseLevel("No Preference"); setGuestPolicy("No Preference");
    setVibeMinMatch(60); setSelectedLifestyle([]); setSelectedInterests([]);
  };

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft size={22} className="text-slate-700" />
        </button>
        <h1 className="text-slate-900 font-bold text-lg">Filters</h1>
        <button onClick={handleReset} className="text-indigo-600 text-sm font-semibold">Reset All</button>
      </div>

      {/* Toggle */}
      <div className="flex mx-4 my-3 bg-slate-100 rounded-2xl p-1">
        <button
          onClick={() => setActiveGroup("pg")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeGroup === "pg" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
          }`}
        >
          🏠 PG Filters
        </button>
        <button
          onClick={() => setActiveGroup("roommate")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeGroup === "roommate" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
          }`}
        >
          👥 Roommate Filters
        </button>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {activeGroup === "pg" ? (
          <div className="space-y-6">
            {/* City */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">City</label>
              <select className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 bg-white">
                {["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Locality */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Locality</label>
              <div className="flex flex-wrap gap-2">
                {localities.map(l => (
                  <ChipButton
                    key={l}
                    label={l}
                    selected={selectedLocalities.includes(l)}
                    onToggle={() => toggleItem(l, selectedLocalities, setSelectedLocalities)}
                  />
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-1 block">
                Budget: <span className="text-indigo-600">₹{budget[0].toLocaleString()} – ₹{budget[1].toLocaleString()}/mo</span>
              </label>
              <div className="bg-slate-50 rounded-2xl p-4">
                <input
                  type="range"
                  min="3000"
                  max="50000"
                  step="500"
                  value={budget[1]}
                  onChange={e => setBudget([budget[0], +e.target.value])}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>₹3,000</span><span>₹50,000</span>
                </div>
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Room Type</label>
              <div className="grid grid-cols-2 gap-2">
                {["Single", "Shared 2", "Shared 3", "Any"].map(r => (
                  <button
                    key={r}
                    onClick={() => setRoomType(r)}
                    className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      roomType === r ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Gender Preference</label>
              <div className="flex flex-wrap gap-2">
                {["Male Only", "Female Only", "Co-ed", "Any"].map(g => (
                  <ChipButton key={g} label={g} selected={genderPref === g} onToggle={() => setGenderPref(g)} />
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map(a => (
                  <ChipButton
                    key={a}
                    label={a}
                    selected={selectedAmenities.includes(a)}
                    onToggle={() => toggleItem(a, selectedAmenities, setSelectedAmenities)}
                  />
                ))}
              </div>
            </div>

            {/* Available Now */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Available Now</p>
                <p className="text-xs text-slate-500">Show only currently available PGs</p>
              </div>
              <button
                onClick={() => setAvailableNow(!availableNow)}
                className={`w-12 h-6 rounded-full transition-all relative ${availableNow ? "bg-indigo-600" : "bg-slate-200"}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${availableNow ? "left-7" : "left-1"}`} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Roommate Gender */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Preferred Roommate Gender</label>
              <div className="flex flex-wrap gap-2">
                {["Male", "Female", "No Preference"].map(g => (
                  <ChipButton key={g} label={g} selected={rmGender === g} onToggle={() => setRmGender(g)} />
                ))}
              </div>
            </div>

            {/* Age Range */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-1 block">
                Age Range: <span className="text-indigo-600">{ageRange[0]} – {ageRange[1]} years</span>
              </label>
              <div className="bg-slate-50 rounded-2xl p-4">
                <input
                  type="range"
                  min="18"
                  max="40"
                  value={ageRange[1]}
                  onChange={e => setAgeRange([ageRange[0], +e.target.value])}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>18 yrs</span><span>40 yrs</span>
                </div>
              </div>
            </div>

            {/* Occupation Type */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Occupation Type</label>
              <div className="flex flex-wrap gap-2">
                {["Student 🎓", "Working Professional 💼", "Freelancer 🖥️", "Any"].map(o => (
                  <ChipButton key={o} label={o} selected={occupationType === o} onToggle={() => setOccupationType(o)} />
                ))}
              </div>
            </div>

            {/* Sleep Schedule */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Sleep Schedule</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Early Bird", icon: "🌅" },
                  { label: "Night Owl", icon: "🦉" },
                  { label: "No Preference", icon: "😴" },
                ].map(s => (
                  <button
                    key={s.label}
                    onClick={() => setSleepSchedule(s.label)}
                    className={`py-3 rounded-xl text-xs font-medium border-2 flex flex-col items-center gap-1 transition-all ${
                      sleepSchedule === s.label ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600"
                    }`}
                  >
                    <span className="text-xl">{s.icon}</span>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Noise Level */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Noise Level Preference</label>
              <div className="flex gap-2">
                {["Quiet", "Moderate", "Lively", "No Preference"].map(n => (
                  <ChipButton key={n} label={n} selected={noiseLevel === n} onToggle={() => setNoiseLevel(n)} />
                ))}
              </div>
            </div>

            {/* Guest Policy */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Guest Policy</label>
              <div className="flex flex-wrap gap-2">
                {["Fine with Guests", "Prefer No Guests", "No Preference"].map(g => (
                  <ChipButton key={g} label={g} selected={guestPolicy === g} onToggle={() => setGuestPolicy(g)} />
                ))}
              </div>
            </div>

            {/* Vibe Match Minimum */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-1 block">
                Minimum Vibe Match: <span className="text-indigo-600">{vibeMinMatch}%+</span>
              </label>
              <div className="bg-slate-50 rounded-2xl p-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={vibeMinMatch}
                  onChange={e => setVibeMinMatch(+e.target.value)}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>0%</span><span>100%</span>
                </div>
              </div>
            </div>

            {/* Lifestyle Tags */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Lifestyle Tags</label>
              <div className="flex flex-wrap gap-2">
                {lifestyleTags.map(tag => (
                  <ChipButton
                    key={tag}
                    label={tag}
                    selected={selectedLifestyle.includes(tag)}
                    onToggle={() => toggleItem(tag, selectedLifestyle, setSelectedLifestyle)}
                  />
                ))}
              </div>
            </div>

            {/* Interest Tags */}
            <div>
              <label className="text-sm font-semibold text-slate-800 mb-2 block">Interest Tags</label>
              <div className="flex flex-wrap gap-2">
                {interestTags.map(tag => (
                  <ChipButton
                    key={tag}
                    label={tag}
                    selected={selectedInterests.includes(tag)}
                    onToggle={() => toggleItem(tag, selectedInterests, setSelectedInterests)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="px-4 py-4 pb-8 border-t border-slate-100 bg-white">
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-base shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform"
        >
          Show 12 PGs ✨
        </button>
      </div>
    </div>
  );
}