// ============================================================================
// environment.ts — festiVAL · default (development)
// ============================================================================
// Base URLs, feature flags and endpoints belong here — never hardcoded in
// services. See `CLAUDE.md` § Configuration.
// ============================================================================

export interface Environment {
  production: boolean;
  defaultLocale: 'es-ES';
  sanity: {
    projectId: string;
    dataset: 'development' | 'production';
    apiVersion: '2024-01-01';
    useCdn: boolean;
  };
}

export const environment = {
  production: false,
  defaultLocale: 'es-ES',
  sanity: {
    projectId: '',
    dataset: 'development',
    apiVersion: '2024-01-01',
    useCdn: false,
  },
} satisfies Environment;
