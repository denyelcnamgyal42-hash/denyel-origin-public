# Project screenshots still needed

Recruiter Mode Featured Projects now uses a **2×2 card grid** with architecture-diagram media. Case-study dialogs keep full verified write-ups.

**Do not** ship navy `ORIGINAL PLACEHOLDER` fills or manga panels as product screenshots.

## Current asset check (Nov 2026)

These files exist under `src/assets/photos/projects/` but are **navy placeholders** (~97% solid navy, labeled `Art TBD`), not real captures:

| File | Intended use | Status |
| --- | --- | --- |
| `dzonglish-ui.jpg` | Dzonglish card / case study | Placeholder — replace |
| `attendance-demo.jpg` | Smart Attendance card / case study | Placeholder — replace |
| `hotelbot-chat.jpg` | Hotel chatbot card / case study | Placeholder — replace |
| `jobscout-ui.jpg` | JobScoutAI card / case study | Placeholder — replace |

Legacy template shots (`recrutia-*`, `rag-*`, `surgiguard-*`) are also placeholders and are **not** mapped to Denyel projects.

## Preferred captures (redacted)

### Dzonglish NLP
- Annotation interface (no participant PII)
- Token language-ID output sample
- Model evaluation chart / comparison table
- Pipeline diagram export (optional)

### Smart Attendance System
- App / dashboard UI with **synthetic or blurred** faces only
- Detection overlay on a consented demo frame (or anonymized)
- Attendance state table (no real student names/IDs)

### AI Hotel Booking Chatbot
- WhatsApp-style conversation with **fake guest data**
- Booking workflow / confirmation UI
- Staff Google Sheets / approval view with dummy rows

### JobScoutAI
- Job discovery / list UI
- Recommendation or match results
- Skills-matching view

## How to add verified shots

1. Export real UI stills (prefer ~1400×900 / 16:10).
2. Redact private names, phone numbers, faces without permission, booking PII, and participant records.
3. Replace the matching file under `src/assets/photos/projects/` **or** add `<projectId>-<shotId>.jpg` and wire `shots` in `src/data/recruiter-content.ts`.
4. Re-run `npm run validate-assets` and open the case study dialog to confirm.

Until then, cards and dialogs intentionally show **architecture diagrams**, not fake product UI.
