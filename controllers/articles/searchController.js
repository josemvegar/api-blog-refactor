/**
 * @file searchController.js
 * @description Controlador para búsqueda de artículos
 * @module controllers/articles/searchController
 * @requires ../../services/articles/searchService
 */

const searchService = require('../../services/articles/searchService');

/**
 * Busca artículos por término
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {Promise<import('express').Response>} Respuesta HTTP con formato estándar
 */
module.exports = async (req, res) => {
    try {
        const serviceResponse = await searchService(req.params.key);
        return res.status(serviceResponse.code).json(serviceResponse.response);
    } catch (error) {
        console.error('[searchController] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error al realizar la búsqueda"
        });
    }
};