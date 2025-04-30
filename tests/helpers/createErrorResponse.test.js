const createErrorResponse = require('../../helpers/createErrorResponse');

describe('createErrorResponse', () => {
    it('should create a valid error response', () => {
        const result = createErrorResponse('error', 404, 'Not Found');
        expect(result).toEqual({
            status: 'error',
            code: 404,
            response: {
                status: 'error',
                message: 'Not Found'
            }
        });
    });

    it('should include details if provided', () => {
        const details = { field: 'title', issue: 'missing' };
        const result = createErrorResponse('error', 400, 'Validation Error', details);
        expect(result.response.details).toEqual(details);
    });

    it('should throw an error for missing required parameters', () => {
        expect(() => createErrorResponse()).toThrow('Parámetros status, code y message son requeridos');
    });
});