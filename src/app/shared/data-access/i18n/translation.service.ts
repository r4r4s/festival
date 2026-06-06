// ============================================================================
// translation.service.ts — festiVAL · Shared · runtime translator
// ============================================================================
// Signals-based MVP translator. Holds the active locale dictionary and
// resolves dotted keys (`nav.home`, `home.hero.title`). When Transloco lands
// in the multilingual phase, only this file is replaced — consumers keep
// calling `t(key)` and the pipe stays untouched.
// ============================================================================

import { Injectable, Signal, computed, signal } from '@angular/core';

import { ES_TRANSLATIONS, type TranslationKey, type Translations } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly active = signal<Translations>(ES_TRANSLATIONS);

  /** Read-only view of the active dictionary (for advanced consumers). */
  readonly translations: Signal<Translations> = computed(() => this.active());

  /**
   * Resolve a dotted key against the active dictionary. Falls back to the
   * key itself if the path is missing — never throws so templates stay safe.
   */
  t(key: TranslationKey): string {
    return resolveKey(this.active(), key) ?? key;
  }

  /** Replace the active dictionary (used by tests and the future locale switcher). */
  setTranslations(next: Translations): void {
    this.active.set(next);
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
