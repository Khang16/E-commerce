import authRouter from "./users/admin/auth.router.js";
import productRouter from "./users/admin/product.router.js";
import userRouter from "./users/admin/user.router.js";

const router = (app) => {
    userRouter(app);
    authRouter(app);
    productRouter(app)
}

export default router;