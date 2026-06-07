# Documentación del proyecto festiVAL

> Portal informativo de los principales festivales de música de la Comunidad Valenciana.
> Aplicación Angular 21 con SSR, arquitectura feature-sliced y boundaries forzados.

---

## Regla de mantenimiento

**Este documento debe actualizarse con cada commit que modifique la estructura del proyecto.** Si un commit añade, elimina o renombra carpetas o ficheros, los cambios deben reflejarse aquí en el mismo commit. Un `docs/documentacion.md` desactualizado es un bug.

Responsable: cualquier agente o persona que realice el commit. La regla se aplica tanto a humanos como a Claude.

---

## Estructura raíz

```
festiVAL/
├── .codex/             → Desarrollo asistido por IA para Codex (agentes, skills, commands)
├── .claude/            → Desarrollo asistido por IA (agentes, skills, workflows)
├── .vscode/            → Configuración del editor VS Code
├── design/             → Assets de diseño (mockups, paletas de color, fuentes fuente)
├── docs/               → Documentación del proyecto
├── public/             → Ficheros estáticos servidos tal cual (favicon, fuentes runtime)
├── src/                → Código fuente de la aplicación
├── scripts/            → Scripts de utilidad Node.js no relacionados con el build de Angular
├── tasks/              → Planificación de proyectos, backlog, progreso y roadmap
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

## `.codex/` — Desarrollo asistido por IA para Codex

Contiene la configuración específica de Codex para agentes, skills y comandos del proyecto.

```
.codex/
├── AGENTS.md               → Contrato del proyecto para Codex
├── agents/                 → Agentes especializados por dominio
│   ├── contenido.toml      → Agente editorial: i18n, catálogo y microcopy
│   ├── prueba.toml         → Agente de testing: unit, component, E2E y gate
│   ├── rendimiento.toml    → Agente de rendimiento: SEO, bundles y SSR
│   ├── sistemas.toml       → Agente de arquitectura: servicios, estado y routing
│   └── vistas.toml         → Agente de UI: componentes, theming y responsive
├── commands/               → Comandos de workflow y automatización
│   ├── audit-structure.md  → Auditoría automatizada de arquitectura y estructura
│   └── autocommit.md       → Workflow de commits semánticos con pre-commit gate
└── skills/                 → Skills reutilizables (mismo conjunto y formato SKILL.md que `.claude/skills/`, en paridad)
    ├── <skill>/SKILL.md                       → Frontmatter (name, description) + cuerpo; espejo 1:1 de `.claude/skills/`
    └── <skill>/references/                    → (opcional) Material de referencia pesado extraído del SKILL.md
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
└── skills/                  → Skills reutilizables (formato Agent Skill: SKILL.md con frontmatter name/description)
    ├── <skill>/SKILL.md                 → Cada skill tiene su SKILL.md con frontmatter (name, description) y cuerpo
    ├── <skill>/references/              → (opcional) Material de referencia pesado extraído del SKILL.md
    │
    ├── accessibility/SKILL.md           → WCAG 2.1 AA: contraste, focus, ARIA, navegación por teclado
    ├── api-integration/SKILL.md         → Servicios HTTP tipados, validación Zod en frontera, caching
    ├── asset-organization/SKILL.md      → Reglas obligatorias para carpetas, nombres y limpieza de assets visuales
    ├── design-responsive-validation/SKILL.md → Identidad visual no genérica + validación responsive obligatoria
    ├── error-handling/SKILL.md          → FestivalError normalizado, Sentry, mensajes i18n al usuario
    ├── forms-validation/SKILL.md        → Reactive Forms tipados, validadores custom, errores inline
    ├── i18n-commit-policy/SKILL.md      → Política de traducción en commits: sólo es.json en desarrollo, propagación a ca/en al cerrar
    ├── internationalization/SKILL.md    → Transloco, date-fns, locales es/ca/en, ICU MessageFormat
    ├── maps/SKILL.md                    → MapLibre GL JS + Protomaps, lazy-loading, estilo dark custom
    ├── performance-optimization/SKILL.md → OnPush, @defer, imágenes WebP, budgets, SSR
    │   └── references/image-converter.md  → Pipeline Sharp scripts/convert-images.mjs (extraído)
    ├── project-structure/SKILL.md       → Estructura feature-sliced canónica (este documento la resume)
    │   └── references/eslint-boundaries.md → Config completa de eslint-plugin-boundaries (extraído)
    ├── routing-navigation/SKILL.md      → Esquema de URLs en español, loadChildren/loadComponent, resolvers
    ├── sanity-cms/SKILL.md              → Catálogo desde Sanity (CMS) vía @sanity/client: GROQ, cliente en data-access, Zod en frontera
    ├── search/SKILL.md                  → MiniSearch: búsqueda fuzzy client-side con boost por campo
    ├── seo-meta/SKILL.md                → Title/description por ruta, JSON-LD Event, OG, sitemap, canonicals
    ├── state-management/SKILL.md        → Signals, NgRx SignalStore, persistencia localStorage/idb-keyval
    ├── testing-patterns/SKILL.md        → Vitest, Playwright, pre-commit gate, data-testid, cobertura
    │   └── references/examples.md         → Ejemplos de test (Vitest, ATL, Zod) extraídos
    ├── theming-styling/SKILL.md         → Tokens SCSS, paleta dark premium, glassmorphism, motion
    │   └── references/tokens.md           → Catálogo completo de tokens primitivos/semánticos y escalas (extraído)
    └── ui-components/SKILL.md           → Catálogo de componentes, variantes, interacciones, estados
