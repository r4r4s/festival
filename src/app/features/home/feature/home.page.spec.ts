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

  it('renders the hero copy and static buttons', () => {
    const root = fixture.nativeElement as HTMLElement;
    const overlay = root.querySelector('.home-page__overlay');
    const title = root.querySelector('[data-testid="home-hero-title"]');
    const description = root.querySelector('[data-testid="home-hero-description"]');
    const buttons = root.querySelectorAll('.home-page__button');

    expect(overlay).not.toBeNull();
    expect(title?.textContent?.trim()).toBeTruthy();
    expect(description?.textContent?.trim()).toBeTruthy();
    expect(buttons).toHaveLength(2);
    expect(buttons[0]?.getAttribute('type')).toBe('button');
    expect(buttons[1]?.getAttribute('type')).toBe('button');
  });

  it('renders the featured festivals section', () => {
    const root = fixture.nativeElement as HTMLElement;
    const section = root.querySelector('[data-testid="featured-festivals"]');

    expect(section).not.toBeNull();
    expect(section?.querySelectorAll('[data-testid="featured-festivals-card-name"]')).toHaveLength(8);
  });
});
