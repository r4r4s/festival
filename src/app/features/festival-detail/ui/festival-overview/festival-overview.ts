import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  LucideFerrisWheel,
  LucideGlassWater,
  LucideMoonStar,
  LucideTentTree,
  LucideWavesLadder,
} from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

import { findFestivalDetailEntry } from '../../data-access/festival-detail-catalogue';
import { FestivalPosterGalleryComponent } from '../festival-poster-gallery/festival-poster-gallery';

interface OverviewKeys {
  readonly paragraph1: TranslationKey;
  readonly paragraph2: TranslationKey;
  readonly highlights: {
    readonly beach: TranslationKey;
    readonly camping: TranslationKey;
    readonly foodTrucks: TranslationKey;
    readonly afterparties: TranslationKey;
    readonly activities: TranslationKey;
  };
}

function buildKeys(slug: string): OverviewKeys {
  const ns = `festival.detail.byFestival.${slugNamespace(slug)}.overview`;
  return {
    paragraph1: `${ns}.paragraph1` as TranslationKey,
    paragraph2: `${ns}.paragraph2` as TranslationKey,
    highlights: {
      beach: `${ns}.highlights.beach` as TranslationKey,
      camping: `${ns}.highlights.camping` as TranslationKey,
      foodTrucks: `${ns}.highlights.foodTrucks` as TranslationKey,
      afterparties: `${ns}.highlights.afterparties` as TranslationKey,
      activities: `${ns}.highlights.activities` as TranslationKey,
    },
  };
}

function slugNamespace(slug: string): string {
  if (slug === 'latin-fest') return 'latinFest';
  return slug;
}

@Component({
  selector: 'fv-festival-overview',
  imports: [
    LucideFerrisWheel,
    LucideGlassWater,
    LucideMoonStar,
    LucideTentTree,
    LucideWavesLadder,
    FestivalPosterGalleryComponent,
    TranslatePipe,
  ],
  templateUrl: './festival-overview.html',
  styleUrl: './festival-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalOverviewComponent {
  readonly slug = input.required<string>();

  protected readonly entry = computed(() => findFestivalDetailEntry(this.slug()));
  protected readonly keys = computed<OverviewKeys>(() => buildKeys(this.slug()));
}
