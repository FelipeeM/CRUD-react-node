const { Router } = require("express");
const ProductController = require("../controllers/Product.controller");

const productRouter = Router();
const routeName = "/product"

productRouter.post(
    routeName,
    ProductController.createProduct
);

productRouter.put(
    routeName,
    ProductController.productUpdate
);
productRouter.delete(
    routeName + "/:id",
    ProductController.productDelete
);

productRouter.get(
    routeName + "/findAll",
    ProductController.listProduct
);
productRouter.get(
    routeName + "/:id",
    ProductController.productById
);


module.exports = productRouter;