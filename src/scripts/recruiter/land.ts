// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Things marked data-land land on the page (CSS) the first time they come into view. The page only
// hides them once this script runs (html.can-land), so without it everything is simply there.
// A link to one that has not landed yet (or into one: a card in a folder stack) puts it in place at once, so the jump stops at the right height.
import { prefersReducedMotion } from '../core/env';

export function initLand() {
  const items = document.querySelectorAll<HTMLElement>('[data-land]');
  if (!items.length || prefersReducedMotion()) return;
  document.documentElement.classList.add('can-land');
  const watch = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    watch.unobserve(e.target);
  }), { rootMargin: '0px 0px -12% 0px' });
  items.forEach((el) => watch.observe(el));

  const reveal = (el: HTMLElement) => {
    el.style.transition = 'none';
    el.classList.add('is-in');
    void el.offsetHeight; // settle in place before the browser measures the jump
    el.style.transition = '';
    watch.unobserve(el);
  };

  document.addEventListener('click', (e) => {
    const hash = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')?.hash;
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    // Section anchors live on wrappers; land markers are often descendants (folder stacks, cards).
    const pending = [
      ...(target.matches('[data-land]:not(.is-in)') ? [target] : []),
      ...target.querySelectorAll<HTMLElement>('[data-land]:not(.is-in)'),
    ];
    const self = target.closest<HTMLElement>('[data-land]:not(.is-in)');
    if (self) pending.unshift(self);
    pending.forEach(reveal);
  });
}
