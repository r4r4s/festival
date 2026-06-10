import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HreflangService } from '@core/platform/hreflang.service';
import { NavBar } from '@layout/nav-bar/nav-bar';
import { Footer } from '@layout/footer/footer';

@Component({
  selector: 'fv-root',
  imports: [RouterOutlet, NavBar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  constructor() {
    inject(HreflangService).apply();
  }
}
