const multerConfig = require('../../helpers/multerConfig');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('multerConfig', () => {
    it('should create a valid multer instance', () => {
        const upload = multerConfig('testFolder', 'testFile');
        expect(upload).toBeDefined();
    });

    it('should create the upload directory if it does not exist', () => {
        fs.existsSync.mockReturnValue(false);
        fs.mkdirSync.mockImplementation(() => {});
        multerConfig('testFolder', 'testFile');
        expect(fs.mkdirSync).toHaveBeenCalledWith(path.join(__dirname, '../../uploads/testFolder'), { recursive: true });
    });

    it('should throw an error for invalid folder name', () => {
        expect(() => multerConfig(null)).toThrow('El nombre de carpeta debe ser un string válido');
    });
});