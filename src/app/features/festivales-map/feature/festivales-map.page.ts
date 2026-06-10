import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FestivalesMapComponent } from '../ui/festivales-map/festivales-map';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-festivales-map-page',
  imports: [FestivalesMapComponent, TranslatePipe],
  templateUrl: './festivales-map.page.html',
  styleUrl: './festivales-map.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalesMapPageComponent {}
