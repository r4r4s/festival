import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCalendar,
  LucideMapPin,
  LucideMusic,
} from '@lucide/angular';

import { FESTIVAL_LOCATIONS, type FestivalLocation } from '@shared/data-access/festival-locations';
import { TranslationService } from '@shared/data-access/i18n/translation.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

// ── City anchors — single source of truth for geographic positions ──────────
// All percentages are relative to the map image dimensions (left % / top %).
const CITY_ANCHORS = {
  valencia: { x: 58.5, y: 43.5 },
  cullera:  { x: 60.5, y: 48.7 },
  benidorm: { x: 67.5, y: 61.5 },
} as const;

type CityKey = keyof typeof CITY_ANCHORS;

/** Computes the final pin position from a city anchor plus a small visual offset. */
function pin(city: CityKey, offsetX: number, offsetY: number): { pinLeft: number; pinTop: number } {
  return {
    pinLeft: CITY_ANCHORS[city].x + offsetX,
    pinTop:  CITY_ANCHORS[city].y + offsetY,
  };
}

interface HomeMapFestival extends FestivalLocation {
  readonly slug: string;
  readonly categoryKey: TranslationKey;
  readonly image: { readonly src: string; readonly alt: string };
  readonly attendance: string;
  readonly artists: string;
  readonly duration: string;
  readonly pinLeft: number;
  readonly pinTop: number;
  readonly toneColor: string;
  readonly glowColor: string;
}

@Component({
  selector: 'fv-home-festival-map',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    LucideArrowRight,
    LucideCalendar,
    LucideMapPin,
    LucideMusic,
    TranslatePipe,
  ],
  templateUrl: './home-festival-map.html',
  styleUrl: './home-festival-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFestivalMapComponent {
  readonly #i18n = inject(TranslationService);
  readonly #defaultFestivalKey = 'medusa';

  readonly festivals = [
    {
      ...FESTIVAL_LOCATIONS.find((festival) => festival.key === 'bigsound')!,
      slug: 'bigsound',
      categoryKey: 'home.map.categories.pop',
      image: {
        src: '/assets/images/festivals/bigsound/logo-bigsound.webp',
        alt: 'Identidad visual de Bigsound Festival',
      },
      attendance: '120K+',
      artists: '48',
      duration: '2',
      ...pin('valencia', -0.8, -0.6),
      toneColor: 'var(--fv-accent-blue)',
      glowColor: 'var(--fv-accent-green)',
    },
    {
      ...FESTIVAL_LOCATIONS.find((festival) => festival.key === 'reve')!,
      slug: 'reve',
      categoryKey: 'home.map.categories.pop',
      image: {
        src: '/assets/images/festivals/reve/logo-reve.webp',
        alt: 'Identidad visual de Reve Festival',
      },
      attendance: '18K',
      artists: '12',
      duration: '1',
      ...pin('valencia', +0.8, +0.6),
      toneColor: 'var(--fv-accent-blue)',
      glowColor: 'var(--fv-accent-blue)',
    },
    {
      ...FESTIVAL_LOCATIONS.find((festival) => festival.key === 'medusa')!,
      slug: 'medusa',
      categoryKey: 'home.map.categories.electronic',
      image: {
        src: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
        alt: 'Identidad visual de Medusa Festival',
      },
      attendance: '300K+',
      artists: '150',
      duration: '5',
      ...pin('cullera', -0.8, +0.4),
      toneColor: 'var(--fv-accent-blue)',
      glowColor: 'var(--fv-accent-green)',
    },
    {
      ...FESTIVAL_LOCATIONS.find((festival) => festival.key === 'zevra')!,
      slug: 'zevra',
      categoryKey: 'home.map.categories.urban',
      image: {
        src: '/assets/images/festivals/zevra/logo-zevra.webp',
        alt: 'Identidad visual de Zevra Festival',
      },
      attendance: '130K+',
      artists: '70',
      duration: '4',
      ...pin('cullera', +0.8, -0.4),
      toneColor: 'var(--fv-accent-green)',
      glowColor: 'var(--fv-accent-blue)',
    },
    {
      ...FESTIVAL_LOCATIONS.find((festival) => festival.key === 'rbf')!,
      slug: 'rbf',
      categoryKey: 'home.map.categories.latin',
      image: {
        src: '/assets/images/festivals/rbf/logo-rbf.webp',
        alt: 'Identidad visual de Reggaeton Beach Festival',
      },
      attendance: '90K+',
      artists: '28',
      duration: '1',
      ...pin('benidorm', -0.8, +0.5),
      toneColor: 'var(--fv-accent-warning)',
      glowColor: 'var(--fv-accent-warning)',
    },
    {
      ...FESTIVAL_LOCATIONS.find((festival) => festival.key === 'latinFest')!,
      slug: 'latin-fest',
      categoryKey: 'home.map.categories.latin',
      image: {
        src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
        alt: 'Identidad visual de Latin Fest',
      },
      attendance: '35K',
      artists: '20',
      duration: '1',
      ...pin('benidorm', +0.8, -0.5),
      toneColor: 'var(--fv-accent-warning)',
      glowColor: 'var(--fv-accent-warning)',
    },
  ] as const satisfies readonly HomeMapFestival[];

  readonly activeFestivalKey = signal(this.#defaultFestivalKey);
  readonly lockedFestivalKey = signal<string | null>(null);
  // Panel is always visible in the 3-column layout — starts open.
  readonly isPanelVisible = signal(true);
  readonly activeFestival = computed(
    () =>
      this.festivals.find((festival) => festival.key === this.activeFestivalKey()) ??
      this.festivals[0],
  );
  readonly activeIndex = computed(() =>
    this.festivals.findIndex((festival) => festival.key === this.activeFestivalKey()),
  );

  previewFestival(key: string): void {
    this.activeFestivalKey.set(key);
  }

  selectFestival(key: string): void {
    this.lockedFestivalKey.set(key);
    this.activeFestivalKey.set(key);
    this.isPanelVisible.set(true);
  }

  /** Resets the active card to the locked festival (or the default). Panel stays visible. */
  handlePointerLeave(): void {
    const lockedKey = this.lockedFestivalKey();
    this.activeFestivalKey.set(lockedKey ?? this.#defaultFestivalKey);
  }

  /** Keyboard blur — same reset behaviour as pointer leave. */
  handlePinBlur(): void {
    const lockedKey = this.lockedFestivalKey();
    this.activeFestivalKey.set(lockedKey ?? this.#defaultFestivalKey);
  }

  isActive(key: string): boolean {
    return this.activeFestivalKey() === key;
  }

  pinAriaLabel(festival: HomeMapFestival): string {
    return this.#i18n
      .t('festivales.map.marker.label')
      .replace('{festival}', this.#i18n.t(festival.nameKey));
  }
}
