// DENYEL — ORIGIN · Featured project case-study dialogs (focus return, Esc, no body scroll)
import { prefersReducedMotion } from '../core/env';

export function initCases() {
  const openers = [...document.querySelectorAll<HTMLButtonElement>('[data-case-open]')];
  if (!openers.length) return;

  let lastOpener: HTMLButtonElement | null = null;

  const open = (id: string, opener: HTMLButtonElement) => {
    const dialog = document.getElementById(`case-${id}`) as HTMLDialogElement | null;
    if (!dialog || typeof dialog.showModal !== 'function') return;
    lastOpener = opener;
    dialog.showModal();
    const title = dialog.querySelector<HTMLElement>('.case__title');
    (title ?? dialog.querySelector<HTMLElement>('[data-case-close]'))?.focus();
    if (!prefersReducedMotion()) dialog.dataset.open = '1';
  };

  const close = (dialog: HTMLDialogElement) => {
    if (!dialog.open) return;
    dialog.close();
  };

  openers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-case-open');
      if (id) open(id, btn);
    });
  });

  document.querySelectorAll<HTMLDialogElement>('dialog[data-case]').forEach((dialog) => {
    dialog.querySelectorAll<HTMLButtonElement>('[data-case-close]').forEach((btn) => {
      btn.addEventListener('click', () => close(dialog));
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) close(dialog);
    });

    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      close(dialog);
    });

    dialog.addEventListener('close', () => {
      lastOpener?.focus();
      lastOpener = null;
    });
  });
}
