import { hashHmacString, responseError, responseJson, responseSuccess } from "../../../../../common/helper.js";
import { MEDIA } from "../../../../../configs/constant.js";
import Media from "../../../models/media.model.js";
import MediaService from "../../../services/media.services.js";
import UserService from "../../../services/uer.services.js";

class UserController {
    static userService = new UserService;
    static mediaService = new MediaService;
    async store(req, res) {
        try {
            let data = { ...req.body, avatar_id: null };
            console.log(req.body);
            
            
            // TODO: Check if avatar exists
            if (req.file) {                
                // const media = await Media.create({
                //     url: req.file.filename,
                //     type: MEDIA.type.user_avtar,
                // });

                const media = await UserController.mediaService.store(
                    {
                        url: req.file.filename, 
                        type: MEDIA.type.user_avtar,
                    }
                )
                console.log( media);
                
                data.avatar_id = media._id;
            }
            

            // Store user
            // const user = await userModel.create(data);

            // Respond with the created user data
            let password = data.password || process.env.PASSWORD_DEFAULT;
            password = hashHmacString(password);
            const user = await UserController.userService.store(
                {
                    ...data,
                    password,
                }
            )
            

            return responseJson(
                res,
                responseSuccess(user)
            );
        } catch (error) {
            console.log(error);
            
            return responseJson(
                res,
                responseError(error)
            )
        }
    }

    async show(req, res){
        
        try {
            const userId= req.params.user_id;
            
            return responseJson(
                res,
                responseSuccess(
                    await UserController.userService.show(userId)
                )
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(error),
            );
        }
    }
}

export default UserController;
