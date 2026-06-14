import { Injectable } from '@angular/core';

import type { FestivalReview, ReviewStats } from '@shared/domain/review.model';
import { REVIEWS_BY_FESTIVAL } from './reviews.data';

// Number of featured reviews shown per day.
const FEATURED_COUNT = 3;

/**
 * Computes a deterministic seed from a festival slug and a UTC date.
 *
 * Strategy:
 *  1. Build a numeric dateKey (YYYYMMDD) in UTC so all users share the same day
 *     regardless of their local timezone.
 *  2. Hash the festival slug with djb2 to produce a festival-specific offset.
 *  3. Mix both values so (festival, date) pairs are well-distributed.
 *
 * The result changes every calendar day and differs per festival, guaranteeing
 * that the same subset is shown to every user on the same day while rotating
 * the next day.
 */
function computeDailySeed(festivalSlug: string, date: Date): number {
  const dateKey =
    date.getUTCFullYear() * 10000 +
    (date.getUTCMonth() + 1) * 100 +
    date.getUTCDate();

  // djb2 hash — positive 32-bit unsigned result
  let slugHash = 5381;
  for (let i = 0; i < festivalSlug.length; i++) {
    slugHash = (Math.imul(slugHash, 33) ^ festivalSlug.charCodeAt(i)) >>> 0;
  }

  // XOR-mix with a large prime to avoid seed collisions across festivals
  return (dateKey * 1_000_003 + slugHash) >>> 0;
}

@Injectable({ providedIn: 'root' })
export class ReviewRotationService {
  /**
   * Returns up to `FEATURED_COUNT` reviews for the given festival,
   * deterministically selected based on today's UTC date.
   *
   * Calling this multiple times on the same day with the same slug always
   * returns the same subset. The subset advances by one position each day.
   */
  getFeaturedReviews(
    festivalSlug: string,
    date: Date = new Date(),
  ): readonly FestivalReview[] {
    const pool = REVIEWS_BY_FESTIVAL.get(festivalSlug) ?? [];
    if (pool.length === 0) return [];

    const seed = computeDailySeed(festivalSlug, date);
    const startIndex = seed % pool.length;
    const count = Math.min(FEATURED_COUNT, pool.length);

    return Array.from({ length: count }, (_, i) => pool[(startIndex + i) % pool.length]);
  }

  /** Aggregate statistics for all reviews of a given festival. */
  getStats(festivalSlug: string): ReviewStats {
    const pool = REVIEWS_BY_FESTIVAL.get(festivalSlug) ?? [];
    if (pool.length === 0) return { averageRating: 0, totalCount: 0 };

    const sum = pool.reduce((acc, r) => acc + r.rating, 0);
    return {
      averageRating: Math.round((sum / pool.length) * 10) / 10,
      totalCount: pool.length,
    };
  }
}
