import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavBar } from './nav-bar';

describe('NavBar', () => {
  const realMatchMedia = window.matchMedia;

  beforeEach(async () => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    // Force a deterministic light device so the default toggle state is stable
    // regardless of test ordering / leaked global mocks.
    window.matchMedia = (() => ({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    })) as unknown as typeof window.matchMedia;
    await TestBed.configureTestingModule({
      imports: [NavBar],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    window.matchMedia = realMatchMedia;
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

  it('renders three primary navigation links with Spanish labels', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.nav-bar__nav-link',
    );
    expect(links.length).toBe(3);
    const labels = Array.from(links).map((link) => link.textContent?.trim());
    expect(labels).toEqual(['Inicio', 'Festivales', 'Calendario']);
  });

  it('renders the inicio link with routerLink and test id', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const inicioLink = (fixture.nativeElement as HTMLElement).querySelector(
      '[data-testid="nav-link-inicio"]',
    ) as HTMLAnchorElement | null;
    expect(inicioLink).not.toBeNull();
    expect(inicioLink?.getAttribute('href')).toBe('/');
  });

  it('exposes the search, theme toggle and hamburger controls', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.nav-bar__search svg[lucidesearch]')).not.toBeNull();
    // Light by default in the test environment → sun icon, not pressed.
    const toggle = root.querySelector('.nav-bar__theme-toggle') as HTMLButtonElement | null;
    expect(toggle).not.toBeNull();
    expect(toggle?.getAttribute('aria-pressed')).toBe('false');
    expect(root.querySelector('.nav-bar__theme-toggle svg[lucidesun]')).not.toBeNull();
    expect(root.querySelector('.nav-bar__menu svg[lucidemenu]')).not.toBeNull();
  });

  it('flips the theme toggle icon and aria-pressed when activated', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const toggle = root.querySelector('.nav-bar__theme-toggle') as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();

    expect(toggle.getAttribute('aria-pressed')).toBe('true');
    expect(root.querySelector('.nav-bar__theme-toggle svg[lucidemoon]')).not.toBeNull();
  });

  it('shows the white-letter logo variant in dark mode', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const toggle = root.querySelector('.nav-bar__theme-toggle') as HTMLButtonElement;

    toggle.click();
    fixture.detectChanges();

    const logo = root.querySelector('.nav-bar__brand-img') as HTMLImageElement;
    expect(logo.getAttribute('ng-img')).toBe('true');
    expect(logo.getAttribute('ng-reflect-ng-src') ?? logo.src).toContain(
      'assets/branding/festi-val-logo-dark.webp',
    );
  });
});
