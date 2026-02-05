# Images Directory

This directory is for storing images and illustrations used in the application.

## Recommended Structure

```
images/
├── cover/           # Cover images for card decks
├── illustrations/   # General illustrations
├── icons/          # Custom icons (if not using SVG inline)
└── badges/         # Badge/achievement icons (if not using emoji)
```

## Image Guidelines

- **Format**: PNG, JPG, or SVG
- **Size**: Optimize for web (use tools like TinyPNG or Squoosh)
- **Naming**: Use descriptive, lowercase names with hyphens (e.g., `coping-cards-cover.png`)
- **Alt text**: Always add descriptive alt text in HTML for accessibility

## Current Usage

The application currently uses:
- Inline SVG for icons (in HTML)
- Emoji for badges (no image files needed)
- CSS gradients for backgrounds

You can add custom illustrations here if desired.

## Example

```html
<!-- In HTML -->
<img src="assets/images/cover/coping-cards.png" 
     alt="Coping cards illustration" 
     loading="lazy">
```

```css
/* In CSS */
.card-cover {
    background-image: url('../assets/images/cover/coping-cards.png');
}
```
