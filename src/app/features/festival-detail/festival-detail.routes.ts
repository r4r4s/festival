import { Routes } from '@angular/router';

import { festivalDetailGuard } from './data-access/festival-detail.guard';

export const FESTIVAL_DETAIL_ROUTES: Routes = [
  {
    path: '',
    canActivate: [festivalDetailGuard],
    loadComponent: () =>
      import('./feature/festival-detail.page').then((m) => m.FestivalDetailPageComponent),
  },
];
