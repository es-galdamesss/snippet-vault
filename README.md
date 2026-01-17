# Snippet Vault 🔐

Un sistema de gestión de snippets de código personal construido con el stack PERN (PostgreSQL, Express, React, Node.js).

## 📖 Descripción

Snippet Vault es tu StackOverflow privado. Centraliza todo tu conocimiento técnico disperso (comandos de Git, configuraciones de Webpack, helpers de JavaScript, etc.) en una sola aplicación con búsqueda instantánea.

**Filosofía:** "Guardar en menos de 10 segundos, recuperar en menos de 5 segundos."

## 🚀 Stack Tecnológico

### Backend
- **Node.js** con ES Modules
- **Express.js** - Framework web minimalista
- **PostgreSQL** - Base de datos relacional con soporte de arrays nativos
- **express-validator** - Validación de datos robusta
- **dotenv** - Gestión de variables de entorno

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utility-first
- **Lucide React** - Iconos modernos
- **React Syntax Highlighter** - Resaltado de sintaxis de código

## 📦 Instalación

### Requisitos Previos
- Node.js v18+ ([Descargar](https://nodejs.org/))
- PostgreSQL 14+ ([Descargar](https://www.postgresql.org/download/))
- npm o yarn

### 1. Clonar/Descargar el Proyecto

```bash
cd "snippet vault"
```

### 2. Configurar la Base de Datos

**Opción A: Terminal (psql)**
```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE snippet_vault_db;

# Salir
\q

# Ejecutar schema
psql -U postgres -d snippet_vault_db -f server/schema.sql
```

**Opción B: pgAdmin**
1. Abrir pgAdmin
2. Crear nueva base de datos: `snippet_vault_db`
3. Query Tool → Copiar contenido de `server/schema.sql` → Ejecutar

### 3. Configurar Backend

```bash
cd server

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Editar .env con tus credenciales
# (Usar tu editor de texto favorito)
```

**Contenido del `.env`:**
```ini
PORT=3000
DB_USER=postgres
DB_PASSWORD=tu_password_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=snippet_vault_db
NODE_ENV=development
```

### 4. Configurar Frontend

```bash
cd ../client

# Instalar dependencias
npm install
```

### 5. Iniciar la Aplicación

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Backend corriendo en: `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend corriendo en: `http://localhost:5173`

## 🎯 Uso

1. **Crear un Snippet:**
   - Click en "Nuevo Snippet"
   - Llenar título, código, lenguaje y tags
   - Guardar

2. **Buscar:**
   - Usa la barra de búsqueda para filtrar por título, lenguaje o tags
   - Click en un tag para filtrar instantáneamente

3. **Copiar Código:**
   - Click en el icono de copiar en la card
   - O abre el modal y copia desde ahí

4. **Ver Detalles:**
   - Click en una card para ver el código completo con syntax highlighting

## 📁 Estructura del Proyecto

```
snippet vault/
├── server/                 # Backend API
│   ├── config/
│   │   └── db.js          # Configuración PostgreSQL
│   ├── routes/
│   │   └── snippets.js    # Endpoints REST
│   ├── index.js           # Entry point
│   ├── schema.sql         # Schema de base de datos
│   ├── .env.example       # Template de variables de entorno
│   └── package.json
│
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── Navbar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── SnippetCard.jsx
│   │   │   ├── SnippetForm.jsx
│   │   │   └── SnippetModal.jsx
│   │   ├── App.jsx        # Componente principal
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Estilos globales
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── context/               # Documentación del proyecto
└── README.md
```

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/snippets` | Obtener todos los snippets |
| `GET` | `/api/snippets?search=react` | Buscar snippets |
| `GET` | `/api/snippets/:id` | Obtener un snippet específico |
| `POST` | `/api/snippets` | Crear nuevo snippet |
| `PUT` | `/api/snippets/:id` | Actualizar snippet |
| `DELETE` | `/api/snippets/:id` | Eliminar snippet |
| `GET` | `/health` | Health check |

## 🎨 Características

✅ **Optimistic UI** - Las acciones se reflejan instantáneamente  
✅ **Búsqueda en tiempo real** - Filtra mientras escribes  
✅ **Syntax Highlighting** - Código legible con colores  
✅ **Dark Mode nativo** - Diseñado para programadores  
✅ **Responsive** - Funciona en móvil, tablet y desktop  
✅ **Copy to Clipboard** - Un click para copiar código  
✅ **Validación robusta** - express-validator en backend  
✅ **SQL Parametrizado** - Prevención de SQL injection  

## 📚 Aprendizajes Clave

Este proyecto es perfecto para aprender:

- **Backend:** Express, PostgreSQL raw queries, validación, arquitectura modular
- **Frontend:** React hooks, state management, Optimistic UI, Tailwind CSS
- **Full Stack:** Comunicación cliente-servidor, API REST, CORS
- **Database:** Arrays de PostgreSQL, índices GIN, triggers automáticos

## 🚧 Próximas Características (Scope Creep Controlado)

Ideas para expandir el proyecto cuando domines lo básico:

- [ ] Edición de snippets existentes
- [ ] Exportar/Importar snippets (JSON)
- [ ] Modo de vista compacta/lista
- [ ] Temas de color personalizables
- [ ] Búsqueda fuzzy (tolerante a errores)
- [ ] Renderizado Markdown en descripciones
- [ ] Extensión de VS Code

## 🐛 Troubleshooting

**Error: "Cannot connect to database"**
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `.env`
- Confirma que la base de datos existe

**Error: "CORS Policy"**
- Verifica que el backend esté en el puerto 3000
- Confirma que el frontend esté en el puerto 5173

**Error: "Module not found"**
- Ejecuta `npm install` en ambas carpetas (server y client)

## 📝 Licencia

MIT - Úsalo libremente para aprender y crear.

## 🤝 Contribuciones

Este es un proyecto educativo personal. Siéntete libre de hacer fork y experimentar.

---

**Hecho con ❤️ y Vibe Coding**
