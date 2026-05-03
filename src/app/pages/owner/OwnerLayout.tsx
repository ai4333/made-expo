import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Building2, IndianRupee, User } from "lucide-react";

const PRIMARY = "#8A2BE2";
const PRIMARY_GHOST = "rgba(138,43,226,0.10)";
const MUTED = "#9CA3AF";
const WA_GREEN = "#25D366";

// WhatsApp SVG icon for the tab bar
const WATabIcon = ({ active }: { active: boolean }) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill={active ? WA_GREEN : MUTED}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.523 5.856L.057 23.882l6.204-1.629A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.213-3.681.967.983-3.587-.234-.373A9.817 9.817 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
  </svg>
);

const tabs = [
  { path: "/owner", icon: Home, label: "Home", exact: true },
  { path: "/owner/pgs", icon: Building2, label: "PGs" },
  { path: "/owner/rent", icon: IndianRupee, label: "Rent" },
  { path: "/owner/whatsapp-hub", icon: null, label: "WhatsApp" },
  { path: "/owner/settings", icon: User, label: "Profile" },
];

export function OwnerLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === "/owner";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#F8F6FF" }}>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>

      {/* Bottom Nav */}
      <nav
        className="flex items-center justify-around flex-shrink-0"
        style={{
          height: 68,
          background: "#FFFFFF",
          borderTop: "1px solid #EDE9FE",
          boxShadow: "0 -4px 20px rgba(138,43,226,0.07)",
        }}
      >
        {tabs.map(({ path, icon: Icon, label, exact }) => {
          const active = isActive(path, exact);
          const isWhatsApp = label === "WhatsApp";
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 flex-1 py-2 transition-all"
            >
              <div
                className="p-1.5 rounded-xl transition-all"
                style={{
                  background: active
                    ? isWhatsApp
                      ? "rgba(37,211,102,0.12)"
                      : PRIMARY_GHOST
                    : "transparent",
                }}
              >
                {isWhatsApp ? (
                  <WATabIcon active={active} />
                ) : Icon ? (
                  <Icon
                    size={20}
                    style={{ color: active ? PRIMARY : MUTED }}
                    strokeWidth={active ? 2.5 : 1.8}
                  />
                ) : null}
              </div>
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: active
                    ? isWhatsApp
                      ? WA_GREEN
                      : PRIMARY
                    : MUTED,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}