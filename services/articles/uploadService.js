/**
 * @file uploadService.js
 * @description Servicio para manejo de archivos (subida y obtención)
 * @module services/articles/uploadService
 * @requires ../../helpers/dataValidator
 * @requires ../../helpers/createErrorResponse
 * @requires ../../helpers/idValidator
 * @requires ../../helpers/deleteUploadedFile
 * @requires path
 * @requires fs
 * @requires ../../models/Article
 */

const { dataValidator } = require("../../helpers/dataValidator");
const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const deleteUploadedFile = require("../../helpers/deleteUploadedFile");
const path = require("path");
const fs = require("fs").promises; // Usamos la versión con promesas
const Article = require("../../models/Article");

// Configuración de rutas
const UPLOADS_PATH = path.join(__dirname, '../../uploads/articles/');

/**
 * Actualiza la imagen de un artículo
 * @async
 * @function
 * @param {string} id - ID del artículo
 * @param {Object} fileData - Datos del archivo subido
 * @param {string} fileData.filename - Nombre generado del archivo
 * @param {string} fileData.originalname - Nombre original del archivo
 * @returns {Promise<Object>} Respuesta del servicio
 * 
 * @example
 * // Ejemplo de uso:
 * const result = await setFileService('123abc', {
 *   filename: 'article-123.jpg',
 *   originalname: 'imagen.jpg'
 * });
 */
const setFileService = async (id, fileData) => {
    // 1. Validar presencia de archivo
    if (!fileData || !fileData.filename) {
        return createErrorResponse(
            "error",
            400,
            "No se recibió ningún archivo válido"
        );
    }

    // 2. Validar ID del artículo
    const idValidation = await idValidator(id);
    if (!idValidation.isValid) {
        await deleteUploadedFile(fileData.filename, UPLOADS_PATH);
        return createErrorResponse(
            "error",
            400,
            idValidation.error || "ID de artículo inválido",
            { errorType: idValidation.errorType }
        );
    }

    // 3. Validar formato del nombre de archivo
    const fileNameValidation = dataValidator({ image: fileData.originalname });
    if (!fileNameValidation.isValid) {
        await deleteUploadedFile(fileData.filename, UPLOADS_PATH);
        return createErrorResponse(
            "error",
            400,
            "Nombre de archivo no válido",
            { 
                validationErrors: fileNameValidation.errors,
                receivedName: fileData.originalname
            }
        );
    }

    try {
        // 4. Actualizar artículo en la base de datos
        const articleUpdated = await Article.updateImage(id, fileData.filename);
        
        if (!articleUpdated) {
            await deleteUploadedFile(fileData.filename, UPLOADS_PATH);
            return createErrorResponse(
                "error",
                404,
                "El artículo no existe o no pudo actualizarse"
            );
        }

        // 5. Retornar respuesta exitosa
        return {
            status: "success",
            code: 200,
            response: {
                status: "success",
                message: "Imagen del artículo actualizada correctamente",
                article: {
                    id: articleUpdated._id,
                    title: articleUpdated.title,
                    image: articleUpdated.image,
                    created_at: articleUpdated.created_at
                }
            }
        };

    } catch (error) {
        // Limpieza en caso de error
        await deleteUploadedFile(fileData.filename, UPLOADS_PATH);
        console.error("[setFileService] Error:", error);
        return createErrorResponse(
            "error",
            500,
            "Error al actualizar la imagen del artículo",
            process.env.NODE_ENV === 'development' ? { 
                error: error.message,
                stack: error.stack
            } : null
        );
    }
};

/**
 * Obtiene la ruta de un archivo subido
 * @async
 * @function
 * @param {string} file - Nombre del archivo
 * @param {string} uploadsPath - Ruta base de uploads
 * @returns {Promise<string|Object>} Ruta absoluta del archivo o error
 * 
 * @example
 * // Ejemplo de uso:
 * const filePath = await getFileService('image.jpg', './uploads/articles');
 */
const getFileService = async (file, uploadsPath = UPLOADS_PATH) => {
    if (!file || typeof file !== 'string') {
        return createErrorResponse(
            "error",
            400,
            "Nombre de archivo no válido"
        );
    }

    try {
        const fullPath = path.join(uploadsPath, file);
        const absolutePath = path.resolve(fullPath);

        // Verificar que la ruta está dentro del directorio permitido
        if (!absolutePath.startsWith(path.resolve(uploadsPath))) {
            return createErrorResponse(
                "error",
                403,
                "Acceso al archivo no permitido"
            );
        }

        // Verificar existencia y permisos de lectura
        await fs.access(absolutePath, fs.constants.F_OK | fs.constants.R_OK);
        return absolutePath;

    } catch (error) {
        console.error("[getFileService] Error:", error);
        return createErrorResponse(
            "error",
            404,
            "El archivo solicitado no existe",
            process.env.NODE_ENV === 'development' ? { 
                attemptedPath: path.join(uploadsPath, file) 
            } : null
        );
    }
};

module.exports = {
    setFileService,
    getFileService
};