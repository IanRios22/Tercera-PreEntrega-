import paginate from "mongoose-paginate-v2";
import { Schema, model } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true }
        }
    ]
})

//Midlewares para que devuleva con el .find la info del populate
cartSchema.pre('find', function () { this.populate('products.product') })
cartSchema.pre('findOne', function () { this.populate('products.product') })

//Le agregamos puglin al esquema
cartSchema.plugin(paginate);

//exportamos
export const cartModel = model(cartCollection, cartSchema);