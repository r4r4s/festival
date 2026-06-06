import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideCalendar, LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

interface FeaturedFestival {
  readonly slug: string;
  readonly dateKey: TranslationKey;
  readonly nameKey: TranslationKey;
  readonly locationKey: TranslationKey;
  readonly image: { readonly src: string; readonly alt: string };
}

@Component({
  selector: 'fv-featured-festivals',
  standalone: true,
  imports: [NgOptimizedImage, LucideCalendar, LucideMapPin, TranslatePipe],
  templateUrl: './featured-festivals.html',
  styleUrl: './featured-festivals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedFestivalsComponent {
  // Placeholder image reused across cards until each festival has its own poster
  // committed under src/assets/images/festivals/<slug>/ (asset-organization skill).
  private static readonly PLACEHOLDER_IMG = '/assets/images/backgrounds/home-hero-sunset-beach-1200.webp';

  readonly isPaused = signal(false);
  readonly festivals = [
    {
      slug: 'arenal-sound',
      dateKey: 'home.featured.cards.arenalSound.date',
      nameKey: 'home.featured.cards.arenalSound.name',
      locationKey: 'home.featured.cards.arenalSound.location',
      image: { src: FeaturedFestivalsComponent.PLACEHOLDER_IMG, alt: 'Arenal Sound' },
    },
    {
      slug: 'las-fallas',
      dateKey: 'home.featured.cards.lasFallas.date',
      nameKey: 'home.featured.cards.lasFallas.name',
      locationKey: 'home.featured.cards.lasFallas.location',
      image: { src: FeaturedFestivalsComponent.PLACEHOLDER_IMG, alt: 'Las Fallas' },
    },
    {
      slug: 'la-tomatina',
      dateKey: 'home.featured.cards.laTomatina.date',
      nameKey: 'home.featured.cards.laTomatina.name',
      locationKey: 'home.featured.cards.laTomatina.location',
      image: { src: FeaturedFestivalsComponent.PLACEHOLDER_IMG, alt: 'La Tomatina' },
    },
    {
      slug: 'fib-benicassim',
      dateKey: 'home.featured.cards.fibBenicassim.date',
      nameKey: 'home.featured.cards.fibBenicassim.name',
      locationKey: 'home.featured.cards.fibBenicassim.location',
      image: { src: FeaturedFestivalsComponent.PLACEHOLDER_IMG, alt: 'FIB Benicàssim' },
    },
  ] as const satisfies readonly FeaturedFestival[];

  pause(): void {
    this.isPaused.set(true);
  }

  resume(): void {
    this.isPaused.set(false);
  }
}
