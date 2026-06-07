import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { IMAGE_LOADER, ImageLoaderConfig, registerLocaleData } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { lastValueFrom } from 'rxjs';

import { TranslocoHttpLoader } from '@core/initializers/transloco.loader';
import { FestivalErrorHandler } from '@core/handlers/festival-error.handler';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { environment } from '@env/environment';
import { routes } from './app.routes';

registerLocaleData(localeEs);

function preloadDefaultLang(transloco: TranslocoService): () => Promise<void> {
  return () => lastValueFrom(transloco.load('es')).then(() => void 0);
}

/**
 * NgOptimizedImage loader. Width-variant rewriting is **opt-in** via
 * `loaderParams.variants`: only assets that ship pre-generated `…-<width>.webp`
 * files (today the home hero, 800/1200/1600) request it, so the responsive
 * `ngSrcset` resolves to the real files. Every other image (festival logos,
 * branding — single source, no variants) is returned untouched, which keeps
 * filenames with numeric suffixes like `logo-medusa-2026.webp` safe.
 */
function festivalImageLoader(config: ImageLoaderConfig): string {
  if (config.width && config.loaderParams?.['variants']) {
    return config.src.replace(/-\d+\.webp$/, `-${config.width}.webp`);
  }
  return config.src;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: FestivalErrorHandler },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptor])),
    { provide: IMAGE_LOADER, useValue: festivalImageLoader },
    provideTransloco({
      config: {
        availableLangs: ['es', 'ca', 'en'],
        defaultLang: 'es',
        fallbackLang: 'es',
        reRenderOnLangChange: true,
        prodMode: environment.production,
        missingHandler: { useFallbackTranslation: true },
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: preloadDefaultLang,
      deps: [TranslocoService],
      multi: true,
    },
  ],
};
