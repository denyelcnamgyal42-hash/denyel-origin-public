// DENYEL — ORIGIN · Credential detail dialogs (Esc, focus return, no body scroll)
import { prefersReducedMotion } from '../core/env';

export function initCreds() {
  const openers = [...document.querySelectorAll<HTMLElement>('[data-cred-open]')];
  if (!openers.length) return;

  let lastOpener: HTMLElement | null = null;

  const open = (id: string, opener: HTMLElement) => {
    const dialog = document.getElementById(`cred-${id}`) as HTMLDialogElement | null;
    if (!dialog || typeof dialog.showModal !== 'function') return;
    lastOpener = opener;
    dialog.showModal();
    const title = dialog.querySelector<HTMLElement>('.cred__title');
    (title ?? dialog.querySelector<HTMLElement>('[data-cred-close]'))?.focus();
    if (!prefersReducedMotion()) dialog.dataset.open = '1';
  };

  const close = (dialog: HTMLDialogElement) => {
    if (dialog.open) dialog.close();
  };

  openers.forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-cred-open');
      if (id) open(id, el);
    });
  });

  document.querySelectorAll<HTMLDialogElement>('dialog[data-cred]').forEach((dialog) => {
    dialog.querySelectorAll<HTMLButtonElement>('[data-cred-close]').forEach((btn) => {
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
