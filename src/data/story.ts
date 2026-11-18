// DENYEL — ORIGIN · personal portfolio adapted from MIT-licensed VOL.01 mechanics
// (code MIT; original VOL.01 art/story/CV reserved — see LICENSE-ASSETS).
// All site copy lives here. *word* draws in the accent colour.
// Unverified details stay omitted — do not invent links, dates, or achievements.

import { storyCertifications } from './training';

export type IconName = 'linkedin' | 'github' | 'mail' | 'cv' | 'play' | 'web' | 'whatsapp' | 'copy';

/** Verified public URL or real mailto only — never invent profiles. */
export const isVerifiedHref = (href: string) =>
  /^https?:\/\//i.test(href) ||
  (href.startsWith('mailto:') && href.length > 'mailto:'.length && !/@example\.invalid/i.test(href));

export const person = {
  name: 'Denyel Chokey Namgyal',
  shortName: 'Denyel',
  role: 'AI & Data Science Developer · Computer Science student · Bhutan',
  tagline: 'ORIGIN',
  links: {
    linkedin: 'https://www.linkedin.com/in/denyelcnamgyal',
    github: 'https://github.com/denyelcnamgyal42-hash',
    email: 'mailto:denyelcnamgyal42@gmail.com',
  },
};

export const meta = {
  title: 'DENYEL — ORIGIN · AI Developer Portfolio',
  description:
    'Denyel, a Bhutanese computer science student focused on AI and Data Science, with interests in cybersecurity. Interactive manga-inspired portfolio: Origin, Training Arc, Missions, Side Quests, Final Chapter.',
  image: '/og/story.jpg',
  imageAlt: 'DENYEL — ORIGIN title card — monochrome manga portfolio with electric-blue accents.',
};

export const seo = {
  jobTitle: 'Computer science student · AI & Data Science',
  school: 'GCIT (Gyalpozhing College of Information Technology), Royal University of Bhutan',
  city: 'Thimphu',
  country: 'BT',
  knowsAbout: [
    'Artificial Intelligence',
    'Data Science',
    'Natural Language Processing',
    'Computer Vision',
    'Cybersecurity',
    'Python',
    'Machine Learning',
    'Deep Learning',
    'FastAPI',
    'Backend development',
  ],
};

export const origin = {
  label: 'Chapter 1 · Origin',
  captions: [
    'Bhutan. Denyel chose *computer science* — building tools people can actually use.',
    'The focus settled on *AI and Data Science*, with curiosity about how systems stay secure.',
    '*DENYEL — ORIGIN*: from GCIT coursework to internships and flagship builds.',
  ],
};

export const training = {
  label: 'Chapter 2',
  title: 'The Training Arc',
  captions: {
    arrival: 'GCIT, Royal University of Bhutan. *Computer Science* with an AI & Data Science track.',
    nights: 'Evenings on *models, datasets, and evaluation* — learning to measure, not just ship.',
    network: 'A parallel thread: *cybersecurity* awareness — how systems fail, and how to harden them.',
    sunrise: 'Then back to class, labs, and the next build.',
    power: 'Skills compound. Time to put them on *real projects*.',
  },
  scrollsTitle: 'Training',
  certifications: storyCertifications,
  verify: 'Open credential',
  hold: 'Credentials appear as you arrive — verified training only',
};

