// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The cat hunt: three kittens hide faint in the margins of the page (components/recruiter/Kitten.astro). Each one
// fades in as the mouse comes near; a press catches it: it hops away with hearts and appears on the hero's sticker
// sheet, and the campus cat cheers (mascot.ts listens to "cat-found"). Remembered in this browser only.
import { stampAt } from './stamps';
import { prefersReducedMotion } from '../core/env';

const KEY = 'ines-cats';
const FAINT = 0.14; // a kitten far from the mouse
const REACH = 240; // px: how close the mouse must come for a kitten to show itself

const read = (): string[] => {
  try {
    const ids: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : [];
  } catch { return []; }
};
const save = (ids: string[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* private window: the hunt just isn't remembered */ }
};

export function initHunt() {
  const kittens = [...document.querySelectorAll<HTMLButtonElement>('[data-kitten]')];
  const sheet = document.querySelector<HTMLElement>('[data-hunt]');
  if (!kittens.length || !sheet) return;
  const count = sheet.querySelector<HTMLElement>('[data-hunt-count]')!;
  let found = read().filter((id) => kittens.some((k) => k.dataset.kitten === id));

  const show = () => {
    count.textContent = String(found.length);
    sheet.querySelectorAll<HTMLElement>('[data-got]').forEach((img) => img.classList.toggle('is-got', found.includes(img.dataset.got!)));
  };
  kittens.forEach((k) => (k.hidden = found.includes(k.dataset.kitten!)));
  show();

  // the closer the mouse, the more a kitten shows itself
  if (matchMedia('(hover: hover)').matches) {
    let x = -1e4, y = -1e4, frame = 0;
    const near = () => {
      frame = 0;
      kittens.forEach((k) => {
        if (k.hidden) return;
        const b = k.getBoundingClientRect();
        const d = Math.hypot(x - (b.left + b.width / 2), y - (b.top + b.height / 2));
        k.style.opacity = String(Math.min(1, Math.max(FAINT, 1.2 - d / REACH)));
      });
    };
    addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; frame ||= requestAnimationFrame(near); }, { passive: true });
  }

  kittens.forEach((k) => k.addEventListener('click', () => {
    const b = k.getBoundingClientRect();
    for (let i = 0; i < 3; i++) setTimeout(() => stampAt(b.left + (b.width * (i + 1)) / 4, b.top - 4 - (i % 2) * 16, 'heart'), i * 120);
    if (prefersReducedMotion()) k.hidden = true;
    else {
      k.classList.add('is-caught');
      k.addEventListener('animationend', () => (k.hidden = true), { once: true });
    }
    found = [...found, k.dataset.kitten!];
    save(found);
    show();
    document.dispatchEvent(new CustomEvent('cat-found', { detail: { found: found.length, total: kittens.length } }));
  }, { once: true }));
}
