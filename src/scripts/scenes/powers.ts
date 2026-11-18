// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Chapter 5: over the end of the map, speed lines rush in from the edges until their bright centre
// fills the screen and the title stamps on it. Then the camera pulls back: the burst shrinks onto the
// panel of the character file, the page appears around it, she steps out of the frame (her clipping
// box opens past it while she grows toward the reader) and every skill group is stamped on, with a
// rose seal on its signature skill. Desktop pins the page; phones scroll it, the burst follows the panel.
import { gsap } from 'gsap';
import { part, parts, scene } from '../core/dom';
import { placeOver } from '../audio/places';
import { boom, breath, stamp, tension, whoosh } from '../audio/sound';
import { hide, stampTitle } from '../fx/comic';

const OUT = 'inset(-14% -5% 3px -5%)'; // open past the frame; keep head inside the viewport

export function initPowers() {
  const el = scene('power');
  const pin = el.querySelector<HTMLElement>('.power__pin')!;
  const rush = part(el, 'rush'), head = part(rush, 'head');
  const frame = part(el, 'frame'), panel = part(el, 'panel'), burst = part(el, 'burst'), out = part(el, 'out'), ines = part(el, 'ines');
  const groups = parts(el, 'group'), seals = parts(el, 'seal');
  const page = [...el.querySelectorAll<HTMLElement>('.power__head, .power__faces')];

  // the burst sits over the whole screen at back = 0 and exactly on the panel at back = 1
  const cam = { back: 0 };
  const place = () => {
    const r = panel.getBoundingClientRect(), k = cam.back;
    // in screen units, so it can never be wider than the screen (a stale pixel width would widen the phone page)
    gsap.set(rush, { left: r.left * k, top: r.top * k, width: `calc(${1 - k} * 100vw + ${r.width * k}px)`, height: `calc(${1 - k} * 100svh + ${r.height * k}px)` });
  };

  // the speed lines close in from the edges as the chapter scrolls up over the map; the rumble grows
  // with them, holds its breath as the centre fills the screen, and the boom lands with the title
  let held = false;
  gsap.timeline({
    scrollTrigger: {
      trigger: el, start: 'top bottom', end: 'top top', scrub: true, onEnter: () => whoosh(0.8),
      onUpdate: (s) => {
        tension(s.progress < 0.95 ? s.progress : 0);
        if (s.progress > 0.92 && s.direction > 0 && !held) breath();
        held = s.progress > 0.92;
      },
      onLeave: () => { tension(0); boom(1.1); },
      onLeaveBack: () => tension(0),
    },
  })
    .set(rush, { visibility: 'visible' }, 0)
    .fromTo(rush, { '--r': '62vmax' }, { '--r': '-14vmax', duration: 1, ease: 'sine.inOut' }, 0);
  stampTitle(el, head, 'top 8%');

  gsap.matchMedia().add({ desk: '(min-width: 761px)', phone: '(max-width: 760px)' }, (ctx) => {
    const { desk } = ctx.conditions as { desk: boolean };
    hide(panel, ines, ...page);
    place();

    // the camera pulls back: the title goes, the burst shrinks onto the panel, the page comes in around it
    const back = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: desk
        ? { trigger: el, start: 'top top', end: '+=210%', pin, scrub: 1, onUpdate: place, onRefresh: place }
        : { trigger: el, start: 'top top', end: '+=60%', scrub: 1, onUpdate: place, onRefresh: place },
    })
      .to(head, { autoAlpha: 0, yPercent: -20, duration: 0.25, ease: 'power2.in' }, 0.2)
      .to(cam, { back: 1, duration: 0.6, ease: 'power2.inOut', onUpdate: place }, 0.35)
      .fromTo(page, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.1 }, 0.6)
      .set([panel, ines], { autoAlpha: 1 }, 0.95)
      .set(rush, { autoAlpha: 0 }, 0.95)
      .call(stamp, [], 0.95);
    if (!desk) back.to({}, { duration: 0.05 });

    // she steps out: the clip opens past the frame while she grows toward the reader
    const step = desk ? back : gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: frame, start: 'top 55%', end: 'bottom 35%', scrub: 1 } });
    const at = desk ? 1 : 0;
    step.fromTo(ines, { scale: 0.9, yPercent: 3 }, { scale: 1, yPercent: 0, duration: 1, ease: 'power2.inOut' }, at)
      .fromTo(out, { clipPath: 'inset(3px calc(15.5% + 3px) 3px calc(15.5% + 3px))' }, { clipPath: OUT, duration: 0.35, ease: 'power2.out' }, at + 0.3)
      .fromTo(burst, { scale: 1.15 }, { scale: 1, duration: 1 }, at);

    // the skill groups are stamped on, each with the seal on its signature skill (desktop: in the pin)
    if (desk) {
      groups.forEach((g, i) => {
        const t = at + 0.25 + i * 0.09;
        back.fromTo(g, { autoAlpha: 0, scale: 1.25 }, { autoAlpha: 1, scale: 1, duration: 0.12, ease: 'power3.in' }, t).call(stamp, [], t + 0.12);
      });
      back.fromTo(seals, { scale: 0, rotate: -30 }, { scale: 1, rotate: -4, duration: 0.15, stagger: 0.09, ease: 'back.out(3)' }, at + 0.4)
        .to({}, { duration: 0.3 });
    } else {
      groups.forEach((g) => {
        gsap.from(g, { autoAlpha: 0, y: 24, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: g, start: 'top 88%', once: true }, onComplete: stamp });
      });
    }
  });

  placeOver(el, 'hush', 'top 50%'); // made after the pin, so it counts it
}
