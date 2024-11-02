import Joi from "joi";
import { responseJson,responseValidateError } from "../../../../common/helper.js";
const productBrandValidate = (req, res, next) => {
    const {body} = req;
    const schema = Joi.object(
        {
            name: Joi.string().required().messages(
                {
                    'string.base': `Ho va ten phai la chuoi`,
                    'string.empty': `Ho va ten khong duoc de trong`,
                    'any.required': `Ho va ten la truong bat buoc`
                }
            ),
          
        }
    )
    const result = schema.validate(body);
    if(result.error){
        return responseJson(
            res,
            responseValidateError(result.error)
        )
    }
    
    next();
}
export default productBrandValidate;