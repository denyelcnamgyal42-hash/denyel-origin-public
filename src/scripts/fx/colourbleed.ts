// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The page change between the story (ink) and recruiter mode (colour). A link with data-bleed="colour"
// or "ink" floods the screen from the click point, then navigates; the next page starts under the same
// wash and lets it dry away. The kind of wash travels in sessionStorage.
import '../../styles/bleed.css';
import { prefersReducedMotion } from '../core/env';

type Kind = 'colour' | 'ink';
const KEY = 'vol01-bleed';
const SVG = 'http://www.w3.org/2000/svg';

// the frayed edge: turbulence pushes the circle's border around, like water soaking paper
function edgeFilter() {
  if (document.getElementById('bleed-edge')) return;
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  svg.innerHTML = `<filter id="bleed-edge" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="7" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="90" xChannelSelector="R" yChannelSelector="G"/></filter>`;
  document.body.append(svg);
}

function wash(kind: Kind, x: string, y: string) {
  edgeFilter();
  const el = document.createElement('div');
  el.className = `bleed bleed--${kind}`;
  el.setAttribute('aria-hidden', 'true');
  el.style.setProperty('--x', x);
  el.style.setProperty('--y', y);
  el.innerHTML = '<div class="bleed__wash"></div>';
  document.body.append(el);
  return el;
}

const remember = (kind: Kind) => { try { sessionStorage.setItem(KEY, kind); } catch { /* private mode: no wash on arrival */ } };
function recall(): Kind | null {
  try {
    const kind = sessionStorage.getItem(KEY) as Kind | null;
    sessionStorage.removeItem(KEY);
    return kind;
  } catch { return null; }
}

function go(link: HTMLAnchorElement, event: MouseEvent) {
  const kind = (link.dataset.bleed as Kind) || 'colour';
  remember(kind);
  if (prefersReducedMotion()) return; // a plain navigation
  event.preventDefault();
  const el = wash(kind, `${event.clientX}px`, `${event.clientY}px`);
  el.getBoundingClientRect(); // commit the closed circle before opening it
  el.classList.add('is-on');
  el.firstElementChild!.addEventListener('transitionend', () => location.assign(link.href), { once: true });
}

// links that change mode: the wash on click, and the next page fetched as soon as the pointer comes near
export function initBleed() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-bleed]').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // new tab: no wash
      go(link, e);
    });
    link.addEventListener('pointerenter', () => {
      if (document.querySelector(`link[rel="prefetch"][href="${link.href}"]`)) return;
      document.head.append(Object.assign(document.createElement('link'), { rel: 'prefetch', href: link.href }));
    }, { once: true });
  });
}

// on arrival: if the previous page left with a wash, start under it and let it dry
export function settleBleed() {
  const kind = recall();
  if (!kind || prefersReducedMotion()) return;
  const el = wash(kind, '50%', '50%');
  el.classList.add('is-full');
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-drying')));
  el.addEventListener('transitionend', () => el.remove(), { once: true });
}
