// DENYEL — ORIGIN · Mission 02 · Dzonglish NLP
// dive into file 02 → language-data vault → noisy samples → annotation merge →
// quality gate rejects bad token labels (auto demo + optional DRAG) → language ID / normalize beat →
// fold back into file 02, stamped complete.
import { gsap } from 'gsap';
import { caption, part, parts, scene } from '../core/dom';
import { glideTo } from '../core/scroll';
import { placeIn } from '../audio/places';
import { stamp, whoosh } from '../audio/sound';
import { camOnFile, camWide, glanceAt, layerFull, layerOnFile, stampFile } from '../fx/board';
import { joinPrevious } from '../fx/seam';
import { captionIn, captionOut, hide, impact, panAcross, speedFlash, suspense } from '../fx/comic';
import { onDragTo } from '../fx/drag';
import { leads } from '../../data/story';

const FILE = 1;          // Leads Provider is the second file on the board
const REJECTED = 8.05;   // timeline time once the record has bounced off the gate: where DRAG glides to

export function initLeads() {
  const el = scene('leads');
  const p = (name: string) => part(el, name);
  const cap = (name: string) => caption(el, name);
  const pin = el.querySelector<HTMLElement>('.scene__pin')!;
  const stage = p('stage'), inside = p('inside'), speed = p('speed');
  const cam = p('board-cam'), fileStamp = parts(el, 'file-stamp')[FILE];
  const bursts = parts(el, 'burst');
  const vault = p('vault'), storm = p('storm'), fly = p('fly');
  const countCompanies = el.querySelector<HTMLElement>('[data-part="count-companies"]');
  const companies = el.querySelector<HTMLElement>('[data-part="companies"]');
  const merge = p('merge'), gate = p('gate'), passage = p('passage');
  const reject = p('reject'), record = p('record'), x = p('x');
  const rejectedNote = el.querySelector<HTMLElement>('[data-part="rejected"]');
  const street = p('windows'), map = p('map'), darks = parts(el, 'dark');
  const countReach = el.querySelector<HTMLElement>('[data-part="count-reach"]');
  const counts = { companies: 0 };
  const sampleN = typeof leads.sfx.companies === 'number' ? leads.sfx.companies : 0;

  hide(stage, inside, storm, fly, merge, gate, reject, street, ...bursts);
  if (rejectedNote) {
    rejectedNote.hidden = true;
    hide(rejectedNote);
  }
  if (countCompanies) hide(countCompanies);
  if (countReach) hide(countReach);
  hide(...Object.keys(leads.captions).map(cap));
  // Mission 01 stays logged via data-done; keep Mission 03 unlogged until its own scene
  parts(el, 'file-stamp').forEach((s, i) => {
    if (i > FILE) gsap.set(s, { autoAlpha: 0, clearProps: 'scale,rotate' });
  });
  gsap.set(cam, glanceAt(FILE)); // the previous mission ends leaning toward this file
  joinPrevious(el);

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: el, start: 'top top', end: '+=780%', pin, scrub: 1, invalidateOnRefresh: true },
  });

  // the camera dives into file 02 and the dossier bursts into a storm of sheets
  tl.set(stage, { autoAlpha: 1 }, 0.001)
    .call(() => whoosh(0.8), [], 0.1)
    .fromTo(cam, glanceAt(FILE), { ...camOnFile(FILE), duration: 1, ease: 'power2.in', immediateRender: false }, 0.1);
  bursts.forEach((b, i) => {
    tl.fromTo(b, { autoAlpha: 0, scale: 0.12, rotate: i ? 40 : -30 }, { autoAlpha: 1, scale: i ? 2.6 : 1.7, rotate: i ? -10 : 12, duration: 0.7, ease: 'power2.in' }, 0.75 + i * 0.12)
      .to(b, { scale: i ? 5 : 3.6, autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 1.45 + i * 0.12);
  });
  tl.set(inside, { autoAlpha: 1 }, 1.4)
    // the archive vault: the camera comes down the stairs and into the stacks
    .fromTo(vault, { scale: 1.4, transformOrigin: '18% 30%' }, { scale: 1.05, transformOrigin: '62% 70%', duration: 2.2, ease: 'power1.inOut' }, 1.4);
  captionIn(tl, cap('vault'), 1.7);
  captionOut(tl, cap('vault'), 2.6);
  captionIn(tl, cap('brief'), 2.7);
  captionOut(tl, cap('brief'), 3.5);

  // she stands in the eye of the paper storm and stops it: the count of clean companies climbs
  tl.call(() => whoosh(1), [], 3.5)
    .to(vault, { autoAlpha: 0.25, duration: 0.6 }, 3.5)
    .fromTo(storm, { autoAlpha: 0, scale: 0.8, rotate: -6 }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6, ease: 'power3.out' }, 3.6)
    .fromTo(fly, { autoAlpha: 1, xPercent: 45, yPercent: 10, rotate: 8 }, { xPercent: -45, yPercent: -12, rotate: -6, duration: 1.5 }, 3.6)
    .to(fly, { autoAlpha: 0, duration: 0.3 }, 4.8);
  if (countCompanies && companies && sampleN > 0) {
    tl.fromTo(countCompanies, { autoAlpha: 0, scale: 1.6 }, { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'power3.out' }, 3.8)
      .to(counts, {
        companies: sampleN, duration: 1.2, ease: 'power2.out',
        onUpdate: () => (companies.textContent = Math.round(counts.companies).toLocaleString('en') + (counts.companies >= sampleN ? '+' : '')),
      }, 3.8);
    impact(tl, countCompanies, 5);
  } else {
    impact(tl, storm, 5);
  }
  captionIn(tl, cap('storm'), 3.9);
  captionOut(tl, cap('storm'), 5.1);

  // the duplicates melt into one record
  tl.fromTo(merge, { autoAlpha: 0, xPercent: 50, rotate: 8 }, { autoAlpha: 1, xPercent: 0, rotate: 1.5, duration: 0.3, ease: 'power4.in' }, 5.1);
  impact(tl, merge, 5.4);
  captionIn(tl, cap('merge'), 5.3);
  captionOut(tl, cap('merge'), 6.1);

  // quality gate: demo auto-rejects a bad annotation, then the visitor can drag one too
  speedFlash(tl, speed, 6.1);
  tl.to([vault, storm, merge, ...(countCompanies ? [countCompanies] : [])], { autoAlpha: 0, duration: 0.3 }, 6.1)
    .fromTo(gate, { autoAlpha: 0, scale: 1.1 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' }, 6.15)
    .call(() => {
      gsap.set(record, { clearProps: 'transform,opacity,visibility' });
      if (rejectedNote) {
        rejectedNote.hidden = true;
        gsap.set(rejectedNote, { autoAlpha: 0 });
      }
    }, [], 6.5)
    .fromTo(reject, { autoAlpha: 0, x: 0, y: 40, rotate: 0 }, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power3.out' }, 6.55)
    .to(record, {
      x: () => centre(passage).x - restCentre(record).x, y: () => centre(passage).y - restCentre(record).y,
      duration: 0.35, ease: 'power2.in',
    }, 7.1)
    .set(x, { visibility: 'visible' }, 7.45)
    .fromTo(x, { scale: 3, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.15, ease: 'power4.in' }, 7.45)
    .call(() => {
      if (rejectedNote) {
        rejectedNote.hidden = false;
        gsap.fromTo(rejectedNote, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25 });
      }
    }, [], 7.5)
    .to(record, { x: '-=240', y: '+=160', rotate: -28, duration: 0.5, ease: 'power2.out' }, 7.5)
    .to(record, { autoAlpha: 0, duration: 0.25 }, 7.85)
    .to(reject, { autoAlpha: 0, duration: 0.2 }, 8);
  impact(tl, gate, 7.45);
  captionIn(tl, cap('gate'), 6.55);
  captionOut(tl, cap('gate'), 8.05);

  // six windows out of ten light up along the street
  tl.to(gate, { autoAlpha: 0, duration: 0.3 }, 8.05)
    .fromTo(street, { autoAlpha: 0, yPercent: 20 }, { autoAlpha: 1, yPercent: 0, duration: 0.5, ease: 'power3.out' }, 8.1);
  panAcross(tl, map, street, 8.3, 1.7);
  darks.forEach((d, i) => {
    const at = 8.55 + i * 0.25;
    tl.fromTo(d, { clipPath: 'inset(0 0 0% 0)' }, { clipPath: 'inset(0 0 100% 0)', duration: 0.18, ease: 'power2.out' }, at)
      .call(stamp, [], at);
  });
  if (countReach) {
    tl.fromTo(countReach, { autoAlpha: 0, scale: 2, rotate: -10 }, { autoAlpha: 1, scale: 1, rotate: -4, duration: 0.25, ease: 'power4.in' }, 9.85);
    impact(tl, countReach, 10.1);
  } else {
    impact(tl, street, 10.1);
  }
  captionIn(tl, cap('windows'), 8.5);
  captionOut(tl, cap('windows'), 10.5);

  // the camera pulls back: the mission folds into file 02, stamped; a look at the last file
  tl.call(() => whoosh(0.7), [], 10.5)
    .fromTo(inside, layerFull, { ...layerOnFile(cam, FILE), duration: 1, ease: 'power2.out', immediateRender: false }, 10.5)
    .to(inside, { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 10.9)
    .fromTo(cam, camOnFile(FILE), { ...camWide, duration: 1, ease: 'power2.out', immediateRender: false }, 10.5);
  stampFile(tl, fileStamp, 11.45);
  captionIn(tl, cap('next'), 11.8);
  tl.to(cam, { ...glanceAt(FILE + 1), duration: 0.8 }, 11.8)
    .set({}, {}, 12.4);

  // sound: the paper storm until she stops it, the quiet of the archive, the street, the board again
  placeIn(tl, 'candle', 0, 0.6);
  placeIn(tl, 'storm', 0.6, 3.5);
  placeIn(tl, 'hush', 3.5, 8.05);
  placeIn(tl, 'breeze', 8.05, 10.5);
  placeIn(tl, 'candle', 10.5);
  suspense(tl, 2.9, 3.5); // she stops the storm

  // DRAG: reject a bad annotation at the gate, then continue the story
  onDragTo(record, passage, () => {
    gsap.timeline()
      .set(x, { visibility: 'visible' })
      .fromTo(x, { scale: 3, rotate: -30 }, { scale: 1, rotate: 0, duration: 0.15, ease: 'power4.in' })
      .call(stamp)
      .call(() => {
        if (rejectedNote) {
          rejectedNote.hidden = false;
          gsap.fromTo(rejectedNote, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25 });
        }
      })
      .to(record, { x: '-=240', y: '+=180', rotate: -30, duration: 0.6, ease: 'power2.out' })
      .to(record, { autoAlpha: 0, duration: 0.3 }, '-=0.2')
      .call(() => {
        const st = tl.scrollTrigger!;
        glideTo(st.start + ((st.end - st.start) * REJECTED) / tl.duration(), 1.4);
      });
  });
}

function centre(el: Element) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

// where an element sits before the timeline moved it
function restCentre(el: HTMLElement) {
  const c = centre(el);
  return { x: c.x - Number(gsap.getProperty(el, 'x')), y: c.y - Number(gsap.getProperty(el, 'y')) };
}
