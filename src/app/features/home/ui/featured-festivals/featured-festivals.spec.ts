import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedFestivalsComponent } from './featured-festivals';

describe('FeaturedFestivalsComponent', () => {
  let component: FeaturedFestivalsComponent;
  let fixture: ComponentFixture<FeaturedFestivalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedFestivalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedFestivalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('renders the section title without a view-all action', () => {
    const root = fixture.nativeElement as HTMLElement;
    const title = root.querySelector('[data-testid="featured-festivals-title"]');
    const viewAll = root.querySelector('[data-testid="featured-festivals-view-all"]');

    expect(title).not.toBeNull();
    expect(viewAll).toBeNull();
  });

  it('renders one card per canonical festival', () => {
    const root = fixture.nativeElement as HTMLElement;
    const canonicalGroup = root.querySelector('.featured-festivals__group:not([aria-hidden])');
    const names = canonicalGroup?.querySelectorAll('[data-testid="featured-festivals-card-name"]');

    expect(names).toHaveLength(component.festivals.length);
  });

  it('places the date pill on every card', () => {
    const root = fixture.nativeElement as HTMLElement;
    const canonicalGroup = root.querySelector('.featured-festivals__group:not([aria-hidden])');
    const dates = canonicalGroup?.querySelectorAll('.featured-festivals__date');

    expect(dates).toHaveLength(component.festivals.length);
  });

  it('duplicates the track for carousel continuity', () => {
    const root = fixture.nativeElement as HTMLElement;
    const groups = root.querySelectorAll('.featured-festivals__group');

    expect(groups).toHaveLength(2);
    expect(groups[1]?.getAttribute('aria-hidden')).toBe('true');
  });

  it('pauses and resumes the carousel interaction state', () => {
    const root = fixture.nativeElement as HTMLElement;
    const viewport = root.querySelector('[data-testid="featured-festivals-viewport"]') as HTMLElement;
    const track = root.querySelector('[data-testid="featured-festivals-track"]') as HTMLElement;

    viewport.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    expect(track.classList.contains('featured-festivals__track--paused')).toBe(true);

    viewport.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    expect(track.classList.contains('featured-festivals__track--paused')).toBe(false);
  });
});
