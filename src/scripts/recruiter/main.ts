// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// Entry point of recruiter mode (/recruiter/): no smooth-scroll or animation library here, the page
// stays light. The transition in from the story, the top bar, the peelable stickers, the click stamps,
// the cat, things that land as they come into view, the mini Ines beside the mouse, the stacks of photo
// prints, the folders stacked on each other, the skills' "used in" notes, the contact note's copy button, the cat hunt.
import { initBleed, settleBleed } from '../fx/colourbleed';
import { initBar } from './bar';
import { initPeel } from './peel';
import { initStamps } from './stamps';
import { initLand } from './land';
import { initBuddy } from './buddy';
import { initShots } from './shots';
import { initFolders } from './folders';
import { initContact } from './contact';
import { initHunt } from './hunt';
import { initCases } from './cases';
import { initCreds } from './creds';

export function start() {
  settleBleed();
  initBleed();
  initBar();
  initPeel();
  initStamps();
  // Mascot removed: placeholder art + speech bubble cluttered Recruiter Mode.
  initLand();
  initBuddy();
  initShots();
  initFolders();
  initCases();
  initCreds();
  initContact();
  initHunt();
}
