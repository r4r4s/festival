import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideArrowRight, LucideCalendar } from '@lucide/angular';

import { FeaturedFestivalsComponent } from '../ui/featured-festivals/featured-festivals';
import { FestivalCalendarComponent } from '../ui/festival-calendar/festival-calendar';
import { HomeFestivalMapComponent } from '../ui/home-festival-map/home-festival-map';
import { FESTIVAL_LOCATIONS } from '@shared/data-access/festival-locations';
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
export class HomePageComponent {
  protected readonly festivalLocations = FESTIVAL_LOCATIONS;
}
