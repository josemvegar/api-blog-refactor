const createErrorResponse = require("../../helpers/createErrorResponse");
const Article = require("../../models/Article");

module.exports = async (key) => {

    const searchResult = await Article.searchArticle(key);

    if (searchResult.length === 0) {
        return createErrorResponse("error", 404, "No se han encontrado resultados.");
    }

    return {
        status: "success",
        code: 200,
        response: {
            status: "success",
            message: "Resultados de la búsqueda: " + key,
            total: searchResult.length,
            result: searchResult
        }
    };

}