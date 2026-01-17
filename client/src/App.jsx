import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SnippetCard from './components/SnippetCard';
import SnippetForm from './components/SnippetForm';
import SnippetModal from './components/SnippetModal';
import { Code2, Plus, Loader2 } from 'lucide-react';

const API_URL = 'http://localhost:3000/api/snippets';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [filteredSnippets, setFilteredSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch inicial de snippets
  useEffect(() => {
    fetchSnippets();
  }, []);

  // Filtrar snippets cuando cambia la búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSnippets(snippets);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = snippets.filter(snippet => 
        snippet.title.toLowerCase().includes(query) ||
        snippet.language.toLowerCase().includes(query) ||
        snippet.description?.toLowerCase().includes(query) ||
        snippet.tags?.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredSnippets(filtered);
    }
  }, [searchQuery, snippets]);

  const fetchSnippets = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Error al cargar los snippets');
      }
      
      const data = await response.json();
      setSnippets(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching snippets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSnippet = async (snippetData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippetData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el snippet');
      }

      const data = await response.json();
      
      // Optimistic UI: Agregar inmediatamente a la lista
      setSnippets(prev => [data.data, ...prev]);
      setShowForm(false);
      
    } catch (err) {
      console.error('Error creating snippet:', err);
      alert('Error al crear el snippet: ' + err.message);
    }
  };

  const handleDeleteSnippet = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este snippet?')) {
      return;
    }

    try {
      // Optimistic UI: Eliminar inmediatamente de la vista
      setSnippets(prev => prev.filter(s => s.id !== id));
      setShowModal(false);

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el snippet');
      }

    } catch (err) {
      console.error('Error deleting snippet:', err);
      alert('Error al eliminar el snippet: ' + err.message);
      // Recargar en caso de error
      fetchSnippets();
    }
  };

  const handleViewSnippet = (snippet) => {
    setSelectedSnippet(snippet);
    setShowModal(true);
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header con búsqueda y botón de crear */}
        <div className="mb-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-100 mb-2">
                Snippet Vault
              </h1>
              <p className="text-accent-secondary">
                Tu biblioteca personal de código. Guarda una vez, encuentra al instante.
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              Nuevo Snippet
            </button>
          </div>

          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            resultsCount={filteredSnippets.length}
          />
        </div>

        {/* Formulario de creación (condicional) */}
        {showForm && (
          <div className="mb-8 animate-slide-in">
            <SnippetForm 
              onSubmit={handleCreateSnippet}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-accent-primary" size={48} />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="card border-accent-danger text-center py-12">
            <p className="text-accent-danger text-lg mb-4">❌ {error}</p>
            <button onClick={fetchSnippets} className="btn-secondary">
              Reintentar
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && snippets.length === 0 && (
          <div className="card text-center py-20">
            <Code2 className="mx-auto mb-4 text-accent-secondary" size={64} />
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              No hay snippets aún
            </h2>
            <p className="text-accent-secondary mb-6">
              Comienza creando tu primer snippet de código
            </p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Crear primer snippet
            </button>
          </div>
        )}

        {/* No results state */}
        {!loading && !error && snippets.length > 0 && filteredSnippets.length === 0 && (
          <div className="card text-center py-20">
            <p className="text-xl text-accent-secondary mb-4">
              No se encontraron snippets para "<span className="text-accent-primary">{searchQuery}</span>"
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="btn-secondary"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}

        {/* Grid de snippets */}
        {!loading && !error && filteredSnippets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onView={handleViewSnippet}
                onDelete={handleDeleteSnippet}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de visualización */}
      {showModal && selectedSnippet && (
        <SnippetModal
          snippet={selectedSnippet}
          onClose={() => setShowModal(false)}
          onDelete={handleDeleteSnippet}
        />
      )}
    </div>
  );
}

export default App;
