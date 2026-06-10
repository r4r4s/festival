# 🎵 festiVAL

> Tu portal de los principales festivales de música de la Comunidad Valenciana.

---

## 📖 Descripción

**festiVAL** es una aplicación web desarrollada con **Angular 21 + SSR** que reúne, en un único lugar, la información esencial sobre los festivales de música más importantes de la Comunidad Valenciana (España). Desde Bigsound hasta Latin Fest, pasando por Medusa, Reggaeton Beach Festival, Reve o Zevra, festiVAL está pensada para que melómanos, festivaleros y curiosos puedan descubrir, comparar y planificar su próxima experiencia musical en tierras valencianas.

La aplicación funciona como un portal informativo: muestra fechas, ubicaciones, géneros musicales, cartel de artistas, precios orientativos y enlaces oficiales para que el usuario tome la mejor decisión antes de comprar su entrada. Su interfaz, completamente en **español (es-ES)**, ha sido diseñada con un enfoque moderno y mobile-first sobre una superficie premium oscura.

---

## ✨ Características

- 🎪 **Catálogo de festivales** — Todos los principales eventos de Valencia, Alicante y Castellón.
- 📄 **Páginas de detalle** — Ficha individual con cartel completo, datos del recinto y enlaces oficiales.
- 🔍 **Búsqueda fuzzy** — Buscador rápido por nombre de festival o artista (MiniSearch, client-side).
- 🎚️ **Filtros** — Filtra por provincia, mes, género musical o rango de precios.
- 📍 **Mapas** — Ubicación de cada recinto con MapLibre GL JS + Protomaps.
- 📱 **Responsive** — Experiencia optimizada para móvil, tablet y escritorio.
- ⚡ **SSR + prerenderizado** — Rutas SEO-críticas servidas pre-renderizadas para mejor LCP y SEO.

---

## 🛠️ Tech Stack

Las decisiones canónicas viven en [`.claude/CLAUDE.md`](.claude/CLAUDE.md). Resumen:

| Capa             | Tecnología                            |
| ---------------- | ------------------------------------- |
| Framework        | Angular 21 (standalone, Signals, SSR) |
| Lenguaje         | TypeScript 5.x (strict)               |
| Estilos          | SCSS + design tokens (`--fv-*`)       |
| Iconos           | Lucide (`lucide-angular`)             |
| Fechas           | date-fns + `locale/es`                |
| Validación       | Zod (en frontera HTTP)                |
| Mapas            | MapLibre GL JS + Protomaps            |
| Búsqueda         | MiniSearch                            |
| CMS              | Sanity (headless)                     |
| Hosting          | Cloudflare Pages + Workers            |
| Analítica        | Cloudflare Web Analytics              |
| Errores          | Sentry                                |
| Tests            | Vitest, Angular Testing Library, Playwright (E2E roadmap) |

Quedan **fuera de scope** por decisión arquitectónica: Tailwind, Material/PrimeNG, Algolia/Typesense, GraphQL, Redis, Stripe, Nx/Turborepo.

---

