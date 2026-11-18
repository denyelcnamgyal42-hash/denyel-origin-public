// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Custom cursor + mouse parallax. Any element with data-depth="n" drifts n px with the mouse.
import { gsap } from 'gsap';

export function initCursor() {
  const el = document.querySelector<HTMLElement>('.cursor');
  if (!el) return;
  const x = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
  const y = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });
  addEventListener('pointermove', (e) => { x(e.clientX); y(e.clientY); });
  for (const a of document.querySelectorAll('a, button')) {
    a.addEventListener('pointerenter', () => el.classList.add('is-big'));
    a.addEventListener('pointerleave', () => el.classList.remove('is-big'));
  }
}

export function initParallax() {
  const movers = [...document.querySelectorAll<HTMLElement>('[data-depth]')].map((el) => ({
    depth: Number(el.dataset.depth),
    x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }),
    y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' }),
  }));
  addEventListener('pointermove', (e) => {
    const nx = e.clientX / innerWidth - 0.5;
    const ny = e.clientY / innerHeight - 0.5;
    for (const m of movers) { m.x(nx * m.depth); m.y(ny * m.depth); }
  });
}
