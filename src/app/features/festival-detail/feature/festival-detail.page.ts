import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FestivalHeroComponent } from '../ui/festival-hero/festival-hero';
import { ReviewRotationService } from '../data-access/review-rotation.service';
import type { ReviewStats } from '@shared/domain/review.model';

@Component({
  selector: 'fv-festival-detail-page',
  imports: [FestivalHeroComponent],
  templateUrl: './festival-detail.page.html',
  styleUrl: './festival-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalDetailPageComponent {
  protected readonly slug = inject(ActivatedRoute).snapshot.params['slug'] as string;

  protected readonly reviewStats: ReviewStats =
    inject(ReviewRotationService).getStats(this.slug);
}
