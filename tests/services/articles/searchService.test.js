const searchService = require('../../../services/articles/searchService');
const articleRepository = require('../../../repositories/articleRepository');

jest.mock('../../../repositories/articleRepository');

describe('searchService', () => {
    it('should return search results successfully', async () => {
        const mockResults = [
            { _id: '1', title: 'Article 1', content: 'Content 1', excerpt: 'Excerpt 1', image: 'image1.jpg', created_at: new Date() },
            { _id: '2', title: 'Article 2', content: 'Content 2', excerpt: 'Excerpt 2', image: 'image2.jpg', created_at: new Date() }
        ];

        articleRepository.search.mockResolvedValue(mockResults);

        const result = await searchService('Article');

        expect(result.code).toBe(200);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'success',
            total: 2,
            results: expect.any(Array)
        }));
    });

    it('should return error for short search term', async () => {
        const result = await searchService('A');

        expect(result.code).toBe(400);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'El término de búsqueda debe tener al menos 3 caracteres'
        }));
    });

    it('should return error when no results are found', async () => {
        articleRepository.search.mockResolvedValue([]);

        const result = await searchService('Nonexistent');

        expect(result.code).toBe(404);
        expect(result.response).toEqual(expect.objectContaining({
            status: 'error',
            message: 'No se encontraron artículos'
        }));
    });
});