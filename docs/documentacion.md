# Documentación del proyecto festiVal

> Portal informativo de los principales festivales de música de la Comunidad Valenciana.
> Aplicación Angular 21 con SSR, arquitectura feature-sliced y boundaries forzados.

---

## Regla de mantenimiento

**Este documento debe actualizarse con cada commit que modifique la estructura del proyecto.** Si un commit añade, elimina o renombra carpetas o ficheros, los cambios deben reflejarse aquí en el mismo commit. Un `docs/documentacion.md` desactualizado es un bug.

Responsable: cualquier agente o persona que realice el commit. La regla se aplica tanto a humanos como a Claude.

---

## Estructura raíz

```
festiVal/
├── .claude/            → Desarrollo asistido por IA (agentes, skills, workflows)
├── .vscode/            → Configuración del editor VS Code
├── design/             → Assets de diseño (mockups, paletas de color, ideas)
├── docs/               → Documentación del proyecto
├── public/             → Ficheros estáticos servidos tal cual (favicon, robots.txt, sitemap)
├── src/                → Código fuente de la aplicación
├── .editorconfig       → Reglas de formato del editor (indentación, charset, trailing whitespace)
├── angular.json        → Configuración de Angular CLI (build, serve, test, lint, budgets, SSR)
├── eslint.config.js    → Configuración de ESLint (Angular ESLint + template accessibility)
├── package.json        → Dependencias, scripts npm y metadatos del proyecto
├── package-lock.json   → Lockfile de dependencias (versionado exacto)
├── README.md           → Presentación pública del proyecto para GitHub
├── tsconfig.json       → Configuración base de TypeScript (strict, paths aliases, target)
├── tsconfig.app.json   → Configuración TS para el build de la aplicación (extiende tsconfig.json)
└── tsconfig.spec.json  → Configuración TS para los tests (extiende tsconfig.json, incluye vitest/globals)
```

---

## `.claude/` — Desarrollo asistido por IA

Contiene la configuración de agentes especializados, skills reutilizables y workflows para el desarrollo con Claude.

```
.claude/
├── .claude-plugin/
│   └── plugin.json          → Manifiesto del plugin (nombre y descripción del proyecto para Claude)
├── CLAUDE.md                → Guía del proyecto para desarrollo asistido con IA
├── agents/                  → Agentes especializados con responsabilidades definidas
│   ├── contenido.md         → Agente editorial: i18n, curación del catálogo de festivales, microcopy UX
│   ├── prueba.md            → Agente de testing: unit, component, E2E, a11y, pre-commit gate
│   ├── rendimiento.md       → Agente de rendimiento: Core Web Vitals, SEO, SSR, bundles, JSON-LD
│   ├── sistemas.md          → Agente de arquitectura: servicios, estado, routing, interceptores, SSR
│   └── vistas.md            → Agente de UI: componentes, design system, theming, responsive, accesibilidad
├── commands/                → Comandos de workflow y automatización
│   ├── audit-structure.md    → Auditoría automatizada de arquitectura: valida estructura, tokens, skills
│   └── autocommit.md        → Workflow de commits semánticos (Conventional Commits + pre-commit gate)
└── skills/                  → Skills reutilizables que documentan patrones del proyecto
    ├── accessibility/README.md          → WCAG 2.1 AA: contraste, focus, ARIA, navegación por teclado
    ├── api-integration/README.md        → Servicios HTTP tipados, validación Zod en frontera, caching
    ├── error-handling/README.md         → FestivalError normalizado, Sentry, mensajes i18n al usuario
    ├── forms-validation/README.md       → Reactive Forms tipados, validadores custom, errores inline
    ├── internationalization/README.md   → Transloco, date-fns, locales es/ca/en, ICU MessageFormat
    ├── maps/README.md                   → MapLibre GL JS + Protomaps, lazy-loading, estilo dark custom
    ├── performance-optimization/README.md → OnPush, @defer, imágenes WebP, budgets, SSR, Sharp converter
    ├── project-structure/README.md      → Estructura feature-sliced canónica (este documento la resume)
    ├── routing-navigation/README.md     → Esquema de URLs en español, loadChildren/loadComponent, resolvers
    ├── search/README.md                 → MiniSearch: búsqueda fuzzy client-side con boost por campo
    ├── seo-meta/README.md               → Title/description por ruta, JSON-LD Event, OG, sitemap, canonicals
    ├── state-management/README.md       → Signals, NgRx SignalStore, persistencia localStorage/idb-keyval
    ├── testing-patterns/README.md       → Vitest, Playwright, pre-commit gate, data-testid, cobertura
    ├── theming-styling/README.md        → Tokens SCSS, paleta dark premium, glassmorphism, motion
    └── ui-components/README.md          → Catálogo de componentes, variantes, interacciones, estados
```

