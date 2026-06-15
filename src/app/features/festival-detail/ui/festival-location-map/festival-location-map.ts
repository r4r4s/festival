import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

import { findFestivalDetailEntry } from '../../data-access/festival-detail-catalogue';
import { input } from '@angular/core';

@Component({
  selector: 'fv-festival-location-map',
  imports: [TranslatePipe],
  templateUrl: './festival-location-map.html',
  styleUrl: './festival-location-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalLocationMapComponent {
  readonly #sanitizer = inject(DomSanitizer);
  readonly #i18n = inject(TranslationService);

  readonly slug = input.required<string>();

  protected readonly entry = computed(() => findFestivalDetailEntry(this.slug()));

  protected readonly mapTitle = computed(() => {
    const e = this.entry();
    if (!e) return this.#i18n.t('festival.detail.locationMap.title');
    const name = this.#i18n.t(e.map.nameKey);
    return this.#i18n
      .t('festival.detail.locationMap.iframeTitle')
      .replace('{festival}', name);
  });

  protected readonly mapSrc = computed<SafeResourceUrl | null>(() => {
    const e = this.entry();
    if (!e) return null;
    return this.#sanitizer.bypassSecurityTrustResourceUrl(e.map.embedUrl);
  });
}