```

---

## `design/` — Assets de diseño

Contiene recursos visuales como mockups, paletas de color, inspiraciones y otros materiales de diseño relacionados con el proyecto festiVAL.

```
design/
├── font/                → Fuentes tipográficas del design system (sólo variable fonts originales)
│   ├── Inter/           → Inter variable font (UI text, data, hero default)
│   ├── JetBrains_Mono/  → JetBrains Mono variable font (mono: fechas, IDs, logs)
│   └── Sora/            → Sora variable font (headings, brand, hero emphasis)
├── info-festivales/     → Material gráfico de referencia para fichas informativas por festival
│   ├── bigsound/        → Logo, carteles por sede y creatividades por días de BIGSOUND
│   ├── latin/           → Logo, cartel base y cartel de Valencia de Latin Fest
│   ├── medusa/          → Logo, cartel por días y creatividades diarias de Medusa
│   ├── rbf/             → Logo y creatividades de artistas destacados de RBF
│   ├── reve/            → Logo y cartel base de REVE Fest
│   └── zevra/           → Logo, cartel por días y creatividades diarias de Zevra
├── logo/                → Logotipos y variantes de la marca
├── mockups/             → Referencias visuales y capturas de apoyo para iteraciones de UI
│   ├── Gemini_Generated_Image_l8rwoql8rwoql8rw.png → Mockup/export visual usado como referencia externa
│   └── image.png        → Captura de apoyo para validación visual del layout
└── palette/             → Paletas de color y esquemas cromáticos (palette1.svg, palette2.svg)
```

Las instancias estáticas (`*/static/`) y la familia Space Grotesk se eliminaron: la app sólo sirve los ejes variable desde `public/fonts/` y la fuente display canónica es **Sora**.

---

## `scripts/` — Utilidades de proyecto

Scripts Node.js ESM que complementan los comandos de Angular CLI. No forman parte del bundle.

```
scripts/
└── i18n-sync.mjs   → Sincronizador de locales: lee es.json y propaga claves ausentes a ca.json
                       y en.json usando el valor español como placeholder. Acepta --check para
                       modo de sólo lectura (exit 1 si hay divergencias, útil en CI).
                       Uso: npm run i18n:sync | npm run i18n:check
```

---

## `docs/` — Documentación

```
docs/
└── documentacion.md     → Este fichero. Propósito de cada carpeta y función de cada fichero del proyecto.
```

---

## `tasks/` — Planificación y seguimiento

Fuente única de verdad para la planificación del proyecto, roadmap, backlog y progreso. Reemplaza el roadmap inline en `README.md`.

```
tasks/
├── ROADMAP.md           → Roadmap del proyecto por fases (MVP, Personalización, Cuentas, Integraciones, i18n).
│                          Detalles de aceptación, dependencias y decisiones arquitectónicas.
├── BACKLOG.md           → Backlog priorizado de mejoras, refactorings y deuda técnica.
│                          Categorizado por prioridad: Alta, Media, Baja, Bloqueado.
├── IN_PROGRESS.md       → Trabajo activo en desarrollo o revisión. Actualizado al sprint planning.
└── COMPLETED.md         → Archivo de items completados, features entregadas, hitos cerrados.
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
├── index.html           → Documento HTML principal. `lang="es-ES"`, título `festiVAL`,
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
├── _animations.scss     → Keyframes fv-fade-up, fv-pulse-soft, fv-live-dot, fv-glow-pulse y fv-featured-marquee.
└── _reset.scss          → Reset opinionado (box-sizing, márgenes, listas, foco, tipografía base).
```

### `src/environments/` — Configuración por entorno

```
src/environments/
├── environment.ts       → Entorno por defecto (development). `production: false`, `defaultLocale: 'es-ES'`,
│                          `baseUrl: 'http://localhost:4200'`, bloque `sanity`. Exporta el tipo `Environment`.
└── environment.prod.ts  → Entorno de producción. `production: true`, `baseUrl: 'https://festival.example.com'`,
                           `useCdn: true` y `dataset: 'production'`.
