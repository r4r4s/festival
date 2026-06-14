import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-festival-location-map',
  imports: [TranslatePipe],
  templateUrl: './festival-location-map.html',
  styleUrl: './festival-location-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalLocationMapComponent {}
