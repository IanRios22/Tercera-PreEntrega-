import { messageModel } from "../schemas/message.schema.js";

class MessageDAO {
    constructor() {
        console.log("Mensajes DAO conectado");
    }

    getAllMessages = async () => {
        try {
            const messages = await messageModel.find().lean();
            return messages
        } catch (error) {
            console.log('Error al obtener mensaje del DB', error.message);
        }
    }

    saveMessage = async (message) => {
        try {
            await messageModel.create(message);
            return { status: 'Success.', message: 'Message agregado.' }
        } catch (error) {
            console.log('Error al obtener mensaje del DB', error.message);
        }
    }
}

export default new MessageDAO();