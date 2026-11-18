# Attribution & Third-Party Notices — DENYEL — ORIGIN

This document records the copyright notices, upstream attributions, third-party software/font licenses, and media provenance for **DENYEL — ORIGIN**.

---

## 1. Upstream Codebase Attribution (MIT License)

The interactive Astro + GSAP + Lenis portfolio architecture, scene mechanics, CSS comic vocabulary, Web Audio procedural sound engine, and recruiter layout structure are adapted from **VOL.01**:

- **Upstream repository:** https://github.com/inesCherif/vol01-manga-portfolio
- **License (source code only):** MIT License — see [LICENSE](LICENSE)
- **Copyright notice:** `Copyright (c) 2026 Ines Cherif`

### Upstream Assets Reservation (`LICENSE-ASSETS`)

As required by [LICENSE](LICENSE) and [LICENSE-ASSETS](LICENSE-ASSETS):

- Original `VOL.01` illustrations, frames, stickers, textures, personal photos, CVs, story text (`src/data/story.ts`), demo video (`media/demo.mp4`), and the `VOL.01` name/logo/identity are **Copyright (c) 2026 Ines Cherif. All rights reserved.** and are **not** licensed for reuse.
- In `HEAD`, all upstream illustrations, personal photos, logos, CVs, demo media, and upstream `robots.txt` references have been removed or replaced with original DENYEL content or DENYEL-labeled placeholders.
- **Note for public repositories:** If this project retains upstream git commits (`ee62117`–`578901a`), git object history still stores the original upstream assets. Squash or re-initialize git history before publishing a public repository on GitHub.

---

## 2. DENYEL — ORIGIN Adaptations & Original Content

- **Author:** Denyel Chokey Namgyal
- **Adapted / new source code:** Licensed under the MIT License alongside upstream code ([LICENSE](LICENSE)).
- **Original text, biography, project write-ups, and personal documents:** All rights reserved by Denyel Chokey Namgyal unless otherwise noted.

---

## 3. Bundled Fonts (SIL Open Font License 1.1)

Web fonts are self-hosted via `@fontsource/*` packages and bundled into static output (`dist/_astro/*.woff`, `*.woff2`). Under the SIL Open Font License, Version 1.1 (`OFL-1.1`), the fonts may be bundled and redistributed with the site provided their copyright notices and reserved font names are preserved:

| Font | Package | License | Copyright & Reserved Font Name Notice |
|---|---|---|---|
| **Archivo** | `@fontsource/archivo` (`^5.3.0`) | `OFL-1.1` | `Copyright 2020 The Archivo Project Authors (https://github.com/Omnibus-Type/Archivo)` |
| **Caveat** | `@fontsource/caveat` (`^5.3.0`) | `OFL-1.1` | `Copyright 2014 The Caveat Project Authors (https://github.com/googlefonts/caveat)` |
| **Federant** | `@fontsource/federant` (`^5.3.0`) | `OFL-1.1` | `Copyright (c) 2011, Cyreal (www.cyreal.org), with Reserved Font Name 'Federant'` |

Full license text is preserved in `node_modules/@fontsource/{archivo,caveat,federant}/LICENSE` and at http://scripts.sil.org/OFL.

---

## 4. Third-Party Libraries

### Runtime Dependencies (Bundled into Site Output)

| Package | Version | License | Copyright / Terms |
|---|---|---|---|
| `astro` | `^7.3.8` | `MIT` | `Copyright (c) 2021 Fred K. Schott` (includes MIT-licensed portions from `sveltejs/kit` and `vitejs/vite`) |
| `lenis` | `^1.3.26` | `MIT` | `Copyright (c) 2024 darkroom.engineering` |
| `gsap` | `^3.15.0` | Standard "No Charge" GSAP License | `Copyright (c) 2008-2026, GreenSock. All rights reserved.` Free for websites including commercial portfolios under https://gsap.com/standard-license; prohibits competing visual animation tools or standalone redistribution of GSAP source outside projects. |

### Build-Time & Development Tooling (Not Shipped in `dist/`)

| Package | Version | License | Notes |
|---|---|---|---|
| `@astrojs/check` | `^0.9.10` | `MIT` | Static type/template checking (`astro check`) |
| `typescript` | `^6.0.3` | `Apache-2.0` | `Copyright (c) Microsoft Corporation` |
| `sharp` | `^0.35.5` | `Apache-2.0` | `Lovell Fuller`; uses prebuilt `@img/sharp-libvips-*` binaries (`LGPL-3.0-or-later` / `Apache-2.0 AND LGPL-3.0-or-later`) at build time only to generate `.webp` images and dev placeholders. |

