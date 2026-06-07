import { Injectable } from '@angular/core';
import type { Map as MapLibreMap, Marker, LngLatLike } from 'maplibre-gl';

type MapLibreModule = typeof import('maplibre-gl');

@Injectable({ providedIn: 'root' })
export class MapLoaderService {
  #module: MapLibreModule | null = null;

  async load(): Promise<MapLibreModule> {
    if (!this.#module) {
      this.#module = await import('maplibre-gl');
    }
    return this.#module;
  }

  createMap(
    container: HTMLElement,
    options: {
      style: string;
      center: [number, number];
      zoom: number;
    },
    maplibre: MapLibreModule,
  ): MapLibreMap {
    return new maplibre.Map({
      container,
      style: options.style,
      center: options.center as LngLatLike,
      zoom: options.zoom,
      attributionControl: false,
    });
  }

  createMarker(
    lat: number,
    lng: number,
    el: HTMLElement,
    maplibre: MapLibreModule,
  ): Marker {
    return new maplibre.Marker({ element: el })
      .setLngLat([lng, lat] as LngLatLike);
  }
}
