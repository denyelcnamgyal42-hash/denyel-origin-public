# DENYEL — ORIGIN · Art direction

Original manga visual language for this portfolio. **Not** the VOL.01 rose-on-warm-paper identity. Mechanics stay Astro + GSAP + Lenis; finished illustrations are produced **externally** and dropped into existing paths (see [ARTWORK-MAP.md](ARTWORK-MAP.md) and [docs/ASSET-REPLACEMENT.md](docs/ASSET-REPLACEMENT.md)).

---

## 1. Creative north star

A **professionally illustrated Japanese manga website**: cinematic panels, readable type, restrained motion. The story mode should feel like scrolling a volume; the recruiter mode should feel like a polished colour edition of the same world—not a second brand.

**Mood:** midnight resolve, Himalayan scale, electric focus.  
**Promise:** every panel looks intentional; nothing reads as “placeholder gradient” or “generic AI silhouette.”

---

## 2. Palette (site tokens already in CSS)

| Role | Hex (approx.) | Use in art |
|------|----------------|------------|
| Midnight navy | `#0b1a2e` | Night skies, deep grounds, gate/title atmosphere |
| Cool white / paper | `#f5f8fc` | Panel paper, highlights, caption fields |
| Ink black | `#070b12` | Linework, borders, deepest shadows |
| Electric blue | `#00b7ff` → `#1490ff` | Single accent: seals, energy, UI emphasis, rare glow |

**Rules**
- Line art is primarily **black ink on white or navy**.
- Electric blue is **sparse** (5–15% of a key frame)—eyes flash, UI glyphs, energy seams, one stamp—not a full blue wash.
- No warm cream paper, no rose/pink accent system, no purple-glow “AI portfolio” defaults.
- Screentones: grey/navy dots and hatching; blue tones only for special effect panels.

---

## 3. Illustration craft

- **Japanese manga ink**: clean contour, varied line weight, decisive blacks.
- **Screentones & hatching** for volume and weather (mist, rain, night).
- **Dramatic lighting**: rim light, laptop glow, dawn shafts, storm silhouettes.
- **Cinematic composition**: wide establishing → medium action → close-up insets (eyes, hands).
- **Expressive panels**: speed lines, impact frames, broken borders only where the code already breaks the frame (power sheet, origin cutout).
- **Bhutan-inspired environments**: dzong silhouettes, mountain ridges, prayer-flag colour restrained into navy/white/blue, campus courtyards, Himalayan dawn—not tourist cliché overload.
- **Recruiter readability**: colour stickers and “photo prints” stay clear at small sizes; faces readable at ~90px.

---

## 4. Protagonist — consistent design lock (do not invent likeness yet)

One character reused across Origin → Finale and recruiter stickers. Documented here so external artists/generators stay consistent. **Do not treat any current PNG as finished art.**

### Identity (visual only)

| Attribute | Spec |
|-----------|------|
| Name in art | Denyel (Bhutanese CS / AI student) |
| Age read | Late teens–early 20s |
| Build | Lean, student-athlete posture; grounded stance |
| Face | Clear manga proportions; determined eyes; readable at sticker scale |
| Hair | Short-to-medium dark hair with a sharp silhouette (same cut every chapter) |
| Wardrobe core | Dark jacket or hoodie + simple tee; optional GCIT/campus layer in Training |
| Signature prop | Laptop or notebook under one arm (Origin, Training, Finale) |
| Accent | Thin electric-blue detail only (earbud cord, sticker, UI reflection)—not full outfit colour |
| Cultural note | Bhutan-inspired environment and quiet pride; avoid costume pastiche or sacred-symbol misuse |

### Consistency checklist (every appearance)

1. Same face, hair silhouette, and eye shape.  
2. Same jacket language (collar, zipper, pocket).  
3. Hands and laptop match scale across cutouts.  
4. Walk-cycle frames share **identical foot plant height** and body scale.  
5. Power-sheet “step-out” and Origin cutout are the **same person**, different pose.  
6. Recruiter hero sticker is a colour version of the same design (not a new character).

### Model sheet deliverable (generate once, then derive)

External package before mass production:

1. Front / 3⁄4 / side turnaround  
2. Expression trio: calm · thinking · fierce (matches `faces/*.png`)  
3. Full-body idle + laptop pose  
4. Walk cycle key poses (8 frames)  
5. Colour sticker version (recruiter)  
6. Mini buddy poses (laptop / point / thumb / peek)

---

## 5. Environments by chapter

| Chapter | World |
|---------|--------|
| Origin | Himalayan dusk / valley light; distant architecture; wind |
| Training | GCIT / campus night labs; workshop benches; sunrise desk |
| Missions | Product door (Jaggle); language-data vault (Dzonglish); vision/false-match arena (Attendance) |
| Side quests | Hand-drawn quest map; Bhutanese-tinged fantasy places |
| Power sheet | Speed-line void + character file panel |
| Finale | Dawn over mountains / quay analogue; figure from behind |
| Recruiter | Same world in colour stickers + documentary “prints” |

---

## 6. Motion philosophy (code already implements)

Motion **supports** panels; it does not replace illustration quality.

- Living zones (`data-live`): subtle cloth / sky / water—keep face in `still` boxes.  
- Scroll-scrubbed panel cams, holds, page turns, ink wipes.  
- `prefers-reduced-motion`: art must still read as a complete still page.  
- No noisy particle spam; no decorative Lottie replacing drawings.

When supplying art, compose so living boxes remain valid (see ARTWORK-MAP) or note required `data-live` tweaks for a later code pass.

---

## 7. What “done” looks like

Homepage (story mode) feels like a real manga volume online: protagonist locked, first three chapters illustrated, transitions textured with original ink—not labeled placeholders. Recruiter mode uses the same protagonist in colour and clear project/experience prints.
