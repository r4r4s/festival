import { FontContext, FontFamily } from './font.types';

/**
 * Resolves the correct font family name based on a semantic context.
 *
 * This is the single source of truth for the festiVal font role mapping.
 * The returned string matches the `font-family` name declared in `_fonts.scss`.
 *
 * ## Role → Font mapping
 *
 * | Role             | Default Font   | Conditional                             |
 * |------------------|----------------|-----------------------------------------|
 * | `ui`             | Inter          | —                                       |
 * | `data`           | Inter          | —                                       |
 * | `heading`        | Sora           | —                                       |
 * | `hero`           | Inter          | `emphasis: true` → Sora                 |
 * | `festival_name`  | Inter          | `importance: 'high'` → Sora             |
 * | `mono`           | JetBrains Mono | —                                       |
 * | `brand`          | Sora           | —                                       |
 *
 * @param context - The semantic context describing where the text will appear.
 * @returns The font family name to apply.
 *
 * @example
 * ```ts
 * getFont({ role: 'ui' });                                    // → 'Inter'
 * getFont({ role: 'heading' });                               // → 'Sora'
 * getFont({ role: 'hero', emphasis: true });                  // → 'Sora'
 * getFont({ role: 'hero', emphasis: false });                 // → 'Inter'
 * getFont({ role: 'festival_name', importance: 'high' });     // → 'Sora'
 * getFont({ role: 'festival_name', importance: 'medium' });   // → 'Inter'
 * getFont({ role: 'mono' });                                  // → 'JetBrains Mono'
 * getFont({ role: 'brand' });                                 // → 'Sora'
 * ```
 */
export function getFont(context: FontContext): FontFamily {
  switch (context.role) {
    // 1. General UI text (default system readability)
    case 'ui':
      return 'Inter';

    // 2. Data display / structured content
    case 'data':
      return 'Inter';

    // 3. Section titles and component headings
    case 'heading':
      return 'Sora';

    // 4. Hero sections / landing impact
    case 'hero':
      return context.emphasis ? 'Sora' : 'Inter';

    // 5. Festival names and highlighted entities
    case 'festival_name':
      return context.importance === 'high' ? 'Sora' : 'Inter';

    // 6. Technical values (dates, IDs, logs, debug info)
    case 'mono':
      return 'JetBrains Mono';

    // 7. Brand-level fallback usage
    case 'brand':
      return 'Sora';

    default:
      return 'Inter';
  }
}

/**
 * Maps a `FontFamily` to its corresponding CSS custom property name.
 *
 * Useful when you need the full font stack (with fallbacks) rather than
 * just the family name.
 *
 * @example
 * ```ts
 * getFontCssVar({ role: 'heading' }); // → 'var(--fv-font-heading)'
 * getFontCssVar({ role: 'hero', emphasis: true }); // → 'var(--fv-font-hero-emphasis)'
 * ```
 */
export function getFontCssVar(context: FontContext): string {
  switch (context.role) {
    case 'ui':
      return 'var(--fv-font-ui)';
    case 'data':
      return 'var(--fv-font-data)';
    case 'heading':
      return 'var(--fv-font-heading)';
    case 'hero':
      return context.emphasis ? 'var(--fv-font-hero-emphasis)' : 'var(--fv-font-hero)';
    case 'festival_name':
      return context.importance === 'high'
        ? 'var(--fv-font-festival-name-high)'
        : 'var(--fv-font-festival-name)';
    case 'mono':
      return 'var(--fv-font-mono)';
    case 'brand':
      return 'var(--fv-font-brand)';
    default:
      return 'var(--fv-font-ui)';
  }
}
