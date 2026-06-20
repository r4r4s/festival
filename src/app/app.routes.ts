import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'calendario',
    loadChildren: () =>
      import('@features/calendar/calendar.routes').then(
        (m) => m.CALENDAR_ROUTES,
      ),
  },
  {
    path: 'festivales/:slug',
    loadChildren: () =>
      import('@features/festival-detail/festival-detail.routes').then(
        (m) => m.FESTIVAL_DETAIL_ROUTES,
      ),
  },
];
