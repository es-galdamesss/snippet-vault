import { useState } from 'react';
import { Save, X } from 'lucide-react';

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'html',
  'css',
  'sql',
  'bash',
  'json',
  'go',
  'rust',
  'php',
  'ruby',
  'other'
];

function SnippetForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    code_content: '',
    language: 'javascript',
    description: '',
    tags: '',
    is_favorite: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.code_content.trim()) {
      newErrors.code_content = 'El código es obligatorio';
    }

    if (!formData.language) {
      newErrors.language = 'Debes seleccionar un lenguaje';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Procesar tags: convertir string separado por comas en array
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const snippetData = {
      ...formData,
      tags
    };

    onSubmit(snippetData);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Crear Nuevo Snippet</h2>
        <button
          onClick={onCancel}
          className="p-2 text-accent-secondary hover:text-accent-danger hover:bg-dark-hover rounded-lg transition-all"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Título <span className="text-accent-danger">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="ej: Configuración CORS en Express"
            className={`input-text ${errors.title ? 'border-accent-danger' : ''}`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-accent-danger">{errors.title}</p>
          )}
        </div>

        {/* Lenguaje */}
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Lenguaje <span className="text-accent-danger">*</span>
          </label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
            className={`input-text ${errors.language ? 'border-accent-danger' : ''}`}
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="mt-1 text-sm text-accent-danger">{errors.language}</p>
          )}
        </div>

        {/* Código */}
        <div>
          <label htmlFor="code_content" className="block text-sm font-medium text-gray-300 mb-2">
            Código <span className="text-accent-danger">*</span>
          </label>
          <textarea
            id="code_content"
            name="code_content"
            value={formData.code_content}
            onChange={handleChange}
            placeholder="Pega tu código aquí..."
            className={`textarea ${errors.code_content ? 'border-accent-danger' : ''}`}
          />
          {errors.code_content && (
            <p className="mt-1 text-sm text-accent-danger">{errors.code_content}</p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Descripción (opcional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="¿Qué hace este código? ¿Cuándo usarlo?"
            className="input-text min-h-[100px]"
          />
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
            Tags (separados por comas)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="ej: express, cors, backend"
            className="input-text"
          />
          <p className="mt-1 text-xs text-accent-secondary">
            Los tags ayudan a encontrar tus snippets más rápido
          </p>
        </div>

        {/* Favorito */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_favorite"
            name="is_favorite"
            checked={formData.is_favorite}
            onChange={handleChange}
            className="w-4 h-4 text-accent-primary bg-dark-surface border-dark-border 
                     rounded focus:ring-2 focus:ring-accent-primary"
          />
          <label htmlFor="is_favorite" className="text-sm text-gray-300 cursor-pointer">
            Marcar como favorito ⭐
          </label>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 pt-4">
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Save size={18} />
            Guardar Snippet
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default SnippetForm;
