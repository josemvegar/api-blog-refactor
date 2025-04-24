/**
 * @file articles.js
 * @description Rutas para el manejo de artículos (CRUD, imágenes y búsqueda)
 * @module routes/articles
 * @requires express
 * @requires ../helpers/multerConfig
 * @requires ../controllers/articles/*
 */

const { Router } = require("express");
const router = Router();
const multerConfig = require("../helpers/multerConfig");

// Configuración de Multer para uploads de imágenes
const articleUpload = multerConfig('articles', 'article');

// =============================================
//  RUTAS DE PRUEBA/DEBUG
// =============================================

/**
 * Ruta de prueba para verificar funcionamiento básico
 * @name GET /test
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @returns {Object} Mensaje de confirmación
 */
router.get("/test", (req, res) => {
    return res.status(200).json({
        message: "Hola desde una ruta de prueba",
        status: "success"
    });
});

// =============================================
//  RUTAS CRUD PRINCIPALES
// =============================================

/**
 * @typedef {Object} ArticleRoutes
 * @property {Function} create - Crear artículo
 * @property {Function} update - Actualizar artículo
 * @property {Function} delete - Eliminar artículo
 * @property {Function} listAll - Listar artículos paginados
 * @property {Function} listOne - Obtener un artículo específico
 */

// CREATE
const create = require("../controllers/articles/createController");
/**
 * Crear nuevo artículo
 * @name POST /create
 * @function
 * @memberof module:routes/articles~ArticleRoutes
 */
router.post("/create", create);

// UPDATE
const update = require("../controllers/articles/updateController");
/**
 * Actualizar artículo existente
 * @name PUT /update/:id?
 * @function
 * @memberof module:routes/articles~ArticleRoutes
 * @param {string} id - ID del artículo (opcional)
 */
router.put("/update/:id?", update);

// DELETE
const _delete = require("../controllers/articles/deleteController");
/**
 * Eliminar artículo
 * @name DELETE /delete/:id?
 * @function
 * @memberof module:routes/articles~ArticleRoutes
 * @param {string} id - ID del artículo (opcional)
 */
router.delete("/delete/:id?", _delete);

// READ
const listAll = require("../controllers/articles/listAllController");
/**
 * Listar artículos (paginado)
 * @name GET /list/:page?
 * @function
 * @memberof module:routes/articles~ArticleRoutes
 * @param {number} page - Número de página (opcional)
 */
router.get("/list/:page?", listAll);

const listOne = require("../controllers/articles/listOneController");
/**
 * Obtener un artículo específico
 * @name GET /one/:id?
 * @function
 * @memberof module:routes/articles~ArticleRoutes
 * @param {string} id - ID del artículo (opcional)
 */
router.get("/one/:id?", listOne);

// =============================================
//  RUTAS DE IMÁGENES
// =============================================

/**
 * @typedef {Object} ImageRoutes
 * @property {Function} upload - Subir imagen
 * @property {Function} getFile - Obtener imagen
 */

const { upload, getFile } = require("../controllers/articles/imageController");
/**
 * Subir imagen para artículo
 * @name POST /upload/:id?
 * @function
 * @memberof module:routes/articles~ImageRoutes
 * @param {string} id - ID del artículo (opcional)
 * @middleware multer - Manejo de archivos
 */
router.post("/upload/:id?", articleUpload.single("file0"), upload);

/**
 * Obtener imagen de artículo
 * @name GET /image/:file?
 * @function
 * @memberof module:routes/articles~ImageRoutes
 * @param {string} file - Nombre del archivo (opcional)
 */
router.get("/image/:file?", getFile);

// =============================================
//  RUTA DE BÚSQUEDA
// =============================================

const searchController = require("../controllers/articles/searchController");
/**
 * Buscar artículos por término
 * @name GET /search/:key
 * @function
 * @param {string} key - Término de búsqueda
 */
router.get("/search/:key", searchController);

module.exports = router;