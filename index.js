/**
 * @file index.js
 * @description Configura e inicia el servidor Express con todos sus middleware y rutas
 * @module /
 * @requires express
 * @requires dotenv
 * @requires cors
 * @requires ./database/conection
 * @requires morgan
 * @requires ./middlewares/errorHandler
 */

// Configuración inicial
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Database = require('./database/conection');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

// Inicialización de configuraciones
dotenv.config();  // Carga variables de entorno primero
Database.connect(); // Establece conexión con la base de datos

/**
 * Instancia principal de la aplicación Express
 * @type {express.Application}
 */
const app = express();

// ======================
// Configuración de Middlewares
// ======================

// Middleware para manejo centralizado de errores (debe ir primero)
app.use(errorHandler);

// Middleware para logging de solicitudes HTTP
app.use(morgan('dev'));

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middlewares para parseo de cuerpos de solicitud
app.use(express.json());       // Para application/json
app.use(express.urlencoded({  // Para application/x-www-form-urlencoded
  extended: true
}));

// ======================
// Definición de Rutas
// ======================

/**
 * Ruta raíz de verificación de estado
 * @name GET /
 * @function
 * @memberof module:/
 * @param {import('express').Request} req - Objeto de solicitud HTTP
 * @param {import('express').Response} res - Objeto de respuesta HTTP
 * @returns {string} Mensaje de estado del servidor
 */
app.get('/', (req, res) => {
  res.send('¡Backend del blog funcionando!');
});

// Rutas de artículos
const articleRoutes = require('./routes/articles');
app.use('/api/v1/article', articleRoutes);  // Prefijo para API v1

// ======================
// Inicialización del Servidor
// ======================

/**
 * Puerto del servidor (de entorno o 3001 por defecto)
 * @type {number}
 */
const PORT = process.env.PORT || 3001;

/**
 * Dominio del servidor (de entorno o localhost por defecto)
 * @type {string}
 */
const DOMAIN = process.env.DOMAIN || 'http://localhost:';

/**
 * Inicia el servidor Express
 * @listens {number} PORT - Puerto en el que escucha el servidor
 */
app.listen(PORT, () => {
  console.log(`Backend corriendo en ${DOMAIN}${PORT}`);
});