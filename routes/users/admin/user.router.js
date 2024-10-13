import express from "express";
import { createUserValidation } from "../../../src/http/validations/users/user.validate.js";
import UserController from "../../../src/http/controllers/admin/users/user.controller.js";
import { userAvatarMiddelware } from "../../../src/http/middlewares/user_avatar.middleware.js";
import UserAddressController from "../../../src/http/controllers/admin/users/user_address.controller.js";
import { createUserAddressValidation } from "../../../src/http/validations/users/user_address.validate.js";

const userRouter = (app) => {
    const router = express.Router();
    const userController = new UserController();
    router.post('/',userAvatarMiddelware.single('avatar'), userController.store);

    const userAddresController = new UserAddressController();
    router.post('/:user_id/address', createUserAddressValidation,userAddresController.store);
    router.get('/:user_id' ,userController.show );
    app.use('/admin/users',router)
}
export default userRouter;