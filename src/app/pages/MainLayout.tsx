import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Building2, Compass, Heart, MoreHorizontal } from "lucide-react";

const PURPLE       = "#8A2BE2";
const PURPLE_GHOST = "rgba(138,43,226,0.10)";
const CONNECT_VIOLET = "#7C3AED";
const BADGE_RED = "#F0436A";

// Total unread in Connect tab (matches mock data in ConnectHub)
const CONNECT_UNREAD = 3;

type NavKey = "home" | "mypg" | "explore" | "connect" | "more";

const NAV: { key: NavKey; icon: React.ElementType; label: string; path: string; accent?: string }[] = [
  { key: "home",    icon: Home,           label: "Home",    path: "/tenant" },
  { key: "mypg",   icon: Building2,      label: "My PG",   path: "/tenant/mypg" },
  { key: "explore", icon: Compass,       label: "Explore", path: "/tenant/explore" },
  { key: "connect", icon: Heart,         label: "Connect", path: "/tenant/connect", accent: CONNECT_VIOLET },
  { key: "more",    icon: MoreHorizontal, label: "More",   path: "/tenant/profile" },
];

function initKey(pathname: string): NavKey {
  if (pathname === "/tenant" || pathname === "/tenant/") return "home";
  if (pathname.startsWith("/tenant/profile") || pathname.startsWith("/tenant/saved")) return "more";
  if (pathname.startsWith("/tenant/mypg")) return "mypg";
  if (pathname.startsWith("/tenant/explore")) return "explore";
  if (pathname.startsWith("/tenant/connect")) return "connect";
  return "home";
}

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<NavKey>(() => initKey(location.pathname));
  const [bounce, setBounce]  = useState<NavKey | null>(null);

  // Keep active synced on browser back/forward
  useEffect(() => {
    setActive(initKey(location.pathname));
  }, [location.pathname]);

  const handleNav = (key: NavKey, path: string) => {
    setActive(key);
    setBounce(key);
    setTimeout(() => setBounce(null), 300);
    navigate(path);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100dvh", background: "#F5F3FF",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Page content */}
      <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
        <Outlet />
      </div>

      {/* Bottom nav */}
      <nav style={{
        background: "#FFFFFF",
        borderTop: "1px solid #E9E3F5",
        boxShadow: "0 -4px 20px rgba(138,43,226,0.06)",
        display: "flex", alignItems: "center",
        height: 62, flexShrink: 0,
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}>
        {NAV.map(({ key, icon: Icon, label, path, accent }) => {
          const isActive   = active === key;
          const isBouncing = bounce === key;
          const isConnect  = key === "connect";
          // Which color to use for active state
          const activeColor = accent ?? PURPLE;
          const activeGhost = isConnect
            ? "rgba(124,58,237,0.10)"
            : PURPLE_GHOST;

          return (
            <button
              key={key}
              onClick={() => handleNav(key, path)}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                gap: 2, background: "none", border: "none",
                cursor: "pointer", padding: "6px 4px",
                position: "relative",
              }}
            >
              {/* Icon container */}
              <div style={{
                width: 40, height: 34, borderRadius: 12,
                background: isActive ? activeGhost : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s ease",
                transform: isBouncing ? "scale(1.15)" : "scale(1)",
                transitionDuration: isBouncing ? "0.1s" : "0.2s",
                position: "relative",
              }}>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  color={isActive ? activeColor : "#8B7AA8"}
                  fill={isActive && isConnect ? activeColor : "none"}
                  style={{ transition: "color 0.15s ease" }}
                />

                {/* Red unread badge dot — shown on Connect tab when not active */}
                {isConnect && CONNECT_UNREAD > 0 && !isActive && (
                  <div style={{
                    position: "absolute",
                    top: 4, right: 4,
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: BADGE_RED,
                    border: "1.5px solid white",
                  }} />
                )}

                {/* Red badge dot also shown when active (corner of icon area) */}
                {isConnect && CONNECT_UNREAD > 0 && isActive && (
                  <div style={{
                    position: "absolute",
                    top: 4, right: 4,
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: BADGE_RED,
                    border: "1.5px solid white",
                  }} />
                )}
              </div>

              {/* Label */}
              <span style={{
                fontSize: 10,
                fontWeight: isActive ? 700 : 400,
                color: isActive ? activeColor : "#8B7AA8",
                transition: "color 0.15s ease",
                letterSpacing: "0.01em",
              }}>
                {label}
              </span>

              {/* Active dot at bottom */}
              <div style={{
                position: "absolute", bottom: 0,
                width: 4, height: 4, borderRadius: "50%",
                background: activeColor,
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.15s ease",
              }} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
