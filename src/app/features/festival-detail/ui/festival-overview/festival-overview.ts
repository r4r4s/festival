import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LucideFerrisWheel,
  LucideGlassWater,
  LucideMoonStar,
  LucideTentTree,
  LucideWavesLadder,
} from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-festival-overview',
  imports: [
    LucideFerrisWheel,
    LucideGlassWater,
    LucideMoonStar,
    LucideTentTree,
    LucideWavesLadder,
    TranslatePipe,
  ],
  templateUrl: './festival-overview.html',
  styleUrl: './festival-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalOverviewComponent {}