---

## `design/` — Assets de diseño

Contiene recursos visuales como mockups, paletas de color, inspiraciones y otros materiales de diseño relacionados con el proyecto festiVal.

```
design/
├── font/                → Fuentes tipográficas del design system (sólo variable fonts originales)
│   ├── Inter/           → Inter variable font (UI text, data, hero default)
│   ├── JetBrains_Mono/  → JetBrains Mono variable font (mono: fechas, IDs, logs)
│   └── Sora/            → Sora variable font (headings, brand, hero emphasis)
├── logo/                → Logotipos y variantes de la marca
└── palette/             → Paletas de color y esquemas cromáticos (palette1.svg, palette2.svg)
```

Las instancias estáticas (`*/static/`) y la familia Space Grotesk se eliminaron: la app sólo sirve los ejes variable desde `public/fonts/` y la fuente display canónica es **Sora**.

---

## `docs/` — Documentación

```
docs/
└── documentacion.md     → Este fichero. Propósito de cada carpeta y función de cada fichero del proyecto.
```

---

## `public/` — Ficheros estáticos

Servidos directamente por el servidor sin procesamiento. No pasan por el pipeline de Angular.

```
public/
├── favicon.ico          → Icono del sitio mostrado en la pestaña del navegador
└── fonts/               → Fuentes variable self-hosted servidas por el servidor
    ├── Inter-VariableFont_opsz,wght.ttf
    ├── Inter-Italic-VariableFont_opsz,wght.ttf
    ├── Sora-VariableFont_wght.ttf
    ├── JetBrainsMono-VariableFont_wght.ttf
    └── JetBrainsMono-Italic-VariableFont_wght.ttf
```

> Cuando arranque la fase CMS se reintroducirán las carpetas `sanity/` (Sanity Studio independiente con `sanity.config.ts` + schemas que reflejen los Zod de `@shared/domain/`) y `scripts/` (conversor Sharp PNG/JPEG → WebP). Se eliminaron del repositorio mientras estuvieron vacías para no dejar deuda visible.

---

## `src/` — Código fuente

### Ficheros raíz de `src/`

```
src/
├── index.html           → Documento HTML principal. `lang="es-ES"`, título `festiVal`,
│                          meta theme-color (#07070C), favicon SVG + .ico, monta <fv-root>.
├── main.ts              → Punto de entrada del cliente. Llama a bootstrapApplication con la
│                          configuración de app.config.ts.
├── main.server.ts       → Punto de entrada del servidor SSR. Bootstrap de la app con la
│                          configuración de app.config.server.ts para Angular Universal.
├── server.ts            → Servidor Express para SSR. Sirve ficheros estáticos de /browser,
│                          delega el resto a AngularNodeAppEngine para renderizado server-side.
│                          Puerto por defecto: 4000.
└── styles/              → Directorio de estilos globales (ver sección dedicada más abajo).
```

### `src/styles/` — Estilos globales

Partials SCSS consumidos por `styles.scss`. Los componentes importan mixins a través de `@use 'styles/mixins' as *` (resuelto por `stylePreprocessorOptions.includePaths: ["src"]`). El namespace canónico de tokens es `--fv-*`.

