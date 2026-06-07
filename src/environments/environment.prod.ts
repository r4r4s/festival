// ============================================================================
// environment.prod.ts — festiVAL · production
// ============================================================================

import type { Environment } from './environment';

export const environment: Environment = {
  production: true,
  defaultLocale: 'es-ES',
  baseUrl: 'https://festival.example.com',
  sanity: {
    projectId: '',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: true,
  },
  maps: {
    styleUrl: '/assets/maps/festival-dark.json',
    center: [-0.40, 39.25],
    zoom: 7.2,
  },
} as const;
