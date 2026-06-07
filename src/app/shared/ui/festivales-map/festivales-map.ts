import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LucideChevronDown, LucideMapPin, LucideMusic, LucideNavigation } from '@lucide/angular';
import type { Map as MapLibreMap, Marker } from 'maplibre-gl';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { TranslationService } from '@shared/data-access/i18n/translation.service';
import { MapLoaderService } from '@shared/data-access/map-loader.service';
import {
  FESTIVAL_LOCATIONS,
  type FestivalCategory,
  type FestivalLocation,
  type MarkerTone,
} from '@shared/data-access/festival-locations';
import { environment } from '@env/environment';

const CATEGORY_TONE: Record<FestivalCategory, MarkerTone> = {
  electronic: 'violet',
  latin: 'rose',
  pop: 'amber',
  urban: 'teal',
};

@Component({
  selector: 'fv-festivales-map',
  imports: [TranslatePipe, LucideChevronDown, LucideMapPin, LucideMusic, LucideNavigation],
  templateUrl: './festivales-map.html',
  styleUrl: './festivales-map.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalesMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLElement>;

  readonly #i18n = inject(TranslationService);
  readonly #mapLoader = inject(MapLoaderService);
  readonly #platform = inject(PLATFORM_ID);

  readonly sortOrder = signal<'upcoming' | 'name'>('upcoming');
  readonly selectedKey = signal<string | null>(null);
  readonly mobileSheetOpen = signal(false);
  readonly mapReady = signal(false);
  readonly mapError = signal(false);

  readonly festivals: readonly FestivalLocation[] = FESTIVAL_LOCATIONS;

  readonly filteredFestivals = computed(() => {
    const order = this.sortOrder();
    return [...this.festivals].sort((a, b) => {
      if (order === 'name') {
        return this.#i18n.t(a.nameKey).localeCompare(this.#i18n.t(b.nameKey), 'es');
      }
      return a.startDate.localeCompare(b.startDate);
    });
  });

  #map: MapLibreMap | null = null;
  #markers = new Map<string, Marker>();

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.#platform)) return;

    try {
      const ml = await this.#mapLoader.load();
      const map = this.#mapLoader.createMap(
        this.mapContainer.nativeElement,
        {
          style: environment.maps.styleUrl,
          center: environment.maps.center,
          zoom: environment.maps.zoom,
        },
        ml,
      );

      this.#map = map;

      map.on('load', () => {
        this.mapReady.set(true);
        this.#addMarkers(ml);
      });

      map.on('error', () => {
        this.mapError.set(true);
      });
    } catch {
      this.mapError.set(true);
    }
  }

  ngOnDestroy(): void {
    this.#markers.clear();
    this.#map?.remove();
    this.#map = null;
  }

  setSortOrder(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOrder.set(select.value as 'upcoming' | 'name');
  }

  selectFestival(key: string): void {
    const next = key === this.selectedKey() ? null : key;
    this.selectedKey.set(next);
    if (next) {
      const loc = this.festivals.find((f) => f.key === next);
      if (loc) {
        this.#map?.flyTo({ center: [loc.lng, loc.lat], zoom: 11, duration: 800 });
      }
    }
  }

  toggleMobileSheet(): void {
    this.mobileSheetOpen.update((v) => !v);
  }

  markerTone(festival: FestivalLocation): MarkerTone {
    return festival.markerTone;
  }

  categoryTone(category: FestivalCategory): MarkerTone {
    return CATEGORY_TONE[category] ?? 'violet';
  }

  isSelected(key: string): boolean {
    return this.selectedKey() === key;
  }

  #addMarkers(ml: typeof import('maplibre-gl')): void {
    for (const festival of this.festivals) {
      const el = this.#createMarkerEl(festival);
      const marker = this.#mapLoader.createMarker(festival.lat, festival.lng, el, ml);
      marker.addTo(this.#map!);
      this.#markers.set(festival.key, marker);

      el.addEventListener('click', () => this.selectFestival(festival.key));
    }
  }

  #createMarkerEl(festival: FestivalLocation): HTMLElement {
    const el = document.createElement('button');
    el.className = `festivales-map__marker festivales-map__marker--${festival.markerTone}`;
    el.setAttribute('aria-label', this.#i18n.t('festivales.map.marker.label').replace('{festival}', this.#i18n.t(festival.nameKey)));
    el.setAttribute('type', 'button');
    return el;
  }
}
