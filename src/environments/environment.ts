// ============================================================================
// environment.ts — festiVAL · default (development)
// ============================================================================
// Base URLs, feature flags and endpoints belong here — never hardcoded in
// services. See `CLAUDE.md` § Configuration.
// ============================================================================

export interface Environment {
  production: boolean;
  defaultLocale: 'es-ES';
  /** Absolute base URL used for hreflang and canonical tags. No trailing slash. */
  baseUrl: string;
  sanity: {
    projectId: string;
    dataset: 'development' | 'production';
    apiVersion: '2024-01-01';
    useCdn: boolean;
  };
  maps: {
    /** MapLibre GL style URL. Replace with self-hosted Protomaps tiles in production. */
    styleUrl: string;
    /** Default center [lng, lat] over the Valencian Community. */
    center: [number, number];
    zoom: number;
  };
}

export const environment = {
  production: false,
  defaultLocale: 'es-ES',
  baseUrl: 'http://localhost:4200',
  sanity: {
    projectId: '',
    dataset: 'development',
    apiVersion: '2024-01-01',
    useCdn: false,
  },
  maps: {
    styleUrl: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    center: [-0.40, 39.25],
    zoom: 7.2,
  },
} satisfies Environment;