export const missions = {
  label: 'Chapter 3',
  title: 'Missions',
  sub: 'Internship · Dzonglish NLP · Smart Attendance',
  board: 'Three dossiers on the wall. Open them in order: *internship*, then *NLP*, then *vision*.',
  files: [
    { no: '01', name: 'Jaggle.ai', year: 'Intern' },
    { no: '02', name: 'Dzonglish NLP', year: 'NLP' },
    { no: '03', name: 'Smart Attendance', year: 'Vision' },
  ],
  complete: 'Logged',
  report: {
    title: 'Mission reports',
    stamp: 'Mission logged',
    files: [
      {
        label: 'Mission 01 · Jaggle.ai',
        facts: [
          ['Org', 'Jaggle.ai'],
          ['Role', 'AI Developer Intern'],
          ['When', 'Nov 2025 – Jan 2026'],
          ['Focus', 'Conversational AI · LangChain · structured records'],
          ['Status', 'Logged'],
        ],
        results: [
          'Internship at *Jaggle.ai*: built a *LangChain* conversational hotel-booking prototype that wrote *structured booking records*.',
          'Separate from the later *WhatsApp Cloud API* hotel chatbot in Side Quests.',
        ],
      },
      {
        label: 'Mission 02 · Dzonglish NLP',
        facts: [
          ['Project', 'Dzonglish NLP'],
          ['Domain', 'Natural language processing'],
          ['Focus', 'Annotation · language ID · normalization'],
          ['Status', 'Logged'],
        ],
        results: [
          '*Dzonglish NLP*: collect Romanized Dzongkha–English text, clean it, annotate tokens, then explore language ID and spelling normalization.',
          'Public repo and metrics appear when a verified link is ready.',
        ],
      },
      {
        label: 'Mission 03 · Smart Attendance',
        facts: [
          ['Project', 'Smart Attendance'],
          ['Stack', 'YOLO · FaceNet · OpenCV · Flask · MySQL'],
          ['Domain', 'Computer vision · attendance'],
          ['Status', 'Logged'],
        ],
        results: [
          'Pipeline: *YOLO* detects faces, *FaceNet* embeds them, *OpenCV* supports matching; *Flask* + *MySQL* serve the roster.',
          'Gallery size and accuracy figures stay unpublished until verified.',
        ],
      },
    ],
  },
};

export const tabaani = {
  // Mission 01 scene shell → Jaggle.ai
  label: 'Mission 01',
  captions: {
    door: 'Mission 01 · *Jaggle.ai*. *AI Developer Intern*, Nov 2025 – Jan 2026.',
    legacy: 'Production work means messy data, shifting briefs, and *APIs that have to hold*.',
    untangle: 'Hold to pull one thread: turn the tangle into something you can ship.',
    modules: 'Logged: *LangChain* hotel-booking prototype with *structured records* — not the WhatsApp side quest.',
    hosts: 'Title and dates stay on request — no invented launch metrics here.',
    next: 'Dossier 01 logged. Next file: *Dzonglish NLP*.',
  },
  sfx: 'AI',
};

export const leads = {
  // Mission 02 scene shell → Dzonglish NLP
  label: 'Mission 02',
  captions: {
    vault: 'Mission 02 · *Dzonglish NLP*. Romanized Dzongkha mixed with English — noisy, real text.',
    brief: 'Goal: clean data, label tokens, then *identify language* and explore *normalization*.',
    storm: 'Raw messages arrive messy. Cleaning and filtering come before any model bravado.',
    merge: 'Annotations converge: each token marked *DZO_ROM*, *ENG*, or *OTHER*.',
    gate: 'Quality gate: drag a *badly labeled* card onto the gate. Bad labels get rejected — they never enter the gold set.',
    windows: 'After review: language ID and spelling-normalization experiments on trusted text.',
    next: 'Dossier 02 logged. Last file: *Smart Attendance*.',
  },
  record: {
    name: 'Bad annotation',
    id: 'token labels · inconsistent',
    line: 'DZO_ROM / ENG / OTHER — review failed',
  },
  reject: '✗',
  drag: 'Drag onto the gate to reject bad labels',
  rejected: 'Rejected — only reviewed labels move forward',
  // Only show manga SFX counters when a verified number exists
  sfx: { companies: null as number | null, reachable: null as string | null },
  sfxLabels: { companies: '', reachable: '' },
};

