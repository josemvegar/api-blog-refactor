const updateService = require("../../services/articles/updateService");

module.exports = async (req, res) => {
    let id = req.params.id;
    let data = req.body;

    try{
        const serviceResponse = await updateService(id, data) // Llamamos al servicio de crear articulo

        return res.status(serviceResponse.code).json(serviceResponse.response);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor"
        });
    }
    


};