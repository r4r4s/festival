import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home.page';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the image card', () => {
    const image = fixture.nativeElement.querySelector('.home-page__image');

    expect(image?.getAttribute('ngsrc') ?? image?.getAttribute('src')).toContain(
      '/assets/images/backgrounds/home-hero-sunset-beach-1200.webp',
    );
  });

  it('keeps the hero as an image-only surface with overlay and empty content layers', () => {
    const root = fixture.nativeElement as HTMLElement;
    const overlay = root.querySelector('.home-page__overlay');
    const content = root.querySelector('.home-page__content');

    expect(overlay).not.toBeNull();
    expect(content).not.toBeNull();
    expect(content?.children.length).toBe(0);
    expect(content?.textContent?.trim()).toBe('');
    expect(root.querySelector('h1, h2, h3, p, button')).toBeNull();
  });
});
