const deleteUploadedFile = require('../../helpers/deleteUploadedFile');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

const uploadsPath = path.join(__dirname, '../../uploads');

describe('deleteUploadedFile', () => {
    it('should not delete default.jpg', async () => {
        await deleteUploadedFile('default.jpg', uploadsPath);
        expect(fs.promises.unlink).not.toHaveBeenCalled();
    });

    it('should delete a valid file', async () => {
        fs.existsSync.mockReturnValue(true);
        fs.promises.unlink.mockResolvedValue();
        await deleteUploadedFile('test.jpg', uploadsPath);
        expect(fs.promises.unlink).toHaveBeenCalledWith(path.join(uploadsPath, 'test.jpg'));
    });

    it('should handle non-existent files gracefully', async () => {
        fs.existsSync.mockReturnValue(false);
        await deleteUploadedFile('nonexistent.jpg', uploadsPath);
        expect(fs.promises.unlink).not.toHaveBeenCalled();
    });
});