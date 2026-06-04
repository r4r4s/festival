# ⚡ Performance Optimization

Guidelines to keep **festiVal** fast on mobile devices during festival season traffic spikes.

## Targets

- **LCP** < 2.5 s on 4G mid-tier device.
- **CLS** < 0.1.
- **INP** < 200 ms.
- **TTI** < 3.5 s.
- Initial bundle < 250 KB gzipped.

## Techniques

- **OnPush** change detection everywhere.
- **Standalone components** + lazy `loadComponent` per route.
- **Deferrable views** (`@defer`) for below-the-fold sections like the full line-up grid and the venue map.
- **Signals** instead of `async` pipe where reactivity is local.
- **Pre-rendering / SSR** with Angular Universal for festival detail pages (SEO win too).
- HTTP caching at the service layer with stale-while-revalidate semantics.

---

## Image strategy

Images are the dominant payload on the festival portal — posters, heroes, artist photos. They are also the most common LCP element on detail pages. The image pipeline below is **mandatory**: any image that ships to the user must come through it.

### Formats

- **WebP is the canonical delivery format** for every raster image. Quality/size ratio is significantly better than JPEG, support is universal (>97 % of browsers), and Sanity / Sharp emit it natively.
- **AVIF as a progressive enhancement** when the source is large (hero posters > 1200 px). Served via `<picture>` with WebP fallback. Never AVIF-only.
- **SVG for vector** (icons, logos, illustrations). Hand-optimized with SVGO before commit.
- **JPEG / PNG are forbidden in `src/assets/images/`** and must never be referenced from templates. They may exist only in `src/assets/images-src/` as the build-time source.

### Sources of images

1. **Festival posters and editorial photos** live in **Sanity**. Sanity's image CDN transforms on demand via URL params:
   ```
   https://cdn.sanity.io/images/<project>/<dataset>/<asset-id>.jpg
     ?fm=webp&w=800&q=75&auto=format&fit=max
   ```
   The `FestivalImagePipe` (under `src/app/pipes/`) builds these URLs. Components **never** concatenate Sanity URLs by hand.

2. **Static UI images** (default poster fallback, OG share cards, illustrations for empty states) live in `src/assets/images-src/` as the highest-quality source the designer provides (PNG or JPEG). The build step converts them to WebP variants in `src/assets/images/` — see the **converter** section below.

### Responsive variants

Every image is served in **three widths**, picked by the browser via `srcset`:

| Use case            | Widths (px)         | Quality |
| ------------------- | ------------------- | ------- |
| Card thumbnail      | 320 / 480 / 640     | 70      |
| Detail hero         | 800 / 1200 / 1600   | 75      |
| OG share card       | 1200 (fixed)        | 80      |

Use `NgOptimizedImage` with explicit `width`, `height`, and `ngSrcset`. CLS budget is non-negotiable — dimensions are mandatory.

```html
<img
  ngSrc="/assets/images/festival-fallback.webp"
  ngSrcset="320w, 480w, 640w"
  sizes="(min-width: 768px) 320px, 100vw"
  width="320"
  height="400"
  alt="Cartel del festival"
  priority
/>
```

### Hero / LCP rules

- The detail-page hero is the LCP element. It must:
  - Use `priority` (preloads via `<link rel="preload">`).
  - Be served as WebP at the chosen viewport width — never larger.
  - Have a `placeholder` (10-px LQIP from Sanity: `?w=10&blur=20`) to avoid blank canvas during decode.
- **Never** put a map above the hero. See [[maps]].

---

## Image converter (build-time)

For images under `src/assets/`, a single npm script handles WebP conversion. The pipeline is owned by this skill and called from `prebuild` so production deploys always carry fresh assets.

### Tool

