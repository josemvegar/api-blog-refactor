/**
 * @file searchService.js
 * @description Servicio para búsqueda de artículos
 * @module services/articles/searchService
 * @requires ../../helpers/createErrorResponse
 * @requires ../../models/Article
 */

const articleRepository = require('../../repositories/articleRepository');
const createErrorResponse = require('../../helpers/createErrorResponse');

/**
 * Servicio para buscar artículos por término
 * @async
 * @function
 * @param {string} key - Término de búsqueda
 * @returns {Promise<Object>} Resultados de búsqueda o error
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await searchService("tecnología");
 * if (result.status === "success") {
 *   console.log(result.response.result);
 * }
 */
module.exports = async (key) => {
    // Validación básica del término de búsqueda
    if (!key || typeof key !== 'string' || key.trim().length < 3) {
        return createErrorResponse(
            'error',
            400,
            'El término de búsqueda debe tener al menos 3 caracteres'
        );
    }

    try {
        const searchResult = await articleRepository.search(key.trim());

        if (searchResult.length === 0) {
            return createErrorResponse(
                'error',
                404,
                'No se encontraron artículos',
                {
                    suggestion: 'Intenta con términos diferentes',
                    searchedTerm: key
                }
            );
        }

        // Formatear resultados para respuesta
        const formattedResults = searchResult.map(article => ({
            id: article._id,
            title: article.title,
            content: article.content,
            excerpt: article.excerpt,
            image: article.image,
            created_at: article.created_at,
            // Campo adicional que muestra coincidencias
            matchPreview: article.content.substring(0, 100) + '...' 
        }));

        return {
            status: 'success',
            code: 200,
            response: {
                status: 'success',
                message: `Búsqueda: "${key}"`,
                total: searchResult.length,
                results: formattedResults
            }
        };

    } catch (error) {
        console.error('[searchService] Error:', error);
        return createErrorResponse(
            'error',
            500,
            'Error al realizar la búsqueda',
            process.env.NODE_ENV === 'development' ? { error: error.message } : null
        );
    }
};