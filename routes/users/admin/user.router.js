import express from "express";
import { createUserValidation, updateUserValidation } from "../../../src/http/validations/users/user.validate.js";
import UserController from "../../../src/http/controllers/admin/users/user.controller.js";
import UserAddressController from "../../../src/http/controllers/admin/users/user_address.controller.js";
import { createUserAddressValidation } from "../../../src/http/validations/users/user_address.validate.js";
import authMiddleware from "../../../src/http/middlewares/auth.middlewares.js";
import { userAvatarMiddelware } from "../../../src/http/middlewares/user_avatar.middleware.js";

const userRouter = (app) => {
    const router = express.Router();
    const userAddresController = new UserAddressController();
    const userController = new UserController();
    router.use(authMiddleware)
    router.post('/', userAvatarMiddelware.single('avatar'), createUserValidation, userController.store);
    router.post('/:user_id/address', createUserAddressValidation, userAddresController.store);
    router.put('/:user_id', userAvatarMiddelware.single('avatar'), userController.update);
    router.get('/', userController.index);
    router.delete('/:user_id', userController.delete);
    router.get('/:user_id' , userController.show );
    app.use('/admin/users', router)
}

export default userRouter;