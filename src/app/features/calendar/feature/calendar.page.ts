import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  LucideChevronLeft,
  LucideChevronRight,
} from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { CALENDAR_EVENTS, type CalendarEvent } from '../data-access/calendar-events';
import { CalendarGridComponent } from '../ui/calendar-grid/calendar-grid';
import { EventTooltipComponent } from '../ui/event-tooltip/event-tooltip';

const MONTH_KEYS: readonly TranslationKey[] = [
  'calendar.months.january',
  'calendar.months.february',
  'calendar.months.march',
  'calendar.months.april',
  'calendar.months.may',
  'calendar.months.june',
  'calendar.months.july',
  'calendar.months.august',
  'calendar.months.september',
  'calendar.months.october',
  'calendar.months.november',
  'calendar.months.december',
];

@Component({
  selector: 'fv-calendar-page',
  imports: [
    LucideChevronLeft,
    LucideChevronRight,
    TranslatePipe,
    CalendarGridComponent,
    EventTooltipComponent,
  ],
  templateUrl: './calendar.page.html',
  styleUrl: './calendar.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  readonly #router = inject(Router);

  protected readonly currentYear = signal(new Date().getFullYear());
  protected readonly currentMonth = signal(new Date().getMonth());
  protected readonly tooltipData = signal<{ event: CalendarEvent; rect: DOMRect } | null>(null);

  protected readonly monthLabel = computed<TranslationKey>(
    () => MONTH_KEYS[this.currentMonth()],
  );

  protected readonly yearLabel = computed(() => this.currentYear());

  protected readonly visibleEvents = computed(() => {
    const y = this.currentYear();
    const m = this.currentMonth();
    const monthStart = new Date(y, m, 1);
    const monthEnd = new Date(y, m + 1, 0);

    return CALENDAR_EVENTS.filter((ev) => {
      const [sy, sm, sd] = ev.startDate.split('-').map(Number);
      const [ey, em, ed] = ev.endDate.split('-').map(Number);
      const start = new Date(sy, sm - 1, sd);
      const end = new Date(ey, em - 1, ed);
      return end >= monthStart && start <= monthEnd;
    });
  });

  protected readonly agendaEvents = computed(() => {
    return [...this.visibleEvents()].sort((a, b) => a.startDate.localeCompare(b.startDate));
  });

  protected readonly isCurrentMonth = computed(() => {
    const now = new Date();
    return this.currentYear() === now.getFullYear() && this.currentMonth() === now.getMonth();
  });

  protected goToday(): void {
    const now = new Date();
    this.currentYear.set(now.getFullYear());
    this.currentMonth.set(now.getMonth());
  }

  protected goPrev(): void {
    let m = this.currentMonth() - 1;
    let y = this.currentYear();
    if (m < 0) {
      m = 11;
      y--;
    }
    this.currentMonth.set(m);
    this.currentYear.set(y);
  }

  protected goNext(): void {
    let m = this.currentMonth() + 1;
    let y = this.currentYear();
    if (m > 11) {
      m = 0;
      y++;
    }
    this.currentMonth.set(m);
    this.currentYear.set(y);
  }

  protected onEventHover(data: { event: CalendarEvent; rect: DOMRect } | null): void {
    this.tooltipData.set(data);
  }

  protected onEventClick(event: CalendarEvent): void {
    this.tooltipData.set(null);
    if (event.detailUrl) {
      this.#router.navigateByUrl(event.detailUrl);
    }
  }

  protected onTooltipNavigate(url: string): void {
    this.tooltipData.set(null);
    this.#router.navigateByUrl(url);
  }

  protected formatAgendaDate(iso: string): string {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }
}
