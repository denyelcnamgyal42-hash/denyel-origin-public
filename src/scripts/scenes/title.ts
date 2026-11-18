// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Title on ink: the name stamps in, then paper clouds rise and swallow the ink.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { part, parts, scene } from '../core/dom';
import { stamp, whoosh } from '../audio/sound';

gsap.registerPlugin(SplitText);

const root = () => scene('title');

// cloud y is in SVG viewBox units (the viewBox is 1600 x 900)
const CLOUD_REST = 730;
const CLOUD_GONE = 900;
const CLOUD_COVER = -280;

export function initTitle() {
  const el = root();
  gsap.set(part(el, 'cloud'), { y: CLOUD_REST });
  gsap.timeline({
    scrollTrigger: { trigger: el, start: 'top top', end: '+=110%', pin: part(el, 'name').closest('.scene__pin'), scrub: 1 },
  })
    .to(part(el, 'name'), { yPercent: -30, scale: 1.08, ease: 'none' }, 0)
    .to(parts(el, 'small'), { yPercent: -60, ease: 'none' }, 0)
    .to(part(el, 'hint'), { autoAlpha: 0, duration: 0.15 }, 0)
    .to(part(el, 'cloud'), { y: CLOUD_COVER, ease: 'power1.in' }, 0)
    .call(() => whoosh(0.8), [], 0.45);
}

// plays once, right after the gate opens
export function playTitleIntro() {
  const el = root();
  const chars = SplitText.create(part(el, 'name'), { type: 'words,chars' }).chars;
  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from(chars, { yPercent: 110, rotate: () => gsap.utils.random(-12, 12), autoAlpha: 0, duration: 1.1, stagger: 0.05 }, 0.35)
    .call(stamp, [], 0.7)
    .from([...parts(el, 'small'), part(el, 'hint')], { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.9)
    .from(part(el, 'cloud'), { y: CLOUD_GONE, duration: 1.6, ease: 'power3.out' }, 0.2);
}
