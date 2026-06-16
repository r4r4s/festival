import { RenderMode, ServerRoute } from '@angular/ssr';

import { FESTIVAL_DETAIL_SLUGS } from '@features/festival-detail/data-access/festival-detail-catalogue';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'festivales/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      FESTIVAL_DETAIL_SLUGS.map((slug) => ({ slug })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
