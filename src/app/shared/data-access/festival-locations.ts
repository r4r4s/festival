import type { TranslationKey } from './i18n/translations';

export type FestivalCategory = 'electronic' | 'latin' | 'pop' | 'urban';
export type MarkerTone = 'violet' | 'teal' | 'amber' | 'rose';

export interface FestivalLocation {
  key: string;
  nameKey: TranslationKey;
  datesKey: TranslationKey;
  cityKey: TranslationKey;
  provinceKey: TranslationKey;
  descriptionKey: TranslationKey;
  howToGetThereKey: TranslationKey;
  /** ISO 8601 date used for sorting */
  startDate: string;
  lat: number;
  lng: number;
  category: FestivalCategory;
  markerTone: MarkerTone;
}

export const FESTIVAL_LOCATIONS: readonly FestivalLocation[] = [
  {
    key: 'bigsound',
    nameKey: 'festivales.map.festivals.bigsound.name',
    datesKey: 'festivales.map.festivals.bigsound.dates',
    cityKey: 'festivales.map.festivals.bigsound.city',
    provinceKey: 'festivales.map.festivals.bigsound.province',
    descriptionKey: 'festivales.map.festivals.bigsound.description',
    howToGetThereKey: 'festivales.map.festivals.bigsound.howToGetThere',
    startDate: '2026-06-26',
    lat: 39.4354,
    lng: -0.4695,
    category: 'pop',
    markerTone: 'amber',
  },
  {
    key: 'rbf',
    nameKey: 'festivales.map.festivals.rbf.name',
    datesKey: 'festivales.map.festivals.rbf.dates',
    cityKey: 'festivales.map.festivals.rbf.city',
    provinceKey: 'festivales.map.festivals.rbf.province',
    descriptionKey: 'festivales.map.festivals.rbf.description',
    howToGetThereKey: 'festivales.map.festivals.rbf.howToGetThere',
    startDate: '2026-07-04',
    lat: 38.5400,
    lng: -0.1200,
    category: 'latin',
    markerTone: 'rose',
  },
  {
    key: 'latinFest',
    nameKey: 'festivales.map.festivals.latinFest.name',
    datesKey: 'festivales.map.festivals.latinFest.dates',
    cityKey: 'festivales.map.festivals.latinFest.city',
    provinceKey: 'festivales.map.festivals.latinFest.province',
    descriptionKey: 'festivales.map.festivals.latinFest.description',
    howToGetThereKey: 'festivales.map.festivals.latinFest.howToGetThere',
    startDate: '2026-07-18',
    lat: 38.3452,
    lng: -0.4815,
    category: 'latin',
    markerTone: 'rose',
  },
  {
    key: 'reve',
    nameKey: 'festivales.map.festivals.reve.name',
    datesKey: 'festivales.map.festivals.reve.dates',
    cityKey: 'festivales.map.festivals.reve.city',
    provinceKey: 'festivales.map.festivals.reve.province',
    descriptionKey: 'festivales.map.festivals.reve.description',
    howToGetThereKey: 'festivales.map.festivals.reve.howToGetThere',
    startDate: '2026-07-16',
    lat: 39.4699,
    lng: -0.3763,
    category: 'pop',
    markerTone: 'amber',
  },
  {
    key: 'zevra',
    nameKey: 'festivales.map.festivals.zevra.name',
    datesKey: 'festivales.map.festivals.zevra.dates',
    cityKey: 'festivales.map.festivals.zevra.city',
    provinceKey: 'festivales.map.festivals.zevra.province',
    descriptionKey: 'festivales.map.festivals.zevra.description',
    howToGetThereKey: 'festivales.map.festivals.zevra.howToGetThere',
    startDate: '2026-07-24',
    lat: 39.1620,
    lng: -0.2550,
    category: 'urban',
    markerTone: 'teal',
  },
  {
    key: 'medusa',
    nameKey: 'festivales.map.festivals.medusa.name',
    datesKey: 'festivales.map.festivals.medusa.dates',
    cityKey: 'festivales.map.festivals.medusa.city',
    provinceKey: 'festivales.map.festivals.medusa.province',
    descriptionKey: 'festivales.map.festivals.medusa.description',
    howToGetThereKey: 'festivales.map.festivals.medusa.howToGetThere',
    startDate: '2026-08-13',
    lat: 39.1654,
    lng: -0.2531,
    category: 'electronic',
    markerTone: 'violet',
  },
] as const;
