const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ProductDAO {

  static createProduct = async (data) => {
    return await prisma.product.create({ data });
  }

  static getProducts = async () => {
    return await prisma.product.findMany();
  }

  static getProductById = async (id) => {
    return await prisma.product.findFirst({
      where: { id }
    });
  }
  static getProductByName = async (name) => {
    return await prisma.product.findFirst({
      where: { name }
    });
  }

  static deleteProductById = async (id) => {
    return await prisma.product.delete({
      where: { id }
    });
  }

  static updateProduct = async (product) => {
    return await prisma.product.update({
      where: { id: product.id },
      data: product,
    });
  }
}
module.exports = ProductDAO