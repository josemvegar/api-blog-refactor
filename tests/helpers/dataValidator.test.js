const { dataValidator } = require('../../helpers/dataValidator');

describe('dataValidator', () => {
    it('should validate correct title successfully', () => {
        const data = {
            title: 'Valid Title'
        };

        const result = dataValidator(data);
        expect(result.isValid).toBe(true);
    });

    it('should return error for invalid title', () => {
        const data = {
            title: 'No'
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(false);
        
        expect(Array.isArray(result.errors)).toBe(true);
        expect(result.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'title' })
        ]));    
    });




    it('should validate correct content successfully', () => {
        const data = {
            content: 'This is valid content with more than 50 characters.'
        };

        const result = dataValidator(data);
        expect(result.isValid).toBe(true);
    });

    it('should return error for invalid content', () => {
        const data = {
            content: 'Short'
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(false);
        
        expect(Array.isArray(result.errors)).toBe(true);
        expect(result.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'content' })
        ]));    
    });

    


    it('should validate correct excerpt successfully', () => {
        const data = {
            excerpt: 'Valid excerpt'
        };

        const result = dataValidator(data);
        expect(result.isValid).toBe(true);
    });

    it('should return error for invalid excerpt', () => {
        const data = {
            excerpt: 'Este fragmento de texto ha sido extendido deliberadamente para asegurar que sobrepase el límite de 200 caracteres requerido. A continuación, añadiré contenido adicional sin sentido pero que contribuya a alcanzar la longitud necesaria.'
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(false);
        
        expect(Array.isArray(result.errors)).toBe(true);
        expect(result.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'excerpt' })
        ]));    
    });

    

    it('should validate correct image successfully', () => {
        const data = {
            image: 'image.jpg'
        };

        const result = dataValidator(data);
        expect(result.isValid).toBe(true);
    });

    it('should return error for invalid image', () => {
        const data = {
            image: 'invalidfile.txt'
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(false);
        
        expect(Array.isArray(result.errors)).toBe(true);
        expect(result.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'image' })
        ]));    
    });

    

    it('should validate correct created_at successfully', () => {
        const data = {
            created_at: '2025-04-29T15:30:00Z' // Formato ISO 8601
        };
    
        const result = dataValidator(data);
        
        expect(result.isValid).toBe(true);
    });
    
    it('should validate correct created_at with YYYY-MM-DD', () => {
        const data = {
            created_at: '2025-04-29' // Formato YYYY-MM-DD válido
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(true);
    });
    
    it('should return error for invalid created_at', () => {
        const data = {
            created_at: '29-04-2025' // Formato incorrecto (DD-MM-YYYY)
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(false);
        
        expect(Array.isArray(result.errors)).toBe(true);
        expect(result.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'created_at' })
        ]));
    });
    
    it('should return error for completely invalid date', () => {
        const data = {
            created_at: 'invalid-date' // No es una fecha válida en ningún formato
        };
    
        const result = dataValidator(data);
    
        expect(result.isValid).toBe(false);
        
        expect(Array.isArray(result.errors)).toBe(true);
        expect(result.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({ field: 'created_at' })
        ]));
    });

});