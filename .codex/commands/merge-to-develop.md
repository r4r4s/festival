# Merge Current Branch to Develop

Fusiona la rama actual en `develop` de forma segura: valida el árbol de trabajo,
ejecuta el gate, resuelve conflictos si los hay y deja `develop` limpio y empujado.

Nunca toca `main`. Siempre vuelve a la rama original al terminar.

## Goal

Con un solo comando, promover los commits de la rama activa a `develop` sin romper
el contrato de calidad del proyecto (lint + tests + i18n).

---

## Steps

### 1. Leer la rama actual

```bash
git rev-parse --abbrev-ref HEAD
```

- Si la rama es `main` → **detener**. `main` no se mezcla por aquí.
- Si la rama ya es `develop` → informar al usuario y detener.
- Si la rama es `HEAD` en modo detached → detener y pedir que se haga checkout.

Guardar el nombre: `ORIGIN_BRANCH`.

---

### 2. Verificar árbol de trabajo limpio

```bash
git status --porcelain
```

Si hay cambios sin commitear:

1. Informar qué ficheros están pendientes.
2. Preguntar: **¿quieres commitearlos ahora con `/autocommit` o hacer stash?**
3. **No continuar** hasta que el árbol esté limpio.
   - Si el usuario pide stash: `git stash push -u -m "merge-to-develop pre-stash"`.
   - Si el usuario pide commit: invocar `/autocommit` y esperar.
4. Volver a verificar `git status --porcelain`. Detener si sigue sucio.

---

### 3. Ejecutar el pre-commit gate en la rama actual

```bash
npm run lint && npm test -- --run
```

Si alguno falla:

- Mostrar el error completo.
- **No continuar hasta que el gate esté verde.**
- El usuario debe corregir el fallo en `ORIGIN_BRANCH` y volver a invocar el comando.

Si la rama no toca `src/` (solo docs, assets, commands…), el gate se puede saltar
con aviso explícito.

---

### 4. Confirmar la operación

Mostrar un resumen antes de actuar:

```
¿Confirmas la siguiente operación?

  Rama origen : <ORIGIN_BRANCH>
  Destino     : develop
  Tipo        : merge --no-ff

Continúa con "sí" / "si" / "s" / "y" / "yes".
```

Esperar respuesta. Cualquier otra cosa cancela.

---

### 5. Actualizar develop desde origin

```bash
git fetch origin develop
git checkout develop
git pull --ff-only origin develop
```

- Si `pull --ff-only` falla (develop tiene divergencia local): informar y detener.
  El usuario debe resolver el estado de develop antes de continuar.

---

### 6. Fusionar la rama en develop

```bash
git merge --no-ff <ORIGIN_BRANCH> -m "merge(<ORIGIN_BRANCH>): promote to develop"
```

Usar `--no-ff` para preservar el historial de la rama en el grafo de develop.

---

### 7. Resolver conflictos (si los hay)

Si el merge produce conflictos:

#### 7.1 Inspeccionar

```bash
git diff --name-only --diff-filter=U
git status --short
```

Leer **cada fichero conflictivo completo** antes de editar.

#### 7.2 Reglas de resolución

| Área | Regla |
| ---- | ----- |
| **Feature code** (`src/app/features/<feature>/`, `ui/` local) | Mantener el trabajo de `ORIGIN_BRANCH`. Incorporar de `develop` solo arreglos de shared que la feature necesite. |
| **Shared / shell** (`layout/`, `@shared/`, `core/`, `src/styles/`) | Preferir **`develop`** (contratos más nuevos: tokens, error handling, tema). Re-cablear la feature para que encaje. |
| **`app.ts` / `app.html`** | **Combinar ambos**: componentes de la feature desde `ORIGIN_BRANCH` + infraestructura de `develop`. |
| **i18n** (`src/assets/i18n/*.json`) | **Unión de claves**. Preservar las de la feature y todas las de `develop`. Ejecutar `npm run i18n:check` al terminar. |
| **Docs / commands** (`docs/`, `.claude/`, `.codex/`) | Preferir `develop`; readicionar líneas que describan la feature si se borraron. |
| **Conflict markers** | Eliminar todos los `<<<<<<<`, `=======`, `>>>>>>>`. Nunca dejarlos. |

Consultar [[project-structure]], [[theming-styling]], [[internationalization]] y
[[light-dark-mode]] cuando haya conflictos en UI, tokens o copy.

#### 7.3 Validar tras resolver

```bash
npm run lint && npm test -- --run
npm run i18n:check
```

Corregir cualquier fallo antes de commitear.

#### 7.4 Completar el merge

```bash
git add <ficheros-resueltos>
git commit --no-edit
```

---

### 8. Empujar develop

```bash
git push origin develop
```

Si el push falla por divergencia remota:

```bash
git pull --rebase origin develop
git push origin develop
```

Solo rebase para alinear, nunca para reescribir commits ya empujados de la feature.

---

### 9. Volver a la rama original

```bash
git checkout <ORIGIN_BRANCH>
```

Si se hizo stash en el paso 2:

```bash
git stash pop
```

---

### 10. Informe final

Mostrar:

```
=========================================
Merge to develop — Resultado
=========================================

Rama fusionada : <ORIGIN_BRANCH>
Destino        : develop
Conflictos     : ninguno | <lista de ficheros resueltos>
Push develop   : ✅ OK

Rama actual restaurada: <ORIGIN_BRANCH>

Resultado: ✅ Éxito
```

Si hubo conflictos, listar los ficheros resueltos y el criterio aplicado.

---

## Hard rules

- **Nunca** hacer checkout de `main` para modificarlo.
- **Nunca** hacer merge en `main` ni push a `main`.
- **Nunca** `--force`, `reset --hard` ni rebase de ramas ya publicadas.
- **Nunca** dejar conflict markers en ficheros.
- **Nunca** continuar si el gate (lint + tests) no está verde.
- Seguro para ejecutar varias veces; si develop ya contiene la rama, el merge
  resultará vacío y se informará sin error.

---

## Agent checklist

```
Progreso:
- [ ] Rama actual leída y guardada
- [ ] Árbol de trabajo limpio confirmado
- [ ] Gate (lint + tests) verde en ORIGIN_BRANCH
- [ ] Operación confirmada por el usuario
- [ ] develop actualizado desde origin
- [ ] Merge ejecutado
- [ ] Conflictos resueltos (si los hubo) y gate verde en develop
- [ ] Push a origin/develop completado
- [ ] Rama original restaurada
- [ ] Informe final mostrado
```

---

## Usage

```text
/merge-to-develop
```

Ejemplo de salida exitosa:

```
Fusionando feature/home-improvements → develop …
✓ Gate verde
✓ develop actualizado
✓ Merge sin conflictos
✓ Push OK

Resultado: ✅ Éxito
```

## Related

- `/new-branch` — crear una rama desde `main`
- `/autocommit` — commitear trabajo en la rama antes de fusionar
- `/update-branches-from-develop` — propagar develop a todas las ramas (operación inversa)
- [[project-structure]] — convención de nombres de rama (`feature/`, `fix/`, …)
- [[internationalization]] — paridad de claves i18n tras resolver conflictos
