// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Where the story is decides the place sound: each scene marks stretches of the scroll with a bed
// (a section, or a span of its pinned timeline); the latest-starting stretch that contains the
// reader wins, so a beat inside a chapter overrides the chapter's own sound. Default: the wind.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { placeSound, type BedName } from './sound';

type Zone = { name: BedName; span: () => [number, number] };
const zones: Zone[] = [];
let last = 0;

// a whole stretch of the page, in ScrollTrigger terms
export function placeOver(trigger: Element, name: BedName, start = 'top bottom', end = 'bottom top') {
  const st = ScrollTrigger.create({ trigger, start, end });
  zones.push({ name, span: () => [st.start, st.end] });
}

// a span of a pinned, scrubbed timeline, in its own time units
export function placeIn(tl: gsap.core.Timeline, name: BedName, from: number, to = tl.duration()) {
  zones.push({
    name,
    span: () => {
      const st = tl.scrollTrigger!, k = (st.end - st.start) / tl.duration();
      return [st.start + from * k, st.start + to * k];
    },
  });
}

export function initPlaces() {
  gsap.ticker.add((time) => {
    if (time - last < 0.25) return;
    last = time;
    const y = scrollY;
    let best: { name: BedName; start: number } | null = null;
    for (const z of zones) {
      const [a, b] = z.span();
      if (y >= a && y < b && (!best || a >= best.start)) best = { name: z.name, start: a };
    }
    placeSound(best?.name ?? 'wind');
  });
}
