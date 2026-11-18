// DENYEL — ORIGIN · Chapter 2 credential cards land in; click opens accessible proof dialog.
// Replaces the old placeholder scroll-unroll + wax-seal crack (scroll.png / seal.png).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parts, scene } from '../core/dom';
import { placeOver } from '../audio/places';
import { stamp } from '../audio/sound';
import { prefersReducedMotion } from '../core/env';

export function initCerts() {
  const el = scene('certs');
  if (!el) return;

  initStoryCredDialogs(el);

  const motion = !prefersReducedMotion();
  if (!motion) return;

  const scrolls = parts(el, 'scroll');
  gsap.set(scrolls, { autoAlpha: 0, y: 36, scale: 0.96 });
  placeOver(el, 'study', 'top 60%', 'bottom 40%');

  gsap.from(el.querySelector('.certs__title'), {
    autoAlpha: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 55%', once: true },
  });

  ScrollTrigger.batch(scrolls, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      batch.forEach((card, j) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          delay: j * 0.12,
          ease: 'power3.out',
          onStart: j === 0 ? stamp : undefined,
        });
      }),
  });
}

function initStoryCredDialogs(root: HTMLElement) {
  const openers = [...root.querySelectorAll<HTMLElement>('[data-story-cred-open]')];
  if (!openers.length) return;

  let lastOpener: HTMLElement | null = null;

  const open = (id: string, opener: HTMLElement) => {
    const dialog = document.getElementById(`story-cred-${id}`) as HTMLDialogElement | null;
    if (!dialog || typeof dialog.showModal !== 'function') return;
    lastOpener = opener;
    dialog.showModal();
    const title = dialog.querySelector<HTMLElement>('.story-cred__title');
    (title ?? dialog.querySelector<HTMLElement>('[data-story-cred-close]'))?.focus();
  };

  const close = (dialog: HTMLDialogElement) => {
    if (dialog.open) dialog.close();
  };

  openers.forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-story-cred-open');
      if (id) open(id, el);
    });
  });

  root.querySelectorAll<HTMLDialogElement>('dialog[data-story-cred]').forEach((dialog) => {
    dialog.querySelectorAll<HTMLButtonElement>('[data-story-cred-close]').forEach((btn) => {
      btn.addEventListener('click', () => close(dialog));
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) close(dialog);
    });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      close(dialog);
    });

    dialog.addEventListener('close', () => {
      lastOpener?.focus();
      lastOpener = null;
    });
  });
}
