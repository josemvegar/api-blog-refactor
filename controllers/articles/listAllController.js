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
 * @param {express.Request} req - Request HTTP
 * @param {express.Response} res - Response HTTP
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