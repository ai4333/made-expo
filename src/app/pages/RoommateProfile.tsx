import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Moon, Sun, Users, Laptop, Volume2, Sparkles, UtensilsCrossed, Flag } from "lucide-react";
import { tenants, currentUser } from "../data/mockData";

const matchColor = (pct: number) => {
  if (pct >= 85) return "bg-green-100 text-green-700 border-green-200";
  if (pct >= 70) return "bg-teal-100 text-teal-700 border-teal-200";
  return "bg-amber-100 text-amber-700 border-amber-200";
};

export function RoommateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant = tenants.find(t => t.id === id) || tenants[0];

  // Mutual interests
  const myInterests = currentUser.interests;
  const mutualInterests = tenant.interests.filter(i => myInterests.some(mi => mi.includes(i.split(" ")[0]) || i.includes(mi.split(" ")[0])));

  // Clash detection
  const clashes: string[] = [];
  if (tenant.sleepTime !== currentUser.sleepTime) {
    clashes.push(`You're ${currentUser.sleepTime === "Before 11pm" ? "an early sleeper" : "a night owl"}, they're ${tenant.sleepTime === "Before 11pm" ? "an early sleeper" : "a night owl"} 🦉`);
  }
  if (tenant.noiseLevel !== currentUser.noiseLevel) {
    clashes.push(`Different noise preferences (you: ${currentUser.noiseLevel}, them: ${tenant.noiseLevel})`);
  }

  const habits = [
    { icon: <Moon size={16} />, label: "Sleep Time", value: tenant.sleepTime },
    { icon: <Sun size={16} />, label: "Wake Time", value: tenant.wakeTime },
    { icon: <Users size={16} />, label: "Guests", value: tenant.guestPolicy },
    { icon: <Laptop size={16} />, label: "WFH", value: tenant.wfh ? "Yes, works from home" : "Goes to office" },
    { icon: <Volume2 size={16} />, label: "Noise Level", value: tenant.noiseLevel },
    { icon: <Sparkles size={16} />, label: "Cleanliness", value: tenant.cleanliness },
    { icon: <UtensilsCrossed size={16} />, label: "Food", value: tenant.food },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-28">
      {/* Header with photo */}
      <div className="relative">
        <div className="h-72 relative">
          <img src={tenant.photo} alt={tenant.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-12 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button className="absolute top-12 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
            Send Hi 👋
          </button>

          {/* Name overlay */}
          <div className="absolute bottom-5 left-4 right-4">
            <h1 className="text-white font-bold text-2xl">{tenant.name}, {tenant.age}</h1>
            <p className="text-white/80 text-sm">{tenant.gender}</p>
          </div>
        </div>

        {/* Vibe Match Pill */}
        <div className="flex justify-center -mt-5 relative z-10">
          <div className={`px-6 py-2.5 rounded-full border-2 font-bold text-base shadow-lg bg-white ${matchColor(tenant.vibeMatch).replace("bg-", "border-")}`}>
            <span className={matchColor(tenant.vibeMatch).split(" ")[1]}>Vibe Match: {tenant.vibeMatch}% {tenant.vibeMatch >= 85 ? "🔥" : "✨"}</span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h2 className="text-slate-700 font-semibold text-sm mb-3">Basic Info</h2>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs w-24">Occupation</span>
              <span className="text-slate-700 text-sm font-medium">{tenant.occupation}</span>
            </div>
            {tenant.company && (
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs w-24">Company/College</span>
                <span className="text-slate-700 text-sm font-medium">{tenant.company}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs w-24">From</span>
              <span className="text-slate-700 text-sm font-medium">{tenant.fromCity}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs w-24">Languages</span>
              <span className="text-slate-700 text-sm font-medium">{tenant.languages.join(", ")}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs w-24">Status</span>
              <span className="text-indigo-600 text-sm font-medium bg-indigo-50 px-2 py-0.5 rounded-full">{tenant.status}</span>
            </div>
          </div>
        </div>

        {/* About Me */}
        {tenant.aboutMe && (
          <div className="bg-white rounded-2xl p-4 mb-4">
            <h2 className="text-slate-700 font-semibold text-sm mb-2">About Me</h2>
            <p className="text-slate-600 text-sm italic">"{tenant.aboutMe}"</p>
          </div>
        )}

        {/* The Vibe Section */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h2 className="text-slate-700 font-semibold text-sm mb-3">The Vibe</h2>
          
          <div className="mb-3">
            <p className="text-xs text-slate-400 font-medium mb-2">MY LIFESTYLE</p>
            <div className="flex flex-wrap gap-1.5">
              {tenant.lifestyle.map(tag => (
                <span key={tag} className="bg-teal-50 text-teal-700 border border-teal-100 text-xs px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs text-slate-400 font-medium mb-2">I'M INTO</p>
            <div className="flex flex-wrap gap-1.5">
              {tenant.interests.map(tag => (
                <span key={tag} className="bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-slate-400 font-medium mb-2">STUDY/WORK</p>
            <span className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full">{tenant.workType}</span>
          </div>
        </div>

        {/* Habits & Preferences */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <h2 className="text-slate-700 font-semibold text-sm mb-3">Habits & Preferences</h2>
          <div className="grid grid-cols-2 gap-3">
            {habits.map(h => (
              <div key={h.label} className="bg-slate-50 rounded-xl p-3 flex items-start gap-2">
                <div className="text-indigo-500 mt-0.5">{h.icon}</div>
                <div>
                  <p className="text-slate-400 text-xs">{h.label}</p>
                  <p className="text-slate-700 text-xs font-semibold mt-0.5">{h.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mutual Interests */}
        {mutualInterests.length > 0 && (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-4 mb-4">
            <h2 className="text-green-800 font-semibold text-sm mb-2">You Both Like 🤝</h2>
            <div className="flex flex-wrap gap-1.5">
              {mutualInterests.map(i => (
                <span key={i} className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium">{i}</span>
              ))}
            </div>
          </div>
        )}

        {/* Potential Clashes */}
        {clashes.length > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-4">
            <h2 className="text-amber-800 font-semibold text-sm mb-2">We Might Clash On 🤔</h2>
            <div className="space-y-1">
              {clashes.map((c, i) => (
                <p key={i} className="text-amber-700 text-xs">• {c}</p>
              ))}
            </div>
            <p className="text-amber-600 text-xs mt-2 italic">Every great roommate pair has differences — communication is key! 💬</p>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-4 pb-8 flex items-center gap-3 shadow-xl z-30">
        <button className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-500/30 active:scale-95 transition-transform">
          Express Interest as Roommate 🤝
        </button>
        <button className="flex items-center gap-1 text-slate-400 text-xs px-2">
          <Flag size={14} />
          <span>Report</span>
        </button>
      </div>
    </div>
  );
}
