import { Code2, Github } from 'lucide-react';

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-dark-surface border-b border-dark-border backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-primary rounded-lg">
              <Code2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-100">Snippet Vault</h1>
              <p className="text-xs text-accent-secondary">Tu Stack Overflow Personal</p>
            </div>
          </div>

          {/* Links opcionales */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-accent-secondary hover:text-accent-primary transition-colors"
              title="Ver en GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
