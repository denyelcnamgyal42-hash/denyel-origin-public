# DENYEL — ORIGIN · Artwork map

Inventory of every image slot that currently holds a **Phase-1 labeled placeholder**.  
Replace by **overwriting the same path** (same extension) unless a later code pass renames legacy filenames (`ines.png` = Denyel cutout path).

**Legend**
- **Display** — how CSS / Astro `Image` presents it  
- **Target** — recommended production pixels (drop-in friendly)  
- **Alpha** — transparent PNG required?  
- **Motion** — animation / layer notes  

Current on-disk sizes are Phase-1 placeholders and may be coarser than targets; match **aspect ratio** first, then resolution.

---

## Shared FX / chrome

| Path | Used by | Display | Target | Alpha | Motion / notes |
|------|---------|---------|--------|-------|----------------|
| `src/assets/frames/intro/ink.jpg` | `InkBackground`, `InkWipe`, Gate, Title | Full-bleed wash; cover | **1920×1080** (16:9) or 1584×900 | No | Brush/ink texture; navy–black; must look good tiled/stretched |
| `src/assets/frames/intro/ink-tall.jpg` | `InkWipe` (portrait) | Tall wipe texture | **1080×1920** (9:16) preferred; current file 3:2 OK if contrast-rich | No | Same family as `ink.jpg` |
| `src/assets/frames/ch3-mission/drips.png` | `InkDrips` | CSS mask / drip overlay via `getImage` ~1240w | **1240×800+** PNG | **Yes** | Alpha drips over mission transitions |
| `src/assets/frames/ch3-missions/board.jpg` | `MissionBoard`, Finale page stack | Full-bleed wall of sealed files | **1920×1080** | No | Three dossier silhouettes readable; navy/ink |
| `src/assets/frames/ch3-missions/file-open.jpg` | Mission 01 tear flaps | Split halves tear open | **1408×1408** or 1200×1200 square-ish | No | Center seal; works when clipped top/bottom |
| `public/og/story.jpg` | SEO / share | OG 1.91:1 | **1200×630** | No | Brand title card |
| `public/og/recruiter.jpg` | SEO / share | OG 1.91:1 | **1200×630** | No | Colour-edition card |
| `public/favicon.svg` | Browser | SVG mark | SVG 64 viewBox | N/A | Keep vector **D** |
| `media/cover.jpg` | README only | Demo thumb | **1280×720** | No | Optional marketing still |

---

## Chapter 1 — Origin (`OriginScene.astro`)

| Path | Display | Target | Alpha | Crop / layer / motion |
|------|---------|--------|-------|------------------------|
| `…/ch1-origin/port-wide.jpg` | Back plate in panel cam; `object-fit: cover`; mobile `object-position: 80% 50%` | **1920×1080** | No | Keep important mass **right-of-center** for mobile crop |
| `…/ch1-origin/port.jpg` | Layer over wide; `data-live` sky/water | **1920×1080** (align with wide) | No | Sky top ~50%; water band ~63–76% height (living zones). Architecture mid must stay still |
| `…/ch1-origin/ines.png` | Absolute cutout `left:37%; bottom:3%; height:92%; aspect 480/712` | **960×1424** (or 480×712) | **Yes** | Full-body + laptop; face in upper-right of sprite (~71–92% x, 4–21% y) for `still` zone; cloth zones left of face |
| `…/ch1-origin/eyes.jpg` | Inset 16:9, parallax depth 22 | **1408×792** | No | Extreme close-up eyes; tight crop |
| `…/ch1-origin/hand.jpg` | Inset 16:9, parallax depth 28 | **1408×792** | No | Hands + laptop keys |

**Also reused:** `port-wide.jpg` → Finale rewind stack page 1.

---

## Chapter 2 — Training Arc (`TrainingScene.astro` + `Certifications.astro`)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/ch2-training/arrival.jpg` | Main arrival panel, cover | **1920×1080** | No | GCIT arrival; protagonist readable mid-ground |
| `…/ch2-training/night.jpg` | Side panel ~50vw | **1400×900** | No | Night coding; laptop glow = blue accent |
| `…/ch2-training/workshop.jpg` | Side panel ~38vw | **1200×900** | No | Workshop / peer learning |
| `…/ch2-training/rack.jpg` | Narrow panel ~30vw | **1024×1400** portrait-friendly | No | Systems / security interest beat |
| `…/ch2-training/sunrise.jpg` | Wide panel ~56vw | **1920×1080** | No | Sunrise desk; soft light |
| `…/ch2-training/speedlines.jpg` | Full overlay under power poses; `ink-layer` multiply | **1920×1080** | No | Speed lines on light ground for multiply |
| `…/ch2-training/power-calm.jpg` | Hero layer, living cloth | **1200×1600** preferred | Soft edge or multiply-friendly | Calm powered pose; face still |
| `…/ch2-training/power-burst.jpg` | Crossfade over calm | Match calm | Soft edge | Fierce pose; same body scale |
| `…/ch2-training/scroll.png` | Cert scroll sheet (CSS bg) | **600×800** | **Yes** | Diploma sheet + roller; empty of personal seals |
| `…/ch2-training/seal.png` | Wax seal halves | **300×300**–600 | **Yes** | Circular seal; electric-blue wax OK |

