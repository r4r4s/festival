import { Routes } from '@angular/router';

export const FESTIVAL_DETAIL_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/festival-detail.page').then((m) => m.FestivalDetailPageComponent),
  },
];
