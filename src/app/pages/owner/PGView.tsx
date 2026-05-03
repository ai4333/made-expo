import { useParams, useNavigate } from "react-router";
import { ChevronLeft, SlidersHorizontal, Plus, CheckCircle } from "lucide-react";
import { ownerPGs, ownerTenants, getPGStats } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

export function PGView() {
  const { C } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = ownerPGs.find((p) => p.id === id) || ownerPGs[0];
  const stats = getPGStats(pg.id);
  const overdueTenant = ownerTenants.find(
    (t) => t.pgId === pg.id && t.rentStatus === "overdue"
  );
  const totalRevenue = stats.collectedRent;

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
          <div className="flex-1 min-w-0">
            <p className="font-black text-lg text-white">{pg.name}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              {pg.address.split(",")[0]}, {pg.city}
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <SlidersHorizontal size={16} color="white" />
          </button>
        </div>

        {/* Stat chips */}
        <div className="flex gap-2">
          {[
            { emoji: "🛏", value: `${pg.rooms.length}`, label: "Rooms" },
            {
              emoji: "👥",
              value: `${stats.occupiedBeds}/${stats.totalBeds}`,
              label: "Occupied",
            },
            {
              emoji: "₹",
              value: `₹${Math.round(totalRevenue / 1000)}K`,
              label: "Revenue",
            },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex-1 rounded-2xl py-2.5 px-3"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <div className="flex items-center gap-1">
                <span style={{ fontSize: 13 }}>{chip.emoji}</span>
                <p className="font-black text-white" style={{ fontSize: 14 }}>
                  {chip.value}
                </p>
              </div>
              <p
                style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}
                className="mt-0.5"
              >
                {chip.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Overdue alert */}
        {overdueTenant && (
          <div
            className="rounded-2xl p-3.5 mb-4 flex items-center gap-3"
            style={{
              background: "rgba(220,38,38,0.06)",
              borderTop: "1px solid rgba(220,38,38,0.18)",
              borderRight: "1px solid rgba(220,38,38,0.18)",
              borderBottom: "1px solid rgba(220,38,38,0.18)",
              borderLeft: "3px solid #DC2626",
            }}
          >
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm" style={{ color: "#DC2626" }}>
                {overdueTenant.name} overdue ₹
                {(overdueTenant.monthlyRent * 2).toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                Room {overdueTenant.roomNumber}
                {overdueTenant.bedNumber} • 3 months pending
              </p>
            </div>
            <button
              onClick={() => navigate(`/owner/tenant/${overdueTenant.id}`)}
              className="flex-shrink-0 px-3 py-2 rounded-xl text-xs font-bold text-white"
              style={{ background: "#10B981" }}
            >
              CASH PAID
            </button>
          </div>
        )}

        {/* Room Overview header */}
        <div className="flex items-center justify-between mb-3">
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "#9CA3AF" }}
          >
            Room Overview
          </p>
          <button
            className="flex items-center gap-1 text-xs font-bold"
            style={{ color: "#8A2BE2" }}
          >
            <Plus size={13} /> Add Room
          </button>
        </div>

        {/* Room grid */}
        <div className="grid grid-cols-2 gap-3">
          {pg.rooms.map((room) => {
            const hasOverdue = room.beds.some((b) => b.status === "overdue");
            const occupiedCount = room.beds.filter(
              (b) => b.status !== "vacant"
            ).length;

            return (
              <div
                key={room.id}
                className="rounded-2xl p-3.5"
                style={{
                  background: "#FFFFFF",
                  borderTop: `1px solid ${hasOverdue ? "rgba(220,38,38,0.22)" : "#EDE9FE"}`,
                  borderRight: `1px solid ${hasOverdue ? "rgba(220,38,38,0.22)" : "#EDE9FE"}`,
                  borderBottom: `1px solid ${hasOverdue ? "rgba(220,38,38,0.22)" : "#EDE9FE"}`,
                  borderLeft: `1px solid ${hasOverdue ? "rgba(220,38,38,0.22)" : "#EDE9FE"}`,
                }}
              >
                {/* Room title + badge */}
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm" style={{ color: "#1A0533" }}>
                    Room {room.number}
                  </p>
                  {hasOverdue && (
                    <span
                      className="font-bold rounded-full"
                      style={{
                        background: "rgba(220,38,38,0.10)",
                        color: "#DC2626",
                        fontSize: 9,
                        padding: "2px 8px",
                      }}
                    >
                      Overdue
                    </span>
                  )}
                </div>

                <p className="text-xs mb-2.5" style={{ color: "#8B7AA8" }}>
                  {occupiedCount}/{room.beds.length} occupied
                </p>

                {/* Bed indicators */}
                <div className="flex gap-1.5 mb-2.5">
                  {room.beds.map((bed) => {
                    const tenant = ownerTenants.find(
                      (t) => t.id === bed.tenantId
                    );
                    const bg =
                      bed.status === "vacant"
                        ? "#F5F3FF"
                        : bed.status === "overdue"
                        ? "rgba(220,38,38,0.12)"
                        : "rgba(16,185,129,0.12)";
                    const color =
                      bed.status === "vacant"
                        ? "#8B7AA8"
                        : bed.status === "overdue"
                        ? "#DC2626"
                        : "#10B981";
                    return (
                      <button
                        key={bed.id}
                        onClick={() =>
                          tenant
                            ? navigate(`/owner/tenant/${tenant.id}`)
                            : navigate(
                                `/owner/add-tenant?pgId=${pg.id}&room=${room.number}&bed=${bed.number}`
                              )
                        }
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: bg }}
                      >
                        {bed.status === "overdue" ? (
                          <span
                            className="font-black"
                            style={{ color, fontSize: 13 }}
                          >
                            !
                          </span>
                        ) : bed.status === "vacant" ? (
                          <span style={{ color, fontSize: 11 }}>—</span>
                        ) : (
                          <CheckCircle size={14} color={color} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Tenant names */}
                <div className="space-y-0.5">
                  {room.beds
                    .filter((b) => b.tenantId)
                    .map((bed) => {
                      const tenant = ownerTenants.find(
                        (t) => t.id === bed.tenantId
                      );
                      if (!tenant) return null;
                      const isOverdue = bed.status === "overdue";
                      return (
                        <p
                          key={bed.id}
                          className="flex items-center gap-1"
                          style={{
                            color: isOverdue ? "#DC2626" : "#8B7AA8",
                            fontSize: 11,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{
                              background: isOverdue ? "#DC2626" : "#10B981",
                            }}
                          />
                          {tenant.name.split(" ")[0]}
                          {isOverdue ? (
                            <span style={{ color: "#DC2626" }}> overdue</span>
                          ) : null}
                        </p>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
