import { Injectable, signal } from '@angular/core';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

export interface AppNotification {
  readonly messageKey: TranslationKey;
  readonly type: 'error';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly notification = signal<AppNotification | null>(null);

  show(notification: AppNotification): void {
    this.notification.set(notification);
  }

  dismiss(): void {
    this.notification.set(null);
  }
}
