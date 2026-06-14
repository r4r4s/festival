import { Injectable, computed, inject, signal, type Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';

import {
  FestivalDetailFactsSchema,
  type FestivalDetailFacts,
} from './festival-detail-facts.model';

@Injectable({ providedIn: 'root' })
export class FestivalDetailFactsService {
  readonly #http = inject(HttpClient);
  readonly #dayKey = signal(this.#currentDayKey());

  constructor() {
    this.#scheduleNextRefresh();
  }

  facts(slug: string): Signal<FestivalDetailFacts | null> {
    const factsSignal = toSignal(
      toObservable(this.#dayKey).pipe(
        switchMap((dayKey) => this.#loadFacts(slug, dayKey)),
      ),
      { initialValue: null },
    );

    return computed(() => factsSignal());
  }

  #loadFacts(daySlug: string, dayKey: string) {
    return this.#http
      .get<unknown>(`/festival-detail-${daySlug}.json?day=${dayKey}`)
      .pipe(
        map((raw) => FestivalDetailFactsSchema.parse(raw)),
        catchError(() => of(null)),
      );
  }

  #scheduleNextRefresh(): void {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 5, 0);

    globalThis.setTimeout(() => {
      this.#dayKey.set(this.#currentDayKey());
      this.#scheduleNextRefresh();
    }, nextMidnight.getTime() - now.getTime());
  }

  #currentDayKey(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
