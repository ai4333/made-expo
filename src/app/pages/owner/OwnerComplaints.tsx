import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, SlidersHorizontal, CheckCircle, Phone } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const PURPLE_GRAD = "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)";

type Priority = "Urgent" | "Normal" | "Low";
type Status = "Open" | "In Progress" | "Resolved";
type FilterType = "All" | "Open" | "Resolved";

interface Complaint {
  id: string;
  tenantName: string;
  room: string;
  category: string;
  categoryIcon: string;
  time: string;
  priority: Priority;
  status: Status;
}

const mockComplaints: Complaint[] = [
  {
    id: "c1",
    tenantName: "Priya Kumar",
    room: "101A",
    category: "Tap leaking in bathroom",
    categoryIcon: "🔧",
    time: "3h ago",
    priority: "Urgent",
    status: "Open",
  },
  {
    id: "c2",
    tenantName: "Rohan Singh",
    room: "101B",
    category: "WiFi not working in room",
    categoryIcon: "📶",
    time: "5h ago",
    priority: "Normal",
    status: "Open",
  },
  {
    id: "c3",
    tenantName: "Vikram Sharma",
    room: "102A",
    category: "Common area cleaning needed",
    categoryIcon: "🧹",
    time: "1d ago",
    priority: "Low",
    status: "Open",
  },
  {
    id: "c4",
    tenantName: "Kiran Mehta",
    room: "101D",
    category: "Light not working",
    categoryIcon: "💡",
    time: "3h ago",
    priority: "Urgent",
    status: "Resolved",
  },
  {
    id: "c5",
    tenantName: "Dev Kumar",
    room: "201A",
    category: "Geyser not heating",
    categoryIcon: "🚿",
    time: "2h ago",
    priority: "Urgent",
    status: "Open",
  },
];

const PRIORITY_STYLES: Record<Priority, { bg: string; color: string }> = {
  Urgent: { bg: "rgba(220,38,38,0.12)", color: "#DC2626" },
  Normal: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B" },
  Low: { bg: "rgba(16,185,129,0.12)", color: "#10B981" },
};

export function OwnerComplaints() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>("All");
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);

  const openCount = complaints.filter(
    (c) => c.status === "Open" || c.status === "In Progress"
  ).length;
  const urgentCount = complaints.filter(
    (c) => c.priority === "Urgent" && c.status !== "Resolved"
  ).length;
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;

  const filtered = complaints.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Open") return c.status === "Open" || c.status === "In Progress";
    return c.status === "Resolved";
  });

  const resolve = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Resolved" as Status } : c))
    );
  };

  return (
    <div className="min-h-screen pb-8" style={{ background: "#F8F6FF" }}>
      {/* Purple gradient header */}
      <div style={{ background: PURPLE_GRAD }} className="px-4 pt-12 pb-5">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <ChevronLeft size={18} color="white" />
          </button>
          <div className="flex-1">
            <p className="font-black text-lg text-white">Complaints</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
              Manage tenant issues efficiently
            </p>
          </div>
          <button
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <SlidersHorizontal size={16} color="white" />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 mt-4">
          {[
            { label: openCount.toString(), sub: "Open", icon: "📂" },
            { label: urgentCount.toString(), sub: "Urgent", icon: "⚡" },
            { label: resolvedCount.toString(), sub: "Resolved", icon: "✅" },
          ].map((s) => (
            <div
              key={s.sub}
              className="flex-1 rounded-xl py-2.5 px-3"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <div className="flex items-center gap-1">
                <span style={{ fontSize: 14 }}>{s.icon}</span>
                <p className="font-black text-white" style={{ fontSize: 15 }}>
                  {s.label}
                </p>
              </div>
              <p
                style={{ color: "rgba(255,255,255,0.65)", fontSize: 10 }}
                className="mt-0.5"
              >
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div
        className="flex px-4 pt-0 pb-0"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #EDE9FE",
        }}
      >
        {(["All", "Open", "Resolved"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-1 py-3 text-xs font-bold border-b-2 transition-all"
            style={{
              color: filter === f ? "#8A2BE2" : "#8B7AA8",
              borderBottomColor: filter === f ? "#8A2BE2" : "transparent",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Complaint cards */}
      <div className="px-4 pt-3 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-bold text-base" style={{ color: "#1A0533" }}>
              No issues here!
            </p>
            <p className="text-sm" style={{ color: "#8B7AA8" }}>
              All clear.
            </p>
          </div>
        )}

        {filtered.map((complaint) => {
          const pc = PRIORITY_STYLES[complaint.priority];
          const isResolved = complaint.status === "Resolved";

          return (
            <div
              key={complaint.id}
              className="rounded-2xl p-4"
              style={{
                background: "#FFFFFF",
                border: "1px solid #EDE9FE",
              }}
            >
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <span className="text-xl flex-shrink-0 mt-0.5">
                  {complaint.categoryIcon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p
                      className="font-bold text-sm"
                      style={{ color: "#1A0533" }}
                    >
                      {complaint.category}
                    </p>
                    <span
                      className="font-bold rounded-full flex-shrink-0"
                      style={{
                        background: pc.bg,
                        color: pc.color,
                        fontSize: 9,
                        padding: "2px 8px",
                      }}
                    >
                      {complaint.priority}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#8B7AA8" }}>
                    {complaint.tenantName} • Room {complaint.room} •{" "}
                    {complaint.time}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {isResolved ? (
                <div className="flex items-center gap-1.5 pt-1">
                  <CheckCircle size={14} color="#10B981" />
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#10B981" }}
                  >
                    Resolved
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => resolve(complaint.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold text-white transition-all"
                    style={{ background: "#10B981" }}
                  >
                    <CheckCircle size={13} color="white" />
                    RESOLVE
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold border transition-all"
                    style={{
                      background: "#F8F6FF",
                      borderColor: "#EDE9FE",
                      color: "#8B7AA8",
                    }}
                  >
                    <Phone size={13} />
                    CALL
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
