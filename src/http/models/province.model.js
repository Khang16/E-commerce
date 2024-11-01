import mongoose, { Schema } from "mongoose";

const provinceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            max: 255,
        },

    }
)

export default mongoose.model("Province", provinceSchema, "province");