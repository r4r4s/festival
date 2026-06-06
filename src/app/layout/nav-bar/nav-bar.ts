import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideMenu, LucideMoon, LucideSearch } from '@lucide/angular';

import { TranslatePipe } from '@shared/pipes/translate.pipe';

@Component({
  selector: 'fv-nav-bar',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, LucideSearch, LucideMoon, LucideMenu, TranslatePipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fv-nav-bar-host' },
})
export class NavBar {}
