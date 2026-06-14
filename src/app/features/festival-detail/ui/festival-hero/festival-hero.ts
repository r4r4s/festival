import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import {
  LucideCalendar,
  LucideChevronRight,
  LucideExternalLink,
  LucideMapPin,
  LucideStar,
  LucideTicket,
} from '@lucide/angular';

@Component({
  selector: 'fv-festival-hero',
  templateUrl: './festival-hero.html',
  styleUrl: './festival-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    NgOptimizedImage,
    LucideCalendar,
    LucideChevronRight,
    LucideExternalLink,
    LucideMapPin,
    LucideStar,
    LucideTicket,
  ],
})
export class FestivalHeroComponent {}
