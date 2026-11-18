// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Camera moves on the mission board (components/ui/MissionBoard.astro).
// Diving into a file: the wall zooms until the file fills the screen, while the next layer
// grows out of that exact spot. Pulling back is the same move in reverse.
import { stamp } from '../audio/sound';

// each dossier centre on the wall (% of board.jpg), how the file hangs, and its outline
// calibrated to the DENYEL board art (three upright papers; not the legacy tilted seals)
export const BOARD_FILES = [
  { x: 18.5, y: 47.4, r: -4, outline: '7% 18%, 29% 14%, 30.5% 78%, 8% 82%' },
  { x: 50.1, y: 47.4, r: 2, outline: '39% 15%, 61.5% 14%, 62% 80%, 39% 81%' },
  { x: 81.5, y: 47.4, r: 3, outline: '70% 16%, 93% 14%, 93.5% 79%, 71% 82%' },
];
const ZOOM = 7;

// the wall's camera framed on file i
export function camOnFile(i: number): gsap.TweenVars {
  const { x, y } = BOARD_FILES[i];
  return { scale: ZOOM, xPercent: 50 - x, yPercent: 50 - y, transformOrigin: `${x}% ${y}%` };
}

export const camWide: gsap.TweenVars = { scale: 1, xPercent: 0, yPercent: 0 };

// a slow lean toward file i: what comes next
export function glanceAt(i: number): gsap.TweenVars {
  const { x, y } = BOARD_FILES[i];
  return { scale: 1.06, transformOrigin: `${x}% ${y}%` };
}

// a full-screen layer shrunk onto file i (it follows the wall exactly while the camera moves)
export function layerOnFile(cam: HTMLElement, i: number): gsap.TweenVars {
  const { x, y } = BOARD_FILES[i];
  return {
    scale: 1 / ZOOM,
    xPercent: () => ((x - 50) * cam.offsetWidth) / innerWidth,
    yPercent: () => ((y - 50) * cam.offsetHeight) / innerHeight,
  };
}

export const layerFull: gsap.TweenVars = { scale: 1, xPercent: 0, yPercent: 0 };

// the rose "complete" stamp slams onto a file (scrub-safe: reverses cleanly when scrolling back)
export function stampFile(tl: gsap.core.Timeline, el: HTMLElement, at: number) {
  tl.fromTo(
    el,
    { autoAlpha: 0, scale: 3, rotate: -26 },
    { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.25, ease: 'power4.in', immediateRender: false },
    at,
  ).call(stamp, [], at + 0.25);
}

// Cut the three files out of the wall: each piece (clipped to a file's outline) gets a copy of
// the wall drawing and its lettering. Only `stamped` indices get LOGGED — call this at the
// pull-back beat (not on scene init), or Mission 03 looks fully logged too early.
export function cutFiles(cam: HTMLElement, pieces: HTMLElement[], stamped: number[] = [0, 1, 2]) {
  for (const piece of pieces) {
    piece.replaceChildren();
    const copy = cam.cloneNode(true) as HTMLElement;
    for (const el of copy.querySelectorAll('[data-part]')) el.removeAttribute('data-part');
    copy.querySelectorAll('i').forEach((el, i) => {
      el.removeAttribute('style');
      if (stamped.includes(i)) el.setAttribute('data-done', '');
      else el.removeAttribute('data-done');
    });
    piece.append(...copy.children);
  }
}
