import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FestivalHeroComponent } from '../ui/festival-hero/festival-hero';
import { LineupGridComponent } from '../ui/lineup-grid/lineup-grid';
import { VenueMapComponent } from '../ui/venue-map/venue-map';

@Component({
  selector: 'fv-festival-detail-page',
  imports: [FestivalHeroComponent, LineupGridComponent, VenueMapComponent],
  templateUrl: './festival-detail.page.html',
  styleUrl: './festival-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalDetailPageComponent {
  protected readonly slug = inject(ActivatedRoute).snapshot.params['slug'] as string;
}