```

### `src/assets/` — Recursos estáticos

```
src/assets/
├── branding/            → Assets de marca servidos en runtime
│   ├── festi-val-logo.webp → Logo principal (versión rasterizada usada por la cabecera)
│   └── favicon.svg         → Favicon vectorial
├── i18n/                → Ficheros de traducción JSON. `es.json` es la fuente de verdad; el resto
│   │                      mantiene paridad de claves. La propagación a los 44 locales europeos
│   │                      soportados ocurre durante un commit (skill `i18n-commit-policy`).
│   ├── es.json          → Fuente de verdad es-ES. Claves con puntos (nav.home, home.hero.title…).
│   ├── ca.json          → Locale roadmap ca-ES-valencia.
│   └── en.json          → Locale roadmap en-GB.
├── icons/               → Iconos SVG adicionales a Lucide
│   └── .gitkeep
├── images/              → Imágenes WebP generadas por el conversor Sharp. Comiteadas, nunca editadas a mano.
│   ├── backgrounds/     → Fondos y hero images optimizadas para runtime
│   │   ├── home-hero-sunset-beach-800.webp
│   │   ├── home-hero-sunset-beach-1200.webp
│   │   └── home-hero-sunset-beach-1600.webp
│   └── festivals/       → Logos de festivales en WebP listos para runtime, organizados por slug.
│       │                  La generación multiresolución sigue el pipeline Sharp cuando aplique.
│       ├── bigsound/    → logo-bigsound.webp
│       ├── latin-fest/  → logo-latin-fest.webp
│       ├── medusa/      → logo-medusa-2026.webp
│       ├── rbf/         → logo-rbf.webp
│       ├── reve/        → logo-reve.webp
│       └── zevra/       → logo-zevra.webp
├── images-src/          → Imágenes fuente (PNG/JPEG). Comiteadas pero nunca servidas al usuario.
│   ├── backgrounds/     → Fuentes de fondos y hero images antes de la conversión
│   │   └── home-hero-sunset-beach.jpg
│   └── festivals/       → Carteles y creatividades fuente de cada festival (organizados por slug).
│       ├── bigsound/    → cartel-bigsound-valencia-2026.jpg
│       ├── latin-fest/  → cartel-latin-fest-benidorm-2026.png, cartel-latin-fest-valencia-2026.webp
│       ├── medusa/      → cartel-medusa-2026.jpg, cartel-medusa-{jueves,viernes,sabado,domingo}-2026.png
│       ├── rbf/         → (sin cartel por ahora)
│       ├── reve/        → cartel-reve-roig-arena-valencia-2026.jxl (JPEG XL, requiere conversión)
│       └── zevra/       → cartel-zevra-2026.jpg, cartel-zevra-{viernes,sabado,domingo}-2026.jpeg
└── maps/                → Fichero JSON de estilo MapLibre (tema dark del mapa)
    └── .gitkeep
```

---

## `src/app/` — Aplicación Angular

### Ficheros raíz de la aplicación

```
src/app/
├── app.ts               → Componente raíz (selector: fv-root, OnPush). Importa RouterOutlet
│                          y NavBar. En el constructor inyecta HreflangService.apply() para
│                          registrar las etiquetas hreflang en <head> al arrancar.
├── app.html             → Template del componente raíz: <fv-nav-bar /> + <main> con
│                          <router-outlet />.
├── app.scss             → Estilos del componente raíz. Define el fondo de página
│                          (--app-page-bg) sand sobre el que se asienta el mockup del header.
├── app.spec.ts          → Tests del componente raíz. Verifica creación y presencia de router-outlet.
├── app.config.ts        → Configuración de la aplicación cliente: registra es-ES (LOCALE_ID +
│                          registerLocaleData), provideRouter, provideClientHydration, provideHttpClient
│                          (withFetch), provideTransloco (availableLangs: es/ca/en, defaultLang: es,
│                          loader: TranslocoHttpLoader) y APP_INITIALIZER que precarga 'es' antes del
│                          primer render para evitar parpadeo de claves sin traducir.
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
│   ├── .gitkeep           locale, hidratación de preferencias de tema desde localStorage.
│   └── transloco.loader.ts → TranslocoHttpLoader: carga los ficheros JSON de traducción desde
│                            `/assets/i18n/<lang>.json`. Inyectado en provideTransloco (app.config.ts).
├── tokens/              → InjectionTokens tipados para configuración inyectable.
│   └── .gitkeep
└── platform/            → Helpers de SSR: wrappers de isPlatformBrowser, guardas para APIs
    └── hreflang.service.ts → HreflangService: inyecta <link rel="alternate" hreflang="…"> para
                              es/ca/en y x-default en <head>. Usa environment.baseUrl. Llamado una
                              vez en el constructor de App.
