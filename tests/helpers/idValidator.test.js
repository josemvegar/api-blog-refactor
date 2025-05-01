const idValidator = require('../../helpers/idValidator');
const mongoose = require('mongoose');
const Article = require('../../models/Article');

jest.mock('../../models/Article');

describe('idValidator', () => {
    it('should validate a correct MongoDB ID', async () => {
        const validId = '680989aa8dedc34f62e4e0a7';
        Article.idExist.mockResolvedValue(true);
        const result = await idValidator(validId);
        expect(result.isValid).toBe(true);
    });

    it('should return error for missing ID', async () => {
        const result = await idValidator(null);
        expect(result.isValid).toBe(false);
        expect(result.errorType).toBe('missing');
    });

    it('should return error for invalid ID format', async () => {
        const invalidId = '123';
        const result = await idValidator(invalidId);
        expect(result.isValid).toBe(false);
        expect(result.errorType).toBe('format');
    });

    it('should return error for non-existent ID', async () => {
        const validId = '680989aa8dedc34f62e4e0a7';
        Article.idExist.mockResolvedValue(false);
        const result = await idValidator(validId);
        expect(result.isValid).toBe(false);
        expect(result.errorType).toBe('existence');
    });
});