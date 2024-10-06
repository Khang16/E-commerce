import express from "express";
import AdminController from "../../../src/http/controllers/admins/admin.controller.js";
import { createAdminValidation } from "../../../src/http/validations/admin/admin.validate.js";
const adminRouter = (app) => {
    const router = express.Router();
    const adminController = new AdminController();
    router.post('/',createAdminValidation,adminController.store);
    app.use('/admin',router)
}
export default adminRouter;