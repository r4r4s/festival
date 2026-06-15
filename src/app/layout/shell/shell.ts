import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Renderer2,
  viewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { NavBar } from '@layout/nav-bar/nav-bar';
import { NavProgressBarComponent } from '@layout/nav-progress-bar/nav-progress-bar';
import { Footer } from '@layout/footer/footer';
import { NotificationBannerComponent } from '@shared/ui/notification-banner/notification-banner';

// Animation shorthand for the page-enter keyframe (defined in _animations.scss).
// Inline style avoids Angular's component-style optimizer discarding an
// otherwise "unused" selector.
const PAGE_ENTER_ANIMATION =
  'fv-page-enter 240ms cubic-bezier(0.16, 1, 0.3, 1) both';

@Component({
  selector: 'fv-shell',
  imports: [RouterOutlet, NavBar, NavProgressBarComponent, Footer, NotificationBannerComponent],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly mainRef = viewChild.required<ElementRef<HTMLElement>>('mainEl');
  private readonly renderer = inject(Renderer2);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        const el = this.mainRef().nativeElement;
        this.renderer.setStyle(el, 'animation', 'none');
        void el.offsetWidth; // force reflow so the keyframe restarts
        this.renderer.setStyle(el, 'animation', PAGE_ENTER_ANIMATION);
        setTimeout(() => this.renderer.removeStyle(el, 'animation'), 300);
      });
  }
}
