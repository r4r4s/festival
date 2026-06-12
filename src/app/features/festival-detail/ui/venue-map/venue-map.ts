import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fv-venue-map',
  templateUrl: './venue-map.html',
  styleUrl: './venue-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VenueMapComponent {}