## 🚀 Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) ≥ 20
- npm 11+
- [Git](https://git-scm.com/)

### Pasos

```bash
git clone https://github.com/R4r4s/festiVAL.git
cd festiVAL
npm install
npm start
```

La aplicación arranca en [http://localhost:4200](http://localhost:4200) y se recarga automáticamente al detectar cambios.

---

## 📜 Scripts disponibles

| Comando                       | Descripción                                              |
| ----------------------------- | -------------------------------------------------------- |
| `npm start`                   | Servidor de desarrollo en `http://localhost:4200`        |
| `npm run build`               | Build de producción en `dist/`                           |
| `npm test`                    | Tests unitarios (Vitest)                                 |
| `npm run lint`                | Linter (ESLint + Angular ESLint + boundaries)            |
| `npm run watch`               | Build en modo desarrollo con observación de cambios      |
| `npm run serve:ssr:festiVAL`  | Sirve el build SSR (Express, puerto 4000)                |

---

## 📁 Estructura del proyecto

Arquitectura **feature-sliced** con boundaries forzados por ESLint. El detalle completo vive en [`.claude/skills/project-structure/README.md`](.claude/skills/project-structure/README.md). Resumen:

```
src/app/
├── core/        # singletons cross-cutting (interceptores, ErrorHandler, initializers, SSR helpers)
├── layout/      # shell de la app (shell, nav-bar, footer), cargado eagerly
├── features/    # vertical slices, cada una un chunk lazy
│   └── <feature>/
│       ├── feature/        # página smart vinculada a la ruta
│       ├── ui/             # componentes presentacionales locales
│       ├── data-access/    # stores, servicios HTTP, resolvers, schemas Zod
│       └── <feature>.routes.ts   # ÚNICA superficie pública de la feature
└── shared/      # reutilizable entre ≥ 2 features; nunca importa de una feature
    ├── ui/ data-access/ domain/ pipes/ directives/ util/ testing/
```

Reglas duras (forzadas por `eslint-plugin-boundaries`):

- Una feature **nunca** importa de otra feature.
- `shared/` nunca importa de `features/` ni de `layout/`.
- La única superficie pública de una feature es su `<feature>.routes.ts`.
- No hay barrel files (`index.ts`), no hay NgModules, todo es standalone.

El catálogo completo de carpetas y ficheros se mantiene en [`docs/documentacion.md`](docs/documentacion.md).

---

## 🗺️ Planificación y tareas

El trabajo se organiza con un **workflow por tarea** en [`tasks/`](tasks/): hay una sola tarea activa a la vez en `tasks/current-task.md`, las pendientes se encolan en `tasks/backlog/` y las terminadas se archivan en `tasks/completed/`. Toda tarea parte de la plantilla `tasks/templates/task-template.md`.

### Flujo

```
GitHub Project → GitHub Issue → tasks/current-task.md → Desarrollo
      → Auto Commit → Pull Request → Review → Done
```

1. **Issue** — cada tarea se ancla a un GitHub Issue (descripción y criterios de aceptación).
2. **current-task.md** — se crea la tarea activa desde la plantilla; define el **alcance** (el trabajo no se sale de ahí).
3. **Desarrollo** — se implementa actualizando el _Progress Checklist_ y el _Status_ (`In Progress` → `In Review` → `Done`).
4. **Commit** — siempre vía el workflow de autocommit, que aplica los gates obligatorios (lint+test, auditoría 100/100, paridad i18n, regla de documentación).
5. **PR → Review → Done** — al cumplir todos los criterios se escribe el _Completion Summary_, se mueve el fichero a `tasks/completed/` y se reinicia `current-task.md`.

Detalle completo del ciclo de vida y convenciones en [`tasks/README.md`](tasks/README.md).

### Comandos de tarea (Claude Code)

- **`/new-task`** — pregunta el **número de GitHub Issue** y el **nombre de la tarea** (slug), lee el issue (rechaza si no existe) y puebla `tasks/current-task.md` desde la plantilla con `Status: In Progress`. El nombre es la clave que usa `/autocommit` para separar el trabajo.
- **`/autocommit`** — workflow de commits semánticos. Antes de commitear pregunta de forma repetida **el nombre de la tarea y su número de issue** (**introduce `0` para terminar**); con esos pares **separa los cambios por tarea y crea un commit por tarea** (permitiendo commitear varias tareas a la vez), añade la referencia `(#n)` al mensaje (p. ej. `feat(search-minisearch): Add fuzzy search (#23)`) y pasa los gates obligatorios (lint+test, auditoría 100/100, paridad i18n, doc-sync) antes de cada commit.

Las reglas de commit viven en [`.claude/commands/autocommit.md`](.claude/commands/autocommit.md) y no se duplican en otros sitios.

---

## 🤖 Desarrollo asistido por IA

Este proyecto está preparado para colaboración con **Codex** y **Claude Code**.

Regla de uso:

- Cuando trabajes con **Codex**, usa la carpeta `.codex/`.
- Cuando trabajes con **Claude Code**, usa la carpeta `.claude/`.

Configuración de Claude Code:

- `.claude/CLAUDE.md` — contrato del proyecto.
- `.claude/agents/` — agentes especializados (sistemas, vistas, contenido, prueba, rendimiento).
- `.claude/skills/` — patrones reutilizables (project-structure, theming-styling, api-integration, …).
- `.claude/commands/` — workflows automatizados (`/audit-structure`, `/autocommit`, `/new-task`).

Configuración de Codex:

- `.codex/AGENTS.md` — contrato del proyecto para Codex.
- `.codex/agents/` — agentes especializados para Codex.
- `.codex/skills/` — patrones reutilizables para Codex.
- `.codex/commands/` — workflows automatizados para Codex.

Antes de cualquier modificación es **obligatorio** leer `CLAUDE.md` y los skills aplicables al área tocada.

---

## 👤 Autor

Proyecto desarrollado por **Rares Ngheru**.

- ✉️ Email: [rngheru@gmail.com](mailto:rngheru@gmail.com)
- 🐙 GitHub: [@R4r4s](https://github.com/R4r4s)
