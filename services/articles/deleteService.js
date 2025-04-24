/**
 * @file deleteService.js
 * @description Servicio para eliminar artículos
 * @module services/articles/deleteService
 * @requires ../../helpers/createErrorResponse
 * @requires ../../helpers/idValidator
 * @requires ../../models/Article
 */

const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const Article = require("../../models/Article");

/**
 * Servicio para eliminar un artículo
 * @async
 * @function
 * @param {string} id - ID del artículo a eliminar
 * @returns {Promise<Object>} Respuesta del servicio
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await deleteService('60d21b4667d0d8992e610c85');
 * if (result.status === 'error') {
 *   console.error(result.response.message);
 * }
 */
module.exports = async (id) => {
    // 1. Validar el ID
    const idValidation = await idValidator(id);
    if (!idValidation.isValid) {
        return createErrorResponse(
            "error",
            400,
            idValidation.error || "ID inválido",
            { errorType: idValidation.errorType }
        );
    }

    try {
        // 2. Eliminar el artículo
        const articleDeleted = await Article.deleteArticle(id);
        
        if (!articleDeleted) {
            return createErrorResponse(
                "error",
                404,
                "El artículo no existe o ya fue eliminado"
            );
        }

        // 3. Retornar respuesta exitosa
        return {
            status: "success",
            code: 200,
            response: {
                status: "success",
                message: "Artículo eliminado correctamente",
                deletedId: articleDeleted._id,
                deletedAt: new Date()
            }
        };

    } catch (error) {
        console.error("[deleteService] Error:", error);
        return createErrorResponse(
            "error",
            500,
            "Error al eliminar el artículo",
            process.env.NODE_ENV === 'development' ? { error: error.message } : null
        );
    }
};