```
src/styles/
├── styles.scss          → Punto de entrada SCSS global. Compone los partials en orden de dependencia.
├── _tokens.scss         → Tokens primitivos SCSS (paleta cruda $fv-gray-*, $fv-violet-*, …). No expone CSS vars.
├── _semantic.scss       → Tokens semánticos como CSS custom properties --fv-bg-*, --fv-text-*, --fv-accent-*,
│                          --fv-border-*, --fv-gradient-*. Son los que consumen los componentes.
├── _typography.scss     → Escala tipográfica: --fv-text-*, --fv-leading-*, --fv-tracking-*.
├── _fonts.scss          → @font-face de Inter, Sora y JetBrains Mono (variable fonts self-hosted).
│                          Tokens de rol --fv-font-ui/heading/hero/hero-emphasis/festival-name/mono/brand,
│                          más clases utilitarias .fv-font-*.
├── _spacing.scss        → Escala de espaciado (base 4 px): --fv-space-0..10.
├── _radii.scss          → Escala de radios: --fv-radius-sm/md/lg/xl/2xl/pill.
├── _shadows.scss        → Sistema de elevación: --fv-shadow-card/elevated/focus/glow-violet.
├── _motion.scss         → Duraciones y curvas: --fv-duration-*, --fv-ease-*. Honra prefers-reduced-motion.
├── _breakpoints.scss    → Mapa SCSS $fv-breakpoints + mixin `from($bp)` (mobile-first).
├── _mixins.scss         → Mixins reutilizables: glass(), focus-ring, container, truncate, line-clamp.
├── _animations.scss     → Keyframes fv-fade-up, fv-pulse-soft, fv-live-dot, fv-glow-pulse.
└── _reset.scss          → Reset opinionado (box-sizing, márgenes, listas, foco, tipografía base).
```

### `src/environments/` — Configuración por entorno

```
src/environments/
└── .gitkeep             → (Futuro: environment.ts y environment.prod.ts — URLs base, feature flags)
```

### `src/assets/` — Recursos estáticos

```
src/assets/
├── branding/            → Assets SVG de la marca
│   ├── main-logo.svg    → Logotipo completo de festiVal
│   ├── logo-icon.svg    → Isotipo (variante compacta)
│   └── favicon.svg      → Favicon vectorial
├── i18n/                → Ficheros de traducción JSON: es.json (fuente), ca.json, en.json
│   └── .gitkeep
├── icons/               → Iconos SVG adicionales a Lucide
│   └── .gitkeep
├── images/              → Imágenes WebP generadas por el conversor Sharp. Comiteadas, nunca editadas a mano.
│   └── .gitkeep
├── images-src/          → Imágenes fuente (PNG/JPEG). Comiteadas pero nunca servidas al usuario.
│   └── .gitkeep
└── maps/                → Fichero JSON de estilo MapLibre (tema dark del mapa)
    └── .gitkeep
```

---

## `src/app/` — Aplicación Angular

### Ficheros raíz de la aplicación

```
src/app/
├── app.ts               → Componente raíz (selector: fv-root, OnPush). Importa RouterOutlet.
│                          Punto de montaje de la aplicación.
├── app.html             → Template del componente raíz. Contiene únicamente <router-outlet />.
├── app.scss             → Estilos del componente raíz. Actualmente vacío.
├── app.spec.ts          → Tests del componente raíz. Verifica creación y presencia de router-outlet.
├── app.config.ts        → Configuración de la aplicación cliente: registra es-ES (LOCALE_ID +
│                          registerLocaleData), provideRouter, provideClientHydration con event replay.
│                          Aquí se registrarán interceptores y APP_INITIALIZERs.
├── app.config.server.ts → Configuración de la aplicación servidor. Extiende app.config.ts con
│                          provideServerRendering y las rutas de SSR.
├── app.routes.ts        → Definición de rutas top-level. Cada feature se carga con loadChildren
│                          apuntando a su <feature>.routes.ts. Es el boundary de los lazy chunks.
└── app.routes.server.ts → Rutas de servidor SSR. Define qué rutas se pre-renderizan
│                          (actualmente todas vía RenderMode.Prerender).
```

### `src/app/core/` — Singletons cross-cutting

