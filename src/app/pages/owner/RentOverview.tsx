import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Download } from "lucide-react";
import { ownerTenants, getOverallStats } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

type FilterType = "All" | "Paid" | "Pending" | "Overdue";

const AVATAR_COLORS = [
  "#8A2BE2",
  "#10B981",
  "#F59E0B",
  "#3B82F6",
  "#EF4444",
  "#EC4899",
  "#06B6D4",
  "#14B8A6",
  "#A855F7",
  "#F97316",
  "#84CC16",
  "#6366F1",
];

const STATUS_CONFIG = {
  paid: { label: "✓ Paid", bg: "rgba(16,185,129,0.12)", color: "#10B981" },
  pending: { label: "⏳ Pending", bg: "rgba(245,158,11,0.12)", color: "#F59E0B" },
  overdue: { label: "✗ Overdue", bg: "rgba(220,38,38,0.12)", color: "#DC2626" },
};

export function RentOverview() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("All");
  const stats = getOverallStats();

  const paidCount = ownerTenants.filter((t) => t.rentStatus === "paid").length;
  const pendingCount = ownerTenants.filter((t) => t.rentStatus === "pending").length;
  const overdueCount = ownerTenants.filter((t) => t.rentStatus === "overdue").length;

  const filteredTenants = ownerTenants.filter((t) => {
    if (filter === "All") return true;
    return t.rentStatus === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen pb-8" style={{ background: "#F8F6FF" }}>
      {/* Purple gradient header */}
      <div style={{ background: PURPLE_GRAD }} className="px-4 pt-12 pb-5">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <ChevronLeft size={18} color="white" />
          </button>
          <div className="flex-1">
            <p className="font-black text-lg text-white">Rent Overview</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              February 2025 • All PGs
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <Download size={16} color="white" />
          </button>
        </div>

        {/* Status pills */}
        <div className="flex gap-2">
          {[
            { value: paidCount.toString(), label: "Paid", color: "#10B981" },
            { value: pendingCount.toString(), label: "Pending", color: "#F59E0B" },
            { value: overdueCount.toString(), label: "Overdue", color: "#EF4444" },
            {
              value: `₹${Math.round(stats.expectedRent / 1000)}K`,
              label: "Total",
              color: "#FFFFFF",
            },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex-1 rounded-2xl py-2.5 px-2"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <p
                className="font-black"
                style={{ color: pill.color, fontSize: 15 }}
              >
                {pill.value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}>
                {pill.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex px-4 pt-3 pb-0 gap-2">
        {(["All", "Paid", "Pending", "Overdue"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-1 py-2 rounded-full text-xs font-bold transition-all"
            style={{
              background: filter === f ? "#8A2BE2" : "#FFFFFF",
              color: filter === f ? "white" : "#8B7AA8",
              border: `1.5px solid ${filter === f ? "#8A2BE2" : "#E9E3F5"}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Tenant list */}
      <div className="px-4 pt-3 space-y-2">
        {filteredTenants.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-bold text-base" style={{ color: "#1A0533" }}>
              No {filter.toLowerCase()} payments!
            </p>
            <p className="text-sm" style={{ color: "#8B7AA8" }}>
              All clear for this filter.
            </p>
          </div>
        )}

        {filteredTenants.map((tenant, i) => {
          const st =
            STATUS_CONFIG[tenant.rentStatus as keyof typeof STATUS_CONFIG] ||
            STATUS_CONFIG.pending;
          const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
          const lastPayment = tenant.rentHistory[0];
          const isOverdue = tenant.rentStatus === "overdue";

          return (
            <button
              key={tenant.id}
              onClick={() => navigate(`/owner/tenant/${tenant.id}`)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all"
              style={{
                background: "#FFFFFF",
                borderTop: `1px solid ${isOverdue ? "rgba(220,38,38,0.15)" : "#EDE9FE"}`,
                borderRight: `1px solid ${isOverdue ? "rgba(220,38,38,0.15)" : "#EDE9FE"}`,
                borderBottom: `1px solid ${isOverdue ? "rgba(220,38,38,0.15)" : "#EDE9FE"}`,
                borderLeft: isOverdue
                  ? "3px solid #DC2626"
                  : `1px solid #EDE9FE`,
              }}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white flex-shrink-0"
                style={{ background: color }}
              >
                {tenant.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm" style={{ color: "#1A0533" }}>
                  {tenant.name}
                </p>
                <p className="text-xs" style={{ color: "#8B7AA8" }}>
                  Room {tenant.roomNumber}
                  {lastPayment?.mode
                    ? ` • ${lastPayment.mode.toUpperCase()}`
                    : ""}
                </p>
              </div>

              {/* Amount + Status */}
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-sm" style={{ color: "#1A0533" }}>
                  ₹{tenant.monthlyRent.toLocaleString()}
                </p>
                <span
                  className="font-bold rounded-full"
                  style={{
                    background: st.bg,
                    color: st.color,
                    fontSize: 11,
                    padding: "2px 8px",
                    display: "inline-block",
                    marginTop: 2,
                  }}
                >
                  {st.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
