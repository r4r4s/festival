import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HreflangService } from '@core/platform/hreflang.service';
import { PageTransitionService } from '@core/platform/page-transition.service';
import { ThemeService } from '@core/platform/theme.service';
import { ShellComponent } from '@layout/shell/shell';

@Component({
  selector: 'fv-root',
  imports: [ShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    inject(HreflangService).apply();
    inject(ThemeService);
    inject(PageTransitionService); // instantiate early so router events are captured
  }
}
