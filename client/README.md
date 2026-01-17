# Snippet Vault - Cliente Frontend

Aplicación React construida con Vite y Tailwind CSS.

## 🚀 Iniciar Desarrollo

```bash
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

## 📦 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo con hot reload
- `npm run build` - Genera build de producción
- `npm run preview` - Vista previa del build de producción

## 🎨 Estructura de Componentes

```
src/
├── components/
│   ├── Navbar.jsx         # Barra de navegación superior
│   ├── SearchBar.jsx      # Barra de búsqueda con contador
│   ├── SnippetCard.jsx    # Card individual de snippet
│   ├── SnippetForm.jsx    # Formulario de creación
│   └── SnippetModal.jsx   # Modal de vista detallada
├── App.jsx                # Componente principal
├── main.jsx              # Entry point
└── index.css             # Estilos Tailwind + personalizados
```

## 🎨 Tailwind - Clases Personalizadas

El proyecto incluye clases utilitarias personalizadas en `index.css`:

```css
.btn-primary     /* Botón primario azul */
.btn-secondary   /* Botón secundario gris */
.btn-danger      /* Botón de eliminar rojo */
.input-text      /* Input de texto */
.textarea        /* Textarea con fuente mono */
.card            /* Card con hover effect */
.badge           /* Badge genérico */
.tag             /* Tag clickeable */
```

## 🎨 Paleta de Colores

```javascript
dark: {
  bg: '#0d1117',        // Background principal
  surface: '#161b22',   // Cards y elementos
  border: '#30363d',    // Bordes
  hover: '#1c2128'      // Estados hover
}

accent: {
  primary: '#58a6ff',   // Azul principal
  secondary: '#8b949e', // Gris texto
  success: '#3fb950',   // Verde éxito
  danger: '#f85149',    // Rojo peligro
  warning: '#d29922'    // Amarillo advertencia
}
```

## 📱 Responsive Breakpoints

- Mobile: < 768px (1 columna)
- Tablet: 768px - 1024px (2 columnas)
- Desktop: > 1024px (3 columnas)

## 🔌 Integración con Backend

La URL del backend está configurada en `App.jsx`:

```javascript
const API_URL = 'http://localhost:3000/api/snippets';
```

Si cambias el puerto del backend, actualiza esta constante.

## 📚 Dependencias Principales

- **react-syntax-highlighter**: Resaltado de sintaxis
- **lucide-react**: Librería de iconos
- **tailwindcss**: Framework CSS utility-first

## 🎯 Características Implementadas

✅ Optimistic UI (cambios instantáneos)  
✅ Búsqueda en tiempo real  
✅ Copy to clipboard  
✅ Syntax highlighting  
✅ Modal con ESC para cerrar  
✅ Animaciones suaves  
✅ Responsive design  
✅ Estados de loading/error/empty  

## 🐛 Notas de Desarrollo

- El componente `SnippetModal` previene el scroll del body cuando está abierto
- La búsqueda filtra en el frontend (puede moverse al backend para datasets grandes)
- Los colores de lenguaje están hardcodeados en `SnippetCard.jsx`
- El formato de fecha usa `toLocaleDateString` con locale español
