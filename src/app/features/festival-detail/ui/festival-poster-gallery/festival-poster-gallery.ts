import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  input,
  signal,
} from '@angular/core';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

import { findFestivalDetailEntry, type FestivalDetailPoster } from '../../data-access/festival-detail-catalogue';

interface PosterGalleryKeys {
  readonly title: TranslationKey;
  readonly intro: TranslationKey;
  readonly dialogClose: TranslationKey;
  readonly dialogAriaLabel: TranslationKey;
}

function buildKeys(slug: string): PosterGalleryKeys {
  const ns = `festival.detail.byFestival.${slugNamespace(slug)}.overview.posterGallery`;
  return {
    title: `${ns}.title` as TranslationKey,
    intro: `${ns}.intro` as TranslationKey,
    dialogClose: `${ns}.dialog.close` as TranslationKey,
    dialogAriaLabel: `${ns}.dialog.ariaLabel` as TranslationKey,
  };
}

function slugNamespace(slug: string): string {
  if (slug === 'latin-fest') return 'latinFest';
  return slug;
}

@Component({
  selector: 'fv-festival-poster-gallery',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './festival-poster-gallery.html',
  styleUrl: './festival-poster-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalPosterGalleryComponent {
  readonly slug = input.required<string>();
  readonly isPaused = signal(false);
  readonly activePoster = signal<FestivalDetailPoster | null>(null);

  protected readonly entry = computed(() => findFestivalDetailEntry(this.slug()));
  protected readonly keys = computed<PosterGalleryKeys>(() => buildKeys(this.slug()));

  protected readonly posters = computed<readonly FestivalDetailPoster[]>(
    () => this.entry()?.posters ?? [],
  );

  pause(): void {
    this.isPaused.set(true);
  }

  resume(): void {
    if (this.activePoster()) return;
    this.isPaused.set(false);
  }

  openPoster(poster: FestivalDetailPoster): void {
    this.activePoster.set(poster);
    this.isPaused.set(true);
  }

  closePoster(): void {
    this.activePoster.set(null);
    this.isPaused.set(false);
  }

  closePosterFromBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closePoster();
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscapeKey(): void {
    if (this.activePoster()) {
      this.closePoster();
    }
  }
}
