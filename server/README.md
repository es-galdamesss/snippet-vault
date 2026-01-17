# Snippet Vault - Backend API

Backend RESTful API construido con Node.js, Express y PostgreSQL.

## 🚀 Setup Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Base de Datos

**Opción A: Usando psql (Terminal)**
```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE snippet_vault_db;

# Salir
\q

# Ejecutar el schema
psql -U postgres -d snippet_vault_db -f schema.sql
```

**Opción B: Usando pgAdmin**
1. Abrir pgAdmin
2. Crear nueva base de datos llamada `snippet_vault_db`
3. Abrir Query Tool
4. Copiar y ejecutar el contenido de `schema.sql`

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz de `server/`:

```bash
cp .env.example .env
```

Editar `.env` con tus credenciales:
```ini
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=snippet_vault_db
NODE_ENV=development
```

### 4. Iniciar el Servidor

**Modo Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo Producción:**
```bash
npm start
```

## 📡 Endpoints Disponibles

### Health Check
```http
GET /health
```
Verifica que el servidor y la base de datos estén funcionando.

### Snippets

#### Obtener todos los snippets
```http
GET /api/snippets
GET /api/snippets?search=react
```

#### Obtener un snippet específico
```http
GET /api/snippets/:id
```

#### Crear un snippet
```http
POST /api/snippets
Content-Type: application/json

{
  "title": "Ejemplo de snippet",
  "code_content": "console.log('Hola mundo');",
  "language": "javascript",
  "description": "Descripción opcional",
  "tags": ["javascript", "ejemplo"],
  "is_favorite": false
}
```

#### Actualizar un snippet
```http
PUT /api/snippets/:id
Content-Type: application/json

{
  "title": "Título actualizado",
  "code_content": "console.log('Actualizado');",
  "language": "javascript",
  "description": "Nueva descripción",
  "tags": ["javascript"],
  "is_favorite": true
}
```

#### Eliminar un snippet
```http
DELETE /api/snippets/:id
```

## 🛠️ Estructura del Proyecto

```
server/
├── config/
│   └── db.js              # Configuración de PostgreSQL
├── routes/
│   └── snippets.js        # Rutas de la API
├── index.js               # Entry point del servidor
├── schema.sql             # Schema de la base de datos
├── package.json
├── .env.example           # Ejemplo de variables de entorno
└── README.md
```

## 🧪 Testing con cURL

```bash
# Health check
curl http://localhost:3000/health

# Obtener todos los snippets
curl http://localhost:3000/api/snippets

# Crear un snippet
curl -X POST http://localhost:3000/api/snippets \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Snippet",
    "code_content": "console.log(\"test\");",
    "language": "javascript",
    "tags": ["test"]
  }'
```

## 📚 Tecnologías Utilizadas

- **Node.js** - Runtime
- **Express.js** - Framework web
- **PostgreSQL** - Base de datos
- **pg** - Cliente de PostgreSQL
- **express-validator** - Validación de datos
- **cors** - Middleware CORS
- **dotenv** - Variables de entorno
- **nodemon** - Auto-reload en desarrollo

## 🔒 Seguridad

- ✅ Validación de entrada con express-validator
- ✅ Queries parametrizadas (prevención de SQL injection)
- ✅ CORS configurado
- ✅ Variables de entorno para datos sensibles

## 📝 Notas

- El servidor corre por defecto en `http://localhost:3000`
- Los logs de queries están habilitados en desarrollo
- El trigger `update_updated_at` actualiza automáticamente el timestamp
- Los índices mejoran el performance de búsquedas