export const talan = {
  // Mission 03 scene shell → Smart Attendance (vision “boss”)
  label: 'Mission 03',
  captions: {
    city: 'Mission 03 · *Smart Attendance*. Classroom cameras need honest presence checks.',
    urban: 'Stack in play: *YOLO* detect → *FaceNet* embed → *OpenCV* match.',
    squad: 'A student-built vision service — Flask API, MySQL roster, thresholds you can audit.',
    rise: 'Comic beat: the *false match* — a wrong identity wearing a confident score.',
    library: 'Compare embeddings to a roster gallery you can review (size unpublished).',
    beams: '*Detect → embed → compare.* An attendance mark should be explainable.',
    split: 'A high similarity score is *not* proof. Thresholds and human review beat hunches.',
    rivers: 'Capture, match, review — wire the pipeline so staff can question a hit.',
    cite: 'Hold to “cite” evidence: frame, embedding, threshold — the audit habit.',
    tests: 'Offline test counts stay off-page until published.',
    dawn: 'When overconfident matches are challenged, the roster earns trust again.',
  },
  // Antagonist boasts = comic metaphor for overconfident false matches (not live model output)
  lies: [
    '“Match locked. That is student 42.”',
    '“The score looks high enough. Trust it.”',
    '“Skip the human review.”',
  ],
  citations: ['Source · frame', 'Source · embedding', 'Source · threshold'],
  // Illustrative overlays on the split beat — metaphor, not a real inference dump
  guess: '0.97?',
  fact: 'verify ✓',
  validated: 'Validated',
  // Only show manga SFX counters when a verified number exists (never invent gallery/test totals)
  sfx: { articles: null as number | null, tests: null as number | null },
  sfxLabels: { articles: '', tests: '' },
};

export const sidequests = {
  label: 'Chapter 4',
  title: 'Side quests',
  sub: 'Two completed builds · hotel chatbot & JobScoutAI',
  map: 'Manga quest map across a Himalayan valley — two featured software projects',
  keyTitle: 'Quest log',
  explore: 'Open dossier',
  close: 'Close dossier',
  continue: 'Back to the map',
  repo: 'GitHub',
  // Only verified completed projects — no ghost destinations
  quests: [
    {
      id: 'hotelbot',
      place: 'library',
      alt: 'Inn landmark for the AI Hotel Booking Chatbot',
      name: 'AI Hotel Booking Chatbot',
      kind: 'Conversational AI',
      line: 'WhatsApp booking assistant with staff approval in Google Sheets.',
      problem:
        'Guests expect hotel help on messaging apps. Staff need booking requests captured without building a full custom guest app.',
      does:
        'A conversational assistant on the *WhatsApp Cloud API* checks room availability, takes booking requests, and routes them for *employee approval* with records in *Google Sheets*. A *Flask* backend ties the chat flow to ops.',
      workflow: [
        'Guest messages the hotel on WhatsApp',
        'Bot clarifies dates, room needs, and contact details',
        'Availability check against the sheet-backed inventory',
        'Booking request logged for staff review',
        'Employee approves or follows up in the booking sheet',
      ],
      challenges: [
        'Keeping multi-step booking state coherent across incomplete guest messages',
        'Making the Google Sheets ledger readable for staff while the bot stays responsive',
        'Separating guest-facing chat from internal approval without inventing a heavy CRM',
      ],
      stack: 'WhatsApp Cloud API · Conversational AI · Flask · Google Sheets',
      repo: '',
    },
    {
      id: 'jobscout',
      place: 'guild',
      alt: 'Guild-hall landmark for JobScoutAI',
      name: 'JobScoutAI',
      kind: 'Backend · Matching',
      line: 'Collect jobs, deduplicate listings, match skills to openings.',
      problem:
        'Job posts scatter across sources with duplicates and noisy descriptions. Candidates need matches grounded in *skills*, not keyword spam alone.',
      does:
        'A *FastAPI* service on *PostgreSQL* that *collects* jobs, *deduplicates* near-identical listings, and produces *skill-based* candidate-to-job recommendations.',
      workflow: [
        'Ingest job listings from configured sources',
        'Normalize and deduplicate overlapping posts',
        'Store roles and skill signals in PostgreSQL',
        'Match candidate skills to openings',
        'Return ranked recommendations through the API',
      ],
      challenges: [
        'Near-duplicate listings with inconsistent titles and descriptions',
        'Keeping match logic interpretable rather than a black-box score',
        'Structuring the API around stored roles and skill profiles',
      ],
      stack: 'FastAPI · PostgreSQL · Job collection · Deduplication · Skill matching',
      repo: 'https://github.com/denyelcnamgyal42-hash/JobScout-AI',
    },
  ],
};

