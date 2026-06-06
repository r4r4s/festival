// ============================================================================
// environment.prod.ts — festiVAL · production
// ============================================================================

import type { Environment } from './environment';

export const environment: Environment = {
  production: true,
  defaultLocale: 'es-ES',
  sanity: {
    projectId: '',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  },
} as const;
