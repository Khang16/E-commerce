import { hashHmacString, responseError, responseJson, responseSuccess } from "../../../../../common/helper.js";
import { MEDIA, PAGINATE_OPTIONS } from "../../../../../configs/constant.js";
import Media from "../../../models/media.model.js";
import MediaService from "../../../services/media.services.js";
import UserService from "../../../services/user.services.js";

class UserController {
    static userService = new UserService;
    static mediaService = new MediaService;
    async store(req, res) {
        try {
            let data = { ...req.body, avatar_id: null };  
            if (req.file) {                
                

                const media = await UserController.mediaService.store(
                    {
                        url: req.file.filename, 
                        type: MEDIA.type.product_avatar_user,
                    }
                )
                data.avatar_id = media._id;
            }
            
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
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(error),
            );
        }
    }

    async update(req, res){
        try {
            const userId = req.params.user_id;
            let data = { ...req.body };
           
            if (req.file) {
                const media = await UserController.mediaService.store({
                    url: req.file.filename,
                    type: MEDIA.type.product_avatar_user,
                });
                data.avatar_id = media._id;
            }
            const updatedUser = await UserController.userService.update(userId, data);
    
            return responseJson(
                res,
                responseSuccess(updatedUser)
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            );
        }
    }

    async delete(req, res){
        try {
            const userId= req.params.user_id;
            const user =  await UserController.userService.delete(userId);

            return responseJson(
                res,
                responseSuccess(
                   user
                )
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            )
        }
    }

    async index(req, res){
        try {
            const {
                keyword,
                gender,
                limit = PAGINATE_OPTIONS.limit,
                page = PAGINATE_OPTIONS.page,
            } = req.query;
            const user = await UserController.userService.index(keyword, gender, page, limit);

            return responseJson(
                res,
                responseSuccess(
                    user
                )
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(
                    error
                )
            )
        }
    }
}

export default UserController;