Transitive build/dev packages in `package-lock.json` use permissive open-source licenses (`MIT`, `Apache-2.0`, `ISC`, `MPL-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `BlueOak-1.0.0`, `CC0-1.0`, `0BSD`), except build-time-only `@img/sharp-libvips-*` native modules (`LGPL-3.0-or-later`), which are not included in the static deployment (`dist/`).

---

## 5. Audio

- No external audio files (`.mp3`, `.wav`, `.ogg`) are included or distributed.
- All ambient soundscapes and interaction effects in `src/scripts/audio/sound.ts` are procedurally synthesized in-browser using the **Web Audio API**.

---

## 6. Inline Icons & Brand Marks

- **UI icons (`src/components/ui/Icon.astro`) & stamp stickers (`src/scripts/recruiter/art.ts`):** Inline SVG paths from the MIT-licensed codebase (`mail`, `play`, `web`, `copy`, `cv`, and decorative stickers).
- **Third-party service brand icons (`src/components/ui/Icon.astro`):** Inline SVG marks for **LinkedIn**, **GitHub**, and **WhatsApp** (`whatsapp` currently unused in active routes). These marks remain trademarks of their respective owners (LinkedIn Corporation, GitHub Inc., WhatsApp LLC / Meta Platforms Inc.) and are used solely to identify external profile/contact links.

---

## 7. Visual Assets & User-Supplied Documents Inventory

### A. AI-Generated & Composited DENYEL Manga Artwork
Created specifically for **DENYEL — ORIGIN** (no `VOL.01` artwork reused or modified):
- `src/assets/frames/intro/{ink.jpg,ink-tall.jpg}`
- `src/assets/frames/ch1-origin/{port-wide.jpg,port.jpg,ines.png,eyes.jpg,hand.jpg}`
- `src/assets/frames/ch2-training/{arrival.jpg,night.jpg,workshop.jpg,rack.jpg,sunrise.jpg,power-calm.jpg,power-burst.jpg}`
- `src/assets/frames/ch3-mission/{door.jpg,faceoff.jpg,drips.png}` (composites / custom ink-drip mask)
- `public/og/{story.jpg,recruiter.jpg}` (1200×630 DENYEL social-sharing cards)
- `src/assets/frames/ch3-missions/leads/storm.jpg` (composite with custom token cards)
- `src/assets/frames/ch3-missions/talan/{panorama.jpg,smoke.jpg,squad.jpg,library.jpg,smoke-hand.jpg,stamp.jpg,rivers.jpg,faceoff.jpg,lie.jpg,lie-cracks.jpg,lie-breaking.jpg,lie-shatter.jpg,dawn.jpg}`
- `src/assets/frames/ch4-sidequests/{land.png,places/library.png,places/guild.png}`
- `src/assets/frames/ch5-powersheet/{ines.png,faces/calm.png,faces/thinking.png,faces/fierce.png}`
- `artwork-extras/origin-with-protagonist-OPTIONAL.jpg` (unused optional plate)

*Note:* AI-generated imagery has evolving copyrightability and generator-terms considerations depending on the service used; verify compliance with your generator's terms of service if commercial redistribution is intended.

### B. Original Vector / Programmatic DENYEL Graphics
- `public/favicon.svg`
- `src/assets/logos/{jaggle.svg,gcit.png,cyber.png}` (`jaggle.svg` and `gcit.png` are custom typographic placeholders/wordmarks; `cyber.png` is unused)
- `src/assets/frames/ch2-training/speedlines.jpg`, `src/assets/frames/ch5-powersheet/panel.jpg`
- `src/assets/frames/ch3-mission/{monster.jpg,modules.jpg}`, `src/assets/frames/ch3-missions/{board.jpg,file-open.jpg}`
- `src/assets/frames/ch3-missions/leads/{vault.jpg,sheets.png,merge.jpg,gate.jpg,windows.jpg}`
- `src/assets/frames/ch4-sidequests/ornaments/{cloud.png,compass.png}` and `walk/{1..8}.png` (SVG-rig draft sequence)

### C. Labeled Placeholder Assets (`ORIGINAL PLACEHOLDER · DENYEL`)
Generated by `scripts/dev/replace-protected-assets.mjs` to ensure no upstream `VOL.01` media remains in the repository:
- **Active in build:** None — all active pages (`/` and `/recruiter/`) and social cards use custom DENYEL artwork, vector/programmatic graphics, or user-supplied credentials.
- **Unused in active pages:** `media/cover.jpg`, `src/assets/frames/ch2-training/{scroll.png,seal.png}`, `ch4-sidequests/ornaments/{quill,serpent,ship}.png`, `ch4-sidequests/places/{dungeon,farm,fortress,mill,school,watch}.png`, `ch6-finale/*`, `src/assets/frames/recruiter/**`, remaining placeholder files in `src/assets/logos/**` and `src/assets/photos/**`.

### D. User-Supplied Certificates & Badges (`public/certifications/`)
Provided directly by Denyel Chokey Namgyal; issuer trademarks, logos, and seals belong to their respective organizations and are displayed solely to document Denyel's earned credentials:
- **TryHackMe:** `Cyber Security 101` certificate (`tryhackme-cyber-security-101.pdf` + `.webp`), `Hacker Holidays` participation certificate (`tryhackme-hacker-holidays.jpg` + `.webp`)
- **ASD Academy:** `Indo–Bhutan Cyber Security Awareness Training Camp` completion certificate (`indo-bhutan-security-training.jpg` + `.webp`)
- **AWS Academy:** `Cloud Foundations` Trained course badge (`aws-cloud-foundations-badge.png` + `.webp`) — subject to AWS Academy badge guidelines; labeled as a course badge, not an AWS Certification.
- **Cisco Networking Academy:** `Introduction to Cybersecurity` Verified course badge (`cisco-introduction-to-cybersecurity-badge.png` + `.webp`) — subject to Cisco badge guidelines.

### E. User-Supplied CV (`public/cv/`)
- `public/cv/Denyel_CV.pdf` is the approved 8-page sanitized public CV for Denyel Chokey Namgyal (personal mobile number and final references page removed; GitHub profile hyperlink updated to `https://github.com/denyelcnamgyal42-hash`; duplicate unredacted CV removed from the deployable project and archived privately outside the repository).
