import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'mapa',
    loadChildren: () =>
      import('@features/festivales-map/festivales-map.routes').then(
        (m) => m.FESTIVALES_MAP_ROUTES,
      ),
  },
];
