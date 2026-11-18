// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Chapter 1: the camera travels through the Bizerte panels, dives into the light, and ink closes the chapter.
// Sound: waves on the quay; a rumble builds on the push, holds its breath, and a boom lands on the cut; her steps;
// the rumble rises again into the light and the ink swallows it.
import { gsap } from 'gsap';
import { caption, part, scene } from '../core/dom';
import { glideTo } from '../core/scroll';
import { placeIn } from '../audio/places';
import { step, whoosh } from '../audio/sound';
import { captionIn, captionOut, hide, impact, speedFlash, suspense } from '../fx/comic';
import { onHold } from '../fx/hold';
import { createInkWipe } from '../fx/inkwipe';
import { liveFrame } from '../fx/living';

export function initOrigin() {
  const el = scene('origin');
  const p = (name: string) => part(el, name);
  const [cap1, cap2, cap3] = [1, 2, 3].map((n) => caption(el, n));
  const panel = p('panel'), cam = p('cam'), wide = p('wide'), port = p('port'), ines = p('ines');
  const eyes = p('eyes'), hand = p('hand'), speed = p('speed');
  const holdBtn = el.querySelector<HTMLElement>('[data-hold="dive"]')!;
  const wipe = createInkWipe(part<HTMLCanvasElement>(el, 'inkwipe'));
  const ink = { p: 0 };
  let lastStep = 0;

  // the drawings breathe: clouds drift, the sea shimmers, her hijab and abaya move in the wind
  liveFrame(port);
  const walker = liveFrame(ines, { boil: 0.0006, lift: 0.006 });
  const STEPS = 4; // she takes four steps from the edge of the frame to her place

  hide(port, ines, cap1, cap2, cap3);
  gsap.set(ines, { xPercent: 60 });
  gsap.set(eyes, { xPercent: -130, rotate: -3, autoAlpha: 0 });
  gsap.set(hand, { yPercent: 160, rotate: 2, autoAlpha: 0 });

  // the panel opens while the section is still rising, so there is no empty paper
  gsap.fromTo(panel, { clipPath: 'inset(50% 0 50% 0)' }, {
    clipPath: 'inset(0% 0 0% 0)', duration: 1.1, ease: 'power3.inOut',
    scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
  });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: el, start: 'top top', end: '+=600%', pin: panel.parentElement, scrub: 1 },
  });

  // the harbour is heard until the ink swallows the light (and over the empty paper just before)
  placeIn(tl, 'harbour', -0.5, 6.35);

  // establishing shot: slow push towards the small figure by the water, the rumble growing
  tl.fromTo(cam, { scale: 1.05 }, { scale: 1.6, transformOrigin: '68% 62%', duration: 2.4 }, 0);
  suspense(tl, 0.6, 2.35);
  captionIn(tl, cap1, 0.5);
  captionOut(tl, cap1, 2);

  // cut: the closer shot, she walks into the frame, close-ups land
  speedFlash(tl, speed, 2.3);
  tl.set(cam, { scale: 1, transformOrigin: '50% 50%' }, 2.4)
    .to(port, { autoAlpha: 1, duration: 0.25 }, 2.4)
    .to(wide, { autoAlpha: 0, duration: 0.25 }, 2.5)
    .to(ines, {
      autoAlpha: 1, xPercent: 0, duration: 1.2, ease: 'power2.out',
      onUpdate: () => {
        const steps = ((60 - Number(gsap.getProperty(ines, 'xPercent'))) / 60) * STEPS;
        walker.walk(steps);
        if (Math.floor(steps) !== lastStep) step();
        lastStep = Math.floor(steps);
      },
    }, 2.5)
    .to(eyes, { xPercent: 0, rotate: -2, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.6)' }, 2.9)
    .to(hand, { yPercent: 0, rotate: 1, autoAlpha: 1, duration: 0.7, ease: 'back.out(1.6)' }, 3.6)
    .to(cam, { scale: 1.08, duration: 1.6 }, 3);
  impact(tl, panel, 3.1);
  captionIn(tl, cap2, 3.1);
  impact(tl, panel, 3.8);
  captionOut(tl, cap2, 4.3);
  captionIn(tl, cap3, 4.4);

  // the HOLD invitation (scrolling also works), then the dive into the light
  tl.to(holdBtn, { autoAlpha: 1, duration: 0.2 }, 4.8)
    .to(holdBtn, { autoAlpha: 0, duration: 0.15 }, 5.5);
  captionOut(tl, cap3, 5.4);
  tl.to(eyes, { xPercent: -140, rotate: -6, duration: 0.6, ease: 'power2.in' }, 5.4)
    .to(hand, { yPercent: 170, rotate: 5, duration: 0.6, ease: 'power2.in' }, 5.4)
    .to(ines, { autoAlpha: 0, xPercent: -30, duration: 0.5 }, 5.6)
    .call(() => whoosh(1.2), [], 5.7)
    .to(speed, { opacity: 0.85, scale: 1.4, duration: 0.8, ease: 'power2.in' }, 5.7)
    .to(cam, { scale: 4.2, transformOrigin: '54% 22%', duration: 1.2, ease: 'power2.in' }, 5.7)
    .to(p('tag'), { autoAlpha: 0, duration: 0.3 }, 5.8)
    // real brush-stroke ink bleeds in from the edges and swallows the light
    .call(() => whoosh(0.6), [], 6.2)
    .to(ink, { p: 1, duration: 1.5, ease: 'power1.inOut', onUpdate: () => wipe.set(ink.p) }, 6.1)
    .to(speed, { opacity: 0, duration: 0.4 }, 6.8);

  suspense(tl, 5.4, 6.35, 1.3);

  onHold(holdBtn, () => glideTo(tl.scrollTrigger!.end));
}
