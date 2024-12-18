import { responseError, responseJson, responseSuccess } from "../../../../../common/helper.js";
import AuthService from "../../../services/auth.services.js";

class AuthController {
    static authSerVice = new AuthService;

    async login(req, res){
        const {body} = req;
        try {
            const email = req.body.email;
            const password = req.body.password;
            const userToken = await AuthController.authSerVice.login(email, password)

            return responseJson(
                res,
                responseSuccess(
                    {
                        user_token: userToken
                    }
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

    async confirm_account(req, res){
        try {
            const {body} = req;
            const user = await AuthController.authSerVice.confirmAccount(body.token);
            return responseJson(
                res,
                responseSuccess(user)
            )
        } catch (error) {
            console.log(error);
            
            return responseJson(
                res,
                responseError(
                    error
                )
            )
        }
    }
}

export default AuthController;