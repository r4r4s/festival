import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideArrowRight, LucideCalendar } from '@lucide/angular';

import { FeaturedFestivalsComponent } from '../ui/featured-festivals/featured-festivals';
import { FestivalCalendarComponent } from '../ui/festival-calendar/festival-calendar';
import { HomeFestivalMapComponent } from '../ui/home-festival-map/home-festival-map';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-home-page',
  imports: [
    NgOptimizedImage,
    LucideArrowRight,
    LucideCalendar,
    FestivalCalendarComponent,
    FeaturedFestivalsComponent,
    HomeFestivalMapComponent,
    TranslatePipe,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
