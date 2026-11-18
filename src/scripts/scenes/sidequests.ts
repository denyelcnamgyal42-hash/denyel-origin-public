// DENYEL — ORIGIN · Chapter 4 — two-quest map walk + dossiers
import { gsap } from 'gsap';
import { part, parts, scene } from '../core/dom';
import { placeOver } from '../audio/places';
import { stamp, whoosh } from '../audio/sound';
import { hide, stampTitle } from '../fx/comic';
import { createPageTurn } from '../fx/pageturn';

const ROUTE = 5.2; // walk length (two landmarks + trail)
const STRIDE = 0.0075;

function alongRoute(path: SVGPathElement, points: DOMPoint[]) {
  const len = path.getTotalLength();
  const steps = 600;
  const samples = Array.from({ length: steps + 1 }, (_, i) => path.getPointAtLength((len * i) / steps));
  let from = 0;
  return points.map((p) => {
    let best = from;
    for (let i = from; i <= steps; i++) {
      if (Math.hypot(samples[i].x - p.x, samples[i].y - p.y) < Math.hypot(samples[best].x - p.x, samples[best].y - p.y)) best = i;
    }
    from = best;
    return best / steps;
  });
}

function initDossiers(root: HTMLElement) {
  const openers = root.querySelectorAll<HTMLButtonElement>('[data-open]');
  const dossiers = [...root.querySelectorAll<HTMLDialogElement>('dialog[data-dossier]')];

  const open = (id: string, opener?: HTMLElement) => {
    const dialog = dossiers.find((d) => d.dataset.dossier === id);
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
    const closeBtn = dialog.querySelector<HTMLElement>('.quests__dossier-x, .quests__dossier-close');
    closeBtn?.focus();
    dialog.addEventListener(
      'close',
      () => opener?.focus(),
      { once: true },
    );
  };

  openers.forEach((btn) => {
    btn.addEventListener('click', () => open(btn.dataset.open!, btn));
  });

  dossiers.forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  });
}

export function initQuests() {
  const el = scene('quests');
  const p = (name: string) => part(el, name);
  const pin = el.querySelector<HTMLElement>('.scene__pin')!;
  const stage = p('stage'), leaf = p('leaf'), head = p('head'), cam = p('cam'), map = p('map'), ines = p('ines');
  const steps = parts(el, 'step');
  const turn = createPageTurn(p('front'), p('back'));
  const page = { turned: 0 };
  const ink = part<SVGPathElement>(el, 'route-ink');
  const places = parts(el, 'place'), labels = parts(el, 'label'), seals = parts(el, 'seal');
  const dots = parts(el, 'pin-dot');
  const phone = matchMedia('(max-width: 760px)');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  initDossiers(el);

  const len = ink.getTotalLength();
  const { width: W, height: H } = ink.ownerSVGElement!.viewBox.baseVal;
  const marks = alongRoute(ink, places.map((pl) => new DOMPoint(Number(pl.dataset.x), Number(pl.dataset.y))));

  const walk = { p: 0 };
  let pose = 0;
  const draw = () => {
    const at = len * walk.p;
    const next = Math.floor(at / (W * STRIDE)) % steps.length;
    if (next !== pose) {
      steps[pose].style.visibility = 'hidden';
      steps[next].style.visibility = 'visible';
      pose = next;
    }
    const tip = ink.getPointAtLength(at);
    const ahead = ink.getPointAtLength(Math.min(len, at + 6));
    ink.style.strokeDashoffset = String(len - at);
    ines.style.left = `${(tip.x / W) * 100}%`;
    ines.style.top = `${(tip.y / H) * 100}%`;
    gsap.set(ines, { scaleX: ahead.x < tip.x ? -1 : 1 });
    if (phone.matches) {
      const mw = map.offsetWidth;
      gsap.set(cam, { x: gsap.utils.clamp(innerWidth - mw, 0, innerWidth / 2 - (tip.x / W) * mw) });
    }
  };
  ink.style.strokeDasharray = String(len);
  draw();

  hide(stage, ines);
  stampTitle(el, head, 'top 35%');

  if (reduce.matches) {
    gsap.set(stage, { autoAlpha: 1 });
    gsap.set(labels, { '--inked': '130%' });
    dots.forEach((d) => d.classList.add('is-lit'));
    ink.style.strokeDashoffset = '0';
    placeOver(el, 'breeze', 'top 40%');
    parts(el, 'key').forEach((entry) => gsap.set(entry, { '--inked': '130%' }));
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: el,
      start: 'top top',
      end: () => (phone.matches ? '+=200%' : '+=230%'),
      pin,
      scrub: 1,
      onRefresh: () => {
        draw();
        turn(page.turned);
      },
    },
  });

  placeOver(el, 'breeze', 'top 40%');

  turn(0);
  tl.set(leaf, { visibility: 'visible' }, 0.001)
    .set(stage, { autoAlpha: 1 }, 0.001)
    .to(head, { yPercent: -30, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, 0.3)
    .call(() => whoosh(0.8), [], 0.55)
    .to(page, { turned: 1, duration: 1.4, ease: 'power1.inOut', onUpdate: () => turn(page.turned) }, 0.5)
    .fromTo(map, { scale: 1.08 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0.6)
    .set(leaf, { visibility: 'hidden' }, 1.95)

    .set(ines, { autoAlpha: 1 }, 2)
    .to(walk, { p: 1, duration: ROUTE, onUpdate: draw }, 2);

  marks.forEach((m, i) => {
    const at = 2 + m * ROUTE;
    tl.to(places[i], { keyframes: { yPercent: [0, -7, 0] }, duration: 0.3, ease: 'power2.out' }, at - 0.1)
      .call(stamp, [], at)
      .call(() => dots[i]?.classList.add('is-lit'), [], at)
      .fromTo(labels[i], { '--inked': '0%' }, { '--inked': '130%', duration: 0.5, ease: 'power1.out' }, at)
      .fromTo(seals[i], { scale: 0 }, { scale: 1, duration: 0.25, ease: 'back.out(3)' }, at);
  });

  // Scrub-safe: un-light dots when reversing past a stop
  marks.forEach((m, i) => {
    const at = 2 + m * ROUTE;
    tl.call(
      () => {
        if (tl.scrollTrigger && tl.scrollTrigger.direction < 0) dots[i]?.classList.remove('is-lit');
      },
      [],
      at - 0.01,
    );
  });

  tl.to({}, { duration: 0.7 });

  parts(el, 'key').forEach((entry) => {
    gsap.fromTo(
      entry,
      { '--inked': '0%' },
      {
        '--inked': '130%',
        duration: 0.8,
        ease: 'power1.out',
        scrollTrigger: { trigger: entry, start: 'top 85%', once: true },
      },
    );
  });
}
