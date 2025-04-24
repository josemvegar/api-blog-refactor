/**
 * @file article.js
 * @description Modelo Mongoose para artículos con métodos estáticos personalizados
 * @module models/Article
 * @requires mongoose
 * @requires mongoose-paginate-v2
 */

const { Schema, model } = require("mongoose");
const paginate = require('mongoose-paginate-v2');

/**
 * Esquema Mongoose para artículos
 * @typedef {Object} ArticleSchema
 * @property {string} title - Título del artículo (requerido)
 * @property {string} content - Contenido del artículo (requerido)
 * @property {string} [excerpt] - Resumen del artículo (opcional)
 * @property {string} [image=default.jpg] - Nombre de la imagen asociada
 * @property {Date} [created_at=Date.now] - Fecha de creación automática
 */
const ArticleSchema = Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
        trim: true,
        minlength: [5, "El título debe tener al menos 5 caracteres"],
        maxlength: [120, "El título no puede exceder 120 caracteres"]
    },
    content: {
        type: String,
        required: [true, "El contenido es obligatorio"],
        minlength: [50, "El contenido debe tener al menos 50 caracteres"]
    },
    excerpt: {
        type: String,
        default: "",
        maxlength: [200, "El extracto no puede exceder 200 caracteres"]
    },
    image: {
        type: String,
        default: "default.jpg",
        match: [/\.(jpg|jpeg|png|gif)$/i, "Formato de imagen no válido"]
    },
    created_at: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    versionKey: false, // Deshabilitar __v
    toJSON: { virtuals: true }, // Incluir virtuals al convertir a JSON
    toObject: { virtuals: true }
});

// Plugin para paginación avanzada
ArticleSchema.plugin(paginate);

// =============================================
//  MÉTODOS ESTÁTICOS DEL MODELO
// =============================================

/**
 * Crea y guarda un nuevo artículo
 * @param {Object} data - Datos del artículo a crear
 * @returns {Promise<Article>} Promesa con el artículo creado
 */
ArticleSchema.statics.storageArticle = function(data) {
    const article = new this(data);
    return article.save();
};

/**
 * Actualiza un artículo existente
 * @param {string|ObjectId} id - ID del artículo
 * @param {Object} data - Campos a actualizar
 * @returns {Promise<Article|null>} Promesa con el artículo actualizado
 */
ArticleSchema.statics.updateArticle = function(id, data) {
    return this.findOneAndUpdate(
        {_id: id}, 
        data, 
        {new: true, runValidators: true}
    ).exec();
};

/**
 * Verifica si un artículo existe
 * @param {string|ObjectId} id - ID del artículo
 * @returns {Promise<Article|null>} Promesa con el artículo encontrado
 */
ArticleSchema.statics.idExist = function(id) {
    return this.findById(id).exec();
};

/**
 * Elimina un artículo
 * @param {string|ObjectId} id - ID del artículo
 * @returns {Promise<Article|null>} Promesa con el artículo eliminado
 */
ArticleSchema.statics.deleteArticle = function(id) {
    return this.findByIdAndDelete(id).exec();
};

/**
 * Obtiene artículos paginados
 * @param {number} page - Número de página
 * @param {number} itemsPerPage - Elementos por página
 * @returns {Promise<Object>} Resultado paginado
 */
ArticleSchema.statics.findAllArticles = function(page = 1, itemsPerPage = 10) {
    return this.paginate({}, {
        page: Number(page),
        limit: Number(itemsPerPage),
        sort: { created_at: -1 },
        select: '-__v' // Excluir campo __v
    });
};

/**
 * Busca un artículo por ID
 * @param {string|ObjectId} id - ID del artículo
 * @returns {Promise<Article|null>} Promesa con el artículo encontrado
 */
ArticleSchema.statics.findOneArticle = function(id) {
    return this.findById(id)
               .select('-__v') // Excluir campo __v
               .exec();
};

/**
 * Actualiza la imagen de un artículo
 * @param {string|ObjectId} id - ID del artículo
 * @param {string} image - Nombre de la nueva imagen
 * @returns {Promise<Article|null>} Promesa con el artículo actualizado
 */
ArticleSchema.statics.updateImage = function(id, image) {
    return this.findOneAndUpdate(
        {_id: id}, 
        {image: image}, 
        {new: true, runValidators: true}
    );
};

/**
 * Busca artículos por término en título o contenido
 * @param {string} key - Término de búsqueda
 * @returns {Promise<Array<Article>>} Lista de artículos coincidentes
 */
ArticleSchema.statics.searchArticle = function(key) {
    return this.find({
        "$or": [
            {title: {"$regex": key, "$options": "i"}},
            {content: {"$regex": key, "$options": "i"}}
        ]
    }, null, { 
        sort: { created_at: -1 },
        select: '-__v' // Excluir campo __v
    }).exec();
};

/**
 * Modelo Article de Mongoose
 * @typedef {Model<ArticleSchema>} Article
 */
module.exports = model("Article", ArticleSchema, "articles");