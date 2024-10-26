import { generateJWT, hashHmacString, parserJWT, responseJson } from "../../../common/helper.js";
import { USERS } from "../../../configs/constant.js";
import HttpErrorException from "../../exceptions/http-error.exception.js";
import UserRepository from "../repositories/user.repository.js";
import redis from "../../../database/redis/index.js";

class AuthService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async login(email, password){
        const user = await this.userRepository.findUserConfirmedAccountByEmail(email)
        if(!user){
            const error = [
                {
                    'field': 'email',
                    'message': 'Nguoi dung khong ton tai'
                }
            ];
            throw Error(JSON.stringify(error));
        }

        if(user.password !== hashHmacString(password)){
            const error = [
                {
                    'field': 'password',
                    'message': 'Mat khau khong dung',
                    
                }
            ];
            throw Error(JSON.stringify(error));
        }
        const userToken = generateJWT(user._id);
        redis.set(`users:tokens:${user._id}`, userToken, {
            EX: 60*60*24
        });

        return userToken;
    }

    async confirmAccount(token){        
        const responeToken = parserJWT(token, false);
        if(!responeToken.success){
            throw new HttpErrorException(responeToken.errors,401);
        }
        const userId = responeToken.payload.id;
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new HttpErrorException("Khong tim thay nguoi dung",401)
        }

        if(user.is_confirmed === USERS.is_confirm.true){
            throw new HttpErrorException("Tai khoan da duoc xac thuc", 401)
        }

        await this.userRepository.update(
            userId,
            {
                is_confirmed: USERS.is_confirm.true
            },
            user
        )

        return true;
    }
}

export default AuthService;