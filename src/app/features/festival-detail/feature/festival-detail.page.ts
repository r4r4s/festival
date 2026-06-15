import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FestivalHeroComponent } from '../ui/festival-hero/festival-hero';
import { FestivalDetailFactsComponent } from '../ui/festival-detail-facts/festival-detail-facts';
import { FestivalLocationMapComponent } from '../ui/festival-location-map/festival-location-map';
import { FestivalOverviewComponent } from '../ui/festival-overview/festival-overview';
import { FestivalDetailFactsService } from '../data-access/festival-detail-facts.service';
import { ReviewRotationService } from '../data-access/review-rotation.service';
import type { ReviewStats } from '@shared/domain/review.model';

@Component({
  selector: 'fv-festival-detail-page',
  imports: [
    FestivalHeroComponent,
    FestivalDetailFactsComponent,
    FestivalOverviewComponent,
    FestivalLocationMapComponent,
  ],
  templateUrl: './festival-detail.page.html',
  styleUrl: './festival-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalDetailPageComponent {
  protected readonly slug = inject(ActivatedRoute).snapshot.params['slug'] as string;
  protected readonly facts = inject(FestivalDetailFactsService).facts(this.slug);

  protected readonly reviewStats: ReviewStats =
    inject(ReviewRotationService).getStats(this.slug);
}
