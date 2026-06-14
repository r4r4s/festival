import { z } from 'zod';

export const FestivalDetailFactsSchema = z.object({
  slug: z.string(),
  checkedAt: z.string().date(),
  location: z.object({
    city: z.string(),
    province: z.string(),
    country: z.string(),
  }),
  genre: z.object({
    primary: z.string(),
    tags: z.array(z.string()),
  }),
  ticket: z.object({
    fromPrice: z.number().nonnegative(),
    feeIncluded: z.boolean(),
    officialUrl: z.string().url(),
  }),
  age: z.object({
    minimumAccess: z.number().int().nonnegative(),
    authorizationRequiredFrom: z.number().int().nonnegative().nullable(),
    authorizationRequiredTo: z.number().int().nonnegative().nullable(),
    adultsOnlyAreas: z.array(z.string()),
  }),
  schedule: z.object({
    published: z.boolean(),
    opensAt: z.string().nullable(),
    closesAt: z.string().nullable(),
    noteUrl: z.string().url(),
  }),
});

export type FestivalDetailFacts = z.infer<typeof FestivalDetailFactsSchema>;
