import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Phone, MessageSquare, AlertTriangle, ChevronDown, Edit2 } from "lucide-react";
import { ownerTenants } from "../../data/ownerMockData";
import { useTheme } from "../../context/ThemeContext";

export function TenantDetail() {
  const { C } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const tenant = ownerTenants.find((t) => t.id === id) || ownerTenants[0];
  const [dangerOpen, setDangerOpen] = useState(false);
  const [markedPaid, setMarkedPaid] = useState(tenant.rentStatus === "paid");

  const rentStatusMap = {
    paid: { bg: C.primaryGhost, text: C.primary, label: "Paid ✓" },
    pending: { bg: "rgba(217,119,6,0.10)", text: C.warning, label: "Pending" },
    overdue: { bg: "rgba(220,38,38,0.10)", text: C.danger, label: "Overdue" },
  };
  const tenantStatusMap = {
    active: { bg: C.primaryGhost, text: C.primary, label: "Active" },
    notice_given: { bg: "rgba(217,119,6,0.10)", text: C.warning, label: "Notice Given" },
    vacated: { bg: C.elevated, text: C.muted, label: "Vacated" },
  };

  const ts = tenantStatusMap[tenant.status] || tenantStatusMap.active;
  const rs = rentStatusMap[markedPaid ? "paid" : (tenant.rentStatus as keyof typeof rentStatusMap)] || rentStatusMap.pending;
  const modeIcon = (mode?: string) => ({ cash: "💵", upi: "📱", bank: "🏦" })[mode || ""] || "💰";

  function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid ${C.border}` }}>
        <div className="px-4 py-3" style={{ background: C.elevated, borderBottom: `1px solid ${C.border}` }}>
          <p className="font-bold text-sm" style={{ color: C.heading }}>{title}</p>
        </div>
        <div className="p-4" style={{ background: C.card }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: "#F8F6FF" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg, #5B21B6 0%, #8B5CF6 100%)" }}>
        <div className="flex items-center gap-3 px-4 pt-12 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.20)" }}
          >
            <ChevronLeft size={18} color="white" />
          </button>
          <p className="font-black text-lg flex-1 text-white">Tenant Profile</p>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.20)" }}>
            <Phone size={16} color="white" />
          </button>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.20)" }}>
            <MessageSquare size={16} color="white" />
          </button>
        </div>

        {/* Avatar & info */}
        <div className="flex items-center gap-4 px-4 pb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.20)", color: "white" }}
          >
            {tenant.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="font-black text-xl text-white">{tenant.name}</p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.25)", color: "white" }}>
                {ts.label}
              </span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>{tenant.pgName}</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.60)" }}>
              Room {tenant.roomNumber} · Bed {tenant.bedNumber} · Since {tenant.joinDate}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Current Month */}
        <SectionCard title="Current Month — February 2025">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs mb-0.5" style={{ color: C.muted }}>Rent Due</p>
              <p className="font-black text-2xl" style={{ color: C.heading }}>₹{tenant.monthlyRent.toLocaleString()}</p>
            </div>
            <span className="text-sm font-bold px-3 py-1.5 rounded-full" style={{ background: rs.bg, color: rs.text }}>
              {rs.label}
            </span>
          </div>
          {!markedPaid && (
            <button
              onClick={() => setMarkedPaid(true)}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm"
              style={{ background: C.primary }}
            >
              ✓ Mark as Paid
            </button>
          )}
          {markedPaid && (
            <div className="rounded-xl p-3 flex items-center gap-2" style={{ background: C.primaryGhost }}>
              <span style={{ color: C.primary }}>✓</span>
              <p className="text-sm font-semibold" style={{ color: C.primary }}>Paid today · UPI</p>
            </div>
          )}
        </SectionCard>

        {/* Rent History */}
        <SectionCard title="Rent History">
          <div className="space-y-2">
            <div className="flex gap-2 pb-2" style={{ borderBottom: `1px solid ${C.border}` }}>
              {["Month", "Amount", "Status", "Date", "Mode"].map((h) => (
                <p key={h} className="text-xs font-semibold flex-1" style={{ color: C.muted }}>{h}</p>
              ))}
            </div>
            {tenant.rentHistory.map((record, i) => {
              const rentStatusMap2 = {
                paid: { text: C.primary, label: "Paid" },
                pending: { text: C.warning, label: "Pending" },
                overdue: { text: C.danger, label: "Overdue" },
              };
              const s = rentStatusMap2[record.status as keyof typeof rentStatusMap2] || rentStatusMap2.pending;
              return (
                <div
                  key={i}
                  className="flex gap-2 py-2"
                  style={{ borderBottom: i < tenant.rentHistory.length - 1 ? `1px solid ${C.border}` : "none" }}
                >
                  <p className="text-xs flex-1" style={{ color: C.body }}>{record.month}</p>
                  <p className="text-xs flex-1 font-semibold" style={{ color: C.body }}>₹{record.amount.toLocaleString()}</p>
                  <span className="text-xs flex-1 font-bold" style={{ color: s.text }}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                  <p className="text-xs flex-1" style={{ color: C.muted }}>{record.paidDate?.split("-")[2] || "—"}</p>
                  <p className="text-xs flex-1">{record.mode ? modeIcon(record.mode) : "—"}</p>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Advance & Notice */}
        <SectionCard title="Advance & Notice">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: C.muted }}>Advance Paid</span>
              <span className="font-bold" style={{ color: C.heading }}>₹{tenant.advancePaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: C.muted }}>Notice Status</span>
              <span className="font-bold" style={{ color: tenant.status === "notice_given" ? C.warning : C.muted }}>
                {tenant.status === "notice_given" ? `Given — ${tenant.noticeDate}` : "Not Given"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm" style={{ color: C.muted }}>Advance Eligibility</span>
              <span className="font-bold" style={{ color: C.success }}>Eligible for Refund</span>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className="flex-1 py-2.5 rounded-xl text-xs font-bold border"
              style={{ borderColor: C.primary, color: C.primary }}
            >
              Mark Refunded
            </button>
            <button
              className="flex-1 py-2.5 rounded-xl text-xs font-bold"
              style={{ background: C.primaryGhost, color: C.primary }}
            >
              Mark Deducted
            </button>
          </div>
          {tenant.status !== "notice_given" && (
            <button
              className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold"
              style={{ background: "rgba(217,119,6,0.10)", color: C.warning }}
            >
              Register Move-Out Notice
            </button>
          )}
        </SectionCard>

        {/* Rewards */}
        <SectionCard title="Reward Status">
          <div className="flex gap-4">
            <div className="flex-1 rounded-xl p-3 text-center" style={{ background: C.elevated }}>
              <p className="font-black text-xl" style={{ color: C.primary }}>{tenant.rewards.earlyPayments}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Early Payments</p>
            </div>
            <div className="flex-1 rounded-xl p-3 text-center" style={{ background: C.elevated }}>
              <p className="font-black text-xl" style={{ color: C.primary }}>₹{tenant.rewards.totalCredit}</p>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>Total Credited</p>
            </div>
          </div>
        </SectionCard>

        {/* Communication Log */}
        <SectionCard title="WhatsApp Communication Log">
          {tenant.messages.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: C.muted }}>No messages sent yet</p>
          ) : (
            <div className="space-y-3">
              {tenant.messages.map((msg, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 rounded-full flex-shrink-0" style={{ background: msg.delivered ? C.primary : C.muted }} />
                  <div className="flex-1">
                    <div className="flex justify-between mb-0.5">
                      <span className="text-xs font-bold" style={{ color: C.primary }}>{msg.type}</span>
                      <span className="text-xs" style={{ color: C.muted }}>{msg.delivered ? "✓ Delivered" : "⏳ Pending"}</span>
                    </div>
                    <p className="text-xs" style={{ color: C.muted }}>{msg.text.slice(0, 80)}...</p>
                    <p className="text-xs mt-1" style={{ color: C.border }}>{msg.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Danger Zone */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ border: `1px solid rgba(220,38,38,0.3)` }}>
          <button
            onClick={() => setDangerOpen(!dangerOpen)}
            className="w-full flex items-center justify-between px-4 py-4"
            style={{ background: "rgba(220,38,38,0.06)" }}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} style={{ color: C.danger }} />
              <p className="font-bold text-sm" style={{ color: C.danger }}>Danger Zone</p>
            </div>
            <ChevronDown size={16} style={{ color: C.danger, transform: dangerOpen ? "rotate(180deg)" : "rotate(0)" }} />
          </button>
          {dangerOpen && (
            <div className="px-4 pb-4 space-y-2" style={{ background: "rgba(220,38,38,0.04)" }}>
              {["Edit Tenant Details", "Transfer to Different Bed", "Mark as Vacated"].map((action) => (
                <button
                  key={action}
                  className="w-full py-3 rounded-xl text-sm font-semibold border"
                  style={{ borderColor: C.danger, color: C.danger, background: "transparent" }}
                >
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div
        className="fixed bottom-16 left-0 right-0 flex items-center gap-3 px-4 py-3"
        style={{ background: C.card, borderTop: `1px solid ${C.border}` }}
      >
        <button className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2" style={{ background: C.elevated }}>
          <MessageSquare size={16} style={{ color: C.primary }} />
          <span style={{ color: C.primary }}>Message</span>
        </button>
        <button className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2" style={{ background: C.elevated }}>
          <AlertTriangle size={16} style={{ color: C.warning }} />
          <span style={{ color: C.warning }}>Raise Issue</span>
        </button>
        <button className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2" style={{ background: C.elevated }}>
          <Edit2 size={16} style={{ color: C.muted }} />
          <span style={{ color: C.muted }}>Edit</span>
        </button>
      </div>
    </div>
  );
}