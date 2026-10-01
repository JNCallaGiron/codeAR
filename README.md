# SumarImpacto - Backend (CodeAr) - Versión ES Modules (ESM)

Proyecto desarrollado para la materia de Backend (Tecnicatura Superior en Desarrollo de Software - IFTS 29).

**Esta es una versión adaptada a ECMAScript Modules (ESM / "ES6 modules")** a partir del proyecto original en CommonJS.

## Cambios principales respecto a la versión CommonJS

- Se agregó `"type": "module"` en `package.json`.
- Todos los `require()` se reemplazaron por `import ... from ...`.
- Todos los `module.exports` se reemplazaron por `export` / `export default`.
- Se agregó la extensión `.js` en las rutas de importación relativas (requerido por ESM en Node.js).
- Se implementó el polyfill de `__dirname` y `__filename` usando `import.meta.url` y `fileURLToPath` (ya que no existen de forma nativa en ESM).
- Scripts de `package.json` actualizados.

## 🏢 Sobre la Organización
**SumarImpacto** es una plataforma SaaS B2NGO concebida para la trazabilidad *end-to-end* y control operativo de donaciones en organizaciones sociales, comedores y fundaciones.

## 👥 Integrantes y Responsabilidades (Empresa CodeAr)
- **Omar Virili:** Configuración del servidor Express, arquitectura y módulo de Proyectos.
- **Jairo N. Calla Girón:** Módulo de Donantes (CRUD y persistencia JSON).
- **Mariana Borda:** Módulo de Organizaciones (CRUD y persistencia JSON).
- **Analía Fernández:** Módulo de Donaciones (CRUD y persistencia JSON).
- **Cynthia Sotelo:** Módulo de Gastos (CRUD y persistencia JSON).
- **Cristian Suárez:** Diseño, maquetación e integración del motor de plantillas **Pug** (vistas web, rutas dinámicas y componentes de navegación) y documentación.

## 🚀 Instalación y Ejecución

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor en modo desarrollo (con Nodemon):
   ```bash
   npm run dev
   ```
   O en modo producción:
   ```bash
   npm start
   ```

## 🌐 Endpoints de la API y Vistas Web
- **API REST (JSON):** `/proyectos`, `/organizaciones`, `/donantes`, `/donaciones`, `/gastos`
- **Interfaz Web (Pug):** `/vistas` (Panel principal, listados y vistas dinámicas)

## Requisitos
- Node.js 14+ (recomendado 18 o superior) con soporte nativo de ES Modules.
