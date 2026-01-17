-- ============================================
-- SNIPPET VAULT - Database Schema
-- ============================================

-- Crear la base de datos (ejecutar esto primero en tu cliente SQL)
-- CREATE DATABASE snippet_vault_db;

-- Conectarse a la base de datos y luego ejecutar lo siguiente:

-- Eliminar tabla si existe (¡CUIDADO! Esto borra todos los datos)
DROP TABLE IF EXISTS snippets CASCADE;

-- Crear tabla de snippets
CREATE TABLE snippets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    code_content TEXT NOT NULL,
    language VARCHAR(50) NOT NULL DEFAULT 'javascript',
    description TEXT,
    tags TEXT[], -- Array de PostgreSQL para tags
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar performance de búsquedas
CREATE INDEX idx_snippets_title ON snippets(title);
CREATE INDEX idx_snippets_language ON snippets(language);
CREATE INDEX idx_snippets_tags ON snippets USING GIN(tags); -- GIN index para búsquedas en arrays
CREATE INDEX idx_snippets_is_favorite ON snippets(is_favorite);
CREATE INDEX idx_snippets_created_at ON snippets(created_at DESC);

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger que ejecuta la función antes de cada UPDATE
CREATE TRIGGER update_snippets_updated_at
    BEFORE UPDATE ON snippets
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- ============================================
-- DATOS DE EJEMPLO (Opcional - para testing)
-- ============================================

INSERT INTO snippets (title, code_content, language, description, tags, is_favorite) VALUES
(
    'Configuración CORS en Express',
    'import cors from ''cors'';
app.use(cors());',
    'javascript',
    'Middleware básico para habilitar CORS en Express.js',
    ARRAY['express', 'cors', 'node'],
    true
),
(
    'Git - Deshacer último commit',
    'git reset --soft HEAD~1',
    'bash',
    'Deshace el último commit pero mantiene los cambios en staging',
    ARRAY['git', 'terminal'],
    false
),
(
    'React - useState con objeto',
    'const [user, setUser] = useState({
  name: '''',
  email: ''''
});

const updateUser = (field, value) => {
  setUser(prev => ({ ...prev, [field]: value }));
};',
    'javascript',
    'Patrón para actualizar propiedades específicas de un estado objeto',
    ARRAY['react', 'hooks', 'useState'],
    true
),
(
    'PostgreSQL - Buscar en array',
    'SELECT * FROM snippets WHERE ''react'' = ANY(tags);',
    'sql',
    'Buscar registros donde un valor específico existe en un array',
    ARRAY['postgresql', 'sql', 'arrays'],
    false
),
(
    'Tailwind - Centrar div',
    '<div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
    Contenido centrado
  </div>
</div>',
    'javascript',
    'Centrar contenido vertical y horizontalmente con Tailwind CSS',
    ARRAY['tailwind', 'css', 'react'],
    false
);

-- Verificar que todo se insertó correctamente
SELECT * FROM snippets;