Proporcionados una sola vez en el root de la aplicación. Nunca importan de `features/`, `layout/` ni `shared/ui/`.

```
src/app/core/
├── interceptors/        → HttpInterceptors funcionales: autenticación, normalización de errores,
│   └── .gitkeep           logging en desarrollo, cache de endpoints read-only, captura de ZodError.
├── handlers/            → Implementaciones de ErrorHandler: log a consola en dev, envío a Sentry
│   └── .gitkeep           en producción con tags de ruta, locale y festival slug.
├── initializers/        → Factorías APP_INITIALIZER: carga del catálogo desde Sanity, registro de
│   └── .gitkeep           locale, hidratación de preferencias de tema desde localStorage.
├── tokens/              → InjectionTokens tipados para configuración inyectable.
│   └── .gitkeep
└── platform/            → Helpers de SSR: wrappers de isPlatformBrowser, guardas para APIs
    └── .gitkeep           incompatibles con server (window, document, localStorage).
```

### `src/app/layout/` — Shell de la aplicación

Cargado eagerly. Compone la estructura visual que envuelve todas las rutas.

```
src/app/layout/
├── shell/               → Componente host del <router-outlet>. Organiza nav-bar + contenido + footer.
│   └── .gitkeep
├── nav-bar/             → Barra de navegación superior: panel glass, marca festiVal, enlaces
│   └── .gitkeep           principales, botones de acción. Sticky en la parte superior.
└── footer/              → Pie de página: navegación secundaria, enlaces legales, atribución.
    └── .gitkeep
```

### `src/app/features/` — Slices verticales (lazy)

Cada feature es un chunk lazy independiente. Contiene su propia UI, datos y lógica. **Una feature nunca importa de otra feature.** La única superficie pública es `<feature>.routes.ts`.

#### Estructura interna de cada feature

```
features/<nombre>/
├── feature/             → Componente smart de la página, vinculado a la ruta. Inyecta stores
│   └── .gitkeep           y servicios de data-access/, pasa datos a ui/ mediante inputs.
├── ui/                  → Componentes presentacionales locales a esta feature. Sin HTTP ni stores.
│   └── .gitkeep           Reciben datos por input(), emiten eventos por output().
├── data-access/         → Stores (Signals/SignalStore), servicios HTTP, resolvers y schemas Zod
│   └── .gitkeep           locales a esta feature.
└── <nombre>.routes.ts   → Configuración obligatoria de rutas de la feature. Exporta
                           NOMBRE_ROUTES con loadComponent hacia feature/.
```

#### Features del proyecto

```
src/app/features/
├── home/                → Página de inicio. Muestra festivales destacados, hero con glow
│                          atmosférico, acceso rápido a búsqueda y filtros.
├── festival-list/       → Listado completo de festivales con filtros (provincia, mes, género,
│                          precio). UI local: filter-chip, grid de cards. Stores: filters, catalogue.
├── festival-detail/     → Ficha de festival individual. UI local: festival-hero, lineup-grid,
│                          venue-map (MapLibre). Store: festival-detail. Resolver para SSR.
├── artist-detail/       → Ficha de artista. Muestra en qué festivales participa, género,
│                          enlaces. Cargado lazy.
├── search/              → Página de resultados de búsqueda. Consume SearchService (MiniSearch)
│                          de @shared/data-access/. Resultados por relevancia con highlight.
└── about/               → Página estática "Sobre nosotros". Información del proyecto,
                           equipo y contacto.
```

### `src/app/shared/` — Toolbox horizontal

Código reutilizado por **2 o más features**. Nunca importa de `features/` ni de `layout/`. Un componente empieza en su feature y se promueve a `shared/` cuando una segunda feature lo necesita.