```

### `src/app/layout/` — Shell de la aplicación

Cargado eagerly. Compone la estructura visual que envuelve todas las rutas.

```
src/app/layout/
├── shell/               → Componente host del <router-outlet>. Organiza nav-bar + contenido + footer.
│   └── .gitkeep
├── nav-bar/             → Cabecera estática del sitio (sticky). Logo `assets/branding/festi-val-logo.webp`
│   ├── nav-bar.ts         vía `NgOptimizedImage` (`priority`), navegación principal (Home,
│   ├── nav-bar.html       Festivals, Calendar, Explore, About), icono de búsqueda y toggle de
│   ├── nav-bar.scss       tema. Mobile-first: en <1024 px sólo aparecen logo, búsqueda y
│   └── nav-bar.spec.ts    hamburguesa. Incluye selector de idioma ES/CA/EN (visible en desktop)
│                          que llama a TranslationService.setLang(). aria-current="page" en el
│                          enlace activo vía routerLinkActive.
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
│   ├── feature/
│   │   ├── home.page.ts    → Página de inicio standalone. Orquesta el hero editorial y el carrusel
│   │   │                     local `featured-festivals`.
│   │   ├── home.page.html  → Hero con CTAs + inserción del componente de festivales destacados.
│   │   ├── home.page.scss  → Layout de la home: espaciado vertical, hero card y responsive.
│   │   └── home.page.spec.ts → Test de render del hero y de la sección animada de tarjetas.
│   ├── ui/
│   │   ├── .gitkeep
│   │   └── featured-festivals/
│   │       ├── featured-festivals.ts      → Componente local standalone con datos de festivales
│   │       │                                destacados.
│   │       ├── featured-festivals.html    → Header "Festivales destacados" y tarjetas con imagen,
│   │       │                                fecha, nombre y ubicación.
│   │       ├── featured-festivals.scss    → Carrusel horizontal sin fondo propio: movimiento continuo
│   │       │                                en desktop, avance cada 5 s en móvil y sin lift en hover.
│   │       └── featured-festivals.spec.ts → Tests de render, ausencia del CTA "Ver todos", pista duplicada
│   │                                        y pausa/reanudación del carrusel.
│   ├── data-access/
│   │   └── .gitkeep
│   └── home.routes.ts   → Superficie pública de la feature. Expone HOME_ROUTES con loadComponent
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
│   │                      ArtistService, VenueService, SearchService (MiniSearch),
│   │                      CatalogueStore, FavouritesStore, SanityClientService, AnalyticsService.
│   └── i18n/            → Capa i18n con Transloco.
│       ├── translations.ts            → Importa `es.json` vía `@assets/i18n/es.json`. Exporta
│       │                                `ES_TRANSLATIONS`, el tipo `Translations` y el tipo
│       │                                `TranslationKey` (literal union de dotted paths).
│       ├── translation.service.ts     → `TranslationService` (providedIn: 'root'). Inyecta
│       │                                `TranslocoService` de forma opcional: en producción delega
│       │                                en Transloco; en tests (sin Transloco provisto) usa el
│       │                                bundle estático ES_TRANSLATIONS. Expone `t(key)`,
│       │                                `setLang()` y la signal `activeLang`.
│       └── translation.service.spec.ts → Specs del servicio.
├── domain/              → Modelos de dominio: interfaces TypeScript + schemas Zod.
│   └── .gitkeep           festival.model.ts, artist.model.ts, venue.model.ts,
│                          festival-error.model.ts. El schema Zod vive junto al tipo inferido.
├── pipes/               → Pipes genéricos reutilizables.
│   ├── translate.pipe.ts      → Pipe impuro `| t` que delega en `TranslationService`.
│   │                            Lee la signal `activeLang` para que Angular detecte cambios
│   │                            de idioma y re-ejecute el pipe. Uso: `{{ 'nav.home' | t }}`.
│   └── translate.pipe.spec.ts → Spec del pipe sobre un host standalone.
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

Configuración de Angular CLI para el proyecto `festiVAL`:

- **Build**: builder `@angular/build:application`, entry browser `src/main.ts`, server `src/main.server.ts`, SSR con Express (`src/server.ts`).
- **Assets**: además de `public/` (servido en raíz), `src/assets/` se sirve bajo `/assets/` para imágenes, fuentes adicionales, iconos, etc.
- **Estilos**: SCSS como preprocesador, `stylePreprocessorOptions.includePaths: ["src"]` para permitir `@use 'styles/...'` desde componentes.
- **Budgets**: inicial ≤ 250 KB warning / 350 KB error; lazy chunks ≤ 80 KB warning / 120 KB error; component styles ≤ 4 KB warning / 8 KB error.
- **Prefix**: `fv` (todos los componentes generados usan selector `fv-*`).
- **Lint**: builder `@angular-eslint/builder:lint`, patrones `src/**/*.ts` y `src/**/*.html`.
- **Schematics**: `angular-eslint` como colección de schematics, componentes SCSS por defecto.

### `tsconfig.json`

Configuración base de TypeScript:

- **Target**: ES2022, `module: "preserve"`, `strict: true`.
- **Path aliases**: `@core/*`, `@layout/*`, `@features/*`, `@shared/*` (ui, data-access, domain, util, pipes, directives, testing), `@env/*`, `@assets/*` (registrado en `eslint-plugin-boundaries` como elemento `asset`; sólo `shared` puede importarlo). El namespace SCSS se resuelve por `stylePreprocessorOptions.includePaths: ["src"]`; no hay alias TS para estilos.
- **Angular compiler**: templates estrictos, parámetros de inyección estrictos, inputs estrictos.

