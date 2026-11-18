# DENYEL — ORIGIN · Chapter 4 integration draft

This ZIP contains original, separate, correctly sized PNG files for the Chapter 4 map and two featured quest icons, plus one eight-frame walking cycle and optional cloud/compass. It is not a finished illustrated map of the user's actual Bhutan locations.

## Included paths
- `src/assets/frames/ch4-sidequests/land.png` — 1408×768 (landscape background; no baked labels or routes)
- `src/assets/frames/ch4-sidequests/places/library.png` — 360×360 transparent (AI Hotel Booking Chatbot)
- `src/assets/frames/ch4-sidequests/places/guild.png` — 360×360 transparent (JobScoutAI)
- `src/assets/frames/ch4-sidequests/walk/1.png` through `8.png` — 480×720 transparent, fixed camera/baseline (experimental original SVG-rig walk cycle)
- `src/assets/frames/ch4-sidequests/ornaments/cloud.png` — 420×420 transparent
- `src/assets/frames/ch4-sidequests/ornaments/compass.png` — 240×240 transparent

## Integration
1. Commit/back up the repo and extract this ZIP at project root, confirming overwrite paths.
2. Run `npm run validate-assets`, `npm run check`, and `npm run build`.
3. View chapter 4 at desktop and mobile widths, test walking direction, body scale, route contact, and icon anchors. Adjust object-fit or CSS layer placement only if the existing display needs it; do not edit route math.

## Note
- `land.png` is a visually repurposed standalone original manga landscape; it is intentionally free from route strokes, printed landmark labels, and icons so the existing Astro interactions can overlay them once.
- The SVG-rig walk sequence is a *functional first draft*, not full hand-drawn anime animation. The 8 stages are consistent, but should be judged in-motion; replace with more refined frames if the movement is too stiff.
- Place icons use original vector drawing with transparent canvas; they are not extracted from contact sheets.
- Unverified side-quest features, metrics, school locations, team photographs, and professional claims should not be added in art without confirmation.
