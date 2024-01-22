import { Server } from 'socket.io'
import messageDao from '../models/dao/message.dao.js';

function setupSocket(server) {
    const io = new Server(server);
    //Encendemos el socket con .on (escucha/recibe)
    io.on('connection', socket => {
        console.log(`New client connected.`)
        //el socket espera algun 'message' desde el cliente (index.js), data llega como objeto, {user: x, message: x}
        socket.on('message', async data => {
            try {
                await messageDao.saveMessage(data)
                const allMessages = await messageDao.getAllMessages()
                io.emit('messageLogs', allMessages) //envia al cliente la coleccion completa de mensajes desde la db
            } catch (error) {
                console.error(`Socket.io save or getAll messages failed: ${error.message}`);
            }
        });
    });
};

export default setupSocket