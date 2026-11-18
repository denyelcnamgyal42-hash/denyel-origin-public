// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Chapter 2: the ink opens on ISAMM, a comic-page montage of the training, then HOLD to power up.
// Sound: a breeze on arrival, a room at night with someone typing, dawn, then a held breath and the power-up boom.
import { gsap } from 'gsap';
import { caption, part, scene } from '../core/dom';
import { glideTo } from '../core/scroll';
import { placeIn } from '../audio/places';
import { whoosh } from '../audio/sound';
import { captionIn, captionOut, hide, impact, speedFlash, stampTitle, suspense } from '../fx/comic';
import { onHold } from '../fx/hold';
import { createInkWipe } from '../fx/inkwipe';
import { blow, liveFrame } from '../fx/living';

export function initTraining() {
  const el = scene('training');
  const p = (name: string) => part(el, name);
  const cap = (name: string) => caption(el, name);
  const pin = el.querySelector<HTMLElement>('.scene__pin')!;
  const stage = p('stage'), head = p('head'), speed = p('speed');
  const arrival = p('arrival'), cam = p('cam');
  const night = p('night'), workshop = p('workshop'), rack = p('rack'), sunrise = p('sunrise');
  const power = p('power'), lines = p('lines'), hero = p('hero'), calm = p('calm'), burst = p('burst');
  const glow = p('glow');
  const holdBtn = el.querySelector<HTMLElement>('[data-hold="train"]')!;
  const canvas = part<HTMLCanvasElement>(el, 'inkwipe');
  const wipe = createInkWipe(canvas);
  const ink = { p: 1 };
  wipe.set(1);

  hide(stage, canvas, burst, power, holdBtn, night, workshop, rack, sunrise);
  gsap.set(glow, { autoAlpha: 0 });
  gsap.set([calm, burst], { transformOrigin: '50% 88%' });

  // calm cloth barely breathes; burst takes the wind — both share one pose box for a locked crossfade
  liveFrame(calm);
  liveFrame(burst);
  hide(...['arrival', 'nights', 'network', 'sunrise', 'power'].map(cap));

  /** Hold climax only (not scrubbed): shake, line surge, blue glow, locked calm→burst crossfade */
  const powerUp = () => {
    power.classList.add('is-burst');
    return gsap
      .timeline()
      .to(hero, { keyframes: { x: [0, -8, 7, -5, 3, 0] }, duration: 0.42 }, 0)
      .to(lines, { scale: 1.42, duration: 0.28, ease: 'power2.out' }, 0)
      .to(lines, { scale: 1.12, duration: 0.4, ease: 'power2.inOut' }, 0.28)
      .to(speed, { opacity: 0.9, duration: 0.1, yoyo: true, repeat: 1 }, 0.18)
      .to(glow, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, 0.15)
      .to(calm, { autoAlpha: 0, scale: 0.985, duration: 0.42, ease: 'power2.out' }, 0.22)
      .fromTo(burst, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.42, ease: 'power2.out' }, 0.22);
  };

  stampTitle(el, head);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: el, start: 'top top', end: '+=780%', pin, scrub: 1 },
  });

  // the ink opens from the centre onto the school
  tl.set([stage, canvas], { autoAlpha: 1 }, 0.001)
    .to(head, { yPercent: -40, autoAlpha: 0, duration: 0.6, ease: 'power2.in' }, 0.25)
    .call(() => whoosh(0.6), [], 0.3)
    .to(ink, { p: 0, duration: 1.3, ease: 'power1.inOut', onUpdate: () => wipe.set(ink.p) }, 0.3)
    .fromTo(cam, { scale: 1.3 }, { scale: 1.05, duration: 1.3, ease: 'power2.out' }, 0.3)
    .to(cam, { scale: 1.5, transformOrigin: '75% 62%', duration: 1.4 }, 1.6);
  captionIn(tl, cap('arrival'), 1.2);
  captionOut(tl, cap('arrival'), 2.8);

  // montage: panels slam onto the page one after another
  speedFlash(tl, speed, 3);
  tl.to(arrival, { xPercent: -115, rotate: -4, duration: 0.5, ease: 'power2.in' }, 3)
    .fromTo(night, { autoAlpha: 0, yPercent: 130, rotate: -5 }, { autoAlpha: 1, yPercent: 0, rotate: -1, duration: 0.5, ease: 'power3.out' }, 3.1)
    .fromTo(workshop, { autoAlpha: 0, xPercent: 130, rotate: 6 }, { autoAlpha: 1, xPercent: 0, rotate: 1.5, duration: 0.5, ease: 'power3.out' }, 3.6)
    .fromTo(rack, { autoAlpha: 0, yPercent: 150, rotate: 8 }, { autoAlpha: 1, yPercent: 0, rotate: -2, duration: 0.5, ease: 'power3.out' }, 4.3)
    .fromTo(sunrise, { autoAlpha: 0, scale: 1.6, rotate: -6 }, { autoAlpha: 1, scale: 1, rotate: -1.5, duration: 0.5, ease: 'power3.in' }, 5.3);
  impact(tl, night, 3.5);
  impact(tl, workshop, 4);
  impact(tl, rack, 4.7);
  impact(tl, sunrise, 5.8);
  captionIn(tl, cap('nights'), 3.3);
  captionOut(tl, cap('nights'), 4.3);
  captionIn(tl, cap('network'), 4.5);
  captionOut(tl, cap('network'), 5.3);
  captionIn(tl, cap('sunrise'), 5.8);
  captionOut(tl, cap('sunrise'), 6.6);

  // everything flies off, the power-up stage appears
  speedFlash(tl, speed, 6.6);
  tl.to(night, { xPercent: -140, rotate: -10, duration: 0.6, ease: 'power2.in' }, 6.6)
    .to(workshop, { xPercent: 140, rotate: 10, duration: 0.6, ease: 'power2.in' }, 6.6)
    .to(rack, { yPercent: () => offScreenBelow(rack), rotate: 12, duration: 0.6, ease: 'power2.in' }, 6.6)
    .to(sunrise, { scale: 0.5, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 6.6)
    .set(power, { autoAlpha: 1 }, 6.8)
    .fromTo(lines, { autoAlpha: 0, scale: 1.55, rotate: -10 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'power3.out' }, 6.8)
    .fromTo(hero, { yPercent: 30, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }, 7)
    .to(lines, { rotate: 6, duration: 2.2 }, 7.6)
    .to(holdBtn, { autoAlpha: 1, duration: 0.2 }, 7.8)
    // scrub-safe scroll fallback: same locked crossfade + glow (HOLD plays the punchier version)
    .to(calm, { autoAlpha: 0, scale: 0.985, duration: 0.42 }, 8.8)
    .fromTo(burst, { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.42 }, 8.8)
    .to(glow, { autoAlpha: 0.85, duration: 0.35 }, 8.8)
    .to(lines, { scale: 1.12, duration: 0.35 }, 8.8)
    .to(holdBtn, { autoAlpha: 0, duration: 0.25 }, 8.8);
  captionIn(tl, cap('power'), 7.5);
  captionOut(tl, cap('power'), 8.8);

  placeIn(tl, 'breeze', 0, 3);
  placeIn(tl, 'study', 3, 6.6);
  placeIn(tl, 'breeze', 5.6, 6.6); // the sun comes back
  placeIn(tl, 'hush', 6.6);
  suspense(tl, 7, 8.8, 1.2); // she powers up (HOLD gets there sooner, with a heartbeat)

  onHold(holdBtn, () => {
    whoosh(1.2);
    blow(1.25);
    powerUp().call(() => glideTo(tl.scrollTrigger!.end + innerHeight * 0.15, 2), [], 1.15);
  });
}

// yPercent that drops an element fully below the screen (phones lay the rack out higher than desktop)
function offScreenBelow(el: HTMLElement) {
  return Math.max(170, ((innerHeight - el.offsetTop) / el.offsetHeight) * 100 + 40);
}
