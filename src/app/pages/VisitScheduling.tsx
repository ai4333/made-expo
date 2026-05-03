import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, CheckCircle2, Calendar, Clock, MessageSquare, ExternalLink } from "lucide-react";
import { pgListings } from "../data/mockData";
import { motion, AnimatePresence } from "motion/react";

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];
const bookedSlots = ["11:00 AM", "2:00 PM", "4:00 PM"];

function getNextDays(count: number) {
  const days = [];
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      day: dayNames[d.getDay()],
      date: d.getDate(),
      month: monthNames[d.getMonth()],
      full: d,
      disabled: i === 0 || i === 7 || i === 8, // some days unavailable
    });
  }
  return days;
}

export function VisitScheduling() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = pgListings.find(p => p.id === id) || pgListings[0];
  const days = getNextDays(14);

  const [selectedDay, setSelectedDay] = useState<number | null>(1);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const canConfirm = selectedDay !== null && selectedTime !== null;

  if (confirmed) {
    const chosenDay = days[selectedDay!];
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="space-y-5 w-full"
        >
          {/* Success checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
          >
            <CheckCircle2 size={52} className="text-green-500" />
          </motion.div>

          <div>
            <h1 className="text-slate-900 font-black text-2xl mb-1">Visit Scheduled! ✅</h1>
            <p className="text-slate-500 text-sm">Your visit has been confirmed</p>
          </div>

          {/* Visit Details */}
          <div className="bg-slate-50 rounded-3xl p-5 text-left space-y-3 w-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Property</p>
                <p className="text-slate-900 font-semibold text-sm">{pg.name}</p>
                <p className="text-slate-500 text-xs">{pg.area}, {pg.city}</p>
              </div>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <Calendar size={18} className="text-teal-600" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Date</p>
                <p className="text-slate-900 font-semibold text-sm">{chosenDay.day}, {chosenDay.date} {chosenDay.month}</p>
              </div>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Time</p>
                <p className="text-slate-900 font-semibold text-sm">{selectedTime}</p>
              </div>
            </div>
          </div>

          <button className="w-full border-2 border-indigo-200 text-indigo-600 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2">
            <ExternalLink size={16} />
            Add to Google Calendar
          </button>

          <div className="bg-amber-50 rounded-2xl p-4 text-left">
            <p className="text-amber-800 text-sm font-medium">📱 Owner will confirm via WhatsApp shortly</p>
            <p className="text-amber-700 text-xs mt-1">Usually responds within {pg.owner.responseTime}</p>
          </div>

          <button
            onClick={() => navigate("/tenant")}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4 border-b border-slate-100">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <ChevronLeft size={22} className="text-slate-700" />
        </button>
        <div>
          <h1 className="text-slate-900 font-bold text-lg">Schedule Visit</h1>
          <p className="text-slate-500 text-xs">Pick your preferred date & time</p>
        </div>
      </div>

      <div className="px-4">
        {/* PG Mini Card */}
        <div className="flex items-center gap-3 my-4 bg-slate-50 rounded-2xl p-3">
          <img src={pg.images[0]} alt={pg.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
          <div>
            <p className="text-slate-900 font-semibold text-sm">{pg.name}</p>
            <p className="text-slate-500 text-xs">{pg.area}, {pg.city}</p>
            <p className="text-teal-600 font-bold text-sm mt-0.5">₹{pg.price.toLocaleString()}/mo</p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-5">
          <h2 className="text-slate-900 font-semibold text-base mb-3">📅 Pick a Date</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {days.map((day, i) => (
              <button
                key={i}
                disabled={day.disabled}
                onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                className={`flex-shrink-0 flex flex-col items-center gap-1 w-14 py-3 rounded-2xl border-2 transition-all ${
                  day.disabled
                    ? "bg-slate-50 border-slate-100 opacity-40 cursor-not-allowed"
                    : selectedDay === i
                    ? "bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-500/30"
                    : "bg-white border-slate-200"
                } ${i === 0 && !day.disabled ? "border-teal-300 bg-teal-50" : ""}`}
              >
                <span className={`text-xs font-medium ${selectedDay === i ? "text-white/80" : i === 0 ? "text-teal-600" : "text-slate-400"}`}>
                  {i === 0 ? "Today" : day.day}
                </span>
                <span className={`font-bold text-base ${selectedDay === i ? "text-white" : "text-slate-800"}`}>{day.date}</span>
                <span className={`text-xs ${selectedDay === i ? "text-white/70" : "text-slate-400"}`}>{day.month}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="mb-5">
          <h2 className="text-slate-900 font-semibold text-base mb-3">⏰ Pick a Time Slot</h2>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(slot => {
              const isBooked = bookedSlots.includes(slot);
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-3 rounded-xl text-sm font-medium border-2 transition-all relative ${
                    isBooked
                      ? "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
                      : isSelected
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/30"
                      : "bg-white border-slate-200 text-slate-700"
                  }`}
                >
                  {slot}
                  {isBooked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px bg-slate-300 rotate-[-10deg]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-slate-400 text-xs mt-2">Strikethrough slots are already booked</p>
        </div>

        {/* Notes */}
        <div className="mb-6">
          <h2 className="text-slate-900 font-semibold text-base mb-2">
            <span className="flex items-center gap-2">
              <MessageSquare size={16} />
              Anything to mention? (optional)
            </span>
          </h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g., I'll be coming with my parents, Need to check the 2nd floor rooms..."
            rows={3}
            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-indigo-500 resize-none placeholder:text-slate-400"
          />
        </div>

        {/* Confirm Button */}
        <button
          disabled={!canConfirm}
          onClick={() => setConfirmed(true)}
          className={`w-full py-4 rounded-2xl font-semibold text-base mb-8 transition-all ${
            canConfirm
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 active:scale-95"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {canConfirm ? "Confirm Visit ✅" : "Pick a date & time to continue"}
        </button>
      </div>
    </div>
  );
}