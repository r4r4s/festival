import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideArrowRight, LucideCalendar } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-home-page',
  imports: [NgOptimizedImage, LucideArrowRight, LucideCalendar, TranslatePipe],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
