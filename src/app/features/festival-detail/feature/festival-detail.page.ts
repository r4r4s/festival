import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FestivalHeroComponent } from '../ui/festival-hero/festival-hero';
import { LineupGridComponent } from '../ui/lineup-grid/lineup-grid';
import { VenueMapComponent } from '../ui/venue-map/venue-map';
import { FeaturedReviewsComponent } from '../ui/featured-reviews/featured-reviews';
import { ReviewRotationService } from '../data-access/review-rotation.service';
import type { FestivalReview, ReviewStats } from '@shared/domain/review.model';

@Component({
  selector: 'fv-festival-detail-page',
  imports: [FestivalHeroComponent, LineupGridComponent, VenueMapComponent, FeaturedReviewsComponent],
  templateUrl: './festival-detail.page.html',
  styleUrl: './festival-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalDetailPageComponent {
  protected readonly slug = inject(ActivatedRoute).snapshot.params['slug'] as string;

  private readonly reviewService = inject(ReviewRotationService);

  protected readonly featuredReviews: readonly FestivalReview[] =
    this.reviewService.getFeaturedReviews(this.slug);

  protected readonly reviewStats: ReviewStats =
    this.reviewService.getStats(this.slug);
}
