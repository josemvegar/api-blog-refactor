/**
 * @file articleRepository.js
 * @description Repositorio para interactuar con el modelo Article
 * @module repositories/articleRepository
 * @requires ../models/Article
 */

const Article = require('../models/Article');

/**
 * Repositorio para manejar operaciones relacionadas con artículos
 * @class ArticleRepository
 */
class ArticleRepository {
    /**
     * Crea y guarda un nuevo artículo
     * @param {Object} data - Datos del artículo a crear
     * @returns {Promise<Article>} Promesa con el artículo creado
     */
    async create(data) {
        return Article.storageArticle(data);
    }

    /**
     * Actualiza un artículo existente
     * @param {string|ObjectId} id - ID del artículo
     * @param {Object} data - Campos a actualizar
     * @returns {Promise<Article|null>} Promesa con el artículo actualizado
     */
    async update(id, data) {
        return Article.updateArticle(id, data);
    }

    /**
     * Verifica si un artículo existe
     * @param {string|ObjectId} id - ID del artículo
     * @returns {Promise<Article|null>} Promesa con el artículo encontrado
     */
    async exists(id) {
        return Article.idExist(id);
    }

    /**
     * Elimina un artículo
     * @param {string|ObjectId} id - ID del artículo
     * @returns {Promise<Article|null>} Promesa con el artículo eliminado
     */
    async delete(id) {
        return Article.deleteArticle(id);
    }

    /**
     * Obtiene artículos paginados
     * @param {number} page - Número de página
     * @param {number} itemsPerPage - Elementos por página
     * @returns {Promise<Object>} Resultado paginado
     */
    async findAll(page, itemsPerPage) {
        return Article.findAllArticles(page, itemsPerPage);
    }

    /**
     * Busca un artículo por ID
     * @param {string|ObjectId} id - ID del artículo
     * @returns {Promise<Article|null>} Promesa con el artículo encontrado
     */
    async findById(id) {
        return Article.findOneArticle(id);
    }

    /**
     * Busca artículos por término en título o contenido
     * @param {string} key - Término de búsqueda
     * @returns {Promise<Array<Article>>} Lista de artículos coincidentes
     */
    async search(key) {
        return Article.searchArticle(key);
    }

    /**
     * Actualiza la imagen de un artículo
     * @param {string|ObjectId} id - ID del artículo
     * @param {string} image - Nombre de la nueva imagen
     * @returns {Promise<Article|null>} Promesa con el artículo actualizado
     */
    async updateImage(id, image) {
        return Article.updateImage(id, image);
    }
}

module.exports = new ArticleRepository();