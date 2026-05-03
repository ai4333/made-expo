WHERE TO PLACE KYC IN EACH PROFILE
PG Owner (PG Operating System):
Best place → Settings Screen → Profile Settings section, as a prominent banner card at the top that says "Verify Your PG Business — Get Trusted Badge" with a progress indicator. Secondary placement as a badge on their public listing.
Tenant/Seeker (PG Finder App):
Best place → My Profile Screen, right below the profile photo and name, as a "Verify Your Identity" card with completion status. Also surfaces during "Express Interest" or "Schedule Visit" flow as a gate — "Complete KYC to contact PG owners."

FIGMA MAKE PROMPTS

PROMPT 1 — KYC Entry Point (PG Owner — Settings Screen)
Design a mobile settings screen for a PG management app called 
"PG Operating System." At the very top of the settings screen, 
before any other settings section, add a KYC verification banner card.

The card should have:
- A soft amber/yellow background with a left border accent in orange
- A shield icon with an exclamation mark on the left
- Title: "Verify Your Identity" in bold dark text
- Subtitle: "Get the Verified Owner badge and build tenant trust" 
  in small muted text
- A horizontal 3-step progress bar below the subtitle showing: 
  Step 1 "Mobile" (completed, green tick), 
  Step 2 "Aadhaar" (active, highlighted), 
  Step 3 "Business Proof" (locked, gray)
- A "Complete KYC →" CTA button in orange/amber on the right side
  of the card

If KYC is fully completed, replace this card with a green 
"Verified Owner ✓" banner showing the verification date and 
a download certificate link.

Below this KYC card, show the rest of the settings in grouped 
sections: Profile Settings, PG Defaults, WhatsApp Settings, 
Notification Preferences, Manager Access, Subscription & Billing, 
Help & Support, Logout.

