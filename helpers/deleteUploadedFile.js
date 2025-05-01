/**
 * @file deleteUploadedFile.js
 * @description Helper para eliminar archivos subidos al servidor de manera segura
 * @module helpers/deleteUploadedFile
 * @requires fs
 * @requires path
 * @requires dotenv
 */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Elimina un archivo subido al servidor de forma asíncrona con manejo de errores
 * @function
 * @param {string|null} filename - Nombre del archivo a eliminar (opcional)
 * @param {string} uploadsPath - Ruta base donde se almacenan los archivos
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la operación
 * 
 * @example
 * // Ejemplo básico:
 * await deleteUploadedFile('imagen.jpg', './uploads/articles');
 * 
 * // Ejemplo con manejo de errores:
 * try {
 *   await deleteUploadedFile('imagen.jpg', './uploads');
 * } catch (error) {
 *   console.error('Fallo al eliminar:', error);
 * }
 */
module.exports = async (filename, uploadsPath) => {
    // Validación de parámetros
    if (!filename || filename === 'default.jpg') return false; // No eliminar el archivo por defecto
    if (!uploadsPath) throw new Error('La ruta de uploads es requerida');

    const filePath = path.join(uploadsPath, filename);
    
    try {
        // Verificación sincrónica de existencia
        //const fileExists = await fs.existsSync(filePath);
        try {
            await fs.promises.stat(filePath);
        } catch (error) {
            if (process.env.NODE_ENV !== 'test') {
                console.warn(`[DeleteFile] Archivo no encontrado: ${filename}`);
            }
            return false; // Retorna falso si el archivo no existe
        }
        

        // Eliminación asíncrona con promesa
        await fs.promises.unlink(filePath);
        if (process.env.NODE_ENV !== 'test') {
            console.log(`[DeleteFile] Archivo eliminado: ${filename}`);
        }

        return true;

    } catch (error) {
        console.error(`[DeleteFile] Error eliminando ${filename}:`, error);
        throw error; // Relanzar para manejo externo
    }
};