```
src/app/shared/
├── ui/                  → Componentes presentacionales compartidos: button, badge, festival-card,
│   └── .gitkeep           search-bar, date-range-badge, empty-state, skeleton-loader,
│                          festival-toast, form-error. Todos standalone, OnPush, prefix fv-.
├── data-access/         → Servicios y stores compartidos: FestivalService (Sanity HTTP),
│   └── .gitkeep           ArtistService, VenueService, SearchService (MiniSearch),
│                          CatalogueStore, FavouritesStore, SanityClientService, AnalyticsService.
├── domain/              → Modelos de dominio: interfaces TypeScript + schemas Zod.
│   └── .gitkeep           festival.model.ts, artist.model.ts, venue.model.ts,
│                          festival-error.model.ts. El schema Zod vive junto al tipo inferido.
├── pipes/               → Pipes genéricos reutilizables: locale-date (date-fns), truncate,
│   └── .gitkeep           festival-image (URLs de Sanity CDN con ?fm=webp).
├── directives/          → Directivas genéricas compartidas.
│   └── .gitkeep
├── util/                → Funciones puras sin dependencia de Angular: formateo, helpers,
│   └── .gitkeep           validators (dniValidator, dateRangeValidator, priceRangeValidator).
└── testing/             → Helpers de test reutilizables entre specs: fixtures, mocks de
    └── .gitkeep           HttpClient, fábricas de datos de prueba.
```

---

## Ficheros de configuración (detalle)

### `angular.json`

Configuración de Angular CLI para el proyecto `festiVal`:

- **Build**: builder `@angular/build:application`, entry browser `src/main.ts`, server `src/main.server.ts`, SSR con Express (`src/server.ts`).
- **Estilos**: SCSS como preprocesador, `stylePreprocessorOptions.includePaths: ["src"]` para permitir `@use 'styles/...'` desde componentes.
- **Budgets**: inicial ≤ 250 KB warning / 350 KB error; lazy chunks ≤ 80 KB warning / 120 KB error; component styles ≤ 4 KB warning / 8 KB error.
- **Prefix**: `fv` (todos los componentes generados usan selector `fv-*`).
- **Lint**: builder `@angular-eslint/builder:lint`, patrones `src/**/*.ts` y `src/**/*.html`.
- **Schematics**: `angular-eslint` como colección de schematics, componentes SCSS por defecto.

### `tsconfig.json`

Configuración base de TypeScript:

- **Target**: ES2022, `module: "preserve"`, `strict: true`.
- **Path aliases**: `@core/*`, `@layout/*`, `@features/*`, `@shared/*` (ui, data-access, domain, util, pipes, directives, testing), `@env/*`, `@styles/*`.
- **Angular compiler**: templates estrictos, parámetros de inyección estrictos, inputs estrictos.

### `tsconfig.app.json`

Extiende `tsconfig.json`. Output en `out-tsc/app`. Incluye todo `src/**/*.ts` excepto `*.spec.ts`. Tipos: `node`.

### `tsconfig.spec.json`

Extiende `tsconfig.json`. Output en `out-tsc/spec`. Incluye `*.spec.ts` y `*.d.ts`. Tipos: `vitest/globals`.

### `eslint.config.js`

Configuración flat de ESLint:

- Para `**/*.ts`: reglas recomendadas de ESLint + TypeScript ESLint + Angular ESLint. Procesador de templates inline. Selectores forzados a prefix `fv-` (components kebab-case, directives camelCase).
- Para `**/*.html`: reglas recomendadas de templates Angular + reglas de accesibilidad en templates.

### `.editorconfig`

Reglas de formato: UTF-8, espacios de 2, newline final, trim trailing whitespace. Comillas simples en TypeScript. Sin trim en Markdown.

### `package.json`

Scripts principales: `start` (ng serve), `build` (ng build), `test` (ng test), `lint` (ng lint), `watch` (ng build --watch). Prettier configurado inline. Dependencias principales: Angular 21, Express 5, RxJS 7, TypeScript 5.9. Dev: Angular CLI, Vitest, Angular ESLint.

---

## Regla de dependencias entre capas

```
features  →  shared  →  (nada)
features  →  core
layout    →  shared, core
core      →  core (solo a sí mismo)
```

