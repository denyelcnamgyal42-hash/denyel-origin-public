// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Smooth scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  lenis = new Lenis({ lerp: 0.085 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// glide to a scroll position like a camera move
export function glideTo(y: number, duration = 2.4) {
  if (lenis) lenis.scrollTo(y, { duration, easing: easeOutCubic });
  else scrollTo({ top: y, behavior: 'smooth' });
}
