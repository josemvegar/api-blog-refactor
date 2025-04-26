/**
 * @file deleteController.js
 * @description Controlador para eliminar artículos
 * @module controllers/articles/deleteController
 * @requires ../../services/articles/deleteService
 */

const deleteService = require("../../services/articles/deleteService");

/**
 * Elimina un artículo por ID
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {Promise<import('express').Response>} Respuesta HTTP con formato estándar
 */
module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const serviceResponse = await deleteService(id);
        return res.status(serviceResponse.code).json(serviceResponse.response);
    } catch (error) {
        console.error('[deleteController] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error interno al eliminar el artículo",
            ...(process.env.NODE_ENV === 'development' && { error: error.message })
        });
    }
};