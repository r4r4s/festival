import { Directive, ElementRef, Input, OnChanges, Renderer2, inject } from '@angular/core';

import { FontContext, FontImportance, FontRole } from '../util/font/font.types';
import { getFontCssVar } from '../util/font/get-font';

/**
 * Structural directive that applies the correct `font-family` based on
 * the festiVal design system font role mapping.
 *
 * ## Usage
 *
 * ### Simple — string shorthand (role only)
 * ```html
 * <h2 fvFont="heading">Section Title</h2>
 * <p fvFont="ui">Body text</p>
 * <code fvFont="mono">2026-06-04</code>
 * ```
 *
 * ### Full context — object binding
 * ```html
 * <h1 [fvFont]="{ role: 'hero', emphasis: true }">
 *   Welcome to festiVal
 * </h1>
 *
 * <span [fvFont]="{ role: 'festival_name', importance: 'high' }">
 *   Tomorrowland
 * </span>
 * ```
 *
 * ### Granular inputs (alternative API)
 * ```html
 * <span fvFont="festival_name" fvFontImportance="high">
 *   Primavera Sound
 * </span>
 *
 * <div fvFont="hero" [fvFontEmphasis]="true">
 *   Discover festivals near you
 * </div>
 * ```
 */
@Directive({
  selector: '[fvFont]',
})
export class FvFontDirective implements OnChanges {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  /**
   * Accepts either:
   * - A `FontRole` string (e.g. `'heading'`, `'mono'`)
   * - A full `FontContext` object (e.g. `{ role: 'hero', emphasis: true }`)
   */
  @Input({ required: true })
  fvFont!: FontRole | FontContext;

  /** Optional importance override (only relevant for `festival_name`). */
  @Input()
  fvFontImportance?: FontImportance;

  /** Optional emphasis override (only relevant for `hero`). */
  @Input()
  fvFontEmphasis?: boolean;

  ngOnChanges(): void {
    const context = this.resolveContext();
    const cssVar = getFontCssVar(context);
    this.renderer.setStyle(this.el.nativeElement, 'font-family', cssVar);
  }

  private resolveContext(): FontContext {
    // If a full object was passed, use it directly (but allow granular overrides)
    if (typeof this.fvFont === 'object') {
      return {
        ...this.fvFont,
        importance: this.fvFontImportance ?? this.fvFont.importance,
        emphasis: this.fvFontEmphasis ?? this.fvFont.emphasis,
      };
    }

    // String shorthand — build context from individual inputs
    return {
      role: this.fvFont,
      importance: this.fvFontImportance,
      emphasis: this.fvFontEmphasis,
    };
  }
}
