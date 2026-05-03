import { useState } from "react";
import {
  MapPin, Phone, Star, Search, SlidersHorizontal,
  List, Map, X, ChevronRight, Clock,
  ThumbsUp, Share2, Heart, Send,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────
interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

interface Place {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  emoji: string;
  image: string;
  distance: string;
  walkTime: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  isOpen: boolean;
  openHours: string;
  address: string;
  phone: string;
  tags: string[];
  description: string;
  studentDiscount?: string;
  reviews: Review[];
}

// ─── Data ─────────────────────────────────────────────────────
const PLACES: Place[] = [
  {
    id: "1", name: "Darshini Fast Food", category: "food",
    subcategory: "South Indian", emoji: "🍽️",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    distance: "0.4 km", walkTime: "8 min walk",
    rating: 4.2, reviewCount: 128,
    priceRange: "₹80 for one", isOpen: true, openHours: "7am – 10pm",
    address: "12, 80 Feet Road, Koramangala 4th Block",
    phone: "+91 98765 43210",
    tags: ["South Indian", "Veg", "Fast Food", "Student Friendly"],
    description: "Popular neighborhood darshini serving fresh idli, vada, dosa and meals at student-friendly prices. Quick service, no frills, great taste.",
    studentDiscount: "10% off on weekday lunch",
    reviews: [
      { id: "r1", user: "Arjun K", avatar: "AK", rating: 5, date: "2 days ago", text: "Best masala dosa near my PG! Crispy and super affordable. Go early to avoid queue.", helpful: 12 },
      { id: "r2", user: "Priya S", avatar: "PS", rating: 4, date: "1 week ago", text: "Good food, fast service. The set dosa is my favorite. Gets crowded during lunch.", helpful: 8 },
      { id: "r3", user: "Rahul M", avatar: "RM", rating: 4, date: "2 weeks ago", text: "Value for money. Poori sagu is excellent. Could improve seating.", helpful: 5 },
    ],
  },
  {
    id: "2", name: "Pizza Paradise", category: "food",
    subcategory: "Fast Food", emoji: "🍕",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    distance: "0.7 km", walkTime: "12 min walk",
    rating: 4.5, reviewCount: 89,
    priceRange: "₹150 for one", isOpen: true, openHours: "11am – 11pm",
    address: "45, 3rd Cross, Koramangala",
    phone: "+91 98765 43211",
    tags: ["Pizza", "Non-Veg", "Delivery"],
    description: "Affordable thin-crust pizzas with generous toppings. Popular for late-night orders.",
    studentDiscount: "10% off for PG residents",
    reviews: [
      { id: "r4", user: "Kiran R", avatar: "KR", rating: 5, date: "3 days ago", text: "Great cheese burst pizza! Fast delivery too.", helpful: 7 },
    ],
  },
  {
    id: "3", name: "FitZone Gym", category: "gym",
    subcategory: "Full Gym", emoji: "🏋️",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400",
    distance: "0.6 km", walkTime: "10 min walk",
    rating: 4.4, reviewCount: 176,
    priceRange: "₹799/month", isOpen: true, openHours: "5am – 11pm",
    address: "3rd Floor, Koramangala Club Road",
    phone: "+91 98765 43212",
    tags: ["Full Gym", "AC", "Cardio", "Weights", "Student Discount"],
    description: "Well-equipped gym with modern cardio machines, free weights, and AC. Student membership plans available. Personal trainers on request.",
    studentDiscount: "₹599/month for students with ID",
    reviews: [
      { id: "r5", user: "Rohan V", avatar: "RV", rating: 5, date: "1 week ago", text: "Great equipment, never too crowded in the morning. Staff is helpful.", helpful: 15 },
      { id: "r6", user: "Meena I", avatar: "MI", rating: 4, date: "3 weeks ago", text: "Good gym for the price. AC works well. Could use more dumbbells.", helpful: 9 },
    ],
  },
  {
    id: "4", name: "QuickWash Laundry", category: "laundry",
    subcategory: "Full Service", emoji: "🧺",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    distance: "0.2 km", walkTime: "3 min walk",
    rating: 4.6, reviewCount: 94,
    priceRange: "₹30/kg", isOpen: true, openHours: "7am – 10pm",
    address: "Ground Floor, Sunrise Apartments, Koramangala",
    phone: "+91 98765 43213",
    tags: ["Pickup & Delivery", "Same Day", "Dry Clean"],
    description: "Convenient laundry service with free pickup and delivery within 1km. Same-day service available for morning drops.",
    studentDiscount: "Free pickup for orders above ₹200",
    reviews: [
      { id: "r7", user: "Sneha G", avatar: "SG", rating: 5, date: "5 days ago", text: "Super convenient! They pick up and deliver same day. Clothes come back neatly folded.", helpful: 22 },
    ],
  },
  {
    id: "5", name: "KickOff Turf", category: "sports",
    subcategory: "Football", emoji: "⚽",
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400",
    distance: "1.3 km", walkTime: "18 min walk",
    rating: 4.7, reviewCount: 203,
    priceRange: "₹600/hr", isOpen: true, openHours: "6am – 11pm",
    address: "Koramangala Indoor Stadium Complex",
    phone: "+91 98765 43214",
    tags: ["Football", "Cricket", "Badminton", "Booking Required"],
    description: "Premium synthetic turf for football, cricket nets, and badminton courts. Well-lit for evening games. Online booking available.",
    reviews: [
      { id: "r8", user: "Vijay P", avatar: "VP", rating: 5, date: "2 days ago", text: "Best turf in Koramangala. Great surface, good lighting. Book in advance for weekends!", helpful: 18 },
    ],
  },
  {
    id: "6", name: "Brainwave Study Café", category: "study",
    subcategory: "Study Space", emoji: "📚",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    distance: "0.3 km", walkTime: "5 min walk",
    rating: 4.9, reviewCount: 67,
    priceRange: "₹49/hr", isOpen: true, openHours: "8am – 11pm",
    address: "2nd Floor, Koramangala 5th Block",
    phone: "+91 98765 43215",
    tags: ["WiFi", "AC", "Printing", "Silent Zone", "Coffee"],
    description: "Dedicated study space with high-speed WiFi, power outlets at every seat, and excellent coffee. Silent zone and group discussion rooms available.",
    studentDiscount: "₹199 for 6 hours",
    reviews: [
      { id: "r9", user: "Anjali T", avatar: "AT", rating: 5, date: "1 day ago", text: "Perfect for exam prep! Super quiet, great WiFi, and the coffee is amazing. My go-to spot.", helpful: 31 },
    ],
  },
  {
    id: "7", name: "Apollo Pharmacy", category: "medical",
    subcategory: "Pharmacy", emoji: "🏥",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
    distance: "0.4 km", walkTime: "7 min walk",
    rating: 4.5, reviewCount: 312,
    priceRange: "Standard pricing", isOpen: true, openHours: "Open 24 hours",
    address: "80 Feet Road, Koramangala",
    phone: "+91 98765 43216",
    tags: ["24/7", "Medicines", "Health Products", "Doctor Consultation"],
    description: "24-hour Apollo pharmacy with complete range of medicines, health supplements, and personal care products.",
    reviews: [
      { id: "r10", user: "Dev K", avatar: "DK", rating: 5, date: "4 days ago", text: "Life saver at 2am! Always well stocked. Staff is knowledgeable.", helpful: 14 },
    ],
  },
  {
    id: "8", name: "Ramu Kirana Store", category: "grocery",
    subcategory: "Grocery", emoji: "🛒",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    distance: "0.1 km", walkTime: "2 min walk",
    rating: 4.3, reviewCount: 156,
    priceRange: "Market price", isOpen: true, openHours: "6am – 11pm",
    address: "Ground Floor, Near Koramangala Bus Stop",
    phone: "+91 98765 43217",
    tags: ["Daily Essentials", "Snacks", "Dairy", "Quick Delivery"],
    description: "Neighborhood kirana store with daily essentials, snacks, dairy products, and quick delivery within the colony.",
    reviews: [
      { id: "r11", user: "Lakshmi N", avatar: "LN", rating: 4, date: "1 week ago", text: "Very convenient! Uncle knows all PG students by name. Quick delivery within minutes.", helpful: 20 },
    ],
  },
];

const CATEGORIES = [
  { id: "all",     label: "All",           emoji: "🌟", color: "#EDE9FE", activeColor: "#7C3AED" },
  { id: "food",    label: "Food & Eats",   emoji: "🍽️", color: "#FFF7ED", activeColor: "#EA580C" },
  { id: "gym",     label: "Gym & Fitness", emoji: "🏋️", color: "#F0FDF4", activeColor: "#16A34A" },
  { id: "laundry", label: "Laundry",       emoji: "🧺", color: "#EFF6FF", activeColor: "#2563EB" },
  { id: "sports",  label: "Sports & Turf", emoji: "⚽", color: "#FDF4FF", activeColor: "#9333EA" },
  { id: "study",   label: "Study Cafés",   emoji: "📚", color: "#FFFBEB", activeColor: "#D97706" },
  { id: "grocery", label: "Grocery",       emoji: "🛒", color: "#F0FDF4", activeColor: "#15803D" },
  { id: "medical", label: "Medical",       emoji: "🏥", color: "#EFF6FF", activeColor: "#1D4ED8" },
];

const SUB_FILTERS: Record<string, string[]> = {
  all:     ["All"],
  food:    ["All", "Veg Only", "Non-Veg", "Fast Food", "South Indian", "Café"],
  gym:     ["All", "Full Gym", "Yoga", "CrossFit"],
  sports:  ["All", "Football", "Cricket", "Badminton"],
  laundry: ["All", "Pickup & Delivery", "Self Service"],
  study:   ["All", "Silent Zone", "WiFi", "Coffee"],
  grocery: ["All", "Daily Essentials", "Organic"],
  medical: ["All", "Pharmacy", "Clinic", "24/7"],
};

// ─── Star Rating ──────────────────────────────────────────────
function StarRating({
  rating, size = 14, interactive = false, onChange,
}: {
  rating: number; size?: number; interactive?: boolean; onChange?: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <Star
            size={size}
            fill={(hover || rating) >= star ? "#F59E0B" : "none"}
            color={(hover || rating) >= star ? "#F59E0B" : "#D1D5DB"}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Place Detail Sheet ───────────────────────────────────────
function PlaceDetailSheet({ place, onClose }: { place: Place; onClose: () => void }) {
  const [activeTab, setActiveTab]   = useState<"info" | "reviews">("info");
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted]   = useState(false);
  const [liked, setLiked]           = useState<string[]>([]);
  const [saved, setSaved]           = useState(false);

  const handleSubmitReview = () => {
    if (!userRating || !reviewText.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setUserRating(0);
      setReviewText("");
    }, 3000);
  };

  const handleDirections = () => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(place.name + " " + place.address)}`,
      "_blank"
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${place.phone}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl overflow-hidden flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Hero Image */}
        <div className="relative flex-shrink-0" style={{ height: 200 }}>
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }}
          />
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <X size={18} color="white" />
          </button>
          {/* Save */}
          <button
            onClick={() => setSaved(!saved)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.5)" }}
          >
            <Heart size={18} color="white" fill={saved ? "white" : "none"} />
          </button>
          {/* Open status */}
          <div className="absolute bottom-3 left-4">
            <span
              className="text-xs font-semibold px-2 py-1 rounded-full"
              style={{
                background: place.isOpen ? "#DCFCE7" : "#FEE2E2",
                color: place.isOpen ? "#16A34A" : "#DC2626",
              }}
            >
              {place.isOpen ? "● Open Now" : "● Closed"}
            </span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1" style={{ overscrollBehavior: "contain" }}>

          {/* Header Info */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h2 className="text-xl font-bold" style={{ color: "#0F172A" }}>{place.name}</h2>
                <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>
                  {place.subcategory} · {place.priceRange}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Star size={14} fill="#F59E0B" color="#F59E0B" />
                  <span className="font-bold text-sm" style={{ color: "#0F172A" }}>{place.rating}</span>
                  <span className="text-xs" style={{ color: "#94A3B8" }}>({place.reviewCount})</span>
                </div>
              </div>
            </div>

            {/* Distance + Time + Hours */}
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin size={13} color="#7C3AED" />
                <span className="text-xs font-medium" style={{ color: "#7C3AED" }}>
                  {place.distance}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={13} color="#64748B" />
                <span className="text-xs" style={{ color: "#64748B" }}>{place.walkTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={13} color="#64748B" />
                <span className="text-xs" style={{ color: "#64748B" }}>{place.openHours}</span>
              </div>
            </div>

            {/* Student Discount */}
            {place.studentDiscount && (
              <div
                className="mt-3 px-3 py-2 rounded-xl flex items-center gap-2"
                style={{ background: "#DCFCE7" }}
              >
                <span style={{ fontSize: 16 }}>🎓</span>
                <span className="text-xs font-semibold" style={{ color: "#16A34A" }}>
                  {place.studentDiscount}
                </span>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {place.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: "#F1F5F9", color: "#475569" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-4 pb-3 flex gap-3">
            <button
              onClick={handleDirections}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm"
              style={{ background: "#7C3AED", color: "white" }}
            >
              <MapPin size={16} />
              Get Directions
            </button>
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm"
              style={{ background: "#F0FDF4", color: "#16A34A", border: "1px solid #BBF7D0" }}
            >
              <Phone size={16} />
              Call Now
            </button>
            <button
              onClick={() => navigator.share?.({ title: place.name, url: window.location.href })}
              className="w-12 h-12 flex items-center justify-center rounded-2xl flex-shrink-0"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <Share2 size={16} color="#64748B" />
            </button>
          </div>

          {/* Tab Bar */}
          <div className="flex px-4" style={{ borderBottom: "1px solid #E2E8F0" }}>
            {(["info", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-sm font-semibold capitalize"
                style={{
                  color: activeTab === tab ? "#7C3AED" : "#94A3B8",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid #7C3AED" : "2px solid transparent",
                }}
              >
                {tab === "reviews" ? `Reviews (${place.reviewCount})` : "Info"}
              </button>
            ))}
          </div>

          {/* INFO TAB */}
          {activeTab === "info" && (
            <div className="px-4 py-4 flex flex-col gap-4">
              {/* About */}
              <div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "#0F172A" }}>About</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {place.description}
                </p>
              </div>

              {/* Address */}
              <div
                className="flex gap-3 p-3 rounded-xl"
                style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <MapPin size={18} color="#7C3AED" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "#64748B" }}>ADDRESS</p>
                  <p className="text-sm" style={{ color: "#0F172A" }}>{place.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="flex gap-3 p-3 rounded-xl items-center"
                style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <Phone size={18} color="#7C3AED" style={{ flexShrink: 0 }} />
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "#64748B" }}>PHONE</p>
                  <p className="text-sm" style={{ color: "#0F172A" }}>{place.phone}</p>
                </div>
                <button
                  onClick={handleCall}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "#EDE9FE", color: "#7C3AED" }}
                >
                  Call
                </button>
              </div>

              {/* Hours */}
              <div
                className="flex gap-3 p-3 rounded-xl items-center"
                style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <Clock size={18} color="#7C3AED" style={{ flexShrink: 0 }} />
                <div>
                  <p className="text-xs font-semibold mb-0.5" style={{ color: "#64748B" }}>HOURS</p>
                  <p className="text-sm" style={{ color: "#0F172A" }}>{place.openHours}</p>
                </div>
              </div>

              {/* Rating Summary */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-black" style={{ color: "#0F172A" }}>{place.rating}</p>
                    <StarRating rating={place.rating} size={16} />
                    <p className="text-xs mt-1" style={{ color: "#94A3B8" }}>{place.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    {[5, 4, 3, 2, 1].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <span className="text-xs w-2" style={{ color: "#64748B" }}>{s}</span>
                        <Star size={10} fill="#F59E0B" color="#F59E0B" />
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: "#E2E8F0" }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              background: "#F59E0B",
                              width: s === 5 ? "65%" : s === 4 ? "25%" : s === 3 ? "7%" : "3%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Write Review CTA */}
              <button
                onClick={() => setActiveTab("reviews")}
                className="w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
                style={{ background: "#EDE9FE", color: "#7C3AED" }}
              >
                <Star size={16} />
                Write a Review
              </button>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div className="px-4 py-4 flex flex-col gap-4">

              {/* Write Review */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: "#F8FAFC", border: "2px solid #EDE9FE" }}
              >
                <h3 className="font-bold text-sm mb-3" style={{ color: "#0F172A" }}>
                  Rate & Review
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <StarRating
                    rating={userRating}
                    size={28}
                    interactive
                    onChange={setUserRating}
                  />
                  {userRating > 0 && (
                    <span className="text-sm font-medium" style={{ color: "#7C3AED" }}>
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][userRating]}
                    </span>
                  )}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience... (what did you like? would you recommend it to other PG students?)"
                  className="w-full text-sm rounded-xl p-3 resize-none outline-none"
                  rows={3}
                  style={{
                    border: "1px solid #E2E8F0",
                    background: "white",
                    color: "#0F172A",
                    fontSize: 14,
                  }}
                />
                {submitted ? (
                  <div
                    className="mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-center"
                    style={{ background: "#DCFCE7", color: "#16A34A" }}
                  >
                    ✓ Review submitted! Thanks for helping fellow students.
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitReview}
                    disabled={!userRating || !reviewText.trim()}
                    className="mt-2 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                    style={{
                      background: userRating && reviewText.trim() ? "#7C3AED" : "#E2E8F0",
                      color: userRating && reviewText.trim() ? "white" : "#94A3B8",
                    }}
                  >
                    <Send size={14} />
                    Submit Review
                  </button>
                )}
              </div>

              {/* Existing Reviews */}
              <div>
                <h3 className="font-semibold text-sm mb-3" style={{ color: "#0F172A" }}>
                  Student Reviews
                </h3>
                <div className="flex flex-col gap-3">
                  {place.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 rounded-2xl"
                      style={{ background: "white", border: "1px solid #E2E8F0" }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: "#EDE9FE", color: "#7C3AED" }}
                        >
                          {review.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-sm" style={{ color: "#0F172A" }}>
                              {review.user}
                            </span>
                            <span className="text-xs" style={{ color: "#94A3B8" }}>{review.date}</span>
                          </div>
                          <StarRating rating={review.rating} size={12} />
                          <p className="text-sm mt-2 leading-relaxed" style={{ color: "#475569" }}>
                            {review.text}
                          </p>
                          <button
                            onClick={() =>
                              setLiked((prev) =>
                                prev.includes(review.id)
                                  ? prev.filter((id) => id !== review.id)
                                  : [...prev, review.id]
                              )
                            }
                            className="flex items-center gap-1.5 mt-2"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                          >
                            <ThumbsUp
                              size={13}
                              color={liked.includes(review.id) ? "#7C3AED" : "#94A3B8"}
                              fill={liked.includes(review.id) ? "#7C3AED" : "none"}
                            />
                            <span
                              className="text-xs"
                              style={{ color: liked.includes(review.id) ? "#7C3AED" : "#94A3B8" }}
                            >
                              Helpful ({review.helpful + (liked.includes(review.id) ? 1 : 0)})
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-6" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Place Card ───────────────────────────────────────────────
function PlaceCard({ place, onTap }: { place: Place; onTap: () => void }) {
  return (
    <button
      onClick={onTap}
      className="w-full text-left"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <div
        className="flex gap-3 p-3 rounded-2xl mb-3 transition-all active:scale-[0.98]"
        style={{
          background: "white",
          border: "1px solid #E2E8F0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Thumbnail */}
        <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 80, height: 80 }}>
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-bold text-sm leading-tight" style={{ color: "#0F172A" }}>
              {place.name}
            </h3>
            <ChevronRight size={16} color="#94A3B8" style={{ flexShrink: 0, marginTop: 2 }} />
          </div>
          <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
            {place.subcategory}
          </p>

          {/* Distance + Rating */}
          <div className="flex items-center gap-3 mt-1.5">
            <div className="flex items-center gap-1">
              <MapPin size={11} color="#7C3AED" />
              <span className="text-xs" style={{ color: "#7C3AED" }}>
                {place.distance} · {place.walkTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={11} fill="#F59E0B" color="#F59E0B" />
              <span className="text-xs font-semibold" style={{ color: "#0F172A" }}>
                {place.rating}
              </span>
              <span className="text-xs" style={{ color: "#94A3B8" }}>
                ({place.reviewCount})
              </span>
            </div>
          </div>

          <p className="text-xs mt-1" style={{ color: "#64748B" }}>{place.priceRange}</p>

          {/* Status badges */}
          <div className="flex items-center gap-2 mt-2">
            <span
              className="text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                background: place.isOpen ? "#DCFCE7" : "#FEE2E2",
                color: place.isOpen ? "#16A34A" : "#DC2626",
              }}
            >
              <span style={{ fontSize: 8 }}>●</span>
              {place.isOpen ? "Open Now" : "Closed"}
            </span>
            {place.studentDiscount && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: "#EDE9FE", color: "#7C3AED" }}
              >
                🎓 Student Deal
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────
export function StudentMarketplace() {
  const [search, setSearch]                 = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubFilter, setActiveSubFilter] = useState("All");
  const [viewMode, setViewMode]             = useState<"list" | "map">("list");
  const [selectedPlace, setSelectedPlace]   = useState<Place | null>(null);

  const activeCat = CATEGORIES.find((c) => c.id === activeCategory);

  const filtered = PLACES.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSub =
      activeSubFilter === "All" ||
      p.tags.some((t) => t.toLowerCase().includes(activeSubFilter.toLowerCase())) ||
      p.subcategory.toLowerCase().includes(activeSubFilter.toLowerCase());
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSub && matchSearch;
  });

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setActiveSubFilter("All");
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8F7FF", fontFamily: "Inter, sans-serif" }}>

      {/* ── HEADER ── */}
      <div
        className="px-4 pt-12 pb-4"
        style={{ background: "linear-gradient(135deg, #3D3784 0%, #7C3AED 100%)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-bold text-white">Explore Near You 🧭</h1>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={12} color="#F59E0B" />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                Koramangala, Bangalore · 1.2km radius
              </span>
            </div>
          </div>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <SlidersHorizontal size={18} color="white" />
          </button>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl mt-3"
          style={{ background: "white" }}
        >
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search restaurants, gyms, laundry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm outline-none"
            style={{ background: "none", color: "#0F172A" }}
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={15} color="#94A3B8" />
            </button>
          )}
        </div>

        {/* List / Map toggle */}
        <div
          className="flex gap-2 mt-3 p-1 rounded-xl w-fit"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          {(["list", "map"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium capitalize"
              style={{
                background: viewMode === mode ? "white" : "transparent",
                color: viewMode === mode ? "#3D3784" : "rgba(255,255,255,0.8)",
                border: "none",
              }}
            >
              {mode === "list" ? <List size={14} /> : <Map size={14} />}
              {mode === "list" ? "List" : "Map"}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-24">

        {/* ── CATEGORY GRID + BANNERS ── */}
        {!search && (
          <>
            <h2 className="font-bold text-base mb-3" style={{ color: "#0F172A" }}>
              What are you looking for?
            </h2>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all"
                    style={{
                      background: isActive ? cat.activeColor : "white",
                      border: `1.5px solid ${isActive ? cat.activeColor : "#E2E8F0"}`,
                      boxShadow: isActive
                        ? `0 4px 12px ${cat.activeColor}40`
                        : "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{cat.emoji}</span>
                    <span
                      className="text-xs font-medium text-center leading-tight"
                      style={{ color: isActive ? "white" : "#374151", fontSize: 10 }}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sub-filter chips */}
            {activeCategory !== "all" && (
              <div className="flex gap-2 overflow-x-auto pb-1 mb-4" style={{ scrollbarWidth: "none" }}>
                {(SUB_FILTERS[activeCategory] || ["All"]).map((sf) => (
                  <button
                    key={sf}
                    onClick={() => setActiveSubFilter(sf)}
                    className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{
                      background: activeSubFilter === sf ? "#3D3784" : "white",
                      color: activeSubFilter === sf ? "white" : "#374151",
                      border: `1px solid ${activeSubFilter === sf ? "#3D3784" : "#E2E8F0"}`,
                    }}
                  >
                    {sf}
                  </button>
                ))}
              </div>
            )}

            {/* Featured Banners */}
            {activeCategory === "all" && (
              <div className="flex gap-3 overflow-x-auto pb-1 mb-5" style={{ scrollbarWidth: "none" }}>
                <button
                  onClick={() => handleCategoryChange("food")}
                  className="flex-shrink-0 rounded-2xl p-4 text-left"
                  style={{
                    background: "linear-gradient(135deg, #FF6B35 0%, #F5A623 100%)",
                    width: 200,
                  }}
                >
                  <p className="text-sm font-bold text-white">🍕 Order Food Near You</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    10+ restaurants within 1km
                  </p>
                  <span
                    className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                  >
                    Explore →
                  </span>
                </button>
                <button
                  onClick={() => handleCategoryChange("gym")}
                  className="flex-shrink-0 rounded-2xl p-4 text-left"
                  style={{
                    background: "linear-gradient(135deg, #3D3784 0%, #7C3AED 100%)",
                    width: 200,
                  }}
                >
                  <p className="text-sm font-bold text-white">💪 Get Fit This Month</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    3 gyms offering student discounts
                  </p>
                  <span
                    className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                  >
                    View Offers →
                  </span>
                </button>
                <button
                  onClick={() => handleCategoryChange("study")}
                  className="flex-shrink-0 rounded-2xl p-4 text-left"
                  style={{
                    background: "linear-gradient(135deg, #D97706 0%, #F59E0B 100%)",
                    width: 200,
                  }}
                >
                  <p className="text-sm font-bold text-white">📚 Study Spots Near You</p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>
                    Cafés & study spaces open late
                  </p>
                  <span
                    className="inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(255,255,255,0.25)", color: "white" }}
                  >
                    Find a Spot →
                  </span>
                </button>
              </div>
            )}
          </>
        )}

        {/* ── SEARCH RESULTS HEADER ── */}
        {search && (
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold" style={{ color: "#0F172A" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
            </p>
            <button
              onClick={() => setSearch("")}
              className="text-xs font-medium"
              style={{ color: "#7C3AED" }}
            >
              Clear
            </button>
          </div>
        )}

        {/* ── LISTINGS SECTION HEADER ── */}
        {!search && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-base" style={{ color: "#0F172A" }}>
                {activeCat?.emoji}{" "}
                {activeCat?.id === "all" ? "Popular Near You" : activeCat?.label}
              </h2>
              <p className="text-xs" style={{ color: "#94A3B8" }}>Near Koramangala PG</p>
            </div>
            <button
              onClick={() => handleCategoryChange(activeCategory)}
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "#7C3AED" }}
            >
              See all <ChevronRight size={12} />
            </button>
          </div>
        )}

        {/* ── MAP VIEW ── */}
        {viewMode === "map" && (
          <div className="mb-4">
            <div
              className="rounded-2xl overflow-hidden"
              style={{ height: 280, border: "1px solid #E2E8F0" }}
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.6100,12.9200,77.6400,12.9400&layer=mapnik"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Map"
              />
            </div>
            {/* Compact horizontal cards */}
            <div className="flex gap-3 overflow-x-auto pt-3 pb-1" style={{ scrollbarWidth: "none" }}>
              {filtered.map((place) => (
                <button
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className="flex-shrink-0 p-3 rounded-2xl text-left"
                  style={{
                    width: 160, background: "white",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{place.emoji}</span>
                  <p className="font-semibold text-xs mt-1 leading-tight" style={{ color: "#0F172A" }}>
                    {place.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#7C3AED" }}>{place.distance}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} fill="#F59E0B" color="#F59E0B" />
                    <span className="text-xs font-bold" style={{ color: "#0F172A" }}>{place.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── LIST VIEW ── */}
        {viewMode === "list" && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ fontSize: 48 }}>🔍</p>
                <p className="font-semibold mt-3" style={{ color: "#0F172A" }}>No results found</p>
                <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>
                  Try a different search or category
                </p>
              </div>
            ) : (
              filtered.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onTap={() => setSelectedPlace(place)}
                />
              ))
            )}
          </>
        )}
      </div>

      {/* ── PLACE DETAIL SHEET ── */}
      {selectedPlace && (
        <PlaceDetailSheet
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
