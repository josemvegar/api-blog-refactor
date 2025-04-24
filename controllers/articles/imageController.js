/**
 * @file imageController.js
 * @description Controlador para manejo de imágenes de artículos
 * @module controllers/articles/imageController
 * @requires ../../services/articles/uploadService
 * @requires path
 */

const { setFileService, getFileService } = require("../../services/articles/uploadService");
const path = require("path");

/**
 * Sube una imagen para un artículo
 * @async
 * @function
 * @param {express.Request} req - Request HTTP
 * @param {express.Response} res - Response HTTP
 */
const upload = async (req, res) => {
    try {
        const serviceResponse = await setFileService(req.params.id, req.file);
        return res.status(serviceResponse.code).json(serviceResponse.response);
    } catch (error) {
        console.error('[imageController/upload] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error al subir la imagen"
        });
    }
};

/**
 * Obtiene una imagen de artículo
 * @async
 * @function
 * @param {express.Request} req - Request HTTP
 * @param {express.Response} res - Response HTTP
 */
const getFile = async (req, res) => {
    const uploadsPath = path.join(__dirname, '../../uploads/articles/');

    try {
        const result = await getFileService(req.params.file, uploadsPath);
        
        if (result?.status === 'error') {
            return res.status(result.code).json(result.response);
        }

        return res.status(200).sendFile(result);
    } catch (error) {
        console.error('[imageController/getFile] Error:', error);
        return res.status(500).json({
            status: "error",
            message: "Error al obtener la imagen"
        });
    }
};

module.exports = { upload, getFile };