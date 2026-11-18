// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Chapter 6 takes over on the last screen of Chapter 5 (a seam): that page, copied, shrinks into a
// framed page on a pile, and the volume rewinds, page after page flying off to the right, down to the
// Bizerte port of Chapter 1; it opens to the whole screen, night falls and the title stamps. Dawn opens from the
// horizon into the same port and she walks to the end of the quay. VOL.01 is stamped in the sky,
// cracks, and its pieces fly apart with her ink shards; "To be continued…" bleeds into the paper in its
// place, the caption asks the question, and the colophon with every contact is set on the quay.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { part, parts, scene } from '../core/dom';
import { placeIn } from '../audio/places';
import { shatter, stamp, whoosh } from '../audio/sound';
import { captionIn, stampTitle, suspense } from '../fx/comic';
import { blow, liveFrame } from '../fx/living';
import { joinPrevious } from '../fx/seam';

const PIN = 300; // % of the screen
const SHRINK = 0.35; // Chapter 5's page becoming a page of the pile, before the rewind
const TITLE = SHRINK + 1.3; // when the title stamps, in timeline seconds
const INK = 'rgba(20, 17, 19, A)', PAPER = 'rgba(243, 239, 231, A)';
// the .panel double frame, drawn outside the page so the copied layout stays exactly the same
const frame = (a: number) => {
  const ink = INK.replace('A', String(a)), paper = PAPER.replace('A', String(a));
  return { boxShadow: `0 0 0 3px ${ink}, 0 0 0 9px ${paper}, 0 0 0 10.5px ${ink}` };
};

// a copy of Chapter 5's page as it was left (GSAP's end states included), in a shell that keeps its
// scoped styles; anchored at the bottom, where the phone's long page ends
function copyPowerSheet(into: HTMLElement) {
  const power = scene('power');
  // its scrubbed animations may still be catching up (scrub lag, or a jump): finish them first
  for (const st of ScrollTrigger.getAll()) if (power.contains(st.trigger as Node)) st.animation?.progress(1);
  const shell = power.cloneNode(false) as HTMLElement;
  for (const a of ['id', 'data-scene', 'aria-labelledby']) shell.removeAttribute(a);
  shell.style.cssText = 'position: absolute; left: 0; right: 0; bottom: 0';
  const page = power.querySelector('.power__pin')!.cloneNode(true) as HTMLElement;
  page.removeAttribute('style'); // the pin's own positioning
  for (const el of page.querySelectorAll('[id], [data-part]')) {
    el.removeAttribute('id');
    el.removeAttribute('data-part');
  }
  for (const img of page.querySelectorAll('img')) img.loading = 'eager'; // a lazy copy stays blank while hidden
  shell.append(page);
  into.replaceChildren(shell);
}

