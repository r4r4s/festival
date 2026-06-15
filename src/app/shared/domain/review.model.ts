import { z } from 'zod';

export const FestivalReviewSchema = z.object({
  id: z.string(),
  festivalSlug: z.string(),
  author: z.string(),
  rating: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  comment: z.string(),
  date: z.string().date(),
  verified: z.boolean(),
  source: z.string().optional(),
});

export type FestivalReview = z.infer<typeof FestivalReviewSchema>;

export interface ReviewStats {
  readonly averageRating: number;
  readonly totalCount: number;
}
