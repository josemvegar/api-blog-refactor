/**
 * @file multerConfig.js
 * @description Configuración esencial de Multer para uploads de archivos
 * @module helpers/multerConfig
 * @requires multer
 * @requires path
 * @requires fs
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Configuración básica de Multer para manejo de uploads
 * @function
 * @param {string} folderName - Nombre de subcarpeta en ./uploads/
 * @param {string} [filePrefix='file'] - Prefijo para nombres de archivo
 * @returns {multer.Multer} Instancia configurada de Multer
 * 
 * @example
 * // Uso básico:
 * const upload = multerConfig('articles', 'article');
 * router.post('/upload', upload.single('image'), handler);
 */
module.exports = (folderName, filePrefix = 'file') => {
    // 1. Validación básica de parámetros
    if (!folderName || typeof folderName !== 'string') {
        throw new Error('El nombre de carpeta debe ser un string válido');
    }

    // 2. Configuración de rutas
    const uploadPath = path.join(__dirname, '..', 'uploads', folderName);
    
    // Crear directorio si no existe (con recursividad)
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    // 3. Configuración mínima de Multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9-_.]/g, '');
            const extension = path.extname(file.originalname);
            const filename = `${filePrefix}-${Date.now()}-${sanitizedName}`;
            console.log(filename);
            cb(null, filename);
        }
    });

    return multer({ 
        storage,
        limits: {
            fileSize: 5 * 1024 * 1024 // Límite de 5MB (ajustable)
        }
    });
};