### `tsconfig.app.json`

Extiende `tsconfig.json`. Output en `out-tsc/app`. Incluye todo `src/**/*.ts` excepto `*.spec.ts`. Tipos: `node`.

### `tsconfig.spec.json`

Extiende `tsconfig.json`. Output en `out-tsc/spec`. Incluye `*.spec.ts` y `*.d.ts`. Tipos: `vitest/globals`.

### `eslint.config.js`

Configuración flat de ESLint:

- Para `**/*.ts`: reglas recomendadas de ESLint + TypeScript ESLint + Angular ESLint. Procesador de templates inline. Selectores forzados a prefix `fv-` (components kebab-case, directives camelCase). `eslint-plugin-boundaries` configurado con elementos `core / layout / feature / shared / app / env` y la matriz de dependencias `features → core/shared/env`, `layout → core/shared/env`, `shared → core/shared/env`, `core → core/shared/env`; la única superficie pública de una feature es su `<feature>.routes.ts`.
- Para `**/*.html`: reglas recomendadas de templates Angular + reglas de accesibilidad en templates.

### `.editorconfig`

Reglas de formato: UTF-8, espacios de 2, newline final, trim trailing whitespace. Comillas simples en TypeScript. Sin trim en Markdown.

### `package.json`

Scripts principales: `start` (ng serve), `build` (ng build), `test` (ng test), `lint` (ng lint), `watch` (ng build --watch), `i18n:sync` (propaga claves de es.json a ca.json/en.json), `i18n:check` (verifica paridad sin escribir; falla con exit 1 en CI). Prettier configurado inline. Dependencias principales: Angular 21, Express 5, RxJS 7, TypeScript 5.9, @jsverse/transloco 8.x. Dev: Angular CLI, Vitest, Angular ESLint.

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

Estas reglas están forzadas por `eslint-plugin-boundaries` (configurado en `eslint.config.js`).

---

## Historial de cambios estructurales

