const request = require('supertest');
const app = require('../../../index');

const articleRepository = require('../../../repositories/articleRepository');

jest.mock('../../../repositories/articleRepository');

describe('POST /api/v1/article/create', () => {
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

        const response = await request(app)
            .post('/api/v1/article/create')
            .send({
                title: 'Test Article',
                content: 'This is a test article content that should pass...',
                excerpt: 'Test excerpt'
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.article).toHaveProperty('id');
    });

    it('should return validation error for missing fields', async () => {
        const response = await request(app)
            .post('/api/v1/article/create')
            .send({
                title: '',
                content: ''
            });

        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
    });
});