const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require("path")
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos',
      version: '1.0.0',
      description: 'Documentação da API de Produtos',
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.js')],
};


const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
