import mongoose from "mongoose";
import { ObjectId } from "mongodb";


const productCategoriesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        description: {
            type: String,
            required: true,
        },

        thumbnail_id: {
            type: String,
        },
        parent_id: {
            type: String,
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
productCategoriesSchema.virtual('thumbnail', {
    ref: 'Media',
    localField: 'thumbnail_id',
    foreignField: '_id',
    justOne: true,
})

export default mongoose.model("ProductCategories", productCategoriesSchema, "productCategories")