import express from "express"
import ProductCategoryController from "../../../src/http/controllers/admin/products/product_categories.controller.js";
import { productCategoryValidate } from "../../../src/http/validations/products/product_category.validate.js";
import { userAvatarMiddelware } from "../../../src/http/middlewares/user_avatar.middleware.js";
import { productCategoryAvatarMiddelware } from "../../../src/http/middlewares/product_category_avatar.middleware.js";
import authMiddleware from "../../../src/http/middlewares/auth.middlewares.js";
import ProductBrandController from "../../../src/http/controllers/admin/products/product_brand.controller.js";
import { productBrandAvatarMiddelware } from "../../../src/http/middlewares/product_brand_thumbnail.middleware.js";

const productRouter = (app) => {
    const router = express.Router();
    const productCategory = new ProductCategoryController();
    const productBrandController = new ProductBrandController();

    router.use(authMiddleware);
    router.post("/categories", productCategoryAvatarMiddelware.single('thumnail'), productCategoryValidate, productCategory.store);
    router.put("/categories/:category_id", productCategoryAvatarMiddelware.single('thumnail'), productCategoryValidate, productCategory.update);
    router.delete("/categories/:category_id", productCategory.delete);
    router.get("/categories", productCategory.index);
    router.get("/categories/:category_id", productCategory.show)

    router.post("/brands", productBrandAvatarMiddelware.single('thumbnail'), productBrandController.store);
    router.put("/brands/:brand_id", productCategoryAvatarMiddelware.single('thumbnail'), productBrandController.update);
    router.get("/brands", productBrandController.index);
    router.get("/brands/:brand_id", productBrandController.show)
    router.delete("/brands/:brand_id", productBrandController.delete)

    app.use("/admin/products", router);
}

export default productRouter;