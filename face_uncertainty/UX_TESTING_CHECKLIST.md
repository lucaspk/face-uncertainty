# UX/UI Testing Checklist

Use this checklist to verify all improvements are working correctly.

## ✅ Global Navigation

- [ ] Active nav link has gradient background
- [ ] Active nav link has box shadow
- [ ] Hover state on inactive links shows subtle lift
- [ ] Smooth section transitions (0.6s fade + slide)
- [ ] Sections show contextual subtitles
- [ ] No jarring transitions between sections

## ✅ Coping Cards Section

### Ritual Introduction
- [ ] Ritual intro appears when clicking "Começar"
- [ ] Text is warm and inviting
- [ ] Styling matches design (soft background, border)

### Card Display
- [ ] Cards show icon at top (100px desktop, 80px mobile)
- [ ] Icon animates in (scale + fade)
- [ ] Text animates in slightly after icon
- [ ] Cards have subtle border and shadow
- [ ] Hover effect works (slight lift)

### Navigation
- [ ] Previous button disabled on first card
- [ ] Next button disabled on last card
- [ ] Buttons have clear hover states (scale 1.1 + color)
- [ ] Buttons have box shadows
- [ ] Keyboard navigation works (arrow keys)
- [ ] Swipe works on mobile

### Progress Indicators
- [ ] Card counter shows "X / 24"
- [ ] Progress dots render below counter
- [ ] Active dot is elongated (pill shape)
- [ ] Clicking dot navigates to that card
- [ ] Dots update when navigating

## ✅ Challenges Section

### Header
- [ ] Contextual subtitle appears: "Crescimento pela Experiência"
- [ ] Section description is warm and inviting
- [ ] Introduction text appears above grid

### Reminder Cards
- [ ] 4 reminder cards display
- [ ] Left border (4px gradient) visible
- [ ] Hover lifts card
- [ ] Enhanced padding and spacing

### Challenge Cards
- [ ] XP badge displays at top (+10 XP, etc.)
- [ ] Title is prominent
- [ ] Description is readable
- [ ] Category and difficulty badges display
- [ ] Hover effects work:
  - [ ] Top gradient bar expands
  - [ ] Card lifts 4px
  - [ ] Shadow enhances
  - [ ] Border becomes primary color

### Completed State
- [ ] Completed cards have green gradient background
- [ ] Checkmark appears in top right
- [ ] Top bar is green and visible
- [ ] Hover still works but doesn't change completion styling

## ✅ Challenge Modal

### Opening
- [ ] Modal opens with smooth animation
- [ ] Overlay appears with backdrop blur
- [ ] Content slides up

### Header
- [ ] Challenge title displays
- [ ] Category and difficulty badges visible
- [ ] Description has soft background

### Reflection Section
- [ ] Header says "Compartilhe sua experiência"
- [ ] Intro text is warm and inviting
- [ ] Questions have ✦ symbols
- [ ] Questions are conversational, not interrogative
- [ ] Textareas have placeholders
- [ ] Focus states work (blue shadow)
- [ ] Tab navigation works between fields

### Actions
- [ ] Navigation hint appears: "💡 Dica: Use Tab..."
- [ ] Button says "Celebrar Conclusão"
- [ ] Button has gradient and hover effects

### Completion
- [ ] Clicking button completes challenge
- [ ] Toast notification appears
- [ ] Modal closes
- [ ] Challenge card updates to completed state

## ✅ Profile Section

### Narrative
- [ ] Profile narrative displays at top
- [ ] Gradient background (purple)
- [ ] Message changes based on progress:
  - [ ] 0 completed: "Pronto para começar?"
  - [ ] 1 completed: "Você deu o primeiro passo!"
  - [ ] 5+ completed: Messages become more celebratory
  - [ ] All completed: "Parabéns, você é um mestre!"

### Stat Cards
- [ ] 4 stat cards display (XP, Level, Completed, Badges)
- [ ] Icons are large and prominent
- [ ] Values are correct
- [ ] Hover effects work:
  - [ ] Card lifts
  - [ ] Top gradient bar appears
  - [ ] Shadow enhances

### Progress Bar
- [ ] Section has motivational label
- [ ] Bar shows current XP progress
- [ ] Bar has shimmer animation
- [ ] Bar animates when XP changes (0.8s smooth)
- [ ] Text below shows "X / Y XP"

### Badges
- [ ] All 8 badges display
- [ ] Unlocked badges:
  - [ ] Have gradient background
  - [ ] Border is visible
  - [ ] Hover: scale + rotate
  - [ ] Bounce in when first unlocked
