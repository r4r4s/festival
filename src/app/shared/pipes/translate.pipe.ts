// ============================================================================
// translate.pipe.ts — festiVAL · Shared · i18n binding for templates
// ============================================================================
// Use:  {{ 'nav.home' | t }}
// Pure pipe — re-evaluates when the input key changes or when the active
// dictionary signal updates (Angular's signal-aware change detection covers
// the latter).
// ============================================================================

import { Pipe, PipeTransform, inject } from '@angular/core';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

@Pipe({ name: 't', pure: true })
export class TranslatePipe implements PipeTransform {
  private readonly translator = inject(TranslationService);

  transform(key: TranslationKey): string {
    return this.translator.t(key);
  }
}
