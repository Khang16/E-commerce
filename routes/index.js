import userRouter from "./users/admin/user.router.js";

const router = (app) => {
    userRouter(app);
}

export default router;