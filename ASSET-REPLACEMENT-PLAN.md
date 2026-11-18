# DENYEL — ORIGIN · Asset & license replacement plan

**Source fork:** MIT code from Ines Cherif’s VOL.01 manga portfolio.  
**Binding rule:** [LICENSE-ASSETS](LICENSE-ASSETS) — illustrations, story, CV, characters, VOL.01 identity, and the protected overall look must **not** be reused or redistributed.

This phase replaces protected content with **original DENYEL text/branding** and **clearly labeled original placeholders**. No original VOL.01 art ships in the build output once placeholders overwrite `src/assets/`, `public/`, and `media/`.

---

## License summary

| Layer | Status |
|-------|--------|
| `.astro` / `.ts` / `.css` / config (mechanics) | MIT — keep Astro + GSAP + Lenis stack |
| `src/assets/**`, `public/**` media, `media/**` | All rights reserved — **replace** |
| `src/data/story.ts` narrative & personal facts | All rights reserved — **rewrite** |
| VOL.01 name, IC monogram, rose-on-warm-paper look | Reserved — **new brand + palette** |

---

## Replacement inventory

### A. Manga frames (`src/assets/frames/`)

| Path group | Was | DENYEL replacement |
|------------|-----|-------------------|
| `intro/ink*.jpg` | Brush-ink washes | Navy/electric SVG-rendered placeholders labeled ORIGINAL PLACEHOLDER |
| `ch1-origin/*` | Bizerte + Ines character | Placeholders: Bhutan / origin panels (art TBD) |
| `ch2-training/*` | ISAMM training + Ines poses | Placeholders: GCIT / training arc (art TBD) |
| `ch2-training/scroll.png`, `seal.png` | Diploma art | Generic placeholder scroll/seal |
| `ch3-mission(s)/*`, `leads/*`, `talan/*` | Tabaani / Leads / Talan / Hallucination | Placeholders for Jaggle.ai + project missions |
| `ch4-sidequests/**` | Map, places, walk cycle of Ines | Placeholders; walk frames are labeled blanks |
| `ch5-powersheet/*`, `faces/*` | Ines character sheet | Placeholders: Denyel character file (art TBD) |
| `ch6-finale/*` | Bizerte dawn + Ines + VOL.01 shards | Placeholders: Final Chapter (art TBD) |
| `recruiter/**` | Colour stickers, kittens, mascot of Ines’s world | Placeholders; mascot copy rewritten; art TBD |

### B. Photos (`src/assets/photos/`)

| Path group | Was | DENYEL replacement |
|------------|-----|-------------------|
| `experience/*` | Talan / Leads / Tabaani photos | Placeholders for Jaggle.ai (real photos TBD) |
| `projects/*` | Recrutia / RAG / SurgiGuard shots | Placeholders for Dzonglish, Attendance, Hotel bot, JobScoutAI |
| `education/*` | ISAMM / FSEGT | Placeholders for GCIT |
| `community/*` | GDG / IPS / HackCure | Placeholders or empty interests (details TBD) |

### C. Logos (`src/assets/logos/`)

| File | Action |
|------|--------|
| `talan.svg`, `leads-provider.svg`, `tabaani.png`, `isamm.png`, `fsegt.png`, `gdg.png`, `hive.png`, `ips.png` | Overwritten with placeholders; components remapped to `jaggle` / `gcit` / interest marks |
| `issuers/*` | Third-party marks — not used until Denyel has real certs; left as placeholders only |

### D. Public & media

| Path | Action |
|------|--------|
| `public/cv/Ines_CHERIF_*.pdf` | **Removed** — not published. CV download marked TBD / missing |
| `public/og/*.jpg` | Replaced with DENYEL OG placeholders |
| `public/favicon.svg` | New **D** monogram (navy / electric blue) |
| `media/cover.jpg`, `media/demo.mp4` | Replaced / removed from README; not redistributed as VOL.01 demo |

---

## Story structure mapping

| Chapter | VOL.01 | DENYEL — ORIGIN |
|---------|--------|-----------------|
| Gate / Title | VOL.01 · Ines | **ORIGIN** · Denyel |
| 1 Origin | Bizerte, Tunisia | Bhutan · CS student origin |
| 2 Training Arc | ISAMM / FSEGT / certs | GCIT · AI & Data Science · cybersecurity interest |
| 3 Missions | Tabaani / Leads / Talan | Jaggle.ai · Dzonglish NLP · Smart Attendance |
| 4 Side Quests | Eight personal projects | Hotel WhatsApp chatbot · JobScoutAI · interests (TBD slots) |
| 5 Power sheet | Ines skills | Denyel skills (honest, no invented stack depth) |
| 6 Final Chapter | Finale / colophon | Contact + next chapter CTA |
| Recruiter | Colour CV | Education, experience, skills, projects, contact, CV TBD |

---

## Missing details (do not invent)

Mark clearly in UI/copy until provided:

- Personal email, phone, LinkedIn, GitHub URLs  
- Exact internship dates / role title at Jaggle.ai  
- Project repos, demos, screenshots, metrics  
- Certifications list  
- Downloadable CV PDF  
- Community / club memberships  
- Portrait / original manga art  

---

## Keep (MIT mechanics)

Astro pages/components, GSAP + ScrollTrigger scenes, Lenis wiring, Web Audio synth, FX modules (ink wipe, page turn, drips, hold, drag, colour bleed), recruiter interaction shells, comic CSS structure — restyled with midnight navy / white / ink black / electric blue.
