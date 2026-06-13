import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PageTransitionService } from './page-transition.service';

describe('PageTransitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });

  it('creates', () => {
    expect(TestBed.inject(PageTransitionService)).toBeTruthy();
  });

  it('starts with hidden state', () => {
    const svc = TestBed.inject(PageTransitionService);
    expect(svc.progressState()).toBe('hidden');
  });
});
