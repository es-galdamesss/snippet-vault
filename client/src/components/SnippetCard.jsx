import { Eye, Trash2, Copy, Star, Calendar } from 'lucide-react';
import { useState } from 'react';

function SnippetCard({ snippet, onView, onDelete, onTagClick }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(snippet.code_content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(snippet.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Colores para badges de lenguaje
  const languageColors = {
    javascript: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    python: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    java: 'bg-red-500/10 text-red-500 border-red-500/30',
    typescript: 'bg-blue-400/10 text-blue-400 border-blue-400/30',
    html: 'bg-orange-500/10 text-orange-500 border-orange-500/30',
    css: 'bg-pink-500/10 text-pink-500 border-pink-500/30',
    sql: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
    bash: 'bg-green-500/10 text-green-500 border-green-500/30',
    default: 'bg-gray-500/10 text-gray-400 border-gray-500/30'
  };

  const languageColor = languageColors[snippet.language.toLowerCase()] || languageColors.default;

  return (
    <div 
      className="card hover:shadow-xl cursor-pointer group animate-slide-in"
      onClick={() => onView(snippet)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-100 mb-2 truncate group-hover:text-accent-primary transition-colors">
            {snippet.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`badge border ${languageColor} text-xs`}>
              {snippet.language}
            </span>
            {snippet.is_favorite && (
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      {snippet.description && (
        <p className="text-sm text-accent-secondary mb-4 line-clamp-2">
          {snippet.description}
        </p>
      )}

      {/* Code preview */}
      <div className="bg-dark-bg border border-dark-border rounded-lg p-3 mb-4 overflow-hidden">
        <pre className="text-xs text-gray-400 font-mono line-clamp-3 overflow-x-auto">
          {snippet.code_content}
        </pre>
      </div>

      {/* Tags */}
      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags.slice(0, 3).map((tag, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
              className="tag text-xs"
            >
              #{tag}
            </button>
          ))}
          {snippet.tags.length > 3 && (
            <span className="text-xs text-accent-secondary">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-border">
        <div className="flex items-center gap-1 text-xs text-accent-secondary">
          <Calendar size={14} />
          <span>{formatDate(snippet.created_at)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-accent-secondary hover:text-accent-success 
                     hover:bg-dark-hover rounded-lg transition-all"
            title="Copiar código"
          >
            {copied ? (
              <span className="text-xs font-medium text-accent-success">✓ Copiado</span>
            ) : (
              <Copy size={16} />
            )}
          </button>
          
          <button
            onClick={() => onView(snippet)}
            className="p-2 text-accent-secondary hover:text-accent-primary 
                     hover:bg-dark-hover rounded-lg transition-all"
            title="Ver detalles"
          >
            <Eye size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            className="p-2 text-accent-secondary hover:text-accent-danger 
                     hover:bg-dark-hover rounded-lg transition-all"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnippetCard;
