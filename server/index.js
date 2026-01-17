import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import snippetsRouter from './routes/snippets.js';
import pool from './config/db.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARES GLOBALES
// ============================================

// CORS - Permitir peticiones desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // URL por defecto de Vite
  credentials: true
}));

// Parser de JSON
app.use(express.json());

// Logger simple de requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// ============================================
// RUTAS
// ============================================

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ 
      status: 'OK', 
      message: 'Server y Database funcionando correctamente',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'ERROR', 
      message: 'Error al conectar con la base de datos',
      error: error.message
    });
  }
});

// API Routes
app.use('/api/snippets', snippetsRouter);

// Ruta 404 - No encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// ============================================
// MANEJO CENTRALIZADO DE ERRORES
// ============================================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  
  // Error de PostgreSQL
  if (err.code) {
    return res.status(500).json({
      success: false,
      message: 'Error en la base de datos',
      error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
    });
  }

  // Error genérico
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err : undefined
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================
app.listen(PORT, () => {
  console.log('\n🚀 ============================================');
  console.log(`🚀 Snippet Vault API corriendo en puerto ${PORT}`);
  console.log(`🚀 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🚀 Health check: http://localhost:${PORT}/health`);
  console.log(`🚀 API Base: http://localhost:${PORT}/api/snippets`);
  console.log('🚀 ============================================\n');
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor...');
  pool.end(() => {
    console.log('✅ Pool de base de datos cerrado');
    process.exit(0);
  });
});
