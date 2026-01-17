import express from 'express';
import { body, param, query as expressQuery, validationResult } from 'express-validator';
import { query } from '../config/db.js';

const router = express.Router();

// ============================================
// MIDDLEWARE DE VALIDACIÓN
// ============================================

// Validaciones para crear/actualizar snippets
const snippetValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ max: 255 }).withMessage('El título no puede exceder 255 caracteres'),
  
  body('code_content')
    .trim()
    .notEmpty().withMessage('El contenido del código es obligatorio'),
  
  body('language')
    .trim()
    .notEmpty().withMessage('El lenguaje es obligatorio')
    .isLength({ max: 50 }).withMessage('El lenguaje no puede exceder 50 caracteres'),
  
  body('description')
    .optional()
    .trim(),
  
  body('tags')
    .optional()
    .isArray().withMessage('Los tags deben ser un array'),
  
  body('tags.*')
    .optional()
    .trim()
    .notEmpty().withMessage('Los tags no pueden estar vacíos'),
  
  body('is_favorite')
    .optional()
    .isBoolean().withMessage('is_favorite debe ser un booleano')
];

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  next();
};

// ============================================
// RUTAS
// ============================================

// GET / - Obtener todos los snippets (con búsqueda opcional)
router.get('/', 
  expressQuery('search').optional().trim(),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { search } = req.query;
      
      let queryText = 'SELECT * FROM snippets ORDER BY created_at DESC';
      let queryParams = [];

      // Si hay búsqueda, filtramos por título o tags
      if (search) {
        queryText = `
          SELECT * FROM snippets 
          WHERE title ILIKE $1 
          OR $2 = ANY(tags)
          OR language ILIKE $1
          ORDER BY created_at DESC
        `;
        queryParams = [`%${search}%`, search];
      }

      const result = await query(queryText, queryParams);
      
      res.json({
        success: true,
        count: result.rows.length,
        data: result.rows
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /:id - Obtener un snippet específico
router.get('/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await query('SELECT * FROM snippets WHERE id = $1', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Snippet no encontrado'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }
);

// POST / - Crear un nuevo snippet
router.post('/',
  snippetValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { title, code_content, language, description, tags, is_favorite } = req.body;
      
      const result = await query(
        `INSERT INTO snippets (title, code_content, language, description, tags, is_favorite)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [title, code_content, language, description || null, tags || [], is_favorite || false]
      );

      res.status(201).json({
        success: true,
        message: 'Snippet creado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }
);

// PUT /:id - Actualizar un snippet existente
router.put('/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  snippetValidation,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, code_content, language, description, tags, is_favorite } = req.body;
      
      const result = await query(
        `UPDATE snippets 
         SET title = $1, code_content = $2, language = $3, 
             description = $4, tags = $5, is_favorite = $6
         WHERE id = $7
         RETURNING *`,
        [title, code_content, language, description || null, tags || [], is_favorite || false, id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Snippet no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Snippet actualizado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }
);

// DELETE /:id - Eliminar un snippet
router.delete('/:id',
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await query('DELETE FROM snippets WHERE id = $1 RETURNING *', [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Snippet no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Snippet eliminado exitosamente',
        data: result.rows[0]
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
