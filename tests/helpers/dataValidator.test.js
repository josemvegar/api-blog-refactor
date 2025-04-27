const { dataValidator } = require('../../helpers/dataValidator');

describe('dataValidator', () => {
    it('should validate correct data successfully', () => {
        const data = {
            title: 'Valid Title',
            content: 'This is valid content with more than 50 characters.',
            excerpt: 'Valid excerpt',
            image: 'image.jpg'
        };

        const result = dataValidator(data);

        expect(result.isValid).toBe(true);
    });

    it('should return errors for invalid data', () => {
        const data = {
            title: 'No',
            content: 'Short',
            excerpt: 'Este fragmento de texto ha sido extendido deliberadamente para asegurar que sobrepase el límite de 200 caracteres requerido. A continuación, añadiré contenido adicional sin sentido pero que contribuya a alcanzar la longitud necesaria.',
            image: 'invalidfile.txt'
        };

        const result = dataValidator(data);

        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(4);
    });
});