export const powers = {
  label: 'Chapter 5',
  title: 'Power sheet',
  file: 'Character file',
  role: 'Bhutanese CS student at *GCIT* — AI & Data Science, with *Jaggle.ai* internship experience and a *cybersecurity* interest.',
  panelAlt: 'Denyel stepping from a manga panel — hoodie, electric-blue headphones, hand reaching forward',
  faces: [
    { face: 'calm', caption: 'When the eval looks honest', alt: 'Denyel calm expression' },
    { face: 'thinking', caption: 'When the dataset fights back', alt: 'Denyel thinking expression' },
    { face: 'fierce', caption: 'When security is on the brief', alt: 'Denyel focused expression' },
  ],
  star: 'Signature focus',
  groups: [
    {
      title: 'AI / ML',
      star: 'Machine Learning',
      skills: [
        'Machine Learning',
        'Deep Learning',
        'Data Science',
        'LangChain',
        'Chatbots',
        'Python',
        'Evaluation',
      ],
    },
    {
      title: 'NLP / CV',
      star: 'NLP',
      skills: ['NLP', 'Computer Vision', 'YOLO', 'FaceNet', 'OpenCV'],
    },
    {
      title: 'Backend',
      star: 'FastAPI',
      skills: ['FastAPI', 'Flask', 'APIs', 'PostgreSQL', 'MySQL', 'SQL', 'WhatsApp Cloud API', 'Google Sheets'],
    },
    {
      title: 'Tools',
      star: 'Git',
      skills: ['Git', 'pandas', 'Data cleaning'],
    },
    {
      title: 'Security',
      star: 'Cybersecurity foundations',
      skills: ['Cybersecurity foundations', 'Secure design mindset'],
    },
    {
      title: 'Spoken',
      star: 'Dzongkha',
      skills: ['Dzongkha', 'English'],
    },
  ],
  community:
    'Building AI that fits Bhutan’s context — *Dzonglish NLP*, *Smart Attendance*, plus side projects like the hotel chatbot and *JobScoutAI*.',
};

export const finale = {
  label: 'Final Chapter',
  title: 'Final Chapter',
  vol: 'ORIGIN',
  continued: 'To be continued…',
  next: 'Next page: *hire*, collaborate, or keep reading Recruiter Mode.',
  pitch:
    'Still studying at GCIT. Open to internships and early roles in *AI development*, *Data Science*, and security-minded software — details in Recruiter Mode.',
  dawnAlt: 'Dawn light over a mountain horizon — Training Arc sunrise reused for the Final Chapter',
  inesAlt: 'Denyel from the Power Sheet — hoodie, electric-blue headphones, facing the horizon',
  colophon: {
    label: 'Colophon',
    title: 'DENYEL — ORIGIN',
    credits: 'Written for Denyel · First edition, 2026 · Bhutan · Growth continues beyond this volume',
    again: 'Read it again from page one',
  },
  // Only verified http(s)/mailto rows render in Finale.astro
  contacts: [
    { icon: 'linkedin', label: 'LinkedIn', value: 'denyelcnamgyal', href: person.links.linkedin },
    { icon: 'github', label: 'GitHub', value: 'denyelcnamgyal42-hash', href: person.links.github },
    { icon: 'mail', label: 'Email', value: 'denyelcnamgyal42@gmail.com', href: person.links.email },
  ] as { icon: IconName; label: string; value: string; href: string; download?: boolean }[],
};

export { recruiter } from './recruiter-content';

