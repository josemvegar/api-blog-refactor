const {listOne} = require("../../services/articles/listService");

module.exports = async (req, res) => {

    const { id } = req.params;

    try{
        const serviceResponse = await listOne(id);

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