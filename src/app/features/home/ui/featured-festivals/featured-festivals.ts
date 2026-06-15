import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideCalendar, LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import { FEATURED_FESTIVALS } from '../../data-access/home-catalogue';

@Component({
  selector: 'fv-featured-festivals',
  imports: [NgOptimizedImage, RouterLink, LucideCalendar, LucideMapPin, TranslatePipe],
  templateUrl: './featured-festivals.html',
  styleUrl: './featured-festivals.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedFestivalsComponent {
  readonly isPaused = signal(false);
  readonly festivals = FEATURED_FESTIVALS;

  pause(): void {
    this.isPaused.set(true);
  }

  resume(): void {
    this.isPaused.set(false);
  }
}
