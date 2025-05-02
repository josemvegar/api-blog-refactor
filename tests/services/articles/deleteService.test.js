const deleteService = require('../../../services/articles/deleteService');
const articleRepository = require('../../../repositories/articleRepository');
const idValidator = require('../../../helpers/idValidator');

jest.mock('../../../repositories/articleRepository');
jest.mock('../../../helpers/idValidator');

describe('deleteService', () => {
    it('should delete an article successfully', async () => {
        const mockDeletedArticle = {
            _id: '12345',
            title: 'Deleted Title',
            content: 'Deleted content.',
            deletedAt: new Date().toISOString()
        };

        articleRepository.delete.mockResolvedValue(mockDeletedArticle);
        idValidator.mockResolvedValue({ isValid: true });

        const result = await deleteService('12345');

        expect(result.code).toBe(200);
        expect(result.response).toEqual({
            status: 'success',
            message: 'Artículo eliminado correctamente',
            deletedId: '12345',
            deletedAt: result.response.deletedAt
        });
    });

    it('should return error for non-existent article', async () => {
        //articleRepository.delete.mockResolvedValue(null);
        idValidator.mockResolvedValue({
            isValid: false,
            code: 404,
            error: 'El artículo solicitado no existe',
            errorType: 'existence'
        });

        const result = await deleteService('nonexistent-id');

        expect(result.code).toBe(404);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'El artículo solicitado no existe',
        }));
    });

    it('should handle database errors', async () => {
        articleRepository.delete.mockRejectedValue(new Error('Database error'));
        idValidator.mockResolvedValue({ isValid: true });

        const result = await deleteService('12345');

        expect(result.code).toBe(500);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'Error al eliminar el artículo',
        }));
    });
});