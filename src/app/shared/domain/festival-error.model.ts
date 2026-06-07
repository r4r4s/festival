export type FestivalErrorCode =
  | 'NETWORK_ERROR'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'UNKNOWN_ERROR';

export class FestivalError extends Error {
  readonly code: FestivalErrorCode;
  readonly originalError?: unknown;

  constructor(code: FestivalErrorCode, message: string, originalError?: unknown) {
    super(message);
    this.name = 'FestivalError';
    this.code = code;
    this.originalError = originalError;
  }

  static fromHttpStatus(status: number, originalError?: unknown): FestivalError {
    if (status === 404) {
      return new FestivalError('NOT_FOUND', `Resource not found (${status})`, originalError);
    }
    if (status === 0 || status >= 500) {
      return new FestivalError('NETWORK_ERROR', `Network or server error (${status})`, originalError);
    }
    return new FestivalError('UNKNOWN_ERROR', `Unexpected HTTP error (${status})`, originalError);
  }
}
