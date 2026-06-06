import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { LucideMenu, LucideMoon, LucideSearch } from '@lucide/angular';

@Component({
  selector: 'fv-nav-bar',
  imports: [NgOptimizedImage, LucideSearch, LucideMoon, LucideMenu],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fv-nav-bar-host' },
})
export class NavBar {}
