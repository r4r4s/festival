# 📋 Backlog

Lista priorizada de mejoras no críticas, refactorizaciones y mejoras de usabilidad para futuros sprints.

---

## Prioridad alta

### Stack MVP pendiente (gap con la tabla canónica de CLAUDE.md)
- [ ] Integrar **MiniSearch** — búsqueda fuzzy client-side con boosts en `nombre` y `cabezasDeCartel` (skill `search`). Declarado en la tabla MVP pero aún sin dependencia ni código.
- [ ] Integrar **Sentry** — completar el `TODO` de `src/app/core/handlers/festival-error.handler.ts`: añadir `@sentry/angular` y reportar errores en producción (skill `error-handling`). Declarado en la tabla MVP.

### Rendimiento
- [ ] Auditoría de optimización de imágenes — Perfilar el bundle, medir el LCP por ruta e identificar oportunidades de carga diferida.
- [ ] Revisión de CSS-in-JS — Asegurar que no haya inyección de estilos en tiempo de ejecución; todos los estilos deben ser SCSS estático.
- [ ] Estrategia de caché del service worker — Definir políticas `stale-while-revalidate` frente a `network-first` por ruta.

### Pruebas
- [ ] Suite de pruebas E2E (Playwright) — Flujos principales de usuario: buscar, filtrar, navegar al detalle y abrir el mapa.
- [ ] Auditoría de accesibilidad con `axe-core` — Verificar cumplimiento WCAG 2.1 AA en todas las páginas.
- [ ] Tests de snapshots de componentes — Asegurar la detección de regresiones visuales.

### Experiencia de desarrollo
- [ ] Configuración de Storybook (opcional) — Documentar variantes e interacciones de componentes.
- [ ] Husky + lint-staged — Imponer linting en pre-commit sin bloquear la ejecución completa de lint.
- [ ] Pipeline CI/CD (GitHub Actions) — Ejecutar lint + test en PR y desplegar a staging al fusionar en develop.

---

## Prioridad media

### Funcionalidades
- [ ] Herramienta de comparación de festivales — Comparación lado a lado de 2–3 festivales.
- [ ] Funciones para compartir — "Compartir festival" vía redes sociales y generación de un enlace resumen del festival.
- [ ] Visualización de valoraciones de usuarios — Mostrar valoraciones agregadas de festivales (bloqueado por la Fase 3).
- [ ] Perfiles de artistas — Páginas dedicadas a artistas con discografía, próximos festivales y enlaces.

### UI/UX
- [ ] Estados de carga — Skeletons, placeholders y streaming guiado por Suspense.
- [ ] Estados vacíos — Mensajes adaptados para sin resultados de búsqueda, sin favoritos, etc.
- [ ] Límites de error — Recuperación elegante ante fallos HTTP y timeouts.
- [ ] Animaciones — Animaciones de entrada (fade-up, slide-in) y microinteracciones (ripples, focus rings).

### Infraestructura
- [ ] Integración con Sentry — Monitorización y alertas de errores en producción.
- [ ] Panel de analíticas — Seguir recorridos de usuario, patrones de búsqueda y distribución geográfica.
- [ ] Cloudflare Workers — Implementar cabeceras de caché, cabeceras de seguridad y limitación de peticiones.

---

## Prioridad baja

### Deseable
- [ ] Auditoría de variables CSS para modo oscuro — Asegurar que todos los colores usen tokens y no haya valores hardcoded.
- [ ] Subconjunto de fuentes — Reducir Inter, Sora y JetBrains Mono a los rangos de caracteres usados.
- [ ] Manifest y prompt de instalación — Personalizar el diálogo de instalación PWA, nombre de la app e icono.
- [ ] Imágenes Open Graph — Generar automáticamente imágenes OG por festival (dinámico vía Canvas o Cloudinary).

### Documentación
- [ ] Referencia de API — Documentación de los esquemas del CMS de Sanity.
- [ ] Guía de la librería de componentes — Guía viva con variantes y ejemplos de estados.
- [ ] Guías de migración — Documentar cambios rompientes y rutas de actualización.

---

## Deuda técnica

### Refactorización
- [ ] Revisar los límites feature-sliced — Asegurar que no se estén colando importaciones entre features.
- [ ] Consolidar la nomenclatura de tokens — Auditar propiedades personalizadas huérfanas o renombradas.
- [ ] Simplificación de servicios — Dividir servicios grandes en unidades de responsabilidad única.

### Dependencias
- [ ] Auditar dependencias transitivas — Revisar vulnerabilidades de seguridad y paquetes sin uso.
- [ ] Actualizar reglas de Angular ESLint — Mantenerse al día con las recomendaciones de v21+.
- [ ] Revisar esquemas Zod — Asegurar que la validación en runtime coincide con la inferencia de TypeScript.

---

## Bloqueado / En espera

(Elementos pendientes de decisiones, bloqueos externos o dependencias de fase)

- [ ] Esquema del CMS de Sanity — Bloqueado hasta la finalización del modelo de contenido.
- [ ] UX de autenticación — Bloqueado hasta el inicio de la Fase 3 (decisión del backend de autenticación).
- [ ] Integración de la API de ticketing — Bloqueado por el acuerdo de colaboración entre Dice/Ticketmaster.

---

## Notas

- **Esfuerzo estimado**: Los elementos de prioridad alta requieren 1–3 ciclos de sprint cada uno. Los de prioridad media requieren 3–8 ciclos. La prioridad baja es deseable, pero no bloquea una release.
- **Responsabilidad**: El backlog lo mantiene el equipo y se revisa en la planificación de sprint. Los elementos individuales los asumen **prueba** (testing), **vistas** (UI), **sistemas** (arquitectura), **rendimiento** (performance) o **contenido** (editorial).
- **Última actualización**: 2026-06-06
