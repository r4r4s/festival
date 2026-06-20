import { Routes } from '@angular/router';

export const FESTIVAL_LIST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/festival-list.page').then(
        (m) => m.FestivalListPageComponent,
      ),
  },
];
