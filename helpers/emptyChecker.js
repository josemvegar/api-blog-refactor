/**
 * @file emptyChecker.js
 * @description Módulo para verificación avanzada de campos obligatorios y valores vacíos
 * @module helpers/emptyChecker
 */

/**
 * Verifica campos obligatorios y valida valores no vacíos
 * @function
 * @param {Object} data - Objeto con datos a validar
 * @param {Array<string>} [fields=[]] - Campos obligatorios
 * @param {Object} [options={}] - Opciones de validación
 * @param {boolean} [options.checkEmptyStrings=true] - Verifica strings vacíos
 * @param {boolean} [options.checkNull=true] - Verifica valores null
 * @param {boolean} [options.checkUndefined=true] - Verifica valores undefined
 * @returns {Object} Resultado de la validación
 * @property {boolean} isValid - Indica si pasa la validación
 * @property {Array<string>} [missingFields] - Campos faltantes
 * @property {Array<string>} [emptyFields] - Campos con valores vacíos
 * 
 * @example
 * // Ejemplo básico:
 * const result = emptyChecker({ title: "Hola", content: "" }, ["title", "content"]);
 * 
 * // Ejemplo con opciones:
 * const result = emptyChecker(
 *   { title: "Hola", excerpt: null },
 *   ["title", "excerpt"],
 *   { checkNull: true, checkEmptyStrings: false }
 * );
 */
const emptyChecker = (data = {}, fields = [], options = {}) => {
  const {
      checkEmptyStrings = true,
      checkNull = true,
      checkUndefined = true
  } = options;

  const missingFields = [];
  const emptyFields = [];

  fields.forEach(field => {
      // Verificar existencia del campo
      if (!data.hasOwnProperty(field)) {
          missingFields.push(field);
          return;
      }

      const value = data[field];
      
      // Verificar valores vacíos según configuracion
      if (
          (checkUndefined && value === undefined) ||
          (checkNull && value === null) ||
          (checkEmptyStrings && typeof value === 'string' && value.trim() === '')
      ) {
          emptyFields.push(field);
      }
  });

  return {
      isValid: missingFields.length === 0 && emptyFields.length === 0,
      ...(missingFields.length > 0 && { 
          missingFields,
          missingMessages: missingFields.map(f => `Campo faltante: ${f}`) 
      }),
      ...(emptyFields.length > 0 && { 
          emptyFields,
          emptyMessages: emptyFields.map(f => `Campo vacío: ${f}`) 
      })
  };
};

module.exports = emptyChecker;