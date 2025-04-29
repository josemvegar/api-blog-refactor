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
            created_at: new Date().toISOString()
        };

        articleRepository.create.mockResolvedValue(mockArticle);

        const result = await createService({
            title: 'Test Article',
            content: 'This is a test article content that should pass...',
            excerpt: 'Test excerpt'
        });

        expect(result.code).toBe(201);
        expect(result).toEqual({
            status: 'success',
            code: 201,
            response: expect.objectContaining({
                status: 'success',
                message: 'Artículo creado correctamente',
                article: {
                    id: '12345',
                    title: 'Test Article',
                    content: 'This is a test article content.',
                    excerpt: 'Test excerpt',
                    image: 'default.jpg',
                    created_at: expect.any(String)
                }
            })
        });
    });

    it('should return validation error for missing fields', async () => {
        const result = await createService({ title: '', content: '' });

        expect(result.code).toBe(400);
        expect(result).toEqual({
            status: 'error',
            code: 400,
            response: expect.objectContaining({
                status: "error",
                message: "Campos requeridos faltantes",
                details: expect.objectContaining({
                    emptyFields: ['title', 'content']
                })
            })
        });
    });

    it('should return validation error for missing and empty fields - 400 Bad Request', async () => {
        const result = await createService({ content: '' });
    
        expect(result.code).toBe(400);
        expect(result).toEqual({
          status: 'error',
          code: 400,
          response: expect.objectContaining({
            status: "error",
            message: "Campos requeridos faltantes",
            details: expect.objectContaining(
                {
                    missingFields: ['title'],
                    emptyFields: ['content']
                })
            })
        });
      });

      it('should reject invalid data formats - 422 Unprocessable Entity', async () => {
        const result = await createService({
            title: 'A', // Muy corto
            content: 'Too short', // Muy corto
            excerpt: 'Test',
            image: 'not-a-valid-url' // Formato inválido
        });
        expect(result.code).toBe(422);
        expect(result).toEqual({
            status: 'error',
            code: 422,
            response: expect.objectContaining({
                status: 'error',
                message: 'Datos no válidos',
                details: {
                    validationErrors: [
                        {
                            field: 'title',
                            message: 'Debe tener entre 5-120 caracteres y no contener scripts',
                            value: 'A'
                        },
                        {
                            field: 'content',
                            message: 'Debe tener al menos 50 caracteres y no contener scripts',
                            value: 'Too short'
                        },
                        {
                            field: 'image',
                            message: 'Debe ser una imagen válida (jpg/png/gif/webp) o URL',
                            value: 'not-a-valid-url',
                        }
                    ],
                }
            })
        });
    });

    it('should handle database errors - 500 Internal Server Error', async () => {
        articleRepository.create.mockRejectedValue(new Error('Database connection failed'));

        const result = await createService({
            title: 'Valid Title',
            content: 'Valid content with more than 50 chars to pass validation...',
            excerpt: 'Valid excerpt'
        });
    
        expect(result.code).toBe(500);
        expect(result).toEqual({
            status: 'error',
            code: 500,
            response: expect.objectContaining({
                status: 'error',
                message: 'Error al crear el artículo',
            })
        });
      });
    
      it('should handle service unavailable - 503 Service Unavailable', async () => {
        articleRepository.create.mockRejectedValue({
          code: 503,
          message: 'Service temporarily unavailable'
        });
    
        const result = await createService({
            title: 'Valid Title',
            content: 'Valid content with more than 50 chars to pass validation...',
            excerpt: 'Valid excerpt'
        });
    
        expect(result.code).toBe(500);
        expect(result).toEqual({
            status: 'error',
            code: 500,
            response: expect.objectContaining({
                status: 'error',
                message: 'Error al crear el artículo',
            })
        });
      });
});