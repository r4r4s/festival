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
├── docs/               → Documentación del proyecto
├── public/             → Ficheros estáticos servidos tal cual (favicon, robots.txt, sitemap)
├── sanity/             → Sanity Studio (CMS headless), desplegable independientemente
├── scripts/            → Scripts Node para el pipeline de build (conversor de imágenes WebP)
├── src/                → Código fuente de la aplicación
├── .editorconfig       → Reglas de formato del editor (indentación, charset, trailing whitespace)
├── angular.json        → Configuración de Angular CLI (build, serve, test, lint, budgets, SSR)
├── CLAUDE.md           → Guía del proyecto para desarrollo asistido con IA
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
├── agents/                  → Agentes especializados con responsabilidades definidas
│   ├── contenido.md         → Agente editorial: i18n, curación del catálogo de festivales, microcopy UX
│   ├── prueba.md            → Agente de testing: unit, component, E2E, a11y, pre-commit gate
│   ├── rendimiento.md       → Agente de rendimiento: Core Web Vitals, SEO, SSR, bundles, JSON-LD
│   ├── sistemas.md          → Agente de arquitectura: servicios, estado, routing, interceptores, SSR
│   └── vistas.md            → Agente de UI: componentes, design system, theming, responsive, accesibilidad
├── autocommit.md            → Workflow de commits semánticos (Conventional Commits + pre-commit gate)
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
└── favicon.ico          → Icono del sitio mostrado en la pestaña del navegador
```

---

## `sanity/` — Sanity Studio (CMS)

Proyecto independiente para gestionar el catálogo de festivales. Desplegable por separado. Los schemas aquí deben reflejar los schemas Zod de `@shared/domain/`.

```
sanity/
└── schemas/             → Schemas de contenido de Sanity (festival, artista, venue)
    └── .gitkeep
```

---

## `scripts/` — Scripts de build

Scripts Node ejecutados durante el pipeline de build. No son código de la aplicación.

```
scripts/
└── .gitkeep             → (Futuro: convert-images.mjs — conversor Sharp de PNG/JPEG a WebP)
```

---

## `src/` — Código fuente

### Ficheros raíz de `src/`

```
src/
├── index.html           → Documento HTML principal. Carga las fuentes (Inter, Space Grotesk),
│                          define el meta theme-color (#07070C) y monta <fv-root>.
├── main.ts              → Punto de entrada del cliente. Llama a bootstrapApplication con la
│                          configuración de app.config.ts.
├── main.server.ts       → Punto de entrada del servidor SSR. Bootstrap de la app con la
│                          configuración de app.config.server.ts para Angular Universal.
├── server.ts            → Servidor Express para SSR. Sirve ficheros estáticos de /browser,
│                          delega el resto a AngularNodeAppEngine para renderizado server-side.
│                          Puerto por defecto: 4000.
└── styles.scss          → Punto de entrada SCSS global. Importa todos los partials de src/styles/.
```

### `src/styles/` — Estilos globales

Partials SCSS consumidos por `styles.scss`. Los componentes importan tokens a través de `@use 'styles/mixins'` (resuelto por `stylePreprocessorOptions.includePaths`).

```
src/styles/
└── .gitkeep             → (Futuro: _tokens.scss, _semantic.scss, _typography.scss, _spacing.scss,
                            _radii.scss, _shadows.scss, _motion.scss, _breakpoints.scss, _mixins.scss,
                            _animations.scss, _reset.scss — ver skill theming-styling)
```

### `src/environments/` — Configuración por entorno

```
src/environments/
└── .gitkeep             → (Futuro: environment.ts y environment.prod.ts — URLs base, feature flags)
```

### `src/assets/` — Recursos estáticos

```
src/assets/
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
├── app.ts               → Componente raíz (selector: fv-root). Importa RouterOutlet.
│                          Punto de montaje de la aplicación.
├── app.html             → Template del componente raíz. Actualmente contiene el placeholder
│                          de Angular CLI (será reemplazado por el shell de la app).
├── app.scss             → Estilos del componente raíz. Actualmente vacío.
├── app.spec.ts          → Tests del componente raíz. Verifica que se crea y renderiza el título.
├── app.config.ts        → Configuración de la aplicación cliente: provideRouter, provideClientHydration.
│                          Aquí se registrarán interceptores, LOCALE_ID y APP_INITIALIZERs.
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
└── <nombre>.routes.ts   → (Futuro) Configuración de rutas de la feature. Exporta
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
│   └── .gitkeep           validators/ (dniValidator, dateRangeValidator, priceRangeValidator).
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

> Cada commit que modifique la estructura debe añadir una entrada aquí.

| Fecha | Commit | Descripción |
| --- | --- | --- |
| 2026-06-04 | `1c18361` | Selector raíz renombrado de `app-root` a `fv-root` |
| 2026-06-04 | `76b5d52` | ESLint instalado con Angular ESLint, prefix `fv-` |
| 2026-06-04 | `8d7ab92` | Migración a feature-sliced: `core/`, `layout/`, `features/`, `shared/` |
| 2026-06-04 | `0df71b5` | Budgets de bundle apretados en `angular.json` |
| 2026-06-04 | `2e84ea8` | Scaffold inicial de carpetas (folder-by-type, ya reemplazado) |
| 2026-06-04 | `0bf2aca` | Primer commit del proyecto Angular 21 |
