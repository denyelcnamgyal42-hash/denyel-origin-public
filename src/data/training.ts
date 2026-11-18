// DENYEL — ORIGIN · shared credentials (Story Chapter 2 + Recruiter Mode)
// Source of truth aligned with certification-manifest.json + public/certifications/.

export type TrainingKind = 'Course' | 'Training' | 'Participation' | 'Badge';

export type TrainingEntry = {
  slug: string;
  title: string;
  by: string;
  kind: TrainingKind;
  /** Human-facing category from the credential itself */
  category: string;
  date: string;
  /** Short seal letters — fallback only when no preview */
  seal: string;
  alt: string;
  preview: string;
  original: string;
  /** Short professional description for the credential viewer */
  description: string;
};

/** Canonical verified list — keep in sync with certification-manifest.json */
export const trainingEntries: TrainingEntry[] = [
  {
    slug: 'tryhackme-cyber-security-101',
    title: 'Cyber Security 101',
    by: 'TryHackMe',
    kind: 'Course',
    category: 'Learning path completion',
    date: '23 April 2026',
    seal: 'TH',
    alt: 'TryHackMe Cyber Security 101 learning path completion certificate',
    preview: '/certifications/previews/tryhackme-cyber-security-101.webp',
    original: '/certifications/originals/tryhackme-cyber-security-101.pdf',
    description:
      'Completed TryHackMe’s Cyber Security 101 learning path, covering foundational cybersecurity concepts through guided labs and hands-on practice.',
  },
  {
    slug: 'tryhackme-hacker-holidays',
    title: 'Hacker Holidays',
    by: 'TryHackMe',
    kind: 'Participation',
    category: 'Participation certificate',
    date: '13 August 2026',
    seal: 'HH',
    alt: 'TryHackMe Hacker Holidays participation certificate',
    preview: '/certifications/previews/tryhackme-hacker-holidays.webp',
    original: '/certifications/originals/tryhackme-hacker-holidays.jpg',
    description:
      'Participated in TryHackMe’s Hacker Holidays program, engaging in cybersecurity challenges and practical security-learning activities.',
  },
  {
    slug: 'indo-bhutan-security-training',
    title: 'Indo–Bhutan Cyber Security Awareness Training Camp',
    by: 'ASD Academy',
    kind: 'Training',
    category: 'Training completion',
    date: '17 April 2026',
    seal: 'IB',
    alt: 'ASD Academy Indo–Bhutan Cyber Security Awareness Training Camp completion certificate',
    preview: '/certifications/previews/indo-bhutan-security-training.webp',
    original: '/certifications/originals/indo-bhutan-security-training.jpg',
    description:
      'Completed ASD Academy’s Indo–Bhutan Cyber Security Awareness Training Camp, a five-day program focused on security awareness and defensive practices.',
  },
  {
    slug: 'aws-cloud-foundations',
    title: 'Cloud Foundations',
    by: 'AWS Academy',
    kind: 'Badge',
    category: 'Course badge',
    date: 'October 2025',
    seal: 'AWS',
    alt: 'AWS Academy Cloud Foundations course badge',
    preview: '/certifications/previews/aws-cloud-foundations.webp',
    original: '/certifications/originals/aws-cloud-foundations-badge.png',
    description:
      'Completed the AWS Academy Cloud Foundations course and earned the course badge for introductory cloud concepts on AWS.',
  },
  {
    slug: 'cisco-introduction-to-cybersecurity',
    title: 'Introduction to Cybersecurity',
    by: 'Cisco Networking Academy',
    kind: 'Badge',
    category: 'Course badge',
    date: 'April 2025',
    seal: 'CI',
    alt: 'Cisco Networking Academy Introduction to Cybersecurity course badge',
    preview: '/certifications/previews/cisco-introduction-to-cybersecurity.webp',
    original: '/certifications/originals/cisco-introduction-to-cybersecurity-badge.png',
    description:
      'Completed Cisco Networking Academy’s Introduction to Cybersecurity course badge, covering core security concepts and common threat awareness.',
  },
];

/** Local credential asset paths under /certifications/ */
export const isCredentialHref = (href: string) =>
  href.startsWith('/certifications/') && !href.includes('..');

/** Manga Chapter 2 scroll shape */
export const storyCertifications = trainingEntries.map((e) => ({
  slug: e.slug,
  title: e.title,
  by: e.by,
  date: e.date,
  seal: e.seal,
  kind: e.kind,
  category: e.category,
  alt: e.alt,
  preview: e.preview,
  href: e.original,
  description: e.description,
}));

/** Recruiter Mode training gallery cards */
export const recruiterTrainingItems = trainingEntries.map((e) => ({
  slug: e.slug,
  title: e.title,
  org: e.by,
  kind: e.kind,
  category: e.category,
  seal: e.seal,
  date: e.date,
  alt: e.alt,
  preview: e.preview,
  href: e.original,
  description: e.description,
}));
