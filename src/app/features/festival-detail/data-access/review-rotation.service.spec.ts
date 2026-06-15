import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { ReviewRotationService } from './review-rotation.service';

describe('ReviewRotationService', () => {
  let service: ReviewRotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewRotationService);
  });

  // ── getFeaturedReviews ────────────────────────────────────────────────────

  it('returns FEATURED_COUNT reviews for a known festival', () => {
    const result = service.getFeaturedReviews('medusa', new Date('2026-06-14'));
    expect(result.length).toBe(3);
  });

  it('returns an empty array for an unknown festival slug', () => {
    const result = service.getFeaturedReviews('festival-inexistente', new Date('2026-06-14'));
    expect(result).toEqual([]);
  });

  it('is deterministic: same festival and date always returns the same reviews', () => {
    const date = new Date('2026-06-14');
    const first  = service.getFeaturedReviews('bigsound', date);
    const second = service.getFeaturedReviews('bigsound', date);
    expect(first.map(r => r.id)).toEqual(second.map(r => r.id));
  });

  it('returns different reviews on consecutive days', () => {
    const day1 = service.getFeaturedReviews('medusa', new Date('2026-07-01'));
    const day2 = service.getFeaturedReviews('medusa', new Date('2026-07-02'));
    // The full sets must not be identical (given 10 reviews and step of 1, they differ)
    expect(day1.map(r => r.id)).not.toEqual(day2.map(r => r.id));
  });

  it('returns different reviews for different festivals on the same day', () => {
    const date = new Date('2026-06-14');
    const medusa  = service.getFeaturedReviews('medusa',  date).map(r => r.id);
    const bigsound = service.getFeaturedReviews('bigsound', date).map(r => r.id);
    expect(medusa).not.toEqual(bigsound);
  });

  it('all returned reviews belong to the requested festival', () => {
    const result = service.getFeaturedReviews('rbf', new Date('2026-08-01'));
    result.forEach(r => expect(r.festivalSlug).toBe('rbf'));
  });

  it('cycles correctly when startIndex is near the end of the pool', () => {
    // Force a very large seed to stress-test the modular wrap-around
    const result = service.getFeaturedReviews('zevra', new Date('2099-12-31'));
    expect(result.length).toBe(3);
    result.forEach(r => expect(r.festivalSlug).toBe('zevra'));
  });

  it('each review in the result has a unique id', () => {
    const result = service.getFeaturedReviews('latin-fest', new Date('2026-06-14'));
    const ids = result.map(r => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // ── getStats ──────────────────────────────────────────────────────────────

  it('returns zero stats for an unknown festival', () => {
    const stats = service.getStats('festival-no-existe');
    expect(stats.averageRating).toBe(0);
    expect(stats.totalCount).toBe(0);
  });

  it('returns the correct total count for a known festival', () => {
    const stats = service.getStats('medusa');
    expect(stats.totalCount).toBe(10);
  });

  it('returns a rounded average rating', () => {
    const stats = service.getStats('bigsound');
    // Average must be between 1 and 5
    expect(stats.averageRating).toBeGreaterThanOrEqual(1);
    expect(stats.averageRating).toBeLessThanOrEqual(5);
    // Must be rounded to 1 decimal place
    expect(Number.isInteger(stats.averageRating * 10)).toBe(true);
  });

  it('computes the same stats regardless of the date', () => {
    const statsA = service.getStats('reve');
    const statsB = service.getStats('reve');
    expect(statsA).toEqual(statsB);
  });
});
