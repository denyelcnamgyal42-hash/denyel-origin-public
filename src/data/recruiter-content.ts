// DENYEL — ORIGIN · Recruiter Mode content (verified facts only)
import { recruiterTrainingItems } from './training';

type IconName = 'linkedin' | 'github' | 'mail' | 'cv' | 'play' | 'web' | 'whatsapp' | 'copy';

const links = {
  email: 'mailto:denyelcnamgyal42@gmail.com',
  github: 'https://github.com/denyelcnamgyal42-hash',
  linkedin: 'https://www.linkedin.com/in/denyelcnamgyal',
} as const;

export type TrainingItem = {
  slug: string;
  title: string;
  org: string;
  date?: string;
  href?: string;
  seal?: string;
  kind: 'Course' | 'Training' | 'Participation' | 'Badge';
  category: string;
  alt: string;
  preview: string;
  description: string;
};

export type AchievementItem = {
  title: string;
  context: string;
  when?: string;
  href?: string;
};

export const recruiter = {
  meta: {
    title: 'Denyel Chokey Namgyal — AI & Data Science Developer · DENYEL ORIGIN',
    description:
      'Professional portfolio for Denyel Chokey Namgyal: Computer Science at GCIT (Royal University of Bhutan), AI & Data Science, Jaggle.ai internship, featured projects, and contact.',
    image: '/og/recruiter.jpg',
    imageAlt: 'DENYEL — ORIGIN recruiter mode share card.',
  },
  logo: 'Denyel',
  back: 'Story',
  backLabel: 'Back to the story (manga mode)',
  cv: {
    label: 'CV',
    files: [{ label: 'PDF', href: '/cv/Denyel_CV.pdf' }] as { label: string; href: string }[],
  },
  menu: 'Menu',
  sections: [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    // training / achievements / leadership appear in nav only when items exist (see RecruiterBar)
    { id: 'training', label: 'Training' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    hello: 'Denyel Chokey Namgyal',
    identity: 'AI & Data Science Developer',
    role: 'Computer Science student · Gyalpozhing College of Information Technology, Royal University of Bhutan',
    statement:
      'I build *practical AI systems* — language tools, vision pipelines, conversational products, and backends — with a parallel interest in *software engineering* and *cybersecurity*.',
    intro: 'Year 4 at GCIT, Bhutan · expected graduation June 2027 · open to graduate recruitment.',
    open: {
      kicker: 'open to',
      text: 'Graduate recruitment & early-career AI / software roles',
      sub: 'After June 2027 · Bhutan · remote-friendly conversations welcome',
    },
    portraitAlt: 'Denyel — ORIGIN character illustration from the Power Sheet (hoodie, electric-blue headphones)',
    focus: ['AI development', 'Data Science', 'Backend APIs', 'Cybersecurity'],
    ask: 'Quick links',
  },
  sheet: {
    title: 'Focus',
    tag: 'at a glance',
    hint: '',
    reset: 'Reset',
    stickers: [] as { note: string; alt: string; href?: string }[],
  },
  prints: { me: 'that’s me', next: 'next photo', enlarge: 'See it bigger', close: 'Close', coming: 'Visual pending' },
  experience: {
    kicker: '02',
    title: 'Experience',
    aside: 'Applied AI internship',
    manga: 'See it in manga mode',
    workflow: 'View workflow',
    labels: { project: 'Focus', team: 'Team', stack: 'Stack' },
    newTab: '(opens in a new tab)',
    jobs: [
      {
        id: 'jaggle',
        company: 'Jaggle.ai',
        role: 'AI Developer Intern',
        kind: 'Internship',
        when: 'November 2025 – January 2026',
        where: 'On-site · Thimphu',
        project: 'Conversational hotel-booking assistant prototype (LangChain → structured records)',
        summary:
          'Built a *LangChain* hotel-booking prototype that turned conversations into *structured booking records* — distinct from the separate WhatsApp chatbot under Projects.',
        team: undefined as string | undefined,
        caption: '',
        photos: [] as { id: string; caption: string; alt: string; me?: [number, number]; fit?: 'contain'; focus?: string }[],
        stack: ['Conversational AI', 'LangChain', 'Structured records', 'Python'],
        points: [
          'Independently developed a *conversational hotel-booking assistant* that collected booking requirements and wrote structured records (dates, preferences, hotel type) for follow-up.',
          'Built and tested the workflow with *LangChain*, connecting natural-language conversation to *structured spreadsheet records* to cut repetitive manual updates.',
          'Presented the *internship prototype* and research ideas to the company team — distinct from the separately developed *WhatsApp Cloud API* hotel chatbot listed under Projects.',
        ],
        links: [{ label: 'jaggle.ai', icon: 'web' as IconName, href: 'https://jaggle.ai' }],
      },
    ],
  },
  projects: {
    kicker: '03',
    title: 'Featured projects',
    aside: 'Open a card for the full case study',
    more: 'Details',
    viewCase: 'View case study',
    closeCase: 'Close case study',
    labels: {
      problem: 'Problem',
      solution: 'Solution',
      architecture: 'Architecture',
      contribution: 'My contribution',
      challenges: 'Key engineering challenges',
      results: 'Verified outcomes',
      stack: 'Technology stack',
      overview: 'Overview',
      visuals: 'Project visuals',
    },
    smallTitle: 'Additional projects',
    featured: [
      {
        id: 'dzonglish',
        kind: 'NLP · Language technology',
        name: 'Dzonglish NLP',
        line: 'Token-level language ID for code-mixed Romanized Dzongkha–English text.',
        tags: ['Python', 'XLM-R', 'CRF'],
        problem:
          'Everyday *Dzonglish* mixes Romanized Dzongkha with English. Downstream NLP needs reliable *language identification* before spelling normalization can help.',
        solution:
          'A Python NLP pipeline that collects and cleans code-mixed messages, annotates tokens, and evaluates word-level language ID models. *Romanized Dzongkha spelling normalization remains in progress* — not claimed as finished.',
        architecture: [
          'Collect messages',
          'Clean / tokenize',
          'Annotate language tags',
          'Language ID models',
          'Normalization (ongoing)',
        ],
        contribution: [
          'Led collection and processing of *2,556* code-mixed messages from consenting participants (*14,000+* tokens for annotation).',
          'Implemented and compared *Character TF-IDF + Linear SVM*, *CRF*, and *XLM-R* for word-level language identification.',
          'Scoped further work to Romanized Dzongkha *normalization* without treating it as complete.',
        ],
        challenges: [
          'Scarce labeled Dzonglish data and inconsistent Romanization.',
          'Keeping evaluation honest when language boundaries are fuzzy.',
        ],
        results: [
          'Completed: collection, cleaning, annotation, and comparative language-ID evaluation.',
          'Ongoing: Romanized Dzongkha spelling normalization.',
        ],
        team: 'Project lead',
        stack: ['Python', 'XLM-R', 'CRF', 'SVM', 'NLP'],
        shots: [] as { id: string; alt: string; caption: string }[],
        links: [] as { label: string; icon: IconName; href: string }[],
      },
      {
        id: 'attendance',
        kind: 'Computer vision · Systems',
        name: 'Smart Attendance System',
        line: 'Live-camera attendance with YOLO detection and timed session states.',
        tags: ['YOLO', 'Flask', 'SQLite'],
        problem:
          'Manual attendance is slow and error-prone. A classroom system needs *detect → recognize → record* with reviewable thresholds.',
        solution:
          'An automated attendance service combining YOLO-based detection with DeepFace/FaceNet recognition through a *Flask* app, plus time-based Present / In Progress / Left Early / Absent logic.',
        architecture: [
          'Live camera feed',
          'YOLO detect',
          'DeepFace / FaceNet recognize',
          'Session timing rules',
          'Flask app + SQL roster',
        ],
        contribution: [
          'Built the vision pipeline and Flask attendance application as project lead.',
          'Trained/evaluated detection over *50* epochs (CV materials cite ~*0.82* precision, *0.61* recall, *0.70* mAP50).',
          'Implemented session timing that classifies presence states during a class period.',
        ],
        challenges: [
          'Lighting, pose, and partial faces under real classroom conditions.',
          'Treating high similarity as a review signal, not automatic identity proof.',
        ],
        results: [
          'Working end-to-end classroom prototype with live detection and timed attendance states.',
          'Roster storage implemented with *SQLite* in the project materials reviewed for this portfolio.',
        ],
        team: 'Project lead',
        stack: ['Python', 'YOLO', 'DeepFace', 'FaceNet', 'OpenCV', 'Flask', 'SQLite'],
        shots: [] as { id: string; alt: string; caption: string }[],
        links: [] as { label: string; icon: IconName; href: string }[],
      },
      {
        id: 'hotelbot',
        kind: 'Conversational AI · Product',
        name: 'AI Hotel Booking Chatbot',
        line: 'WhatsApp booking assistant with Sheets-backed staff approval.',
        tags: ['WhatsApp API', 'Flask', 'Google Sheets'],
        problem:
          'Guests expect booking help on messaging apps. Hotels need requests captured without a heavy custom guest app.',
        solution:
          'A conversational assistant on the *WhatsApp Cloud API* with a *Flask* backend and booking records in *Google Sheets* for employee approval — *separate* from the Jaggle.ai internship Excel/LangChain prototype.',
        architecture: [
          'WhatsApp Cloud API',
          'Conversational flow',
          'Flask backend',
          'Availability / booking intent',
          'Google Sheets ledger',
          'Staff approval',
        ],
        contribution: [
          'Built guest-facing chat flows and WhatsApp Cloud API integration.',
          'Connected booking requests to a Sheets-backed staff review path.',
        ],
        challenges: [
          'Multi-step booking state across incomplete guest messages.',
          'Keeping the ops sheet readable while the bot stays responsive.',
        ],
        results: ['Operational prototype for WhatsApp booking capture and staff follow-up.'],
        team: '—',
        stack: ['WhatsApp Cloud API', 'Conversational AI', 'Flask', 'Google Sheets'],
        shots: [] as { id: string; alt: string; caption: string }[],
        links: [] as { label: string; icon: IconName; href: string }[],
      },
      {
        id: 'jobscout',
        kind: 'Backend · Matching',
        name: 'JobScoutAI',
        line: 'Job collection, deduplication, and skill-based matching API.',
        tags: ['FastAPI', 'PostgreSQL', 'Python'],
        problem:
          'Job listings scatter across sources with duplicates. Candidates need matches grounded in *skills*, not keyword noise alone.',
        solution:
          'A *FastAPI* + *PostgreSQL* service that collects jobs, deduplicates near-identical listings, and produces skill-based recommendations.',
        architecture: ['Job sources', 'Collect', 'Deduplicate', 'PostgreSQL store', 'Skill match', 'FastAPI API'],
        contribution: [
          'Implemented backend collection, deduplication, and matching logic.',
          'Structured the API around stored roles and skill profiles.',
        ],
        challenges: [
          'Near-duplicate listings and inconsistent job descriptions.',
          'Keeping match logic interpretable rather than a black-box score.',
        ],
        results: ['Public repository available for review.'],
        team: '—',
        stack: ['FastAPI', 'PostgreSQL', 'Python', 'Skill matching'],
        shots: [] as { id: string; alt: string; caption: string }[],
        links: [
          {
            label: 'GitHub',
            icon: 'github' as IconName,
            href: 'https://github.com/denyelcnamgyal42-hash/JobScout-AI',
          },
        ],
      },
    ],
    small: [
      {
        id: 'eduguide',
        kind: 'AI · RAG · Education',
        name: 'EduGuide Bhutan',
        line: 'AI-powered exam-intelligence platform for BHSEC Class 11–12 Physics and English past papers.',
        points: [
          'Contributed as *AI and RAG Engineer / Project Lead* (March–June 2026) on a platform for Bhutanese students.',
          'Designed a *RAG* pipeline for loading, embedding, and retrieving past-paper content so answers stay grounded in curriculum materials.',
          'Integrated document ingestion and vector retrieval with a *FastAPI* backend; initial milestone processed *44 pages*. Mock-question generation, marking-style feedback, and conversational guidance remain *planned*, not claimed as shipped.',
        ],
        stack: ['Next.js', 'FastAPI', 'PostgreSQL', 'Chroma / FAISS', 'LLMs'],
        links: [] as { label: string; href: string }[],
      },
      {
        id: 'ehealth',
        kind: 'Backend · DevSecOps',
        name: 'E-Health Book Management System',
        line: 'Electronic health-book backend with security hardening and OWASP ZAP testing.',
        points: [
          'Contributed as *Backend Developer* (March–June 2024) on a *Node.js / Express / MongoDB* health-book system.',
          'Implemented defensive controls: *Helmet* headers, parameter-pollution protection, rate limiting, restricted CORS, and secure authentication practices.',
          'Applied *DevSecOps* practices and automated vulnerability testing with *OWASP ZAP*, reviewing medium and informational findings.',
        ],
        stack: ['Node.js', 'Express.js', 'MongoDB', 'OWASP ZAP', 'DevSecOps'],
        links: [] as { label: string; href: string }[],
      },
      {
        id: 'password-hash',
        kind: 'Security research',
        name: 'Password Hashing and Cracking Analysis',
        line: 'Controlled study of password construction versus hashing cost and cracking resistance.',
        points: [
          'Built a *1,000-password* dataset across weak, medium, strong, passphrase, and random categories (July–August 2026).',
          'Benchmarking *MD5*, *SHA-256*, *bcrypt*, and *Argon2id* to compare computational cost of modern password hashing versus fast general-purpose hashes.',
          'Ran controlled *John the Ripper* / RockYou experiments; about *85.86%* of weak passwords cracked while strong passwords and passphrases resisted far better.',
        ],
        stack: ['Python', 'Kali Linux', 'John the Ripper', 'bcrypt', 'Argon2id'],
        links: [] as { label: string; href: string }[],
      },
    ],
    tiny: [] as { name: string; line: string; href: string }[],
  },
  skills: {
    kicker: '04',
    title: 'Technical skills',
    aside: 'Toolbox',
    laptopAlt: '',
    star: 'signature focus',
    usedIn: 'used in',
    hint: '',
    rename: {
      'AI / ML': 'AI / Machine Learning / Deep Learning',
      'NLP / CV': 'NLP / Computer Vision',
      Backend: 'Backend / APIs / Databases',
      Tools: 'Development tools',
      Security: 'Cybersecurity foundations',
      Spoken: 'Languages',
    } as Record<string, string>,
    proves: {
      NLP: ['NLP', 'Python'],
      YOLO: ['Computer Vision', 'YOLO', 'Python'],
      FaceNet: ['Computer Vision', 'FaceNet', 'Python'],
      OpenCV: ['Computer Vision', 'OpenCV', 'Python'],
      Flask: ['Flask', 'APIs', 'Python', 'Backend development'],
      SQLite: ['SQLite', 'SQL'],
      FastAPI: ['FastAPI', 'APIs', 'Python', 'Backend development'],
      PostgreSQL: ['PostgreSQL', 'SQL'],
      'WhatsApp Cloud API': ['WhatsApp Cloud API', 'Chatbots', 'APIs'],
      'Google Sheets': ['Google Sheets', 'APIs'],
      'Conversational AI': ['Chatbots', 'LangChain', 'APIs'],
      LangChain: ['LangChain', 'Chatbots', 'Python'],
      'Applied AI': ['Machine Learning', 'Chatbots', 'LangChain'],
      'Skill matching': ['Machine Learning', 'Python'],
      'Cybersecurity foundations': ['Cybersecurity foundations', 'Secure design mindset'],
    } as Record<string, string[]>,
  },
  education: {
    kicker: '05',
    title: 'Education',
    aside: 'GCIT · Royal University of Bhutan',
    schools: [
      {
        id: 'gcit',
        short: 'GCIT',
        degree: 'Bachelor of Computer Science',
        track: 'AI and Data Science',
        school: 'Gyalpozhing College of Information Technology (GCIT), Royal University of Bhutan',
        when: 'August 2023 – June 2027 (expected)',
        where: 'Bhutan',
        caption: '',
        points: [
          'Currently in *Year 4* of undergraduate *Computer Science* with an *AI and Data Science* focus; expected graduation *June 2027*.',
          'Coursework includes AI/ML, advanced deep learning, NLP, endpoint security, and networking.',
          '*Year IV Class Representative* (Cyberbridging class) from August 2026 — see Leadership.',
        ],
        link: { label: 'See featured projects', href: '#projects' },
        photos: [] as { id: string; caption: string; alt: string }[],
      },
    ],
    before: {
      label: 'Earlier schooling',
      text: 'Pure Science (Mathematics), Baylling Higher Secondary School · 2021–2022.',
    },
    about: {
      title: 'About',
      body: 'Computer Science student from Bhutan building usable AI systems — language tools, vision pipelines, conversational products, and backends — with clear architecture and honest evaluation.',
    },
  },
  training: {
    kicker: '06',
    title: 'Certifications & training',
    aside: 'Five verified credentials',
    note: 'Select a credential to view the certificate. Original files open from each card.',
    view: 'View credential',
    close: 'Close credential',
    original: 'View original',
    empty: 'No verified certifications or training credentials are listed yet.',
    items: recruiterTrainingItems as TrainingItem[],
  },
  achievements: {
    kicker: '07',
    title: 'Achievements',
    aside: 'Nominations & awards',
    empty: 'No verified competition results or awards are listed yet.',
    items: [
      {
        title: 'Third Place — Inter-Collegiate Programming Contest',
        context:
          'Team placement at the College of Science and Technology (Second Runner-Up / Third Place). Solved algorithmic and programming challenges under timed, offline conditions.',
        when: 'April 20, 2026',
      },
      {
        title: 'Global Young Scientists Summit — college nominee',
        context:
          'Nominated by a tutor as a GCIT candidate for GYSS; prepared a research-focused application on privacy-preserving healthcare technologies for low-resource settings.',
        when: 'August 2026',
      },
    ] as AchievementItem[],
  },
  leadership: {
    kicker: '08',
    title: 'Leadership & interests',
    aside: 'Class · teamwork · beyond campus',
    features: [
      {
        id: 'class-rep',
        kind: 'Leadership',
        title: 'Year IV Class Representative',
        where: 'GCIT · Cyberbridging class',
        when: 'August 2026 – Present',
        line:
          'Represents *15* classmates — coordinating academic updates with lecturers, sharing information clearly, and raising student concerns with care.',
        focus: ['Communication', 'Responsibility', 'Coordination'],
      },
      {
        id: 'football',
        kind: 'Teamwork',
        title: 'Football & teamwork',
        where: 'GCIT · Baylling HSS',
        when: '2019 – Present',
        line:
          'GCIT college player and former Baylling HSS *vice-captain* — competitive football that built teamwork, discipline, and consistency alongside studies.',
        focus: ['Teamwork', 'Discipline', 'Consistency'],
      },
    ],
    outside: {
      label: 'Outside the code',
      items: ['Football', 'Anime', 'Travel'],
    },
    /** Legacy list kept empty so older consumers stay silent */
    items: [] as { kind: string; title: string; when?: string; line: string }[],
  },
  community: {
    kicker: '06',
    title: 'Interests',
    aside: '',
    bandAlt: '',
    groups: [] as {
      id: string;
      short: string;
      sticker: string;
      caption: string;
      name: string;
      role: string;
      when: string;
      where: string;
      points: string[];
      photos: { src: string; caption: string; alt: string; me?: [number, number]; focus?: string }[];
      link?: { label: string; href: string };
    }[],
  },
  contact: {
    kicker: '09',
    title: 'Contact',
    aside: 'Let’s work together',
    kittenAlt: '',
    hello: 'Get in touch',
    open: 'Year 4 at GCIT (expected *June 2027*). Open to *graduate recruitment* and early-career roles in AI development, Data Science, software engineering, and security-minded work.',
    where: 'Based in Thimphu, Bhutan · opportunities beginning after graduation · remote-friendly conversations welcome',
    email: {
      label: 'Email',
      value: 'denyelcnamgyal42@gmail.com',
      href: links.email,
      copy: 'Copy',
      copyLabel: 'Copy email address denyelcnamgyal42@gmail.com',
      copied: 'Copied!',
    },
    links: [
      { icon: 'linkedin' as IconName, label: 'LinkedIn', value: 'denyelcnamgyal', href: links.linkedin },
      { icon: 'github' as IconName, label: 'GitHub', value: 'denyelcnamgyal42-hash', href: links.github },
    ],
    cv: 'Curriculum vitae',
    pending: 'CV PDF is available from the hero and contact actions when published.',
    newTab: '(opens in a new tab)',
    back: 'Back to the story',
    sign: 'Denyel Chokey Namgyal · DENYEL — ORIGIN · 2026',
  },
  hunt: {
    title: 'sticker hunt',
    catch: 'A hidden sticker: catch it',
    kittens: [] as { id: 'wave' | 'nap' | 'jump'; alt: string }[],
    found: 'Sticker {n} of {total} found!',
    done: 'All found — say hi below',
  },
  mascot: {
    name: 'ORIGIN guide',
    greet: { morning: 'Good morning!', afternoon: 'Good afternoon!', evening: 'Good evening!' },
    hello: 'Ask me about Denyel',
    back: 'Back',
    close: 'Close',
    pet: 'Pet',
    nap: 'Nap',
    go: 'Show me',
    sign: 'Scripted answers — written for this portfolio',
    notes: [
      { topic: 'where I worked', ask: 'work', color: 'mustard' },
      { topic: 'what I’ve built', ask: 'built', color: 'peri' },
      { topic: 'what I’m learning', ask: 'life', color: 'lilac' },
      { topic: 'how to reach me', ask: 'reach', color: 'rose' },
    ],
    qa: [
      {
        id: 'work',
        q: 'Where has Denyel worked?',
        go: 'experience',
        a: [
          '*AI Developer Intern* at *Jaggle.ai* (November 2025 – January 2026) — LangChain conversational hotel-booking prototype with structured records.',
        ],
      },
      {
        id: 'built',
        q: 'What has Denyel built?',
        go: 'projects',
        a: [
          '*Dzonglish NLP*, *Smart Attendance*, a *WhatsApp* hotel chatbot, *JobScoutAI*, plus additional builds like *EduGuide Bhutan* and security tooling.',
        ],
      },
      {
        id: 'life',
        q: 'What is Denyel learning?',
        go: 'education',
        a: [
          'Year 4 Bachelor of Computer Science at *GCIT* (expected graduation June 2027) — AI & Data Science, with cybersecurity coursework and TryHackMe / AWS / Cisco training.',
        ],
      },
      {
        id: 'reach',
        q: 'How can I reach Denyel?',
        go: 'contact',
        a: [
          'Email *denyelcnamgyal42@gmail.com*, LinkedIn, GitHub, or download the CV PDF from this page.',
        ],
      },
      {
        id: 'best',
        q: 'What is the focus?',
        go: 'skills',
        a: [
          'AI development and Data Science with practical builds — NLP, vision, conversational interfaces, and backend APIs — as a student engineer.',
        ],
      },
      {
        id: 'manga',
        q: 'Why a manga portfolio?',
        href: '/',
        a: [
          'The story mode makes the path through Origin → Training → Missions → Side Quests easier to feel.',
          'This recruiter mode keeps the facts clear for hiring managers.',
        ],
      },
    ] as { id: string; q: string; a: string[]; go?: string; href?: string }[],
  },
};
