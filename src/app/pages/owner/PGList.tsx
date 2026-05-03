import { useNavigate } from "react-router";
import { Plus, ChevronRight } from "lucide-react";
import { ownerPGs, getPGStats } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

export function PGList() {
  const { C } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-8" style={{ background: "#F8F6FF" }}>
      {/* Purple gradient header */}
      <div style={{ background: PURPLE_GRAD }} className="px-4 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-black text-2xl text-white">My PGs</p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.70)" }}>
              {ownerPGs.length} properties managed
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm"
            style={{ background: "rgba(255,255,255,0.20)", color: "white" }}
          >
            <Plus size={16} /> Add PG
          </button>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {ownerPGs.map((pg) => {
          const stats = getPGStats(pg.id);
          const occupancyPct =
            stats.totalBeds > 0
              ? (stats.occupiedBeds / stats.totalBeds) * 100
              : 0;
          const allBeds = pg.rooms.flatMap((r) => r.beds);

          return (
            <div
              key={pg.id}
              className="rounded-2xl overflow-hidden"
              style={{ background: "#FFFFFF", border: "1px solid #EDE9FE" }}
            >
              {/* Top accent bar */}
              <div className="h-1 w-full" style={{ background: PURPLE_GRAD }} />

              <div className="p-4">
                {/* PG header */}
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-base flex-shrink-0"
                    style={{
                      background: "rgba(138,43,226,0.10)",
                      color: "#8A2BE2",
                    }}
                  >
                    {pg.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base" style={{ color: "#1A0533" }}>
                      {pg.name}
                    </p>
                    <p className="text-xs" style={{ color: "#8B7AA8" }}>
                      {pg.address.split(",")[0]}
                    </p>
                    <p className="text-xs" style={{ color: "#8B7AA8" }}>
                      {pg.city}
                    </p>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(138,43,226,0.08)",
                      color: "#8A2BE2",
                    }}
                  >
                    {pg.type}
                  </span>
                </div>

                {/* Bed occupancy dots */}
                <div className="flex gap-1.5 flex-wrap mb-4">
                  {allBeds.map((bed) => (
                    <div
                      key={bed.id}
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background:
                          bed.status === "vacant"
                            ? "#EDE9FE"
                            : bed.status === "overdue"
                            ? "#DC2626"
                            : "#8A2BE2",
                      }}
                    />
                  ))}
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2.5 mb-4">
                  {[
                    { label: "Rooms", value: pg.rooms.length, color: "#8A2BE2" },
                    {
                      label: "Beds",
                      value: `${stats.occupiedBeds}/${stats.totalBeds}`,
                      color: "#1A0533",
                    },
                    {
                      label: "Vacant",
                      value: stats.vacantBeds,
                      color: stats.vacantBeds > 0 ? "#D97706" : "#8B7AA8",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-2.5 text-center"
                      style={{ background: "#F5F3FF" }}
                    >
                      <p
                        className="font-black text-base"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </p>
                      <p className="text-xs" style={{ color: "#8B7AA8" }}>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Occupancy bar */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs" style={{ color: "#8B7AA8" }}>
                      Occupancy
                    </span>
                    <span
                      className="text-xs font-bold"
                      style={{ color: "#8A2BE2" }}
                    >
                      {Math.round(occupancyPct)}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full"
                    style={{ background: "#EDE9FE" }}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${occupancyPct}%`,
                        background: PURPLE_GRAD,
                      }}
                    />
                  </div>
                </div>

                {/* Rent summary */}
                <div
                  className="rounded-xl p-3 mb-4 flex justify-between"
                  style={{ background: "#F5F3FF" }}
                >
                  <div>
                    <p className="text-xs" style={{ color: "#8B7AA8" }}>
                      Collected
                    </p>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "#10B981" }}
                    >
                      ₹{stats.collectedRent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#8B7AA8" }}>
                      Pending
                    </p>
                    <p
                      className="font-bold text-sm"
                      style={{ color: "#D97706" }}
                    >
                      ₹{stats.pendingRent.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: "#8B7AA8" }}>
                      Overdue
                    </p>
                    <p
                      className="font-bold text-sm"
                      style={{
                        color:
                          stats.overdueRent > 0 ? "#DC2626" : "#8B7AA8",
                      }}
                    >
                      ₹{stats.overdueRent.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/owner/pg/${pg.id}`)}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                  style={{ background: PURPLE_GRAD }}
                >
                  Open PG Dashboard <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {/* Add new PG card */}
        <button
          className="w-full rounded-2xl p-6 flex flex-col items-center gap-2 border-2 border-dashed transition-all"
          style={{ borderColor: "#DDD6FE", background: "transparent" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(138,43,226,0.10)" }}
          >
            <Plus size={24} style={{ color: "#8A2BE2" }} />
          </div>
          <p className="font-bold text-base" style={{ color: "#8A2BE2" }}>
            Add New PG
          </p>
          <p className="text-xs" style={{ color: "#8B7AA8" }}>
            Expand your portfolio
          </p>
        </button>
      </div>
    </div>
  );
}
