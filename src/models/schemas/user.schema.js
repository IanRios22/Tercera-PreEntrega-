import { Schema, model } from "mongoose";

const userCollection = 'users';

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: {
        type: String,
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
    },
    role: {
        type: String,
        default: 'admin'
    }
});

export const userModel = model(userCollection, userSchema);