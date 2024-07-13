const ProductDAO = require("../models/ProductDAO")
const { errorMessage, failMessage, successMessage } = require("../utils/responseMessage")

class ProductService {
  static async createProduct(
    productData
  ) {
    let response;
    try {
      const existProduct = await ProductDAO.getProductByName(productData.name)
      if (existProduct)
        response = failMessage("Já existe um produto com esse nome!",
          "Produto não cadastrado!",
          "name"
        );
      else {
        const productCreated = await ProductDAO.createProduct(productData);
        response = successMessage("Sucesso na criação do produto.", productCreated);
      }
    } catch (e) {
      console.error("ERROR - Creating product", e);
      response = errorMessage("Erro interno ao tentar criar produto.", e);
    }
    return response;
  }

  static async productDelete(
    idProduct
  ) {
    let response;
    try {
      const product = await ProductDAO.deleteProductById(idProduct);
      if (product) response = successMessage("Sucesso ao excluir produto.", idProduct);
      else
        response = failMessage("Produto não foi deletado!",
          "Produto não foi deletado!",
          "id"
        );
    } catch (e) {
      console.error("ERROR - productDelete", e);
      response = errorMessage("Erro interno ao tentar deletar produto.", e);
    }
    return response;
  }

  static async productUpdate(
    productData
  ) {
    let response;
    try {
      const product = await ProductDAO.updateProduct(productData);
      if (product) response = successMessage("Sucesso na atualização do produto.", product);
      else
        response = failMessage("Produto não foi atualizado!",
          "Produto não foi atualizado!",
          "identifier"
        );
    } catch (e) {
      console.error("ERROR - productUpdate", e);
      response = errorMessage("Erro interno ao tentar atualizar produto.", e);
    }
    return response;
  }

  static async listProduct() {
    let response;
    try {
      const productList = await ProductDAO.getProducts();
      if (productList.length) response = successMessage("Sucesso na busca dos produtos.", productList);
      else
        response = failMessage("Não existem produtos.",
          "Não existem produtos.",
          "[]"
        );
    } catch (e) {
      console.error("ERROR - listProduct", e);
      response = errorMessage("Erro interno ao tentar buscar produtos.", e);
    }
    return response;
  }

  static async productById(idProduct) {
    let response;
    try {
      const product = await ProductDAO.getProductById(idProduct);
      if (product) response = successMessage("Sucesso na busca do produto.", product);
      else
        response = failMessage("Não existe produto.",
          "Não existe produto.",
          "[]"
        );
    } catch (e) {
      console.error("ERROR - productById", e);
      response = errorMessage("Erro interno ao tentar buscar produto.", e);
    }
    return response;
  }
}
module.exports = ProductService;