# DENYEL — ORIGIN

Interactive manga-inspired portfolio for **Denyel**, a Bhutanese computer science student focused on AI and Data Science, with interests in cybersecurity.

Chapters: **Origin → Training Arc → Missions → Side Quests → Final Chapter**, plus a recruiter-friendly colour mode (education, experience, skills, projects, contact, CV).

Built on the **MIT-licensed mechanics** of [VOL.01](https://github.com/inesCherif/vol01-manga-portfolio) (Astro + GSAP + Lenis). **Art, story, CV, and VOL.01 identity are not reused** — see [LICENSE-ASSETS](LICENSE-ASSETS) and [ASSET-REPLACEMENT-PLAN.md](ASSET-REPLACEMENT-PLAN.md).

**Phase 2 (art prep):** [ART-DIRECTION.md](ART-DIRECTION.md) · [ARTWORK-MAP.md](ARTWORK-MAP.md) · [docs/ASSET-REPLACEMENT.md](docs/ASSET-REPLACEMENT.md). Finished illustrations are produced externally and dropped onto existing paths.

## Stack

| | |
|---|---|
| **Astro** | static pages, image optimisation |
| **GSAP + ScrollTrigger** | scroll-driven story timelines |
| **Lenis** | smooth scroll synced to the GSAP ticker |
| **TypeScript** | scene and recruiter scripts |
| **Plain CSS** | comic vocabulary + recruiter sticker UI |

## Run

```bash
npm install
npm run dev       # http://localhost:4321
npm run check
npm run build
npm run preview
```

Asset tooling:

```bash
npm run validate-assets   # critical paths + aspect sanity after art drops
npm run replace-assets    # regenerate labeled placeholders only (not finished art)
```

## Content rules

- Do not invent personal links, dates, metrics, or achievements.
- Missing details are marked **MISSING** / **TBD** in `src/data/story.ts`.
- Do not publish original VOL.01 illustrations, CVs, or demo media.

## License

- **Code**: [MIT](LICENSE) (upstream copyright retained for the original mechanics; DENYEL adaptations in this fork).
- **Upstream art / story / CV / VOL.01 look**: all rights reserved — [LICENSE-ASSETS](LICENSE-ASSETS).
- **Third-party notices & asset provenance**: see [ATTRIBUTION.md](ATTRIBUTION.md).
- **DENYEL text and custom media in this repo**: owned/created for Denyel’s portfolio; see [ATTRIBUTION.md](ATTRIBUTION.md) and [ASSET-REPLACEMENT-PLAN.md](ASSET-REPLACEMENT-PLAN.md).
