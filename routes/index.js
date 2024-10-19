import authRouter from "./users/admin/auth.router.js";
import userRouter from "./users/admin/user.router.js";

const router = (app) => {
    userRouter(app);
    authRouter(app);
}

export default router;