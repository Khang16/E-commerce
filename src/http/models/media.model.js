import mongoose, { get } from "mongoose";
import { ObjectId } from "mongodb";
import { URL_PATH } from "../../../configs/constant.js";

const mediaSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            get: function(avatar) {
                if (!avatar) {
                    avatar = 'default.png';
                }      
                let urlPath;
                switch (this.type) {
                    case 1:
                        urlPath = URL_PATH.avatarProductCategory;
                        break;
                    case 4:
                        urlPath = URL_PATH.avatarUser;
                        break;
                    default:
                        urlPath = 'ERROR/';
                }
                
                return 'http://localhost:3000/' + urlPath + avatar;
            }
        },
        type: {
            type: Number,
            max: 255,
        },
        created_by: {
            type: ObjectId,
        },
        updated_by: {
            type: ObjectId,
        },
        created_by: {
            type: Date,
        },
        updated_at: {
            type: Date
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        toJSON: {
            getters: true,
        },
        toObject: {
            getters: true,
        }
    }
)

export default mongoose.model('Media', mediaSchema, 'media')