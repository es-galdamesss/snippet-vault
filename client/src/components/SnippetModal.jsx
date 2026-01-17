import { X, Copy, Trash2, Calendar, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

function SnippetModal({ snippet, onClose, onDelete }) {
  const [copied, setCopied] = useState(false);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code_content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleDelete = () => {
    onDelete(snippet.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm animate-slide-in"
      onClick={onClose}
    >
      <div 
        className="bg-dark-surface border border-dark-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-dark-surface border-b border-dark-border p-6 flex items-start justify-between z-10">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              {snippet.title}
            </h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="badge bg-accent-primary/10 text-accent-primary border border-accent-primary/30">
                {snippet.language}
              </span>
              <div className="flex items-center gap-1 text-sm text-accent-secondary">
                <Calendar size={14} />
                <span>{formatDate(snippet.created_at)}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-accent-secondary hover:text-accent-danger hover:bg-dark-hover rounded-lg transition-all flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Descripción */}
          {snippet.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Descripción
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {snippet.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {snippet.tags && snippet.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {snippet.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Código */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                Código
              </h3>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-dark-hover 
                         hover:bg-dark-border text-accent-secondary hover:text-accent-primary 
                         rounded-lg transition-all"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copiar
                  </>
                )}
              </button>
            </div>
            
            <div className="relative rounded-lg overflow-hidden border border-dark-border">
              <SyntaxHighlighter
                language={snippet.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  background: '#0d1117',
                  fontSize: '0.875rem',
                  lineHeight: '1.5'
                }}
                showLineNumbers
                wrapLines
              >
                {snippet.code_content}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-dark-surface border-t border-dark-border p-6 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="btn-danger flex items-center gap-2"
          >
            <Trash2 size={18} />
            Eliminar Snippet
          </button>
          
          <button onClick={onClose} className="btn-secondary">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnippetModal;
