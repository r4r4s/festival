import type { TranslationKey } from '@shared/data-access/i18n/translations';

export type FestivalDetailSlug =
  | 'bigsound'
  | 'latin-fest'
  | 'medusa'
  | 'rbf'
  | 'reve'
  | 'zevra';

export interface FestivalDetailEntry {
  readonly slug: FestivalDetailSlug;
  readonly hero: {
    readonly titleKey: TranslationKey;
    readonly subtitleKey: TranslationKey;
    readonly breadcrumbCurrentKey: TranslationKey;
    readonly locationKey: TranslationKey;
    readonly datesKey: TranslationKey;
    /** ISO 8601 range for the <time datetime> attribute. */
    readonly datetime: string;
    readonly poster: { readonly src: string; readonly alt: string };
    readonly ticketUrl: string;
    readonly officialUrl: string;
  };
  readonly posters?: readonly FestivalDetailPoster[];
  readonly map: {
    readonly lat: number;
    readonly lng: number;
    /** Display label for accessible map title + fallback. */
    readonly nameKey: TranslationKey;
    /**
     * Google Maps embed URL (`maps/embed?pb=…`). The opaque `pb` payload is
     * the only Google iframe format that isn't blocked by X-Frame-Options on
     * arbitrary origins. URLs are taken from the official Share → Embed dialog
     * for each festival's pinned location.
     */
    readonly embedUrl: string;
  };
}

export interface FestivalDetailPoster {
  readonly labelKey: TranslationKey;
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly featured?: boolean;
}

