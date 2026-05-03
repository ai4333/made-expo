Completely rewrite VibeCalibration.tsx with 
these specific changes:

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 1 — REDUCE TO 4 QUESTIONS (from 5)
━━━━━━━━━━━━━━━━━━━━━━━━━

Replace all existing questions with exactly 
these 4 — chosen to best predict PG roommate 
compatibility:

QUESTION 1 — Sleep Schedule (most important 
for roommate compatibility):
"When do you usually sleep? 🌙"
Options (2x2 grid):
  🌅 Before 11pm — "Early sleeper"
  🦉 After midnight — "Night owl"  
  🎯 Around 11-12 — "Flexible"
  📱 Depends on mood — "Unpredictable"

QUESTION 2 — Shared Space Vibe:
"How do you feel about guests at home? 🏠"
Options (2x2 grid):
  🎉 Love having people over
  🤝 Occasionally is fine
  📖 Prefer it quiet mostly
  🚫 My space is my sanctuary

QUESTION 3 — Lifestyle + Habits:
"On a regular weekday evening you are...?"
Options (2x2 grid):
  💻 Working or studying late
  🎮 Gaming or watching shows
  🏋️ At gym or outdoors
  🍳 Cooking and chilling

QUESTION 4 — Cleanliness & Order:
"How would you describe your living style? 🧹"
Options (2x2 grid):
  ✨ Very neat and organized
  📦 Clean but lived-in
  🌀 A little chaos is fine
  🤝 Whatever my roommate prefers

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 2 — MATCH APP COLOR SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━

The current screen has a dark navy/indigo 
background that feels disconnected from the 
rest of the app.

Change to match the app's design system:

Background: #0F172A dark navy 
  (same as other dark screens in the app)
  NOT a different shade of blue/indigo

Header area:
- "Question X of 4" label: #7C3AED violet, 
  12px, left aligned
- "~45 seconds" timer: #F59E0B amber, 
  12px, right aligned  
- Progress bar below: 
  filled portion in #7C3AED violet gradient
  height 4px, rounded, full width

Question text:
- Font: Inter Bold
- Size: 22px (NOT 28px — current is too large)
- Color: white
- Line height: 1.3
- Max 2 lines

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 3 — OPTION CARD REDESIGN
━━━━━━━━━━━━━━━━━━━━━━━━━

Current option cards feel too heavy/dark.

New option card design:

DEFAULT state:
- Background: rgba(255,255,255,0.08) 
  — semi-transparent white, very subtle
- Border: 1px solid rgba(255,255,255,0.15)
- Border radius: 16px
- Padding: 16px
- Emoji: 28px, top-left of card
- Label text: white, 14px, Inter SemiBold
- Sublabel text: rgba(255,255,255,0.6), 12px, 
  below the main label

SELECTED state:
- Background: #7C3AED violet filled
- Border: 2px solid #7C3AED
- Scale: 1.02 (slight pop effect)
- Emoji stays same size
- Text becomes white bold

HOVER state:
- Background: rgba(124,58,237,0.3)
- Border: 1px solid rgba(124,58,237,0.6)

Transition: all 0.2s ease on all state changes

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 4 — SMOOTH QUESTION TRANSITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━

When user selects an answer and moves 
to next question:

1. Selected card gets a brief green checkmark 
   flash (0.2s) confirming selection
2. Entire question section slides out to the left
3. New question slides in from the right
4. Progress bar animates to new position smoothly

Use useState for currentQuestion (0-3) and 
useEffect for transition animation.

Add a 300ms delay after selection before 
auto-advancing to next question — 
gives user visual confirmation before moving.

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 5 — COMPLETION SCREEN
━━━━━━━━━━━━━━━━━━━━━━━━━

After question 4 is answered, show a 
completion screen:

Background: same dark navy
Center content:
- Large animated checkmark circle 
  (violet border, white tick, scales in)
- "Vibe Captured! 🎯" bold 26px white
- "We found X people with your vibe 
  in Bangalore!" 14px muted
- Show 4 emoji chips representing their 
  answers (one from each question)
- "Find My PG →" full width violet button
- "Edit My Answers" small muted link below

━━━━━━━━━━━━━━━━━━━━━━━━━
FIX 6 — UPDATE QUESTION COUNT REFERENCES
━━━━━━━━━━━━━━━━━━━━━━━━━

Update ALL references in the file from 
"5 questions" / "Question X of 5" / 
"~60 seconds" to:
"4 questions" / "Question X of 4" / 
"~45 seconds"

Apply all changes to VibeCalibration.tsx only.
Do not touch any other file.