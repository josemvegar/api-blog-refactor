const emptyChecker = require('../../helpers/emptyChecker');

describe('emptyChecker', () => {
    it('should validate non-empty fields successfully', () => {
        const data = { title: 'Valid Title', content: 'Valid Content' };
        const result = emptyChecker(data, ['title', 'content']);
        expect(result.isValid).toBe(true);
    });

    it('should detect missing fields', () => {
        const data = { title: 'Valid Title' };
        const result = emptyChecker(data, ['title', 'content']);
        expect(result.isValid).toBe(false);
        expect(result.missingFields).toContain('content');
    });

    it('should detect empty fields', () => {
        const data = { title: 'Valid Title', content: '' };
        const result = emptyChecker(data, ['title', 'content']);
        expect(result.isValid).toBe(false);
        expect(result.emptyFields).toContain('content');
    });

    it('should detect empty fields and missing fields', () => {
        const data = { content: '' };
        const result = emptyChecker(data, ['title', 'content']);
        expect(result.isValid).toBe(false);
        expect(result.emptyFields).toContain('content');
        expect(result.missingFields).toContain('title');
    });

    it('should respect options for empty string checks', () => {
        const data = { title: 'Valid Title', content: '' };
        const result = emptyChecker(data, ['title', 'content'], { checkEmptyStrings: false });
        expect(result.isValid).toBe(true);
    });
});