/**
 * @file listService.js
 * @description Servicio para listado de artículos (paginado y detalle)
 * @module services/articles/listService
 * @requires ../../helpers/createErrorResponse
 * @requires ../../helpers/idValidator
 * @requires ../../models/Article
 * @requires dotenv
 */

const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const Article = require("../../models/Article");
const dotenv = require('dotenv');
dotenv.config();

/**
 * Obtiene listado paginado de artículos
 * @async
 * @function
 * @param {number} [page=1] - Número de página
 * @returns {Promise<Object>} Respuesta con paginación y artículos
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await listAll(2);
 * console.log(result.response.articles);
 */
const listAll = async (page = 1) => {
    // Configuración desde .env
    const ITEMS_PER_PAGE = parseInt(process.env.ITEMS_PER_PAGE) || 10;
    const DOMAIN = process.env.DOMAIN || "http://localhost:";
    const PORT = process.env.PORT || 3001;
    const LIST_USER_URL = process.env.LIST_USER_URL || '/api/v1/article/list/';
    const BASE_URL = `${DOMAIN}${PORT}${LIST_USER_URL}`;

    try {
        // Validar y normalizar página
        page = Math.max(1, parseInt(page) || 1);

        const articles = await Article.findAllArticles(page, ITEMS_PER_PAGE);

        if (!articles || articles.totalDocs === 0 || articles.docs.length === 0) {
            return createErrorResponse(
                "error", 
                404, 
                "No hay artículos disponibles",
                { suggestion: "Intenta con una página diferente" }
            );
        }

        // Construir URLs para paginación
        const buildPageUrl = (pageNum) => 
            `${BASE_URL}${pageNum}`;

        return {
            status: "success",
            code: 200,
            response: {
                status: "success",
                totalItems: articles.totalDocs,
                itemsPerPage: ITEMS_PER_PAGE,
                currentPage: articles.page,
                totalPages: articles.totalPages,
                nextPage: articles.hasNextPage ? buildPageUrl(articles.nextPage) : null,
                prevPage: articles.hasPrevPage ? buildPageUrl(articles.prevPage) : null,
                articles: articles.docs.map(article => ({
                    id: article._id,
                    title: article.title,
                    excerpt: article.excerpt,
                    image: article.image,
                    created_at: article.created_at
                }))
            }
        };

    } catch (error) {
        console.error("[listAllService] Error:", error);
        return createErrorResponse(
            "error",
            500,
            "Error al obtener los artículos",
            process.env.NODE_ENV === 'development' ? { error: error.message } : null
        );
    }
};

/**
 * Obtiene un artículo específico por ID
 * @async
 * @function
 * @param {string} id - ID del artículo
 * @returns {Promise<Object>} Respuesta con el artículo solicitado
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await listOne('60d21b4667d0d8992e610c85');
 */
const listOne = async (id) => {
    try {
        // Validación de ID
        const idValidation = await idValidator(id);
        if (!idValidation.isValid) {
            return createErrorResponse(
                "error",
                400,
                idValidation.error || "ID inválido",
                { errorType: idValidation.errorType }
            );
        }

        // Buscar artículo
        const article = await Article.findOneArticle(id);
        if (!article) {
            return createErrorResponse(
                "error",
                404,
                "El artículo solicitado no existe",
                { suggestion: "Verifica el ID o intenta con otro artículo" }
            );
        }

        // Formatear respuesta
        return {
            status: "success",
            code: 200,
            response: {
                status: "success",
                article: {
                    id: article._id,
                    title: article.title,
                    content: article.content,
                    excerpt: article.excerpt,
                    image: article.image,
                    created_at: article.created_at
                }
            }
        };

    } catch (error) {
        console.error("[listOneService] Error:", error);
        return createErrorResponse(
            "error",
            500,
            "Error al obtener el artículo",
            process.env.NODE_ENV === 'development' ? { error: error.message } : null
        );
    }
};

module.exports = {
    listAll,
    listOne
};