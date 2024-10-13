import crypto from 'crypto';
import dayjs from "dayjs"
import { PAGINATE_OPTIONS } from "../configs/constant.js"

export const responseJson = (res, data, statuscode = 200)=>{
    return res.status(statuscode).json(
        data
    )
}
export const responseError = (errors, statuscode=500) => {    
    const response = {
        now: dayjs().format('DD-MM-YYYY HH:mm:ss'),
        statuscode: statuscode,
        errors: [],
        message: '',
    }

    if(typeof errors === 'string'){
        response.errors = errors;
        return response;
    };

    if(typeof errors === 'MiddelwareError'){
        response.errors = errors.errors;
        response.message = errors.message;
        return response;
    };

    if( errors instanceof Error && errors.name === 'MongoServerError'){
        const [path,value] = Object.entries(errors.keyValue)[0];
        switch (errors.code) {
            case 11000:
                response.errors.push(
                    {
                        field: path,
                        message: `Duplicate`,
                        value: value,
                    }
                )
                break;
        
            default:
                response.message = errors.message;
        }
    };

    if (errors instanceof Error) {
        try {
            response.errors = JSON.parse(errors.message);
        } catch(e) {
            response.errors = errors.message;
        }

        return response;
    };
};

export const responseSuccess = (data, statuscode = 200, message = 'Success')=>{
    return{
        now: dayjs().format("DD-MM-YYYY HH:mm:ss"),
        data,
        statuscode,
        message,
    };
};

export const hashHmacString = (password, algorithm = 'sha1') => {
    return crypto.createHash(algorithm,process.env.PASSWORD_DEFAULT)
        .update(password)
        .digest('hex');
}

export const responsePaginate = (data, total, limit = PAGINATE_OPTIONS.limit, page = PAGINATE_OPTIONS.page)=>{
    return{
        data,
        page: +page,
        limit: +limit,
        total_page: Math.ceil(total/limit),
    };
};

export const responceJoiError = (errors)=>{
    const response = {
        now: dayjs().format("DD-MM-YYY HH:mm:ss"),
        status_code: 400,
        errors: [],
        message: "Error in validate"
    };
    
    response.errors = errors.details.map(
        (error)=>{            
            
            return {
                field: error.context.key,
                message: error.message,
                value: errors._original[error.context.key],
            }
        }
    );

    return response;
}

export const responseValidateError = (errors)=>{
    const response = {
        now: dayjs().format("DD-MM-YYYY HH:mm:ss"),
        status_code: 400,
        errors: [],
        message: "Error in validate"
    };

    response.errors = errors.details.map(
        (error)=>{
            let value = '';
            try {
                value = error._original[error.context.key];
            } catch (error) {
                value = '';
            }
            return {
                field: error.context.key,
                message: error.message,
                value,
            }
        }
    );

    return response;
}

export const reponseJsonByStatus = (res, data, statusCode = 200)=>{
    return res.json(data);
};