const {setFileService, getFileService} = require("../../services/articles/uploadService");
const path = require("path");

const upload = async (req, res) => {
    const id = req.params.id;
    const file = req.file;

    try{
        const serviceResponse = await setFileService(id, file);

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

const getFile = async (req, res) => {
    const file = req.params.file;
    const uploadsPath = path.join(__dirname, '../../uploads/articles/');

    try{
        const serviceResponse = await getFileService(file, uploadsPath);

        if(typeof serviceResponse === 'object' && serviceResponse !== null && serviceResponse.status === 'error'){
            return res.status(serviceResponse.code).json(serviceResponse.response);
        }

        return res.status(200).sendFile(serviceResponse);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "error",
            message: "Error en el servidor"
        });
    }
}

module.exports = {
    upload,
    getFile
};