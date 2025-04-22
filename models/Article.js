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

ArticleSchema.statics.updateArticle = function(id, data) {
    return this.findOneAndUpdate({_id: id}, data, {new: true}).exec();
};

ArticleSchema.statics.idExist = function(id) {
    return this.findById(id).exec();
};

ArticleSchema.statics.deleteArticle = function(id) {
    return this.findByIdAndDelete(id).exec();
};

ArticleSchema.statics.findAllArticles = function(page, itemsPerPage) {
  return this.paginate({}, {page: page, limit: itemsPerPage, sort: { created_at: -1 }});
};

ArticleSchema.statics.findOneArticle = function(id) {
    return this.findById(id).exec();
};

module.exports = model("Article", ArticleSchema, "articles");