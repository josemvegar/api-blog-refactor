/**
 * @file createErrorResponse.js
 * @description Helper para crear respuestas de error estandarizadas
 * @module helpers/createErrorResponse
 */

/**
 * Crea un objeto de respuesta de error estructurado
 * @param {string} status - Estado general (ej: "error", "fail")
 * @param {number} code - Código HTTP de estado
 * @param {string} message - Mensaje descriptivo del error
 * @param {Object|string|null} [details=null] - Detalles adicionales del error (opcional)
 * @returns {Object} Objeto de respuesta estandarizado
 * 
 * @example
 * // Ejemplo básico:
 * createErrorResponse("error", 404, "Artículo no encontrado");
 * 
 * // Ejemplo con detalles:
 * createErrorResponse("error", 400, "Validación fallida", {
 *   fields: { title: "El título es requerido" }
 * });
 * 
 * // Estructura de retorno:
 * // {
 * //   status: "error",
 * //   code: 404,
 * //   response: {
 * //     status: "error",
 * //     message: "Artículo no encontrado",
 * //     details: { ... } // Solo si se proporciona
 * //   }
 * // }
 */
module.exports = (status, code, message, details = null) => {
  // Validación básica de parámetros requeridos
  if (!status || !code || !message) {
      throw new Error("Parámetros status, code y message son requeridos");
  }

  return {
      status,
      code,
      response: {
          status: "error", // Forzamos status:error en la respuesta interna
          message,
          ...(details && { details }) // Spread condicional para detalles
      }
  };
};