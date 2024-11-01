import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const productBrandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            max: 255,
        },
        thumbnail_id: {
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
            timestamps: true
        },
        updated_at: {
            type: Date,
            timestamps: true
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
);
productBrandSchema.virtual('thumbnail', {
    ref: 'Media',
    localField: 'thumbnail_id',
    foreignField: '_id',
    justOne: true
})

export default mongoose.model("ProductBrand", productBrandSchema, "productBrand");