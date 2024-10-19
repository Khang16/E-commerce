import express from "express"
import AuthController from "../../../src/http/controllers/admin/auth/auth.controller.js";

const authRouter = (app)=>{
    const router = express.Router();
    const authController = new AuthController();
    router.post('/confirm_account', authController.confirm_account);
    router.post('/login', authController.login);
    app.use('/admin', router)
}

export default authRouter;