const searchService = require('../../services/articles/searchService');

module.exports = async (req, res) => {
    const { key } = req.params;

    try{
        const serviceResponse = await searchService(key);

        return res.status(serviceResponse.code).json(serviceResponse.response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor"
        });
    }
}