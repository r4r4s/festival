import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fv-festival-hero',
  templateUrl: './festival-hero.html',
  styleUrl: './festival-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalHeroComponent {}
