import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideArrowRight,
  LucideCalendar,
  LucideMapPin,
  LucideMusic,
} from '@lucide/angular';

import type { FestivalLocation } from '@shared/data-access/festival-locations';
import { TranslationService } from '@shared/data-access/i18n/translation.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

/** Intervalo (ms) entre cambio automático del pin/festival activo. */
const AUTOPLAY_INTERVAL_MS = 3000;

const HOME_MAP_PIN_POSITIONS: Record<string, { pinLeft: number; pinTop: number }> = {
  bigsound: { pinLeft: 52.2, pinTop: 46.2 },
  reve: { pinLeft: 53.8, pinTop: 45.4 },
  latinValencia: { pinLeft: 54.2, pinTop: 44.3 },
  medusa: { pinLeft: 57.55, pinTop: 55.0 },
  zevra: { pinLeft: 57.0, pinTop: 54.3 },
  rbf: { pinLeft: 44.36, pinTop: 82.58 },
  latinBenidorm: { pinLeft: 61.7, pinTop: 74.5 },
} as const;

function locateFestival(
  locations: readonly FestivalLocation[],
  key: string,
): FestivalLocation & { pinLeft: number; pinTop: number } {
  const festival = locations.find((item) => item.key === key);
  const position = HOME_MAP_PIN_POSITIONS[key];

  if (!festival || !position) {
    throw new Error(`Festival location not found: ${key}`);
  }

  return {
    ...festival,
    ...position,
  };
}

export interface HomeMapFestival extends FestivalLocation {
  readonly slug: string;
  readonly categoryKey: TranslationKey;
  readonly image: { readonly src: string; readonly alt: string };
  readonly attendance: string;
  readonly artists: string;
  readonly duration: string;
  readonly mapLabel: string;
  readonly pinLeft: number;
  readonly pinTop: number;
  readonly labelOffsetX: number;
  readonly labelOffsetY: number;
  readonly toneColor: string;
  readonly glowColor: string;
}

function buildHomeMapFestivals(
  locations: readonly FestivalLocation[],
): readonly HomeMapFestival[] {
  return [
    {
      ...locateFestival(locations, 'bigsound'),
      slug: 'bigsound',
      categoryKey: 'home.map.categories.pop',
      image: {
        src: '/assets/images/festivals/bigsound/logo-bigsound.webp',
        alt: 'Identidad visual de Bigsound Festival',
      },
      attendance: '120K+',
      artists: '48',
      duration: '2',
      mapLabel: 'Bigsound',
      labelOffsetX: 4.2,
      labelOffsetY: -0.9,
      toneColor: 'var(--fv-accent-blue)',
      glowColor: 'var(--fv-accent-green)',
    },
    {
      ...locateFestival(locations, 'reve'),
      slug: 'reve',
      categoryKey: 'home.map.categories.pop',
      image: {
        src: '/assets/images/festivals/reve/logo-reve.webp',
        alt: 'Identidad visual de Reve Festival',
      },
      attendance: '18K',
      artists: '12',
      duration: '1',
      mapLabel: 'Reve',
      labelOffsetX: -3.8,
      labelOffsetY: -1.2,
      toneColor: 'var(--fv-accent-blue)',
      glowColor: 'var(--fv-accent-blue)',
    },
    {
      ...locateFestival(locations, 'latinValencia'),
      slug: 'latin-fest',
      categoryKey: 'home.map.categories.latin',
      image: {
        src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
        alt: 'Identidad visual de Latin Fest Valencia',
      },
      attendance: '35K',
      artists: '20',
      duration: '1',
      mapLabel: 'L. Val.',
      labelOffsetX: -1.7,
      labelOffsetY: -3.3,
      toneColor: 'var(--fv-accent-warning)',
      glowColor: 'var(--fv-accent-warning)',
    },
    {
      ...locateFestival(locations, 'medusa'),
      slug: 'medusa',
      categoryKey: 'home.map.categories.electronic',
      image: {
        src: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
        alt: 'Identidad visual de Medusa Festival',
      },
      attendance: '300K+',
      artists: '150',
      duration: '5',
      mapLabel: 'Medusa',
      labelOffsetX: 4.0,
      labelOffsetY: 0.4,
      toneColor: 'var(--fv-accent-blue)',
      glowColor: 'var(--fv-accent-green)',
    },
    {
      ...locateFestival(locations, 'zevra'),
      slug: 'zevra',
      categoryKey: 'home.map.categories.urban',
      image: {
        src: '/assets/images/festivals/zevra/logo-zevra.webp',
        alt: 'Identidad visual de Zevra Festival',
      },
      attendance: '130K+',
      artists: '70',
      duration: '4',
      mapLabel: 'Zevra',
      labelOffsetX: -4.4,
      labelOffsetY: -0.2,
      toneColor: 'var(--fv-accent-green)',
      glowColor: 'var(--fv-accent-blue)',
    },
    {
      ...locateFestival(locations, 'rbf'),
      slug: 'rbf',
      categoryKey: 'home.map.categories.latin',
      image: {
        src: '/assets/images/festivals/rbf/logo-rbf.webp',
        alt: 'Identidad visual de Reggaeton Beach Festival',
      },
      attendance: '90K+',
      artists: '28',
      duration: '1',
      mapLabel: 'RBF',
      labelOffsetX: 3.2,
      labelOffsetY: 0.8,
      toneColor: 'var(--fv-accent-warning)',
      glowColor: 'var(--fv-accent-warning)',
    },
    {
      ...locateFestival(locations, 'latinBenidorm'),
      slug: 'latin-fest',
      categoryKey: 'home.map.categories.latin',
      image: {
        src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
        alt: 'Identidad visual de Latin Fest Benidorm',
      },
      attendance: '35K',
      artists: '20',
      duration: '1',
      mapLabel: 'L. Ben.',
      labelOffsetX: -3.2,
      labelOffsetY: -1.2,
      toneColor: 'var(--fv-accent-warning)',
      glowColor: 'var(--fv-accent-warning)',
    },
  ] as const satisfies readonly HomeMapFestival[];
}

