# Asset replacement workflow

Drop finished **external** manga illustrations into this repo **without** changing Astro layouts or GSAP timelines.

## Rules

1. **Overwrite the existing path** listed in [ARTWORK-MAP.md](../ARTWORK-MAP.md). Keep the **filename and extension**.
2. **Do not** rename `ines.png` paths in this phase—they are Denyel cutout slots (legacy filenames).
3. Match **aspect ratio** (±3%). Resolution can be higher than the placeholder.
4. Use **PNG with transparency** only where the map marks Alpha = Yes.
5. Use **JPG** for full-bleed panels (no alpha). Prefer sRGB, quality ≥85.
6. After drops: `npm run check && npm run build`.
7. Optional: `npm run validate-assets` to verify critical paths exist and aspect ratios are sane.

## Quick drop (PowerShell)

```powershell
# Example: replace Origin cutout
Copy-Item -Force .\incoming\denyel-origin-cutout.png `
  .\src\assets\frames\ch1-origin\ines.png

npm run validate-assets
npm run check
npm run build
```

## Top 5 — generate first (homepage impact)

| # | Path | Size | Why |
|---|------|------|-----|
| 1 | `src/assets/frames/ch1-origin/ines.png` | **960×1424** PNG, alpha | Protagonist lock; first character the user meets |
| 2 | `src/assets/frames/ch1-origin/port-wide.jpg` | **1920×1080** JPG | Establishing plate; keep mass right-of-center |
| 3 | `src/assets/frames/ch1-origin/port.jpg` | **1920×1080** JPG | Layered landscape; sky/water bands for living FX |
| 4 | `src/assets/frames/intro/ink.jpg` | **1920×1080** JPG | Gate, title, chapter washes |
| 5 | `src/assets/frames/ch2-training/arrival.jpg` | **1920×1080** JPG | Second chapter lands as real manga |

**Follow-on (same sprint):** `eyes.jpg`, `hand.jpg`, `ink-tall.jpg`, `ch3-missions/board.jpg`, `ch5-powersheet/ines.png` (same design as #1).

## Animation / layout constraints (do not break)

| Constraint | Detail |
|------------|--------|
| Cover crop | Most panels use `object-fit: cover`—keep subjects inward of edges |
| Origin mobile | Wide plate crops to **80% X**; cutout sits left on small screens |
| Living zones | Origin `port` sky/water fractions; cutout face in `still` box—see OriginScene |
| Multiply layers | `ink-layer` / storm / squad expect light grounds or soft edges |
| Walk cycle | `walk/1.png`–`8.png` sorted by name; shared foot baseline |
| Lie stages | Four `lie*.jpg` must share identical framing |
| Map | `land.png` should stay **1408×768** aspect; place coords are fixed in code |
| Rivers gates | Markers at ~20/43/68/90% X—leave clear lock icons |
| Reduced motion | Stills must narrate alone |
| Recruiter die-cut | Stickers read better with white edge or clear silhouette |

## What not to do

- Do not commit VOL.01 original art.
- Do not ship CSS gradients / SVG silhouettes as “final” manga art.
- Do not change `story.ts`, scene structure, or timelines in an art drop PR.
- Do not change extensions (`.jpg` ↔ `.png`) without a coordinated import edit.

## Checklist per batch

- [ ] Paths overwritten exactly  
- [ ] Aspect ratios checked (`npm run validate-assets`)  
- [ ] Alpha correct for cutouts/stickers  
- [ ] Alts already describe DENYEL slots (Phase 1)—update only if composition changes meaning  
- [ ] `npm run check` / `npm run build` green  
