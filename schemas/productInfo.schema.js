import mongoose from "mongoose";
import ReviewSchema from "./review.schema.js"

const ProductInfoSchema = new mongoose.Schema(          //no mongoose precisa realizar um schema, seguindo as definições. Essa é uma das grandes diferenças, pois pelo drive nativo, é mais dinâmico que o mongoose, que agora é esquematizado.
    {
        productId: Number,
        category: String,
        width: String,
        height: String,
        depth: String,
        reviews: [ReviewSchema]
    }, { collection: "productInfo" }
);

export default ProductInfoSchema;