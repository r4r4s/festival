import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import {
  LucideCalendar,
  LucideChevronRight,
  LucideExternalLink,
  LucideMapPin,
  LucideStar,
  LucideTicket,
} from '@lucide/angular';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { ReviewStats } from '@shared/domain/review.model';

import {
  findFestivalDetailEntry,
  type FestivalDetailEntry,
} from '../../data-access/festival-detail-catalogue';

const EMPTY_STATS: ReviewStats = { averageRating: 0, totalCount: 0 };

@Component({
  selector: 'fv-festival-hero',
  templateUrl: './festival-hero.html',
  styleUrl: './festival-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    TranslatePipe,
    LucideCalendar,
    LucideChevronRight,
    LucideExternalLink,
    LucideMapPin,
    LucideStar,
    LucideTicket,
  ],
})
export class FestivalHeroComponent {
  readonly #i18n = inject(TranslationService);

  readonly slug = input.required<string>();
  readonly stats = input<ReviewStats>(EMPTY_STATS);

  protected readonly entry = computed<FestivalDetailEntry | null>(() =>
    findFestivalDetailEntry(this.slug()),
  );

  protected readonly hasStats = computed(() => this.stats().totalCount > 0);

  protected readonly averageLabel = computed(() =>
    this.stats().averageRating.toLocaleString('es-ES', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }),
  );

  protected readonly countLabel = computed(() => {
    const total = this.stats().totalCount;
    const word = this.#i18n.t(
      total === 1
        ? 'festival.detail.hero.review.singular'
        : 'festival.detail.hero.review.plural',
    );
    return `(${total} ${word})`;
  });
}
