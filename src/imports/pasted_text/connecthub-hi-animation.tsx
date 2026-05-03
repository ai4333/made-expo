In ConnectHub.tsx, when the user taps "Say Hi", I want a beautiful full-card animation that matches the app's purple/violet UI theme. Here is exactly how it should work and look:

---

## ANIMATION BEHAVIOUR

When "👋 Say Hi" is tapped:

STEP 1 (0ms): Button instantly changes to "✅ Hi Sent!" in green
STEP 2 (0ms): A full overlay animation appears ON TOP of the profile card
STEP 3 (1400ms): Overlay fades out + card slides off to the right
STEP 4 (1600ms): Next profile card slides in from the left

---

## THE "HI SENT" OVERLAY ANIMATION

This overlay appears centered on top of the existing profile card. It must match the app's purple theme.

Add this CSS keyframe animation to the component file (using a <style> tag inside the JSX or via a className with inline style):
```tsx
// Add at the top of the component file
const hiSentStyles = `
  @keyframes hiPulse {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.1); opacity: 1; }
    70% { transform: scale(0.95); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes waveHand {
    0%   { transform: rotate(0deg); }
    20%  { transform: rotate(-20deg); }
    40%  { transform: rotate(20deg); }
    60%  { transform: rotate(-10deg); }
    80%  { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes rippleOut {
    0%   { transform: scale(0.8); opacity: 0.6; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  @keyframes fadeSlideOut {
    0%   { opacity: 1; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(80px); }
  }
  @keyframes fadeSlideIn {
    0%   { opacity: 0; transform: translateX(-60px); }
    100% { opacity: 1; transform: translateX(0); }
  }
`;
```

Inject it into the page:
```tsx
// Inside the component, before return:
useEffect(() => {
  const styleTag = document.createElement('style');
  styleTag.innerHTML = hiSentStyles;
  document.head.appendChild(styleTag);
  return () => document.head.removeChild(styleTag);
}, []);
```

---

## THE OVERLAY JSX

When `hiSent === true`, render this overlay absolutely positioned over the card:
```tsx
{hiSent && (
  <div
    className="absolute inset-0 rounded-2xl z-20 flex flex-col items-center justify-center"
    style={{
      background: 'linear-gradient(135deg, rgba(109,40,217,0.92) 0%, rgba(139,92,246,0.95) 100%)',
      backdropFilter: 'blur(2px)',
    }}
  >
    {/* Ripple rings */}
    <div className="relative flex items-center justify-center mb-4">
      <div
        style={{
          position: 'absolute',
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.2)',
          animation: 'rippleOut 1s ease-out forwards',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          animation: 'rippleOut 1s ease-out 0.2s forwards',
        }}
      />

      {/* Hand emoji with wave animation */}
      <div
        style={{
          fontSize: 52,
          animation: 'waveHand 0.8s ease-in-out 1',
          display: 'inline-block',
          zIndex: 1,
        }}
      >
        👋
      </div>
    </div>

    {/* "Hi Sent!" text */}
    <div
      style={{
        animation: 'hiPulse 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          color: '#ffffff',
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: '-0.5px',
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        Hi Sent! 🎉
      </p>
      <p
        style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: 13,
          marginTop: 6,
          fontWeight: 500,
        }}
      >
        They'll see your greeting
      </p>
    </div>
  </div>
)}
```

---

## CARD WRAPPER ANIMATION

Wrap the entire profile card in this div that handles the slide-out and slide-in:
```tsx
<div
  key={currentIndex}
  className="relative"
  style={{
    animation: isAnimating
      ? hiSent
        ? 'fadeSlideOut 0.4s ease-in 1s forwards'
        : 'fadeSlideOut 0.3s ease-in forwards'
      : 'fadeSlideIn 0.35s ease-out forwards',
    borderRadius: 16,
    overflow: 'hidden',
  }}
>
  {/* all existing card content stays exactly the same */}
  
  {/* overlay goes here inside this wrapper */}
  {hiSent && ( /* overlay JSX from above */ )}
</div>
```

---

## STATE & TIMING
```tsx
const [currentIndex, setCurrentIndex] = useState(0);
const [hiSent, setHiSent] = useState(false);
const [isAnimating, setIsAnimating] = useState(false);

const handleSayHi = () => {
  if (isAnimating) return;
  setHiSent(true);
  setIsAnimating(true);
  // After 1.6s: hide overlay + advance to next card
  setTimeout(() => {
    setHiSent(false);
    setIsAnimating(false);
    setCurrentIndex(prev => prev + 1);
  }, 1600);
};

const handleSkip = () => {
  if (isAnimating) return;
  setIsAnimating(true);
  setTimeout(() => {
    setIsAnimating(false);
    setCurrentIndex(prev => prev + 1);
  }, 350);
};
```

---

## BOTTOM BUTTONS
```tsx
<div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
  <button
    onClick={handleSkip}
    disabled={isAnimating}
    className="flex items-center gap-2 text-gray-400 font-medium text-sm disabled:opacity-30 transition-opacity"
  >
    <span className="text-base">✕</span> Skip
  </button>

  <button
    onClick={handleSayHi}
    disabled={isAnimating}
    className="flex items-center gap-2 font-bold text-sm transition-all disabled:opacity-30"
    style={{
      color: hiSent ? '#22c55e' : '#7c3aed',
    }}
  >
    {hiSent ? '✅ Hi Sent!' : '👋 Say Hi'}
  </button>
</div>
```

---

## EMPTY STATE

When `currentIndex >= profiles.length`:
```tsx
<div className="flex flex-col items-center justify-center h-64 text-center px-6">
  <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
  <p style={{ fontSize: 18, fontWeight: 800, color: '#1f2937' }}>
    You've seen everyone!
  </p>
  <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 6 }}>
    New profiles come in daily — check back soon
  </p>
</div>
```

---

## SUMMARY

The animation sequence when "Say Hi" is tapped:
1. Button → "✅ Hi Sent!" instantly
2. Purple gradient overlay fades in on the card with a waving 👋 hand animation + ripple rings + "Hi Sent! 🎉" text pops in
3. After 1.4s the card slides off to the right with fade
4. Next card slides in smoothly from the left
5. All other UI (header, tabs, match %, tags, interests) stays EXACTLY the same — do not change anything else