**Also reused:** `arrival.jpg` → Finale page stack.

---

## Chapter 3 — Missions

### Board + Mission 01 · Jaggle.ai (`MissionTabaani.astro`)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/ch3-mission/door.jpg` | Panel door cam | **1600×1600** or 1200×1200 | No | Internship doorway; Bhutanese/modern mix |
| `…/ch3-mission/monster.jpg` | Creature layer, multiply | **1600×1600** | Soft / multiply | Tangled systems “monster” |
| `…/ch3-mission/faceoff.jpg` | Face-off panel | **1600×1200** | No | Protagonist vs tangle |
| `…/ch3-mission/modules.jpg` | Ordered payoff layer | Match monster | Soft | Modular cabinets / clean systems |
| `…/ch3-missions/file-open.jpg` | Tear flaps | see Shared | No | Shared dossier art |

**Also reused:** `door.jpg` → Mission report card 1.

### Mission 02 · Dzonglish NLP (`MissionLeads.astro`)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/leads/vault.jpg` | Full-bleed vault | **1920×1080** | No | Archive of language/data |
| `…/leads/storm.jpg` | Multiply storm cutout | **1200×1400** | Soft | Protagonist calm in paper storm |
| `…/leads/sheets.png` | Flying sheets layer | **1408×900** | **Yes** | Loose pages; transparent ground |
| `…/leads/merge.jpg` | Inset merge | **1408×792** | No | Hands merging bilingual cards |
| `…/leads/gate.jpg` | Quality gate panel | **1600×1200** | No | Leave center passage for overlay |
| `…/leads/windows.jpg` | Wide facade; map AR ~1301/463 | **2600×924** (≈2.8:1) ideal | No | Horizontal windows strip; code darkens panes |

**Also reused:** `windows.jpg` → Mission report card 2.

### Mission 03 · Smart Attendance (`MissionTalan.astro`)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/talan/panorama.jpg` | Ultra-wide cam (~260vw) | **3046×900** or 1920×1080 min | No | Campus / vision world panorama |
| `…/talan/smoke.jpg` | Smoke layer | Large wide | Soft | Transition smoke |
| `…/talan/squad.jpg` | Multiply group/context | **1600×1200** | Soft | Build context (no inventing real teammates’ faces) |
| `…/talan/library.jpg` | Panel cam | **1200×1600** | No | Embedding “library” / gallery metaphor |
| `…/talan/smoke-hand.jpg` | Inset false match | **1111×640**–ish | No | Uncertainty / false ID |
| `…/talan/stamp.jpg` | Inset verified stamp | Portrait | No | Evidence stamp beat |
| `…/talan/rivers.jpg` | Pipeline map AR ~1330/706 | **1330×706**+ | No | Leave room for 4 gate markers (~20/43/68/90% x, ~66% y) |
| `…/talan/faceoff.jpg` | Boss face-off | **1600×1200** | No | Vs false match |
| `…/talan/lie.jpg` | Boss stage 1 | Same pose stack | Soft | False-match entity |
| `…/talan/lie-cracks.jpg` | Stage 2 | **Identical framing** | Soft | Cracks |
| `…/talan/lie-breaking.jpg` | Stage 3 | Identical | Soft | Breaking |
| `…/talan/lie-shatter.jpg` | Stage 4 | Identical | Soft | Shatter |
| `…/talan/dawn.jpg` | Aftermath panel | **1600×1200** | No | Quiet dawn |

**Also reused:** `dawn.jpg` → Mission report card 3.

**Critical:** `lie*.jpg` four frames must be **aligned** (same camera, same subject bounds) for crossfade.

---

## Chapter 4 — Side Quests (`SideQuests.astro`)

Layout canvas: **1408 × 768** logical px (`W`/`H` in component).

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/ch4-sidequests/land.png` | Map base; route SVG overlaid | **1408×768** (or 2816×1536) | **Yes** or light paper | Clearings match place coords; harbour ~168,488 |
| `…/ornaments/cloud.png` | Decor ×2 | **420×420** | **Yes** | Soft cloud |
| `…/ornaments/compass.png` | Decor | **240×240** | **Yes** | |
| `…/ornaments/ship.png` | Decor | **224×224** | **Yes** | |
| `…/ornaments/serpent.png` | Decor | **176×176** | **Yes** | |
| `…/ornaments/quill.png` | Imported (spare) | **200×200** | **Yes** | Optional |
| `…/places/{library,guild,school,dungeon,fortress,mill,watch,farm}.png` | Map landmarks | **360×360** each | **Yes** | Stand on clearings; numbered seals overlaid in CSS |
| `…/walk/1.png` … `8.png` | Walk cycle; sorted by filename | **240×320** or **480×640** | **Yes** | **Same ground line & scale**; lantern/map prop optional |

**Also reused:** `land.png` → Finale page stack.

---

## Chapter 5 — Power sheet (`PowerSheet.astro`)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/ch5-powersheet/panel.jpg` | Rush BG + inner panel burst | **1664×1664** or 1200×1200 | No | Speed-line panel interior |
| `…/ch5-powersheet/ines.png` | Steps out of frame; oversized | **1200×1850** | **Yes** | Hand/head break border; match protagonist lock |
| `…/faces/calm.png` | ~90px face chip | **360×360** crop | **Yes** | Bust |
| `…/faces/thinking.png` | Face chip | Match | **Yes** | |
| `…/faces/fierce.png` | Face chip | Match | **Yes** | |

