import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideMapPin } from '@lucide/angular';

import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

/** Intervalo (ms) entre cambio automático de festival activo. */
const AUTOPLAY_INTERVAL_MS = 3000;

type CalendarMonth = 'june' | 'july' | 'august';
type FestivalTone = 'med-blue' | 'coral' | 'orange' | 'blue';
type FestivalCardAlign = 'start' | 'center' | 'end';

interface CalendarMonthSegment {
  readonly key: CalendarMonth;
  readonly labelKey: TranslationKey;
  readonly days: readonly string[];
}

interface CalendarFestival {
  readonly slug: string;
  readonly month: CalendarMonth;
  readonly dayLabel: string;
  readonly position: number;
  readonly shortMonthLabelKey: TranslationKey;
  readonly dateKey: TranslationKey;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly genreKey: TranslationKey;
  readonly imageSrc: string;
  readonly tone: FestivalTone;
  readonly cardAlign: FestivalCardAlign;
  readonly cardOffset: string;
}

type CalendarFestivalEntry = CalendarFestival;

type FestivalDayLookup = Record<string, CalendarFestival>;

@Component({
  selector: 'fv-festival-calendar',
  imports: [NgOptimizedImage, LucideMapPin, TranslatePipe],
  templateUrl: './festival-calendar.html',
  styleUrl: './festival-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalCalendarComponent {
  readonly monthSegments = [
    {
      key: 'june',
      labelKey: 'home.calendar.months.june',
      days: ['16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
    },
    {
      key: 'july',
      labelKey: 'home.calendar.months.july',
      days: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
        '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31',
      ],
    },
    {
      key: 'august',
      labelKey: 'home.calendar.months.august',
      days: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    },
  ] as const satisfies readonly CalendarMonthSegment[];

  readonly festivals = [
    {
      slug: 'bigsound',
      month: 'june',
      dayLabel: '20',
      position: 7,
      shortMonthLabelKey: 'home.calendar.shortMonths.june',
      dateKey: 'home.calendar.cards.bigsound.date',
      nameKey: 'home.calendar.cards.bigsound.name',
      locationKey: 'home.calendar.cards.bigsound.location',
      genreKey: 'home.calendar.cards.bigsound.genre',
      imageSrc: '/assets/images/festivals/bigsound/logo-bigsound.webp',
      tone: 'med-blue',
      cardAlign: 'start',
      cardOffset: '0px',
    },
    {
      slug: 'latin-fest-valencia',
      month: 'july',
      dayLabel: '17',
      position: 49,
      shortMonthLabelKey: 'home.calendar.shortMonths.july',
      dateKey: 'home.calendar.cards.latinFestValencia.date',
      nameKey: 'home.calendar.cards.latinFestValencia.name',
      locationKey: 'home.calendar.cards.latinFestValencia.location',
      genreKey: 'home.calendar.cards.latinFestValencia.genre',
      imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
      tone: 'coral',
      cardAlign: 'start',
      cardOffset: '0px',
    },
    {
      slug: 'latin-fest',
      month: 'july',
      dayLabel: '4',
      position: 30,
      shortMonthLabelKey: 'home.calendar.shortMonths.july',
      dateKey: 'home.calendar.cards.latinFest.date',
      nameKey: 'home.calendar.cards.latinFest.name',
      locationKey: 'home.calendar.cards.latinFest.location',
      genreKey: 'home.calendar.cards.latinFest.genre',
      imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
      tone: 'coral',
      cardAlign: 'end',
      cardOffset: '0.75rem',
    },
    {
      slug: 'zevra',
      month: 'july',
      dayLabel: '24',
      position: 60,
      shortMonthLabelKey: 'home.calendar.shortMonths.july',
      dateKey: 'home.calendar.cards.zevra.date',
      nameKey: 'home.calendar.cards.zevra.name',
      locationKey: 'home.calendar.cards.zevra.location',
      genreKey: 'home.calendar.cards.zevra.genre',
      imageSrc: '/assets/images/festivals/zevra/logo-zevra.webp',
      tone: 'orange',
      cardAlign: 'start',
      cardOffset: '3.25rem',
    },
    {
      slug: 'medusa',
      month: 'august',
      dayLabel: '8',
      position: 84,
      shortMonthLabelKey: 'home.calendar.shortMonths.august',
      dateKey: 'home.calendar.cards.medusa.date',
      nameKey: 'home.calendar.cards.medusa.name',
      locationKey: 'home.calendar.cards.medusa.location',
      genreKey: 'home.calendar.cards.medusa.genre',
      imageSrc: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
      tone: 'blue',
      cardAlign: 'end',
      cardOffset: '0px',
    },
  ] as const satisfies readonly CalendarFestival[];

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
