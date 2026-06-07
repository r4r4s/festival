import { z } from 'zod';

const ArtistSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  genero: z.string().optional(),
  urlSpotify: z.string().url().optional(),
  urlInstagram: z.string().url().optional(),
});

export const FestivalSchema = z.object({
  slug: z.string(),
  nombre: z.string(),
  provincia: z.enum(['Valencia', 'Alicante', 'Castellón']),
  ciudad: z.string(),
  fechaInicio: z.string().date(),
  fechaFin: z.string().date(),
  generos: z.array(z.string()),
  cartel: z.array(ArtistSchema),
  precioDesde: z.number().nonnegative(),
  urlOficial: z.string().url(),
  poster: z.object({
    src: z.string(),
    alt: z.string(),
  }),
  ubicacion: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
});

export type Artist = z.infer<typeof ArtistSchema>;
export type Festival = z.infer<typeof FestivalSchema>;
