import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { TranslatePipe } from './translate.pipe';

@Component({
  standalone: true,
  imports: [TranslatePipe],
  template: `<span data-testid="label">{{ 'nav.calendar' | t }}</span>`,
})
class HostComponent {}

describe('TranslatePipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();
  });

  it('renders a translated value for a dotted key', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const label = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="label"]',
    );
    expect(label?.textContent).toBe('Calendario');
  });
});
