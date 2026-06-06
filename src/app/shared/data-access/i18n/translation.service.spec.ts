import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';

import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationService);
  });

  it('resolves a top-level dotted key from the Spanish source', () => {
    expect(service.t('nav.home')).toBe('Inicio');
    expect(service.t('nav.festivals')).toBe('Festivales');
  });

  it('resolves a nested dotted key', () => {
    expect(service.t('home.hero.title')).toContain('Guía de festivales');
    expect(service.t('home.hero.primaryCta')).toBe('Explorar festivales');
  });
});
