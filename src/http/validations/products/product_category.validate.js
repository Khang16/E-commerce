import Joi from "joi";
import { Schema } from "mongoose";
import { responceJoiError, responseJson, responseValidateError } from "../../../../common/helper.js";
import { CATEGORY_PARENT } from "../../../../configs/constant.js";

export const productCategoryValidate = (req, res, next) => {
    const { body } = req;

    const schema = Joi.object(
        {
            name: Joi.string().required().max(255).messages(
                {
                    'string.base': `Ho va ten phai la chuoi`,
                    'string.empty': `Ho va ten khong duoc de trong`,
                    'string.max': `Ho va ten khong duoc vuot qua 255 ky tu`,
                    'any.required': `Ho va ten la truong bat buoc`
                }
            ),

            description: Joi.string().required().min(10).messages(
                {
                    'string.base': `Description phai la chuoi`,
                    'string.empty': `Description khong duoc de trong`,
                    'any.required': `Description la truong bat buoc`
                }
            ),
            parent_id: Joi.string().messages(
                {
                    'string.base': `Parent id phai la chuoi`,
                }
            ),
            
            
        },

     
    );
    const result = schema.validate(body);
    if(result.error){
        return responseJson(
            res,
            responseValidateError(result.error)
        )
    }
    
    next();
}