import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect } from 'vitest';
import { By } from '@angular/platform-browser';

import { FeaturedReviewsComponent } from './featured-reviews';
import type { FestivalReview, ReviewStats } from '@shared/domain/review.model';

const MOCK_REVIEWS: FestivalReview[] = [
  {
    id: 'test-01',
    festivalSlug: 'test-fest',
    author: 'Ana M.',
    rating: 5,
    comment: 'Experiencia increíble, repetiré sin duda.',
    date: '2025-08-01',
    verified: true,
  },
  {
    id: 'test-02',
    festivalSlug: 'test-fest',
    author: 'Rafa P.',
    rating: 4,
    comment: 'Muy buen festival, aunque las colas fueron largas.',
    date: '2025-08-02',
    verified: false,
  },
  {
    id: 'test-03',
    festivalSlug: 'test-fest',
    author: 'Laura G.',
    rating: 3,
    comment: 'Bien pero mejorable en la organización.',
    date: '2025-08-03',
    verified: true,
  },
];

const MOCK_STATS: ReviewStats = { averageRating: 4.0, totalCount: 3 };

async function createComponent(
  reviews: readonly FestivalReview[] = MOCK_REVIEWS,
  stats: ReviewStats = MOCK_STATS,
): Promise<ComponentFixture<FeaturedReviewsComponent>> {
  await TestBed.configureTestingModule({
    imports: [FeaturedReviewsComponent],
  }).compileComponents();

  const fixture = TestBed.createComponent(FeaturedReviewsComponent);
  fixture.componentRef.setInput('reviews', reviews);
  fixture.componentRef.setInput('stats', stats);
  fixture.detectChanges();
  return fixture;
}

describe('FeaturedReviewsComponent', () => {
  // ── Render ────────────────────────────────────────────────────────────────

  it('renders the section element', async () => {
    const fixture = await createComponent();
    const el = fixture.debugElement.query(By.css('[data-testid="featured-reviews"]'));
    expect(el).toBeTruthy();
  });

  it('renders the correct number of review cards', async () => {
    const fixture = await createComponent();
    const cards = fixture.debugElement.queryAll(By.css('[data-testid="featured-reviews-card"]'));
    expect(cards.length).toBe(3);
  });

  it('displays the review summary when totalCount > 0', async () => {
    const fixture = await createComponent();
    const summary = fixture.debugElement.query(By.css('[data-testid="featured-reviews-summary"]'));
    expect(summary).toBeTruthy();
  });

  // ── Verified badge ────────────────────────────────────────────────────────

  it('shows the verified badge only for verified reviews', async () => {
    const fixture = await createComponent();
    const badges = fixture.debugElement.queryAll(By.css('[data-testid="featured-reviews-verified"]'));
    const verifiedCount = MOCK_REVIEWS.filter(r => r.verified).length;
    expect(badges.length).toBe(verifiedCount);
  });

  // ── Empty state ───────────────────────────────────────────────────────────

  it('shows the empty state when no reviews are provided', async () => {
    const fixture = await createComponent([], { averageRating: 0, totalCount: 0 });
    const empty = fixture.debugElement.query(By.css('[data-testid="featured-reviews-empty"]'));
    expect(empty).toBeTruthy();
  });

  it('hides the review list when no reviews are provided', async () => {
    const fixture = await createComponent([], { averageRating: 0, totalCount: 0 });
    const list = fixture.debugElement.query(By.css('[data-testid="featured-reviews-list"]'));
    expect(list).toBeNull();
  });

  it('hides the summary when totalCount is 0', async () => {
    const fixture = await createComponent([], { averageRating: 0, totalCount: 0 });
    const summary = fixture.debugElement.query(By.css('[data-testid="featured-reviews-summary"]'));
    expect(summary).toBeNull();
  });

  // ── starsFor ─────────────────────────────────────────────────────────────

  it('starsFor returns 5 elements', async () => {
    const fixture = await createComponent();
    expect(fixture.componentInstance.starsFor(4).length).toBe(5);
  });

  it('starsFor fills the correct number of stars', async () => {
    const fixture = await createComponent();
    const stars = fixture.componentInstance.starsFor(3);
    expect(stars.filter(Boolean).length).toBe(3);
    expect(stars.filter(s => !s).length).toBe(2);
  });

  // ── formatAverage ─────────────────────────────────────────────────────────

  it('formatAverage formats with one decimal using Spanish locale', async () => {
    const fixture = await createComponent();
    expect(fixture.componentInstance.formatAverage(4.3)).toBe('4,3');
    expect(fixture.componentInstance.formatAverage(5)).toBe('5,0');
  });
});
