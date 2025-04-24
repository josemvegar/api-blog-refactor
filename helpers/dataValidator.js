/**
 * @file dataValidator.js
 * @description Módulo para validar datos de artículos usando Validator.js y reglas personalizadas
 * @module helpers/dataValidator
 * @requires validator
 */

const validator = require('validator');
const { isURL } = require('validator');

/**
 * @typedef ValidationRules
 * @type {Object}
 * @property {Function} title - Valida el título del artículo
 * @property {Function} content - Valida el contenido del artículo
 * @property {Function} excerpt - Valida el extracto del artículo
 * @property {Function} image - Valida el nombre/URL de la imagen
 * @property {Function} created_at - Valida la fecha de creación
 */

/**
 * Reglas de validación para artículos
 * @type {ValidationRules}
 */
const validations = {
  title: (value) => 
    validator.isLength(value, { min: 5, max: 120 }) &&
    !validator.contains(value, '<script>'),

  content: (value) => 
    validator.isLength(value, { min: 50 }) &&
    !validator.contains(value, '<script>'),

  excerpt: (value) => 
    validator.isLength(value, { max: 200 }) &&
    !validator.contains(value, '<script>'),

  image: (value) => 
    validator.matches(value, /\.(jpe?g|png|gif|webp)$/i) ||
    isURL(value, { protocols: ['http', 'https'], require_protocol: true }),

  created_at: (value) => 
    validator.isISO8601(value) || 
    validator.isDate(value, { format: 'YYYY-MM-DD' })
};

/**
 * Mensajes de error personalizados para cada regla
 * @type {Object}
 */
const errorMessages = {
  title: 'Debe tener entre 5-120 caracteres y no contener scripts',
  content: 'Debe tener al menos 50 caracteres y no contener scripts',
  excerpt: 'Máximo 200 caracteres y no contener scripts',
  image: 'Debe ser una imagen válida (jpg/png/gif/webp) o URL',
  created_at: 'Debe ser una fecha válida (formato: YYYY-MM-DD o ISO8601)'
};

/**
 * Valida los datos de un artículo según las reglas definidas
 * @function
 * @param {Object} data - Datos del artículo a validar
 * @returns {Object} Resultado de la validación
 * @property {boolean} isValid - Indica si la validación fue exitosa
 * @property {Array<string>} [errors] - Mensajes de error (solo si isValid es false)
 * 
 * @example
 * const result = dataValidator({
 *   title: "Mi artículo",
 *   content: "Contenido aquí..."
 * });
 * 
 * if (!result.isValid) {
 *   console.error(result.errors);
 * }
 */
const dataValidator = (data) => {
  const errors = Object.keys(validations).reduce((acc, key) => {
    if (data[key] !== undefined && !validations[key](data[key])) {
      acc.push({
        field: key,
        value: data[key],
        message: errorMessages[key]
      });
    }
    return acc;
  }, []);

  return {
    isValid: errors.length === 0,
    ...(errors.length > 0 && { errors })
  };
};

module.exports = { 
  dataValidator,
  articleValidationRules: validations // Exportar reglas para uso externo
};