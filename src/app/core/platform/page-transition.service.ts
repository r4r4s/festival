import { inject, Injectable, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ProgressBarState = 'hidden' | 'loading' | 'completing';

@Injectable({ providedIn: 'root' })
export class PageTransitionService {
  readonly progressState = signal<ProgressBarState>('hidden');

  private delayTimer: ReturnType<typeof setTimeout> | null = null;
  private completeTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.clearTimers();
          this.delayTimer = setTimeout(() => {
            this.progressState.set('loading');
          }, 200);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.clearTimers();
          if (this.progressState() === 'loading') {
            this.progressState.set('completing');
            this.completeTimer = setTimeout(() => {
              this.progressState.set('hidden');
            }, 500);
          }
        }
      });
  }

  private clearTimers(): void {
    if (this.delayTimer !== null) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (this.completeTimer !== null) {
      clearTimeout(this.completeTimer);
      this.completeTimer = null;
    }
  }
}
