const mongoose = require('mongoose');
const Article = require('../models/Article');

module.exports = async (id) => {
    if (!id) return "Debes enviar un ID.";

    const idFormat =  /^[0-9a-fA-F]{24}$/.test(id);
    if (!idFormat) return "Formato de ID incorrecto.";

    const idExist = await Article.idExist(id);
    if (!idExist) return "El id ingresado no existe.";

    return true;
};