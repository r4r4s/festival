# ✅ Completado

Archivo de elementos terminados, fases completadas y funcionalidades entregadas.

---

## Fase 1: MVP informativo (base)

### Funcionalidades completadas

- ✅ **Andamiaje del proyecto** — Angular 21 standalone, arquitectura feature-sliced y límites de ESLint.
  - Commit: [`87da017`](https://github.com/R4r4s/festiVAL/commit/87da017)
  - Completado: 2026-06-06

- ✅ **Sistema de diseño** — Tokens (primitivas SCSS + propiedades personalizadas CSS), tema oscuro, tipografía, espaciado, sombras y animaciones.
  - Commits: Rama de funcionalidad fusionada en develop.
  - Completado: 2026-06-04

- ✅ **Página de inicio** — Imagen hero, destacados de festivales y llamadas a la acción.
  - Commits: Trabajo de varias funcionalidades.
  - Completado: 2026-06-04

- ✅ **Barra de navegación** — Cabecera fija con logo, enlaces de menú (Inicio, Festivales, Calendario, Explorar, Acerca de), icono de búsqueda y selector de tema.
  - Commit: Rama de funcionalidad fusionada.
  - Completado: 2026-06-04

- ✅ **Catálogo de festivales** — Esquema Zod, estructura de datos y 6+ festivales iniciales en mock/código fijo.
  - Completado: 2026-06-04

- ✅ **i18n MVP** — TranslationService + pipe de traducción, `es.json` como fuente y `ca.json` y `en.json` con paridad.
  - Commits: Rama de funcionalidad.
  - Completado: 2026-06-06

- ✅ **Andamiaje de rutas** — Rutas de la aplicación, features cargadas de forma diferida y placeholders de route guards.
  - Completado: 2026-06-04

### En progreso / Aún no iniciado

- ⏳ **Búsqueda** — Integración de MiniSearch, coincidencia difusa y boosts por campo.
- ⏳ **Filtros** — Componentes de UI para provincia, mes, género y rango de precios.
- ⏳ **Página de detalle de festival** — Fichas individuales de festivales con mapa y cartel completo.
- ⏳ **SSR + prerenderizado** — Configuración de Angular Universal y prerender de rutas estáticas.
- ⏳ **Integración con el CMS de Sanity** — Sustituir los datos hardcoded por un catálogo en vivo de Sanity.

---

## T2 2026

### Hitos completados

- 2026-06-04: Sistema de diseño finalizado, sistema de tokens en marcha.
- 2026-06-04: Nav-bar con selector de tema e integración con router.
- 2026-06-06: i18n MVP con pipe de traducción y archivos de locales.

---

## Calidad continua

- ✅ **Revisiones de código** — Todas las PR se revisan antes de fusionar.
- ✅ **Puerta de pruebas** — Lint pre-commit + tests unitarios obligatorios.
- ✅ **Documentación** — La documentación de arquitectura se mantiene sincronizada con el código.

---

## Cronograma de lanzamientos

| Versión | Fecha | Destacados |
| --- | --- | --- |
| 0.1.0 (MVP) | Por definir | Catálogo de festivales, búsqueda, filtros y páginas de detalle |
| 0.2.0 (Personalización) | Por definir | Favoritos, PWA y persistencia del tema |
| 0.3.0 (Cuentas) | Por definir | Registro, inicio de sesión, valoraciones y comentarios |
| 0.4.0 (Integraciones) | Por definir | Spotify, ticketing y calendario |
| 1.0.0 (i18n) | Por definir | Soporte completo para valenciano e inglés, hreflang |

---

## Notas

- **Cadencia**: Los elementos pasan de `IN_PROGRESS.md` a `COMPLETED.md` al final del sprint o al fusionarse en main.
- **Retención**: Los elementos completados permanecen aquí 2–3 sprints (referencia histórica) y después se archivan en el historial de git.
- **Enlaces**: Todos los elementos incluyen enlaces a commits o PR para trazabilidad.

---

## Última actualización

2026-06-06
