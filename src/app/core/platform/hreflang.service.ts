import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

import { environment } from '@env/environment';

const SUPPORTED_LANGS = ['es', 'ca', 'en'] as const;

@Injectable({ providedIn: 'root' })
export class HreflangService {
  readonly #document = inject(DOCUMENT);

  /**
   * Injects `<link rel="alternate" hreflang="…">` tags into `<head>` for every
   * supported locale. Call once on app bootstrap. Idempotent — re-calling with
   * the same path updates existing tags instead of duplicating them.
   */
  apply(path = ''): void {
    const base = environment.baseUrl;
    const href = `${base}${path || '/'}`;

    for (const lang of SUPPORTED_LANGS) {
      this.#upsertLink(lang, href);
    }
    // x-default points to the canonical Spanish URL
    this.#upsertLink('x-default', href);
  }

  #upsertLink(hreflang: string, href: string): void {
    const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
    let el = this.#document.head.querySelector<HTMLLinkElement>(selector);
    if (!el) {
      el = this.#document.createElement('link');
      el.setAttribute('rel', 'alternate');
      el.setAttribute('hreflang', hreflang);
      this.#document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }
}
