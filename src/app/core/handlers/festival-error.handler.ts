import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import * as Sentry from '@sentry/angular';

import { FestivalError, type FestivalErrorCode } from '@shared/domain/festival-error.model';
import { NotificationService } from '@core/notifications/notification.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';

@Injectable()
export class FestivalErrorHandler implements ErrorHandler {
  readonly #dev = isDevMode();
  readonly #notifications = inject(NotificationService);

  handleError(error: unknown): void {
    if (!this.#dev) {
      Sentry.captureException(error);
    }

    if (error instanceof FestivalError) {
      if (this.#dev) {
        console.error(`[FestivalError] ${error.code}: ${error.message}`, error.originalError);
      }
      this.#notifications.show({ messageKey: this.#i18nKey(error.code), type: 'error' });
      return;
    }

    if (this.#dev) {
      console.error('[UnhandledError]', error);
    } else {
      this.#notifications.show({ messageKey: 'error.unknown', type: 'error' });
    }
  }

  #i18nKey(code: FestivalErrorCode): TranslationKey {
    switch (code) {
      case 'NETWORK_ERROR': return 'error.network';
      case 'NOT_FOUND':     return 'error.notFound';
      default:              return 'error.unknown';
    }
  }
}
