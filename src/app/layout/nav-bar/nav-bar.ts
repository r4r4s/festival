import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideChevronRight, LucideMenu, LucideMoon, LucideSearch, LucideSun, LucideX } from '@lucide/angular';

import { ThemeService } from '@core/platform/theme.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { SEARCH_FESTIVALS } from '@shared/data-access/festival-search-catalogue';

@Component({
  selector: 'fv-nav-bar',
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    LucideSearch,
    LucideMoon,
    LucideSun,
    LucideMenu,
    LucideX,
    LucideChevronRight,
    TranslatePipe,
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fv-nav-bar-host' },
})
export class NavBar {
  readonly #theme = inject(ThemeService);
  readonly #router = inject(Router);
  readonly #injector = inject(Injector);

  protected readonly isDark = computed(() => this.#theme.resolvedTheme() === 'dark');
  protected readonly themeLabelKey = computed(() =>
    this.isDark() ? ('nav.theme.toLight' as const) : ('nav.theme.toDark' as const),
  );

  protected readonly searchOpen = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly searchResults = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return [];
    return SEARCH_FESTIVALS.filter(
      (f) => f.name.toLowerCase().includes(q) || f.city.toLowerCase().includes(q),
    );
  });

  protected toggleTheme(): void {
    this.#theme.toggle();
  }

  protected toggleSearch(): void {
    const opening = !this.searchOpen();
    this.searchOpen.set(opening);
    if (!opening) {
      this.searchQuery.set('');
    } else {
      afterNextRender(
        () => { this.searchInput()?.nativeElement.focus(); },
        { injector: this.#injector },
      );
    }
  }

  protected closeSearch(): void {
    this.searchOpen.set(false);
    this.searchQuery.set('');
  }

  protected onSearchInput(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected navigateToFestival(slug: string): void {
    void this.#router.navigate(['/festivales', slug]);
    this.closeSearch();
  }
}
