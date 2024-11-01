import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { USERS } from "../../../configs/constant.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 255,
        },
        password: {
            type: String,
            required: true,
            max: 255,
        },   
        phone: {
            type: String,
            max: 11,
        },
        gender: {
            type: Number,
            enum: Object.values(USERS.gender),
        },
        birthday: {
            type: Date,
        },
        is_confirmed: {
            type: Number,
            enum: Object.values(USERS.is_confirm),
        },
        otp: {
            type: Number,
        },
        avatar_id: {
            type: String
        },
        created_by: {
            type: ObjectId
        },
        updated_by: {
            type: ObjectId
        },
        created_at: {
            type: Date,
            timestamps: true,
        },
        updated_at: {
            type: Date,
            timestamps: true,
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true
        }
    }
)
userSchema.virtual('avatar',{
    ref: 'Media',
    localField: 'avatar_id',
    foreignField: '_id',
    justOne: true,
})
userSchema.virtual('addresses',{
    ref: 'UserAddress',
    localField: '_id',
    foreignField: 'user_id',
})

export default mongoose.model('User', userSchema, 'user')