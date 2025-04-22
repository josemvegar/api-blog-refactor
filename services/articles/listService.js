const createErrorResponse = require("../../helpers/createErrorResponse");
const idValidator = require("../../helpers/idValidator");
const Article = require("../../models/Article");
const dotenv = require('dotenv');
dotenv.config();

const listAll = async (page = null) => {

    if (!page || page < 1){
        page = 1;
    }

    const ITEMS_PER_PAGE = process.env.ITEMS_PER_PAGE || 5;
    const DOMAIN = process.env.DOMAIN || "http://localhost:";
    const PORT = process.env.PORT || 3001;
    const URL = DOMAIN + PORT + process.env.LIST_USER_URL;

    const articles = await Article.findAllArticles(page, ITEMS_PER_PAGE);

    if(!articles || articles.totalDocs === 0){
        return createErrorResponse("error", 404, "No hay articulos para mostrar.");
    }

    return {
        status: "success",
        code: 200,
        response: {
            status: "success",
            total: articles.totalDocs,
            totalPages: articles.totalPages,
            page: articles.page,
            next: articles.hasNextPage ? URL + articles.nextPage : null,
            prev: articles.hasPrevPage ? URL + articles.prevPage : null,
            articles: articles.docs,
        }
    };

}

const listOne = async (id) => {
    const idResult = await idValidator(id);
    if (idResult !== true){
        return createErrorResponse("error", 404, idResult);
    }

    const article = await Article.findOneArticle(id);
    if (!article){
        return createErrorResponse("error", 404, "No existe el articulo solicitado.");
    }

    return {
        status: "success",
        code: 200,
        response: {
            article: article
        }
    };

}

module.exports = {
    listAll,
    listOne
};