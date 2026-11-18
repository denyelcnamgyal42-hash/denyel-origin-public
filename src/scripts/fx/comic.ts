// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Small comic-book moves reused by every chapter, added onto a scrubbed timeline.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { boom, breath, stamp, tension, whoosh } from '../audio/sound';

gsap.registerPlugin(SplitText);

// a caption box wipes open, then its words appear one by one
export function captionIn(tl: gsap.core.Timeline, el: HTMLElement, at: number) {
  const words = SplitText.create(el, { type: 'words' }).words;
  tl.fromTo(el, { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' }, { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.2, ease: 'power2.out' }, at)
    .fromTo(words, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.012 }, at + 0.08);
}

export function captionOut(tl: gsap.core.Timeline, el: HTMLElement, at: number) {
  tl.to(el, { autoAlpha: 0, duration: 0.2 }, at);
}

// something lands: the panel shakes and an ink stamp sounds
export function impact(tl: gsap.core.Timeline, el: Element, at: number) {
  tl.to(el, { keyframes: { rotate: [0, -0.6, 0.5, -0.3, 0] }, duration: 0.16 }, at).call(stamp, [], at);
}

// anime suspense before a reveal: a rumble grows from `from`, everything holds its breath just
// before `hit`, and a boom lands on it (the hits only play reading forward, not scrolling back)
export function suspense(tl: gsap.core.Timeline, from: number, hit: number, strength = 1) {
  const rumble = { p: 0 };
  const feel = () => tension(rumble.p * strength);
  const ahead = (fn: () => void) => () => { if (tl.scrollTrigger!.direction > 0) fn(); };
  tl.fromTo(rumble, { p: 0 }, { p: 1, duration: hit - 0.15 - from, ease: 'power1.in', onUpdate: feel, immediateRender: false }, from)
    .call(ahead(breath), [], hit - 0.15)
    .to(rumble, { p: 0, duration: 0.05, onUpdate: feel }, hit)
    .call(ahead(() => boom(strength)), [], hit);
}

// a camera cut: manga speed lines flash
export function speedFlash(tl: gsap.core.Timeline, el: Element, at: number) {
  tl.call(() => whoosh(0.7), [], at)
    .to(el, { opacity: 1, duration: 0.12 }, at)
    .to(el, { opacity: 0, duration: 0.3 }, at + 0.2);
}

// a ChapterHead stamps onto the ink, letter by letter, as its chapter scrolls in
export function stampTitle(trigger: Element, head: HTMLElement, start = 'top bottom') {
  const chars = SplitText.create(head.querySelector('[data-part="title"]'), { type: 'words,chars' }).chars;
  const sub = head.querySelector('[data-part="sub"]');
  const tl = gsap.timeline({ scrollTrigger: { trigger, start, toggleActions: 'play none none reverse' } })
    .from(chars, { yPercent: 120, autoAlpha: 0, rotate: () => gsap.utils.random(-14, 14), duration: 0.9, stagger: 0.04, ease: 'back.out(1.8)' })
    .call(stamp, [], 0.4)
    .from(head.querySelector('[data-part="brush"]'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.7, ease: 'power3.inOut' }, 0.5);
  if (sub) tl.from(sub, { autoAlpha: 0, y: 12, duration: 0.5, ease: 'power2.out' }, 0.8);
}

// the camera travels along a .panel__map wider than its panel, from its left edge to its right
export function panAcross(tl: gsap.core.Timeline, map: HTMLElement, panel: HTMLElement, at: number, duration: number) {
  const reach = () => ((map.offsetWidth - panel.clientWidth) / 2 / map.offsetWidth) * 100;
  tl.fromTo(map, { xPercent: reach }, { xPercent: () => -reach(), duration, ease: 'power1.inOut' }, at);
}

// hidden until the timeline brings them in
export function hide(...els: Element[]) {
  gsap.set(els, { autoAlpha: 0 });
}
