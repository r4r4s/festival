import type { TranslationKey } from '@shared/data-access/i18n/translations';

export type FestivalCategory = 'electronica' | 'urbano' | 'pop' | 'latino';

export interface CatalogueFestival {
  readonly slug: string;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly dateKey: TranslationKey;
  readonly dateBadgeKey: TranslationKey;
  readonly categoryKey: TranslationKey;
  readonly category: FestivalCategory;
  readonly posterSrc: string;
  readonly posterAlt: string;
}

export const FESTIVAL_CATALOGUE: readonly CatalogueFestival[] = [
  {
    slug: 'bigsound',
    nameKey: 'festivals.cards.bigsound.name',
    locationKey: 'festivals.cards.bigsound.location',
    dateKey: 'festivals.cards.bigsound.date',
    dateBadgeKey: 'festivals.cards.bigsound.dateBadge',
    categoryKey: 'festivals.categories.pop',
    category: 'pop',
    posterSrc: '/assets/images/festivals/bigsound/cartel-bigsound-valencia-2026.webp',
    posterAlt: 'Bigsound Festival',
  },
  {
    slug: 'medusa',
    nameKey: 'festivals.cards.medusa.name',
    locationKey: 'festivals.cards.medusa.location',
    dateKey: 'festivals.cards.medusa.date',
    dateBadgeKey: 'festivals.cards.medusa.dateBadge',
    categoryKey: 'festivals.categories.electronica',
    category: 'electronica',
    posterSrc: '/assets/images/festivals/medusa/hero-medusa-festival-2026.webp',
    posterAlt: 'Medusa Festival',
  },
  {
    slug: 'zevra',
    nameKey: 'festivals.cards.zevra.name',
    locationKey: 'festivals.cards.zevra.location',
    dateKey: 'festivals.cards.zevra.date',
    dateBadgeKey: 'festivals.cards.zevra.dateBadge',
    categoryKey: 'festivals.categories.urbano',
    category: 'urbano',
    posterSrc: '/assets/images/festivals/zevra/cartel-zevra-2026.webp',
    posterAlt: 'Zevra Festival',
  },
  {
    slug: 'rbf',
    nameKey: 'festivals.cards.rbf.name',
    locationKey: 'festivals.cards.rbf.location',
    dateKey: 'festivals.cards.rbf.date',
    dateBadgeKey: 'festivals.cards.rbf.dateBadge',
    categoryKey: 'festivals.categories.latino',
    category: 'latino',
    posterSrc: '/assets/images/festivals/rbf/logo-rbf.webp',
    posterAlt: 'Reggaeton Beach Festival',
  },
];
