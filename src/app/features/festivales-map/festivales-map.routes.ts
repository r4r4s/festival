import { Routes } from '@angular/router';

export const FESTIVALES_MAP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/festivales-map.page').then((m) => m.FestivalesMapPageComponent),
  },
];
