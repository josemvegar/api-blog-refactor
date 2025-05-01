const deleteUploadedFile = require('../../helpers/deleteUploadedFile');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

jest.mock('fs', () => ({
    promises: {
        stat: jest.fn(),
        unlink: jest.fn()
    }
}));

const uploadsPath = path.join(__dirname, '../../uploads/articles/');

describe('deleteUploadedFile', () => {
    it('should not delete default.jpg', async () => {
        const result = await deleteUploadedFile('default.jpg', uploadsPath);
        expect(result).toBe(false);
    });

    it('should delete a valid file', async () => {
        fs.promises.stat.mockReturnValue(true);
        fs.promises.unlink.mockResolvedValue();
        const result = await deleteUploadedFile('test.jpg', uploadsPath);
        expect(fs.promises.unlink).toHaveBeenCalledWith(path.join(uploadsPath, 'test.jpg'));
    });

    it('should handle non-existent files gracefully', async () => {
        fs.promises.stat.mockRejectedValue(new Error('File not found'));
        const result = await deleteUploadedFile('nonexistent.jpg', uploadsPath);
        expect(result).toBe(false);
    });
});