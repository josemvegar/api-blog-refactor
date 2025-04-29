/**
 * @file createService.js
 * @description Servicio para la creación de nuevos artículos
 * @module services/articles/createService
 * @requires ../../helpers/dataValidator
 * @requires ../../helpers/emptyChecker
 * @requires ../../helpers/createErrorResponse
 * @requires ../../models/Article
 */

const articleRepository = require('../../repositories/articleRepository');
const { dataValidator } = require('../../helpers/dataValidator');
const emptyChecker = require('../../helpers/emptyChecker');
const createErrorResponse = require('../../helpers/createErrorResponse');

/**
 * Servicio para crear un nuevo artículo
 * @async
 * @function
 * @param {Object} data - Datos del artículo a crear
 * @param {string} data.title - Título del artículo
 * @param {string} data.content - Contenido del artículo
 * @param {string} [data.excerpt] - Extracto del artículo (opcional)
 * @param {string} [data.image] - Imagen del artículo (opcional)
 * @returns {Promise<Object>} Respuesta del servicio
 * @throws {Error} Si ocurre un error durante la creación
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await createService({
 *   title: "Nuevo artículo",
 *   content: "Contenido detallado...",
 *   excerpt: "Resumen breve"
 * });
 */  
module.exports = async (data) => {
    const emptyCheck = emptyChecker(data, ['title', 'content']);
    if (!emptyCheck.isValid) {
        return createErrorResponse(
            'error',
            400,
            'Campos requeridos faltantes',
            { missingFields: emptyCheck.missingFields,
              emptyFields: emptyCheck.emptyFields }
        );
    }

    const dataValidation = dataValidator(data);
    if (!dataValidation.isValid) {
        return createErrorResponse(
            'error',
            422,
            'Datos no válidos',
            { validationErrors: dataValidation.errors }
        );
    }

    try {
        const articleStoraged = await articleRepository.create(data);
        return {
            status: 'success',
            code: 201,
            response: {
                status: 'success',
                message: 'Artículo creado correctamente',
                article: {
                    id: articleStoraged._id,
                    title: articleStoraged.title,
                    content: articleStoraged.content,
                    excerpt: articleStoraged.excerpt,
                    image: articleStoraged.image,
                    created_at: articleStoraged.created_at
                }
            }
        };
    } catch (error) {
        if (process.env.NODE_ENV !== 'test'){
            console.error('[createService] Error:', error);
        }
        return createErrorResponse(
            'error',
            500,
            'Error al crear el artículo',
            process.env.NODE_ENV === 'development' ? { error: error.message } : null
        );
    }
};