import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
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

import type { ReviewStats } from '@shared/domain/review.model';

const EMPTY_STATS: ReviewStats = { averageRating: 0, totalCount: 0 };

@Component({
  selector: 'fv-festival-hero',
  templateUrl: './festival-hero.html',
  styleUrl: './festival-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    LucideCalendar,
    LucideChevronRight,
    LucideExternalLink,
    LucideMapPin,
    LucideStar,
    LucideTicket,
  ],
})
export class FestivalHeroComponent {
  readonly stats = input<ReviewStats>(EMPTY_STATS);

  protected readonly hasStats = computed(() => this.stats().totalCount > 0);

  protected readonly averageLabel = computed(() =>
    this.stats().averageRating.toLocaleString('es-ES', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }),
  );

  protected readonly countLabel = computed(() => {
    const total = this.stats().totalCount;
    return `(${total} ${total === 1 ? 'reseña' : 'reseñas'})`;
  });
}
