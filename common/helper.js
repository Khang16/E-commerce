import dayjs from "dayjs"
import { string } from "joi"
import { now } from "mongoose"

export const responseJson = (res, data, statuscode = 200)=>{
    return res.status(statuscode).json(
        data
    )
}
export const responseError = (errors, statuscode=500) => {
    const response = {
        now: dayjs().format('DD-MM-YYYY'),
        statuscode: statuscode,
        errors: [],
        message: '',
    }

    if(typeof errors === 'string'){
        response.errors = errors;
        return response;
    }

    if(typeof errors === 'MiddelwareError'){
        response.errors = errors.errors;
        response.message = errors.message;
        return response;
    }

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
    }

    if (errors instanceof Error) {
        try {
            response.errors = JSON.parse(errors.message);
        } catch(e) {
            response.errors = errors.message;
        }

        return response;
    }
}

export const hashHmacString = (string, algorithm = 'sha1') => {
    return crypto.createHmac(algorithm,process.env.PRIVATE_KEY)
        .update(string)
        .digest('hex')
}