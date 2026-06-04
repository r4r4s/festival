/**
 * festiVal Design System — Font Role Types
 *
 * These types model the font selection context used by `getFont()`.
 * They are shared across the utility function, the pipe, and the directive.
 */

/** Semantic roles that map to specific font families. */
export type FontRole = 'ui' | 'heading' | 'brand' | 'mono' | 'hero' | 'data' | 'festival_name';

/** Importance level — affects font selection for certain roles. */
export type FontImportance = 'low' | 'medium' | 'high';

/** Font family name as returned by `getFont()`. */
export type FontFamily = 'Inter' | 'Sora' | 'JetBrains Mono';

/**
 * Context object passed to `getFont()` to resolve the correct font family.
 *
 * @example
 * ```ts
 * const ctx: FontContext = { role: 'hero', emphasis: true };
 * getFont(ctx); // → 'Sora'
 * ```
 */
export interface FontContext {
  /** The semantic role of the text being rendered. */
  role: FontRole;

  /**
   * Optional importance level.
   * Currently affects only the `festival_name` role:
   * - `'high'` → Sora
   * - `'low'` | `'medium'` | undefined → Inter
   */
  importance?: FontImportance;

  /**
   * Optional emphasis flag.
   * Currently affects only the `hero` role:
   * - `true` → Sora (impactful display)
   * - `false` | undefined → Inter (readable body)
   */
  emphasis?: boolean;
}
