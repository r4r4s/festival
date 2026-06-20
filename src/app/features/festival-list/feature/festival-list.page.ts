import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideArrowRight,
  LucideSearch,
  LucideSlidersHorizontal,
} from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { FestivalCardComponent } from '../ui/festival-card/festival-card';
import {
  FESTIVAL_CATALOGUE,
  type CatalogueFestival,
} from '../data-access/festival-catalogue';

@Component({
  selector: 'fv-festival-list-page',
  imports: [
    LucideArrowRight,
    LucideSearch,
    LucideSlidersHorizontal,
    TranslatePipe,
    FestivalCardComponent,
  ],
  templateUrl: './festival-list.page.html',
  styleUrl: './festival-list.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalListPageComponent {
  protected readonly searchQuery = signal('');

  protected readonly filteredFestivals = computed<readonly CatalogueFestival[]>(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return FESTIVAL_CATALOGUE;

    return FESTIVAL_CATALOGUE.filter(
      (f) =>
        f.posterAlt.toLowerCase().includes(query) ||
        f.slug.includes(query),
    );
  });

  private readonly router = inject(Router);

  protected onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  protected onCardNavigate(slug: string): void {
    this.router.navigate(['/festivales', slug]);
  }
}
