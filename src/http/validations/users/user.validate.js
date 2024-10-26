import Joi from "joi";
import { USERS } from "../../../../configs/constant.js";
import { responseJson, responseValidateError } from "../../../../common/helper.js";
export const createUserValidation = (req, res, next) => {
    const { body } = req;
   
    
    const schema = Joi.object(
        {
            name: Joi.string().max(255).required().messages(
                {
                    'string.base': `Ho va ten phai la chuoi`,
                    'string.empty': `Ho va ten khong duoc de trong`,
                    'string.max': `Ho va ten khong duoc vuot qua 50 ky tu`,
                    'any.required': `Ho va ten la truong bat buoc`
                }
            ),
            email: Joi.string().email().max(50).required().messages(
                {
                    'string.base': 'Email phai la chuoi',
                    'string.empty': 'Email khong duoc de trong',
                    'string.email': 'Email khong dung dinh dang',
                    'any.required': 'Email la truong bat buoc'
                }
            ),
            password: Joi.string().max(255).required().messages(
                {
                    'string.base': 'Mat khau phai la chuoi',
                    'string.empty': 'Mat khau khong duoc de trong',
                    'any.required': 'Mat khau la truong bat buoc'
                }
            ),
            phone: Joi.string().max(11).messages(
                {
                    'phone.base': 'So dien thoai phai la chuoi',
                    'string.empty': "So dien thoai khong duoc de trong",
                    'phone': 'So dien thoai la truong bat buoc'
                }
            ),
            gender: Joi.number().valid(USERS.gender.female, USERS.gender.male).messages(
                {
                    'number.base': 'Gender phai la so',
                    'number.valid': 'Gender chi nhan 1 hoac 2',
                    'any.required': 'Gender la truong bat buoc'
                }
            ),
            birthday: Joi.date().messages(
                {
                    'string.base': 'Ngay thang nam sinh phai la chuoi',
                    'string.empty': 'Ngay thang nam sinh khong duoc de trong',
                    'any.required': 'Ngay thang nam sinh la truong bat buoc'
                }
            ),
            
            
            
        }
    )
    const result = schema.validate(body);
    if (result.error) {
        
        
        return responseJson(
            res,
            responseValidateError(result.error)
        )
    }

    next();
}

export const updateUserValidation = (req, res, next) => {
    const { body } = req;

    const schema = Joi.object(
        {
            name: Joi.string().max(255).messages(
                {
                    'string.base': `Ho va ten phai la chuoi`,
                    'string.empty': `Ho va ten khong duoc de trong`,
                    'string.max': `Ho va ten khong duoc vuot qua 50 ky tu`,
                    'any.required': `Ho va ten la truong bat buoc`
                }
            ),

            email: Joi.string().max(50).email().messages(
                {
                    'string.base': 'Email phai la chuoi',
                    'string.empty': 'Email khong duoc de trong',
                    'string.email': 'Email khong dung dinh dang',
                    'any.required': 'Email la truong bat buoc'
                }
            ),

            phone: Joi.string().max(11).messages(
                {
                    'string.base': `So dien thoai phai la chuoi`,
                    'string.empty': `So dien thoai khong duoc de trong`,
                    'string.max': `So dien thoai khong duoc vuot qua 11 ky tu`,
                    'any.required': `So dien thoai la truong bat buoc`
                }
            ),

            gender: Joi.string().valid(USERS.gender.female, USERS.gender.male).messages(
                {
                    'number.base': 'Gender phai la so',
                    'number.valid': 'Gender chi nhan 1 hoac 2',
                    'any.required': 'Gender la truong bat buoc'
                }
            ),

            birthday: Joi.date().messages(
                {
                    'string.base': 'Ngay thang nam sinh phai la chuoi',
                    'string.empty': 'Ngay thang nam sinh khong duoc de trong',
                    'any.required': 'Ngay thang nam sinh la truong bat buoc'
                }
            ),
        }
    )
    const result = schema.validate(body);
    if (result.error) {
        
        
        return responseJson(
            res,
            responseValidateError(result.error)
        )
    }

    next();
}