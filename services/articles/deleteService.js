const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const Article = require("../../models/Article");

module.exports = async (id) => {
    const idValidation = await idValidator(id);

    if(idValidation !== true){
        return createErrorResponse("error", 400, idValidation);
    }

    const articleDeleted = await Article.deleteArticle(id);

    return {
        status: "success",
        code: 200,
        response: {
            status: "success",
            message: "Articulo eliminado correctamente.",
            article: articleDeleted
        }
    };

}