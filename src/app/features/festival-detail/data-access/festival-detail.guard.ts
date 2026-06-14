import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

import { isFestivalDetailSlug } from './festival-detail-catalogue';

export const festivalDetailGuard: CanActivateFn = (route) => {
  const slug = route.paramMap.get('slug') ?? '';
  if (isFestivalDetailSlug(slug)) {
    return true;
  }
  return inject(Router).createUrlTree(['/']);
};
