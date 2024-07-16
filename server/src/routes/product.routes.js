const { Router } = require("express");
const ProductController = require("../controllers/Product.controller");
const { bodyRequiredField, bodyRequiredFieldNumber, paramRequiredField, expressValidatorMiddleware } = require('../utils/restFullApiHelpers')

const productRouter = Router();
const routeName = "/product"

const productCreateValidations = [
    bodyRequiredField("name"),
    bodyRequiredFieldNumber("price")
];
const productUpdateValidations = [
    bodyRequiredField("id"),
    bodyRequiredField("name"),
    bodyRequiredFieldNumber("price")
];
const productDeleteValidations = [
    paramRequiredField("id")
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: ID do produto
 *         name:
 *           type: string
 *           description: Nome do produto
 *         description:
 *           type: string
 *           description: Descrição do produto
 *         price:
 *           type: number
 *           format: float
 *           description: Preço do produto
 */


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.post(
    routeName,
    productCreateValidations,
    expressValidatorMiddleware,
    ProductController.createProduct
);
/**
 * @swagger
 * /product:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.put(
    routeName,
    productUpdateValidations,
    expressValidatorMiddleware,
    ProductController.productUpdate
);
/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Deleta um produto existente
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 */
productRouter.delete(
    routeName + "/:id",
    productDeleteValidations,
    expressValidatorMiddleware,
    ProductController.productDelete
);
/**
 * @swagger
 * /product/findAll:
 *   get:
 *     summary: Retorna a lista de todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get(
    routeName + "/findAll",
    ProductController.listProduct
);
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.get(
    routeName + "/:id",
    ProductController.productById
);



module.exports = productRouter;