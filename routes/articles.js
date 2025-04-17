const {Router} = require("express");
const router = Router();

const multer = require("multer");
// Crear el almacenamiento (Configurar donde se guardan las imagenes)
const almacenamiento = multer.diskStorage({
    destination: function (req, file, cb) { //cb indica cual es el destino de la subida
        cb(null, './imagenes/articulos/'); // El primer parametro siempre es null
    },
    filename:  function (req, file, cb) {
        cb(null, "articulo" + Date.now() + file.originalname)
    }
});
// Le indicamos a multer cual es el almacenamiento
const subidas = multer({storage: almacenamiento})

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

/*router.get("/articulos/:ultimos?" , ArticuloController.listar)
router.get("/articulo/:id" , ArticuloController.unArticulo);
router.delete("/articulo/:id" , ArticuloController.borrar);*/

// En esta ruta indicamos un middleware antes de que se ejecute la ruta, diciendo que_
//subidas es donde está configurado el multer
// single, porque es un solo archivo
// "file0" es el nombre del parametro recibido por post
/*router.post("/subir-imagen/:id", [subidas.single("file0")] , ArticuloController.subirArchivo);
router.get("/imagen/:fichero" , ArticuloController.imagen);

// BUSCADOR
router.get("/buscar/:key" , ArticuloController.buscador);*/

module.exports = router;