import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { FestivalError } from '@shared/domain/festival-error.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((httpError: unknown) => {
      const status =
        httpError != null &&
        typeof httpError === 'object' &&
        'status' in httpError &&
        typeof (httpError as { status: unknown }).status === 'number'
          ? (httpError as { status: number }).status
          : 0;

      return throwError(() => FestivalError.fromHttpStatus(status, httpError));
    }),
  );
