import { ticketModel } from "../schemas/ticket.schema.js";
class TicketDAO {
    constructor() {
        console.log('TicketDAO conectado');
    }

    getAll = async () => {
        try {
            const response = await ticketModel.find().lean()
            return response
        } catch (error) {
            throw error;
        }
    }

    //crear ticket
    createTicket = async (ticket) => {
        try {
            const response = await ticketModel.create(ticket);
            console.log(response);
            return { status: 200, message: `Ticket creado.`, payload: response }
        } catch (error) {
            throw error;
        }
    }

}


export default new TicketDAO();