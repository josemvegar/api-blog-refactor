const { Schema, model } = require("mongoose");
const paginate = require('mongoose-paginate-v2');

// Se puede hacer asi para ser específico:
const ArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

// Aplicar plugin de paginación
ArticleSchema.plugin(paginate);

ArticleSchema.statics.storageArticle = function(data) {
    const article = new this(data);
    return article.save();
};

ArticleSchema.statics.findAllArticles = (paginationPage, itemsPerPage, page) => {
  return this.paginate({page: page}, {page: paginationPage, limit: itemsPerPage, sort: { created_at: -1 }});
}


module.exports = model("Article", ArticleSchema, "articles");