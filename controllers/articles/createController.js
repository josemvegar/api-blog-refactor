/**
 * @file createController.js
 * @description Controlador para la creación de nuevos artículos
 * @module controllers/articles/createController
 * @requires ../../services/articles/createService
 */

const createService = require('../../services/articles/createService');

/**
 * @typedef {Object} ArticleData
 * @property {string} title - Título del artículo
 * @property {string} content - Contenido del artículo
 * @property {string} [excerpt] - Resumen opcional
 * @property {string} [image] - Imagen opcional (default: "default.jpg")
 */

/**
 * Controlador para creación de artículos
 * @async
 * @function
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {Promise<import('express').Response>} Respuesta HTTP con formato estándar
 * @throws {Error} Si ocurre un error no controlado (500 Internal Server Error)
 * 
 * @example
 * // Ejemplo de solicitud POST:
 * // Ruta: /api/v1/article/create
 * // Body: { 
 * //   title: "Nuevo artículo", 
 * //   content: "Contenido del artículo...",
 * //   excerpt: "Resumen opcional"
 * // }
 */
module.exports = async (req, res) => {
    const data = req.body;

    try {
        const serviceResponse = await createService(data);
        return res.status(serviceResponse.code).json(serviceResponse.response);
        
    } catch (error) {
        console.error('[CreateController] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error interno del servidor",
            ...(process.env.NODE_ENV === 'development' && { 
                details: error.message,
                stack: error.stack 
            })
        });
    }
};