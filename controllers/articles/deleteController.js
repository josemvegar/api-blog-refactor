const deleteService = require("../../services/articles/deleteService");

module.exports = async (req, res) => {
    let id = req.params.id;

    try{
        const serviceResponse = await deleteService(id);

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