import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { of } from 'rxjs';

import { ShellComponent } from './shell';

class TranslocoLoaderStub {
  getTranslation() {
    return of({});
  }
}

describe('ShellComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTransloco({
          config: {
            availableLangs: ['es'],
            defaultLang: 'es',
            fallbackLang: 'es',
            reRenderOnLangChange: false,
            prodMode: false,
          },
          loader: TranslocoLoaderStub,
        }),
      ],
    }).compileComponents();

    TestBed.inject(TranslocoService).setActiveLang('es');
  });

  it('renders the shell chrome and router outlet', () => {
    const fixture = TestBed.createComponent(ShellComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement as HTMLElement;
    expect(host.querySelector('router-outlet')).not.toBeNull();
    expect(host.querySelector('fv-nav-bar')).not.toBeNull();
    expect(host.querySelector('fv-footer')).not.toBeNull();
    expect(host.querySelector('.shell__main')).not.toBeNull();
  });
});
