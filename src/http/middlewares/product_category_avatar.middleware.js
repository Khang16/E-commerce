import multer from "multer"
import { STORE_PATH } from "../../../configs/constant.js";
import path from 'path'
import dayjs from "dayjs";

const storage = multer.diskStorage(
    {
        destination: function(req, file, cb){
            cb(null, path.resolve(STORE_PATH.uploadFileAvatarProductCategory));
        },
        filename: function(req, file, cb){
            const uniqueSufix = dayjs().unix() + '_' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSufix + '_' + file.originalname)
        }
    }
)

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'application/pdf'];
    
    if(allowedMimes.includes(file.mimetype)){
        cb(null, true);
    }else{        
        cb( 
            new Error(
                JSON.stringify([
                    {
                        field: file.fieldname,
                        message: 'File ảnh không đúng định dạng',
                    }
                ])
            )
        );
    }
}

export const productCategoryAvatarMiddelware = multer({
    storage,
    limits:{
        fileSize: 1*1000*1000,
    },
    fileFilter: fileFilter,
});