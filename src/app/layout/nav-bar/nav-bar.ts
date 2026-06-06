import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu, LucideMoon, LucideSearch } from '@lucide/angular';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-nav-bar',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, LucideSearch, LucideMoon, LucideMenu, TranslatePipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fv-nav-bar-host' },
})
export class NavBar {
  readonly #translation = inject(TranslationService);

  readonly availableLangs = [
    { code: 'es' as const, label: 'ES' },
    { code: 'ca' as const, label: 'CA' },
    { code: 'en' as const, label: 'EN' },
  ];

  readonly activeLang = this.#translation.activeLang;

  setLang(code: 'es' | 'ca' | 'en'): void {
    this.#translation.setLang(code);
  }
}
