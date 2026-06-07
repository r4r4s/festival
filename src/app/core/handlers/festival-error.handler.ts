import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import { FestivalError } from '@shared/domain/festival-error.model';

@Injectable()
export class FestivalErrorHandler implements ErrorHandler {
  // Sentry will be injected here once integrated (error-handling skill)
  readonly #dev = isDevMode();

  handleError(error: unknown): void {
    if (error instanceof FestivalError) {
      if (this.#dev) {
        console.error(`[FestivalError] ${error.code}: ${error.message}`, error.originalError);
      }
      // TODO(error-handling): send to Sentry in production
      return;
    }

    // Re-throw unhandled errors so Angular's default behavior is preserved
    if (this.#dev) {
      console.error('[UnhandledError]', error);
    }
  }
}
