import express from "express";
import AdminController from "../../../src/http/controllers/admins/admin.controller.js";
const adminRouter = (app) => {
    const router = express.Router();
    const adminController = new AdminController();
    router.post('/',adminController.store);
    app.use('/admin',router)
}
export default adminRouter;