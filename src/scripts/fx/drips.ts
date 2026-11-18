// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Once the page has been read to its end, the ink drips down over it while the next chapter
// (which opens on the same ink) scrolls in underneath; the drips hide when it reaches the top.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initDrips(drips: HTMLElement, chapter: HTMLElement) {
  gsap.fromTo(drips, { '--fall': '-45vh' }, {
    '--fall': '100vh', ease: 'power1.inOut',
    scrollTrigger: { trigger: chapter, start: 'top bottom', end: 'top top', scrub: 0.5 },
  });
  // while the drips fall, the next chapter stays invisible so its straight top edge never shows;
  // it takes over (same ink) the moment it reaches the top
  ScrollTrigger.create({
    trigger: chapter, start: 'top bottom', end: 'top top',
    onToggle: (st) => {
      gsap.set(drips, { visibility: st.isActive ? 'visible' : 'hidden' });
      gsap.set(chapter, { visibility: st.isActive ? 'hidden' : 'visible' });
    },
  });
}
