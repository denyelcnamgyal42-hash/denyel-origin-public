// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Mission 03 · Smart Attendance. One pinned, scrubbed timeline:
// dive into file 03 → smoke → campus panorama + squad → false-match antagonist (metaphor) →
// face gallery → uncertain score vs verify (metaphor) → pipeline gates →
// HOLD to cite (three hits, four crack stages) → check-rain metaphor → dawn → board →
// candle dies and the three stamped files fall off the wall, toward the reports.
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { caption, part, parts, scene } from '../core/dom';
import { glideTo } from '../core/scroll';
import { placeIn } from '../audio/places';
import { boom, shatter, stamp, whoosh } from '../audio/sound';
import { camOnFile, camWide, cutFiles, glanceAt, layerFull, layerOnFile, stampFile } from '../fx/board';
import { joinPrevious } from '../fx/seam';
import { createCheckRain } from '../fx/checkrain';
import { captionIn, captionOut, hide, impact, panAcross, speedFlash, suspense } from '../fx/comic';
import { onHold } from '../fx/hold';
import { createInkWipe } from '../fx/inkwipe';
import { talan } from '../../data/story';

const FILE = 2;                     // Smart Attendance is the third file on the board
const CITES = [15.35, 16.05, 16.75]; // timeline times of the three citations: where each HOLD glides to
const FINISH = 18.4;                 // once all three have landed, a HOLD finishes: shatter + check-rain
const RAIN_STAMPS = 48;              // visual density only — not a claimed offline-test total

const cssNum = (el: Element, name: string) => parseFloat(getComputedStyle(el).getPropertyValue(name));

