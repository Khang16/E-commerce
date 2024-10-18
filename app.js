import express from 'express'
import router from './routes/index.js';
import { reponseJsonByStatus, responseError, responseValidateError } from './common/helper.js';
import multer from 'multer';

const app =express();
app.use(express.static('storage'))

app.use(express.json());
router(app);
app.use(
    (err,req,res,next)=>{
        if (err instanceof multer.MulterError) {            
            const error = {
                details: [
                    {
                        message: err.message,
                        context: {
                            key: err.field
                        }
                    }

                ]
            }

            return reponseJsonByStatus(
                res,
                responseValidateError(error),
                err.statusCode
            ) 
        }
        console.log(err);
        
        return reponseJsonByStatus(
            res,
            responseError(err),
            err.statusCode
        )
    }
)
export default app;