**Sharp** (https://sharp.pixelplumbing.com/). Reasons: native libvips bindings (10× faster than pure-JS), produces both WebP and AVIF, handles resize + quality + metadata stripping in one pass, zero runtime dependency for the app.

### Layout

```
src/assets/
├── images-src/        # source files (PNG, JPEG) — committed but never shipped
│   ├── og-card.png
│   ├── empty-festivales.png
│   └── poster-fallback.jpg
└── images/            # generated output (WebP + AVIF) — committed
    ├── og-card.webp
    ├── og-card-1200.webp
    ├── empty-festivales-320.webp
    ├── empty-festivales-480.webp
    ├── empty-festivales-640.webp
    └── poster-fallback-{320,480,640,800,1200}.webp
```

The generated `images/` folder is committed so CI does not need Sharp on every build; the prebuild script regenerates only when sources change (mtime check).

### Script: `scripts/convert-images.mjs`

```js
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC = 'src/assets/images-src';
const OUT = 'src/assets/images';

const PRESETS = {
  thumb:  { widths: [320, 480, 640],        quality: 70 },
  hero:   { widths: [800, 1200, 1600],      quality: 75 },
  og:     { widths: [1200],                  quality: 80 },
};

// Convention: filename prefix selects the preset.
//   og-*.png     → og preset
//   hero-*.png   → hero preset
//   anything else → thumb preset
function presetFor(name) {
  if (name.startsWith('og-'))   return PRESETS.og;
  if (name.startsWith('hero-')) return PRESETS.hero;
  return PRESETS.thumb;
}

async function convert() {
  await mkdir(OUT, { recursive: true });
  const files = await readdir(SRC);

  for (const file of files) {
    const { name, ext } = parse(file);
    if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) continue;

    const srcPath = join(SRC, file);
    const preset = presetFor(name);

    for (const w of preset.widths) {
      const outName = preset.widths.length === 1
        ? `${name}.webp`
        : `${name}-${w}.webp`;
      const outPath = join(OUT, outName);

      // Skip if output is newer than source (incremental builds).
      try {
        const [s, o] = await Promise.all([stat(srcPath), stat(outPath)]);
        if (o.mtimeMs >= s.mtimeMs) continue;
      } catch { /* output does not exist yet */ }

      await sharp(srcPath)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: preset.quality, effort: 6 })
        .toFile(outPath);

      console.log(`✓ ${outName}`);
    }
  }
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### `package.json` wiring

```json
{
  "scripts": {
    "images:convert": "node scripts/convert-images.mjs",
    "prebuild": "npm run images:convert",
    "build": "ng build"
  },
  "devDependencies": {
    "sharp": "^0.34.0"
  }
}
```

### Rules for the converter

1. **Sources are never shipped.** `src/assets/images-src/` is excluded from the Angular build (declare it in `angular.json` assets if needed, or rely on the folder name convention).
2. **Naming convention drives the preset.** `og-*` → 1200 px, `hero-*` → multi-size hero set, everything else → thumb set. To add a preset, edit the script — do not bypass it for one-off sizes.
3. **Incremental by default.** The script skips outputs that are newer than their source. Use `rm -rf src/assets/images && npm run images:convert` to force a full rebuild.
4. **Output is committed.** The Cloudflare Pages build does not run Sharp; it just consumes the generated WebP files.
5. **No PNG / JPEG references in templates.** ESLint rule (when added) flags any `src="..."` ending in `.png`/`.jpg`/`.jpeg` outside `images-src/`.
6. **One source → many WebPs.** Never hand-edit files in `src/assets/images/`. They are build artifacts.

### When to extend with AVIF

Add a second `.avif()` pipeline only for hero presets when you measure a meaningful LCP gain on the detail page. AVIF encoding is ~5× slower than WebP, so it is not worth it for thumbnails.

---

## Auditing

- Run `npm run build -- --stats-json` and inspect with `webpack-bundle-analyzer` (or `@angular/build`'s built-in stats).
- **Lighthouse CI** in the Cloudflare Pages deploy pipeline; fail PRs that regress > 5 points on Performance.
- Track Core Web Vitals via the **`web-vitals`** library posting to Cloudflare Web Analytics.
- Image size audit: `du -sh src/assets/images/` should stay under 2 MB total. If it grows beyond, revisit presets and quality.
