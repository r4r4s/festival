# 🗺️ Roadmap

Hoja de ruta del proyecto **festiVAL**. Organizada por fases de implementación, con prioridades y seguimiento de dependencias.

---

## 1. MVP informativo

**Estado**: Fase central del MVP. Base para todas las fases posteriores.

- Catálogo de festivales — Modelo de datos completo con slug, nombre, géneros, precios y cartel.
- Búsqueda — Búsqueda difusa del lado del cliente (MiniSearch) por nombre del festival y cabezas de cartel.
- Filtros — Provincia, mes, género y rango de precios. Estado persistente mediante signals.
- Páginas de detalle de festival — Fichas individuales con mapa, cartel completo y enlaces oficiales.
- Sin autenticación — Portal de información pública; el inicio de sesión se difiere a la Fase 3.

**Criterios de aceptación**:
- Los 6+ festivales del catálogo inicial son localizables y buscables.
- Las páginas de detalle se renderizan correctamente en móvil (320 px), tablet (768 px) y escritorio (1024+ px).
- SSR prerenderiza todas las rutas críticas para SEO (`/`, `/festivales`, `/festivales/:slug`).
- LCP < 2,5 s y CLS < 0,1 en Core Web Vitals.

---

## 2. Personalización

**Estado**: En la hoja de ruta. Depende de completar la Fase 1.

- Favoritos persistentes — `idb-keyval` para almacenamiento de marcadores con capacidad offline.
- Modo oscuro avanzado — Selector de tema con persistencia en `localStorage`. El modo claro queda fuera de alcance (solo dark premium en la Fase 2).
- PWA instalable — `@angular/service-worker` con fallback offline y prompt de instalación.

**Criterios de aceptación**:
- Los favoritos persisten entre sesiones y dispositivos (vía IDB).
- El selector de tema funciona en todas las rutas sin recargar la página.
- La PWA se instala en Android e iOS; navegación offline de rutas en caché.

---

## 3. Cuentas de usuario

**Estado**: En la hoja de ruta. Depende de la Fase 1 + Fase 2.

- Registro — Alta con email/contraseña y verificación de correo.
- Inicio de sesión — Gestión de sesiones mediante Supabase Auth o Better Auth.
- Valoraciones — Valoraciones de festivales y artistas (1–5 estrellas, persistentes por usuario).
- Comentarios — Comentarios de usuarios en páginas de festivales y artistas (moderación en la hoja de ruta).

**Decisiones aplazadas**:
- Backend de autenticación: Supabase Auth vs. Better Auth vs. solución propia. Evaluar al iniciar la Fase 3.
- Herramientas de moderación: revisión manual frente a señales automáticas. Se deja para más adelante.

---

## 4. Integraciones

**Estado**: En la hoja de ruta. Depende de completar la Fase 1.

- Previsualizaciones de artistas en Spotify — Escuchar las mejores pistas de los cabezas de cartel directamente desde el detalle del festival.
- Integraciones de ticketing — Integración directa por API con Dice y Ticketmaster para precios y enlaces en vivo.
- Calendario anual interactivo — Descubrir festivales por mes; sincronización con Google Calendar / Outlook.

**Decisiones aplazadas**:
- Spotify: flujo OAuth para listas de reproducción del usuario frente a previsualizaciones anónimas.
- Ticketing: modelo de ingresos por afiliación por definir.

---

## 5. Internacionalización

**Estado**: En la hoja de ruta. Puede ejecutarse en paralelo con la Fase 2 o 3.

- `ca-ES-valencia` (valenciano) — Traducción completa + formato de fechas/precios sensible al locale.
- `en-GB` (inglés) — Traducción completa + implementación correcta de `hreflang` para SEO.
- `hreflang` y URLs canónicas — Enlaces `rel` adecuados para indexación multilingüe.

**Restricciones**:
- No usar Localize (`@angular/localize`); usar **Transloco** o un MVP propio con Signals.
- Script de merge: propaga los cambios de `es.json` a los 44 locales europeos soportados en el momento del commit (skill: `i18n-commit-policy`).
- Esquema de URL: los slugs se mantienen en español (`/festivales/fib-benicassim`); el prefijo de ruta es opcional (`/es/`, `/ca/`, `/en/`) o también puede usarse subdominio (`es.festivalapp.com`). La decisión queda pendiente para el inicio de la Fase 5.

**Criterios de aceptación**:
- Paridad del 100% de claves entre `es.json`, `ca.json` y `en.json`.
- Todas las fechas se formatean por locale (por ejemplo, "12 – 16 jul 2026" en es, "12 – 16 Jul 2026" en en).
- Enlaces `hreflang` en `<head>` para los tres idiomas en cada ruta.

---

## Arquitectura y operaciones (en curso)

- **Theming y sistema de diseño** — Superficie dark premium (navy `#0F172A` + degradado violeta/azul), tipografía display Sora y namespace de tokens `--fv-*`. Ver [`theming-styling` skill](./.claude/skills/theming-styling/README.md).
- **Objetivos de rendimiento** — LCP ≤ 2,5 s, CLS ≤ 0,1, TTI ≤ 3,5 s. Presupuesto del bundle: inicial ≤ 250 KB gzipped, chunks lazy ≤ 80 KB.
- **SEO y metadatos** — Esquema JSON-LD `Event`, Open Graph, título/descripción por ruta, sitemap, `robots.txt` y redirecciones 301 al renombrar slugs.
- **Gestión de errores** — `FestivalError` normalizado, integración con Sentry y mensajes al usuario vía i18n.
- **Pruebas** — Tests unitarios con Vitest, tests de componentes con Angular Testing Library, E2E con Playwright (en la hoja de ruta) y auditorías de accesibilidad con `axe-core`.

---

## Fuera de alcance (decisiones explícitas)

Las siguientes tecnologías y patrones están **explícitamente fuera de alcance** según el contrato del proyecto. Cualquier propuesta para añadirlos debe justificarse frente al stack canónico:

- Build: Nx/Turborepo (no hace falta un monorepo).
- CSS: Tailwind, Material/PrimeNG, Bootstrap (usar tokens SCSS + componentes propios en su lugar).
- Búsqueda: Algolia, Typesense (MiniSearch del lado cliente es suficiente para el MVP).
- Backend: GraphQL, Redis, acceso directo a base de datos (DTO HTTP + validación Zod).
- Pagos: Stripe (integraciones de ticketing solo vía Dice/Ticketmaster).
- Hosting: failover multirregión y edge compute más allá de Cloudflare Workers (los isolates V8 de Workers encajan en el límite free de 1 MB).

---

## Seguimiento y actualizaciones

- **Última actualización**: 2026-06-06
- **Responsable**: agente `contenido` (narrativa de la hoja de ruta), agente `rendimiento` (hitos de SEO/rendimiento) y agente `sistemas` (decisiones de arquitectura).
- **Proceso**: Cada fase se abre en un ciclo separado de tarea/PR. Los bloqueos y aprendizajes se registran en mensajes de commit y en discusiones de issues.
