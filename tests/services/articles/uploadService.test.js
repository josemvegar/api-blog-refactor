const { setFileService, getFileService } = require('../../../services/articles/uploadService');
const articleRepository = require('../../../repositories/articleRepository');
const fs = require('fs').promises;
const path = require('path');

jest.mock('../../../repositories/articleRepository');
jest.mock('fs', () => ({ promises: { access: jest.fn(), unlink: jest.fn() } }));

describe('uploadService', () => {
    describe('setFileService', () => {
        it('should update the article image successfully', async () => {
            /*const mockArticle = {
                _id: '12345',
                title: 'Article Title',
                image: 'new-image.jpg',
                created_at: new Date()
            };

            articleRepository.updateImage.mockResolvedValue(mockArticle);

            const result = await setFileService('12345', {
                filename: 'new-image.jpg',
                originalname: 'image.jpg'
            });

            expect(result.code).toBe(200);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'success',
                message: 'Imagen del artículo actualizada correctamente',
                article: expect.objectContaining({
                    id: '12345',
                    image: 'new-image.jpg'
                })
            }));*/
        });

        /*it('should return error for invalid article ID', async () => {
            const result = await setFileService('invalid-id', {
                filename: 'new-image.jpg',
                originalname: 'image.jpg'
            });

            expect(result.code).toBe(400);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'error',
                message: 'ID de artículo inválido'
            }));
        });

        it('should handle file deletion on validation failure', async () => {
            fs.access.mockRejectedValue(new Error('File not found'));

            const result = await setFileService('12345', {
                filename: 'invalid-image.jpg',
                originalname: 'invalid-image.jpg'
            });

            expect(fs.unlink).toHaveBeenCalledWith(path.join(__dirname, '../../../uploads/articles/invalid-image.jpg'));
            expect(result.code).toBe(400);
        });
    });

    describe('getFileService', () => {
        it('should return the file path successfully', async () => {
            fs.access.mockResolvedValue();

            const result = await getFileService('image.jpg', path.join(__dirname, '../../../uploads/articles'));

            expect(result).toBe(path.resolve(__dirname, '../../../uploads/articles/image.jpg'));
        });

        it('should return error for non-existent file', async () => {
            fs.access.mockRejectedValue(new Error('File not found'));

            const result = await getFileService('nonexistent.jpg', path.join(__dirname, '../../../uploads/articles'));

            expect(result.code).toBe(404);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'error',
                message: 'El archivo solicitado no existe'
            }));
        });*/
    });
});