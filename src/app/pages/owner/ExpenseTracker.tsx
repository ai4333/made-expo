import { useState } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import { expenses as initialExpenses, ownerPGs, type Expense } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

const categories = [
  { label: "Groceries", icon: "🛒" }, { label: "Gas", icon: "🔥" },
  { label: "Repairs", icon: "🔧" }, { label: "Salary", icon: "💰" },
  { label: "Electricity", icon: "⚡" }, { label: "Internet", icon: "🌐" },
  { label: "Maintenance", icon: "🏠" }, { label: "Other", icon: "📦" },
];

const segmentColors = ["#8A2BE2", "#A855F7", "#6D1CB5", "#C084FC", "#7C3AED", "#9333EA", "#5B21B6", "#6B7280"];

function DonutChart({ data, total }: { data: { label: string; value: number; color: string }[]; total: number }) {
  const { C } = useTheme();
  let cumulative = 0;
  const segments = data.map((d) => {
    const pct = (d.value / total) * 100;
    const start = cumulative;
    cumulative += pct;
    return { ...d, start, pct };
  });

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 36 36" className="w-full h-full">
        {segments.map((seg, i) => (
          <circle
            key={i}
            cx="18" cy="18" r="15.9"
            fill="none"
            stroke={seg.color}
            strokeWidth="4"
            strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
            strokeDashoffset={25 - seg.start}
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-black text-base" style={{ color: C.heading }}>₹{(total / 1000).toFixed(0)}k</span>
        <span className="text-xs" style={{ color: C.muted }}>total</span>
      </div>
    </div>
  );
}

function AddExpenseModal({ onClose, onAdd }: { onClose: () => void; onAdd: (e: Expense) => void }) {
  const { C } = useTheme();
  const [form, setForm] = useState({ pgId: "opg1", category: "Groceries", icon: "🛒", amount: "", date: "", notes: "" });

  const handleSubmit = () => {
    if (!form.amount) return;
    const pg = ownerPGs.find((p) => p.id === form.pgId)!;
    onAdd({
      id: `ex${Date.now()}`,
      pgId: form.pgId,
      pgName: pg.name,
      category: form.category,
      amount: +form.amount,
      date: form.date || new Date().toISOString().split("T")[0],
      notes: form.notes,
      icon: form.icon,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div
        className="w-full rounded-t-3xl p-5"
        style={{ background: C.card, border: `1px solid ${C.border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="font-black text-lg" style={{ color: C.heading }}>Add Expense</p>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.elevated }}>
            <X size={16} style={{ color: C.muted }} />
          </button>
        </div>

        {/* PG Selector */}
        <div className="mb-4">
          <p className="text-xs font-semibold mb-2" style={{ color: C.muted }}>PG</p>
          <div className="flex gap-2">
            {ownerPGs.map((pg) => (
              <button
                key={pg.id}
                onClick={() => setForm((f) => ({ ...f, pgId: pg.id }))}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border-2 transition-all"
                style={{
                  background: form.pgId === pg.id ? C.primaryGhost : "transparent",
                  borderColor: form.pgId === pg.id ? C.primary : C.border,
                  color: form.pgId === pg.id ? C.primary : C.muted,
                }}
              >
                {pg.name.split(" ").slice(0, 2).join(" ")}
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="mb-4">
          <p className="text-xs font-semibold mb-2" style={{ color: C.muted }}>Category</p>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setForm((f) => ({ ...f, category: cat.label, icon: cat.icon }))}
                className="rounded-xl p-3 flex flex-col items-center gap-1 border-2 transition-all"
                style={{
                  background: form.category === cat.label ? C.primaryGhost : C.elevated,
                  borderColor: form.category === cat.label ? C.primary : "transparent",
                }}
              >
                <span className="text-xl">{cat.icon}</span>
                <span className="text-xs font-medium" style={{ color: form.category === cat.label ? C.primary : C.muted }}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount & Date */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs font-semibold mb-1.5" style={{ color: C.muted }}>Amount (₹)</p>
            <div className="flex items-center rounded-xl border" style={{ background: C.elevated, borderColor: C.border }}>
              <span className="px-3 text-sm" style={{ color: C.muted }}>₹</span>
              <input
                type="number" placeholder="0"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                className="flex-1 py-3 pr-3 text-sm outline-none bg-transparent"
                style={{ color: C.heading }}
              />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold mb-1.5" style={{ color: C.muted }}>Date</p>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full rounded-xl px-3 py-3 text-sm outline-none border"
              style={{ background: C.elevated, borderColor: C.border, color: C.heading }}
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-semibold mb-1.5" style={{ color: C.muted }}>Notes (optional)</p>
          <input
            placeholder="Any notes..."
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
            style={{ background: C.elevated, borderColor: C.border, color: C.heading }}
          />
        </div>

        <button onClick={handleSubmit} className="w-full py-4 rounded-xl font-bold text-white text-sm" style={{ background: C.primary }}>
          Save Expense
        </button>
      </div>
    </div>
  );
}

export function ExpenseTracker() {
  const { C } = useTheme();
  const [expenses, setExpenses] = useState(initialExpenses);
  const [filterPG, setFilterPG] = useState("all");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = expenses.filter((e) => filterPG === "all" || e.pgId === filterPG);
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  const byCategory = filtered.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([label, value], i) => ({ label, value, color: segmentColors[i % segmentColors.length] }));

  return (
    <div className="pb-24" style={{ background: C.bg }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 pt-12 pb-4"
        style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}
      >
        <div>
          <p className="font-black text-2xl" style={{ color: C.heading }}>Expenses</p>
          <p className="text-sm" style={{ color: C.muted }}>February 2025</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white"
          style={{ background: C.primary }}
        >
          <Plus size={16} /> Add
        </button>
      </div>

      <div className="px-4 py-4">
        {/* Summary & Donut */}
        <div className="rounded-2xl p-4 mb-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>Category Breakdown</p>
          <div className="flex items-center gap-4">
            <DonutChart data={chartData} total={total} />
            <div className="flex-1 space-y-2">
              {chartData.slice(0, 5).map((d) => (
                <div key={d.label} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <span className="text-xs" style={{ color: C.body }}>{d.label}</span>
                      <span className="text-xs font-bold" style={{ color: C.primary }}>₹{d.value.toLocaleString()}</span>
                    </div>
                    <div className="h-1 rounded-full mt-0.5" style={{ background: C.elevated }}>
                      <div className="h-1 rounded-full" style={{ width: `${(d.value / total) * 100}%`, background: d.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PG Filter */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {[{ id: "all", name: "All PGs" }, ...ownerPGs.map((pg) => ({ id: pg.id, name: pg.name.split(" ").slice(0, 2).join(" ") }))].map((pg) => (
            <button
              key={pg.id}
              onClick={() => setFilterPG(pg.id)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all"
              style={{
                background: filterPG === pg.id ? C.primary : C.card,
                color: filterPG === pg.id ? "white" : C.muted,
                border: `1px solid ${filterPG === pg.id ? C.primary : C.border}`,
              }}
            >
              {pg.name}
            </button>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-semibold" style={{ color: C.muted }}>{filtered.length} expenses</p>
          <p className="font-black text-lg" style={{ color: C.primary }}>₹{total.toLocaleString()}</p>
        </div>

        {/* Expense List */}
        <div className="space-y-2">
          {filtered
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: C.elevated }}
                >
                  {exp.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm" style={{ color: C.heading }}>{exp.category}</p>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: C.muted }}>{exp.pgName.split(" ").slice(0, 2).join(" ")}</span>
                    <span style={{ color: C.border }}>·</span>
                    <span className="text-xs" style={{ color: C.muted }}>{exp.date}</span>
                    {exp.notes && (
                      <>
                        <span style={{ color: C.border }}>·</span>
                        <span className="text-xs truncate" style={{ color: C.muted }}>{exp.notes}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-black text-base" style={{ color: C.heading }}>₹{exp.amount.toLocaleString()}</p>
                  <div className="flex gap-1">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: C.elevated }}>
                      <Edit2 size={12} style={{ color: C.muted }} />
                    </button>
                    <button
                      onClick={() => setExpenses((prev) => prev.filter((e) => e.id !== exp.id))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(220,38,38,0.08)" }}
                    >
                      <Trash2 size={12} style={{ color: C.danger }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowAdd(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl z-20 text-white"
        style={{ background: C.primary }}
      >
        <Plus size={26} />
      </button>

      {showAdd && (
        <AddExpenseModal onClose={() => setShowAdd(false)} onAdd={(e) => setExpenses((prev) => [e, ...prev])} />
      )}
    </div>
  );
}
