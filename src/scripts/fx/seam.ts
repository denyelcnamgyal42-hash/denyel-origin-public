// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// A scene that overlaps the last screen of the previous one (.seam pulls it up by one screen) and
// stays hidden while it scrolls in. It takes over when it reaches the top, exactly where the previous
// scene ended, so there is no dead scroll between them (the missions on their board, Chapter 5 → 6).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function joinPrevious(section: HTMLElement) {
  ScrollTrigger.create({
    trigger: section, start: 'top bottom', end: 'top top',
    onToggle: (st) => gsap.set(section, { visibility: st.isActive ? 'hidden' : 'visible' }),
  });

  // Each mission mounts its own fixed MissionBoard. During the -100svh seam both section
  // clip-boxes share the viewport, so two boards (and their LOGGED stamps) would stack.
  // Hide the previous board the moment this scene takes the pin; restore it on scroll-back.
  const prevBoard = previousBoard(section);
  if (!prevBoard) return;

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    onEnter: () => gsap.set(prevBoard, { autoAlpha: 0 }),
    onLeaveBack: () => gsap.set(prevBoard, { autoAlpha: 1 }),
  });
}

function previousBoard(section: HTMLElement): HTMLElement | null {
  let prev = section.previousElementSibling as HTMLElement | null;
  while (prev) {
    const board = prev.querySelector<HTMLElement>('.board');
    if (board) return board;
    prev = prev.previousElementSibling as HTMLElement | null;
  }
  return null;
}
