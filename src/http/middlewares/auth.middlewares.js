import { parserJWT, responseError, responseJson } from "../../../common/helper.js"
import UserRepository from "../repositories/user.repository.js";

const authMiddleware = async( req, res, next)=>{
    
    const userRepository = new UserRepository()
    const responseToken = await parserJWT(req.headers.authorization);

    try {
        if(!responseToken.success){
            return responseJson(
                res,
                responseError(
                    responseToken.errors
                )
            )
        }
        const userId = responseToken.payload.id;
        const user =  await userRepository.findById(userId)

        if(!userId){
            return responseJson(
                res,
                responseError('User khong ton tai')
            )
        }
        res.locals.authUser = user;
        
        next();
    } catch (error) {
        return responseJson(
            res, 
            responseError(error.message),
        )
    }
}

export default authMiddleware