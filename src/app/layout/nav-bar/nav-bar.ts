import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'fv-nav-bar',
  imports: [NgOptimizedImage],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'fv-nav-bar-host' },
})
export class NavBar {}