@Component({
  selector: 'fv-home-festival-map',
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

  /** Localizaciones del catálogo, suministradas por la página (ui/ recibe datos por input). */
  readonly locations = input.required<readonly FestivalLocation[]>();

  readonly festivals = computed(() => buildHomeMapFestivals(this.locations()));

  readonly activeFestivalKey = signal(this.#defaultFestivalKey);
  // Panel is always visible in the 3-column layout — starts open.
  readonly isPanelVisible = signal(true);
  readonly activeFestival = computed(
    () =>
      this.festivals().find((festival) => festival.key === this.activeFestivalKey()) ??
      this.festivals()[0],
  );
  readonly activeIndex = computed(() =>
    this.festivals().findIndex((festival) => festival.key === this.activeFestivalKey()),
  );

  // ── Carrusel automático ───────────────────────────────────────────────────
  readonly #destroyRef = inject(DestroyRef);
  #intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    // setInterval sólo en el navegador — afterNextRender no se ejecuta en SSR.
    afterNextRender(() => {
      this.#startAutoplay();
    });
    this.#destroyRef.onDestroy(() => this.#stopAutoplay());
  }

  previewFestival(key: string): void {
    this.activeFestivalKey.set(key);
    this.#restartAutoplay();
  }

  selectFestival(key: string): void {
    this.activeFestivalKey.set(key);
    this.isPanelVisible.set(true);
    this.#restartAutoplay();
  }

  /** El autoplay sigue ciclando desde donde esté — ya no se resetea al salir. */
  handlePointerLeave(): void {
    // no-op intencionado: el carrusel automático sustituye al lock-on-click.
  }

  /** Mismo motivo que handlePointerLeave: el ciclo continúa solo. */
  handlePinBlur(): void {
    // no-op intencionado.
  }

  isActive(key: string): boolean {
    return this.activeFestivalKey() === key;
  }

  #startAutoplay(): void {
    this.#intervalId = setInterval(() => {
      const festivals = this.festivals();
      const currentIdx = festivals.findIndex(
        (festival) => festival.key === this.activeFestivalKey(),
      );
      const nextIdx = (currentIdx + 1) % festivals.length;
      this.activeFestivalKey.set(festivals[nextIdx].key);
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

  pinAriaLabel(festival: HomeMapFestival): string {
    return this.#i18n
      .t('festivales.map.marker.label')
      .replace('{festival}', this.#i18n.t(festival.nameKey));
  }
}
