import UserAddress from "../../../models/user_address.model.js";
import { responseError, responseJson, responseSuccess } from "../../../../../common/helper.js";

class UserAddressController{
    async store(req, res){
        try {
            const data = {
                ...req.body,
                user_id: req.params.user_id,
                
            }
            console.log(data);
            
            const userAddress = await UserAddress.create({...data})
            return responseJson(
                res,
                responseSuccess(userAddress)
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            )
        }
        
        
        
        
        

        res.send("success")
    } 
}
export default UserAddressController;