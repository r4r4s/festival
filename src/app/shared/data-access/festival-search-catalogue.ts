export interface SearchFestival {
  readonly slug: string;
  readonly name: string;
  readonly city: string;
  readonly province: string;
  readonly logoSrc: string;
}

export const SEARCH_FESTIVALS: readonly SearchFestival[] = [
  {
    slug: 'bigsound',
    name: 'Bigsound Festival',
    city: 'Valencia',
    province: 'Valencia',
    logoSrc: '/assets/images/festivals/bigsound/logo-bigsound.webp',
  },
  {
    slug: 'latin-fest',
    name: 'Latin Fest',
    city: 'Valencia / Benidorm',
    province: 'Valencia / Alicante',
    logoSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
  },
  {
    slug: 'medusa',
    name: 'Medusa Festival',
    city: 'Cullera',
    province: 'Valencia',
    logoSrc: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
  },
  {
    slug: 'rbf',
    name: 'Reggaeton Beach Festival',
    city: 'Benidorm',
    province: 'Alicante',
    logoSrc: '/assets/images/festivals/rbf/logo-rbf.webp',
  },
  {
    slug: 'reve',
    name: 'Reve Festival',
    city: 'Valencia',
    province: 'Valencia',
    logoSrc: '/assets/images/festivals/reve/logo-reve.webp',
  },
  {
    slug: 'zevra',
    name: 'Zevra Festival',
    city: 'Cullera',
    province: 'Valencia',
    logoSrc: '/assets/images/festivals/zevra/logo-zevra.webp',
  },
];
