// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Entry point: wires the gate, the scenes and the effects together.
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, hasFinePointer } from './core/env';
import { initSmoothScroll } from './core/scroll';
import { enableSound, disableSound, isSoundOn } from './audio/sound';
import { initPlaces } from './audio/places';
import { initCursor, initParallax } from './fx/pointer';
import { initBleed, settleBleed } from './fx/colourbleed';
import { initGate } from './scenes/gate';
import { initTitle, playTitleIntro } from './scenes/title';
import { initOrigin } from './scenes/origin';
import { initTraining } from './scenes/training';
import { initCerts } from './scenes/certs';
import { initTabaani } from './scenes/tabaani';
import { initLeads } from './scenes/leads';
import { initTalan } from './scenes/talan';
import { initReport } from './scenes/report';
import { initQuests } from './scenes/sidequests';
import { initPowers } from './scenes/powers';
import { initFinale } from './scenes/finale';

function initSoundToggle() {
  const btn = document.querySelector<HTMLButtonElement>('[data-sound]')!;
  const set = (on: boolean) => {
    on ? enableSound() : disableSound();
    btn.setAttribute('aria-pressed', String(on));
  };
  btn.addEventListener('click', () => set(!isSoundOn()));
  return set;
}

// start loading the next chapters' images while the visitor reads the first one
function preloadLaterChapters() {
  ScrollTrigger.create({
    trigger: '[data-scene="origin"]',
    start: 'top bottom',
    once: true,
    onEnter: () => document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => (img.loading = 'eager')),
  });
}

export function start() {
  const motion = !prefersReducedMotion();
  const setSound = initSoundToggle();
  initPlaces();
  initBleed();
  settleBleed();

  if (hasFinePointer()) initCursor();
  // Credential dialogs must work even with reduced motion; animation is gated inside initCerts.
  initCerts();

  if (motion) {
    initSmoothScroll();
    initTitle();
    initOrigin();
    initTraining();
    initTabaani();
    initLeads();
    initTalan();
    initReport();
    initQuests();
    initPowers();
    initFinale();
    preloadLaterChapters();
    if (hasFinePointer()) initParallax();
  }

  initGate((withSound) => {
    if (withSound) setSound(true);
    if (motion) playTitleIntro();
  });
}
