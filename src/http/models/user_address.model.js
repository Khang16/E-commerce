import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 255,
        },
        user_id: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            max: 11,
        },
        province_id: {
            type: String,
            required: true,
        },
        district_id: {
            type: String,
            required: true
        },
        ward_id: {
            type: String,
            required: true,
        },
        detail: {
            type: String,
            max: 255,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        }
    }
)
userAddressSchema.virtual('address',{
    ref: 'User',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true,
})
export default mongoose.model("UserAddress", userAddressSchema, "user_address")