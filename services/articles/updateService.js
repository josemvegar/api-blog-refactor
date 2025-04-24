/**
 * @file updateService.js
 * @description Servicio para actualización de artículos
 * @module services/articles/updateService
 * @requires ../../helpers/dataValidator
 * @requires ../../helpers/createErrorResponse
 * @requires ../../helpers/idValidator
 * @requires ../../models/Article
 */

const { dataValidator } = require("../../helpers/dataValidator");
const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const Article = require("../../models/Article");

/**
 * Servicio para actualizar un artículo existente
 * @async
 * @function
 * @param {string} id - ID del artículo a actualizar
 * @param {Object} data - Campos a actualizar
 * @param {string} [data.title] - Nuevo título (opcional)
 * @param {string} [data.content] - Nuevo contenido (opcional)
 * @param {string} [data.excerpt] - Nuevo extracto (opcional)
 * @param {string} [data.image] - Nueva imagen (opcional)
 * @returns {Promise<Object>} Respuesta del servicio
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await updateService('60d21b4667d0d8992e610c85', {
 *   title: "Nuevo título",
 *   content: "Contenido actualizado"
 * });
 */
module.exports = async (id, data) => {
    // 1. Validar ID del artículo
    const idValidation = await idValidator(id);
    if (!idValidation.isValid) {
        return createErrorResponse(
            "error",
            400,
            idValidation.error || "ID inválido",
            { errorType: idValidation.errorType }
        );
    }

    // 2. Validar datos de actualización
    const dataValidation = dataValidator(data);
    if (!dataValidation.isValid) {
        return createErrorResponse(
            "error",
            422, // 422 Unprocessable Entity
            "Datos de actualización no válidos",
            { 
                validationErrors: dataValidation.errors,
                receivedData: data 
            }
        );
    }

    try {
        // 3. Actualizar artículo
        const articleUpdated = await Article.updateArticle(id, data);
        
        if (!articleUpdated) {
            return createErrorResponse(
                "error",
                404,
                "El artículo no existe o no pudo actualizarse"
            );
        }

        // 4. Retornar respuesta exitosa
        return {
            status: "success",
            code: 200,
            response: {
                status: "success",
                message: "Artículo actualizado correctamente",
                article: {
                    id: articleUpdated._id,
                    title: articleUpdated.title,
                    excerpt: articleUpdated.excerpt,
                    image: articleUpdated.image,
                    created_at: articleUpdated.created_at
                }
            }
        };

    } catch (error) {
        console.error("[updateService] Error:", error);
        return createErrorResponse(
            "error",
            500,
            "Error al actualizar el artículo",
            process.env.NODE_ENV === 'development' ? { 
                error: error.message,
                stack: error.stack
            } : null
        );
    }
};