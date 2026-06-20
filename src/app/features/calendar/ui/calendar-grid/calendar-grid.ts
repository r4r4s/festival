import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { NgClass } from '@angular/common';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import type { CalendarEvent } from '../../data-access/calendar-events';

export interface CalendarDay {
  readonly date: Date;
  readonly dayNumber: number;
  readonly isCurrentMonth: boolean;
  readonly isToday: boolean;
  readonly isWeekend: boolean;
}

export interface EventSegment {
  readonly event: CalendarEvent;
  readonly lane: number;
  readonly isStart: boolean;
  readonly isEnd: boolean;
  readonly spanInRow: number;
  readonly colStart: number;
}

@Component({
  selector: 'fv-calendar-grid',
  imports: [NgClass, TranslatePipe],
  templateUrl: './calendar-grid.html',
  styleUrl: './calendar-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarGridComponent {
  readonly year = input.required<number>();
  readonly month = input.required<number>();
  readonly events = input.required<readonly CalendarEvent[]>();
  readonly eventHover = output<{ event: CalendarEvent; rect: DOMRect } | null>();
  readonly eventClick = output<CalendarEvent>();

  protected readonly weekdays: TranslationKey[] = [
    'calendar.weekdays.mon',
    'calendar.weekdays.tue',
    'calendar.weekdays.wed',
    'calendar.weekdays.thu',
    'calendar.weekdays.fri',
    'calendar.weekdays.sat',
    'calendar.weekdays.sun',
  ];

  protected readonly hoveredSlug = signal<string | null>(null);

  protected readonly weeks = computed(() => {
    const y = this.year();
    const m = this.month();
    return this.#buildWeeks(y, m);
  });

  protected readonly eventRows = computed(() => {
    const weeks = this.weeks();
    const events = this.events();
    return weeks.map((week) => this.#layoutEventsForWeek(week, events));
  });

  protected readonly maxLanes = computed(() => {
    const rows = this.eventRows();
    return rows.map((segments) => {
      if (segments.length === 0) return 0;
      return Math.max(...segments.map((s) => s.lane)) + 1;
    });
  });

  protected categoryColor(event: CalendarEvent): string {
    switch (event.category) {
      case 'electronic': return 'var(--fv-cal-electronic)';
      case 'urban': return 'var(--fv-cal-urban)';
      case 'pop': return 'var(--fv-cal-pop)';
      case 'latin': return 'var(--fv-cal-latin)';
      case 'cultural': return 'var(--fv-cal-cultural)';
    }
  }

  protected categoryBg(event: CalendarEvent): string {
    switch (event.category) {
      case 'electronic': return 'var(--fv-cal-electronic-bg)';
      case 'urban': return 'var(--fv-cal-urban-bg)';
      case 'pop': return 'var(--fv-cal-pop-bg)';
      case 'latin': return 'var(--fv-cal-latin-bg)';
      case 'cultural': return 'var(--fv-cal-cultural-bg)';
    }
  }

  protected onEventMouseEnter(event: CalendarEvent, el: HTMLElement): void {
    this.hoveredSlug.set(event.slug);
    this.eventHover.emit({ event, rect: el.getBoundingClientRect() });
  }

  protected onEventMouseLeave(): void {
    this.hoveredSlug.set(null);
    this.eventHover.emit(null);
  }

  protected onEventClicked(event: CalendarEvent): void {
    this.eventClick.emit(event);
  }

  protected onEventKeydown(e: KeyboardEvent, event: CalendarEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.eventClick.emit(event);
    }
  }

  protected trackWeek(_: number, week: CalendarDay[]): string {
    return `${week[0].date.getTime()}`;
  }

  protected trackDay(_: number, day: CalendarDay): number {
    return day.date.getTime();
  }

  protected trackSegment(_: number, segment: EventSegment): string {
    return `${segment.event.slug}-${segment.colStart}-${segment.lane}`;
  }

  #buildWeeks(year: number, month: number): CalendarDay[][] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let startDow = firstDay.getDay();
    if (startDow === 0) startDow = 7;

    const gridStart = new Date(firstDay);
    gridStart.setDate(gridStart.getDate() - (startDow - 1));

    const weeks: CalendarDay[][] = [];
    const cursor = new Date(gridStart);

    for (let w = 0; w < 6; w++) {
      const week: CalendarDay[] = [];
      for (let d = 0; d < 7; d++) {
        const date = new Date(cursor);
        date.setHours(0, 0, 0, 0);
        const dow = date.getDay();
        week.push({
          date,
          dayNumber: date.getDate(),
          isCurrentMonth: date.getMonth() === month && date.getFullYear() === year,
          isToday: date.getTime() === today.getTime(),
          isWeekend: dow === 0 || dow === 6,
        });
        cursor.setDate(cursor.getDate() + 1);
      }
      weeks.push(week);

      if (cursor.getMonth() !== month && cursor > lastDay) {
        break;
      }
    }

    return weeks;
  }

  #layoutEventsForWeek(
    week: CalendarDay[],
    events: readonly CalendarEvent[],
  ): EventSegment[] {
    const weekStart = week[0].date.getTime();
    const weekEnd = week[6].date.getTime();
    const segments: EventSegment[] = [];
    const lanes: { end: number }[] = [];

    const relevant = events
      .filter((ev) => {
        const evStart = this.#parseDate(ev.startDate).getTime();
        const evEnd = this.#parseDate(ev.endDate).getTime();
        return evEnd >= weekStart && evStart <= weekEnd;
      })
      .sort((a, b) => {
        const diff = this.#parseDate(a.startDate).getTime() - this.#parseDate(b.startDate).getTime();
        if (diff !== 0) return diff;
        const aDur = this.#parseDate(a.endDate).getTime() - this.#parseDate(a.startDate).getTime();
        const bDur = this.#parseDate(b.endDate).getTime() - this.#parseDate(b.startDate).getTime();
        return bDur - aDur;
      });

    for (const ev of relevant) {
      const evStart = this.#parseDate(ev.startDate);
      const evEnd = this.#parseDate(ev.endDate);

      const visStart = Math.max(evStart.getTime(), weekStart);
      const visEnd = Math.min(evEnd.getTime(), weekEnd);

      const colStart = Math.round((visStart - weekStart) / 86400000);
      const colEnd = Math.round((visEnd - weekStart) / 86400000);
      const spanInRow = colEnd - colStart + 1;

      let lane = 0;
      while (lanes[lane] && lanes[lane].end >= colStart) {
        lane++;
      }
      lanes[lane] = { end: colEnd };

      segments.push({
        event: ev,
        lane,
        isStart: evStart.getTime() >= weekStart,
        isEnd: evEnd.getTime() <= weekEnd,
        spanInRow,
        colStart,
      });
    }

    return segments;
  }

  #parseDate(iso: string): Date {
    const [y, m, d] = iso.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
}
