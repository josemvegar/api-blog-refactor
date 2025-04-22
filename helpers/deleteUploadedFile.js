const fs = require('fs');
const path = require('path');

// Función para eliminar el archivo
module.exports = (filename, uploadsPath) => {
    if (!filename) return;
    
    const filePath = path.join(uploadsPath, filename);
    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error al eliminar archivo:', err);
        });
    }
};