| Fecha | Cambio | Descripción |
| --- | --- | --- |
| 2026-06-04 | Skill `asset-organization` | Añadidas `.codex/skills/asset-organization/README.md` y `.claude/skills/asset-organization/README.md` como fuente de verdad para las reglas de gestión de assets visuales. Actualizadas las listas de skills en ambos contratos y esta documentación. |
| 2026-06-04 | Ordenación de `images/` | Reubicados los assets de la home en `src/assets/images/backgrounds/` y `src/assets/images-src/backgrounds/` para cumplir la skill `asset-organization`. Actualizadas sus referencias en la feature `home` y esta documentación. |
| 2026-06-04 | Home mínima con card de imagen | Añadidos `src/app/features/home/feature/home.page.{ts,html,scss,spec.ts}`, `src/app/features/home/home.routes.ts`, cableada la ruta raíz en `src/app/app.routes.ts` y añadidos los assets `src/assets/images-src/backgrounds/home-hero-sunset-beach.jpg` + `src/assets/images/backgrounds/home-hero-sunset-beach-{800,1200,1600}.webp`. |
| 2026-06-04 | Rename `.codex/prompts/` → `.codex/commands/` | Renombrada la carpeta de comandos de Codex y actualizadas sus referencias en `AGENTS.md` y esta documentación. |
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
| 2026-06-04 | `index.html` localizado | `lang="es-ES"`, título `festiVAL`, meta theme-color, favicon SVG enlazado. |
| 2026-06-04 | Reset del placeholder Angular | `src/app/app.html` reducido a `<router-outlet />`. `app.ts` migrado a OnPush sin `title` signal. `app.spec.ts` ahora verifica el outlet en vez del título. |
| 2026-06-04 | Registro de locale `es-ES` | `src/app/app.config.ts` registra `LOCALE_ID: 'es-ES'` y `registerLocaleData(localeEs)` conforme a CLAUDE.md. |
| 2026-06-04 | Eliminación de la abstracción de fuentes | Borrados `shared/util/font/` (incluido el barrel `index.ts`), `shared/directives/font.directive.ts` y `shared/pipes/font.pipe.ts`. La selección de fuente se hace directamente con `var(--fv-font-*)` o las clases utilitarias `.fv-font-*` de `_fonts.scss`. |
| 2026-06-04 | Sistema de tokens completo | Añadidos partials `_tokens`, `_semantic`, `_typography`, `_spacing`, `_radii`, `_shadows`, `_motion`, `_breakpoints`, `_mixins`, `_animations`, `_reset` en `src/styles/`. `styles.scss` los compone en orden de dependencia. `_fonts.scss` purgado del duplicado `--fv-font-mono`. |
| 2026-06-04 | Stack canónico instalado (baseline MVP) | Añadidas dependencias `zod`, `date-fns`, `@sanity/client` y `eslint-plugin-boundaries`. |
| 2026-06-04 | ESLint boundaries activado | `eslint-plugin-boundaries` configurado en `eslint.config.js`. Forzadas las reglas duras de `project-structure` (aislamiento de features, sólo `<feature>.routes.ts` como surface pública). |
| 2026-06-04 | `tsconfig` paths | Eliminado el alias `@styles/*` (sin uso; el namespace SCSS se resuelve por `includePaths`). |
| 2026-06-04 | README reescrito | `README.md` alineado con la arquitectura feature-sliced real, el stack canónico de `CLAUDE.md` y el roadmap por fases. |
| 2026-06-04 | Rebranding `festiVal` → `festiVAL` | Renombrada la marca en todo el proyecto: copy en `.claude/`, `docs/`, `README.md`, `src/index.html` (título), cabeceras SCSS, identificador del proyecto Angular (`angular.json`) y script `serve:ssr:festiVAL` en `package.json`. El paquete npm sigue siendo `festi-val` (npm exige kebab-case minúsculas). |
| 2026-06-04 | Cabecera estática | Añadido `src/app/layout/nav-bar/` (`nav-bar.{ts,html,scss,spec.ts}`) con la cabecera estática del brief: logo `assets/branding/festi-val-logo.webp` vía `NgOptimizedImage`, navegación, búsqueda y toggle de tema. Cableado en `app.ts`/`app.html`; `app.scss` fija el fondo sand de la página. Paleta Mediterránea (sand #F8F5F0, navy #0F172A) scopeada al componente — pendiente de promover a `_tokens.scss`/`_semantic.scss` si se confirma el pivote de identidad visual. |
| 2026-06-04 | Assets runtime | `src/assets/branding/festi-val-logo.webp` copiado desde `design/logo/`. `angular.json` ahora sirve `src/assets/` bajo `/assets/` (el bloque sólo exponía `public/`, dejando los SVG de marca inalcanzables en runtime). |
| 2026-06-04 | Limpieza branding | Renombrado `logo1.webp` a `festi-val-logo.webp` para cumplir la convención de naming de assets y eliminadas las variantes no usadas `main-logo.svg` y `logo-icon.svg` de `src/assets/branding/`. |
| 2026-06-04 | Nuevo material en `design/mockups/` | Añadidos `Gemini_Generated_Image_l8rwoql8rwoql8rw.png` e `image.png` como referencias visuales para iteraciones de interfaz. |
| 2026-06-06 | Hero editorial e i18n base | Añadidos `src/assets/i18n/ca.json` y `src/assets/i18n/en.json` para mantener paridad de claves con `es.json`. La home deja de ser una superficie sólo visual y consume el copy de `home.hero.*` desde los JSON de locales, manteniendo los CTA como botones estáticos. |
| 2026-06-06 | Revocada la fila "Locales europeos por país" | La fila previa afirmaba que se habían añadido 45 archivos de locale por país en `src/assets/i18n/`. Esos archivos nunca llegaron a un commit y se eliminaron del working tree para respetar la skill `i18n-commit-policy` (modo desarrollo edita sólo `es.json`; la propagación a los locales soportados ocurre durante un commit con su Translation Report). El estado real del directorio es: `es.json` (fuente), `ca.json`, `en.json`. |
| 2026-06-06 | Skill `design-responsive-validation` | Añadidas `.claude/skills/design-responsive-validation/README.md` y `.codex/skills/design-responsive-validation/README.md` como fuente de verdad para la identidad visual no genérica y la validación responsive obligatoria (desktop / laptop / tablet / mobile 320 px). Cada tarea de UI debe terminar con un Design & Responsive Validation Report. Listadas en `CLAUDE.md`, `AGENTS.md` y esta documentación. |
| 2026-06-06 | Skill `i18n-commit-policy` | Añadidas `.claude/skills/i18n-commit-policy/README.md` y `.codex/skills/i18n-commit-policy/README.md`. Política: durante el desarrollo sólo se edita `src/assets/i18n/es.json`; al preparar un commit se propagan las claves modificadas a los 44 locales europeos soportados (matriz país → BCP-47 incluida en la skill), se valida la paridad JSON y se emite un i18n Commit Translation Report antes de `git commit`. Listada en `CLAUDE.md`, `AGENTS.md` y esta documentación. |
| 2026-06-06 | Entornos baseline | Eliminado `src/environments/.gitkeep`; creados `src/environments/environment.ts` y `environment.prod.ts` con `production`, `defaultLocale: 'es-ES'` y bloque `sanity` (projectId, dataset, apiVersion, useCdn). Cierra la deuda señalada en auditorías previas: las URL base, flags y endpoints viven aquí, nunca hardcodeados en servicios. |
| 2026-06-06 | Alias `@assets/*` | Añadido al `tsconfig.json` (`@assets/*: ["src/assets/*"]`) y registrado en `eslint.config.js` como elemento `asset` de `eslint-plugin-boundaries` (sólo `shared` puede importar de `asset`; `asset` se autoreferencia). Resuelve la regla "path aliases always" para los JSON de i18n. |
| 2026-06-06 | Capa i18n MVP en `@shared` | Añadidos `src/app/shared/data-access/i18n/translations.ts` (importa `es.json` vía el alias nuevo `@assets/*`, expone `ES_TRANSLATIONS` y el tipo `TranslationKey` con paths punteados), `translation.service.ts` (Signals: `t(key)` resuelve dotted paths con fallback) y sus specs. Añadido `src/app/shared/pipes/translate.pipe.ts` (`{{ 'nav.home' \| t }}`) standalone y puro. Añadida la clave `nav.aria.primary` en `es.json`, `ca.json`, `en.json` para mantener paridad. Eliminados los `.gitkeep` de `shared/data-access/` y `shared/pipes/`. |
| 2026-06-06 | Nav-bar con Router + i18n | `src/app/layout/nav-bar/nav-bar.ts` ahora importa `RouterLink` y `TranslatePipe`. `nav-bar.html` reemplaza `href="#"` y los hrefs absolutos por `routerLink` (`/`, `/festivales`, `/calendario`, `/explorar`, `/sobre-nosotros`); los 5 textos de las links y los aria-labels de las 3 acciones se resuelven con la pipe (`nav.home`, `nav.festivals`, …, `nav.aria.primary`). `nav-bar.spec.ts` provee router e inspecciona los labels traducidos. |
| 2026-06-06 | Token `--fv-blur-glass` | Añadido a `_semantic.scss` como custom property bajo la sección "Effects". Consumido por el botón secundario del hero (`backdrop-filter: blur(var(--fv-blur-glass))`) y disponible para futuros componentes glass. Anotados como deliberados los literales magic-number residuales del hero (`aspect-ratio: 4/5.2`, `line-height: 1.08`, `translateY(-2px)`). |
| 2026-06-06 | Limpieza stack | Eliminada la dependencia huérfana `lucide` de `package.json` (sin consumidores). El paquete activo es `@lucide/angular` — la tabla de stack canónico de `CLAUDE.md` y `AGENTS.md` actualizada para reflejar el nombre real. |
| 2026-06-06 | Nueva carpeta `tasks/` | Creada `/tasks/` como fuente única de verdad para planificación. Añadidos `ROADMAP.md` (roadmap por fases), `BACKLOG.md` (backlog priorizado), `IN_PROGRESS.md` (trabajo activo), `COMPLETED.md` (archivo de items completados). Removido el roadmap inline de `README.md` y reemplazado por referencia a `tasks/ROADMAP.md`. Actualizada esta documentación. |
| 2026-06-06 | Carrusel local `featured-festivals` en home | Añadida la carpeta `src/app/features/home/ui/featured-festivals/` con `featured-festivals.{ts,html,scss,spec.ts}`. `home.page.*` mantiene el hero superior y monta debajo una sección de festivales destacados con tarjetas de imagen: carrusel sin fondo propio, sin CTA "Ver todos", movimiento continuo en desktop, avance cada 5 s en móvil y sin desplazamiento de tarjeta en hover. `src/assets/i18n/{es,ca,en}.json` amplía `home.featured.*` para el copy de la sección y las cuatro tarjetas. |
| 2026-06-06 | Nuevo material en `design/info-festivales/` | Añadida la carpeta `design/info-festivales/` con material gráfico de referencia para BIGSOUND, Latin Fest, Medusa, RBF, REVE Fest y Zevra: logos, carteles, creatividades por días y piezas de artistas destacados. |
| 2026-06-06 | Cartel Valencia de Latin Fest | Añadido `design/info-festivales/latin/latin-cartel-valencia.webp` como cartel específico de Valencia para el material gráfico de referencia de Latin Fest. |
| 2026-06-07 | Assets de festivales reales en `src/assets/` | Creadas las carpetas `src/assets/images/festivals/<slug>/` (6 festivales: bigsound, latin-fest, medusa, rbf, reve, zevra) con logos servibles, y `src/assets/images-src/festivals/<slug>/` con carteles fuente (PNG/JPEG/JXL, nunca servidos). El carrusel `featured-festivals` actualizado: 6 festivales reales (Bigsound, Latin Fest, Medusa, RBF, Reve, Zevra), logos con `object-fit: contain`, keyframe `fv-featured-marquee` añadido, animación mobile recalibrada para 6 items. Claves i18n `home.featured.cards.*` reemplazadas en `es.json`, `ca.json` y `en.json`. |
| 2026-06-07 | Conversión de logos a WebP en `src/assets/images/` | Convertidos a WebP los logos de festivales y patrocinadores en `src/assets/images/festivals/` y `src/assets/images/sponsors/`, eliminando los archivos PNG/JPEG originales de runtime. Actualizado `featured-festivals` para consumir los nuevos `.webp`. |
| 2026-06-07 | Integración Transloco + hreflang + script de merge | **Step 1 — Transloco**: instalado `@jsverse/transloco@8.x`; añadido `src/app/core/initializers/transloco.loader.ts` (TranslocoHttpLoader); `app.config.ts` ampliado con `provideHttpClient(withFetch())`, `provideTransloco` (es/ca/en, fallback es) y `APP_INITIALIZER` que precarga 'es'; `TranslationService` refactorizado para inyectar `TranslocoService` de forma opcional (tests usan el fallback estático); `TranslatePipe` cambiado a `pure: false` y lee la signal `activeLang`; `NavBar` expone selector ES/CA/EN con `TranslationService.setLang()`; añadida clave `nav.langSwitcher` en los 3 JSON. **Step 2 — script de merge**: creada carpeta `scripts/` con `i18n-sync.mjs`; añadidos scripts `i18n:sync` e `i18n:check` a `package.json`. **Step 3 — hreflang**: añadido `baseUrl` a `Environment` y a ambos `environment.ts`; creado `src/app/core/platform/hreflang.service.ts`; `App` inyecta el servicio en su constructor. |
| 2026-06-07 | Correcciones auditoría (health 88 → 100) | Eliminado `src/app/core/platform/.gitkeep` (redundante junto a `hreflang.service.ts`). `app.config.ts`: `prodMode` cambiado de literal `false` a `environment.production`. `app.scss`: `72px` extraído a `--app-nav-height`. `home.page.scss`: `4rem` extraído a `--home-cta-min-height`; `1.125rem` extraído a `--home-btn-icon-size`. `featured-festivals.scss`: `1.875rem` extraído a `--featured-date-badge-height`; `line-height: 1.1` sustituido por `var(--fv-leading-display)`. `home.page.html`: `<fv-featured-festivals>` envuelto en `@defer (on viewport)`. `home.page.spec.ts`: actualizado a `DeferBlockBehavior.Manual` y `getDeferBlocks()`. |
| 2026-06-07 | Auditoría `.claude` — alineación contrato↔código | **Skill `i18n-commit-policy`** (`.claude` + `.codex`): reescrita la matriz de locales fantasma (44 países europeos) a la real `es`/`ca`/`en` (+ roadmap `ca-ES-valencia`/`en-GB`); corregida la referencia al script inexistente `validate-i18n-parity.mjs` → `scripts/i18n-sync.mjs` (`npm run i18n:sync` / `i18n:check`). **Catálogo real** propagado a `CLAUDE.md`, `AGENTS.md`, agentes `contenido`/`sistemas`/`prueba` y skill `state-management`: festivales ficticios (FIB, Arenal Sound, Low, SanSan) → reales (Bigsound, Latin Fest, Medusa, RBF, Reve, Zevra); `README.md` § Descripción actualizado. **Phasing Transloco** aclarado en ambos contratos (infraestructura ya en MVP). **Dead code/assets**: eliminado `TranslationService.setLang()` (sin consumidores tras revert del lang switcher), clave i18n huérfana `nav.langSwitcher` en `es/ca/en.json`, y los dos logos no usados de `src/assets/images/sponsors/` (carpeta eliminada). Limpieza de ficheros `.DS_Store`. |
| 2026-06-07 | Image loader para la hero (`ngSrcset` real) | `app.config.ts`: añadido `IMAGE_LOADER` (`festivalImageLoader`) con reescritura de ancho **opt-in** vía `loaderParams.variants`; solo la hero (que tiene las variantes `home-hero-sunset-beach-{800,1200,1600}.webp`) lo solicita, de modo que `ngSrcset` resuelve a los ficheros reales. Los logos de festival (fuente única, p. ej. `logo-medusa-2026.webp`) se devuelven intactos → sin 404. `home.page.html`: la hero añade `[loaderParams]="{ variants: true }"`. Resuelve el aviso de NgOptimizedImage por `ngSrcset` sin loader y activa el servido responsive del elemento LCP. |
| 2026-06-07 | Reorganización `skills/` al estilo Agent Skill (Google) | Las 18 skills de `.claude/skills/` (y su espejo `.codex/skills/`) pasan de `README.md` a **`SKILL.md`** con **frontmatter** `name` + `description` (ahora son Agent Skills descubribles), spine consistente y footer `## Related skills`. Disclosure progresivo: contenido pesado extraído a `references/` en las 4 grandes — `project-structure/references/eslint-boundaries.md`, `theming-styling/references/tokens.md`, `testing-patterns/references/examples.md`, `performance-optimization/references/image-converter.md`. Nueva skill **`sanity-cms`** (hueco real: el CMS Sanity está en el stack). Corregida la contradicción residual "44 locales europeos" en `CLAUDE.md`/`AGENTS.md` → `ca`/`en`. Referencias `skills/*/README.md` → `SKILL.md` en ambos contratos; `sanity-cms` añadida a las listas de skills y al comando `audit-structure`. Paridad `.claude`↔`.codex` verificada (`diff -rq`). |