export function initFinale() {
  const el = scene('finale');
  const pin = el.querySelector<HTMLElement>('.finale__pin')!;
  const [port, ...rest] = parts(el, 'page');
  const riffle = rest.reverse(); // the top page (Chapter 5's) goes first
  const copy = riffle[0];
  joinPrevious(el);
  const night = part(el, 'night'), head = part(el, 'head');
  const dawn = part(el, 'dawn'), map = part(el, 'map'), ines = part(el, 'ines'); // map: no GSAP transform (its CSS scale pulls back)
  const vol = part(el, 'vol'), pieces = parts(el, 'piece'), cracks = part(el, 'cracks'), shards = part(el, 'shards');
  const continued = SplitText.create(part(el, 'continued'), { type: 'words,chars' }).chars;
  const colophon = part(el, 'colophon'), rows = parts(el, 'row');
  const speed = part(el, 'speed'), flash = part(el, 'flash');

  // she is alive: the sea wind moves her hijab and her abaya, and she takes three steps to the edge
  const walker = liveFrame(ines, { boil: 0.0006, lift: 0.006 });
  const STEPS = 3;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: el, start: 'top top', end: `+=${PIN}%`, pin, scrub: 1, onEnter: () => copyPowerSheet(copy) },
  });

  // the rewind: each page is turned back, off to the right
  riffle.forEach((page, i) => {
    const t = i * 0.22;
    tl.to(page, { xPercent: 125, yPercent: -8, rotate: '+=16', duration: 0.42, ease: 'power2.in' }, t)
      .call(whoosh, [0.45], t + 0.2)
      .set(page, { autoAlpha: 0 }, t + 0.42);
  });

  // the first page of the story opens to the whole screen and night falls on it; the title stamps
  tl.fromTo(port, { '--open': 0 }, { '--open': 1, duration: 0.5, ease: 'power2.inOut' }, 0.75)
    .fromTo(night, { autoAlpha: 0 }, { autoAlpha: 0.62, duration: 0.4 }, 0.85)
    .fromTo(head, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.15 }, 1.1)
    .to(head, { autoAlpha: 0, yPercent: -14, duration: 0.25, ease: 'power2.in' }, 1.8);

  // dawn: light opens from the horizon into the same port while the night lifts
  tl.fromTo(dawn, { '--sun': '-30%' }, { '--sun': '130%', duration: 0.9, ease: 'sine.inOut' }, 1.9)
    .fromTo(dawn, { scale: 1.12 }, { scale: 1, duration: 1.2, ease: 'power1.out' }, 1.9)
    .to([port, night], { autoAlpha: 0, duration: 0.6 }, 2.1)
    // she walks away from us, to the end of the quay
    .fromTo(ines, { autoAlpha: 0, scale: 1.2, yPercent: 12 }, {
      autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.7, ease: 'power2.out',
      onUpdate() { walker.walk(this.progress() * STEPS); },
    }, 2.3);

  // VOL.01 is stamped in the sky, cracks from one point, and breaks
  tl.fromTo(vol, { autoAlpha: 0, scale: 1.4 }, { autoAlpha: 1, scale: 1, duration: 0.18, ease: 'power3.in' }, 2.65)
    .call(stamp, [], 2.83)
    .fromTo(cracks.querySelectorAll('polyline'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.25, stagger: 0.02, ease: 'power2.in' }, 3.05)
    .call(shatter, [], 3.4)
    .set(cracks, { autoAlpha: 0 }, 3.4)
    // the blast: a flash of paper, speed lines, the camera shakes and the wind whips her hijab
    .call(blow, [1], 3.4)
    .fromTo(flash, { opacity: 0 }, { opacity: 0.85, duration: 0.04 }, 3.4)
    .to(flash, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 3.45)
    .fromTo(speed, { opacity: 0, scale: 0.8 }, { opacity: 0.9, scale: 1.3, duration: 0.1 }, 3.4)
    .to(speed, { opacity: 0, duration: 0.35 }, 3.52)
    .to(dawn, { keyframes: { x: [0, -12, 10, -6, 3, 0], y: [0, 7, -5, 3, -1, 0], scale: [1, 1.04, 1.03, 1.02, 1.01, 1] }, duration: 0.3 }, 3.4);
  pieces.forEach((p) => {
    const a = (Number(p.dataset.angle) * Math.PI) / 180;
    tl.to(p, { xPercent: Math.cos(a) * 90, yPercent: Math.sin(a) * 280, rotate: Number(p.dataset.spin) * 1.6, scale: 1.6, duration: 0.55, ease: 'power3.out' }, 3.4)
      .to(p, { autoAlpha: 0, duration: 0.25 }, 3.65);
  });
  // her ink shards fly at the camera
  tl.fromTo(shards, { autoAlpha: 0, scale: 0.3 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out' }, 3.4)
    .to(shards, { autoAlpha: 0, scale: 2.2, duration: 0.45, ease: 'power2.in' }, 3.7);

  // where the title stood, the next words bleed into the paper
  tl.fromTo(continued, { autoAlpha: 0, filter: 'blur(8px)', y: 8 }, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 0.2, stagger: 0.025 }, 3.6);
  captionIn(tl, part(el, 'next'), 4.05);

  // the colophon is set on the quay, every contact at once (phones: the camera pulls back to make room)
  tl.fromTo(map, { '--lift': 0 }, { '--lift': 1, duration: 0.35, ease: 'power2.inOut' }, 4.0)
    // the colophon card is dropped onto the quay like a page and settles a little askew
    // (phones: barely askew, the card is as wide as the screen; data-depth parallax owns its x/y)
    .fromTo(colophon, { autoAlpha: 0, yPercent: 15, rotate: -6, scale: 1.08 }, {
      autoAlpha: 1, yPercent: 0, rotate: () => (matchMedia('(max-width: 760px)').matches ? -0.4 : -1.2), scale: 1, duration: 0.3, ease: 'back.out(1.6)',
    }, 4.15)
    .fromTo(rows, { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.12, stagger: 0.05 }, 4.25)
    .call(stamp, [], 4.4)
    .to({}, { duration: 0.4 });

  // sound: night and wind over the old port, then the sea again at dawn; a rumble under VOL.01 until it breaks
  placeIn(tl, 'storm', 0.75, 1.9);
  placeIn(tl, 'harbour', 1.9, 99);
  suspense(tl, 2.65, 3.4, 1.3);

  // first of all, Chapter 5's page shrinks into a framed, tilted page on top of the pile
  tl.shiftChildren(SHRINK)
    .fromTo(copy, { scale: 1, rotate: 0, ...frame(0) }, { scale: 0.82, rotate: -2, ...frame(1), duration: SHRINK, ease: 'power2.inOut' }, 0);

  stampTitle(el, head, `top -${((PIN * TITLE) / tl.duration()).toFixed(1)}%`);
}
