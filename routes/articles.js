const {Router} = require("express");
const router = Router();
const mulerConfig = require("../helpers/multerConfig");

const articleUpload = mulerConfig('articles', 'article');

// Rutas de Prueba:
router.get("/test" , (req, res) => {
    return res.status(200).json({
        message: "Hola desde una ruta de prueba"
    });
});

// Ruta Útil:
const create = require("../controllers/articles/createController");
router.post("/create" , create);

const update = require("../controllers/articles/updateController");
router.put("/update/:id?" , update);

const _delete = require("../controllers/articles/deleteController");
router.delete("/delete/:id?" , _delete);

const listAll = require("../controllers/articles/listAllController");
router.get("/list/:page?" , listAll);

const listOne = require("../controllers/articles/listOneController");
router.get("/one/:id?" , listOne);

const {upload, getFile} = require("../controllers/articles/imageController");
router.post("/upload/:id?", articleUpload.single("file0"), upload);
router.get("/image/:file?" , getFile);

// BUSCADOR
const searchController = require("../controllers/articles/searchController");
router.get("/search/:key" , searchController);

module.exports = router;