import app from "./app.js";
import mongoose from "mongoose";


mongoose.connect('mongodb://127.0.0.1:27017/Ecomer', {autoIndex: true}).then(
    () => {
        console.log("Database connected successfully");
    }
);
app.listen(
    3000, 
    () => {
        console.log("Application init successfully");
    }
);