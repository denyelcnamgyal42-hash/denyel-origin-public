// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// HOLD: press and keep pressed to fill the ring; releasing early drains it.
// rearm: the button can be held again after each completion (several hits in a row).
import { gsap } from 'gsap';
import { charge, stamp } from '../audio/sound';

const RING = 289; // circumference of the r=46 ring

export function onHold(btn: HTMLElement, onDone: () => void, seconds = 1.3, rearm = false) {
  const ring = btn.querySelector<SVGCircleElement>('.hold__ring')!;
  const state = { p: 0 };
  let tween: gsap.core.Tween | null = null;
  let hum: ReturnType<typeof charge> | null = null;
  let done = false;

  const draw = () => {
    ring.style.strokeDashoffset = String(RING * (1 - state.p));
    const jitter = 4 * state.p;
    gsap.set(btn, { scale: 1 + state.p * 0.12, x: gsap.utils.random(-jitter, jitter), y: gsap.utils.random(-jitter, jitter) });
    hum?.set(state.p);
  };

  const press = (e: Event) => {
    e.preventDefault();
    if (done) return;
    hum = charge();
    tween?.kill();
    tween = gsap.to(state, {
      p: 1, duration: seconds * (1 - state.p), ease: 'none', onUpdate: draw,
      onComplete: () => {
        hum?.stop();
        stamp();
        onDone();
        if (rearm) {
          state.p = 0;
          draw();
          gsap.fromTo(btn, { scale: 1.35 }, { scale: 1, x: 0, y: 0, duration: 0.5, ease: 'back.out(2)' });
          return;
        }
        done = true;
        gsap.to(btn, { scale: 1.6, autoAlpha: 0, x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
      },
    });
  };

  const release = () => {
    if (done) return;
    hum?.stop();
    hum = null;
    tween?.kill();
    tween = gsap.to(state, { p: 0, duration: 0.5, ease: 'power2.out', onUpdate: draw });
  };

  btn.addEventListener('pointerdown', press);
  for (const ev of ['pointerup', 'pointerleave', 'pointercancel']) btn.addEventListener(ev, release);
  btn.addEventListener('contextmenu', (e) => e.preventDefault());
  btn.addEventListener('keydown', (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) press(e); });
  btn.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') release(); });
}
