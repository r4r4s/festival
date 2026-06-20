import type { TranslationKey } from '@shared/data-access/i18n/translations';

export type CalendarEventCategory = 'electronic' | 'latin' | 'pop' | 'urban' | 'cultural';

export interface CalendarEvent {
  readonly slug: string;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly genreKey: TranslationKey;
  readonly startDate: string;
  readonly endDate: string;
  readonly category: CalendarEventCategory;
  readonly imageSrc: string;
  readonly detailUrl: string | null;
}

export const CALENDAR_EVENTS: readonly CalendarEvent[] = [
  {
    slug: 'bigsound',
    nameKey: 'calendar.events.bigsound.name',
    locationKey: 'calendar.events.bigsound.location',
    genreKey: 'calendar.events.bigsound.genre',
    startDate: '2026-06-26',
    endDate: '2026-06-27',
    category: 'pop',
    imageSrc: '/assets/images/festivals/bigsound/logo-bigsound.webp',
    detailUrl: '/festivales/bigsound',
  },
  {
    slug: 'rbf',
    nameKey: 'calendar.events.rbf.name',
    locationKey: 'calendar.events.rbf.location',
    genreKey: 'calendar.events.rbf.genre',
    startDate: '2026-07-04',
    endDate: '2026-07-05',
    category: 'latin',
    imageSrc: '/assets/images/festivals/rbf/logo-rbf.webp',
    detailUrl: '/festivales/rbf',
  },
  {
    slug: 'latin-fest-benidorm',
    nameKey: 'calendar.events.latinFestBenidorm.name',
    locationKey: 'calendar.events.latinFestBenidorm.location',
    genreKey: 'calendar.events.latinFestBenidorm.genre',
    startDate: '2026-07-04',
    endDate: '2026-07-05',
    category: 'latin',
    imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    detailUrl: '/festivales/latin-fest',
  },
  {
    slug: 'reve',
    nameKey: 'calendar.events.reve.name',
    locationKey: 'calendar.events.reve.location',
    genreKey: 'calendar.events.reve.genre',
    startDate: '2026-07-16',
    endDate: '2026-07-17',
    category: 'pop',
    imageSrc: '/assets/images/festivals/reve/logo-reve.webp',
    detailUrl: '/festivales/reve',
  },
  {
    slug: 'latin-fest-valencia',
    nameKey: 'calendar.events.latinFestValencia.name',
    locationKey: 'calendar.events.latinFestValencia.location',
    genreKey: 'calendar.events.latinFestValencia.genre',
    startDate: '2026-07-17',
    endDate: '2026-07-18',
    category: 'latin',
    imageSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    detailUrl: '/festivales/latin-fest',
  },
  {
    slug: 'zevra',
    nameKey: 'calendar.events.zevra.name',
    locationKey: 'calendar.events.zevra.location',
    genreKey: 'calendar.events.zevra.genre',
    startDate: '2026-07-24',
    endDate: '2026-07-27',
    category: 'urban',
    imageSrc: '/assets/images/festivals/zevra/logo-zevra.webp',
    detailUrl: '/festivales/zevra',
  },
  {
    slug: 'medusa',
    nameKey: 'calendar.events.medusa.name',
    locationKey: 'calendar.events.medusa.location',
    genreKey: 'calendar.events.medusa.genre',
    startDate: '2026-08-13',
    endDate: '2026-08-17',
    category: 'electronic',
    imageSrc: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
    detailUrl: '/festivales/medusa',
  },
];