- [ ] Locked badges:
  - [ ] 40% opacity
  - [ ] Grayscale filter
  - [ ] Minimal hover effect

## ✅ Buttons

### Primary Buttons
- [ ] Gradient background
- [ ] Box shadow with color
- [ ] Hover: shimmer effect passes across
- [ ] Hover: lift + stronger shadow
- [ ] Active: press down feedback

### Secondary Buttons
- [ ] White background with border
- [ ] Hover: border turns primary
- [ ] Hover: text turns primary
- [ ] Hover: slight lift

## ✅ Toasts

- [ ] Toast appears from bottom with bounce
- [ ] Success: green gradient
- [ ] Info: purple gradient
- [ ] Error: red gradient
- [ ] Enhanced shadows with matching colors
- [ ] Disappears after 3 seconds
- [ ] Multiple toasts stack properly

## ✅ Micro-interactions

- [ ] All hover states have subtle animations
- [ ] All clicks have feedback (scale/translate)
- [ ] Focus states are clear and accessible
- [ ] Loading states work smoothly
- [ ] No janky animations
- [ ] 60fps throughout

## ✅ Responsive Design

### Mobile (320px - 768px)
- [ ] Navigation stacks properly
- [ ] Card icons resize to 80px
- [ ] Challenge cards stack in single column
- [ ] Modal fits screen with proper padding
- [ ] Stat cards grid to 2x2
- [ ] Touch targets are 44px minimum
- [ ] Swipe works on cards

### Tablet (768px - 1024px)
- [ ] Layout uses available space
- [ ] Cards grid appropriately
- [ ] Hover states work (if not touch-only)

### Desktop (1024px+)
- [ ] Full design displays
- [ ] Hover states all work
- [ ] Keyboard navigation works
- [ ] Content doesn't exceed max-width

## ✅ Accessibility

- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG AA
- [ ] Semantic HTML maintained
- [ ] Screen reader friendly (test with VoiceOver/NVDA)
- [ ] No keyboard traps
- [ ] Skip links work (if implemented)

## ✅ Performance

- [ ] Initial load < 2 seconds
- [ ] Animations are smooth (60fps)
- [ ] No layout shift during load
- [ ] Images/icons load quickly (SVG inline)
- [ ] LocalStorage saves correctly
- [ ] Export/Import still works

## ✅ Browser Testing

### Chrome/Edge
- [ ] All features work
- [ ] Animations smooth
- [ ] Gradients render correctly

### Firefox
- [ ] All features work
- [ ] Backdrop filter fallback if needed

### Safari (Desktop & iOS)
- [ ] All features work
- [ ] Webkit prefixes work
- [ ] Touch interactions work

## 🎯 User Flow Testing

1. **First Time User**
   - [ ] Lands on Coping Cards
   - [ ] Clicks "Começar"
   - [ ] Sees ritual intro
   - [ ] Navigates through cards
   - [ ] Goes to Challenges
   - [ ] Reads reminders
   - [ ] Clicks a challenge
   - [ ] Completes reflection
   - [ ] Sees XP notification
   - [ ] Checks Profile
   - [ ] Sees motivational message

2. **Returning User**
   - [ ] Sees progress maintained
   - [ ] Profile shows accurate stats
   - [ ] Completed challenges marked
   - [ ] Can export data
   - [ ] Can import data

3. **Power User**
   - [ ] Completes all challenges
   - [ ] Unlocks all badges
   - [ ] Sees master message
   - [ ] Level progression works

---

## 🐛 Common Issues to Check

- [ ] Modal doesn't close when clicking overlay
- [ ] Progress dots don't appear
- [ ] Animations cause jank on low-end devices
- [ ] Gradients don't render on older browsers
- [ ] Focus states disappear
- [ ] Touch targets too small on mobile
- [ ] Text is too small on mobile
- [ ] Colors don't have enough contrast
- [ ] LocalStorage quota exceeded (unlikely but possible)

---

## ✨ Polish Checklist

- [ ] No console errors
- [ ] No console warnings
- [ ] Smooth throughout
- [ ] Emotionally resonant
- [ ] Feels premium
- [ ] Feels warm and inviting
- [ ] Feels trustworthy
- [ ] Makes user want to continue

---

**Testing Date**: _____________
**Tester**: _____________
**Device/Browser**: _____________
**Issues Found**: _____________

---

## Quick Test Script

```bash
# Start local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000

# Test sequence (5 min):
1. Navigate all sections
2. Complete one challenge
3. Check profile updates
4. Test export/import
5. Check mobile responsive
6. Verify all hover states
```
