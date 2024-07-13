const ProductService = require("../services/ProductService");
const { responseStatusController } = require("../utils/responseMessage");

class ProductController {
  static async createProduct(req, res) {
    const createProductResult = await ProductService.createProduct(req.body);
    const { statusCode, response } = responseStatusController(createProductResult.status, createProductResult);
    res.status(statusCode).json(response);
  }

  static async productUpdate(req, res) {
    const updateProductResult = await ProductService.productUpdate(req.body);
    const { statusCode, response } = responseStatusController(updateProductResult.status, updateProductResult);
    res.status(statusCode).json(response);
  }

  static async productDelete(req, res) {
    const deleteProductResult = await ProductService.productDelete(req.params.id);
    const { statusCode, response } = responseStatusController(deleteProductResult.status, deleteProductResult);
    res.status(statusCode).json(response);
  }

  static async listProduct(req, res) {
    const listProductResult = await ProductService.listProduct();
    const { statusCode, response } = responseStatusController(listProductResult.status, listProductResult);
    res.status(statusCode).json(response);
  }

  static async productById(req, res) {
    const productByIdResult = await ProductService.productById(req.params.id);
    const { statusCode, response } = responseStatusController(productByIdResult.status, productByIdResult);
    res.status(statusCode).json(response);
  }
}

module.exports = ProductController;