Use a clean white background, Inter font, and deep indigo (#1E1B4B) 
as primary color. Mobile frame, 390px wide.

PROMPT 2 — KYC Full Flow Screen (PG Owner)
Design a multi-step KYC verification flow for a PG owner inside 
a property management app. Use a stepper progress bar at the top 
showing 4 steps: Mobile Verified → Aadhaar → Business Proof → Done.

Each step is a separate screen. Design all 4:

STEP 1 — Mobile Verification (already done, show as completed state):
- Green checkmark screen with "Mobile Number Verified ✓"
- Show masked number: +91 XXXXXX7890
- "Continue to Aadhaar" button

STEP 2 — Aadhaar Verification:
- Title: "Verify with Aadhaar"
- Subtitle: "Your details are encrypted and never shared"
- Two input options shown as toggle tabs: 
  "Aadhaar Number" | "DigiLocker"
- Aadhaar Number tab: 12-digit input field with spaces every 4 digits,
  a "Fetch OTP" button, then a 6-digit OTP input screen
- After OTP: show a success card with masked Aadhaar details 
  (name, last 4 digits only) and a green "Aadhaar Linked ✓" badge
- Privacy note at bottom: small lock icon + 
  "We only verify, never store your full Aadhaar number"

STEP 3 — Business Proof:
- Title: "Upload Business Proof (Optional but Recommended)"
- Subtitle: "Increases trust score and unlocks Verified Badge"
- Upload options shown as 3 cards with icons:
  Electricity Bill of PG, Rental Agreement, Property Tax Receipt
- Each card has a dotted border upload zone, 
  file name preview after upload, and a remove button
- A "Skip for Now" text link at the bottom (muted gray)
- "Submit for Review" primary button

STEP 4 — Success / Review State:
- Full screen success animation (checkmark burst)
- Title: "KYC Submitted! 🎉"
- Subtitle: "We'll verify your documents within 24 hours"
- Show a summary card: Mobile ✓, Aadhaar ✓, Business Proof ✓
- Two CTAs: "Go to Dashboard" and "Share Verified Profile"

Use deep indigo primary color, white background, 
smooth card-based layout, Inter font, 390px mobile frame.

PROMPT 3 — KYC Entry Point (Tenant — My Profile Screen)
Design a mobile profile screen for a tenant in a PG discovery 
and roommate matching app. The profile belongs to a young urban 
user (22 years old, software engineer).

At the top: large circular profile photo, name, age, gender badge.

Directly below the profile photo section, before any other content, 
add a KYC verification status card:

UNVERIFIED STATE:
- Light red/rose background card with a shield-alert icon
- Title: "Verify Your Identity" bold
- Subtitle: "Verified users get 3x more roommate matches 
  and can contact PG owners directly"
- A mini 3-dot step indicator: Phone ✓ → Aadhaar → Selfie
- "Verify Now →" button in rose/red

VERIFIED STATE (show as alternate version):
- Light green background card
- Green shield checkmark icon
- "Identity Verified ✓" title
- "Verified on 8 March 2026" subtitle in muted text
- A "View Certificate" link

Below the KYC card, show:
- Profile completeness bar: "85% Complete"
- About Me section
- Looking For section (city, budget, room type)
- My Vibe tags (emoji chips: Night Owl, Gamer, Foodie)
- My Habits grid (sleep time, noise level, guest policy, food pref)

Use midnight blue (#0F172A) as primary, 
white cards on light gray (#F8FAFC) background, 
Inter font, 390px mobile frame.

PROMPT 4 — KYC Full Flow Screen (Tenant)
Design a 3-step KYC verification flow for a tenant inside 
a PG discovery app. Stepper at top showing: 
Phone ✓ → Aadhaar → Selfie → Done.

STEP 1 — Phone (already verified, skip screen):
Show a brief "Phone Already Verified ✓" state with auto-advance 
after 1.5 seconds or a "Continue" button.

STEP 2 — Aadhaar Verification:
- Title: "Link Your Aadhaar"
- Subtitle: "Quick 60-second verification. 100% secure."
- A trust row: 3 small icons — "256-bit Encrypted" | 
  "UIDAI Compliant" | "Never Stored"
- Input: Aadhaar number field (12 digits, spaced 4-4-4)
- "Send OTP to Linked Mobile" button
- OTP screen: 6 individual digit input boxes, 
  resend timer, "Verify Aadhaar" button
- After verify: green success card showing 
  Name (from Aadhaar), masked number, DOB — 
  with "Confirm & Continue" button

STEP 3 — Selfie Verification:
- Title: "Take a Quick Selfie"
- Subtitle: "We match it with your Aadhaar photo to confirm 
  it's really you"
- A large circular camera preview zone in the center 
  with a face outline guide
- Instructions below as 3 small tips with icons:
  "Good lighting", "Face centered", "No sunglasses"
- "Take Selfie" button (full width, primary color)
- After capture: side-by-side comparison card 
  (Aadhaar photo vs Selfie) with a "Match Score: 96%" chip
- "Confirm & Submit" button

STEP 4 — Completion Screen:
- Animated checkmark burst
- "You're Verified! 🎉" title
- "Your Verified badge is now live on your profile"
- Benefits unlocked list (green ticks):
  ✓ Contact PG owners directly
  ✓ 3x more roommate match visibility  
  ✓ Priority in PG applications
- "Back to Profile" CTA button

Use midnight blue as primary, clean white cards, 
smooth transitions implied through screen states, 
Inter font, 390px mobile frame.

PROMPT 5 — KYC Badge on PG Listing & Tenant Roommate Card
Design two small UI components showing KYC verification badges:

COMPONENT 1 — PG Owner Listing Card Badge:
On a PG discovery listing card (property card in a feed), 
add a "Verified Owner ✓" badge in the bottom-left corner 
of the card's image area. The badge is a small pill: 
green background, white shield-check icon, 
"Verified Owner" text in white, semi-transparent backdrop blur.

Show two versions of the same card side by side:
- Unverified: no badge, just the listing image
- Verified: same card with the green badge overlay

COMPONENT 2 — Tenant Roommate Profile Card Badge:
On a roommate swipe card (dating-app style profile card), 
show a verified badge differently:
- A small blue "ID Verified ✓" pill just below the person's name
- Unverified profiles show a gray "Unverified" pill instead
- Verified profiles get a subtle blue glow on their card border

Show 3 roommate cards in a stack:
Card 1: Verified (blue border glow, blue pill)
Card 2: Unverified (gray pill, no glow)
Card 3: Verified

Use consistent indigo/blue for tenant verification, 
green for owner verification. Clean mobile UI aesthetic, 
390px frame.