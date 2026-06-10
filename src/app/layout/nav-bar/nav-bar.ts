import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu, LucideMoon, LucideSearch, LucideSun } from '@lucide/angular';

import { ThemeService } from '@core/platform/theme.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-nav-bar',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, LucideSearch, LucideMoon, LucideSun, LucideMenu, TranslatePipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fv-nav-bar-host' },
})
export class NavBar {
  readonly #theme = inject(ThemeService);

  protected readonly isDark = computed(() => this.#theme.resolvedTheme() === 'dark');
  protected readonly themeLabelKey = computed(() =>
    this.isDark() ? ('nav.theme.toLight' as const) : ('nav.theme.toDark' as const),
  );

  protected toggleTheme(): void {
    this.#theme.toggle();
  }
}
