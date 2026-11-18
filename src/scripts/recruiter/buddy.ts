// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// A mini Ines walks beside the mouse over the experience missions (the mouse itself stays visible):
// laptop in hand, pointing at a link, thumbs up over her photos. Mouse devices only.
import { hasFinePointer } from '../core/env';

export function initBuddy() {
  const zone = document.querySelector<HTMLElement>('[data-buddy-zone]');
  const buddy = zone?.querySelector<HTMLElement>('[data-buddy]');
  if (!zone || !buddy || !hasFinePointer()) return;

  zone.addEventListener('pointermove', (e) => {
    const target = e.target as Element;
    const onFile = target.closest('[data-mission]');
    buddy.classList.toggle('is-on', !!onFile);
    if (!onFile) return;
    buddy.dataset.pose = target.closest('[data-thumb]') ? 'thumb' : target.closest('a, button') ? 'point' : 'laptop';
    buddy.style.translate = `${e.clientX + 18}px ${e.clientY + 10}px`;
  });
  zone.addEventListener('pointerleave', () => buddy.classList.remove('is-on'));
}
