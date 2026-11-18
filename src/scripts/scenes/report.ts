// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The three files that fell off the wall land on the ink one by one as they scroll in: the file
// drops from above the camera and hits the desk, its mission panel is slapped on, then the stamp.
import { gsap } from 'gsap';
import { part, parts, scene } from '../core/dom';
import { placeOver } from '../audio/places';
import { stamp } from '../audio/sound';

export function initReport() {
  placeOver(scene('report'), 'hush'); // the candle has died: only the files landing are heard
  // (data-depth parallax owns x/y of the panel, card and stamp: the timeline uses yPercent/xPercent)
  parts(scene('report'), 'file').forEach((file, i) => {
    gsap.timeline({ scrollTrigger: { trigger: file, start: 'top 75%', once: true } })
      .from(file, { autoAlpha: 0, scale: 1.7, yPercent: -18, rotate: i % 2 ? 9 : -9, duration: 0.5, ease: 'power3.in' })
      .call(stamp, [], 0.5)
      .to(file, { keyframes: { scale: [1, 0.985, 1] }, duration: 0.18 }, 0.5)
      .from(part(file, 'art'), { autoAlpha: 0, xPercent: i % 2 ? 40 : -40, rotate: i % 2 ? 14 : -14, duration: 0.3, ease: 'power4.in' }, 0.55)
      .call(stamp, [], 0.75)
      .from(parts(file, 'result'), { autoAlpha: 0, xPercent: -4, duration: 0.4, stagger: 0.1 }, 0.5)
      .from(part(file, 'stamp'), { autoAlpha: 0, scale: 2.6, rotate: -20, duration: 0.35, ease: 'power4.in' }, 0.95)
      .call(stamp, [], 1.3);
  });
}