---

## Final Chapter (`Finale.astro`)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/ch6-finale/dawn.jpg` | Dawn map; mobile huge sizes | **1920×1080** | No | Himalayan dawn |
| `…/ch6-finale/ines.png` | Figure ~20vw; living cloth | **744×1100** | **Yes** | From behind on quay/ridge |
| `…/ch6-finale/shards.png` | Title shatter FX | **1189×900** | **Yes** | Ink shards; works with ORIGIN text shatter |

Stack pages reuse: `port-wide`, `arrival`, `board`, `land` (already listed).

---

## Recruiter mode (colour edition)

### Hero & stickers

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/recruiter/hero/ines.png` | Hero peel sticker ~300px | **760×1140** | **Yes** | Colour protagonist; white die-cut edge preferred |
| `…/hero/world-1.png` … `world-7.png` | Peel stickers | **640×640** | **Yes** | Bhutan, study, ORIGIN volume, laptop, security itch, etc. |
| `…/kittens/kitten-1..4.png` | Hunt + contact peek | **400×400**–480×720 | **Yes** | Companion stickers (not VOL.01 cats; new design) |
| `…/mascot/cat-1..3.png` | Mascot poses | Match | **Yes** | Nap / wave / jump; `cat-4` unused spare |

### Experience / education / community / projects

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/experience/mission-1.png` | Job sticker (Jaggle) | **640×640** | **Yes** | |
| `…/experience/mission-2.png`, `mission-3.png` | Spare mission stickers | **640×640** | **Yes** | Optional future jobs |
| `…/experience/mini-1..4.png` | Buddy cursor + peek | **180×180**–280 | **Yes** | Mini Denyel poses |
| `…/education/s-1.png`, `s-2.png` | Cap / scroll stickers | **640×640** | **Yes** | |
| `…/community/c-1.png`…`medal.png` | Interest stickers | **640×640** | **Yes** | Cybersecurity interest |
| `…/projects/place-1..8.png`, `extra-*.png` | Project stickers | **640×640** | **Yes** | Map to featured projects |

### Photos / prints (16:10 frames in UI)

| Path | Display | Target | Alpha | Notes |
|------|---------|--------|-------|-------|
| `…/photos/experience/jaggle-desk.jpg` | Print stack | **1400×875** (16:10) | No | Real photo or illustrated “print” |
| `…/photos/education/gcit-campus.jpg` | Print | **1400×875** | No | |
| `…/photos/projects/dzonglish-ui.jpg` | Print | **1400×900** | No | UI still or manga panel-as-screenshot |
| `…/photos/projects/attendance-demo.jpg` | Print | **1400×900** | No | |
| `…/photos/projects/hotelbot-chat.jpg` | Print | **1400×900** | No | |
| `…/photos/projects/jobscout-ui.jpg` | Print | **1400×900** | No | |
| `…/photos/community/cyber-lab.jpg` | Print | **1400×875** | No | |

Legacy unused photo/logo paths may remain on disk from the fork; **active** recruiter code uses the DENYEL paths above. Prefer not redistributing old personal photos—overwrite or delete unused leftovers in a later cleanup pass.

### Logos

| Path | Display | Target | Notes |
|------|---------|--------|-------|
| `…/logos/jaggle.svg` | Tab mark | SVG | Official mark if permitted, else wordmark |
| `…/logos/gcit.png` | Folder tab | **320×120** transparent PNG | |
| `…/logos/cyber.png` | Interests tab | **320×120** | |

---

## Slot count (active placeholders)

| Area | Approx. unique files |
|------|----------------------|
| Intro / FX / board / drips | 5 |
| Origin | 5 |
| Training + certs | 10 |
| Missions (01–03) | ~25 |
| Side quests | 1 land + 5 ornaments + 8 places + 8 walk = 22 |
| Power sheet | 5 |
| Finale exclusive | 3 |
| Recruiter frames | ~45 |
| Photos + logos (active) | ~10 |
| **Total active slots** | **~130** |

Many recruiter stickers can share one sticker sheet export. Mission `lie*` must be a 4-frame set.

---

## Minimum set to make the homepage feel complete

See summary in chat / [docs/ASSET-REPLACEMENT.md](docs/ASSET-REPLACEMENT.md) § Priority batch. Roughly:

1. Protagonist model sheet → unlocks cutouts + faces + walk + recruiter hero  
2. Origin establishing pair + cutout  
3. Ink textures (gate/title immersion)  
4. Training arrival + night  
5. Mission board + one mission hero panel  

Full polish still needs mission sets, map, finale, and recruiter colour pack.
