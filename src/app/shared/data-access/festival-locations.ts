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
    lat: 39.42903614897183,
    lng: -0.46784232712277507,
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
    lat: 38.29607256494144,
    lng: -0.5741617845405498,
    category: 'latin',
    markerTone: 'rose',
  },
  {
    key: 'latinValencia',
    nameKey: 'festivales.map.festivals.latinValencia.name',
    datesKey: 'festivales.map.festivals.latinValencia.dates',
    cityKey: 'festivales.map.festivals.latinValencia.city',
    provinceKey: 'festivales.map.festivals.latinValencia.province',
    descriptionKey: 'festivales.map.festivals.latinValencia.description',
    howToGetThereKey: 'festivales.map.festivals.latinValencia.howToGetThere',
    startDate: '2026-07-17',
    lat: 39.49454399416732,
    lng: -0.364468709822233,
    category: 'latin',
    markerTone: 'rose',
  },
  {
    key: 'latinBenidorm',
    nameKey: 'festivales.map.festivals.latinBenidorm.name',
    datesKey: 'festivales.map.festivals.latinBenidorm.dates',
    cityKey: 'festivales.map.festivals.latinBenidorm.city',
    provinceKey: 'festivales.map.festivals.latinBenidorm.province',
    descriptionKey: 'festivales.map.festivals.latinBenidorm.description',
    howToGetThereKey: 'festivales.map.festivals.latinBenidorm.howToGetThere',
    startDate: '2026-07-18',
    lat: 38.54748074422395,
    lng: -0.13898330683545446,
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
    lat: 39.44921869967149,
    lng: -0.3643244397614549,
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
    lat: 39.154847058872114,
    lng: -0.2437427679436067,
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
    lat: 39.15434989735872,
    lng: -0.243329265792136,
    category: 'electronic',
    markerTone: 'violet',
  },
] as const;
