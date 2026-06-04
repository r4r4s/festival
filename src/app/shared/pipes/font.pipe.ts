import { Pipe, PipeTransform } from '@angular/core';

import { FontContext, FontRole } from '../util/font/font.types';
import { getFontCssVar } from '../util/font/get-font';

/**
 * Angular pipe that resolves a font role context to its CSS `font-family` value
 * (using the design system's CSS custom properties with full fallback stacks).
 *
 * ## Usage
 *
 * ### Simple — role string only
 * ```html
 * <p [style.font-family]="'heading' | fvFont">Section Title</p>
 * ```
 *
 * ### Full context — with importance / emphasis
 * ```html
 * <h1 [style.font-family]="{ role: 'hero', emphasis: true } | fvFont">
 *   Welcome to festiVal
 * </h1>
 *
 * <span [style.font-family]="{ role: 'festival_name', importance: 'high' } | fvFont">
 *   Tomorrowland
 * </span>
 * ```
 */
@Pipe({
  name: 'fvFont',
  pure: true,
})
export class FvFontPipe implements PipeTransform {
  /**
   * @param value - Either a `FontRole` string or a full `FontContext` object.
   * @returns A CSS `var(--fv-font-*)` expression ready for `[style.font-family]`.
   */
  transform(value: FontRole | FontContext): string {
    const context: FontContext = typeof value === 'string' ? { role: value } : value;
    return getFontCssVar(context);
  }
}
