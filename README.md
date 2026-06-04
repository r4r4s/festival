# 🎵 festiVal

> Tu portal de los principales festivales de música de la Comunidad Valenciana.

---

## 📖 Descripción

**festiVal** es una aplicación web desarrollada con **Angular** que reúne, en un único lugar, la información esencial sobre los festivales de música más importantes de la Comunidad Valenciana (España). Desde el FIB hasta Arenal Sound, pasando por Low Festival, Medusa, Reggaeton Beach o SanSan, festiVal está pensada para que melómanos, festivaleros y curiosos puedan descubrir, comparar y planificar su próxima experiencia musical en tierras valencianas.

La aplicación funciona como un portal informativo: muestra fechas, ubicaciones, géneros musicales, cartel de artistas, precios orientativos y cualquier dato relevante para que el usuario tome la mejor decisión antes de comprar su entrada. Su interfaz, completamente en **español**, ha sido diseñada con un enfoque moderno, responsive y centrado en la experiencia de usuario.

---

## ✨ Características

- 🎪 **Listado de festivales** — Catálogo completo de los principales festivales celebrados en Valencia, Alicante y Castellón.
- 📄 **Páginas de detalle** — Ficha individual de cada festival con información ampliada: cartel, horarios, servicios y datos prácticos.
- 🔍 **Búsqueda** — Buscador rápido por nombre de festival o artista.
- 🎚️ **Filtros avanzados** — Filtra por provincia, mes, género musical (electrónica, indie, reggaeton, rock, pop...) o rango de precios.
- 📍 **Información de ubicación** — Mapa y datos de localización de cada recinto, con indicaciones para llegar.
- 📱 **Diseño responsive** — Experiencia optimizada para móvil, tablet y escritorio.
- 🎨 **Interfaz moderna** — UI limpia, animaciones suaves y accesibilidad cuidada.

---

## 🛠️ Tech Stack

| Tecnología       | Uso                                       |
| ---------------- | ----------------------------------------- |
| **Angular**      | Framework principal del frontend          |
| **TypeScript**   | Lenguaje de programación tipado           |
| **HTML5**        | Marcado semántico                         |
| **SCSS**         | Estilos modulares y variables de diseño   |

---

## 🚀 Instalación

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Angular CLI](https://angular.io/cli) instalado globalmente
- [Git](https://git-scm.com/)

### Pasos

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/festiVal.git
   cd festiVal
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Arrancar el servidor de desarrollo**

   ```bash
   ng serve
   ```

   Abre tu navegador en [http://localhost:4200](http://localhost:4200). La aplicación se recargará automáticamente al detectar cambios.

---

## 📜 Scripts disponibles

| Comando           | Descripción                                                     |
| ----------------- | --------------------------------------------------------------- |
| `npm start`       | Arranca el servidor de desarrollo en `http://localhost:4200`    |
| `npm run build`   | Compila la aplicación para producción en la carpeta `dist/`     |
| `npm test`        | Ejecuta los tests unitarios                                     |
| `npm run lint`    | Analiza el código con el linter para detectar errores de estilo |
| `npm run watch`   | Compila en modo desarrollo y observa cambios                    |

---

## 📁 Estructura del proyecto

```
festiVal/
├── src/
│   ├── app/
│   │   ├── components/        # Componentes reutilizables (cards, navbar, footer...)
│   │   │   ├── festival-card/
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   └── search-bar/
│   │   ├── pages/             # Vistas/rutas principales
│   │   │   ├── home/
│   │   │   ├── festival-list/
│   │   │   ├── festival-detail/
│   │   │   └── about/
│   │   ├── services/          # Lógica de negocio y acceso a datos
│   │   │   └── festival.service.ts
│   │   ├── models/            # Interfaces y tipos TypeScript
│   │   │   └── festival.model.ts
│   │   ├── pipes/             # Pipes personalizados (filtros, formato fechas...)
│   │   ├── guards/            # Route guards
│   │   ├── app.routes.ts      # Configuración de rutas
│   │   ├── app.component.ts
│   │   └── app.config.ts
│   ├── assets/                # Imágenes, iconos, fuentes
│   │   ├── images/
│   │   └── icons/
│   ├── environments/          # Configuración por entorno
│   ├── styles/                # Estilos globales y variables SCSS
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── styles.scss
│   └── index.html
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗺️ Roadmap

Próximas mejoras planificadas:

- [ ] 📅 Calendario interactivo con todos los festivales del año.
- [ ] 🎟️ Integración con plataformas de venta de entradas (Dice, Ticketmaster).
- [ ] 🗣️ Versiones multilingüe (valenciano e inglés).
- [ ] 🌙 Modo oscuro.
- [ ] 🎧 Integración con Spotify para escuchar a los artistas del cartel.

---


## 👤 Autor

Proyecto desarrollado por **Rares Ngheru**.

- ✉️ Email: [rngheru@gmail.com](mailto:rngheru@gmail.com)
- 🐙 GitHub: [@R4r4s](https://github.com/R4r4s)