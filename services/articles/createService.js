/**
 * @file createService.js
 * @description Servicio para la creación de nuevos artículos
 * @module services/articles/createService
 * @requires ../../helpers/dataValidator
 * @requires ../../helpers/emptyChecker
 * @requires ../../helpers/createErrorResponse
 * @requires ../../models/Article
 */

const { dataValidator } = require("../../helpers/dataValidator");
const emptyChecker = require("../../helpers/emptyChecker");
const createErrorResponse = require("../../helpers/createErrorResponse");
const Article = require("../../models/Article");

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
    // 1. Validar campos obligatorios
    const emptyCheck = emptyChecker(data, ["title", "content"]);
    if (!emptyCheck.isValid) {
        return createErrorResponse(
            "error", 
            400, 
            "Campos requeridos faltantes", 
            { missingFields: emptyCheck.missingFields }
        );
    }

    // 2. Validar formato de datos
    const dataValidation = dataValidator(data);
    if (!dataValidation.isValid) {
        return createErrorResponse(
            "error",
            422, // 422 Unprocessable Entity
            "Datos no válidos",
            { validationErrors: dataValidation.errors }
        );
    }

    try {
        // 3. Crear y almacenar el artículo
        const articleStoraged = await Article.storageArticle(data);

        // 4. Retornar respuesta exitosa
        return {
            status: "success",
            code: 201, // 201 Created
            response: {
                status: "success",
                message: "Artículo creado correctamente",
                article: {
                    id: articleStoraged._id,
                    title: articleStoraged.title,
                    excerpt: articleStoraged.excerpt,
                    image: articleStoraged.image,
                    created_at: articleStoraged.created_at
                }
            }
        };

    } catch (error) {
        console.error("[createService] Error:", error);
        return createErrorResponse(
            "error",
            500,
            "Error al crear el artículo",
            process.env.NODE_ENV === 'development' ? { error: error.message } : null
        );
    }
};