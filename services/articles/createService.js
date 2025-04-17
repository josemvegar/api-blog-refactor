const {dataValidator} = require("../../helpers/dataValidator");
const emptyChecker = require("../../helpers/emptyChecker");
const createErrorResponse = require("../../helpers/createErrorResponse");
const Article = require("../../models/Article");

module.exports = async (data) => {
    
    const dataValidation = dataValidator(data); // Validamos los datos
    const emptyFields = emptyChecker(data, ["title", "content"]); // Comprobamos si hay campos vacíos

    if(emptyFields !== true){
        return createErrorResponse("error", 400, "Faltan datos.", emptyFields);
    }

    if(dataValidation !== true){
        return createErrorResponse("error", 400, "Validación no pasada.", dataValidation);
    }

    const articleStoraged = await Article.storageArticle(data);

    return {
        status: "success",
        code: 200,
        response: {
            status: "success",
            message: "Articulo creado correctamente.",
            article: articleStoraged
        }
    };

}