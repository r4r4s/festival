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
  readonly isPaused = signal(false);

  readonly festivals = [
    {
      slug: 'bigsound',
      dateKey: 'home.featured.cards.bigsound.date',
      nameKey: 'home.featured.cards.bigsound.name',
      locationKey: 'home.featured.cards.bigsound.location',
      image: { src: '/assets/images/festivals/bigsound/logo-bigsound.png', alt: 'Bigsound Festival' },
    },
    {
      slug: 'latin-fest',
      dateKey: 'home.featured.cards.latinFest.date',
      nameKey: 'home.featured.cards.latinFest.name',
      locationKey: 'home.featured.cards.latinFest.location',
      image: { src: '/assets/images/festivals/latin-fest/logo-latin-fest.webp', alt: 'Latin Fest' },
    },
    {
      slug: 'medusa',
      dateKey: 'home.featured.cards.medusa.date',
      nameKey: 'home.featured.cards.medusa.name',
      locationKey: 'home.featured.cards.medusa.location',
      image: { src: '/assets/images/festivals/medusa/logo-medusa-2026.png', alt: 'Medusa Festival' },
    },
    {
      slug: 'rbf',
      dateKey: 'home.featured.cards.rbf.date',
      nameKey: 'home.featured.cards.rbf.name',
      locationKey: 'home.featured.cards.rbf.location',
      image: { src: '/assets/images/festivals/rbf/logo-rbf.png', alt: 'Reggaeton Beach Festival' },
    },
    {
      slug: 'reve',
      dateKey: 'home.featured.cards.reve.date',
      nameKey: 'home.featured.cards.reve.name',
      locationKey: 'home.featured.cards.reve.location',
      image: { src: '/assets/images/festivals/reve/logo-reve.jpeg', alt: 'Reve Festival' },
    },
    {
      slug: 'zevra',
      dateKey: 'home.featured.cards.zevra.date',
      nameKey: 'home.featured.cards.zevra.name',
      locationKey: 'home.featured.cards.zevra.location',
      image: { src: '/assets/images/festivals/zevra/logo-zevra.png', alt: 'Zevra Festival' },
    },
  ] as const satisfies readonly FeaturedFestival[];

  pause(): void {
    this.isPaused.set(true);
  }

  resume(): void {
    this.isPaused.set(false);
  }
}
