const { Router } = require("express");

const productRouter = Router();
const routeName = "/product"

productRouter.post(
    routeName,
    () => {}
);

productRouter.put(
    routeName,
    () => {}
);
productRouter.delete(
    routeName + "/:id",
    () => {}
);

productRouter.get(
    routeName + "/findAll",
    () => {}
);
productRouter.get(
    routeName + "/:id",
    () => {}
);


module.exports = productRouter;