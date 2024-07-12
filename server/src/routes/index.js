const express = require('express')
const productRouter = require('./product.routes')

const routes = express.Router();

routes.use(productRouter);

module.exports = routes;