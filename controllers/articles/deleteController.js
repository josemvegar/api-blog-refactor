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
 * @param {express.Request} req - Request HTTP
 * @param {express.Response} res - Response HTTP
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