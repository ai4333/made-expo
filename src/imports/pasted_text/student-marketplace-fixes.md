Fix all the following issues in StudentMarketplace.tsx:

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 1 — SEARCH BAR (not working)
━━━━━━━━━━━━━━━━━━━━━━━━━

The search bar must be fully functional.

Add a useState for searchQuery (string).
When user types in the search bar, filter ALL 
listings across all categories where the name, 
cuisine/type, or tags include the search text 
(case-insensitive).

When searchQuery is not empty:
- Hide the category grid
- Hide the featured banners
- Show a "Search Results for '[query]'" header
- Show filtered listing cards from ALL categories 
  with a small category badge on each card 
  (e.g. "🏋️ Gym" or "🍽️ Food")
- If no results: show empty state illustration 
  with "No results for '[query]'" text and 
  "Clear Search" button

When searchQuery is cleared:
- Show normal category grid and listings again

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 2 — CATEGORY FILTERING (not working)
━━━━━━━━━━━━━━━━━━━━━━━━━

Add useState for activeCategory (default: 'all').

When user taps a category card:
- Set activeCategory to that category
- Scroll smoothly to the listings section
- Show ONLY listings for that category
- Highlight the selected category card 
  (bg: #3D3784, white text/emoji)
- All other category cards return to default state

Category to listing mapping:
'food' → Food & Eats listings
'gym' → Gym & Fitness listings
'laundry' → Laundry listings
'sports' → Sports & Turf listings
'study' → Study Cafés listings
'salon' → Salon & Spa listings
'grocery' → Grocery listings
'medical' → Medical listings
'all' → show all listings grouped by category

Add a sub-filter chip row below the category grid 
that changes based on active category:
- Food: All | Veg | Non-Veg | Café | Fast Food
- Gym: All | Full Gym | Yoga | CrossFit
- Sports: All | Football | Cricket | Badminton
- Others: just show "All" chip
These sub-chips further filter within the category.

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 3 — GET DIRECTIONS BUTTON (wrong icon)
━━━━━━━━━━━━━━━━━━━━━━━━━

In every listing card, the "Get Directions" button 
currently shows a call/phone symbol icon.

Replace the icon with a map pin / navigation icon 
(MapPin from lucide-react).

When "Get Directions" is tapped, open Google Maps 
with the business name + "Koramangala Bangalore" 
as the search query:

window.open(
  `https://www.google.com/maps/search/${encodeURIComponent(place.name + ' Koramangala Bangalore')}`,
  '_blank'
)

The button should look like:
[🗺️ MapPin icon] Get Directions
NOT a phone/call icon.

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 4 — ADD MAP VIEW to Explore screen
━━━━━━━━━━━━━━━━━━━━━━━━━

Add a view toggle below the search bar:
[≡ List] [🗺️ Map] — two pill buttons side by side
Default: List view active (#3D3784 filled)
Map: outlined

When Map is tapped, show a full-screen 
embedded map view replacing the listing cards.

Since Google Maps API requires a key, implement 
a simulated map using an OpenStreetMap iframe:

<iframe
  src="https://www.openstreetmap.org/export/embed.html?bbox=77.6100,12.9200,77.6400,12.9400&layer=mapnik"
  style={{ width: '100%', height: '400px', borderRadius: '16px', border: 'none' }}
/>

Below the map, show a horizontal scrollable 
strip of place cards (compact version):
Each compact card: emoji + name + distance + 
"Directions" button — 160px wide cards in a row.

Above the map, show category filter chips 
(same as list view) so user can filter 
what shows on the map strip.

Also add a floating "Filter" button on top-right 
of the map (white card, funnel icon, shadow).

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 5 — CALL NOW BUTTON
━━━━━━━━━━━━━━━━━━━━━━━━━

The "Call Now" button on cards should use 
a phone icon (Phone from lucide-react) 
and trigger:

window.location.href = `tel:${place.phone}`

Each listing in the data should have a mock 
phone number added (e.g. "+91 98765 43210").

Button style: outlined border, #3D3784 text, 
phone icon left.

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 6 — RATINGS DISPLAY
━━━━━━━━━━━━━━━━━━━━━━━━━

Ratings are currently showing as plain text "4.4".
Replace with:

- Amber filled star icon (Star from lucide-react, 
  fill="#F5A623", size 14)
- Rating number bold in dark text
- Review count in muted gray "(176)"
- All inline on one line

Example: ★ 4.4 (176)

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 7 — DISTANCE DISPLAY
━━━━━━━━━━━━━━━━━━━━━━━━━

Distance currently shows with wrong icon.
Replace with MapPin icon (12px, #64748B muted) 
before the distance text.
Add walk time in muted text: "0.6 km · 10 min walk"

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 8 — STUDENT DISCOUNT BADGE
━━━━━━━━━━━━━━━━━━━━━━━━━

"Student Discount Available 🎓" badge should be:
- Background: #DCFCE7 light green
- Text: #16A34A dark green
- GraduationCap icon from lucide-react (12px)
- Pill shape (rounded-full)
- Font size 11px

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 9 — OPEN/CLOSED STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━

Each listing card should show open/closed status:
- "Open Now" = small green dot (8px circle) 
  + "Open Now" in #16A34A green, 11px
- "Closed" = small red dot + "Closed" in red, 11px

Add isOpen boolean to each listing in data.
Show this status in the card below the distance row.

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 10 — HEADER LOCATION
━━━━━━━━━━━━━━━━━━━━━━━━━

The header "Koramangala, Bangalore · 1.2km radius" 
should have a tappable location with dropdown 
to change area. For now, tapping shows a simple 
toast/snackbar: "Location based on your PG address"

Use the MapPin icon (amber #F5A623) before 
the location text in the header.

━━━━━━━━━━━━━━━━━━━━━━━━━
IMPORTS NEEDED at top of file:
━━━━━━━━━━━━━━━━━━━━━━━━━

import { 
  MapPin, Phone, Star, Filter, 
  List, Map, GraduationCap, Search 
} from 'lucide-react';

Apply all 10 fixes to StudentMarketplace.tsx.
Do not change any other file.