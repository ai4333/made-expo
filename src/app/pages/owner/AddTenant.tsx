import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ChevronLeft, ChevronDown, MessageSquare, CheckCircle2 } from "lucide-react";
import { ownerPGs } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

function FormInput({
  label, placeholder, value, onChange, prefix, type = "text",
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; prefix?: string; type?: string;
}) {
  const { C } = useTheme();
  return (
    <div>
      <p className="text-sm font-semibold mb-1.5" style={{ color: C.muted }}>{label}</p>
      <div className="flex items-center rounded-xl border" style={{ background: C.elevated, borderColor: C.border }}>
        {prefix && (
          <span className="px-3 text-sm font-medium border-r" style={{ color: C.muted, borderColor: C.border }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3.5 text-sm outline-none bg-transparent"
          style={{ color: C.heading }}
        />
      </div>
    </div>
  );
}

function PillGroup({
  label, options, value, onSelect,
}: {
  label: string; options: string[]; value: string; onSelect: (v: string) => void;
}) {
  const { C } = useTheme();
  return (
    <div>
      <p className="text-sm font-semibold mb-1.5" style={{ color: C.muted }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onSelect(o)}
            className="px-4 py-2 rounded-xl text-sm font-semibold border-2 transition-all"
            style={{
              background: value === o ? C.primaryGhost : "transparent",
              borderColor: value === o ? C.primary : C.border,
              color: value === o ? C.primary : C.muted,
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AddTenant() {
  const { C } = useTheme();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const pgId = params.get("pgId") || "opg1";
  const pg = ownerPGs.find((p) => p.id === pgId) || ownerPGs[0];

  const [form, setForm] = useState({
    name: "", phone: "", rent: String(pg.defaultRent), advance: String(pg.advanceAmount),
    advanceMode: "UPI", joinDate: "", rentDue: String(pg.rentDueDate), notes: "",
    sendWelcome: true,
  });
  const [showPreview, setShowPreview] = useState(true);
  const [done, setDone] = useState(false);

  const previewMsg = `Hi ${form.name || "[Name]"}, welcome to ${pg.name}! Your rent of ₹${form.rent} is due on the ${form.rentDue}th every month. Reply STATUS anytime to check your dues. — ${pg.name}`;

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: C.bg }}>
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
          style={{ background: C.primaryGhost, border: `2px solid ${C.primary}` }}
        >
          <CheckCircle2 size={40} style={{ color: C.primary }} />
        </div>
        <h2 className="text-2xl font-black mb-2" style={{ color: C.heading }}>Tenant Added! ✓</h2>
        <p className="text-sm mb-2" style={{ color: C.muted }}>
          {form.name || "Tenant"} added to {pg.name}
        </p>
        {form.sendWelcome && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-lg">📱</span>
            <p className="text-sm" style={{ color: C.primary }}>Welcome message sent via WhatsApp</p>
          </div>
        )}
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm border"
            style={{ borderColor: C.primary, color: C.primary }}
          >
            Back to PG
          </button>
          <button
            onClick={() => { setDone(false); setForm((f) => ({ ...f, name: "", phone: "" })); }}
            className="flex-1 py-3.5 rounded-xl font-bold text-sm text-white"
            style={{ background: C.primary }}
          >
            Add Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto" style={{ background: C.bg }}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 pt-12 pb-4"
        style={{ background: C.card, borderBottom: `1px solid ${C.border}` }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: C.elevated }}
        >
          <ChevronLeft size={18} style={{ color: C.heading }} />
        </button>
        <div>
          <p className="font-black text-lg" style={{ color: C.heading }}>Add Tenant</p>
          <p className="text-xs" style={{ color: C.muted }}>{pg.name}</p>
        </div>
      </div>

      {/* Context chips */}
      <div className="flex gap-2 px-4 py-3">
        {[`🏠 ${pg.name}`, `Room ${params.get("room") || "—"}`, `Bed ${params.get("bed") || "—"}`].map((chip) => (
          <span key={chip} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: C.primaryGhost, color: C.primary }}>
            {chip}
          </span>
        ))}
      </div>

      <div className="px-4 pb-8 space-y-5">
        {/* Basic Info */}
        <div className="rounded-2xl p-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>Tenant Information</p>
          <div className="space-y-4">
            <FormInput label="Full Name" placeholder="e.g. Arjun Kumar" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
            <FormInput label="WhatsApp Number" placeholder="94567 89012" prefix="+91" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} type="tel" />
            <FormInput label="Joining Date" placeholder="Select date" type="date" value={form.joinDate} onChange={(v) => setForm((f) => ({ ...f, joinDate: v }))} />
          </div>
        </div>

        {/* Financial */}
        <div className="rounded-2xl p-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <p className="font-bold text-sm mb-4" style={{ color: C.heading }}>Financial Details</p>
          <div className="space-y-4">
            <FormInput label="Monthly Rent (₹)" placeholder="8500" prefix="₹" value={form.rent} onChange={(v) => setForm((f) => ({ ...f, rent: v }))} />
            <FormInput label="Advance Paid (₹)" placeholder="8500" prefix="₹" value={form.advance} onChange={(v) => setForm((f) => ({ ...f, advance: v }))} />
            <PillGroup label="Advance Payment Mode" options={["Cash", "UPI", "Bank Transfer"]} value={form.advanceMode} onSelect={(v) => setForm((f) => ({ ...f, advanceMode: v }))} />
            <div>
              <p className="text-sm font-semibold mb-1.5" style={{ color: C.muted }}>Rent Due Date</p>
              <select
                value={form.rentDue}
                onChange={(e) => setForm((f) => ({ ...f, rentDue: e.target.value }))}
                className="w-full rounded-xl px-4 py-3.5 text-sm outline-none"
                style={{ background: C.elevated, borderColor: C.border, color: C.heading, border: `1px solid ${C.border}` }}
              >
                {["1", "5", "7", "10"].map((d) => (
                  <option key={d} style={{ background: C.card }}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="rounded-2xl p-4" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <p className="font-bold text-sm mb-3" style={{ color: C.heading }}>Notes (optional)</p>
          <textarea
            placeholder="Any special notes about this tenant..."
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            rows={2}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
            style={{ background: C.elevated, border: `1px solid ${C.border}`, color: C.heading }}
          />
        </div>

        {/* WhatsApp Preview */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${C.border}` }}>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="w-full flex items-center justify-between px-4 py-4"
            style={{ background: C.card }}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={16} style={{ color: C.primary }} />
              <p className="font-bold text-sm" style={{ color: C.heading }}>WhatsApp Welcome Preview</p>
            </div>
            <ChevronDown
              size={16}
              style={{ color: C.muted, transform: showPreview ? "rotate(180deg)" : "rotate(0)" }}
            />
          </button>
          {showPreview && (
            <div className="px-4 pb-4" style={{ background: C.card }}>
              <div className="rounded-2xl rounded-tl-none p-4 mb-3" style={{ background: C.elevated }}>
                <p className="text-sm" style={{ color: C.body }}>{previewMsg}</p>
                <p className="text-xs mt-2" style={{ color: C.muted }}>via WhatsApp</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: C.muted }}>Send welcome message on add</p>
                <div
                  onClick={() => setForm((f) => ({ ...f, sendWelcome: !f.sendWelcome }))}
                  className="w-11 h-6 rounded-full transition-all relative cursor-pointer"
                  style={{ background: form.sendWelcome ? C.primary : C.border }}
                >
                  <div
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
                    style={{ left: form.sendWelcome ? "calc(100% - 20px)" : 4 }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setDone(true)}
          className="w-full py-4 rounded-xl font-bold text-white text-base"
          style={{ background: C.primary }}
        >
          {form.sendWelcome ? "Add Tenant & Send Welcome →" : "Add Tenant →"}
        </button>
      </div>
    </div>
  );
}
