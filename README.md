# Snippet Vault

Sistema de gestión de fragmentos de código construido con PostgreSQL, Express, React y Node.js.

## Descripción

Snippet Vault es una aplicación web diseñada para almacenar, organizar y recuperar fragmentos de código de forma eficiente. Proporciona una interfaz para gestionar conocimiento técnico mediante un sistema de búsqueda instantánea, etiquetado y categorización por lenguaje de programación.

La aplicación implementa optimistic UI para garantizar una experiencia de usuario fluida, con actualizaciones instantáneas que se reflejan en la interfaz antes de la confirmación del servidor.

## Stack Tecnológico

**Backend:**
- Node.js con ES Modules
- Express.js para el servidor HTTP
- PostgreSQL como sistema de base de datos
- express-validator para validación de datos
- Arquitectura modular por capas

**Frontend:**
- React 18 con Hooks
- Vite como herramienta de compilación
- Tailwind CSS para estilos
- React Syntax Highlighter para renderizado de código

## Instalación

### Requisitos del Sistema

- Node.js versión 18 o superior
- PostgreSQL versión 14 o superior
- npm o yarn como gestor de paquetes

### Configuración de Base de Datos

Crear la base de datos mediante el cliente psql:

```bash
psql -U postgres
CREATE DATABASE snippet_vault_db;
\q
```

Ejecutar el schema proporcionado:

```bash
psql -U postgres -d snippet_vault_db -f server/schema.sql
```

### Configuración del Backend

Instalar dependencias del servidor:

```bash
cd server
npm install
```

Crear archivo de configuración `.env` en la carpeta `server/` con los siguientes parámetros:

```ini
PORT=3000
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=snippet_vault_db
NODE_ENV=development
```

El archivo `.env.example` puede utilizarse como plantilla base.

### Configuración del Frontend

Instalar dependencias del cliente:

```bash
cd client
npm install
```

### Ejecución del Proyecto

Iniciar el servidor backend en una terminal:

```bash
cd server
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

Iniciar el cliente frontend en otra terminal:

```bash
cd client
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Arquitectura

### Estructura del Backend

```
server/
├── config/
│   └── db.js              # Pool de conexiones PostgreSQL
├── routes/
│   └── snippets.js        # Definición de endpoints REST
├── index.js               # Punto de entrada del servidor
└── schema.sql             # Schema de base de datos
```

### Estructura del Frontend

```
client/
├── src/
│   ├── components/        # Componentes React modulares
│   ├── App.jsx           # Componente raíz
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
└── vite.config.js        # Configuración de Vite
```

## API REST

La aplicación expone los siguientes endpoints:

| Método HTTP | Endpoint | Descripción |
|-------------|----------|-------------|
| GET | `/api/snippets` | Obtener lista de snippets |
| GET | `/api/snippets?search=term` | Buscar snippets por término |
| GET | `/api/snippets/:id` | Obtener snippet por identificador |
| POST | `/api/snippets` | Crear nuevo snippet |
| PUT | `/api/snippets/:id` | Actualizar snippet existente |
| DELETE | `/api/snippets/:id` | Eliminar snippet |
| GET | `/health` | Verificación de estado del servidor |

### Formato de Datos

Estructura de un snippet:

```json
{
  "title": "string",
  "code_content": "string",
  "language": "string",
  "description": "string",
  "tags": ["string"],
  "is_favorite": "boolean"
}
```

## Características Principales

**Gestión de Datos:**
- Operaciones CRUD completas mediante API REST
- Validación de entrada en el servidor
- Queries parametrizadas para prevención de SQL injection
- Arrays nativos de PostgreSQL para almacenamiento de etiquetas

**Interfaz de Usuario:**
- Búsqueda en tiempo real por título, lenguaje o etiquetas
- Resaltado de sintaxis para múltiples lenguajes
- Funcionalidad de copiado al portapapeles
- Diseño responsive adaptado a diferentes tamaños de pantalla
- Tema oscuro optimizado para lectura de código

**Rendimiento:**
- Implementación de optimistic UI
- Índices de base de datos para optimización de búsquedas
- Hot module replacement en desarrollo

## Base de Datos

El schema incluye una tabla principal `snippets` con los siguientes campos:

- `id`: Identificador serial autoincremental
- `title`: Título del snippet (VARCHAR 255)
- `code_content`: Contenido del código (TEXT)
- `language`: Lenguaje de programación (VARCHAR 50)
- `description`: Descripción opcional (TEXT)
- `tags`: Array de etiquetas (TEXT[])
- `is_favorite`: Marcador de favorito (BOOLEAN)
- `created_at`: Timestamp de creación
- `updated_at`: Timestamp de última actualización

La tabla incluye índices en los campos de búsqueda frecuente y un índice GIN para búsquedas eficientes en el array de tags. Un trigger se encarga de actualizar automáticamente el campo `updated_at` en cada modificación.

## Desarrollo

El proyecto utiliza nodemon para recarga automática del servidor durante el desarrollo. El cliente de Vite proporciona hot module replacement para actualizaciones instantáneas del frontend.

Para entornos de desarrollo, las variables de entorno deben configurarse en el archivo `.env` correspondiente a cada módulo. Este archivo no debe incluirse en control de versiones.

## Licencia

MIT