export function initTalan() {
  const el = scene('talan');
  const p = (name: string) => part(el, name);
  const cap = (name: string) => caption(el, name);
  const pin = el.querySelector<HTMLElement>('.scene__pin')!;
  const stage = p('stage'), inside = p('inside'), speed = p('speed');
  const cam = p('board-cam'), fileStamp = parts(el, 'file-stamp')[FILE];
  const piecesLayer = p('pieces'), pieces = parts(el, 'piece');
  const pano = p('pano'), smoke = p('smoke'), squad = p('squad');
  const lie = p('lie'), lieStages = parts(el, 'lie-stage'), whispers = parts(el, 'whisper');
  const library = p('library'), libraryImg = p('library-img');
  const countArticles = el.querySelector<HTMLElement>('[data-part="count-articles"]');
  const articles = el.querySelector<HTMLElement>('[data-part="articles"]');
  const handPanel = p('smoke-hand'), guess = p('guess'), stampPanel = p('stamp'), fact = p('fact');
  const rivers = p('rivers'), riversCam = p('rivers-cam'), map = p('map'), validated = parts(el, 'validated');
  const face = p('faceoff'), cites = parts(el, 'cite');
  const countTests = el.querySelector<HTMLElement>('[data-part="count-tests"]');
  const tests = el.querySelector<HTMLElement>('[data-part="tests"]');
  const dawn = p('dawn');
  const holdBtn = el.querySelector<HTMLElement>('[data-hold="cite"]')!;
  const wipe = createInkWipe(part<HTMLCanvasElement>(el, 'inkwipe'));
  const rainCanvas = part<HTMLCanvasElement>(el, 'rain');
  const rain = createCheckRain(rainCanvas, RAIN_STAMPS);
  const smokeIn = { p: 0 }, raining = { p: 0 }, counts = { articles: 0, tests: 0 };
  const galleryN = typeof talan.sfx.articles === 'number' ? talan.sfx.articles : 0;
  const testsN = typeof talan.sfx.tests === 'number' ? talan.sfx.tests : 0;

  hide(stage, inside, smoke, squad, lie, ...lieStages.slice(1), ...whispers, library, handPanel, stampPanel, fact,
    rivers, ...validated, face, ...cites, dawn, holdBtn);
  if (countArticles) hide(countArticles);
  if (countTests) hide(countTests);
  hide(...Object.keys(talan.captions).map(cap));
  // Do NOT cutFiles here — cloning with all stamps LOGGED made Mission 03 look complete on entry.
  // Keep piece layer scrub-safe (autoAlpha reverses; bare visibility:hidden did not).
  gsap.set(piecesLayer, { autoAlpha: 0 });
  gsap.set(fileStamp, { autoAlpha: 0, clearProps: 'scale,rotate' });
  gsap.set(cam, glanceAt(FILE)); // the previous mission ends leaning toward this file
  joinPrevious(el);
  const whisperChars = whispers.map((w) => SplitText.create(w, { type: 'words,chars' }).chars);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: el, start: 'top top', end: '+=1360%', pin, scrub: 1, invalidateOnRefresh: true },
  });

  // the camera dives into file 03 and smoke pours out of it
  tl.set(stage, { autoAlpha: 1 }, 0.001)
    .call(() => whoosh(0.8), [], 0.1)
    .fromTo(cam, glanceAt(FILE), { ...camOnFile(FILE), duration: 1, ease: 'power2.in', immediateRender: false }, 0.1)
    .to(smokeIn, { p: 1, duration: 0.8, ease: 'power1.in', onUpdate: () => wipe.set(smokeIn.p) }, 0.6)
    .set(inside, { autoAlpha: 1 }, 1.45)
    // and clears on Urban Mind: the camera pans across the city being planned
    .to(smokeIn, { p: 0, duration: 1, ease: 'power1.inOut', onUpdate: () => wipe.set(smokeIn.p) }, 1.5)
    .fromTo(pano, { xPercent: 0, scale: 1.12, transformOrigin: '0% 50%' }, {
      xPercent: () => -(1 - innerWidth / pano.offsetWidth) * 100, scale: 1, duration: 3.6, ease: 'power1.inOut',
    }, 1.5);
  captionIn(tl, cap('city'), 2.1);
  captionOut(tl, cap('city'), 3);
  captionIn(tl, cap('urban'), 3.1);
  captionOut(tl, cap('urban'), 4);

  // the squad of 13 steps up onto the rooftop
  tl.fromTo(squad, { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: 'power3.out' }, 4.3);
  impact(tl, squad, 4.9);
  captionIn(tl, cap('squad'), 4.6);
  captionOut(tl, cap('squad'), 5.5);

  // smoke rolls over the city and the Hallucination rises, whispering confident lies
  tl.call(() => whoosh(1), [], 5.5)
    .fromTo(smoke, { autoAlpha: 0, xPercent: 25 }, { autoAlpha: 0.28, xPercent: -10, duration: 1.4, ease: 'power1.out' }, 5.5)
    .to(pano, { autoAlpha: 0.3, duration: 0.8 }, 5.6) // the real city pales behind the lie
    .to(squad, { yPercent: 70, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 5.6)
    .fromTo(lie, { autoAlpha: 0, yPercent: 45, scale: 0.7 }, { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, 5.9);
  impact(tl, lie, 6.8);
  captionIn(tl, cap('rise'), 6.2);
  captionOut(tl, cap('rise'), 7.7);
  whispers.forEach((w, i) => {
    const at = 6.6 + i * 0.35;
    tl.set(w, { autoAlpha: 1 }, at)
      .fromTo(whisperChars[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, stagger: 0.008 }, at)
      // a lie never holds still: it slips and blurs
      .to(w, { keyframes: { x: [0, -6, 4, -2, 0], skewX: [0, -8, 6, 0, 0], filter: ['blur(0px)', 'blur(2px)', 'blur(0px)', 'blur(3px)', 'blur(0px)'] }, duration: 0.5 }, at + 0.3);
  });

  // face-gallery beat; camera climbs the panel (no invented gallery headcount)
  speedFlash(tl, speed, 7.8);
  tl.to([pano, smoke, ...whispers], { autoAlpha: 0, duration: 0.3 }, 7.8)
    .to(lie, { autoAlpha: 0, scale: 0.9, duration: 0.3 }, 7.8)
    .fromTo(library, { autoAlpha: 0, yPercent: 30 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 7.9)
    .fromTo(libraryImg, { yPercent: () => -(1 - library.clientHeight / libraryImg.clientHeight) * 100 }, { yPercent: 0, duration: 2.1, ease: 'power1.inOut' }, 8)
    .to(library, { keyframes: { scale: [1, 1.03, 1] }, duration: 0.3 }, 9.9);
  if (countArticles && articles && galleryN > 0) {
    tl.fromTo(countArticles, { autoAlpha: 0, scale: 1.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out' }, 8.1)
      .to(counts, {
        articles: galleryN, duration: 1.5, ease: 'power2.out',
        onUpdate: () => (articles.textContent = Math.round(counts.articles).toLocaleString('en')),
      }, 8.1);
    impact(tl, countArticles, 9.6);
  } else {
    impact(tl, library, 9.6);
  }
  captionIn(tl, cap('library'), 8.3);
  captionOut(tl, cap('library'), 9.2);
  captionIn(tl, cap('beams'), 9.3);
  captionOut(tl, cap('beams'), 10.2);

  // uncertain similarity score (metaphor) vs verify stamp — not an LLM face-match
  tl.to([library, ...(countArticles ? [countArticles] : [])], { autoAlpha: 0, xPercent: 20, duration: 0.4, ease: 'power2.in' }, 10.2)
    .fromTo(handPanel, { autoAlpha: 0, xPercent: -40, rotate: -3 }, { autoAlpha: 1, xPercent: 0, rotate: -1.5, duration: 0.5, ease: 'power3.out' }, 10.4)
    .fromTo(guess, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 10.7)
    .fromTo(stampPanel, { autoAlpha: 0, xPercent: 50, rotate: 6 }, { autoAlpha: 1, xPercent: 0, rotate: 1.5, duration: 0.25, ease: 'power4.in' }, 11.15);
  impact(tl, stampPanel, 11.4);
  tl.to(guess, { autoAlpha: 0, y: -50, filter: 'blur(10px)', duration: 0.5, ease: 'power1.in' }, 11.4)
    .fromTo(fact, { autoAlpha: 0, scale: 2.2, rotate: -12 }, { autoAlpha: 1, scale: 1, rotate: -3, duration: 0.2, ease: 'power4.in' }, 11.45);
  captionIn(tl, cap('split'), 10.8);
  captionOut(tl, cap('split'), 12);

  // four rivers, four gates: each pipeline is validated by a human
  tl.to([handPanel, stampPanel], { autoAlpha: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' }, 12)
    .fromTo(rivers, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 12.1)
    .fromTo(riversCam, { scale: 1.2 }, { scale: 1, duration: 1.9, ease: 'power1.out' }, 12.1);
  panAcross(tl, map, rivers, 12.3, 1.6);
  validated.forEach((v, i) => {
    const at = 12.75 + i * 0.32;
    tl.fromTo(v, { autoAlpha: 0, scale: 2.6, rotate: -20 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.15, ease: 'power4.in' }, at)
      .call(stamp, [], at + 0.15);
  });
  captionIn(tl, cap('rivers'), 12.5);
  captionOut(tl, cap('rivers'), 13.9);

  // face-off: the false-match antagonist looms; each cited evidence beat cracks it
  speedFlash(tl, speed, 14);
  tl.to(rivers, { autoAlpha: 0, duration: 0.3 }, 14)
    .fromTo(face, { autoAlpha: 0, yPercent: 40 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 14.1)
    .fromTo(lie, { autoAlpha: 0, yPercent: () => cssNum(lie, '--face-y') - 20, scale: () => cssNum(lie, '--face-s') * 1.2 },
      { autoAlpha: 1, yPercent: () => cssNum(lie, '--face-y'), scale: () => cssNum(lie, '--face-s'), duration: 0.6, ease: 'power3.out' }, 14.2)
    .to(holdBtn, { autoAlpha: 1, duration: 0.2 }, 14.6);
  captionIn(tl, cap('cite'), 14.5);
  CITES.forEach((at, i) => {
    tl.fromTo(cites[i], { autoAlpha: 0, y: 0, scale: 0.6 }, { autoAlpha: 1, y: () => -innerHeight * 0.2, scale: 1, duration: 0.3, ease: 'power2.in' }, at - 0.3)
      .to(cites[i], { autoAlpha: 0, scale: 1.4, duration: 0.15 }, at)
      .set(lieStages[i + 1], { autoAlpha: 1 }, at)
      .to(lie, { keyframes: { xPercent: [0, -2, 1.6, -1, 0] }, duration: 0.25 }, at);
    impact(tl, face, at);
  });
  tl.to(holdBtn, { autoAlpha: 0, duration: 0.2 }, 16.8);
  captionOut(tl, cap('cite'), 16.8);

  // check-rain is a comic metaphor for verified marks landing — not a published test total
  tl.to(lie, { scale: () => cssNum(lie, '--face-s') * 1.35, autoAlpha: 0, filter: 'blur(8px)', duration: 0.9, ease: 'power2.in' }, 17)
    .to(raining, { p: 1, duration: 1.4, ease: 'power1.in', onUpdate: () => rain.set(raining.p) }, 17);
  if (countTests && tests && testsN > 0) {
    tl.fromTo(countTests, { autoAlpha: 0, scale: 1.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out' }, 17)
      .to(counts, {
        tests: testsN, duration: 1.3, ease: 'power1.in',
        onUpdate: () => (tests.textContent = String(Math.round(counts.tests))),
      }, 17);
    impact(tl, countTests, 18.3);
  } else {
    impact(tl, rainCanvas, 18.3);
  }
  captionIn(tl, cap('tests'), 17.4);
  captionOut(tl, cap('tests'), 18.6);

  // dawn breaks open from the centre on the same plaza
  tl.call(() => whoosh(0.6), [], 18.6)
    .fromTo(dawn, { autoAlpha: 0, clipPath: 'circle(0% at 50% 40%)' }, { autoAlpha: 1, clipPath: 'circle(75% at 50% 40%)', duration: 0.8, ease: 'power2.inOut' }, 18.6);
  if (countTests) tl.to(countTests, { autoAlpha: 0, duration: 0.3 }, 18.9);
  tl.to(rainCanvas, { autoAlpha: 0, duration: 0.4 }, 19)
    .set(face, { autoAlpha: 0 }, 19.4);
  captionIn(tl, cap('dawn'), 19.2);
  captionOut(tl, cap('dawn'), 20.1);

  // the camera pulls back: the mission folds into file 03 on the wall, stamped complete
  tl.call(() => whoosh(0.7), [], 20.1)
    .fromTo(inside, layerFull, { ...layerOnFile(cam, FILE), duration: 1, ease: 'power2.out', immediateRender: false }, 20.1)
    .to(inside, { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 20.5)
    .fromTo(cam, camOnFile(FILE), { ...camWide, duration: 1, ease: 'power2.out', immediateRender: false }, 20.1);
  stampFile(tl, fileStamp, 21.05);

  // the candle dies: cut stamped files only after Mission 03 is logged, then drop them toward reports
  tl.call(() => cutFiles(cam, pieces, [0, 1, 2]), [], 21.5)
    .fromTo(piecesLayer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01, immediateRender: false }, 21.55)
    .to(cam, { '--light': '-30vmax', duration: 0.7, ease: 'power1.in' }, 21.6);
  pieces.forEach((piece, i) => {
    const at = 22.2 + i * 0.35;
    tl.to(piece, { keyframes: { yPercent: [0, -1.2, 0.4, 0] }, duration: 0.14 }, at)
      .call(stamp, [], at)
      .call(() => whoosh(0.5), [], at + 0.12)
      .to(piece, { yPercent: 70, scale: 2.8, rotate: [-18, 12, -10][i], autoAlpha: 0, duration: 0.8, ease: 'power2.in' }, at + 0.12);
  });
  tl.set({}, {}, 23.8);

  // sound: the city, then the smoke and its silence, the rivers, the face-off; the Hallucination
  // shatters, dawn, and the candle dies
  placeIn(tl, 'candle', 0, 1.5);
  placeIn(tl, 'city', 1.5, 5.5);
  placeIn(tl, 'hush', 5.5, 12);
  placeIn(tl, 'river', 12, 14);
  placeIn(tl, 'hush', 14, 18.6);
  placeIn(tl, 'breeze', 18.6, 20.1);
  placeIn(tl, 'candle', 20.1, 21.6);
  placeIn(tl, 'hush', 21.6);
  suspense(tl, 4.9, 5.9, 1.2); // it rises over the city
  tl.call(() => { if (tl.scrollTrigger!.direction > 0) { shatter(); boom(1.2); } }, [], 17);

  // each hold fires the next citation: glide to the first one still ahead of the reader (the scroll position, not the
  // scrubbed timeline, which lags behind it); after the third, the hold finishes the fight
  onHold(holdBtn, () => {
    const st = tl.scrollTrigger!;
    const now = st.progress * tl.duration();
    const next = CITES.find((t) => t > now + 0.05) ?? FINISH;
    whoosh(1);
    glideTo(st.start + ((st.end - st.start) * (next + 0.05)) / tl.duration(), next === FINISH ? 1.8 : 1.2);
  }, 1, true);
}
