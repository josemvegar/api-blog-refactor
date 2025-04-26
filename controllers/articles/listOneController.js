/**
 * @file listOneController.js
 * @description Controlador para obtener un artículo específico
 * @module controllers/articles/listOneController
 * @requires ../../services/articles/listService
 */

const { listOne } = require("../../services/articles/listService");

/**
 * Obtiene un artículo por ID
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {Promise<import('express').Response>} Respuesta HTTP con formato estándar
 */
module.exports = async (req, res) => {
    try {
        const serviceResponse = await listOne(req.params.id);
        return res.status(serviceResponse.code).json(serviceResponse.response);
    } catch (error) {
        console.error('[listOneController] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error al obtener el artículo"
        });
    }
};