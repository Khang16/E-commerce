import Joi from "joi";
import { responceJoiError, responseJson, responseValidateError } from "../../../../common/helper.js";
import { USERADDRESS_TYPE } from "../../../../configs/constant.js";

export const createUserAddressValidation = (req, res, next) => {
    const { body } = req;
    const schema = Joi.object(
        {
            name: Joi.string().required().max(255).messages(
                {
                    'string.base': `Ho va ten phai la chuoi`,
                    'string.empty': `Ho va ten khong duoc de trong`,
                    'string.max': `Ho va ten khong duoc vuot qua 50 ky tu`,
                    'any.required': `Ho va ten la truong bat buoc`
                }
            ),
            phone: Joi.string().required().max(11).messages(
                {
                    'string.base': `So dien thoai phai la chuoi`,
                    'string.empty': `So dien thoai khong duoc de trong`,
                    'string.max': `So dien thoai khong duoc vuot qua 11 ky tu`,
                    'any.required': `So dien thoai la truong bat buoc`
                }
            ),
            detail: Joi.string().required().max(255).messages(
                {
                    'string.base': `Mo ta phai la chuoi`,
                    'string.empty': `Mo ta khong duoc de trong`,
                    'string.max': `Mo ta khong duoc vuot qua 255 ky tu`,
                    'any.required': `Mo ta la truong bat buoc`
                }
            ),
            province_id: Joi.string().required().max(255),
            district_id: Joi.string().required().max(255),
            ward_id: Joi.string().required().max(255),
            type: Joi.number().required().valid(USERADDRESS_TYPE.home, USERADDRESS_TYPE.office).messages(
                {
                    'number.base': 'Type phai la so',
                    'number.valid': 'Type chi nhan 1 hoac 2',
                    'any.required': 'Type la truong bat buoc',
                }
            )
        }
    )
    const result = schema.validate(body);
    if (result.error) {
        return responseJson(
            res,
            responceJoiError(result.error)
        )
    };

    next();
}