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
                        message: `Duplicate ${path}`,
                        value: value,
                    }
                )
                break;
        
            default:
                response.message = errors.message;
        }

        return response;
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



export const generateJWT = (userId, algorithm = "sha1", exp = dayjs().add(1, 'days').unix())=>{
    const header = JSON.stringify(
        {
            alg: algorithm,
            type: 'JWT',
        }
    )

    const payload = JSON.stringify(
        {
            id: userId,
            iat: dayjs().unix,
            exp,
        }
    )

    const base64Header = Buffer.from(header).toString('base64').replace('==','').replace('=','');
    const base64PayLoad = Buffer.from(payload).toString('base64').replace('==','').replace('=','');
    const signature = hashHmacString(base64Header + "." + base64PayLoad);

    return base64Header + "." + base64PayLoad + "." +signature; 
}

export const parserJWT = (token, withBearerPrefix = true) => {
    const responseToken = {
        success: false,
    }
    
    if(!token){
        return {...responseToken, errors: 'Token khong duoc de trong',};
    }
    
    try {
        let data = [];

        if (withBearerPrefix) {
            data = token.split(' ')[1].split('.');
        } else {   
            data = token.split('.');
        }
        const [ base64Header, base64Payload, signature ] = data;
        const header = JSON.parse(Buffer.from(base64Header, 'base64').toString());

        if(hashHmacString(base64Header + "." + base64Payload,header.alg) !== signature){
            return {
                ...responseToken,
                errors: 'Token ko dung dinh dang'
            };
        }
        const payload = JSON.parse(Buffer.from(base64Payload,'base64').toString());

        if(dayjs().unix() > payload.exp){
            return {
                ...responseToken,
                errors: 'Token da het han',
            }
        }

        return {...responseToken, success: true, payload};
    } catch (error) {
        console.log(error);
        
        return {...responseToken, errors: error.message};
    }
    
}

export const generateConfirmEmailUrl = (userId)=> {
    const token = generateJWT(userId, 'sha1', dayjs().add(1, 'day'));

    return process.env.FE_DOMAIN + 'confirm-account?token=' + token;
}