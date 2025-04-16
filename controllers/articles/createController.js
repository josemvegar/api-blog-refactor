const createService = require("../../services/articles/createService");

module.exports = async (req, res) => {

    const data = req.body; // Recogemos los datos del body

    try{    
        const serviceResponse = await createService(data) // Llamamos al servicio de crear articulo

        return res.status(serviceResponse.code).json(serviceResponse.response);
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor"
        });
    }
}