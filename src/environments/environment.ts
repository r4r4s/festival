// ============================================================================
// environment.ts — festiVAL · default (development)
// ============================================================================
// Base URLs, feature flags and endpoints belong here — never hardcoded in
// services. See `CLAUDE.md` § Configuration.
// ============================================================================

export const environment = {
  production: false,
  defaultLocale: 'es-ES' as const,
  sanity: {
    projectId: '',
    dataset: 'development',
    apiVersion: '2024-01-01',
    useCdn: false,
  },
} as const;

export type Environment = typeof environment;
