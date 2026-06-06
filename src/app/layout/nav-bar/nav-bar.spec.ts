import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavBar } from './nav-bar';

describe('NavBar', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the brand logo from the project branding assets', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const img = (fixture.nativeElement as HTMLElement).querySelector(
      '.nav-bar__brand-img',
    ) as HTMLImageElement | null;
    expect(img).not.toBeNull();
    expect(img?.getAttribute('ng-img')).toBe('true');
    expect(img?.getAttribute('alt')).toBe('festiVAL');
    expect(img?.getAttribute('src') ?? '').toContain(
      'assets/branding/festi-val-logo.webp',
    );
  });

  it('renders five primary navigation links with Spanish labels', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.nav-bar__nav-link',
    );
    expect(links.length).toBe(5);
    const labels = Array.from(links).map((link) => link.textContent?.trim());
    expect(labels).toEqual([
      'Inicio',
      'Festivales',
      'Calendario',
      'Explorar',
      'Sobre nosotros',
    ]);
  });

  it('exposes the search, theme toggle and hamburger controls', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.nav-bar__search svg[lucidesearch]')).not.toBeNull();
    expect(root.querySelector('.nav-bar__theme-toggle svg[lucidemoon]')).not.toBeNull();
    expect(root.querySelector('.nav-bar__menu svg[lucidemenu]')).not.toBeNull();
  });
});
