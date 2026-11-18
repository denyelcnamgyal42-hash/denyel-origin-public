// VOL.01 · Ines Cherif · github.com/inesCherif/vol01-manga-portfolio · MIT (code only; art, story and CV are all rights reserved, see LICENSE-ASSETS)
// The contact note's "Copy" button: copies her email address, says "Copied!" for a moment and pops a heart.
import { stampAt } from './stamps';

export function initContact() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    const word = btn.querySelector('span')!;
    const idle = word.textContent;
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy!);
      } catch {
        return; // no clipboard (an old browser, an insecure page): the address stays readable on the note
      }
      word.textContent = btn.dataset.copied!;
      btn.classList.add('is-done');
      const box = btn.getBoundingClientRect();
      stampAt(box.right - 6, box.top - 4, 'heart');
      setTimeout(() => { word.textContent = idle; btn.classList.remove('is-done'); }, 1800);
    });
  });
}
