import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Footer } from './footer';

describe('Footer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders the brand logo from the project branding assets', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const img = (fixture.nativeElement as HTMLElement).querySelector(
      '.footer__logo',
    ) as HTMLImageElement | null;
    expect(img).not.toBeNull();
    expect(img?.getAttribute('ng-img')).toBe('true');
    expect(img?.getAttribute('alt')).toBe('festiVAL');
    expect(img?.getAttribute('src') ?? '').toContain(
      'assets/branding/festi-val-logo.webp',
    );
  });

  it('renders the brand tagline copy', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const tagline = (fixture.nativeElement as HTMLElement).querySelector(
      '.footer__tagline',
    );
    expect(tagline?.textContent?.trim()).toBe(
      'Tu guía de festivales en la Comunitat Valenciana. Música, cultura y verano.',
    );
  });

  it('exposes the four monochromatic social links', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('[data-testid="footer-social-instagram"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="footer-social-x"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="footer-social-youtube"]')).not.toBeNull();
    expect(root.querySelector('[data-testid="footer-social-spotify"]')).not.toBeNull();
    expect(root.querySelectorAll('.footer__social-link').length).toBe(4);
  });

  it('renders the three navigation columns with Spanish titles', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const titles = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.footer__col-title'),
    ).map((node) => node.textContent?.trim());
    expect(titles).toEqual(['Explora', 'Información', 'Legal']);
  });

  it('shows the copyright notice', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('.footer__copyright')?.textContent?.trim()).toBe(
      '© 2026 festiVAL. Todos los derechos reservados.',
    );
  });
});
