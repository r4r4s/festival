import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { TranslatePipe } from '@shared/pipes/translate.pipe';
import type { CalendarEvent } from '../../data-access/calendar-events';

@Component({
  selector: 'fv-event-tooltip',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './event-tooltip.html',
  styleUrl: './event-tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTooltipComponent {
  readonly event = input.required<CalendarEvent>();
  readonly anchorRect = input.required<DOMRect>();
  readonly navigate = output<string>();

  protected readonly hasImage = computed(() => !!this.event().imageSrc);
  protected readonly hasDetail = computed(() => !!this.event().detailUrl);

  protected readonly formattedDates = computed(() => {
    const fmt = (iso: string) => {
      const [y, m, d] = iso.split('-').map(Number);
      return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    };
    const ev = this.event();
    return ev.startDate === ev.endDate
      ? fmt(ev.startDate)
      : `${fmt(ev.startDate)} — ${fmt(ev.endDate)}`;
  });

  protected readonly style = computed(() => {
    const rect = this.anchorRect();
    const top = rect.bottom + 8;
    const left = Math.max(16, rect.left + rect.width / 2 - 160);
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  });

  protected onNavigate(): void {
    const url = this.event().detailUrl;
    if (url) {
      this.navigate.emit(url);
    }
  }
}
