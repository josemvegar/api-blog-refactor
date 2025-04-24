/**
 * @file errorHandler.js
 * @description Middleware avanzado para manejo centralizado de errores
 * @module middlewares/errorHandler
 */

/**
 * Middleware para manejo de errores globales
 * @function
 * @param {Error} err - Objeto de error
 * @param {express.Request} req - Objeto de solicitud HTTP
 * @param {express.Response} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 * @returns {Object} Respuesta JSON estandarizada
 * 
 * @example
 * // En app.js:
 * app.use(errorHandler);
 * 
 * // En controladores:
 * try { ... } catch(err) { next(err); }
 */
const errorHandler = (err, req, res, next) => {
  // 1. Logging del error (mejorado)
  console.error(`[${new Date().toISOString()}] Error en ${req.method} ${req.path}:`, {
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      body: process.env.NODE_ENV === 'development' ? req.body : undefined
  });

  // 2. Determinar el código de estado HTTP
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  // 3. Manejo de errores específicos
  if (err.name === 'ValidationError') {
      statusCode = 400;
      message = 'Error de validación';
  } else if (err.code === 'LIMIT_FILE_SIZE') {
      statusCode = 413;
      message = 'El archivo excede el tamaño máximo permitido';
  }

  // 4. Construir respuesta de error
  const errorResponse = {
      status: 'error',
      code: statusCode,
      message,
      ...(process.env.NODE_ENV === 'development' && {
          error: err.message,
          stack: err.stack,
          type: err.name
      })
  };

  // 5. Enviar respuesta
  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;