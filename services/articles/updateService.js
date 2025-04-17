const {dataValidator} = require("../../helpers/dataValidator");
const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const Article = require("../../models/Article");

module.exports = async (id, data) => {
    const idValidation = await idValidator(id);
    const dataValidation = dataValidator(data);

    if(idValidation !== true){
        return createErrorResponse("error", 400, idValidation);
    }

    if(dataValidation !== true){
        return createErrorResponse("error", 400, "Validación no pasada.", dataValidation);
    }

    const articleUpdated = await Article.updateArticle(id, data);

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