import { required } from "joi";
import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        province_id:{
            type: String,
        }
    }
);
export default mongoose.model("Distrcit", districtSchema, 'district');