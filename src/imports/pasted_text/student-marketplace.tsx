THE FIX — Two parts
Part 1: Rename + replace the tab
Part 2: Build the full Marketplace screen

FIGMA MAKE PROMPT — Student Marketplace (Replace Rent Tab)
Paste this directly into Figma Make chat:
In the tenant app bottom navigation, the "Rent" tab 
currently shows the same screen as "My PG". 

Replace the "Rent" tab completely with a new tab 
called "Explore" with a compass or grid icon.

This "Explore" tab should open a brand new screen 
called StudentMarketplace.tsx

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STUDENT MARKETPLACE SCREEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is a local services discovery screen built 
specifically for PG students. Think Zomato meets 
Google Maps for PG life — everything a student 
needs within 2km of their PG.

HEADER:
Background: #3D3784 deep indigo
"Explore Near You 🧭" white bold 20px
"Koramangala, Bangalore · 1.2km radius" 
  white muted 13px below
Right: filter icon (white) + 
  location pin icon (amber #F5A623)

SEARCH BAR (below header, white bg):
"Search restaurants, gyms, laundry..." 
  placeholder with search icon left
Full width, 12px radius, subtle shadow

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 1 — CATEGORY GRID
━━━━━━━━━━━━━━━━━━━━━━━━━

Title: "What are you looking for?" 
  bold 16px #0F172A, 16px left padding

Show a 4x2 grid of category cards 
(2 rows of 4, each card square):

Each category card:
- Rounded 16px white card with soft shadow
- Large emoji (36px) centered top
- Category name bold 13px below
- Subtle colored bg tint per category

8 categories:

1. 🍽️ Food & Eat
   Tint: #FFF7ED (warm orange)
   Label: "Food & Eats"

2. 🏋️ Gym & Fitness  
   Tint: #F0FDF4 (light green)
   Label: "Gym & Fitness"

3. 🧺 Laundry
   Tint: #EFF6FF (light blue)
   Label: "Laundry"

4. ⚽ Sports & Turf
   Tint: #FDF4FF (light violet)
   Label: "Sports & Turf"

5. 📚 Study Cafés
   Tint: #FFFBEB (amber light)
   Label: "Study Cafés"

6. 💇 Salon & Spa
   Tint: #FFF1F2 (light pink)
   Label: "Salon & Spa"

7. 🛒 Grocery & Kirana
   Tint: #F0FDF4 (green)
   Label: "Grocery"

8. 🏥 Medical & Pharmacy
   Tint: #EFF6FF (blue)
   Label: "Medical"

Selected category state: 
  card gets #3D3784 background, 
  white emoji and text, 
  slight scale up

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 2 — FEATURED BANNER
━━━━━━━━━━━━━━━━━━━━━━━━━

A horizontal scrollable banner row 
(2 banners visible, peek of 3rd):

BANNER 1 (Food):
#FF6B35 to #F5A623 gradient background
"🍕 Order Food Near You"
"10+ restaurants within 1km" white muted
"Explore →" white outlined button

BANNER 2 (Gym):
#3D3784 to #7C3AED gradient
"💪 Get Fit This Month"
"3 gyms offering student discounts"
"View Offers →" white outlined button

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 3 — FOOD & EATS 
(default active category)
━━━━━━━━━━━━━━━━━━━━━━━━━

Section header: 
"Food & Eats 🍽️" bold 16px left
"Near Koramangala PG" muted 13px
"See all →" violet link right

Sub-filter chips (horizontal scroll):
All ✓ | Veg Only | Non-Veg | 
Fast Food | South Indian | North Indian | 
Chinese | Biryani | Café

Show 3 restaurant/food place cards 
stacked vertically:

CARD STRUCTURE:
White card, 16px radius, soft shadow
Left: square image (80x80, rounded 8px)
Right side:
  Name bold 15px: "Darshini Fast Food"
  Cuisine muted 12px: "South Indian · Veg"
  Distance + time: "0.4 km · 8 min walk" 
    with pin icon, muted
  Rating: ★ 4.2 amber + "(128 ratings)"
  Price: "₹80 for one" muted small
  Bottom row: 
    "Student Friendly 🎓" green chip
    "Open Now" green dot + text
    "Get Directions →" violet text link

CARD 2: "Pizza Paradise"
  "Fast Food · Non-Veg"
  "0.7 km · 12 min walk" 
  ★ 4.5 · ₹150 for one
  "10% off for PG residents 🏠" amber chip

CARD 3: "Café Study Hub"
  "Café · Veg · WiFi Available"
  "0.3 km · 5 min walk"
  ★ 4.8 · ₹120 for one
  "Free WiFi ☕" teal chip

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 4 — GYM & FITNESS
(show when Gym category tapped)
━━━━━━━━━━━━━━━━━━━━━━━━━

Same card structure but gym-specific data:

"FitZone Gym" 
  "Full Gym · AC · Cardio + Weights"
  "0.6 km · 10 min walk" · ★ 4.4
  Monthly: "₹799/month"
  "Student Discount Available 🎓" green chip
  "Call Now" + "Get Directions" buttons

"Iron House Fitness"
  "CrossFit + Yoga · Open 5am–11pm"
  "1.1 km" · ★ 4.1
  "₹599/month · Trial Class Free"
  "Free Trial 🎁" amber chip

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 5 — LAUNDRY
━━━━━━━━━━━━━━━━━━━━━━━━━

Card structure adapted for laundry:

"QuickWash Laundry"
  "Wash + Fold · Dry Clean · Pickup"
  "0.2 km · Pickup available" · ★ 4.6
  "₹30/kg wash · ₹50/kg dry clean"
  "Pickup & Delivery 🚗" teal chip
  "Book Pickup" emerald button

"SpinCycle"
  "Self-service + Full service"
  "0.5 km" · ★ 4.3
  "₹20/kg"
  "Open 7am–10pm" chip

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 6 — SPORTS & TURF
━━━━━━━━━━━━━━━━━━━━━━━━━

Card structure for sports:

"KickOff Turf - Koramangala"
  "Football · Cricket · Badminton"
  "1.3 km" · ★ 4.7
  "₹600/hr · Evening slots available"
  "Book Slot 📅" violet button
  "Available Today" green chip

"Smash Zone Badminton"
  "Badminton · Table Tennis"
  "0.9 km" · ★ 4.5
  "₹150/hr per court"
  Slots shown as time chips:
  6AM ✓ | 7AM ✓ | 5PM ✗ | 6PM ✓ | 7PM ✓

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 7 — STUDY CAFÉS
━━━━━━━━━━━━━━━━━━━━━━━━━

"Brainwave Study Café"
  "Quiet zones · Fast WiFi · Power outlets"
  "0.3 km" · ★ 4.9
  "₹49/hr · ₹199 for 6hrs"
  "WiFi ✓ · AC ✓ · Printing ✓" chips
  "Book Seat 📖" button

"The Reading Room"
  "Silent Zone · Café + Study"
  "0.8 km" · ★ 4.6
  "₹30/hr"

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 8 — GROCERY
━━━━━━━━━━━━━━━━━━━━━━━━━

"Ramu Kirana Store"
  "Daily essentials · Snacks · Dairy"
  "0.1 km · 2 min walk" · ★ 4.3
  "Open 6am–11pm"
  "Quick Delivery 🛵 · 15 min" green chip

"More Supermarket"
  "Full grocery · Vegetables · Beverages"
  "0.6 km" · ★ 4.1
  "Open 8am–10pm"

━━━━━━━━━━━━━━━━━━━━━━━━━
SECTION 9 — MEDICAL
━━━━━━━━━━━━━━━━━━━━━━━━━

"Apollo Pharmacy"
  "24/7 · Medicines · Health products"
  "0.4 km" · ★ 4.5
  "Open 24 hours 🏥"
  "24/7 Open" red chip (urgent feel)

"Dr. Sharma Clinic"
  "General physician · Consultation"
  "0.7 km" · ★ 4.6
  "₹200 consultation"
  "Available Today" green chip
  "Book Appointment" button

━━━━━━━━━━━━━━━━━━━━━━━━━
BOTTOM NAVIGATION CHANGE
━━━━━━━━━━━━━━━━━━━━━━━━━

Replace the "Rent" tab in bottom nav with:
Icon: compass icon or grid/explore icon
Label: "Explore"
Active color: #3D3784 violet
Routes to: /tenant/explore or /tenant/marketplace

The old "Rent" route should be removed completely
from the tenant bottom navigation.

━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SPECS
━━━━━━━━━━━━━━━━━━━━━━━━━

Primary: #3D3784
Accent: #F5A623 amber
Success/Open: #10B981 emerald
Background: #F8F7FF very light violet
Cards: white, shadow 0px 4px 16px rgba(0,0,0,0.06)
Font: Inter
Radius: 16px cards, 100px buttons
Frame: 390px mobile width

All category sections are shown dynamically — 
tapping a category chip scrolls to or filters 
to show only that category's listings.

The screen has:
- Sticky header with search
- Scrollable category grid
- Dynamic listing cards below
- Each card has directions + action button
- "Student Friendly" badges where applicable
- Distance always shown from current PG location

This replaces the broken duplicate Rent tab with a full Student Marketplace — 8 service categories, real Indian pricing, student discount chips, and a clean discovery UX.
After pasting this prompt, also tell Figma Make:
Also update MainLayout.tsx to replace the "Rent" 
tab with "Explore" tab pointing to the new 
StudentMarketplace component.