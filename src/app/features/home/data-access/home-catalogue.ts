import type { TranslationKey } from '@shared/data-access/i18n/translations';

export interface FeaturedFestivalEntry {
  readonly slug: string;
  readonly dateKey: TranslationKey;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly image: { readonly src: string; readonly alt: string };
}

export const FEATURED_FESTIVALS = [
  {
    slug: 'bigsound',
    dateKey: 'home.featured.cards.bigsound.date',
    nameKey: 'home.featured.cards.bigsound.name',
    locationKey: 'home.featured.cards.bigsound.location',
    image: { src: '/assets/images/festivals/bigsound/logo-bigsound.webp', alt: 'Bigsound Festival' },
  },
  {
    slug: 'latin-fest',
    dateKey: 'home.featured.cards.latinFest.date',
    nameKey: 'home.featured.cards.latinFest.name',
    locationKey: 'home.featured.cards.latinFest.location',
    image: { src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp', alt: 'Latin Fest' },
  },
  {
    slug: 'medusa',
    dateKey: 'home.featured.cards.medusa.date',
    nameKey: 'home.featured.cards.medusa.name',
    locationKey: 'home.featured.cards.medusa.location',
    image: { src: '/assets/images/festivals/medusa/logo-medusa-2026.webp', alt: 'Medusa Festival' },
  },
  {
    slug: 'rbf',
    dateKey: 'home.featured.cards.rbf.date',
    nameKey: 'home.featured.cards.rbf.name',
    locationKey: 'home.featured.cards.rbf.location',
    image: { src: '/assets/images/festivals/rbf/logo-rbf.webp', alt: 'Reggaeton Beach Festival' },
  },
  {
    slug: 'reve',
    dateKey: 'home.featured.cards.reve.date',
    nameKey: 'home.featured.cards.reve.name',
    locationKey: 'home.featured.cards.reve.location',
    image: { src: '/assets/images/festivals/reve/logo-reve.webp', alt: 'Reve Festival' },
  },
  {
    slug: 'zevra',
    dateKey: 'home.featured.cards.zevra.date',
    nameKey: 'home.featured.cards.zevra.name',
    locationKey: 'home.featured.cards.zevra.location',
    image: { src: '/assets/images/festivals/zevra/logo-zevra.webp', alt: 'Zevra Festival' },
  },
] as const satisfies readonly FeaturedFestivalEntry[];

export type CalendarMonth = 'june' | 'july' | 'august';
export type CalendarTone = 'med-blue' | 'coral' | 'orange' | 'blue';
export type CalendarCardAlign = 'start' | 'center' | 'end';

export interface CalendarMonthData {
  readonly key: CalendarMonth;
  readonly labelKey: TranslationKey;
  readonly days: readonly string[];
}

export interface CalendarFestivalEntry {
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
  readonly tone: CalendarTone;
  readonly cardAlign: CalendarCardAlign;
  readonly cardOffset: string;
}

export const CALENDAR_MONTH_SEGMENTS = [
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
] as const satisfies readonly CalendarMonthData[];

export const CALENDAR_FESTIVALS = [
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
    slug: 'latin-fest',
    month: 'july',
    dayLabel: '17',
    position: 49,
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
] as const satisfies readonly CalendarFestivalEntry[];
