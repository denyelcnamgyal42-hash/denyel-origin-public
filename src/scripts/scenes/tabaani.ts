// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Chapter 3 · Missions, part 1: the ink drips in, a candle lights the mission board, the camera
// dives into file 01 and the dossier tears open on the Tabaani door. The legacy monster is
// untangled (HOLD) into modules, then everything folds back into the file and it is stamped.
import { gsap } from 'gsap';
import { caption, part, parts, scene } from '../core/dom';
import { glideTo } from '../core/scroll';
import { placeIn } from '../audio/places';
import { whoosh } from '../audio/sound';
import { camOnFile, camWide, glanceAt, layerFull, layerOnFile, stampFile } from '../fx/board';
import { captionIn, captionOut, hide, impact, speedFlash, stampTitle, suspense } from '../fx/comic';
import { initDrips } from '../fx/drips';
import { onHold } from '../fx/hold';

const FILE = 0;          // Tabaani is the first file on the board
const UNTANGLED = 7.95;  // timeline time when the modules are on the page: where HOLD glides to
// (the timeline moves layers with xPercent/yPercent: x/y belong to the mouse parallax)

export function initTabaani() {
  const el = scene('tabaani');
  const p = (name: string) => part(el, name);
  const cap = (name: string) => caption(el, name);
  const chapter = el.querySelector<HTMLElement>('#missions')!;
  const pin = el.querySelector<HTMLElement>('.scene__pin')!;
  const stage = p('stage'), head = p('head'), speed = p('speed');
  const cam = p('board-cam'), fileStamp = parts(el, 'file-stamp')[FILE];
  const file = p('file'), [flapTop, flapBottom] = parts(el, 'flap');
  const inside = p('inside'), door = p('door'), doorCam = p('door-cam');
  const monster = p('monster'), faceoff = p('faceoff'), modules = p('modules'), sfx = p('sfx');
  const holdBtn = el.querySelector<HTMLElement>('[data-hold="untangle"]')!;

  hide(stage, file, inside, monster, faceoff, modules, sfx, holdBtn);
  hide(...['board', 'door', 'legacy', 'untangle', 'modules', 'hosts', 'next'].map(cap));
  // Only Mission 01 stamp animates later — keep 02/03 unlogged at board entry
  parts(el, 'file-stamp').forEach((s, i) => {
    if (i !== FILE) gsap.set(s, { autoAlpha: 0, clearProps: 'scale,rotate' });
  });

  initDrips(p('drips'), chapter);
  stampTitle(chapter, head, 'top 3%'); // stamps as soon as the drips have inked the screen

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: chapter, start: 'top top', end: '+=640%', pin, scrub: 1, invalidateOnRefresh: true },
  });

  // the title holds on pure ink like every chapter opener; once it has gone, a candle catches
  // and its light climbs the wall to find three sealed files (below 0 the room is fully dark)
  tl.set(stage, { autoAlpha: 1 }, 0.001)
    .to(head, { yPercent: -40, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 0.4)
    .fromTo(cam, { '--light': '-30vmax', scale: 1.12 }, { '--light': '150vmax', scale: 1, duration: 1.4, ease: 'power2.in' }, 0.9);
  captionIn(tl, cap('board'), 1.6);
  captionOut(tl, cap('board'), 2.35);

  // the camera dives into file 01 while the dossier grows out of the wall
  tl.call(() => whoosh(0.8), [], 2.4)
    .fromTo(cam, camWide, { ...camOnFile(FILE), duration: 0.9, ease: 'power2.in', immediateRender: false }, 2.4)
    .fromTo(file, { ...layerOnFile(cam, FILE), autoAlpha: 0 }, { ...layerFull, autoAlpha: 1, duration: 0.9, ease: 'power2.in' }, 2.4)
    .set(inside, { autoAlpha: 1 }, 3.3);
  impact(tl, file, 3.3); // the seal cracks

  // the dossier tears open along the broken seal: the door is inside
  tl.call(() => whoosh(0.6), [], 3.45)
    .to(flapTop, { yPercent: -62, rotate: -5, duration: 0.7, ease: 'power2.in' }, 3.45)
    .to(flapBottom, { yPercent: 62, rotate: 4, duration: 0.7, ease: 'power2.in' }, 3.45)
    .set(file, { autoAlpha: 0 }, 4.15)
    .fromTo(doorCam, { scale: 1.35 }, { scale: 1.05, duration: 1, ease: 'power2.out' }, 3.45);
  captionIn(tl, cap('door'), 3.9);
  captionOut(tl, cap('door'), 4.8);

  // she pushes the door: behind it, the legacy code, a monster of knots
  tl.call(() => whoosh(0.8), [], 4.8)
    .to(doorCam, { scale: 3.4, transformOrigin: '70% 42%', duration: 0.6, ease: 'power2.in' }, 4.8);
  speedFlash(tl, speed, 5.3);
  tl.set(door, { autoAlpha: 0 }, 5.4)
    .fromTo(monster, { autoAlpha: 0, scale: 0.3, rotate: -10 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.6)' }, 5.35)
    .to(monster, { scale: 1.08, rotate: 2, duration: 0.8 }, 5.95);
  impact(tl, monster, 5.95);
  captionIn(tl, cap('legacy'), 5.5);
  captionOut(tl, cap('legacy'), 6.3);

  // face-off: she takes one thread
  tl.fromTo(faceoff, { autoAlpha: 0, yPercent: 110, rotate: 4 }, { autoAlpha: 1, yPercent: 0, rotate: -1, duration: 0.5, ease: 'power3.out' }, 6.2)
    .to(monster, { autoAlpha: 0, duration: 0.3 }, 6.6)
    .to(holdBtn, { autoAlpha: 1, duration: 0.2 }, 6.6);
  impact(tl, faceoff, 6.7);
  captionIn(tl, cap('untangle'), 6.4);
  captionOut(tl, cap('untangle'), 7.2);

  // untangled: the knot becomes a cabinet of clean modules
  speedFlash(tl, speed, 7.2);
  tl.to(holdBtn, { autoAlpha: 0, duration: 0.2 }, 7.2)
    .to(faceoff, { scale: 0.85, autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 7.2)
    .fromTo(modules, { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' }, { autoAlpha: 1, clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.inOut' }, 7.3)
    .fromTo(sfx, { autoAlpha: 0, scale: 2.4, rotate: -24 }, { autoAlpha: 1, scale: 1, rotate: -8, duration: 0.25, ease: 'power4.in' }, 7.7);
  impact(tl, modules, 7.95);
  captionIn(tl, cap('modules'), 7.8);
  captionOut(tl, cap('modules'), 8.6);
  captionIn(tl, cap('hosts'), 8.7);
  captionOut(tl, cap('hosts'), 9.4);

  // the camera pulls back: the whole mission folds into its file on the wall, stamped complete
  tl.call(() => whoosh(0.7), [], 9.6)
    .fromTo(inside, layerFull, { ...layerOnFile(cam, FILE), duration: 1, ease: 'power2.out', immediateRender: false }, 9.6)
    .to(inside, { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 10)
    .to(cam, { ...camWide, duration: 1, ease: 'power2.out' }, 9.6);
  stampFile(tl, fileStamp, 10.55);
  captionIn(tl, cap('next'), 10.9);
  tl.to(cam, { ...glanceAt(FILE + 1), duration: 0.8 }, 10.9)
    .set({}, {}, 11.8);

  // sound: the candle-lit board, a silent office behind the door, the monster, clean code being typed
  placeIn(tl, 'candle', -0.3, 3.3);
  placeIn(tl, 'hush', 3.3, 7.2);
  placeIn(tl, 'study', 7.2, 9.6);
  placeIn(tl, 'candle', 9.6);
  suspense(tl, 4.6, 5.35); // she pushes the door: the monster

  onHold(holdBtn, () => {
    whoosh(1.2);
    gsap.timeline()
      .to(faceoff, { keyframes: { xPercent: [0, -1, 0.8, -0.5, 0.3, 0] }, duration: 0.45 })
      .to(speed, { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 }, 0.1)
      .call(() => {
        const st = tl.scrollTrigger!;
        glideTo(st.start + ((st.end - st.start) * UNTANGLED) / tl.duration(), 1.6);
      }, [], 0.5);
  });
}
