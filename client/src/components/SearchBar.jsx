import { Search, X } from 'lucide-react';

function SearchBar({ value, onChange, resultsCount }) {
  return (
    <div className="relative">
      <div className="relative">
        <Search 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-accent-secondary" 
          size={20} 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar por título, lenguaje, tags..."
          className="w-full pl-12 pr-12 py-4 bg-dark-surface text-gray-100 rounded-xl 
                   border-2 border-dark-border focus:outline-none focus:border-accent-primary 
                   placeholder-gray-500 transition-all duration-200 text-lg"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-accent-secondary 
                     hover:text-accent-primary transition-colors"
            title="Limpiar búsqueda"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      {value && (
        <div className="mt-2 text-sm text-accent-secondary">
          {resultsCount} {resultsCount === 1 ? 'resultado' : 'resultados'} encontrados
        </div>
      )}
    </div>
  );
}

export default SearchBar;