const ENTRIES: readonly FestivalDetailEntry[] = [
  {
    slug: 'bigsound',
    hero: {
      titleKey: 'festival.detail.byFestival.bigsound.hero.title',
      subtitleKey: 'festival.detail.byFestival.bigsound.hero.subtitle',
      breadcrumbCurrentKey: 'festival.detail.byFestival.bigsound.name',
      locationKey: 'festival.detail.byFestival.bigsound.hero.location',
      datesKey: 'festival.detail.byFestival.bigsound.hero.dates',
      datetime: '2026-06-26/2026-06-27',
      poster: {
        src: '/assets/images/festivals/bigsound/logo-bigsound.webp',
        alt: 'Identidad visual de Bigsound Festival',
      },
      ticketUrl: 'https://bigsoundfestival.com/entradas',
      officialUrl: 'https://bigsoundfestival.com/',
    },
    posters: [
      {
        labelKey: 'festival.detail.byFestival.bigsound.overview.posterGallery.labels.general',
        src: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp',
        alt: 'Cartel de Bigsound Festival Valencia 2026',
        width: 550,
        height: 688,
        featured: true,
      },
    ],
    map: {
      lat: 39.42903614897183,
      lng: -0.46784232712277507,
      nameKey: 'festival.detail.byFestival.bigsound.name',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.46784232712277507!3d39.42903614897183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBigsound%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'latin-fest',
    hero: {
      titleKey: 'festival.detail.byFestival.latinFest.hero.title',
      subtitleKey: 'festival.detail.byFestival.latinFest.hero.subtitle',
      breadcrumbCurrentKey: 'festival.detail.byFestival.latinFest.name',
      locationKey: 'festival.detail.byFestival.latinFest.hero.location',
      datesKey: 'festival.detail.byFestival.latinFest.hero.dates',
      datetime: '2026-07-17/2026-07-18',
      poster: {
        src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
        alt: 'Identidad visual de Latin Fest',
      },
      ticketUrl: 'https://latinfest.es/entradas',
      officialUrl: 'https://latinfest.es/',
    },
    posters: [
      {
        labelKey: 'festival.detail.byFestival.latinFest.overview.posterGallery.labels.general',
        src: '/assets/images/festivals/latin-fest/cartel-latin-fest-valencia-2026.webp',
        alt: 'Cartel principal de Latin Fest Valencia 2026',
        width: 941,
        height: 1672,
        featured: true,
      },
      {
        labelKey: 'festival.detail.byFestival.latinFest.overview.posterGallery.labels.benidorm',
        src: '/assets/images/festivals/latin-fest/cartel-latin-fest-benidorm-2026.webp',
        alt: 'Cartel de Latin Fest Benidorm 2026',
        width: 1048,
        height: 1394,
      },
    ],
    map: {
      lat: 39.49454399416732,
      lng: -0.364468709822233,
      nameKey: 'festival.detail.byFestival.latinFest.name',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.364468709822233!3d39.49454399416732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sLatin%20Fest!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'medusa',
    hero: {
      titleKey: 'festival.detail.byFestival.medusa.hero.title',
      subtitleKey: 'festival.detail.byFestival.medusa.hero.subtitle',
      breadcrumbCurrentKey: 'festival.detail.byFestival.medusa.name',
      locationKey: 'festival.detail.byFestival.medusa.hero.location',
      datesKey: 'festival.detail.byFestival.medusa.hero.dates',
      datetime: '2026-08-07/2026-08-11',
      poster: {
        src: '/assets/images/festivals/medusa/hero-medusa-festival-2026.webp',
        alt: 'Escenario principal del Medusa Festival iluminado de noche',
      },
      ticketUrl: 'https://www.medusasunbeach.com/entradas',
      officialUrl: 'https://www.medusasunbeach.com/',
    },
    posters: [
      {
        labelKey: 'festival.detail.byFestival.medusa.overview.posterGallery.labels.general',
        src: '/assets/images/festivals/medusa/cartel-medusa-2026.webp',
        alt: 'Cartel general del Medusa Festival 2026',
        width: 1080,
        height: 1350,
        featured: true,
      },
      {
        labelKey: 'festival.detail.byFestival.medusa.overview.posterGallery.labels.thursday',
        src: '/assets/images/festivals/medusa/cartel-medusa-jueves-2026.webp',
        alt: 'Cartel del jueves del Medusa Festival 2026',
        width: 1086,
        height: 1448,
      },
      {
        labelKey: 'festival.detail.byFestival.medusa.overview.posterGallery.labels.friday',
        src: '/assets/images/festivals/medusa/cartel-medusa-viernes-2026.webp',
        alt: 'Cartel del viernes del Medusa Festival 2026',
        width: 1086,
        height: 1448,
      },
      {
        labelKey: 'festival.detail.byFestival.medusa.overview.posterGallery.labels.saturday',
        src: '/assets/images/festivals/medusa/cartel-medusa-sabado-2026.webp',
        alt: 'Cartel del sábado del Medusa Festival 2026',
        width: 1086,
        height: 1448,
      },
      {
        labelKey: 'festival.detail.byFestival.medusa.overview.posterGallery.labels.sunday',
        src: '/assets/images/festivals/medusa/cartel-medusa-domingo-2026.webp',
        alt: 'Cartel del domingo del Medusa Festival 2026',
        width: 1086,
        height: 1448,
      },
    ],
    map: {
      lat: 39.15434989735872,
      lng: -0.243329265792136,
      nameKey: 'festival.detail.byFestival.medusa.name',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2815.9344114099663!2d-0.24821091725818373!3d39.15420425848115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd61c974d60e370b%3A0xec9f97427f2d1590!2sMedusa%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'rbf',
    hero: {
      titleKey: 'festival.detail.byFestival.rbf.hero.title',
      subtitleKey: 'festival.detail.byFestival.rbf.hero.subtitle',
      breadcrumbCurrentKey: 'festival.detail.byFestival.rbf.name',
      locationKey: 'festival.detail.byFestival.rbf.hero.location',
      datesKey: 'festival.detail.byFestival.rbf.hero.dates',
      datetime: '2026-07-04/2026-07-05',
      poster: {
        src: '/assets/images/festivals/rbf/logo-rbf.webp',
        alt: 'Identidad visual de Reggaeton Beach Festival',
      },
      ticketUrl: 'https://reggaetonbeachfestival.com/entradas',
      officialUrl: 'https://reggaetonbeachfestival.com/',
    },
    map: {
      lat: 38.53601759406289,
      lng: -0.12804938107185576,
      nameKey: 'festival.detail.byFestival.rbf.name',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.12804938107185576!3d38.53601759406289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sReggaeton%20Beach%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'reve',
    hero: {
      titleKey: 'festival.detail.byFestival.reve.hero.title',
      subtitleKey: 'festival.detail.byFestival.reve.hero.subtitle',
      breadcrumbCurrentKey: 'festival.detail.byFestival.reve.name',
      locationKey: 'festival.detail.byFestival.reve.hero.location',
      datesKey: 'festival.detail.byFestival.reve.hero.dates',
      datetime: '2026-07-16/2026-07-17',
      poster: {
        src: '/assets/images/festivals/reve/logo-reve.webp',
        alt: 'Identidad visual de Reve Festival',
      },
      ticketUrl: 'https://revefestival.com/entradas',
      officialUrl: 'https://revefestival.com/',
    },
    posters: [
      {
        labelKey: 'festival.detail.byFestival.reve.overview.posterGallery.labels.general',
        src: '/assets/images/festivals/reve/cartel-reve-roig-arena-valencia-2026.webp',
        alt: 'Cartel de Reve Festival Roig Arena Valencia 2026',
        width: 1920,
        height: 1080,
        featured: true,
      },
    ],
    map: {
      lat: 39.44921869967149,
      lng: -0.3643244397614549,
      nameKey: 'festival.detail.byFestival.reve.name',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.3643244397614549!3d39.44921869967149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sReve%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
  {
    slug: 'zevra',
    hero: {
      titleKey: 'festival.detail.byFestival.zevra.hero.title',
      subtitleKey: 'festival.detail.byFestival.zevra.hero.subtitle',
      breadcrumbCurrentKey: 'festival.detail.byFestival.zevra.name',
      locationKey: 'festival.detail.byFestival.zevra.hero.location',
      datesKey: 'festival.detail.byFestival.zevra.hero.dates',
      datetime: '2026-07-24/2026-07-27',
      poster: {
        src: '/assets/images/festivals/zevra/logo-zevra.webp',
        alt: 'Identidad visual de Zevra Festival',
      },
      ticketUrl: 'https://zevrafestival.com/entradas',
      officialUrl: 'https://zevrafestival.com/',
    },
    posters: [
      {
        labelKey: 'festival.detail.byFestival.zevra.overview.posterGallery.labels.general',
        src: '/assets/images/festivals/zevra/cartel-zevra-2026.webp',
        alt: 'Cartel general de Zevra Festival 2026',
        width: 1080,
        height: 1350,
        featured: true,
      },
      {
        labelKey: 'festival.detail.byFestival.zevra.overview.posterGallery.labels.friday',
        src: '/assets/images/festivals/zevra/cartel-zevra-viernes-2026.webp',
        alt: 'Cartel del viernes de Zevra Festival 2026',
        width: 1290,
        height: 1610,
      },
      {
        labelKey: 'festival.detail.byFestival.zevra.overview.posterGallery.labels.saturday',
        src: '/assets/images/festivals/zevra/cartel-zevra-sabado-2026.webp',
        alt: 'Cartel del sábado de Zevra Festival 2026',
        width: 1122,
        height: 1402,
      },
      {
        labelKey: 'festival.detail.byFestival.zevra.overview.posterGallery.labels.sunday',
        src: '/assets/images/festivals/zevra/cartel-zevra-domingo-2026.webp',
        alt: 'Cartel del domingo de Zevra Festival 2026',
        width: 1119,
        height: 1405,
      },
    ],
    map: {
      lat: 39.154847058872114,
      lng: -0.2437427679436067,
      nameKey: 'festival.detail.byFestival.zevra.name',
      embedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-0.2437427679436067!3d39.154847058872114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sZevra%20Festival!5e1!3m2!1ses!2ses!4v1781447781947!5m2!1ses!2ses',
    },
  },
] as const;

const ENTRIES_BY_SLUG: ReadonlyMap<string, FestivalDetailEntry> = new Map(
  ENTRIES.map((entry) => [entry.slug, entry]),
);

export const FESTIVAL_DETAIL_SLUGS: readonly FestivalDetailSlug[] = ENTRIES.map(
  (entry) => entry.slug,
);

export function findFestivalDetailEntry(
  slug: string,
): FestivalDetailEntry | null {
  return ENTRIES_BY_SLUG.get(slug) ?? null;
}

export function isFestivalDetailSlug(slug: string): slug is FestivalDetailSlug {
  return ENTRIES_BY_SLUG.has(slug);
}
