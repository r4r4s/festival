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

  it('renders four primary navigation items with Spanish labels', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const links = (fixture.nativeElement as HTMLElement).querySelectorAll(
      '.nav-bar__nav-link',
    );
    expect(links.length).toBe(4);
    const labels = Array.from(links).map((link) => link.textContent?.trim());
    expect(labels).toEqual(['Inicio', 'Festivales', 'Calendario', 'Mapa']);
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

  it('renders both logo variants so CSS can pick the right one per theme', () => {
    const fixture = TestBed.createComponent(NavBar);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    const lightLogo = root.querySelector('.nav-bar__brand-img--light') as HTMLImageElement;
    const darkLogo = root.querySelector('.nav-bar__brand-img--dark') as HTMLImageElement;

    expect(lightLogo).not.toBeNull();
    expect(darkLogo).not.toBeNull();
    expect(lightLogo.getAttribute('ng-reflect-ng-src') ?? lightLogo.src).toContain(
      'assets/branding/festi-val-logo.webp',
    );
    expect(darkLogo.getAttribute('ng-reflect-ng-src') ?? darkLogo.src).toContain(
      'assets/branding/festi-val-logo-dark.webp',
    );
    // The dark variant is the duplicate; only the light one stays in the a11y tree.
    expect(darkLogo.getAttribute('aria-hidden')).toBe('true');
  });
});
