const request = require('supertest');
const app = require('../../../index');

describe('listArticles controller', () => {

    it('should return paginated articles', async () => {
        const response = await request(app).get('/api/v1/article/list/');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.articles).toBeInstanceOf(Array);
    });

    it('should return paginated articles from page 1 with an invalid page param like a string', async () => {
        const response = await request(app).get('/api/v1/article/list/invalid');
        
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.currentPage).toBe(1);
        expect(response.body.articles).toBeInstanceOf(Array);
    });

    it('should return 404 with an empty array for a very high page number', async () => {
        const response = await request(app).get('/api/v1/article/list/99999999999');

        expect(response.status).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toEqual('No hay artículos disponibles');
    });
});