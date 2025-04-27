const createService = require('../../../services/articles/createService');
const articleRepository = require('../../../repositories/articleRepository');

jest.mock('../../../repositories/articleRepository');

describe('createService', () => {
    it('should create a new article successfully', async () => {
        const mockArticle = {
            _id: '12345',
            title: 'Test Article',
            content: 'This is a test article content.',
            excerpt: 'Test excerpt',
            image: 'default.jpg',
            created_at: new Date()
        };

        articleRepository.create.mockResolvedValue(mockArticle);

        const result = await createService({
            title: 'Test Article',
            content: 'This is a test article content that should pass...',
            excerpt: 'Test excerpt'
        });

        expect(result.status).toBe('success');
        expect(result.response.article).toHaveProperty('id', mockArticle._id);
    });

    it('should return validation error for missing fields', async () => {
        const result = await createService({ title: '', content: '' });

        expect(result.status).toBe('error');
        expect(result.response.message).toBe('Campos requeridos faltantes');
    });
});