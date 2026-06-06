// ============================================================================
// translation.service.ts — festiVAL · Shared · runtime translator
// ============================================================================
// Adapts between the internal `t(key)` API and Transloco. When Transloco is
// provided (production, via app.config.ts), all translation calls delegate to
// it and language switching is fully reactive. When Transloco is absent (unit
// tests), the service falls back to the static ES_TRANSLATIONS bundle so tests
// need zero extra setup.
// ============================================================================

import { Injectable, Signal, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';

import { ES_TRANSLATIONS, type TranslationKey, type Translations } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly #transloco = inject(TranslocoService, { optional: true });
  readonly #static = signal<Translations>(ES_TRANSLATIONS);

  /**
   * Signal that emits the active language code whenever the user switches
   * language. Consumers can use this to react to locale changes.
   */
  readonly activeLang: Signal<string> = this.#transloco
    ? toSignal(this.#transloco.langChanges$, {
        initialValue: this.#transloco.getActiveLang(),
      })
    : signal('es');

  /**
   * Resolve a dotted key (`nav.home`, `home.hero.title`) in the active locale.
   * Falls back to the Spanish static bundle and finally to the raw key so
   * templates never throw.
   */
  t(key: TranslationKey): string {
    if (this.#transloco) {
      const value = this.#transloco.translate<string>(key);
      // Transloco returns the key itself when the key is not yet loaded
      return value !== key ? value : (resolveKey(this.#static(), key) ?? key);
    }
    return resolveKey(this.#static(), key) ?? key;
  }

  /** Switch the active language (no-op when Transloco is not available). */
  setLang(lang: 'es' | 'ca' | 'en'): void {
    this.#transloco?.setActiveLang(lang);
  }

  /** Replace the static dictionary — used by tests. */
  setTranslations(next: Translations): void {
    this.#static.set(next);
  }
}

function resolveKey(dict: Translations, key: string): string | undefined {
  const segments = key.split('.');
  let cursor: unknown = dict;

  for (const segment of segments) {
    if (cursor && typeof cursor === 'object' && segment in cursor) {
      cursor = (cursor as Record<string, unknown>)[segment];
      continue;
    }
    return undefined;
  }

  return typeof cursor === 'string' ? cursor : undefined;
}
