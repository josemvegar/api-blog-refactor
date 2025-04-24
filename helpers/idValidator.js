/**
 * @file idValidator.js
 * @description Validador completo de IDs para MongoDB con verificación en base de datos
 * @module helpers/idValidator
 * @requires mongoose
 * @requires ../models/Article
 */

const mongoose = require('mongoose');
const Article = require('../models/Article');

/**
 * Valida un ID de MongoDB y verifica su existencia en la colección de artículos
 * @async
 * @function
 * @param {string} id - ID a validar
 * @returns {Promise<Object>} Resultado de la validación
 * @property {boolean} isValid - Indica si el ID es válido y existe
 * @property {string|null} [error] - Mensaje de error (solo si isValid es false)
 * @property {string} [errorType] - Tipo de error ('missing', 'format' o 'existence')
 * 
 * @example
 * // Ejemplo de uso:
 * const validation = await idValidator('5f8d0d55b54764421b7156c3');
 * if (!validation.isValid) {
 *   console.error(validation.error);
 * }
 */
module.exports = async (id) => {
    // Validación 1: Presencia del ID
    if (!id || typeof id !== 'string') {
        return {
            isValid: false,
            error: 'Debes enviar un ID válido',
            errorType: 'missing'
        };
    }

    // Validación 2: Formato del ID
    const isValidFormat = mongoose.isValidObjectId(id);
    if (!isValidFormat) {
        return {
            isValid: false,
            error: 'Formato de ID incorrecto (debe ser 24 caracteres hexadecimal)',
            errorType: 'format'
        };
    }

    // Validación 3: Existencia en la base de datos
    try {
        const exists = await Article.idExist(id);
        if (!exists) {
            return {
                isValid: false,
                error: 'El artículo solicitado no existe',
                errorType: 'existence'
            };
        }

        return { isValid: true };

    } catch (error) {
        console.error('[idValidator] Error al verificar ID:', error);
        return {
            isValid: false,
            error: 'Error al validar el ID',
            errorType: 'database_error'
        };
    }
};