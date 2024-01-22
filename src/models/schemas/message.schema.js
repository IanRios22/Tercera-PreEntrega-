import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const messageCollection = 'messages';

const messageSchema = new Schema({
    user: String,
    message: String
});

//Le agregamos puglin al esquema
messageSchema.plugin(paginate);

//exportamos
export const messageModel = model(messageCollection, messageSchema);