- Una **feature nunca importa otra feature**.
- **shared nunca importa de features ni de layout**.
- **core nunca importa de features, layout ni shared/ui**.
- Dentro de una feature, **ui/ nunca importa de data-access/**.
- La **única superficie pública** de una feature es su `<feature>.routes.ts`.

Estas reglas serán forzadas por `eslint-plugin-boundaries` cuando se configure.

---

## Historial de cambios estructurales

| Fecha | Cambio | Descripción |
| --- | --- | --- |
| 2026-06-04 | Nueva carpeta `design/` | Carpeta creada en la raíz del proyecto para almacenar mockups, paletas de color, ideas e inspiraciones de diseño. |
| 2026-06-04 | Reubicación `.claude` | Movido `CLAUDE.md` a `.claude/` y `autocommit.md` a `.claude/commands/`. |
| 2026-06-04 | Nueva carpeta `branding/` | Creada `src/assets/branding/` para los assets base de la marca. |
| 2026-06-04 | Fuentes en `design/font/` | Añadidos archivos fuente Inter, Sora, JetBrains Mono y Space Grotesk. |
| 2026-06-04 | Font system completo | Añadido `public/fonts/` (variable fonts self-hosted), `src/styles/_fonts.scss` (reglas @font-face, tokens CSS, clases utilitarias), `src/styles/styles.scss` (reubicado desde `src/`), `shared/util/font/` (getFont, tipos), `shared/pipes/font.pipe.ts` (pipe fvFont), `shared/directives/font.directive.ts` (directiva fvFont). Actualizado `angular.json` con nueva ruta de estilos. |
| 2026-06-04 | Comando `audit-structure` | Añadido `.claude/commands/audit-structure.md`: auditoría automatizada de arquitectura, estructura, design system y compliance de skills. |
| 2026-06-04 | Reconciliación del contrato visual | `CLAUDE.md`, `theming-styling` skill, `vistas` agent y `README.md` consolidados: paleta navy/violet/blue premium, fuente display **Sora**, namespace de tokens **`--fv-*`**. Eliminado Space Grotesk del design system. |
| 2026-06-04 | Rename `design/palettle/` → `design/palette/` | Corrección del nombre de carpeta. |
| 2026-06-04 | Limpieza de bloat en `design/font/` | Eliminadas las subcarpetas `*/static/` (instancias estáticas nunca servidas) y `design/font/Space_Grotesk/`. |
| 2026-06-04 | Eliminadas carpetas placeholder | `sanity/` y `scripts/` borradas hasta que arranquen sus fases. Quedan documentadas como reintroducción futura. |
| 2026-06-04 | Limpieza `assets/icons/` | Eliminados `logo-icon.svg` y `main-logo.svg` duplicados de `assets/branding/`. La carpeta queda reservada para iconos adicionales a Lucide. |
| 2026-06-04 | `index.html` localizado | `lang="es-ES"`, título `festiVal`, meta theme-color, favicon SVG enlazado. |
| 2026-06-04 | Reset del placeholder Angular | `src/app/app.html` reducido a `<router-outlet />`. `app.ts` migrado a OnPush sin `title` signal. `app.spec.ts` ahora verifica el outlet en vez del título. |
| 2026-06-04 | Registro de locale `es-ES` | `src/app/app.config.ts` registra `LOCALE_ID: 'es-ES'` y `registerLocaleData(localeEs)` conforme a CLAUDE.md. |
| 2026-06-04 | Eliminación de la abstracción de fuentes | Borrados `shared/util/font/` (incluido el barrel `index.ts`), `shared/directives/font.directive.ts` y `shared/pipes/font.pipe.ts`. La selección de fuente se hace directamente con `var(--fv-font-*)` o las clases utilitarias `.fv-font-*` de `_fonts.scss`. |
| 2026-06-04 | Sistema de tokens completo | Añadidos partials `_tokens`, `_semantic`, `_typography`, `_spacing`, `_radii`, `_shadows`, `_motion`, `_breakpoints`, `_mixins`, `_animations`, `_reset` en `src/styles/`. `styles.scss` los compone en orden de dependencia. `_fonts.scss` purgado del duplicado `--fv-font-mono`. |
