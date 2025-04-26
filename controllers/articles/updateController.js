/**
 * @file updateController.js
 * @description Controlador para actualizar artículos
 * @module controllers/articles/updateController
 * @requires ../../services/articles/updateService
 */

const updateService = require("../../services/articles/updateService");

/**
 * Actualiza un artículo por ID
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {Promise<import('express').Response>} Respuesta HTTP con formato estándar
 */
module.exports = async (req, res) => {
    try {
        const serviceResponse = await updateService(req.params.id, req.body);
        return res.status(serviceResponse.code).json(serviceResponse.response);
    } catch (error) {
        console.error('[updateController] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error al actualizar el artículo"
        });
    }
};