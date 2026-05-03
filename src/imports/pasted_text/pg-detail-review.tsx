I need 4 precise changes made to this app. I am attaching screenshots for visual reference. 
Match the app's existing purple theme (#7C3AED / #6D28D9) for ALL changes. Do NOT touch anything else.

════════════════════════════════════════
CHANGE 1 — Onboarding.tsx (Your Preferences screen)
════════════════════════════════════════

In the "Your Preferences" onboarding screen, the Budget slider currently goes from ₹3,000 to ₹25,000.

Change the MAX value to ₹50,000.

Find this in the code:
- Any variable like `maxBudget`, `budgetMax`, or slider `max` prop set to 25000
- Any label showing "₹25,000"

Replace with:
- `max={50000}` on the slider
- Label: "₹50,000"
- Default range display: "Budget: ₹5,000 – ₹15,000/mo" stays the same (only max cap changes)

Exact changes:
```tsx
// Change slider max
<input
  type="range"
  min={3000}
  max={50000}  // was 25000
  ...
/>

// Change max label
<span>₹50,000</span>  // was ₹25,000
```

════════════════════════════════════════
CHANGE 2 — Filters.tsx (Filters screen)
════════════════════════════════════════

In the Filters page, the Budget slider also goes from ₹3,000 to ₹25,000.

Apply the exact same fix — change max to ₹50,000:
```tsx
// Slider
<input
  type="range"
  min={3000}
  max={50000}  // was 25000
  ...
/>

// Label
<span>₹50,000</span>  // was ₹25,000

// Also update the budget display text:
// "Budget: ₹3,000 – ₹50,000/mo"
```

Also update any state initializer like:
```tsx
const [budgetMax, setBudgetMax] = useState(25000);
// change to:
const [budgetMax, setBudgetMax] = useState(50000);
```

════════════════════════════════════════
CHANGE 3 — PGDetail.tsx (PG Detail screen) — 3 sub-changes
════════════════════════════════════════

### 3A — Image Carousel / Swipeable Gallery at top

Replace the static single image at the top with a swipeable image carousel.
The PG owner's uploaded photos should be shown as swipeable slides.

Add this carousel component at the top of PGDetail.tsx:
```tsx
// State
const [activeImageIndex, setActiveImageIndex] = useState(0);
const touchStartX = useRef<number>(0);
const touchEndX = useRef<number>(0);

// Use pg.images array (or fallback to [pg.image] if only one)
const images = pg.images?.length ? pg.images : [pg.image];

const handleTouchStart = (e: React.TouchEvent) => {
  touchStartX.current = e.targetTouches[0].clientX;
};

const handleTouchMove = (e: React.TouchEvent) => {
  touchEndX.current = e.targetTouches[0].clientX;
};

const handleTouchEnd = () => {
  const diff = touchStartX.current - touchEndX.current;
  if (Math.abs(diff) > 40) {
    if (diff > 0 && activeImageIndex < images.length - 1) {
      setActiveImageIndex(prev => prev + 1);
    } else if (diff < 0 && activeImageIndex > 0) {
      setActiveImageIndex(prev => prev - 1);
    }
  }
};
```

Replace the top image with:
```tsx
<div
  className="relative w-full overflow-hidden"
  style={{ height: 280 }}
  onTouchStart={handleTouchStart}
  onTouchMove={handleTouchMove}
  onTouchEnd={handleTouchEnd}
>
  {/* Sliding images */}
  <div
    className="flex transition-transform duration-300 ease-in-out h-full"
    style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
  >
    {images.map((img: string, idx: number) => (
      <img
        key={idx}
        src={img}
        alt={`PG photo ${idx + 1}`}
        className="w-full h-full object-cover flex-shrink-0"
        style={{ minWidth: '100%' }}
      />
    ))}
  </div>

  {/* Dot indicators */}
  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
    {images.map((_: any, idx: number) => (
      <div
        key={idx}
        onClick={() => setActiveImageIndex(idx)}
        style={{
          width: idx === activeImageIndex ? 20 : 6,
          height: 6,
          borderRadius: 3,
          background: idx === activeImageIndex ? '#ffffff' : 'rgba(255,255,255,0.5)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
      />
    ))}
  </div>

  {/* Image counter badge */}
  <div
    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold text-white"
    style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
  >
    {activeImageIndex + 1} / {images.length}
  </div>

  {/* Back button (keep existing) */}
  {/* Share + Save buttons (keep existing) */}
</div>
```

### 3B — Write a Review section (at the bottom of PGDetail)

