import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';

import { TranslationService } from '@shared/data-access/i18n/translation.service';
import type { TranslationKey } from '@shared/data-access/i18n/translations';
import { TranslatePipe } from '@shared/pipes/translate.pipe';

interface SpotifyPlaylistEntry {
  readonly slug: string;
  readonly nameKey: TranslationKey;
  readonly descriptionKey: TranslationKey;
  readonly logoSrc: string;
  readonly embedUrl: string;
}

const SPOTIFY_PLAYLISTS: readonly SpotifyPlaylistEntry[] = [
  {
    slug: 'zevra',
    nameKey: 'home.playlists.cards.zevra.name',
    descriptionKey: 'home.playlists.cards.zevra.description',
    logoSrc: '/assets/images/festivals/zevra/logo-zevra.webp',
    embedUrl: 'https://open.spotify.com/embed/playlist/5dg8anqi9vdJTuFPmkwvXA',
  },
  {
    slug: 'medusa',
    nameKey: 'home.playlists.cards.medusa.name',
    descriptionKey: 'home.playlists.cards.medusa.description',
    logoSrc: '/assets/images/festivals/medusa/logo-medusa-2026.webp',
    embedUrl: 'https://open.spotify.com/embed/playlist/3AOngKv5cHCFfPbBuHaazI',
  },
  {
    slug: 'rbf',
    nameKey: 'home.playlists.cards.rbf.name',
    descriptionKey: 'home.playlists.cards.rbf.description',
    logoSrc: '/assets/images/festivals/rbf/logo-rbf.webp',
    embedUrl: 'https://open.spotify.com/embed/playlist/213ypL4HZiHhzwxbh6Bb8v',
  },
  {
    slug: 'latin-fest',
    nameKey: 'home.playlists.cards.latinFest.name',
    descriptionKey: 'home.playlists.cards.latinFest.description',
    logoSrc: '/assets/images/festivals/latin-fest/logo-latin-fest.webp',
    embedUrl: 'https://open.spotify.com/embed/playlist/5pyjI2re4Bxbb5tDLLow2i',
  },
] as const;

interface SpotifyPlaylistView extends SpotifyPlaylistEntry {
  readonly safeUrl: SafeResourceUrl;
  readonly iframeTitle: string;
}

@Component({
  selector: 'fv-spotify-playlists',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './spotify-playlists.html',
  styleUrl: './spotify-playlists.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpotifyPlaylistsComponent {
  readonly #sanitizer = inject(DomSanitizer);
  readonly #i18n = inject(TranslationService);

  protected readonly playlists: readonly SpotifyPlaylistView[] = SPOTIFY_PLAYLISTS.map((p) => ({
    ...p,
    safeUrl: this.#sanitizer.bypassSecurityTrustResourceUrl(p.embedUrl),
    iframeTitle: this.#i18n
      .t('home.playlists.iframeTitle')
      .replace('{festival}', this.#i18n.t(p.nameKey)),
  }));
}
