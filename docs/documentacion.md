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
├── .claude/            → Desarrollo asistido por IA para Claude Code (agentes, skills, workflows)
├── .vscode/            → Configuración del editor VS Code
├── design/             → Assets de diseño (mockups, paletas de color, fuentes fuente)
├── docs/               → Documentación del proyecto
├── public/             → Ficheros estáticos servidos tal cual (favicon, fuentes runtime,
│                          `festival-detail-{slug}.json` con datos verificados del festival)
├── src/                → Código fuente de la aplicación
├── scripts/            → Scripts de utilidad Node.js no relacionados con el build de Angular
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
│   ├── autocommit.md       → Workflow de commits semánticos con pre-commit gate
│   ├── merge-develop-into-branches.md → Fusión directa de develop en ramas remotas (variante simple)
│   ├── merge-to-develop.md → Fusiona la rama actual en develop (gate + conflictos + push)
│   ├── new-branch.md       → Crea rama git desde develop (tipo/slug normalizado)
│   └── update-branches-from-develop.md → Fusiona develop en ramas remotas (excepto main/develop)
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
│   ├── autocommit.md        → Workflow de commits semánticos (Conventional Commits + pre-commit gate). Pregunta nº de issue (0 para terminar o omitir) y añade (#n) al resumen
│   ├── merge-to-develop.md  → Fusiona la rama actual en develop: gate, conflictos, push y restauración de rama
│   ├── new-branch.md        → Crea una rama git desde develop: pregunta el nombre, lo normaliza, actualiza develop y hace checkout de la nueva rama
│   └── update-branches-from-develop.md → Fusiona develop en todas las ramas remotas (excepto main/develop); script en scripts/update-branches-from-develop.sh
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
    ├── light-dark-mode/SKILL.md         → Adaptación obligatoria de UI nueva a temas claro/oscuro/sistema
    ├── liquid-glass/SKILL.md            → Sistema Liquid Glass premium: superficies semitransparentes con blur,
    │                                      capas de profundidad, edge glow y accesibilidad
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
├── i18n-sync.mjs                      → Sincronizador de locales: lee es.json y propaga claves ausentes a ca.json
│                                        y en.json usando el valor español como placeholder. Acepta --check para
│                                        modo de sólo lectura (exit 1 si hay divergencias, útil en CI).
│                                        Uso: npm run i18n:sync | npm run i18n:check
├── convert-images.mjs                 → Conversor Sharp: recorre `src/assets/images-src/` recursivamente y genera
│                                        WebP en `src/assets/images/` (presets hero/og/default; soporte JXL vía djxl).
│                                        Uso: npm run images:convert
├── merge-develop-into-branches.sh     → Variante simple: fusiona develop en cada rama remota (excepto main/develop/HEAD),
│                                        empuja a origin y termina en develop. Para en el primer conflicto (`set -e`).
│                                        Uso: npm run branches:merge-develop-into-all
└── update-branches-from-develop.sh    → Variante con agente: fusiona develop en cada rama remota (excepto main/develop/HEAD),
                                         empuja a origin y restaura la rama original. En conflicto sale con exit `2`,
                                         deja el merge activo y lista ficheros para que el agente resuelva (no aborta).
                                         Requiere working tree limpio. Uso: npm run branches:update-from-develop
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
│                          meta theme-color, favicon SVG + .ico, monta <fv-root>. Incluye un
│                          script inline bloqueante anti-parpadeo que aplica `data-theme` desde
│                          localStorage('fv-theme') antes del primer pintado (ver ThemeService).
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
│                          `:root` es el tema CLARO; el mixin `fv-theme-dark` redefine los tokens
│                          de "chrome" (page/nav/footer/card-light/tile-dark…) y se aplica en
│                          `:root[data-theme="dark"]` y en `@media (prefers-color-scheme: dark)`
│                          cuando no hay `data-theme` (modo system).
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
├── _reset.scss          → Reset opinionado (box-sizing, márgenes, listas, foco, tipografía base).
└── utilities/           → Utilidades SCSS singulares
    └── _liquid-glass.scss → Mixin liquid-glass y clases .glass-* para el sistema Liquid Glass premium
```

### `src/environments/` — Configuración por entorno

```
src/environments/
├── environment.ts       → Entorno por defecto (development). `production: false`, `defaultLocale: 'es-ES'`,
│                          `baseUrl: 'http://localhost:4200'`, bloque `sanity`, bloque `maps`
│                          (styleUrl CARTO dark, center/zoom sobre la Comunidad Valenciana),
│                          bloque `sentry: { dsn: '' }` (vacío en dev). Exporta el tipo `Environment`.
└── environment.prod.ts  → Entorno de producción. `production: true`, `baseUrl: 'https://festival.example.com'`,
                           `useCdn: true`, `dataset: 'production'`. Bloque `maps`: styleUrl apunta
                           a `/assets/maps/festival-dark.json` (self-hosted Protomaps).
                           Bloque `sentry: { dsn: '' }` (rellenar con el DSN real antes del deploy).
```

### `src/assets/` — Recursos estáticos

```
src/assets/
├── branding/            → Assets de marca servidos en runtime
│   ├── festi-val-logo.webp → Logo principal (letras navy) usado por la cabecera en tema claro
│   ├── festi-val-logo-dark.webp → Variante del logo con letras blancas para el tema oscuro
│   │                              (mismo icono en color; conmutado por ThemeService en nav-bar/footer)
│   └── favicon.svg         → Favicon vectorial
├── i18n/                → Ficheros de traducción JSON. `es.json` es la fuente de verdad; el resto
│   │                      mantiene paridad de claves. La propagación a los locales soportados
│   │                      (`ca`, `en`) ocurre durante un commit (skill `i18n-commit-policy`).
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
│   ├── festivals/       → Logos y carteles de festivales en WebP listos para runtime, por slug.
│   │   ├── bigsound/    → logo-bigsound.webp, cartel-bigsound-valencia-2026.webp
│   │   ├── latin-fest/  → logo-latin-fest.webp, cartel-latin-fest-{benidorm,valencia}-2026.webp
│   │   ├── medusa/      → logo-medusa-2026.webp, cartel-medusa-2026.webp, cartel-medusa-{jueves,viernes,sabado,domingo}-2026.webp
│   │   ├── rbf/         → logo-rbf.webp
│   │   ├── reve/        → logo-reve.webp, cartel-reve-roig-arena-valencia-2026.webp
│   │   └── zevra/       → logo-zevra.webp, cartel-zevra-2026.webp, cartel-zevra-{viernes,sabado,domingo}-2026.webp
│   └── maps/            → Imágenes WebP del mapa de la Comunitat Valenciana usadas por home-festival-map.
│       ├── valencia-map.webp
│       ├── valencia-community-map-gradient.webp
│       └── valencia-community-map-gradient-cropped.webp
├── images-src/          → Imágenes fuente (PNG/JPEG). Comiteadas pero nunca servidas al usuario.
│   ├── backgrounds/     → Fuentes de fondos y hero images antes de la conversión
│   │   └── home-hero-sunset-beach.jpg
│   ├── maps/            → Fuentes del mapa antes de la conversión a WebP.
│   │   ├── valencia-map.png
│   │   └── valencia-community-map-gradient.webp
│   └── festivals/       → Carteles y creatividades fuente de cada festival (organizados por slug).
│       ├── bigsound/    → cartel-bigsound-valencia-2026.jpg
│       ├── latin-fest/  → cartel-latin-fest-benidorm-2026.png, cartel-latin-fest-valencia-2026.webp
│       ├── medusa/      → cartel-medusa-2026.jpg, cartel-medusa-{jueves,viernes,sabado,domingo}-2026.png
│       ├── rbf/         → (sin cartel por ahora)
│       ├── reve/        → cartel-reve-roig-arena-valencia-2026.jxl (JPEG XL, requiere conversión)
│       └── zevra/       → cartel-zevra-2026.jpg, cartel-zevra-{viernes,sabado,domingo}-2026.jpeg
└── maps/                → Fichero JSON de estilo MapLibre (tema dark del mapa)
    └── festival-dark.json  → Estilo MapLibre placeholder para producción (self-hosted Protomaps).
                               En desarrollo se usa el estilo CARTO dark desde environment.maps.styleUrl.
```

---

## `src/app/` — Aplicación Angular

### Ficheros raíz de la aplicación

```
src/app/
├── app.ts               → Componente raíz (selector: fv-root, OnPush). Importa RouterOutlet,
│                          NavBar, Footer y NotificationBannerComponent. En el constructor inyecta
│                          HreflangService.apply() y ThemeService.
├── app.html             → Template del componente raíz: <fv-notification-banner /> (banner de
│                          errores) + <fv-nav-bar /> + <main> con <router-outlet /> + <fv-footer />.
├── app.scss             → Estilos del componente raíz. Define el fondo de página
│                          (--app-page-bg) sand sobre el que se asienta el mockup del header.
├── app.spec.ts          → Tests del componente raíz. Verifica creación y presencia de router-outlet.
├── app.config.ts        → Configuración de la aplicación cliente: registra es-ES (LOCALE_ID +
│                          registerLocaleData), provideRouter, provideClientHydration, provideHttpClient
│                          (withFetch), provideTransloco (availableLangs: es/ca/en, defaultLang: es,
│                          loader: TranslocoHttpLoader) y APP_INITIALIZER que precarga 'es'. Inicializa
│                          Sentry con el DSN de environment.sentry.dsn si está presente.
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
├── interceptors/
│   └── error.interceptor.ts → errorInterceptor (HttpInterceptorFn): captura errores HTTP y los
│                               convierte en FestivalError vía fromHttpStatus(). Registrado en
│                               provideHttpClient(withInterceptors([errorInterceptor])).
├── handlers/
│   └── festival-error.handler.ts → FestivalErrorHandler (implements ErrorHandler): loguea
│                                    FestivalError en dev; en producción llama a
│                                    Sentry.captureException y muestra un mensaje i18n al usuario
│                                    vía NotificationService. Registrado en app.config.ts.
├── notifications/
│   └── notification.service.ts   → NotificationService (providedIn: 'root'): signal<AppNotification|null>
│                                    que expone show() y dismiss(). Desacoplado de ErrorHandler para
│                                    permitir notificaciones desde cualquier punto de la app.
├── initializers/        → Factorías APP_INITIALIZER: carga del catálogo desde Sanity, registro de
│   │                      locale, hidratación de preferencias de tema desde localStorage.
│   └── transloco.loader.ts → TranslocoHttpLoader: carga los ficheros JSON de traducción desde
│                            `/assets/i18n/<lang>.json`. Inyectado en provideTransloco (app.config.ts).
├── tokens/              → InjectionTokens tipados para configuración inyectable.
│   └── .gitkeep
└── platform/            → Helpers de SSR: wrappers de isPlatformBrowser, guardas para APIs
    ├── hreflang.service.ts → HreflangService: inyecta <link rel="alternate" hreflang="…"> para
    │                         es/ca/en y x-default en <head>. Usa environment.baseUrl. Llamado una
    │                         vez en el constructor de App.
    ├── theme.service.ts   → ThemeService: fuente de verdad del tema (signals, SSR-safe). Estados
    │                         light/dark/system (por defecto system → prefers-color-scheme). Aplica
    │                         `data-theme` en <html> para elecciones manuales, lo elimina en system,
    │                         persiste en localStorage('fv-theme'), reacciona a cambios de
    │                         matchMedia y sincroniza <meta name="theme-color">. Expone mode,
    │                         resolvedTheme, setMode() y toggle().
    ├── theme.service.spec.ts → Tests del ThemeService: default system (device light/dark),
    │                         cambio de dispositivo en runtime, toggle + persistencia, restauración
    │                         tras recarga y elección explícita por encima del dispositivo.
    ├── page-transition.service.ts → PageTransitionService (providedIn: 'root'): escucha los
    │                         eventos del Router (NavigationStart/End/Cancel/Error) y gestiona el
    │                         estado de la barra de progreso (signal<ProgressBarState>: hidden |
    │                         loading | completing). Solo activa 'loading' si la navegación supera
    │                         200 ms; pasa a 'completing' al terminar y vuelve a 'hidden' tras
    │                         500 ms. Instanciado en App para capturar eventos desde el inicio.
    └── page-transition.service.spec.ts → Tests del PageTransitionService.
```

### `src/app/layout/` — Shell de la aplicación

Cargado eagerly. Compone la estructura visual que envuelve todas las rutas.

```
src/app/layout/
├── shell/               → (roadmap) Componente host del <router-outlet> que organizará nav-bar +
│   └── .gitkeep           contenido + footer. Hoy ese papel lo cumple `app.html`; la carpeta es un
│                          placeholder hasta que se implemente.
├── nav-bar/             → Cabecera sticky del sitio (`position: sticky` en `:host`). Logo `assets/branding/festi-val-logo.webp`
│   ├── nav-bar.ts         vía `NgOptimizedImage` (`priority`), navegación principal (Home,
│   ├── nav-bar.html       Festivals, Calendar, Explore, About), icono de búsqueda y toggle de
│   ├── nav-bar.scss       tema (cableado a ThemeService: icono sol/luna, aria-pressed y
│   └── nav-bar.spec.ts    aria-label i18n nav.theme.toDark/toLight; visible también en móvil).
│                          Mobile-first: en <1024 px aparecen logo, búsqueda, toggle de tema y
│                          hamburguesa. aria-current="page" en el enlace activo vía
│                          routerLinkActive. (El selector de idioma ES/CA/EN está en el roadmap
│                          de la fase multilingüe; aún no existe.)
├── nav-progress-bar/    → Indicador de navegación lenta. Solo aparece si la navegación tarda
│   ├── nav-progress-bar.ts    más de 200 ms (lazy chunks no cacheados). Barra de 3 px fija en
│   ├── nav-progress-bar.html  la parte superior (z-index 200, sobre el nav-bar). Gradiente de
│   ├── nav-progress-bar.scss  marca (#4E8CFF → #A855F7 → #FF5A7A → #F59E0B) con glow azul.
│   └── nav-progress-bar.spec.ts  Dos fases CSS: fv-progress-load (llena hasta ~80 %) →
│                          fv-progress-complete (llena a 100 % y se desvanece). Consume
│                          PageTransitionService. Cableado en `app.html`.
└── footer/              → Pie de página premium (superficie clara #F4F4FA). Divisoria superior sutil
    ├── footer.ts          y grid editorial de 4 columnas: marca (logo `NgOptimizedImage` + claim +
    ├── footer.html        iconos sociales monocromos Instagram/X/YouTube/Spotify) y columnas Explora,
    ├── footer.scss        Información y Legal con enlaces `routerLink`. Barra inferior con copyright.
    └── footer.spec.ts     Textos vía `TranslatePipe` (`footer.*`), tokens `--fv-*-footer`.
                           Mobile-first (1→2→4 columnas). Cableado en `app.ts`/`app.html`.
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
├── festival-detail/     → Página de detalle de un festival, cargada vía `/festivales/:slug`.
│   ├── feature/
│   │   ├── festival-detail.page.ts   → Página smart standalone. Inyecta ActivatedRoute para
│   │   │                               leer el slug, ReviewRotationService (stats → hero) y
│   │   │                               FestivalDetailFactsService (facts → strip). Orquesta hero,
│   │   │                               facts, overview y location-map.
│   │   ├── festival-detail.page.html → Hero + facts strip + overview + mapa placeholder.
│   │   ├── festival-detail.page.scss → Layout de la página: espaciado vertical y responsive.
│   │   └── festival-detail.page.spec.ts → Tests: creación, stats al hero, facts strip visible.
│   ├── ui/
│   │   ├── festival-hero/            → Hero split 42/58 dirigido por slug: breadcrumb, título, metadata, CTAs e imagen WebP por festival.
│   │   │   ├── festival-hero.ts         → FestivalHeroComponent (OnPush): `input.required<string>('slug')` + `input<ReviewStats>('stats')`.
│   │   │   │                              Resuelve la entrada del catálogo por slug; copy y URLs vienen
│   │   │   │                              de claves `festival.detail.byFestival.<slug>.*` + catálogo.
│   │   │   ├── festival-hero.html       → Layout slug-driven. Badge de reseñas condicional con `@if (hasStats())`.
│   │   │   ├── festival-hero.scss
│   │   │   └── festival-hero.spec.ts    → Tests: creación, badge oculto sin stats, plural, singular (slug='medusa').
│   │   ├── festival-detail-facts/    → Tira de datos clave (ubicación, género, precio, edad, horario).
│   │   │   ├── festival-detail-facts.ts   → Presentacional (OnPush): `input<FestivalDetailFacts | null>`.
│   │   │   ├── festival-detail-facts.html → 5 cards con iconos Lucide; enlaces oficiales en precio/horario.
│   │   │   ├── festival-detail-facts.scss → Grid responsive 1→2→5 columnas; tokens `--fv-*`.
│   │   │   └── festival-detail-facts.spec.ts
│   │   ├── festival-overview/        → Bloque editorial «Sobre el festival» dirigido por slug + chips de highlights.
│   │   │   ├── festival-overview.ts     → `input.required<string>('slug')`. Construye claves
│   │   │   │                              `festival.detail.byFestival.<slug>.overview.*` (incluye highlights)
│   │   │   │                              y monta `fv-festival-poster-gallery` cuando hay carteles.
│   │   │   ├── festival-overview.html   → Copy editorial + galería de carteles + lista de highlights accesible.
│   │   │   ├── festival-overview.scss
│   │   │   └── festival-overview.spec.ts
│   │   ├── festival-poster-gallery/  → Carrusel continuo de carteles oficiales con ampliación modal y pausa por hover/foco.
│   │   │   ├── festival-poster-gallery.ts   → `input.required<string>('slug')`, signals `isPaused`/`activePoster`,
│   │   │   │                                  cierre por Escape y resolución de carteles desde el catálogo tipado.
│   │   │   ├── festival-poster-gallery.html → Sección condicional con track duplicado para marquee,
│   │   │   │                                  botón por cartel y diálogo accesible para la vista ampliada.
│   │   │   ├── festival-poster-gallery.scss → Layout responsive mobile-first, animación `fv-poster-marquee`,
│   │   │   │                                  fallback de motion y tokens temáticos `--fv-*`.
│   │   │   └── festival-poster-gallery.spec.ts → Tests: render, duplicado del carrusel, pausa/reanudación,
│   │   │                                          apertura/cierre del diálogo y ocultación sin carteles.
│   │   └── festival-location-map/    → Iframe de Google Maps embebido sobre el fondo de la página, centrado en las coordenadas del festival.
│   │       ├── festival-location-map.ts   → `input.required<string>('slug')`. Construye la URL
│   │       │                                `https://maps.google.com/maps?q=lat,lng&output=embed` con
│   │       │                                las coordenadas del catálogo y la pasa por `DomSanitizer`.
│   │       ├── festival-location-map.html → Iframe lazy sin marco (sin border/box-shadow), title i18n.
│   │       ├── festival-location-map.scss
│   │       └── festival-location-map.spec.ts
│   ├── data-access/                  → Servicios y datos del detalle.
│   │   ├── festival-detail-catalogue.ts → Catálogo tipado por slug con claves i18n del hero/overview,
│   │   │                               URLs oficiales/entradas, poster del hero, carteles por jornada
│   │   │                               (`FestivalDetailPoster[]`) y coordenadas para el mapa.
│   │   │                               Expone `findFestivalDetailEntry`, `isFestivalDetailSlug` y
│   │   │                               `FESTIVAL_DETAIL_SLUGS`.
│   │   ├── festival-detail.guard.ts → `festivalDetailGuard` (CanActivateFn). Valida `:slug` contra
│   │   │                               el catálogo; redirige a `/` cuando no existe.
│   │   ├── festival-detail-facts.model.ts → FestivalDetailFactsSchema (Zod) + tipo inferido.
│   │   ├── festival-detail-facts.service.ts → Carga `/festival-detail-{slug}.json?day=YYYY-MM-DD`
│   │   │                               desde `public/`, valida con Zod, refresca a medianoche.
│   │   ├── reviews.data.ts           → Catálogo estático de 60 reseñas originales en español:
│   │   │                               10 por festival × 6 slugs (bigsound, latin-fest, medusa,
│   │   │                               rbf, reve, zevra). Ratings 2–5, texto original. Exporta
│   │   │                               FESTIVAL_REVIEWS (array plano) y REVIEWS_BY_FESTIVAL
│   │   │                               (ReadonlyMap<string, readonly FestivalReview[]>).
│   │   ├── review-rotation.service.ts → ReviewRotationService (providedIn: 'root'): rotación
│   │   │                               diaria determinista de reseñas. getFeaturedReviews(slug,
│   │   │                               date?) devuelve 3 reseñas circulares usando semilla
│   │   │                               (utcDateKey × 1_000_003 + djb2Hash(slug)) >>> 0.
│   │   │                               getStats(slug) calcula media y total. Sin Math.random().
│   │   └── review-rotation.service.spec.ts → 12 tests: determinismo, rotación por festival,
│   │                                          días distintos, estado vacío, stats y wrap circular.
│   └── festival-detail.routes.ts    → Superficie pública. Expone FESTIVAL_DETAIL_ROUTES con
│                                       loadComponent hacia festival-detail.page.
├── home/                → Página de inicio. Muestra festivales destacados, hero con glow
│                          atmosférico, acceso rápido a búsqueda y filtros.
│   ├── feature/
│   │   ├── home.page.ts    → Página de inicio standalone. Orquesta el hero editorial, el calendario
│   │   │                     `festival-calendar`, el carrusel `featured-festivals` y el mapa
│   │   │                     interactivo `home-festival-map`, al que pasa `FESTIVAL_LOCATIONS`
│   │   │                     (de `@shared/data-access`) vía el input `locations`.
│   │   ├── home.page.html  → Hero con CTAs + calendario premium + carrusel de festivales + mapa
│   │   │                     de pines (las secciones secundarias van en @defer).
│   │   ├── home.page.scss  → Layout de la home: espaciado vertical, hero card y responsive.
│   │   └── home.page.spec.ts → Tests del hero, calendario, sección de festivales y sección de mapa.
│   ├── ui/
│   │   ├── festival-calendar/
│   │   │   ├── festival-calendar.ts      → Componente local standalone del calendario editorial:
│   │   │   │                               carrusel auto-rotativo (3 s) con `activeIndex: signal`,
│   │   │   │                               `focusFestival()` para hover sobre días destacados y
│   │   │   │                               `afterNextRender` + `DestroyRef` para SSR-safety.
│   │   │   ├── festival-calendar.html    → Header con título + subtítulo, fila de meses proporcional
│   │   │   │                               (JUNIO/JULIO/AGOSTO 15/31/18), rail gradiente, fila de días
│   │   │   │                               con círculos destacados y 4 cards posicionadas en absoluto
│   │   │   │                               bajo su fecha.
│   │   │   ├── festival-calendar.scss    → Línea temporal horizontal con tokens semánticos, día
│   │   │   │                               destacado decorado con ::before absoluto (no expande el
│   │   │   │                               grid), cards 10rem con fade entre slides y fallback
│   │   │   │                               apilado en tablet/mobile.
│   │   │   └── festival-calendar.spec.ts → Tests de render, índice activo, transición por
│   │   │                                   `focusFestival()` y semántica del autoplay con fake timers.
│   │   ├── featured-festivals/
│   │   │   ├── featured-festivals.ts      → Componente local standalone con datos de festivales
│   │   │   │                                destacados. Importa RouterLink: cada tarjeta enlaza a
│   │   │   │                                `/festivales/:slug`.
│   │   │   ├── featured-festivals.html    → Header "Festivales destacados" y tarjetas `<a>` con imagen,
│   │   │   │                                fecha, nombre y ubicación, con routerLink por festival.
│   │   │   ├── featured-festivals.scss    → Carrusel horizontal sin fondo propio: movimiento continuo
│   │   │   │                                en desktop, avance cada 3 s en móvil y sin lift en hover.
│   │   │   │                                `.featured-festivals__card` como bloque (display: block).
│   │   │   └── featured-festivals.spec.ts → Tests de render y pista duplicada. Usa provideRouter([]).
│   │   └── home-festival-map/
│   │       ├── home-festival-map.ts      → Componente interactivo de pines sobre imagen del mapa
│   │       │                               valenciano. Recibe las localizaciones por
│   │       │                               `input.required('locations')` (ui/ presentacional) y las
│   │       │                               combina con su config local de pines/imágenes en un
│   │       │                               `computed`. Signals para festival activo y panel visible.
│   │       │                               Carrusel automático (setInterval 3 s) con
│   │       │                               afterNextRender + DestroyRef.
│   │       ├── home-festival-map.html    → Figura con imagen + lista de pines accesibles (aria-pressed)
│   │       │                               + panel lateral con tarjeta del festival activo.
│   │       ├── home-festival-map.scss    → Layout grid pane/panel; pines con tono por festival;
│   │       │                               transiciones de tarjeta con blur. Sin tokens violeta.
│   │       └── home-festival-map.spec.ts → Tests de render, pins, festival por defecto, activación
│   │                                      y ciclo automático (vi.useFakeTimers).
│   ├── data-access/
│   │   └── home-catalogue.ts → Catálogo estático de la home: FEATURED_FESTIVALS, CALENDAR_MONTH_SEGMENTS
│   │                           y CALENDAR_FESTIVALS (5 entradas: bigsound, latin-fest-valencia,
│   │                           latin-fest/Benidorm, zevra, medusa). Exporta también los tipos
│   │                           FeaturedFestivalEntry, CalendarMonthData, CalendarFestivalEntry,
│   │                           CalendarTone, CalendarCardAlign. Consumido por featured-festivals
│   │                           y festival-calendar (ui/) para separar datos de presentación.
│   └── home.routes.ts   → Superficie pública de la feature. Expone HOME_ROUTES con loadComponent
```

> `festival-list/`, `artist-detail/`, `search/` y `about/` están en el roadmap del proyecto y todavía no existen en el árbol: se documentarán aquí cuando se creen sus scaffolds.

### `src/app/shared/` — Toolbox horizontal

Código reutilizado por **2 o más features**. Nunca importa de `features/` ni de `layout/`. Un componente empieza en su feature y se promueve a `shared/` cuando una segunda feature lo necesita.

```
src/app/shared/
├── ui/                  → Componentes presentacionales compartidos por ≥ 2 features.
│   └── notification-banner/  → Banner de notificación accesible para mostrar errores al usuario.
│       ├── notification-banner.ts   → NotificationBannerComponent: lee NotificationService (signal),
│       │                              renderiza el banner con role="alert" y aria-live="polite".
│       ├── notification-banner.html → Renderiza el mensaje (i18n key | t) y botón de cierre.
│       └── notification-banner.scss → Tokens semánticos: --fv-accent-danger, focus-ring mixin.
├── data-access/         → Servicios, datos y stores compartidos por ≥ 2 features. Hoy contiene los
│   │                      datos de localización del mapa, el cargador diferido de MapLibre y la capa
│   │                      i18n. Los servicios de catálogo (FestivalService, SearchService, stores…)
│   │                      se añadirán cuando arranque su fase del roadmap.
│   ├── festival-locations.ts → Array readonly de FestivalLocation con los 7 festivales semilla:
│   │                           key (p. ej. `bigsound`, `reve`, `latinValencia`, `medusa`,
│   │                           `zevra`, `rbf`, `latinBenidorm`), claves i18n, startDate ISO,
│   │                           lat/lng, category, markerTone.
│   ├── map-loader.service.ts → MapLoaderService: carga maplibre-gl de forma diferida (dynamic
│   │                            import) para excluirlo del bundle inicial. Expone createMap() y
│   │                            createMarker() tipados.
│   └── i18n/            → Capa i18n con Transloco.
│       ├── translations.ts            → Importa `es.json` vía `@assets/i18n/es.json`. Exporta
│       │                                `ES_TRANSLATIONS`, el tipo `Translations` y el tipo
│       │                                `TranslationKey` (literal union de dotted paths).
│       ├── translation.service.ts     → `TranslationService` (providedIn: 'root'). Inyecta
│       │                                `TranslocoService` de forma opcional: en producción delega
│       │                                en Transloco; en tests (sin Transloco provisto) usa el
│       │                                bundle estático ES_TRANSLATIONS. Expone `t(key)`,
│       │                                `setTranslations()` y la signal `activeLang`.
│       └── translation.service.spec.ts → Specs del servicio.
├── domain/              → Modelos de dominio: interfaces TypeScript + schemas Zod.
│   ├── festival.model.ts          → FestivalSchema (Zod) + tipos inferidos Festival y Artist.
│   │                                Forma canónica del catálogo: slug, nombre, provincia, ciudad,
│   │                                fechaInicio/Fin, generos, cartel, precioDesde, urlOficial,
│   │                                poster, ubicacion. Usado en la frontera HTTP (safeParse).
│   ├── festival-error.model.ts    → FestivalError (extends Error): code FestivalErrorCode,
│   │                                originalError. Método estático fromHttpStatus().
│   └── review.model.ts            → FestivalReviewSchema (Zod) + tipo inferido FestivalReview:
│                                    id, festivalSlug, author, rating (1–5), comment, date ISO,
│                                    verified, source?. Exporta también ReviewStats { averageRating,
│                                    totalCount }.
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
- **Budgets**: inicial ≤ 360 KB warning / 400 KB error; lazy chunks ≤ 80 KB warning / 120 KB error; component styles ≤ 8 KB warning / 12 KB error. (Cifras raw, sin gzip; `angular.json` es la fuente de verdad.)
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

| Fecha      | Cambio                                                  | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-06-14 | Galería de carteles en `festival-detail` (#11)         | Añadida la carpeta `src/app/features/festival-detail/ui/festival-poster-gallery/` con `festival-poster-gallery.{ts,html,scss,spec.ts}`: carrusel continuo de carteles oficiales con pausa por hover/foco, modal ampliada y cierre por Escape/backdrop. `festival-overview.{ts,html}` ahora monta la galería por slug, `festival-detail-catalogue.ts` incorpora la interfaz `FestivalDetailPoster` y la colección `posters` para Medusa, y `src/assets/i18n/{es,ca,en}.json` amplía `festival.detail.byFestival.medusa.overview.posterGallery.*` para títulos, diálogo y etiquetas por jornada. |
| 2026-06-14 | Festival detail: facts, overview y mapa placeholder (#11) | Añadidos `festival-detail-facts` (UI + `FestivalDetailFactsService` con JSON diario en `public/festival-detail-medusa.json` validado por Zod), `festival-overview` (copy editorial + highlights) y `festival-location-map` (placeholder). `festival-detail.page` orquesta las cuatro secciones. Claves `festival.detail.*` en es/ca/en. Ajuste responsive del título en `festival-hero.scss`. |
| 2026-06-14 | Festival detail completamente dirigido por `:slug` | `festival-hero`, `festival-overview` y `festival-location-map` reciben `input.required<string>('slug')` y dejan de estar acoplados a Medusa. Nuevo `data-access/festival-detail-catalogue.ts` con entradas tipadas (claves i18n, URLs oficiales, poster y coordenadas) y `data-access/festival-detail.guard.ts` (CanActivateFn) que valida `:slug` contra el catálogo y redirige a `/` si no existe — cableado en `festival-detail.routes.ts`. `festival-location-map` reemplaza el iframe de Google Maps por una instancia MapLibre GL (lazy via `MapLoaderService`, `environment.maps.styleUrl`, marker DOM con tokens, SSR-safe vía `afterNextRender`, `effect` re-encuadra al cambiar slug y `DestroyRef` limpia). `src/styles/styles.scss` importa `maplibre-gl/dist/maplibre-gl.css`. i18n reorganizada: nuevo bloque `festival.detail.hero.*` (breadcrumb, meta, cta, review), `festival.detail.overview.highlightsAriaLabel`, `festival.detail.locationMap.iframeTitle` y árbol `festival.detail.byFestival.{bigsound, latinFest, medusa, rbf, reve, zevra}.*` con nombre, hero y overview por festival; copy de Medusa preservada. JSON de hechos añadidos en `public/festival-detail-{bigsound,latin-fest,rbf,reve,zevra}.json` para alcanzar los 6 slugs del catálogo. Specs actualizadas con `setInput('slug', 'medusa')`; nuevo test del location-map que oculta la sección con slug desconocido. Parity `npm run i18n:check` OK. |
| 2026-06-14 | Home sin `@defer` en secciones below-fold               | `home.page.html`: retirados los bloques `@defer (on viewport)` de `festival-calendar`, `featured-festivals` y `home-festival-map` (carga eager). `home.page.spec.ts` simplificado: eliminado `DeferBlockBehavior.Manual` y render manual de defer blocks. |
| 2026-06-14 | Fix logo del nav-bar en modo oscuro (SSR + hidratación) | El `@if (isDark())` del template fallaba contra SSR: `ThemeService.#systemDark` defaultea a `false` en el servidor (sin `matchMedia`), así que el HTML SSR enviaba `festi-val-logo.webp` (texto navy) y NgOptimizedImage con `priority` lo comprometía antes de que la hidratación pudiera reevaluar el signal. Cambiado a swap puramente CSS: `nav-bar.html` ahora renderiza ambos `<img>` (`--light` y `--dark`, este último `aria-hidden`), y `nav-bar.scss` los muestra/oculta vía `:host-context([data-theme='dark'])` + `@media (prefers-color-scheme: dark)` con `:host-context(html:not([data-theme]))` para el modo system. Funciona instantáneamente en el primer paint sin depender de la hidratación. Test `nav-bar.spec.ts` actualizado: ahora verifica que ambos `<img>` están en el DOM con sus respectivos `ngSrc` y que el `--dark` lleva `aria-hidden`. |
| 2026-06-14 | `festival-detail`: eliminados scaffolds `lineup-grid` y `venue-map` | Borradas las carpetas `features/festival-detail/ui/{lineup-grid,venue-map}/` (componentes vacíos que solo renderizaban un `<div>` sin contenido). `festival-detail.page.html` queda con un único `<fv-festival-hero [stats]>`; retirados los dos bloques `@defer (on viewport)` y sus placeholders, junto con la regla `.festival-detail-page__placeholder` en `festival-detail.page.scss`. Imports actualizados en `festival-detail.page.ts`. Spec simplificada: ya no necesita `DeferBlockBehavior.Manual`. Cuando se implementen cartel y mapa de recinto se volverán a scaffoldar. |
| 2026-06-14 | Reseñas reducidas al badge del hero | Eliminada la sección `featured-reviews` de `festival-detail/ui/` (componente, template, SCSS y spec) y su `@defer` en `festival-detail.page.html`. `FestivalHeroComponent` pasa a aceptar `input<ReviewStats>('stats')` y renderiza la media (`toLocaleString('es-ES', { minimumFractionDigits: 1 })`) y el contador con plural ES (`reseña`/`reseñas`) mediante `@if (hasStats())`; el badge desaparece cuando no hay datos. `festival-detail.page.ts` simplificado: solo expone `reviewStats` (vía `ReviewRotationService.getStats`) y lo enlaza al hero — `featuredReviews` ya no se calcula. Specs actualizadas: `festival-hero.spec.ts` cubre badge oculto, plural y singular; `festival-detail.page.spec.ts` verifica el cableado del input vía `By.directive`. Claves i18n `festival.reviews.*` retiradas de `es.json`, `ca.json` y `en.json` (parity OK, 5 top-level keys). `ReviewRotationService` y `reviews.data.ts` se conservan: la media y el total se calculan en runtime. |
| 2026-06-14 | Sistema de opiniones con rotación diaria determinista      | Añadidos `shared/domain/review.model.ts` (FestivalReviewSchema Zod + ReviewStats), `festival-detail/data-access/reviews.data.ts` (60 reseñas originales × 6 festivales), `festival-detail/data-access/review-rotation.service.ts` (+ spec, 12 tests: seed djb2 + utcDateKey, 3 reseñas circulares sin Math.random()), y `festival-detail/ui/featured-reviews/` (componente + template + SCSS + spec, 10 tests). Integrado en `festival-detail.page` con `@defer (on viewport)`. Pipe `| t` extendido con `params?: Record<string, unknown>` y helper `interpolate()` en `TranslationService`. Claves `festival.reviews.*` propagadas a es/ca/en. `featured-festivals` ahora enlaza a `/festivales/:slug` vía `RouterLink`. |
| 2026-06-13 | Nav-bar sticky en `:host`                                 | `nav-bar.scss`: `position: sticky`, `top: 0` y `z-index: 50` movidos de `.nav-bar` a `:host` para que el header permanezca fijo al hacer scroll (el sticky en el hijo interno no anclaba correctamente al viewport). |
| 2026-06-13 | Progress bar glow con tokens                              | `nav-progress-bar.scss`: `box-shadow` del glow sustituido por `color-mix` con `--fv-accent-blue` y `--fv-accent-med-blue` (cumple gate B.3 sin colores hardcodeados). |
| 2026-06-13 | Page transition UX (scroll top + fade-in + progress bar) | Añadidos `page-transition.service.ts` (+ spec): estado `hidden/loading/completing`, activación tras 200 ms y auto-limpieza en `NavigationEnd/Cancel/Error`. Cableados `nav-progress-bar` (ts, html, spec). `provideRouter` con `withInMemoryScrolling({ scrollPositionRestoration: 'top' })`. `app.ts` reinicia `fv-page-enter` vía `Renderer2` en cada `NavigationEnd`. Keyframes `fv-page-enter`, `fv-progress-load` y `fv-progress-complete` en `_animations.scss`. `app.html`: `<fv-nav-progress-bar />` y `#mainEl`. |
| 2026-06-13 | Medusa Festival hero (`festival-detail`)                  | Implementado `fv-festival-hero` con layout split 42/58: breadcrumb, título display Sora con letter-spacing en "FESTIVAL", metadata (ubicación, fecha, rating, guardar) y dos CTAs. Imagen `hero-medusa-festival-2026.webp` en `src/assets/images/festivals/medusa/`. Spec con `provideRouter([])`. Iconos Lucide + `NgOptimizedImage`. |
| 2026-06-10 | Eliminación de `festivales-map` y ajuste de nav-bar     | Borrada la feature `src/app/features/festivales-map/` completa (page, ui, data-access, routes). Eliminada la ruta `/mapa` de `app.routes.ts`. Nav-bar actualizada: retirado el link "Mapa", añadido "Inicio" (`/`, exact match). Claves huérfanas `nav.map` y `nav.cta` eliminadas de `es.json`, `ca.json` y `en.json`. Tests de `nav-bar.spec.ts` actualizados para reflejar los nuevos links. |
| 2026-06-10 | Comando `/merge-to-develop`                             | Añadidos `.claude/commands/merge-to-develop.md` y espejo en `.codex/commands/`. El comando, invocado desde cualquier rama, valida el árbol limpio, ejecuta el gate (lint + tests), pide confirmación, actualiza develop desde origin, fusiona con `--no-ff`, resuelve conflictos (con reglas por área de código), ejecuta el gate en develop, empuja a origin y restaura la rama original. Nunca toca `main`. Complemento inverso de `/update-branches-from-develop`. |
| 2026-06-10 | Auditoría completa: limpieza y optimización             | Eliminado `src/.DS_Store` (archivo de sistema no versionable ya cubierto por `.gitignore`). Corregido `focus-ring` double-nesting en 7 localizaciones SCSS (notification-banner, home.page, featured-festivals, home-festival-map ×2, festivales-map ×4). Retirado `@keyframes fv-featured-marquee` duplicado de `_animations.scss` (el componente `featured-festivals` define su propia versión correcta). Tokens `--fv-radius-1`/`--fv-radius-2` en `_liquid-glass.scss` reemplazados por `--fv-radius-sm`/`--fv-radius-lg`. Eliminada declaración redundante `standalone: true` en 4 componentes (`festival-calendar`, `featured-festivals`, `home-festival-map`, `notification-banner`) — Angular 19+ la asume por defecto. Hover guard añadido al marcador del mapa en `festivales-map.scss`. Traducidas las secciones `home.calendar` y `footer` de `ca.json` y `en.json` que contenían texto en español. |
| 2026-06-10 | Skill `light-dark-mode`                                 | Creada `.claude/skills/light-dark-mode/SKILL.md` (espejo en `.codex/skills/`): gate obligatorio para que cualquier UI nueva se adapte a los temas claro/oscuro/sistema vía tokens semánticos (`--fv-bg-page`, `--fv-bg-card-light`, `--fv-text-nav`…), sin overrides `[data-theme]` en componentes. Incluye árbol de decisión, checklist, ejemplos y validación visual. Registrada en `CLAUDE.md`, `AGENTS.md`, agente `vistas` y skill `theming-styling`. |
| 2026-06-10 | Sistema de temas (light / dark / system)                | Creado `src/app/core/platform/theme.service.ts` (+ `theme.service.spec.ts`): servicio Signals SSR-safe que gestiona `light/dark/system` (por defecto system → `prefers-color-scheme`), aplica `data-theme` en `<html>`, persiste en `localStorage('fv-theme')`, reacciona a `matchMedia` y sincroniza `<meta name="theme-color">`. Nuevo bloque de tema oscuro en `_semantic.scss` (mixin `fv-theme-dark` aplicado en `:root[data-theme="dark"]` y en `@media (prefers-color-scheme: dark)` sin `data-theme`) que redefine solo los tokens de chrome (page/nav/footer/card-light/tile-dark, textos y bordes) reutilizando primitivos; el tema claro queda intacto. Script inline anti-parpadeo en `index.html`. Botón existente de la nav-bar cableado a `ThemeService` (icono sol/luna, `aria-pressed`, `aria-label` i18n `nav.theme.toDark`/`toLight`, visible también en móvil); `app.ts` instancia el servicio. Restructurada la clave i18n `nav.theme` a objeto `{ toDark, toLight }` en es/ca/en. Nuevo asset `src/assets/branding/festi-val-logo-dark.webp` (logo con letras blancas) conmutado por CSS según `data-theme` para que la marca sea legible en oscuro. Contrato actualizado: skill `theming-styling` (regla #7 + sección "Theme switching") y descripción en `AGENTS.md`/`CLAUDE.md`. |
| 2026-06-10 | Footer premium del shell                                | Implementado `src/app/layout/footer/` (`footer.{ts,html,scss,spec.ts}`), sustituyendo el placeholder `.gitkeep`. Pie editorial sobre superficie clara `#F4F4FA` con divisoria superior sutil y grid de 4 columnas: marca (logo `NgOptimizedImage` + claim + iconos sociales monocromos Instagram/X/YouTube/Spotify) y columnas Explora / Información / Legal con `routerLink`; barra inferior con copyright. Nuevos tokens semánticos `--fv-bg-footer`, `--fv-bg-footer-hover`, `--fv-text-footer`, `--fv-text-footer-muted`, `--fv-text-footer-faint` y `--fv-border-footer` en `_semantic.scss`. Claves i18n `footer.*` en `es.json`. Cableado `<fv-footer />` en `app.html`/`app.ts`. Mobile-first (1 → 2 → 4 columnas). |
| 2026-06-10 | Auditoría `/audit-structure`: realineación estructura ↔ docs | `shared/ui/festivales-map/` movido a `features/festivales-map/ui/festivales-map/` (un único consumidor; la promoción a shared exige ≥ 2). Creados `features/festivales-map/data-access/.gitkeep` y `shared/ui/.gitkeep`. `home-festival-map` ahora recibe las localizaciones por `input.required('locations')` desde `home.page` (ui/ presentacional). `aria-label` de la home pasa por i18n (`home.ariaLabel` en es/ca/en). Eliminado el directorio vacío `output/`. Documentación sincronizada: budgets reales de `angular.json` (360/400, 80/120, 8/12 KB) aquí y en `CLAUDE.md`, ruta `/mapa` añadida al esquema de URLs de `CLAUDE.md`, tabla de aliases y entry SCSS corregidos en la skill `project-structure` (.claude y .codex), retiradas las menciones a `setLang()`/selector de idioma y los `.gitkeep` fantasma, y backlog actualizado con MiniSearch y Sentry pendientes. |
| 2026-06-08 | Refactor `festival-calendar` y limpieza de scaffolds    | `src/app/features/home/ui/festival-calendar/` rediseñado: retirada del icono del header, fila de meses proporcional (15/31/18 días), rail gradiente con tokens `--fv-accent-*`, círculos de día destacados como pseudo-elementos absolutos (no expanden el grid), y carrusel auto-rotativo (3 s) con `(mouseenter)` sobre los días destacados para enfocar uno concreto y reanudar. Nuevo token semántico `--fv-bg-tile-dark` en `src/styles/_semantic.scss`. Tests del carrusel añadidos con `vi.useFakeTimers`. Eliminados los scaffolds vacíos `features/{about,artist-detail,festival-detail,festival-list,search}/` y el `.gitkeep` redundante en `shared/domain/` para alinear el árbol con el código realmente implementado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-06-08 | Sección `festival-calendar` en home                     | Añadida `src/app/features/home/ui/festival-calendar/` con `festival-calendar.{ts,html,scss,spec.ts}` para insertar entre el hero y `featured-festivals` una sección editorial de calendario premium: filtros por mes, timeline interactivo, mini-cards glass y barra de estadísticas. `home.page.*` actualizado para montarla en un nuevo bloque `@defer`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-06-04 | Skill `asset-organization`                              | Añadidas `.codex/skills/asset-organization/README.md` y `.claude/skills/asset-organization/README.md` como fuente de verdad para las reglas de gestión de assets visuales. Actualizadas las listas de skills en ambos contratos y esta documentación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-06-04 | Ordenación de `images/`                                 | Reubicados los assets de la home en `src/assets/images/backgrounds/` y `src/assets/images-src/backgrounds/` para cumplir la skill `asset-organization`. Actualizadas sus referencias en la feature `home` y esta documentación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-06-04 | Home mínima con card de imagen                          | Añadidos `src/app/features/home/feature/home.page.{ts,html,scss,spec.ts}`, `src/app/features/home/home.routes.ts`, cableada la ruta raíz en `src/app/app.routes.ts` y añadidos los assets `src/assets/images-src/backgrounds/home-hero-sunset-beach.jpg` + `src/assets/images/backgrounds/home-hero-sunset-beach-{800,1200,1600}.webp`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-06-04 | Rename `.codex/prompts/` → `.codex/commands/`           | Renombrada la carpeta de comandos de Codex y actualizadas sus referencias en `AGENTS.md` y esta documentación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-06-04 | Nueva carpeta `design/`                                 | Carpeta creada en la raíz del proyecto para almacenar mockups, paletas de color, ideas e inspiraciones de diseño.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-06-04 | Reubicación `.claude`                                   | Movido `CLAUDE.md` a `.claude/` y `autocommit.md` a `.claude/commands/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2026-06-04 | Nueva carpeta `branding/`                               | Creada `src/assets/branding/` para los assets base de la marca.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-06-04 | Fuentes en `design/font/`                               | Añadidos archivos fuente Inter, Sora, JetBrains Mono y Space Grotesk.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-06-04 | Font system completo                                    | Añadido `public/fonts/` (variable fonts self-hosted), `src/styles/_fonts.scss` (reglas @font-face, tokens CSS, clases utilitarias), `src/styles/styles.scss` (reubicado desde `src/`), `shared/util/font/` (getFont, tipos), `shared/pipes/font.pipe.ts` (pipe fvFont), `shared/directives/font.directive.ts` (directiva fvFont). Actualizado `angular.json` con nueva ruta de estilos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-06-04 | Comando `audit-structure`                               | Añadido `.claude/commands/audit-structure.md`: auditoría automatizada de arquitectura, estructura, design system y compliance de skills.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 2026-06-04 | Reconciliación del contrato visual                      | `CLAUDE.md`, `theming-styling` skill, `vistas` agent y `README.md` consolidados: paleta navy/violet/blue premium, fuente display **Sora**, namespace de tokens **`--fv-*`**. Eliminado Space Grotesk del design system.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-06-04 | Rename `design/palettle/` → `design/palette/`           | Corrección del nombre de carpeta.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-06-04 | Limpieza de bloat en `design/font/`                     | Eliminadas las subcarpetas `*/static/` (instancias estáticas nunca servidas) y `design/font/Space_Grotesk/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-04 | Eliminadas carpetas placeholder                         | `sanity/` y `scripts/` borradas hasta que arranquen sus fases. Quedan documentadas como reintroducción futura.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-06-04 | Limpieza `assets/icons/`                                | Eliminados `logo-icon.svg` y `main-logo.svg` duplicados de `assets/branding/`. La carpeta queda reservada para iconos adicionales a Lucide.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-06-04 | `index.html` localizado                                 | `lang="es-ES"`, título `festiVAL`, meta theme-color, favicon SVG enlazado.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-06-04 | Reset del placeholder Angular                           | `src/app/app.html` reducido a `<router-outlet />`. `app.ts` migrado a OnPush sin `title` signal. `app.spec.ts` ahora verifica el outlet en vez del título.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-06-04 | Registro de locale `es-ES`                              | `src/app/app.config.ts` registra `LOCALE_ID: 'es-ES'` y `registerLocaleData(localeEs)` conforme a CLAUDE.md.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-04 | Eliminación de la abstracción de fuentes                | Borrados `shared/util/font/` (incluido el barrel `index.ts`), `shared/directives/font.directive.ts` y `shared/pipes/font.pipe.ts`. La selección de fuente se hace directamente con `var(--fv-font-*)` o las clases utilitarias `.fv-font-*` de `_fonts.scss`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-06-04 | Sistema de tokens completo                              | Añadidos partials `_tokens`, `_semantic`, `_typography`, `_spacing`, `_radii`, `_shadows`, `_motion`, `_breakpoints`, `_mixins`, `_animations`, `_reset` en `src/styles/`. `styles.scss` los compone en orden de dependencia. `_fonts.scss` purgado del duplicado `--fv-font-mono`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-04 | Stack canónico instalado (baseline MVP)                 | Añadidas dependencias `zod`, `date-fns`, `@sanity/client` y `eslint-plugin-boundaries`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-06-04 | ESLint boundaries activado                              | `eslint-plugin-boundaries` configurado en `eslint.config.js`. Forzadas las reglas duras de `project-structure` (aislamiento de features, sólo `<feature>.routes.ts` como surface pública).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-06-04 | `tsconfig` paths                                        | Eliminado el alias `@styles/*` (sin uso; el namespace SCSS se resuelve por `includePaths`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-06-04 | README reescrito                                        | `README.md` alineado con la arquitectura feature-sliced real, el stack canónico de `CLAUDE.md` y el roadmap por fases.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-04 | Rebranding `festiVal` → `festiVAL`                      | Renombrada la marca en todo el proyecto: copy en `.claude/`, `docs/`, `README.md`, `src/index.html` (título), cabeceras SCSS, identificador del proyecto Angular (`angular.json`) y script `serve:ssr:festiVAL` en `package.json`. El paquete npm sigue siendo `festi-val` (npm exige kebab-case minúsculas).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-06-04 | Cabecera estática                                       | Añadido `src/app/layout/nav-bar/` (`nav-bar.{ts,html,scss,spec.ts}`) con la cabecera estática del brief: logo `assets/branding/festi-val-logo.webp` vía `NgOptimizedImage`, navegación, búsqueda y toggle de tema. Cableado en `app.ts`/`app.html`; `app.scss` fija el fondo sand de la página. Paleta Mediterránea (sand #F8F5F0, navy #0F172A) scopeada al componente — pendiente de promover a `_tokens.scss`/`_semantic.scss` si se confirma el pivote de identidad visual.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-06-04 | Assets runtime                                          | `src/assets/branding/festi-val-logo.webp` copiado desde `design/logo/`. `angular.json` ahora sirve `src/assets/` bajo `/assets/` (el bloque sólo exponía `public/`, dejando los SVG de marca inalcanzables en runtime).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-06-04 | Limpieza branding                                       | Renombrado `logo1.webp` a `festi-val-logo.webp` para cumplir la convención de naming de assets y eliminadas las variantes no usadas `main-logo.svg` y `logo-icon.svg` de `src/assets/branding/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-06-04 | Nuevo material en `design/mockups/`                     | Añadidos `Gemini_Generated_Image_l8rwoql8rwoql8rw.png` e `image.png` como referencias visuales para iteraciones de interfaz.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-06 | Hero editorial e i18n base                              | Añadidos `src/assets/i18n/ca.json` y `src/assets/i18n/en.json` para mantener paridad de claves con `es.json`. La home deja de ser una superficie sólo visual y consume el copy de `home.hero.*` desde los JSON de locales, manteniendo los CTA como botones estáticos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-06 | Revocada la fila "Locales europeos por país"            | La fila previa afirmaba que se habían añadido 45 archivos de locale por país en `src/assets/i18n/`. Esos archivos nunca llegaron a un commit y se eliminaron del working tree para respetar la skill `i18n-commit-policy` (modo desarrollo edita sólo `es.json`; la propagación a los locales soportados ocurre durante un commit con su Translation Report). El estado real del directorio es: `es.json` (fuente), `ca.json`, `en.json`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-06-06 | Skill `design-responsive-validation`                    | Añadidas `.claude/skills/design-responsive-validation/README.md` y `.codex/skills/design-responsive-validation/README.md` como fuente de verdad para la identidad visual no genérica y la validación responsive obligatoria (desktop / laptop / tablet / mobile 320 px). Cada tarea de UI debe terminar con un Design & Responsive Validation Report. Listadas en `CLAUDE.md`, `AGENTS.md` y esta documentación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-06-06 | Skill `i18n-commit-policy`                              | Añadidas `.claude/skills/i18n-commit-policy/README.md` y `.codex/skills/i18n-commit-policy/README.md`. Política: durante el desarrollo sólo se edita `src/assets/i18n/es.json`; al preparar un commit se propagan las claves modificadas a los 44 locales europeos soportados (matriz país → BCP-47 incluida en la skill), se valida la paridad JSON y se emite un i18n Commit Translation Report antes de `git commit`. Listada en `CLAUDE.md`, `AGENTS.md` y esta documentación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-06-06 | Entornos baseline                                       | Eliminado `src/environments/.gitkeep`; creados `src/environments/environment.ts` y `environment.prod.ts` con `production`, `defaultLocale: 'es-ES'` y bloque `sanity` (projectId, dataset, apiVersion, useCdn). Cierra la deuda señalada en auditorías previas: las URL base, flags y endpoints viven aquí, nunca hardcodeados en servicios.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-06 | Alias `@assets/*`                                       | Añadido al `tsconfig.json` (`@assets/*: ["src/assets/*"]`) y registrado en `eslint.config.js` como elemento `asset` de `eslint-plugin-boundaries` (sólo `shared` puede importar de `asset`; `asset` se autoreferencia). Resuelve la regla "path aliases always" para los JSON de i18n.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-06 | Capa i18n MVP en `@shared`                              | Añadidos `src/app/shared/data-access/i18n/translations.ts` (importa `es.json` vía el alias nuevo `@assets/*`, expone `ES_TRANSLATIONS` y el tipo `TranslationKey` con paths punteados), `translation.service.ts` (Signals: `t(key)` resuelve dotted paths con fallback) y sus specs. Añadido `src/app/shared/pipes/translate.pipe.ts` (`{{ 'nav.home' \| t }}`) standalone y puro. Añadida la clave `nav.aria.primary` en `es.json`, `ca.json`, `en.json` para mantener paridad. Eliminados los `.gitkeep` de `shared/data-access/` y `shared/pipes/`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-06 | Nav-bar con Router + i18n                               | `src/app/layout/nav-bar/nav-bar.ts` ahora importa `RouterLink` y `TranslatePipe`. `nav-bar.html` reemplaza `href="#"` y los hrefs absolutos por `routerLink` (`/`, `/festivales`, `/calendario`, `/explorar`, `/sobre-nosotros`); los 5 textos de las links y los aria-labels de las 3 acciones se resuelven con la pipe (`nav.home`, `nav.festivals`, …, `nav.aria.primary`). `nav-bar.spec.ts` provee router e inspecciona los labels traducidos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-06 | Token `--fv-blur-glass`                                 | Añadido a `_semantic.scss` como custom property bajo la sección "Effects". Consumido por el botón secundario del hero (`backdrop-filter: blur(var(--fv-blur-glass))`) y disponible para futuros componentes glass. Anotados como deliberados los literales magic-number residuales del hero (`aspect-ratio: 4/5.2`, `line-height: 1.08`, `translateY(-2px)`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-06-06 | Limpieza stack                                          | Eliminada la dependencia huérfana `lucide` de `package.json` (sin consumidores). El paquete activo es `@lucide/angular` — la tabla de stack canónico de `CLAUDE.md` y `AGENTS.md` actualizada para reflejar el nombre real.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-06-06 | Nueva carpeta `tasks/`                                  | Creada `/tasks/` como fuente única de verdad para planificación. Añadidos `ROADMAP.md` (roadmap por fases), `BACKLOG.md` (backlog priorizado), `IN_PROGRESS.md` (trabajo activo), `COMPLETED.md` (archivo de items completados). Removido el roadmap inline de `README.md` y reemplazado por referencia a `tasks/ROADMAP.md`. Actualizada esta documentación.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-06-06 | Carrusel local `featured-festivals` en home             | Añadida la carpeta `src/app/features/home/ui/featured-festivals/` con `featured-festivals.{ts,html,scss,spec.ts}`. `home.page.*` mantiene el hero superior y monta debajo una sección de festivales destacados con tarjetas de imagen: carrusel sin fondo propio, sin CTA "Ver todos", movimiento continuo en desktop, avance cada 5 s en móvil y sin desplazamiento de tarjeta en hover. `src/assets/i18n/{es,ca,en}.json` amplía `home.featured.*` para el copy de la sección y las cuatro tarjetas.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-06-06 | Nuevo material en `design/info-festivales/`             | Añadida la carpeta `design/info-festivales/` con material gráfico de referencia para BIGSOUND, Latin Fest, Medusa, RBF, REVE Fest y Zevra: logos, carteles, creatividades por días y piezas de artistas destacados.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 2026-06-06 | Cartel Valencia de Latin Fest                           | Añadido `design/info-festivales/latin/latin-cartel-valencia.webp` como cartel específico de Valencia para el material gráfico de referencia de Latin Fest.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-06-07 | Assets de festivales reales en `src/assets/`            | Creadas las carpetas `src/assets/images/festivals/<slug>/` (6 festivales: bigsound, latin-fest, medusa, rbf, reve, zevra) con logos servibles, y `src/assets/images-src/festivals/<slug>/` con carteles fuente (PNG/JPEG/JXL, nunca servidos). El carrusel `featured-festivals` actualizado: 6 festivales reales (Bigsound, Latin Fest, Medusa, RBF, Reve, Zevra), logos con `object-fit: contain`, keyframe `fv-featured-marquee` añadido, animación mobile recalibrada para 6 items. Claves i18n `home.featured.cards.*` reemplazadas en `es.json`, `ca.json` y `en.json`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-07 | Conversión de logos a WebP en `src/assets/images/`      | Convertidos a WebP los logos de festivales y patrocinadores en `src/assets/images/festivals/` y `src/assets/images/sponsors/`, eliminando los archivos PNG/JPEG originales de runtime. Actualizado `featured-festivals` para consumir los nuevos `.webp`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| 2026-06-07 | Integración Transloco + hreflang + script de merge      | **Step 1 — Transloco**: instalado `@jsverse/transloco@8.x`; añadido `src/app/core/initializers/transloco.loader.ts` (TranslocoHttpLoader); `app.config.ts` ampliado con `provideHttpClient(withFetch())`, `provideTransloco` (es/ca/en, fallback es) y `APP_INITIALIZER` que precarga 'es'; `TranslationService` refactorizado para inyectar `TranslocoService` de forma opcional (tests usan el fallback estático); `TranslatePipe` cambiado a `pure: false` y lee la signal `activeLang`; `NavBar` expone selector ES/CA/EN con `TranslationService.setLang()`; añadida clave `nav.langSwitcher` en los 3 JSON. **Step 2 — script de merge**: creada carpeta `scripts/` con `i18n-sync.mjs`; añadidos scripts `i18n:sync` e `i18n:check` a `package.json`. **Step 3 — hreflang**: añadido `baseUrl` a `Environment` y a ambos `environment.ts`; creado `src/app/core/platform/hreflang.service.ts`; `App` inyecta el servicio en su constructor.                                                                                                                                                                                                                                                                                                                                                              |
| 2026-06-07 | Correcciones auditoría (health 88 → 100)                | Eliminado `src/app/core/platform/.gitkeep` (redundante junto a `hreflang.service.ts`). `app.config.ts`: `prodMode` cambiado de literal `false` a `environment.production`. `app.scss`: `72px` extraído a `--app-nav-height`. `home.page.scss`: `4rem` extraído a `--home-cta-min-height`; `1.125rem` extraído a `--home-btn-icon-size`. `featured-festivals.scss`: `1.875rem` extraído a `--featured-date-badge-height`; `line-height: 1.1` sustituido por `var(--fv-leading-display)`. `home.page.html`: `<fv-featured-festivals>` envuelto en `@defer (on viewport)`. `home.page.spec.ts`: actualizado a `DeferBlockBehavior.Manual` y `getDeferBlocks()`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-06-07 | Auditoría `.claude` — alineación contrato↔código        | **Skill `i18n-commit-policy`** (`.claude` + `.codex`): reescrita la matriz de locales fantasma (44 países europeos) a la real `es`/`ca`/`en` (+ roadmap `ca-ES-valencia`/`en-GB`); corregida la referencia al script inexistente `validate-i18n-parity.mjs` → `scripts/i18n-sync.mjs` (`npm run i18n:sync` / `i18n:check`). **Catálogo real** propagado a `CLAUDE.md`, `AGENTS.md`, agentes `contenido`/`sistemas`/`prueba` y skill `state-management`: festivales ficticios (FIB, Arenal Sound, Low, SanSan) → reales (Bigsound, Latin Fest, Medusa, RBF, Reve, Zevra); `README.md` § Descripción actualizado. **Phasing Transloco** aclarado en ambos contratos (infraestructura ya en MVP). **Dead code/assets**: eliminado `TranslationService.setLang()` (sin consumidores tras revert del lang switcher), clave i18n huérfana `nav.langSwitcher` en `es/ca/en.json`, y los dos logos no usados de `src/assets/images/sponsors/` (carpeta eliminada). Limpieza de ficheros `.DS_Store`.                                                                                                                                                                                                                                                                                                                    |
| 2026-06-07 | Image loader para la hero (`ngSrcset` real)             | `app.config.ts`: añadido `IMAGE_LOADER` (`festivalImageLoader`) con reescritura de ancho **opt-in** vía `loaderParams.variants`; solo la hero (que tiene las variantes `home-hero-sunset-beach-{800,1200,1600}.webp`) lo solicita, de modo que `ngSrcset` resuelve a los ficheros reales. Los logos de festival (fuente única, p. ej. `logo-medusa-2026.webp`) se devuelven intactos → sin 404. `home.page.html`: la hero añade `[loaderParams]="{ variants: true }"`. Resuelve el aviso de NgOptimizedImage por `ngSrcset` sin loader y activa el servido responsive del elemento LCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-06-07 | Reorganización `skills/` al estilo Agent Skill (Google) | Las 18 skills de `.claude/skills/` (y su espejo `.codex/skills/`) pasan de `README.md` a **`SKILL.md`** con **frontmatter** `name` + `description` (ahora son Agent Skills descubribles), spine consistente y footer `## Related skills`. Disclosure progresivo: contenido pesado extraído a `references/` en las 4 grandes — `project-structure/references/eslint-boundaries.md`, `theming-styling/references/tokens.md`, `testing-patterns/references/examples.md`, `performance-optimization/references/image-converter.md`. Nueva skill **`sanity-cms`** (hueco real: el CMS Sanity está en el stack). Corregida la contradicción residual "44 locales europeos" en `CLAUDE.md`/`AGENTS.md` → `ca`/`en`. Referencias `skills/*/README.md` → `SKILL.md` en ambos contratos; `sanity-cms` añadida a las listas de skills y al comando `audit-structure`. Paridad `.claude`↔`.codex` verificada (`diff -rq`).                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-06-08 | Autoplay carrusel en `home-festival-map`                | Añadido ciclo automático de pines cada 3 s con setInterval, afterNextRender y DestroyRef. Tests con vi.useFakeTimers. |
| 2026-06-09 | Skill Liquid Glass + tokens + utilidades SCSS          | Creado skill `liquid-glass` en `.claude/skills/` y `.codex/skills/` (`SKILL.md`). Añadidos tokens semánticos `--fv-glass-*` en `_semantic.scss`. Creada `src/styles/utilities/_liquid-glass.scss` con mixin y clases `.glass-*`. Importada en `styles.scss`. |
| 2026-06-09 | Auditoría: doc-sync, coords RBF y test del mapa compartido | **Doc-sync**: el árbol de `features/` deja de listar los scaffolds inexistentes (`festival-list`, `festival-detail`, `artist-detail`, `search`, `about`) — ahora documentados como roadmap; `festivales-map` pasa a `7 festivales semilla`; el árbol de assets incorpora `images/maps/` e `images-src/maps/`; la descripción de `shared/data-access/` refleja solo los ficheros existentes. **Bug de datos**: corregidas las coordenadas de `rbf` en `festival-locations.ts` (apuntaban a ~Elche/Alacant; restauradas a Benidorm, distintas de `latinBenidorm`). **Tests**: añadido `shared/ui/festivales-map/festivales-map.spec.ts` (sidebar con 7 festivales, ambas ediciones de Latin Fest, orden y toggle; `MapLoaderService` mockeado). |
| 2026-06-09 | Añadidos Latin Fest Valencia y Latin Fest Benidorm    | `shared/data-access/festival-locations.ts` ampliado con `latinValencia` y `latinBenidorm` (lat/lng, startDate, keys i18n y markerTone). `home-festival-map` refactorizado para exponer pines separados y localizar festivales vía `locateFestival()`. Actualizados `home-festival-map.{ts,scss,spec.ts}`, `shared/ui/festivales-map/festivales-map.scss` y claves i18n (`src/assets/i18n/{es,ca,en}.json`). Tests y estilos adaptados; `docs/documentacion.md` actualizado en el mismo commit. |
| 2026-06-08 | Componente `home-festival-map` + limpieza de paleta     | Añadida `src/app/features/home/ui/home-festival-map/` con `home-festival-map.{ts,html,scss,spec.ts}`: mapa interactivo de pines sobre imagen de la Comunitat Valenciana, signals para festival activo/bloqueado y panel lateral con tarjeta del festival. `home.page.*` integra el componente en segundo `@defer (on viewport)`. Assets del mapa: `src/assets/images/maps/` (valencia-map.webp, valencia-community-map-gradient*.webp) y `src/assets/images-src/maps/`. **Paleta mediterránea consolidada**: eliminados `$fv-violet-*`de`\_tokens.scss`y`--fv-accent-violet`/`--fv-accent-violet-soft`de`\_semantic.scss`; expuestos `--fv-accent-med-blue`, `--fv-accent-coral`, `--fv-accent-orange`; `--fv-shadow-focus`apunta a`--fv-accent-blue`; `--fv-shadow-glow-violet`renombrado a`--fv-shadow-glow-blue`. Eliminadas referencias a `--fv-accent-violet`en`festivales-map.page.scss`, `festivales-map.scss`(×5) y`featured-festivals.scss`. Eliminados `.gitkeep`redundantes de`core/handlers/`, `core/interceptors/`y`assets/maps/`. Skill `theming-styling` actualizada: identidad mediterránea, par por defecto blue+coral.                                                                                                                                                                        |
| 2026-06-07 | Correcciones auditoría (health 66 → 90)                 | **Dominio**: creados `shared/domain/festival.model.ts` (FestivalSchema Zod + tipos Festival/Artist) y `festival-error.model.ts` (FestivalError, FestivalErrorCode, fromHttpStatus). **Error handling**: añadidos `core/handlers/festival-error.handler.ts` (FestivalErrorHandler, provisto en app.config) y `core/interceptors/error.interceptor.ts` (errorInterceptor funcional). `app.config.ts`: ErrorHandler → FestivalErrorHandler, `withInterceptors([errorInterceptor])`. **Feature mapa**: creada `features/festivales-map/` completa: `festivales-map.page.{ts,html,scss}`, `festivales-map.routes.ts` (FESTIVALES_MAP_ROUTES), ruta `/mapa` añadida a `app.routes.ts`. **Shared map**: creados `shared/ui/festivales-map/festivales-map.{ts,html,scss}` (FestivalesMapComponent, MapLibre GL JS lazy-loaded, sidebar ordenable, SSR-safe). **Data**: `shared/data-access/festival-locations.ts` (FESTIVAL_LOCATIONS readonly) y `map-loader.service.ts` (MapLoaderService). **Entornos**: bloque `maps` (styleUrl, center, zoom) añadido a ambos `environment*.ts`. `maplibre-gl` instalado. **Assets**: `src/assets/maps/festival-dark.json` placeholder para Protomaps. **Nits**: comentario "5s → 3s" en `featured-festivals.scss`; excepción arquitectónica documentada en `transloco.loader.ts`. |
| 2026-06-09 | Etiquetas callout en pines del mapa                     | Añadidas etiquetas de nombre (`pin-callout`) a los pines del mapa interactivo `home-festival-map` para identificar festivales sin interacción. Nuevas propiedades `mapLabel`, `labelOffsetX`, `labelOffsetY` en `HomeMapFestival`. Estilos de posicionamiento con offsets por festival para evitar colisiones. Tests de etiquetas y asignación de offsets. Actualizados `home-festival-map.{ts,html,scss,spec.ts}`. |
| 2026-06-10 | Sistema de gestión de tareas en `tasks/` (workflow por tarea) | Reemplazada la planificación previa por un workflow por tarea. **Añadidos**: `tasks/README.md` (workflow GitHub Project → Issue → `current-task.md` → desarrollo → autocommit → PR → review → done, ciclo de vida y convenciones), `tasks/templates/task-template.md` (plantilla canónica: título, issue, descripción, requisitos, criterios de aceptación, ficheros afectados, checklist de progreso, estado, notas y completion summary), `tasks/current-task.md` (tarea activa única, con un ejemplo seed de integración de MiniSearch) y las carpetas `tasks/backlog/` y `tasks/completed/` (cada una con `.gitkeep`). Añadida la sección "Active task workflow (MANDATORY)" a `.claude/CLAUDE.md` y `.codex/AGENTS.md` (leer `tasks/current-task.md` primero, no salir del alcance, mantener checklist/estado, commits vía `commands/autocommit.md`, cierre y reset del fichero). No duplica los gates ni la política i18n: los referencia desde `autocommit.md`. **Eliminados**: los docs de planificación antiguos `tasks/ROADMAP.md`, `tasks/BACKLOG.md`, `tasks/IN_PROGRESS.md` y `tasks/COMPLETED.md` (superados por el nuevo sistema); actualizada la referencia del roadmap en `README.md` a `tasks/README.md`. |
| 2026-06-10 | Validación del workflow de tareas (Issue #11)           | Prueba end-to-end del sistema de tareas: `tasks/current-task.md` poblado desde el Issue #11 ("Prueba") y añadido `tasks/test-workflow.md` (marcador no funcional, temporal). Sin cambios de desarrollo ni en `src/`. |
| 2026-06-10 | Comando `new-task`                                      | Añadido `.claude/commands/new-task.md` (pregunta el nº de issue, lo lee, rechaza si no existe y puebla `tasks/current-task.md` desde la plantilla con `Status: In Progress`). Integrado con el sistema de tareas; no duplica ni elude las reglas de `autocommit.md`. |
| 2026-06-10 | Referencia de issue integrada en `autocommit`           | Eliminado `.claude/commands/commit-task.md`; su comportamiento se integra en `autocommit.md` (`.claude` y `.codex`): el paso 2 pasa de "detectar issue key" a **preguntar los números de issue de forma repetida hasta que el usuario introduce `0`** y añadir las referencias `(#n)` / `(#n, #m)` al resumen de cada commit. Formato y ejemplos de commit actualizados al estilo sufijo `(#n)` (antes prefijo `<issue-key>:`). README actualizado. |
| 2026-06-10 | Eliminación del sistema `tasks/` y `/new-task`          | Eliminada la carpeta `tasks/` (README, current-task, backlog, completed, templates, test-workflow) y el comando `.claude/commands/new-task.md`. Retirada la sección "Active task workflow" de `CLAUDE.md` y `AGENTS.md`. `README.md` simplificado a flujo Issue → desarrollo → `/autocommit` → PR. Actualizado el árbol raíz y la sección de commands en esta documentación. |
| 2026-06-10 | Simplificación de `/autocommit`                         | `autocommit.md` (`.claude` y `.codex`): eliminada la pregunta por nombre de tarea y la separación de cambios por tarea; ahora solo pregunta el nº de issue de GitHub (repetido hasta `0`) y agrupa commits por propósito semántico. Actualizados `docs/documentacion.md` y `tasks/README.md`. |
| 2026-06-10 | Separación de commits por tarea (nombre de tarea)       | `/new-task` pasa a preguntar también el **nombre de la tarea** (slug) además del nº de issue, y lo guarda en `tasks/current-task.md` (fila "Task name" añadida a `tasks/templates/task-template.md`, usada como `Task ID` y scope por defecto). `autocommit.md` (`.claude` y `.codex`) paso 2 actualizado: pregunta **pares nombre-de-tarea + nº de issue** hasta `0` y usa el nombre para **separar los cambios por tarea y crear un commit por tarea** (permite commitear varias tareas a la vez), atribuyendo ficheros vía _Files Expected To Change_. Corregidas las referencias obsoletas a `/commit-task` en `new-task.md`. README actualizado. |
| 2026-06-10 | Comando `/update-branches-from-develop`                 | Añadidos `scripts/update-branches-from-develop.sh`, `.claude/commands/update-branches-from-develop.md` y espejo en `.codex/commands/`. Fusiona `develop` en cada rama remota (excluye main/develop/HEAD), empuja a origin, aborta en conflictos y restaura la rama original. Script npm `branches:update-from-develop`. Documentado en `docs/documentacion.md` y `AGENTS.md`. |
| 2026-06-10 | Resolución de conflictos en `/update-branches-from-develop` | Script: en conflicto sale con exit `2`, lista ficheros en conflicto y deja el merge activo (sin `merge --abort`). Comando (`.claude` y `.codex`): bucle hasta exit `0`, reglas de resolución por tipo de fichero y checklist post-resolución para el agente. Actualizada la descripción del script en esta documentación. |
| 2026-06-10 | Comando `new-branch` (Issue #6)                          | Añadidos `.claude/commands/new-branch.md` y `.codex/commands/new-branch.md`: comando que pregunta el nombre de rama, lo normaliza (tipo/slug), actualiza la base desde `main` con `--ff-only` y hace checkout de la nueva rama. Sin cambios en `src/`. |
| 2026-06-10 | Comando `/merge-develop-into-branches` (variante simple) | Añadidos `scripts/merge-develop-into-branches.sh`, `.claude/commands/merge-develop-into-branches.md` y espejo en `.codex/commands/`. Fusión directa de `develop` en ramas remotas (sin informe ni exit `2` para agente). Script npm `branches:merge-develop-into-all`. Distinto de `/update-branches-from-develop`. |
| 2026-06-10 | `/merge-develop-into-branches` solo en Codex | Eliminado `.claude/commands/merge-develop-into-branches.md`; el comando queda únicamente en `.codex/commands/` (Codex/AGENTS.md). Script y npm sin cambios. |
| 2026-06-10 | Fix brillo en bordes de tarjetas home (modo oscuro) | `festival-calendar.scss` y `home-festival-map.scss`: sustituidas sombras y bordes basados en `--fv-text-nav` (que invertían a claro en dark mode) por `--fv-shadow-card` y `--fv-border-nav`. Elimina el halo brillante alrededor de las tarjetas del calendario y del mapa interactivo. |
| 2026-06-12 | Comando `/new-branch`: base `develop` en lugar de `main` | Actualizados `.claude/commands/new-branch.md` y `.codex/commands/new-branch.md`: la rama por defecto pasa a ser `develop` (`git switch develop && git pull --ff-only origin develop`). Referencias cruzadas en `merge-to-develop`, `update-branches-from-develop` y `merge-develop-into-branches` alineadas. |
| 2026-06-12 | Skill `angular-developer` (Google Angular Team) integrada | Movida la skill oficial `angular-developer` de `.agents/skills/` a `.claude/skills/` y `.codex/skills/`. Eliminada `.agents/` por completo (no es leída por Claude Code ni Codex). Adaptaciones al contrato del proyecto: `tailwind-css.md` eliminado (Tailwind fuera de scope), `e2e-testing.md` reescrito para Playwright (en vez de Cypress/DevTools), gate de build actualizado a `npm run lint && npm test -- --run`, referencia a Tailwind CSS eliminada del `SKILL.md` en ambas carpetas. `angular-new-app` descartada (irrelevante para proyecto existente). |
| 2026-06-10 | Auditoría `/audit-structure`: health score 75 → 100 | **Error handling completo**: creado `core/notifications/notification.service.ts` (signal `AppNotification|null`, `show()`/`dismiss()`); `festival-error.handler.ts` actualizado (inyecta `NotificationService`, llama `Sentry.captureException` en producción, mapea `FestivalErrorCode` a claves i18n `error.*`); `app.config.ts` inicializa Sentry con `environment.sentry.dsn`; bloque `sentry: { dsn }` añadido a ambos `environment*.ts`. **Shell**: creado `shared/ui/notification-banner/` (`NotificationBannerComponent`), cableado en `app.ts`/`app.html`. **i18n**: claves `error.network/notFound/unknown/dismiss` añadidas a `es.json`, `ca.json` y `en.json`. **Datos en data-access**: creado `features/home/data-access/home-catalogue.ts` (extrae `FEATURED_FESTIVALS`, `CALENDAR_MONTH_SEGMENTS`, `CALENDAR_FESTIVALS` y sus tipos de los componentes `ui/`); `featured-festivals.ts` y `festival-calendar.ts` actualizados para importar desde `data-access/`. **SCSS (hover guards)**: `nav-bar.scss` y `festivales-map.scss` envuelven sus `:hover` en `@media (hover: hover) and (pointer: fine)`. **SCSS (font-size tokens)**: `festival-calendar.scss` extrae 5 tamaños literales a custom properties en `:host`; `home-festival-map.scss` extrae `10px`/`9px` a `:host`. **Limpieza**: eliminados los `.gitkeep` redundantes de `features/home/data-access/` y `shared/ui/` (ambos reemplazados por ficheros reales). |
| 2026-06-12 | Carteles WebP + script `images:convert` | Añadido `scripts/convert-images.mjs` (Sharp + djxl para JXL) y `npm run images:convert`. Generados 12 carteles `.webp` en `src/assets/images/festivals/` desde `images-src/` (bigsound, latin-fest, medusa, reve, zevra). DevDependency `sharp@^0.34`. |
| 2026-06-12 | Scaffold `festival-detail` (boilerplate Angular) | Creada la feature `src/app/features/festival-detail/` completa: `festival-detail.routes.ts` (FESTIVAL_DETAIL_ROUTES, loadComponent), `feature/festival-detail.page.{ts,html,scss,spec.ts}` (página smart que lee el slug de ActivatedRoute, orquesta los tres componentes ui/ en @defer), `ui/festival-hero/`, `ui/lineup-grid/` y `ui/venue-map/` (componentes dumb con boilerplate mínimo: TS, HTML, SCSS, spec). La ruta `/festivales/:slug` registrada en `app.routes.ts` con `loadChildren`. `data-access/` reservada con `.gitkeep` para el store y resolver futuros. |
| 2026-06-12 | Auditoría `/audit-structure`: re-extracción del calendario a data-access | Tras el merge a `develop`, `festival-calendar.ts` había vuelto a tener los datos inline (regresión de la extracción del 2026-06-10) y `home-catalogue.ts` quedaba con `CALENDAR_FESTIVALS`/`CALENDAR_MONTH_SEGMENTS` huérfanos y **datos obsoletos** (un solo `latin-fest` en día 17). Corregido: `CALENDAR_FESTIVALS` actualizado al modelo de 5 entradas (`bigsound`, `latin-fest-valencia` 17–18 jul, `latin-fest`/Benidorm 4–5 jul, `zevra`, `medusa`); `festival-calendar.ts` re-cableado para importar `CALENDAR_FESTIVALS`/`CALENDAR_MONTH_SEGMENTS` y sus tipos desde `data-access/`, eliminando arrays y tipos inline duplicados. Sin cambios en i18n (claves ya presentes). |
