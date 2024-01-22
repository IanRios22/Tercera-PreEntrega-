import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productCollection = 'products';

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

//le agregamos puglin al esquema
productSchema.plugin(paginate)

//exportamos
export const productModel = model(productCollection, productSchema);