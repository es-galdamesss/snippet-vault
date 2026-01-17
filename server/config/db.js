import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuración del pool de conexiones a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Event listeners para debugging
pool.on('connect', () => {
  console.log('✅ Nueva conexión establecida con PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el cliente de PostgreSQL:', err);
  process.exit(-1);
});

// Función helper para ejecutar queries con manejo de errores
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('📊 Query ejecutado:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('❌ Error en query:', error);
    throw error;
  }
};

export default pool;