Add a full "Write a Review" section at the bottom of the PG detail page, just above the sticky footer buttons.
```tsx
{/* ══════════ WRITE A REVIEW SECTION ══════════ */}
<div className="px-4 pb-6 mt-2">
  <h3 className="text-base font-bold text-gray-900 mb-3">
    ✍️ Write a Review
  </h3>

  {/* Rate the PG */}
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3">
    <p className="text-sm font-semibold text-gray-700 mb-2">Rate this PG</p>
    <div className="flex gap-2 mb-3">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => setPgRating(star)}
          style={{ fontSize: 28 }}
        >
          {star <= pgRating ? '⭐' : '☆'}
        </button>
      ))}
    </div>

    {/* Rate the Owner */}
    <p className="text-sm font-semibold text-gray-700 mb-2">Rate the Owner</p>
    <div className="flex gap-2 mb-4">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => setOwnerRating(star)}
          style={{ fontSize: 28 }}
        >
          {star <= ownerRating ? '⭐' : '☆'}
        </button>
      ))}
    </div>

    {/* Review text */}
    <textarea
      value={reviewText}
      onChange={e => setReviewText(e.target.value)}
      placeholder="Share your experience about this PG... (cleanliness, food, wifi, owner behaviour)"
      rows={3}
      className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-purple-400 resize-none"
      style={{ fontFamily: 'inherit' }}
    />

    {/* Submit button */}
    <button
      onClick={handleSubmitReview}
      disabled={!reviewText || pgRating === 0}
      className="mt-3 w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-40 transition-opacity"
      style={{
        background: reviewText && pgRating > 0
          ? 'linear-gradient(135deg, #7C3AED, #6D28D9)'
          : '#d1d5db',
      }}
    >
      Submit Review 🚀
    </button>
  </div>
</div>
```

Add these states at the top of PGDetail:
```tsx
const [pgRating, setPgRating] = useState(0);
const [ownerRating, setOwnerRating] = useState(0);
const [reviewText, setReviewText] = useState('');
const [reviewSubmitted, setReviewSubmitted] = useState(false);

const handleSubmitReview = () => {
  if (!reviewText || pgRating === 0) return;
  setReviewSubmitted(true);
  setReviewText('');
  setPgRating(0);
  setOwnerRating(0);
  // Show success toast or inline message
  setTimeout(() => setReviewSubmitted(false), 3000);
};
```

After submit, show:
```tsx
{reviewSubmitted && (
  <div
    className="mx-4 mb-4 px-4 py-3 rounded-xl text-sm font-semibold text-white flex items-center gap-2"
    style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
  >
    ✅ Review submitted! Thank you for your feedback.
  </div>
)}
```

### 3C — Fix ALL green colors → purple theme

In PGDetail.tsx, find and replace every instance of green color with the app's purple theme:

Replace these:
bg-green-500       → bg-purple-600
bg-green-600       → bg-purple-700
text-green-600     → text-purple-600
text-green-500     → text-purple-600
border-green-500   → border-purple-500
bg-green-100       → bg-purple-100
text-green-700     → text-purple-700
#22c55e            → #7C3AED
#16a34a            → #6D28D9
#dcfce7            → #ede9fe
#15803d            → #5b21b6

Specifically:
- The "Express Interest" button: change from green to purple gradient
- The "1 Beds Available" badge: change from green to purple
- Any availability dots/badges: green → purple
- The "Contact" button on owner card: green → purple
- Any green checkmarks in Trust & Verification: change to purple (✅ keep emoji but change surrounding bg)

The "Express Interest" button should be:
```tsx
<button
  className="flex-1 py-3 rounded-xl text-sm font-bold text-white"
  style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
>
  Express Interest
</button>
```

The availability badge:
```tsx
<span
  className="text-xs font-bold px-2 py-1 rounded-full"
  style={{ background: '#ede9fe', color: '#6D28D9' }}
>
  1 Bed Available
</span>
```

The Contact button on owner card:
```tsx
<button
  className="px-4 py-2 rounded-xl text-sm font-bold text-white flex items-center gap-1"
  style={{ background: 'linear-gradient(135deg, #7C3AED, #6D28D9)' }}
>
  📞 Contact
</button>
```

════════════════════════════════════════
DESIGN RULES — Apply to ALL changes
════════════════════════════════════════

- Primary color: #7C3AED (purple-600)
- Dark purple: #6D28D9 (purple-700)  
- Light purple bg: #ede9fe (purple-100)
- Text purple: #5b21b6
- Gradient: linear-gradient(135deg, #7C3AED, #6D28D9)
- NEVER use green (#22c55e, #16a34a, #dcfce7) anywhere in PGDetail
- All cards: white bg, rounded-2xl, shadow-sm, border border-gray-100
- All buttons: rounded-xl, font-bold
- Keep all existing navigation, routing, data, layout exactly the same

════════════════════════════════════════
SUMMARY OF ALL CHANGES
════════════════════════════════════════
1. Onboarding.tsx → Budget slider max: 25000 → 50000
2. Filters.tsx → Budget slider max: 25000 → 50000
3. PGDetail.tsx →
   a. Top image → swipeable carousel with dots + counter
   b. Bottom → Write a Review section (rate PG + rate owner + text + submit)
   c. ALL green colors → purple theme (#7C3AED / #6D28D9)

Do NOT change any other files or screens.