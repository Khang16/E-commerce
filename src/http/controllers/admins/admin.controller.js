import { hashHmacString } from "../../../../common/helper";

class AdminController {
    store(req, res){
        try {
            const { body } = req;
            let password = body.password || process.env.PASSWORD_DEFAULT;
            password = hashHmacString(password);
            const user = 
        } catch (error) {
            
        }
    }
}

export default AdminController;