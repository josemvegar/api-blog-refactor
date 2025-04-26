/**
 * @file listAllController.js
 * @description Controlador para listar artículos paginados
 * @module controllers/articles/listAllController
 * @requires ../../services/articles/listService
 */

const { listAll } = require("../../services/articles/listService");

/**
 * Obtiene listado paginado de artículos
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {Promise<import('express').Response>} Respuesta HTTP con formato estándar
 */
module.exports = async (req, res) => {
    try {
        const serviceResponse = await listAll(req.params.page);
        return res.status(serviceResponse.code).json(serviceResponse.response);
    } catch (error) {
        console.error('[listAllController] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error al obtener los artículos"
        });
    }
};