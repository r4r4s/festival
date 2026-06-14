import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FestivalHeroComponent } from './festival-hero';

describe('FestivalHeroComponent', () => {
  let fixture: ComponentFixture<FestivalHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalHeroComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FestivalHeroComponent);
  });

  it('creates', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('hides the rating badge when there are no reviews', () => {
    fixture.detectChanges();
    const rating = fixture.nativeElement.querySelector('[data-testid="festival-hero-rating"]');
    expect(rating).toBeNull();
  });

  it('renders the average rating and review count from stats', () => {
    fixture.componentRef.setInput('stats', { averageRating: 4.6, totalCount: 12 });
    fixture.detectChanges();

    const rating = fixture.nativeElement.querySelector('[data-testid="festival-hero-rating"]');
    expect(rating).not.toBeNull();
    expect(rating.textContent).toContain('4,6');
    expect(rating.textContent).toContain('(12 reseñas)');
  });

  it('uses singular "reseña" when totalCount is 1', () => {
    fixture.componentRef.setInput('stats', { averageRating: 5, totalCount: 1 });
    fixture.detectChanges();

    const rating = fixture.nativeElement.querySelector('[data-testid="festival-hero-rating"]');
    expect(rating.textContent).toContain('(1 reseña)');
  });
});
