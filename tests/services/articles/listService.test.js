const { listAll, listOne } = require('../../../services/articles/listService');
const articleRepository = require('../../../repositories/articleRepository');

jest.mock('../../../repositories/articleRepository');

describe('listService', () => {
    describe('listAll', () => {
        it('should return paginated articles successfully', async () => {
            /*const mockArticles = {
                totalDocs: 2,
                docs: [
                    { _id: '1', title: 'Article 1', excerpt: 'Excerpt 1', image: 'image1.jpg', created_at: new Date() },
                    { _id: '2', title: 'Article 2', excerpt: 'Excerpt 2', image: 'image2.jpg', created_at: new Date() }
                ],
                page: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            };

            articleRepository.findAll.mockResolvedValue(mockArticles);

            const result = await listAll(1);

            expect(result.code).toBe(200);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'success',
                totalItems: 2,
                articles: expect.any(Array)
            }));*/
        });

        /*it('should return error when no articles are found', async () => {
            articleRepository.findAll.mockResolvedValue({ totalDocs: 0, docs: [] });

            const result = await listAll(1);

            expect(result.code).toBe(404);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'error',
                message: 'No hay artículos disponibles'
            }));
        });*/
    });

    describe('listOne', () => {
        /*it('should return a single article successfully', async () => {
            const mockArticle = {
                _id: '1',
                title: 'Article 1',
                content: 'Content 1',
                excerpt: 'Excerpt 1',
                image: 'image1.jpg',
                created_at: new Date()
            };

            articleRepository.findById.mockResolvedValue(mockArticle);

            const result = await listOne('1');

            expect(result.code).toBe(200);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'success',
                article: expect.objectContaining({
                    id: '1',
                    title: 'Article 1'
                })
            }));
        });

        it('should return error for non-existent article', async () => {
            articleRepository.findById.mockResolvedValue(null);

            const result = await listOne('nonexistent-id');

            expect(result.code).toBe(404);
            expect(result.response).toEqual(expect.objectContaining({
                status: 'error',
                message: 'El artículo solicitado no existe'
            }));
        });*/
    });
});