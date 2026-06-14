import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { LucideStar, LucideShieldCheck } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { FestivalReview, ReviewStats } from '@shared/domain/review.model';

@Component({
  selector: 'fv-featured-reviews',
  imports: [SlicePipe, LucideStar, LucideShieldCheck, TranslatePipe],
  templateUrl: './featured-reviews.html',
  styleUrl: './featured-reviews.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedReviewsComponent {
  readonly reviews  = input.required<readonly FestivalReview[]>();
  readonly stats    = input.required<ReviewStats>();

  /** Returns an array of length 5 — each element true if the star should be filled. */
  starsFor(rating: number): readonly boolean[] {
    return [1, 2, 3, 4, 5].map(n => n <= rating);
  }

  /** Rounds average for display (e.g. 4.3 → '4,3'). */
  formatAverage(value: number): string {
    return value.toLocaleString('es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }
}
