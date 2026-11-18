// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The loader: counts real image loading, then lets the visitor enter with or without sound.
import { gsap } from 'gsap';
import { part } from '../core/dom';
import { whoosh } from '../audio/sound';

export function initGate(onEnter: (withSound: boolean) => void) {
  const gate = document.querySelector<HTMLElement>('[data-gate]')!;
  const count = part(gate, 'count');
  const bar = part(gate, 'bar');
  const choices = part(gate, 'choices');

  // only eager images are needed to start; later chapters load while you read
  const imgs = [...document.images].filter((i) => i.loading !== 'lazy');
  let loaded = imgs.filter((i) => i.complete).length;
  for (const img of imgs) {
    if (img.complete) continue;
    const done = () => loaded++;
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  }

  let shown = 0;
  const target = () => Math.round((loaded / Math.max(imgs.length, 1)) * 100);
  const tick = () => {
    shown = Math.min(shown + (target() - shown) * 0.12 + 0.3, target());
    count.textContent = String(Math.floor(shown));
    bar.style.width = `${shown}%`;
    if (shown < 100) return requestAnimationFrame(tick);
    gsap.set(choices, { visibility: 'visible' });
    gsap.from(choices.children, { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.6, ease: 'power3.out' });
  };
  tick();

  for (const btn of gate.querySelectorAll<HTMLButtonElement>('[data-enter]')) {
    btn.addEventListener('click', () => {
      onEnter(btn.dataset.enter === 'sound');
      whoosh(1.2);
      document.body.classList.remove('is-locked');
      gsap.to(gate, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power4.inOut', onComplete: () => gate.remove() });
    });
  }
}
