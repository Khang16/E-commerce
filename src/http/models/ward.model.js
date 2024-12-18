import mongoose from "mongoose";

const wardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 255,
            required: true,
        },
        province_id: {
            type: String,
        },
        district_id: {
            type: String,
        }
    }
);
export default mongoose.model("Ward", wardSchema, 'ward');