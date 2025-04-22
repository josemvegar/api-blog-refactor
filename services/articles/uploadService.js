const {dataValidator} = require("../../helpers/dataValidator");
const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const deleteUploadedFile = require("../../helpers/deleteUploadedFile");
const path = require("path");
const fs = require("fs");
const Article = require("../../models/Article");

const setFileService = async (id, data) => {
    const idValidation = await idValidator(id);
    const uploadsPath = path.join(__dirname, '../../uploads/articles/');

    if (!data){
        return createErrorResponse("error", 404, "No se ha encontrado el archivo.");
    }

    const fileName = {image: data.originalname};
    const dataValidation = dataValidator(fileName);

    if(idValidation !== true){
        deleteUploadedFile(data.filename, uploadsPath);
        return createErrorResponse("error", 400, idValidation);
    }

    if(dataValidation !== true){
        deleteUploadedFile(data.filename, uploadsPath); 
        return createErrorResponse("error", 400, "Validación no pasada.", dataValidation);
    }

    const articleUpdated = await Article.updateImage(id, data.filename);

    return {
        status: "success",
        code: 200,
        response: {
            status: "success",
            message: "Articulo actualizado correctamente.",
            article: articleUpdated
        }
    };
}

const getFileService = async (file, uploadsPath) => {
    if (!file) {
        return createErrorResponse("error", 404, "No se ha encontrado el archivo.");
    }

    const fullPath = path.join(uploadsPath, file);
    const absolutePath = path.resolve(fullPath);
    
    try {
        // Solo verifica existencia (sin comprobar permisos)
        await fs.promises.access(absolutePath, fs.constants.F_OK | fs.constants.R_OK);
        return path.resolve(absolutePath);
    } catch (error) {
        return createErrorResponse("error", 404, "No se ha encontrado el archivo.");
    }
};

module.exports = {
    setFileService,
    getFileService
};