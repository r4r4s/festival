import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideCalendar, LucideHeart, LucideMapPin } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { CatalogueFestival } from '../../data-access/festival-catalogue';

@Component({
  selector: 'fv-festival-card',
  imports: [NgOptimizedImage, LucideCalendar, LucideHeart, LucideMapPin, TranslatePipe],
  templateUrl: './festival-card.html',
  styleUrl: './festival-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FestivalCardComponent {
  readonly festival = input.required<CatalogueFestival>();
  readonly navigate = output<string>();
  readonly toggleFavourite = output<string>();

  protected onCardClick(): void {
    this.navigate.emit(this.festival().slug);
  }

  protected onFavouriteClick(event: Event): void {
    event.stopPropagation();
    this.toggleFavourite.emit(this.festival().slug);
  }
}
