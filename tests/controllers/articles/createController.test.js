const request = require('supertest');
const app = require('../../../index');
const articleRepository = require('../../../repositories/articleRepository');

jest.mock('../../../repositories/articleRepository');

describe('POST /api/v1/article/create', () => {
  // Datos de artículo mock para casos de éxito
  const mockArticle = {
    _id: '12345',
    title: 'Test Article',
    content: 'This is a test article content.',
    excerpt: 'Test excerpt',
    image: 'default.jpg',
    created_at: new Date()
  };

  // 1. Happy Path - Creación exitosa
  it('should create a new article successfully - 201 Created', async () => {
    articleRepository.create.mockResolvedValue(mockArticle);

    const response = await request(app)
      .post('/api/v1/article/create')
      .send({
        title: 'Test Article',
        content: 'Valid content with more than 50 chars to pass validation...',
        excerpt: 'Test excerpt'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
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
    });
  });

  // 2. Validación: Campos faltantes
  it('should return validation error for missing fields - 400 Bad Request', async () => {
    const response = await request(app)
      .post('/api/v1/article/create')
      .send({
        title: '', // Inválido
        content: '' // Inválido
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Campos requeridos faltantes',
      details: expect.objectContaining({emptyFields: ['title', 'content']})
    });
  });

  it('should return validation error for missing and empty fields - 400 Bad Request', async () => {
    const response = await request(app)
      .post('/api/v1/article/create')
      .send({
        // title: '', Campo faltante 
        content: '' // Inválido
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Campos requeridos faltantes',
      details: expect.objectContaining({missingFields: ['title']},
        {emptyFields: ['content']}
      )
    });
  });

  // 3. Validación: Datos inválidos
  it('should reject invalid data formats - 422 Unprocessable Entity', async () => {
    const response = await request(app)
      .post('/api/v1/article/create')
      .send({
        title: 'A', // Muy corto
        content: 'Too short', // Muy corto
        excerpt: 'Test',
        image: 'not-a-valid-url' // Formato inválido
      });

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
        status: 'error',
        message: 'Datos no válidos',
        details: {
          validationErrors: [
            {
              field: 'title',
              value: 'A',
              message: 'Debe tener entre 5-120 caracteres y no contener scripts'
            },
            {
              field: 'content',
              value: 'Too short',
              message: 'Debe tener al menos 50 caracteres y no contener scripts'
            },
            {
              field: 'image',
              value: 'not-a-valid-url',
              message: 'Debe ser una imagen válida (jpg/png/gif/webp) o URL'
            }
          ]
        }
      });
    });

  // 4. Error del servidor (base de datos)
  it('should handle database errors - 500 Internal Server Error', async () => {
    articleRepository.create.mockRejectedValue(new Error('Database connection failed'));

    const response = await request(app)
      .post('/api/v1/article/create')
      .send({
        title: 'Valid Title',
        content: 'Valid content with more than 50 chars to pass validation...',
        excerpt: 'Valid excerpt'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Error al crear el artículo',
      ...(process.env.NODE_ENV === 'development' && {
        error: 'Database connection failed'
      })
    });
  });

  // 5. Servicio no disponible
  it('should handle service unavailable - 503 Service Unavailable', async () => {
    articleRepository.create.mockRejectedValue({
      code: 503,
      message: 'Service temporarily unavailable'
    });

    const response = await request(app)
      .post('/api/v1/article/create')
      .send({
        title: 'Valid Title',
        content: 'Valid content with more than 50 chars to pass validation...',
        excerpt: 'Valid excerpt'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Error al crear el artículo'
    });
  });
});