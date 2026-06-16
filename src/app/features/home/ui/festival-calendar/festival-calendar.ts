import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

import {
  CALENDAR_FESTIVALS,
  CALENDAR_MONTH_SEGMENTS,
  type CalendarFestivalEntry,
  type CalendarMonth,
} from '../../data-access/home-catalogue';

/** Intervalo (ms) entre cambio automático de festival activo. */
const AUTOPLAY_INTERVAL_MS = 3000;

type FestivalDayLookup = Record<string, CalendarFestivalEntry>;

@Component({
  selector: 'fv-festival-calendar',
  imports: [NgOptimizedImage, RouterLink, LucideMapPin, TranslatePipe],
  templateUrl: './festival-calendar.html',
  styleUrl: './festival-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalCalendarComponent {
  readonly monthSegments = CALENDAR_MONTH_SEGMENTS;

  readonly festivals = CALENDAR_FESTIVALS;

  readonly festivalDays = this.festivals.reduce<FestivalDayLookup>((lookup, festival) => {
    lookup[`${festival.month}:${festival.dayLabel}`] = festival;
    return lookup;
  }, {});

  // ── Estado del carrusel ─────────────────────────────────────────────────
  /** Índice del festival actualmente visible. */
  readonly activeIndex = signal(0);

  readonly #destroyRef = inject(DestroyRef);
  #intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // Arrancar autoplay sólo en el navegador (no en SSR)
    afterNextRender(() => {
      this.#startAutoplay();
    });
    this.#destroyRef.onDestroy(() => this.#stopAutoplay());
  }

  /** El usuario pasa el ratón por encima del día destacado de un festival. */
  focusFestival(festival: CalendarFestivalEntry): void {
    const idx = this.festivals.findIndex((f) => f.slug === festival.slug);
    if (idx >= 0) {
      this.activeIndex.set(idx);
      this.#restartAutoplay();
    }
  }

  isActive(index: number): boolean {
    return this.activeIndex() === index;
  }

  #startAutoplay(): void {
    this.#intervalId = setInterval(() => {
      this.activeIndex.update((i) => (i + 1) % this.festivals.length);
    }, AUTOPLAY_INTERVAL_MS);
  }

  #stopAutoplay(): void {
    if (this.#intervalId !== null) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  #restartAutoplay(): void {
    this.#stopAutoplay();
    this.#startAutoplay();
  }

  trackBySlug(_index: number, festival: CalendarFestivalEntry): string {
    return festival.slug;
  }

  festivalForDay(month: CalendarMonth, day: string): CalendarFestivalEntry | null {
    return this.festivalDays[`${month}:${day}`] ?? null;
  }
}
