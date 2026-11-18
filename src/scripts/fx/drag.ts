// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// DRAG: pick an element up and drop it on a target. Dropped on the target, onHit runs once;
// dropped anywhere else, it springs back. Enter / Space on the focused element counts as a drop.
import { gsap } from 'gsap';
import { whoosh } from '../audio/sound';

const overlaps = (a: DOMRect, b: DOMRect) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

export function onDragTo(el: HTMLElement, target: HTMLElement, onHit: () => void) {
  let from: { x: number; y: number } | null = null;
  let done = false;

  el.addEventListener('pointerdown', (e) => {
    if (done) return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    from = { x: e.clientX - Number(gsap.getProperty(el, 'x')), y: e.clientY - Number(gsap.getProperty(el, 'y')) };
    gsap.to(el, { scale: 1.08, rotate: -4, duration: 0.2 });
  });
  el.addEventListener('pointermove', (e) => {
    if (from) gsap.set(el, { x: e.clientX - from.x, y: e.clientY - from.y });
  });
  const drop = () => {
    if (!from) return;
    from = null;
    if (overlaps(el.getBoundingClientRect(), target.getBoundingClientRect())) hit();
    else gsap.to(el, { x: 0, y: 0, scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)' });
  };
  const hit = () => {
    done = true;
    whoosh(0.6);
    onHit();
  };
  el.addEventListener('pointerup', drop);
  el.addEventListener('pointercancel', drop);
  el.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && !done) { e.preventDefault(); hit(); } });
}
