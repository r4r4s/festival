import {
  ComponentFixture,
  DeferBlockBehavior,
  DeferBlockState,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomePageComponent } from './home.page';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    globalThis.IntersectionObserver ??= class {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds: number[] = [];

      disconnect(): void {
        return;
      }
      observe(): void {
        return;
      }
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
      unobserve(): void {
        return;
      }
    } as unknown as typeof IntersectionObserver;

    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      deferBlockBehavior: DeferBlockBehavior.Manual,
      providers: [provideRouter([])],
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

  it('renders the calendar, featured festivals section and the interactive map section', async () => {
    const deferBlocks = await fixture.getDeferBlocks();
    await deferBlocks[0].render(DeferBlockState.Complete);
    await deferBlocks[1].render(DeferBlockState.Complete);
    await deferBlocks[2].render(DeferBlockState.Complete);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const calendar = root.querySelector('[data-testid="festival-calendar"]');
    const featured = root.querySelector('[data-testid="featured-festivals"]');
    const section = root.querySelector('[data-testid="home-festival-map"]');

    expect(calendar).not.toBeNull();
    expect(calendar?.querySelectorAll('[data-testid="festival-calendar-card"]')).toHaveLength(4);
    expect(featured).not.toBeNull();
    expect(featured?.querySelectorAll('[data-testid="featured-festivals-card-name"]')).toHaveLength(
      12,
    );
    expect(section).not.toBeNull();
    expect(section?.querySelectorAll('[data-testid="home-festival-map-pin"]')).toHaveLength(7);
  });
});
