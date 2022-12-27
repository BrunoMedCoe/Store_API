import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(           //definindo o review que será utilizado pelo mongoose no schema.
    {
        name: String,
        description: String
    }, { collection: "productInfo" }
);

export default ReviewSchema;