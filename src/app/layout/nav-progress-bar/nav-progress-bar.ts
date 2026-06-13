import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PageTransitionService } from '@core/platform/page-transition.service';

@Component({
  selector: 'fv-nav-progress-bar',
  templateUrl: './nav-progress-bar.html',
  styleUrl: './nav-progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavProgressBarComponent {
  protected readonly transition = inject(PageTransitionService);
}
