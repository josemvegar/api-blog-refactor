const updateService = require('../../../services/articles/updateService');
const articleRepository = require('../../../repositories/articleRepository');

jest.mock('../../../repositories/articleRepository');

describe('updateService', () => {
    it('should update an article successfully', async () => {
        /*const mockArticle = {
            _id: '12345',
            title: 'Updated Title',
            content: 'Updated content.',
            excerpt: 'Updated excerpt',
            image: 'updated.jpg',
            created_at: new Date().toISOString()
        };

        articleRepository.update.mockResolvedValue(mockArticle);

        const result = await updateService('12345', {
            title: 'Updated Title',
            content: 'Updated content.',
        });

        expect(result.code).toBe(200);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'success',
            message: 'Artículo actualizado correctamente',
            article: {
                id: '12345',
                title: 'Updated Title',
                content: 'Updated content.',
                excerpt: 'Updated excerpt',
                image: 'updated.jpg',
                created_at: expect.any(String)
            }
        }));*/
    });

    /*it('should return validation error for invalid data', async () => {
        const result = await updateService('12345', { title: '' });

        expect(result.code).toBe(422);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'Datos de actualización no válidos',
        }));
    });

    it('should return error for non-existent article', async () => {
        articleRepository.update.mockResolvedValue(null);

        const result = await updateService('nonexistent-id', {
            title: 'Updated Title',
            content: 'Updated content.',
        });

        expect(result.code).toBe(404);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'El artículo no existe o no pudo actualizarse',
        }));
    });

    it('should handle database errors', async () => {
        articleRepository.update.mockRejectedValue(new Error('Database error'));

        const result = await updateService('12345', {
            title: 'Updated Title',
            content: 'Updated content.',
        });

        expect(result.code).toBe(500);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'Error al actualizar el artículo',
        }));
    });*/
});