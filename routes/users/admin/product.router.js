import express from "express"
import ProductCategoryController from "../../../src/http/controllers/admin/products/product_categories.controller.js";
import { productCategoryValidate } from "../../../src/http/validations/products/product_category.validate.js";
import { userAvatarMiddelware } from "../../../src/http/middlewares/user_avatar.middleware.js";
import { productCategoryAvatarMiddelware } from "../../../src/http/middlewares/product_category_avatar.middleware.js";
import authMiddleware from "../../../src/http/middlewares/auth.middlewares.js";

const productRouter = (app) => {
    const router = express.Router();
    const productCategory = new ProductCategoryController();
    router.use(authMiddleware);
    router.post("/categories", productCategoryAvatarMiddelware.single('thumnail'), productCategoryValidate, productCategory.store);
    router.put("/categories/:categories_id", productCategoryAvatarMiddelware.single('thumnail'), productCategoryValidate, productCategory.update);
    router.delete("/categories/:categories_id", productCategory.delete);
    router.get("/categories", productCategory.index);
    router.get("/categories/:categories_id", productCategory.show)
    app.use("/admin/products", router);
}

export default productRouter;